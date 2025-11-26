# NexLearn MCQ Exam

A fully responsive and optimized frontend application built using Next.js, Tailwind CSS, and modern development best practices.
The project implements authentication, state management, reusable UI components, and performance-focused architecture.
 
## 🚀 Tech Stack

* Next.js (Latest Version)
* React
* Tailwind CSS
* TypeScript
* Axios
* JWT Authentication & Token Refresh

## ✨ Features

* Pixel-perfect UI based on provided Figma
* Fully responsive layout (mobile → desktop)
* JWT auth with access + refresh tokens
* Exam module: question listing, answering, and submission
* Organized file structure with reusable components


## 📁 Folder Structure
    |-src
        ├── components/
        │   ├── Auth.tsx
        │   ├── ComprehensionModal.tsx
        │   ├── DetailsStep.tsx
        │   ├── Navbar.tsx
        │   ├── OtpStep.tsx
        │   ├── PhoneStep.tsx
        │   ├── QuestionCard.tsx
        │   ├── ResultCard.tsx
        │   ├── SubmitConfirmModal.tsx
        │
        ├── app/
        │   ├── login/
        │       ├── page.tsx
        │   ├── instructions/
        │       ├── page.tsx
        │   ├── mcq/
        │       ├── page.tsx
        │   ├── service/
        │       ├── AuthApi.ts   // axios + API calls
        │   ├── global.css
        │   ├── layout.tsx
        │   ├── page.tsx
        │
        ├── utils/
        │   ├── constants.ts
        │   ├── custom-icon.tsx
        ├── public/
    |-.env    # Credential data
    

## 🛠 Installation & Setup
1. Clone the Repository
    ```
    git clone <repository-url>
    cd <project-folder>
2. Install Dependencies
    ```
    npm install
3. Configure Environment Variables
   Create a .env file:
   ```
   NEXT_PUBLIC_BASE_URL=https://nexlearn.noviindusdemosites.in/
* Start the server on localhost:3000 to bypass CORS.
4. Run the Development Server
   ```
   npm run dev


## 🔐 Authentication Flow
* User enters mobile → send OTP
* Enter OTP → verify OTP
* If user exists → login tokens returned
* If new user → create profile (name, email, qualification, image)
* Access & refresh tokens stored securely

## ❗ Error Handling
All endpoints return:

* HTTP 400 → invalid request

* HTTP 401 → unauthorized

* HTTP 500 → server error

   
   
   

   


