#Paste App

A simple paste app built using Vite and React.

Features

Create and store text snippets (pastes)

Search pastes by title

View individual pastes

Tech Stack

Vite: Fast build tool for modern web applications

React: Frontend library for building UI

React Router: For navigation and dynamic routing

Installation

Prerequisites

Node.js (>= 14)

npm or yarn

Steps

Clone the repository:

git clone https://github.com/your-username/paste-app.git
cd paste-app

Install dependencies:

npm install  # or yarn install

Start the development server:

npm run dev  # or yarn dev

Open http://localhost:5173/ in your browser.

Usage

Add a new paste by entering a title and content.

Search for pastes using the search bar.

Click on a paste to view its details.

Folder Structure

Paste-App/
├── src/
│   ├── components/   # Reusable UI components
│   ├── pages/        # Page components (Home, PasteDetails)
│   ├── App.jsx       # Main App component
│   ├── main.jsx      # Entry point
│   ├── routes.js     # Defines app routes
├── public/           # Static assets
├── index.html        # Root HTML file
├── package.json      # Project metadata and dependencies
├── vite.config.js    # Vite configuration
└── README.md         # Project documentation

Deployment

To build the app for production:

npm run build  # or yarn build

This generates a dist/ folder with optimized assets. Deploy it using Netlify, Vercel, or any static hosting service.

License

This project is licensed under the MIT License.

Author

Turbash Negi - https://github.com/Turbash

