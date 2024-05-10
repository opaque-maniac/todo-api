# Todo-List Api

## Description

This project implements a RESTful API for managing to-do lists using Express.js and Prisma. It allows users to create, read, update, and delete tasks and sub-tasks, providing a structured approach to managing their daily activities.

### Key Features:

1. **Task Management**: Users can create new tasks with titles and optional descriptions. They can also retrieve, update (title, description, completion status), and delete existing tasks.
2. **Sub-task Management**: Nested within tasks, sub-tasks offer further granularity. Users can create new sub-tasks, view them within a specific task, update their titles and completion status, and delete them as needed.
3. **Database Integration**: Prisma acts as an Object-Relational Mapper (ORM), simplifying interaction with a relational database. This ensures data persistence and allows efficient retrieval and manipulation of tasks and sub-tasks.

## Technology Stack:

1. **Express.js**: A popular Node.js framework for building web applications and APIs, providing a flexible architecture for handling requests and responses.
2. **Prisma**: An ORM that acts as a bridge between your Node.js application and the database. It simplifies data access by automatically generating queries and migrations, reducing boilerplate code.
   Benefits:
3. **Organized Task Management**: Users can effectively manage their to-do lists with clear separation between tasks and sub-tasks.
4. **RESTful API**: The API adheres to RESTful principles, allowing seamless integration with various client-side applications.

**_Scalability_: The chosen technologies offer a scalable foundation for handling a growing number of tasks and users.**

## Getting Started:

1. Clone the project repository.
   `git clone https://github.com/opaque-maniac/todo-api.git`
2. Install dependencies using npm install.
   `cd todo-api`
3. Configure your database connection details in prisma/schema.prisma.
   - Change the environment variable for the `DATABASE_URL`
     - _Add an external url for a database server_
   - Execute the following command:
     - `npx prisma init`
4. Run database migrations using npx prisma migrate dev.
   `npx prisma migrate dev`
5. Start the server. Use the command:
   `npm run dev`

## API Endpoints:

1. **POST /register**:
   - Endpoint to register a new user
   - Data required is of type:
     `{
    "email": "test@example.com",
    "name": "Example User",
    "password": "testexampleuser"
}`

Note: This is a basic example. You can implement user authentication and authorization for a more robust solution.
