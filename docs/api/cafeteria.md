# Cafeteria & Food Court API

## Overview
Allows students and faculty to browse daily mess and cafeteria menus, place food pre-orders, and monitor order fulfillment.

### Endpoints

#### GET /api/v1/cafeteria/menu
Returns today's meal schedule across all campus dining stalls.

#### POST /api/v1/cafeteria/orders
Places a new pickup order.
- **Request Body**:
  ```json
  {
    "vendorId": "stall_food_court_3",
    "items": [{ "itemId": "item_dosa_01", "quantity": 2 }],
    "pickupSlot": "12:45"
  }
  ```
