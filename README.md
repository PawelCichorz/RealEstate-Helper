# Real Estate Management Application

This is an innovative project designed specifically for real estate agents, built with Next.js. The application features a frontend that connects seamlessly with a REST API, providing a secure and efficient platform for managing property listings.

## Features

- **Secure Registration and Login**: The application fully supports secure user registration and login, ensuring that all user data is protected.
- **Property Management**: After logging in, users can easily add essential information about properties available for sale. 
- **Property List**: Users have access to a list of their properties, allowing them to view, delete, or generate PDFs for their listings.
- **Token-Based Authentication**: The app employs JWT (JSON Web Tokens) for secure authentication, enhancing overall security and user experience.
- **Database Integration**: Utilizes PostgreSQL to manage and store property data effectively.

## Technologies Used

- **Secure Registration and Login**: The application fully supports secure user registration and login, ensuring that all user data is protected.
- **Property Management**: After logging in, users can easily add essential information about properties available for sale. 
- **Property List**: Users have access to a list of their properties, allowing them to view, delete, or generate PDFs for their listings.
- **Token-Based Authentication**: The app employs JWT (JSON Web Tokens) for secure authentication, enhancing overall security and user experience.
- **Database Integration**: Utilizes PostgreSQL to manage and store property data effectively.
- **PDF Generation**: Integrates with **jsPDF** to generate downloadable PDFs of property listings, making it easy for users to present their properties professionally.

- 
## How to run App 
git clone  https://github.com/PawelCichorz/RealEstate-Helper.git
npm install
In the backend directory, create a .env file and add the following variables:

DATABASE_URL=your_database_url  # Replace with your Postgresql URL
JWT_SECRET=your_jwt_secret  # Replace with a secure JWT secret

npm start
npm run dev

## Functionality

The Real Estate Management Application provides a comprehensive suite of features for real estate agents, allowing them to manage property listings efficiently. The key functionalities include:

- **User Registration**: Users can create a new account by providing necessary details, enabling them to access the application's features securely.

- **User Login**: Registered users can log in using their credentials. The application employs secure authentication practices to protect user information.

- **Middleware Protection**: The application includes middleware that verifies user tokens to protect certain routes, ensuring that only authenticated users can access sensitive functionalities.

- **Dynamic Question Handling**: Upon selecting a property type, users are presented with a set of predefined questions tailored to the selected type (e.g., Apartment, House, Land, or Commercial Space). This dynamic questionnaire allows users to provide detailed information about properties.

- **Adding New Properties**: Users can add new properties by answering a series of questions generated based on their selected property type. The application collects and organizes this information for further processing.

- **Viewing and Managing Listings**: Users can view their submitted property listings in a dedicated list format, with options to delete or modify existing entries.

- **PDF Generation**: The application uses **jsPDF** to generate and download PDF documents containing property details, allowing users to present their listings in a professional format.

- **Logout Functionality**: Users can securely log out from their sessions, ensuring that their accounts remain protected.

- **Property Deletion**: Users have the ability to delete their property listings from the database, ensuring they can manage their entries efficiently.

This functionality makes the application a valuable tool for real estate professionals, enhancing their ability to manage properties and streamline their workflows.


## Author
Pawel cichorz pawelcichorz74@gmail.com
