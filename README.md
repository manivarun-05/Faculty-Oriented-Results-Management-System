![FORMS Banner](forms_banner_1773251239697.png)

# FORMS: Faculty Oriented Results Management System

**FORMS** is a state-of-the-art, data-driven platform designed for **Dr. V.R.K Women's College of Engineering and Technology** to streamline academic performance tracking, results analysis, and institutional improvement planning. Built with a modern tech stack, FORMS empowers faculty with actionable insights to enhance student success.

---

## ✨ Key Features

- 📊 **Advanced Dashboards**: Interactive visualizations of SEM-I results across all engineering branches (CSE, AIDS, CSE-DS, AI&ML, ECE, EEE).
- 📈 **Entity-Level Analysis**: Shift from individual student tracking to branch and subject-level performance metrics.
- 📄 **Automated Improvement Plans (APIP)**: One-click generation of professional Academic Performance Improvement Plans in PDF and Markdown formats.
- 📁 **Seamless Data Integration**: Robust CSV parsing system for bulk results uploading and processing.
- 🛡️ **Secure Access**: Role-based authentication (RBAC) ensuring data integrity and secure faculty access.
- 🎨 **Premium UI/UX**: A sleek, Material Design-inspired interface built with Tailwind CSS and Ant Design, featuring dark mode support and smooth animations.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React.js](https://reactjs.org/) (Vite)
- **UI Components**: [Ant Design (AntD)](https://ant.design/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/) & [Ant Design Plots](https://ant-design-charts.antgroup.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **ORM**: [Sequelize](https://sequelize.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Authentication**: JWT & Bcrypt.js

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- npm or yarn

### 1. Repository Setup
```bash
git clone https://github.com/manivarun-05/Faculty-Oriented-Results-Management-System.git
cd Faculty-Oriented-Results-Management-System
```

### 2. Backend Configuration
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (`.env`):
   ```env
   PORT=5000
   DB_NAME=forms_db
   DB_USER=postgres
   DB_PASS=your_password
   DB_HOST=localhost
   JWT_SECRET=your_secret_key
   ```
4. Run migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

### 3. Frontend Configuration
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```

---

## 📁 Project Structure

```text
├── backend/
│   ├── controllers/      # Business logic
│   ├── models/           # Sequelize database models
│   ├── routes/           # API endpoints
│   ├── utils/            # CSV Parsing & PDF Gen utilities
│   └── index.js          # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Dashboard & Management views
│   │   ├── services/     # API integration (Axios)
│   │   └── App.jsx       # Routing & Core Logic
│   └── vite.config.js    # Build configuration
└── Improvement_Plan.md   # Sample APIP document
```

---

## 📝 Usage

1. **Login**: Access the faculty portal with your credentials.
2. **Upload Results**: Navigate to the "Upload" section and drop your results CSV file.
3. **Analyze**: View aggregated statistics on the main dashboard.
4. **Generate APIP**: Click "Generate Improvement Plan" to download the strategic document for the current semester.

---

## 🤝 Contributing
For updates and feature requests, please contact the Academic Audit Committee or the development team at Dr. V.R.K Women's College.

---

## 📄 License
This project is licensed under the ISC License.

---
Developed with ❤️ for **Dr. V.R.K Women's College of Engineering and Technology**.