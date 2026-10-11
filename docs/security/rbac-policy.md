# Role-Based Access Control (RBAC) Matrix

## Permission Table
| Role | View Academics | Order Food | View Bus Tracker | Edit Grades | Manage Infrastructure |
|---|:---:|:---:|:---:|:---:|:---:|
| **Student** | Own Only | Yes | Yes | No | No |
| **Faculty** | Department | Yes | Yes | Yes | No |
| **Warden** | Read-Only | Yes | Yes | No | Yes (Hostel) |
| **Super Admin** | All | Yes | Yes | Yes | All |
