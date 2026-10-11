# Database Schema: Cafeteria & Food Court

## Structure
Models dining stalls, catalog items, daily price variations, and real-time order states.

```sql
CREATE TABLE cafeteria_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id),
    vendor_id VARCHAR(64) NOT NULL,
    total_amount NUMERIC(8, 2) NOT NULL,
    order_status VARCHAR(32) NOT NULL DEFAULT 'pending',
    token_number INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
