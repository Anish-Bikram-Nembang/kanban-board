# Kanban Board

A lightweight Kanban board built with **vanilla JavaScript and Node.js**, featuring persistent storage, full column/task movement, and keyboard-accessible editing.

The project focuses on implementing core Kanban functionality without external frameworks or libraries.

---

## Overview

This project is a minimal Kanban board application designed to explore frontend architecture and DOM manipulation while using a very simple backend for persistence.

The frontend is implemented using **plain JavaScript, HTML, and CSS**, while the backend uses **vanilla Node.js** to serve the application and store board state in a JSON file.

The board supports dynamic creation and movement of columns and tasks, along with inline renaming and keyboard-friendly interactions.

---

## Features

* Create, rename, and manage **columns**
* Create and rename **tasks**
* **Move tasks between columns**
* **Reorder tasks within columns**
* **Move columns across the board**
* Inline **double-click renaming**
* **Keyboard accessibility**

  * `Enter` confirms renaming
  * `Enter` creates tasks and columns
* **Persistent storage** using a JSON database
* Built using the **native browser Drag and Drop API**
* No frameworks or external UI libraries

---

## Tech Stack

Frontend:

* Vanilla JavaScript
* HTML
* CSS

Backend:

* Node.js (no Express)

Storage:

* JSON file database (`data.json`)

---

## Project Structure

```
kanban-board/
│
├── index.html
├── main.js
├── style.css
├── README.md
├── package.json
├── data.json              # persistent storage
│
└── src/
    ├── Board.js
    ├── db.js
    ├── server.js
    ├── utils.js
    │
    ├── Factory/
    │   ├── Column.js
    │   └── Task.js
    │
    └── Renderers/
        ├── Render.js
        ├── renderColumn.js
        ├── renderColumnTemplate.js
        └── renderTask.js
```

---

## Running the Project

Clone the repository and run the development server.

```
npm install
npm run dev
```

The server will start on:

```
http://localhost:3000
```

The backend serves the frontend files and handles persistence.

---

## Data Persistence

Board state is stored in:

```
data.json
```

This file acts as a simple database and stores:

* column structure
* task data
* column/task ordering

The backend reads and writes to this file when changes occur.

---

## Interaction Model

### Creating Items

* Columns can be created directly from the board interface.
* Tasks can be created inside any column.

### Renaming

* Double-click a column or task name to rename.
* Press **Enter** to confirm changes.

### Moving Items

The board uses the **native HTML Drag and Drop API**.

Supported operations:

* Move tasks within a column
* Move tasks across columns
* Reorder columns

All moves update both the **DOM and the stored board state**.

---

## Accessibility

Basic keyboard interaction is supported:

| Key   | Action                                                 |
| ----- | -------------------------------------------------------|
| Enter | Confirm rename                                         |
| Enter | Create new tasks/columns (while inside an input field) |

This allows basic interaction without relying exclusively on mouse input.

---

## Screenshots

*(Design currently in progress — screenshots will be added once finalized.)*

---

## Limitations

* Not currently **mobile responsive**
* Uses a **JSON file instead of a real database**
* No authentication or multi-user support

---
