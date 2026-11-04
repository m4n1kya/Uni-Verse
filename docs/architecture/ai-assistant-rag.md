# Campus AI Assistant & Retrieval-Augmented Generation (RAG) Architecture

## Overview
Uni-Verse integrates an intelligent campus assistant ("**Uni-Bot**") designed to answer student inquiries regarding course syllabus prerequisites, faculty consultation hours, cafeteria dietary menus, library catalog availability, and transit schedules. To ensure factual accuracy and eliminate hallucinations, the assistant utilizes a **Retrieval-Augmented Generation (RAG)** pipeline backed by PostgreSQL `pgvector`.

---

## 1. RAG Pipeline Topology

```
[Ingestion Phase]
Course Syllabi PDFs / Campus Guides / Dining Menus
                       |
                       v
[Recursive Semantic Chunking (500 Tokens, 50 Overlap)]
                       |
                       v
[Vector Embedding Generator (text-embedding-3-small)]
                       |
                       v
[PostgreSQL pgvector Vector Store (HNSW Cosine Index)]

=======================================================

[Inference / Query Phase]
Student Question: "What are the prerequisites for Advanced Algorithms CSE3002?"
                       |
                       v
[Hybrid Retrieval: Dense Vector Cosine + Full-Text Search (tsvector)]
                       |
                       v
[Reciprocal Rank Fusion (RRF) & Context Assembly]
                       |
                       v
[LLM Context-Grounded Prompt with Safety & Privacy Guardrails]
                       |
                       v
Grounded Answer with Direct Markdown Citation Links
```

---

## 2. Ingestion & Vector Storage Schema

All academic PDFs in `public/notes/` and campus markdown guides are split into overlapping semantic chunks:

```sql
-- Enable vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Vector embedding storage table
CREATE TABLE document_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id VARCHAR(64) NOT NULL,
    chunk_index INT NOT NULL,
    source_title VARCHAR(255) NOT NULL,
    source_url TEXT NOT NULL,
    access_role VARCHAR(32) NOT NULL DEFAULT 'student',
    chunk_content TEXT NOT NULL,
    embedding vector(1536) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hierarchical Navigable Small World (HNSW) index for sub-15ms nearest-neighbor lookups
CREATE INDEX idx_document_embeddings_hnsw 
ON document_embeddings USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);
```

---

## 3. Hybrid Retrieval & Reciprocal Rank Fusion (RRF)

To maximize recall across both exact keyword queries (e.g., course code `"CSE3002"`) and conceptual semantic queries (e.g., *"How do I appeal my internal exam score?"*), the engine merges sparse and dense rankings:

$$\text{RRF\_Score}(d) = \sum_{m \in \{\text{dense}, \text{sparse}\}} \frac{1}{60 + r_m(d)}$$

- **Dense Retrieval**: Cosine similarity on 1536-dimensional embeddings.
- **Sparse Retrieval**: PostgreSQL `to_tsvector('english', chunk_content)` inverted index ranking.
- Top-5 reranked chunks are assembled into the model context window.

---

## 4. Privacy Guardrails & Role-Based Access Control (RBAC)

1. **Role Filtering**: The vector query injects an immutable SQL constraint matching the authenticated student's role (`WHERE access_role IN ('public', :userRole)`).
2. **Confidential Boundary**: Examination question banks, faculty salary schedules, and medical dispensary logs are strictly excluded from embedding generation.
3. **PII Sanitization**: Outbound prompt templates sanitize student roll numbers, phone numbers, and payment details before dispatching payloads to the inference endpoint.
4. **Strict Grounding**: The system prompt instructs: *"If the provided campus context does not contain the answer, politely state that the information is unavailable and provide a direct link to the relevant university deanery office."*
