# Database Schema: Digital Library & Physical Inventory

## Structure
Maintains ISBN records, book titles, rack coordinates, loan history, and automated late fee calculations.

```sql
CREATE TABLE book_loans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID NOT NULL,
    borrower_id UUID REFERENCES users(id),
    borrowed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    due_at TIMESTAMP WITH TIME ZONE NOT NULL,
    returned_at TIMESTAMP WITH TIME ZONE
);
```
