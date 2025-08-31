# Conceptual Design: To-Do List Web Application

This document outlines the conceptual design for the To-Do List web application, based on the requirements specified in the `SRS.md` document.

## 1. High-Level Architecture

The application will be a client-side, single-page application (SPA). This architecture is simple, fast, and meets the SRS requirement of having no backend server.

*   **View (HTML/CSS):** A single HTML file (`index.html`) will define the user interface structure. A CSS file (`styles.css`) will handle all visual styling to ensure a clean and intuitive user experience.
*   **Logic (JavaScript):** A single JavaScript file (`app.js`) will contain all the application logic. This includes handling user interactions (like button clicks), managing the application's state (the list of tasks), and updating the user interface.
*   **Data Storage (Browser Local Storage):** To meet the requirement of data persistence between sessions without a database, the application will use the browser's `localStorage`. The list of tasks will be stored as a JSON string.

## 2. User Flow

The user's journey through the application will be as follows:

1.  **Load Application:** When the user opens the app, the JavaScript code will immediately check `localStorage` for any saved tasks. If tasks exist, they will be loaded and displayed on the screen.
2.  **Add a Task:** The user types a task into an input field and clicks an "Add" button. The application creates a new task object, adds it to the list in memory, updates the display, and saves the entire list back to `localStorage`.
3.  **Edit a Task:** The user clicks an "Edit" button on an existing task. The task's text becomes an editable field. After making changes, the user saves them. The application updates the task in the list, refreshes the display, and saves the changes to `localStorage`.
4.  **Mark Task as Complete:** The user clicks a checkbox next to a task. The application toggles the task's completion status. The UI is updated to visually distinguish the completed task (e.g., with a strikethrough), and the new state is saved to `localStorage`.
5.  **Delete a Task:** The user clicks a "Delete" button on a task. The application removes the task from the list, updates the UI, and saves the modified list to `localStorage`.

## 3. Main Components

The JavaScript code (`app.js`) will be structured around a few key conceptual components:

*   **Task Manager:** This component will be the core of the application's logic. It will maintain the array of tasks in memory and contain methods for adding, editing, deleting, and toggling the completion status of tasks.
*   **DOM Manager:** This component will be responsible for all interactions with the HTML document. It will render the task list, listen for user events (e.g., `click`, `submit`), and update the view whenever the task list changes.
*   **Storage Manager:** This component will handle all communication with the browser's `localStorage`. It will be responsible for saving the task list (serializing to JSON) and loading it (deserializing from JSON).

## 4. Technology Choices

As per the SRS, the technology stack will be simple and focused on core web technologies:

*   **HTML5:** For the semantic structure of the application.
*   **CSS3:** For all styling, ensuring a responsive and visually appealing layout.
*   **JavaScript (ES6+):** For all application logic. We will use modern JavaScript to keep the code clean and maintainable, without any external frameworks or libraries.
*   **Project Structure:**
    ```
    /
    |-- index.html
    |-- styles.css
    |-- app.js
    |-- SRS.md
    |-- CONCEPTUAL_DESIGN.md
    ```
