Dog Image Gallery with Upload Functionality
-
This project is an interactive web application that lets users view a paginated gallery of dog images fetched from the Hyperlink removed for security reasons. Users can also upload their own dog images to the API and provide a description for the uploaded images.
 
Features
-
Browse and View Dog Images:
- Paginated list of dog images fetched from the Dog API.
- Includes additional information about each dog's breed, group, and purpose (if available).

Upload Your Own Images:
- Allows users to upload their own dog images to the Dog API with custom descriptions.
- File uploads are supported with real-time API integration for seamless updates.

Flexible Interactions:
- Easily edit custom image descriptions for fetched or uploaded images.
- Responsive design ensures the application looks great on all devices.
 
Technologies Used
-
Frontend

- HTML5 and CSS3: Markup and basic styling for the UI.
- Bootstrap 5: Responsive, mobile-first interface with modern styles.
- JavaScript (ES6): DOM manipulation for rendering fetched/updated data dynamically.

Backend API

- Dog API:
  - Fetches dog images through /v1/images/search.
  - Supports image uploads with /v1/images/upload.

Libraries
- Axios: For making HTTP requests to the Dog API.
- dotenv: Manage project-sensitive variables like an API key.
- Pagination Utilities: Custom JavaScript for paginated data retrieval and rendering.
