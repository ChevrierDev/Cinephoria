# Cinephoria

##### Cinephoria is a comprehensive cinema management system built with modern web, mobile, and desktop technologies. It encompasses a web application for managing movies, showtimes, and reservations, a mobile application for users to view their reservations and display a scannable QR code for ticket verification, and a desktop application for cinema employees to manage incidents like broken seats and maintenance.

# Technologies Used:

##### Web Application: EJS, Express.js, Node.js, JavaScript, TailwindCSS
##### Mobile Application: React Native
##### Desktop Application: Electron.js
##### Database: PostgreSQL, MongoDB
##### Cinephoria aims to streamline the operations of cinemas and enhance the experience for both customers and employees.

# Local deployement:

# WEB APPLICATION

## To set up the project locally, follow these steps:

### Clone the repository:
```
git clone https://github.com/your-username/cinephoria.git
cd cinephoria
```
### Initialize the project with npm:
```
npm init
```

### Install the necessary dependencies:
```
npm install autoprefixer bcrypt connect-flash cookie-parser crypto date-fns date-fns-tz dotenv ejs express express-session express-validator he jsonwebtoken method-override moment moment-timezone mongodb mongoose morgan multer node-cron nodemailer nodemon passport passport-jwt pg postcss postcss-cli serve-favicon uuid
npm install --save-dev autoprefixer jest prettier prettier-plugin-tailwindcss supertest tailwindcss
```
### Ensure your package.json includes the following scripts:
```
{
  "name": "cinephoria",
  "version": "1.0.0",
  "description": "Projet ECF Studi sur une chaîne de cinéma nommée Cinépholia",
  "main": "index.js",
  "scripts": {
    "server": "nodemon server/server.js",
    "test": "jest --detectOpenHandles",
    "test-watch": "jest --watch",
    "build-css": "postcss ./client/public/css/input.css -o ./client/public/css/output.css",
    "watch-css": "postcss ./client/public/css/input.css -o ./client/public/css/output.css --watch",
    "prettier": "npx prettier --write \"./client/**/*.ejs\" --parser html"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "auto-prefixer": "^0.4.2",
    "bcrypt": "^5.1.1",
    "connect-flash": "^0.1.1",
    "cookie-parser": "^1.4.6",
    "crypto": "^1.0.1",
    "date-fns": "^3.6.0",
    "date-fns-tz": "^3.1.3",
    "dotenv": "^16.4.5",
    "ejs": "^3.1.10",
    "express": "^4.19.2",
    "express-session": "^1.18.0",
    "express-validator": "^7.1.0",
    "he": "^1.2.0",
    "jsonwebtoken": "^9.0.2",
    "method-override": "^3.0.0",
    "moment": "^2.30.1",
    "moment-timezone": "^0.5.45",
    "mongodb": "^6.7.0",
    "mongoose": "^8.4.1",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "node-cron": "^3.0.3",
    "nodemailer": "^6.9.13",
    "nodemon": "^3.1.2",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "pg": "^8.12.0",
    "postcss": "^8.4.38",
    "postcss-cli": "^11.0.0",
    "serve-favicon": "^2.5.0",
    "uuid": "^10.0.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.19",
    "jest": "^29.7.0",
    "prettier": "^3.2.5",
    "prettier-plugin-tailwindcss": "^0.6.1",
    "supertest": "^7.0.0",
    "tailwindcss": "^3.4.3"
  }
}
```
### Set up Tailwind CSS:
##### Follow the official Tailwind CSS installation guide to configure Tailwind CSS in your project.

### Create the input.css file:
##### Ensure you have a input.css file in your project directory (./client/public/css/input.css) with the following content:
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
### Build and watch CSS:
#####  Before running these commands, ensure Tailwind CSS is properly set up and the input.css file is created as described above.
```
npm run build-css
npm run watch-css
```
### Additional Information
##### Testing: To run tests, use npm run test or npm run test-watch for watching changes.
##### Prettier: To format your EJS files, use npm run prettier.
##### By following these steps, you will be able to set up and run the Cinephoria project locally on your machine.

### Configure the .env file
##### Before starting the server, make sure you have a .env file in the root of your project with the following content:
```
PORT=your_port
DB_HOST=your_host
DB_USER=your_db_user
DB_NAME=your_db_name
DB_PORT=5432
DB_PASSWORD=your_db_password
SECRET=your_secret
JWT_SECRET=your_jwt_secret
USER_EMAIL=your_email@example.com
USER_PASSWORD=your_email_password
MONGODB_URI=your_mongodb_uri
```
### Run the server:
```
npm run server
```

# DESKTOP APPLICATION
### Navigate to the desktop directory:
```
cd desktop
```
### Initialize the project with npm:
```
npm init
```

### Install the necessary dependencies:
```
npm install electron autoprefixer postcss tailwindcss axios dotenv toastify-js
```
### Ensure your desktop/package.json includes the following scripts:
```
{
  "name": "desktop",
  "productName": "Cinéphoria",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "build:css": "tailwindcss build -i views/css/styles.css -o views/css/output.css",
    "watch:css": "tailwindcss build -i views/css/styles.css -o views/css/output.css --watch"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "autoprefixer": "^10.4.19",
    "electron": "^31.1.0",
    "postcss": "^8.4.39",
    "tailwindcss": "^3.4.4"
  },
  "dependencies": {
    "axios": "^1.7.2",
    "dotenv": "^16.4.5",
    "toastify-js": "^1.12.0"
  }
}
```
### Set up Tailwind CSS:
##### Follow the official Tailwind CSS installation guide to configure Tailwind CSS in your desktop project.

### Create the styles.css file:
#### Ensure you have a styles.css file in your views/css directory with the following content:
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Configure the .env file:
#### Before starting the desktop application, make sure you have a .env file in the desktop directory with the following content:
```
NODE_ENV=development
```
### Build and watch CSS:
#### Before running these commands, ensure Tailwind CSS is properly set up and the styles.css file is created as described above.
```
npm run build:css
npm run watch:css
```
### Run the desktop application:
```
npm start
or
npx electronmon .
```




