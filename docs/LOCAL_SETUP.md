# Local Setup Guide

## Prerequisites
- Python 3.10+
- Node.js 18+ & npm

## Backend Setup
1. Navigate to backend folder:
   ```bash
   cd backend
   ```
2. Create and activate virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install django djangorestframework djangorestframework-simplejwt django-cors-headers pymysql Pillow python-barcode drf-spectacular pytest
   ```
4. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
5. Seed demo data:
   ```bash
   python manage.py seed_demo_data
   ```
6. Run development server:
   ```bash
   python manage.py runserver 8000
   ```

## Frontend Setup
1. Navigate to frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:5173 in your browser.
