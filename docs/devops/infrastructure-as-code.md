# Infrastructure as Code (IaC) & Terraform Module Architecture

## Overview
All cloud resources powering the Uni-Verse university super-app platform are declared as version-controlled **Infrastructure as Code (IaC)** using **Terraform (OpenTofu)**. Manual console modifications ("clickops") are strictly prohibited. Every infrastructure modification is peer-reviewed via pull requests and applied through automated CI/CD runners.

---

## 1. Cloud Infrastructure Topology

```
+--------------------------------------------------------------------+
|                AWS Multi-AZ VPC (ap-south-1 / Mumbai)              |
|                                                                    |
|  [Public Subnets]                                                  |
|  - Internet Gateway (IGW)                                          |
|  - Managed NAT Gateways (AZ-1a, AZ-1b)                             |
|                                                                    |
|  [Private Application Subnets]                                     |
|  - Elastic Container Service (ECS Fargate) Container Tasks         |
|  - Internal Application Load Balancers                             |
|                                                                    |
|  [Isolated Database Subnets]                                       |
|  - Amazon Aurora PostgreSQL Serverless v2 (Primary + Read Replica) |
|  - Amazon ElastiCache Redis Cluster (Multi-AZ with Auto-Failover)  |
|                                                                    |
+--------------------------------------------------------------------+
```

---

## 2. Terraform Module Hierarchy

```text
infra/
├── environments/
│   ├── staging/             # Staging environment variables & state configuration
│   └── production/          # Production environment variables & state configuration
├── modules/
│   ├── networking/          # VPC, subnets, route tables, and security groups
│   ├── database/            # Aurora PostgreSQL, DB subnet groups, parameter groups
│   ├── cache/               # ElastiCache Redis replication groups
│   ├── storage/             # S3 buckets, CORS rules, and Glacier lifecycle policies
│   ├── monitoring/          # CloudWatch dashboards, metric alarms, and SNS topics
│   └── security/            # IAM roles, KMS customer-managed keys, and WAF rules
└── backend.tf               # S3 state storage & DynamoDB state locking
```

---

## 3. Remote State Locking & State Isolation

To prevent concurrent state corruption when multiple engineers deploy changes:

```hcl
# backend.tf
terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.40"
    }
  }

  backend "s3" {
    bucket         = "universe-terraform-state-prod"
    key            = "environments/production/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "universe-terraform-locks-prod"
    encrypt        = true
  }
}
```

---

## 4. Continuous Drift Detection & Automated PR Plan

1. **Pull Request Validation**: Every infrastructure PR triggers `terraform fmt -check`, `tflint`, and `terraform plan`.
2. **Automated Plan Posting**: The generated plan diff is posted as an automated GitHub PR review comment showing exact resources to be created, modified, or destroyed.
3. **Nightly Drift Detection**: A scheduled GitHub Actions workflow runs `terraform plan -detailed-exitcode` at 01:00 UTC. If any resource has drifted from declared code, an alert is dispatched to the DevOps on-call engineer.
