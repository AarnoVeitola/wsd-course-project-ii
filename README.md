# Project 2: Drill and Practice (an individual project for the Aalto University Web Software Development course)

This project contains a web application used for repeated practice of learned content. The application uses a three-tier architecture (client, server, database) and a layered architecture with four layers (views, controllers, services, database). The project is deployed online at https://aarno-unique-wsd-course-project-ii.onrender.com (deployed on the free version of Render, so the site may take some time to load). Admin features in the deployed application can be accessed with the same admin credentials as specified in the assignment description.

## Structure

### Services and controllers

The application contains five different services for querying the database. The services are used by six controllers: **mainController.js**, **userController.js**, **topicController.js**, **questionController.js**, **optionController.js**, and **quizController.js**. The controllers have functionality for the main page, authentication via login and registration, topics, questions, options, and quizzes, respectively. Some controllers (e.g. **topicController.js**) use several different services. 

### Middleware

In addition to the standard middleware, the project uses **authMiddleware.js** to make sure that the user is authenticated and authorized to access certain pages.

### Views

In addition to ten views, the project also includes one general layout and a partial used by the layout. The partial includes a *navbar* that is displayed on each view. The project is styled using Bootstrap. 

### APIs

The project also includes an API for fetching a random question and checking if an answer is correct. A random question can be fetched as a JSON document by making a GET request to */api/questions/random*. The correctness of an answer can be checked by making a POST request to */api/questions/answer* including a JSON document with the **questionId** and **optionId**.

## Running the application

The application can be run locally with Docker simply by running the command *docker compose up*.

## Testing

The project includes ten end-to-end tests for testing the functionality of the application. The tests can be run by using the command *docker compose run --entrypoint=npx e2e-playwright playwright test && docker compose rm -sf*.
