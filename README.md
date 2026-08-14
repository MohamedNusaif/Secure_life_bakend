Copy everything below:

# SecureLife Insurance PLC — CRM Backend


REST API backend for the SecureLife Insurance PLC Customer Relationship Management (CRM) system.


The backend provides APIs for:


- Authentication
- User management
- Lead management
- Advisor management
- Insurance plan management
- Automatic advisor assignment
- Insurance plan recommendation
- CRM operations


---


# 🚀 Project Overview


The SecureLife CRM backend is built using:


- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication


The backend exposes REST APIs consumed by the Next.js frontend.


Architecture:


```text
Next.js Frontend
       ↓
REST API
       ↓
Express.js
       ↓
Mongoose
       ↓
MongoDB
✨ Features
Authentication
User registration
User login
JWT authentication
Protected API routes
Role-based access
Lead Management

The API supports:

Create lead
Get leads
Get lead by ID
Update lead
Delete lead
Assign advisor
Track lead status
Track follow-up date
Store customer requirements
Store recommended plans
Lead Workflow
NEW
 ↓
ASSIGNED
 ↓
CONTACTED
 ↓
QUALIFIED
 ↓
PROPOSAL
 ↓
CONVERTED

Alternative:

LOST
👨‍💼 Advisor Management

The backend provides APIs to:

Create advisor
Get advisors
Get active advisors
Get advisor by ID
Update advisor
Deactivate advisor
Delete advisor when appropriate
View assigned leads
Track advisor lead capacity
Track advisor workload
🤖 Automatic Advisor Assignment

When a new lead is created, the backend can automatically assign the lead to an available advisor.

The system checks:

active = true

and:

currentLeadCount < maxLeads

The advisor with the lowest workload is selected.

Example:

Advisor A → 8 leads
Advisor B → 3 leads
Advisor C → 6 leads


New Lead
   ↓
Advisor B

This helps distribute leads more evenly between advisors.

🛡️ Insurance Plan Management

Insurance plans can contain:

Plan name
Description
Coverage amount
Premium
Policy term
Minimum age
Maximum age
Benefits
Eligibility criteria
Active status

Example:

Basic
Gold
Premium
🎯 Plan Recommendation

When a customer submits a lead, their requirements can be evaluated against insurance plans.

Example customer:

Age: 30
Desired Coverage: 10,000,000
Policy Term: 20 years
Annual Income: 2,000,000

The system evaluates available plans and returns recommended plans.

Example:

Gold
Match Score: 95%


Premium
Match Score: 82%


Basic
Match Score: 65%
🛠️ Technology Stack
Node.js
Express.js
TypeScript
MongoDB
Mongoose
JWT
bcrypt
dotenv
CORS
📁 Project Structure
securelife-crm-backend/
│
├── src/
│   │
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── leadController.ts
│   │   ├── advisorController.ts
│   │   ├── planController.ts
│   │   └── userController.ts
│   │
│   ├── models/
│   │   ├── User.ts
│   │   ├── Lead.ts
│   │   ├── Advisor.ts
│   │   └── InsurancePlan.ts
│   │
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── leadRoutes.ts
│   │   ├── advisorRoutes.ts
│   │   ├── planRoutes.ts
│   │   └── userRoutes.ts
│   │
│   ├── middleware/
│   │   ├── authMiddleware.ts
│   │   └── errorMiddleware.ts
│   │
│   ├── services/
│   │   ├── leadAssignmentService.ts
│   │   └── planRecommendationService.ts
│   │
│   ├── config/
│   │   └── database.ts
│   │
│   ├── seedAdvisors.ts
│   ├── seedPlans.ts
│   └── server.ts
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
⚙️ Requirements

Install:

Node.js 20+
npm
MongoDB
Git

MongoDB can be:

MongoDB Atlas
Local MongoDB installation

Check Node:

node -v

Check npm:

npm -v
📥 Installation

Clone the repository:

git clone https://github.com/YOUR_USERNAME/securelife-crm-backend.git

Move into the backend:

cd securelife-crm-backend

Install dependencies:

npm install
🔐 Environment Variables

Create:

.env

Example:

PORT=5000


MONGODB_URI=mongodb://127.0.0.1:27017/securelife_crm


JWT_SECRET=change_this_to_a_secure_secret


FRONTEND_URL=http://localhost:3000


NODE_ENV=development

For MongoDB Atlas:

MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/securelife_crm
⚠️ Security

Never commit:

.env

to GitHub.

Your .gitignore should contain:

node_modules
dist
.env
.env.local
*.log

Use:

.env.example

to document required variables without exposing secrets.

▶️ Development

Start the backend in development mode:

npm run dev

The server should start at:

http://localhost:5000
🏗️ Production Build

Compile TypeScript:

npm run build

Start production server:

npm start

Expected:

dist/server.js
🔗 API Base URL

Local development:

http://localhost:5000/api

Production:

https://your-backend-domain.com/api
📡 API Endpoints
Authentication
Register
POST /api/auth/register

Example:

{
  "name": "Admin User",
  "email": "admin@securelife.lk",
  "password": "Admin@123",
  "role": "ADMIN"
}
Login
POST /api/auth/login

Example:

{
  "email": "admin@securelife.lk",
  "password": "Admin@123"
}

Response:

{
  "token": "JWT_TOKEN",
  "user": {
    "id": "...",
    "name": "Admin User",
    "email": "admin@securelife.lk",
    "role": "ADMIN"
  }
}
👥 User API
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
📋 Lead API
Create Lead
POST /api/leads

Example:

{
  "name": "Mohamed Nusaif",
  "email": "customer@example.com",
  "phone": "0775555555",
  "age": 30,
  "annualIncome": 2000000,
  "desiredCoverage": 10000000,
  "policyTerm": 20,
  "message": "Interested in family protection."
}
Get Leads
GET /api/leads
Get Lead
GET /api/leads/:id
Update Lead
PUT /api/leads/:id

Example:

{
  "status": "CONTACTED"
}
Assign Lead
PUT /api/leads/:id/assign

Example:

{
  "advisorId": "ADVISOR_ID"
}
Delete Lead
DELETE /api/leads/:id
👨‍💼 Advisor API
Get Advisors
GET /api/advisors
Get Active Advisors
GET /api/advisors/active
Get Advisor Details
GET /api/advisors/:id

The response includes:

Advisor details
+
Assigned leads
+
Statistics

Example:

{
  "advisor": {
    "name": "Sarah Fernando",
    "employeeId": "ADV002",
    "email": "sarah@securelife.lk",
    "phone": "0722222222",
    "specialization": "Family Protection",
    "active": true,
    "maxLeads": 20,
    "currentLeadCount": 7
  },


  "statistics": {
    "totalLeads": 7,
    "newLeads": 1,
    "contactedLeads": 2,
    "qualifiedLeads": 2,
    "convertedLeads": 1,
    "lostLeads": 1
  }
}
Create Advisor
POST /api/advisors

Example:

{
  "name": "Kasun Perera",
  "email": "kasun@securelife.lk",
  "phone": "0711111111",
  "employeeId": "ADV001",
  "specialization": "Life Insurance",
  "maxLeads": 20,
  "active": true
}
Update Advisor
PUT /api/advisors/:id

Example:

{
  "specialization": "Family Protection",
  "maxLeads": 25
}
Deactivate Advisor
PUT /api/advisors/:id

Example:

{
  "active": false
}

Inactive advisors will not receive new automatically assigned leads.

Delete Advisor
DELETE /api/advisors/:id

The system should prevent deleting advisors who still have assigned leads.

🛡️ Insurance Plan API
Get Plans
GET /api/plans
Get Plan
GET /api/plans/:id
Create Plan
POST /api/plans

Example:

{
  "name": "Gold",
  "description": "Comprehensive family protection plan",
  "coverageAmount": 10000000,
  "premium": 25000,
  "policyTerm": 20,
  "minimumAge": 25,
  "maximumAge": 55,
  "benefits": [
    "Life coverage",
    "Family protection",
    "Critical illness benefit"
  ],
  "active": true
}
Update Plan
PUT /api/plans/:id
Delete Plan
DELETE /api/plans/:id
🧠 Automatic Lead Processing

When a customer submits a lead:

POST /api/leads
        ↓
Validate customer information
        ↓
Find matching insurance plans
        ↓
Calculate recommendation score
        ↓
Find available advisor
        ↓
Assign lead
        ↓
Increase advisor lead count
        ↓
Save lead
        ↓
Return result
🔄 Advisor Assignment Logic

The system searches for advisors where:

active = true

and:

currentLeadCount < maxLeads

Then sorts by:

currentLeadCount ASC

Example:

Advisor             Leads


Kasun                8
Sarah                3
Dinesh               6

New lead:

Sarah

After assignment:

Kasun                8
Sarah                4
Dinesh               6
🌱 Seed Data

The backend includes seed scripts for development.

Example:

npx tsx src/seedAdvisors.ts

Seed insurance plans:

npx tsx src/seedPlans.ts

Example advisors:

ADV001
Kasun Perera


ADV002
Sarah Fernando


ADV003
Dinesh Kumar
🧪 API Testing with Postman

The API can be tested using Postman.

Recommended testing order:

1. Register
2. Login
3. Copy JWT token
4. Create insurance plans
5. Create advisors
6. Get advisors
7. Create lead
8. Verify automatic advisor assignment
9. Get leads
10. Get advisor details
11. Manually reassign lead
12. Update lead status
🔑 Postman Authorization

For protected endpoints use:

Authorization
→ Bearer Token
→ JWT_TOKEN

Example:

Bearer eyJhbGciOiJIUzI1NiIs...
🗃️ MongoDB Collections

The application uses MongoDB collections similar to:

users
leads
advisors
insuranceplans
📊 Lead Document Example
{
  "_id": "LEAD_ID",


  "name": "Mohamed Nusaif",


  "email": "customer@example.com",


  "phone": "0775555555",


  "status": "ASSIGNED",


  "assignedAdvisor": {
    "advisorId": "ADVISOR_ID",
    "name": "Sarah Fernando",
    "email": "sarah@securelife.lk"
  },


  "assignedAt": "2026-08-15T00:00:00.000Z",


  "recommendedPlans": [
    {
      "planName": "Gold",
      "matchScore": 95
    }
  ]
}
🛡️ Security Practices

The backend implements or is designed to support:

JWT authentication
Password hashing
Environment variables
CORS configuration
Input validation
Role-based authorization
Protected API endpoints
MongoDB schema validation
Error handling
No secrets committed to GitHub
🌐 Frontend Integration

The frontend repository is:

securelife-crm-frontend

Frontend:

http://localhost:3000

Backend:

http://localhost:5000

API:

http://localhost:5000/api
🚀 Deployment

The backend can be deployed using:

Render
Railway
AWS EC2
Google Cloud
Azure

MongoDB can be hosted using:

MongoDB Atlas

Production environment example:

PORT=5000


MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/securelife_crm


JWT_SECRET=YOUR_SECURE_RANDOM_SECRET


FRONTEND_URL=https://your-frontend-domain.com


NODE_ENV=production
🌍 Production Architecture
                    Internet
                       │
                       ▼
             ┌──────────────────┐
             │ Next.js Frontend  │
             │     Vercel        │
             └────────┬─────────┘
                      │
                      │ HTTPS
                      ▼
             ┌──────────────────┐
             │ Express Backend  │
             │     Render       │
             └────────┬─────────┘
                      │
                      │ MongoDB Driver
                      ▼
             ┌──────────────────┐
             │  MongoDB Atlas   │
             └──────────────────┘
🧪 Production Checklist

Before deployment:

[ ] Remove console debugging
[ ] Configure production environment variables
[ ] Generate secure JWT secret
[ ] Configure MongoDB Atlas
[ ] Configure CORS
[ ] Test authentication
[ ] Test lead creation
[ ] Test advisor assignment
[ ] Test plan recommendation
[ ] Test all CRUD endpoints
[ ] Test error handling
[ ] Test frontend/backend integration
📈 Future Improvements

Possible future improvements:

Redis caching
Advanced lead scoring
AI-powered recommendations
Email notifications
SMS notifications
Advisor performance analytics
Audit logging
Activity history
Automated follow-up reminders
Appointment management
File/document uploads
Policy enrollment workflow
Payment integration
Advanced reporting
Docker containerization
CI/CD pipeline
👨‍💻 Development

This project was developed as an IT internship assignment for:

SecureLife Insurance PLC

The backend demonstrates:

REST API development
Express.js
TypeScript
MongoDB
Mongoose
JWT authentication
CRM business logic
Lead management
Advisor management
Insurance plan management
Automatic lead assignment
API integration
📄 License

This project was created for educational and internship evaluation purposes.
