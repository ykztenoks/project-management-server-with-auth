# ExpressJS & MongoDB Lab Exercise

Welcome to the ExpressJS & MongoDB lab! In this exercise, you'll be creating an Express app with a MongoDB connection. The purpose of this lab is to get you familiar with setting up an Express server, handling routes, using MongoDB for data persistence, and defining models with Mongoose. Follow the instructions below carefully, and don't hesitate to ask for help if you get stuck.

## Getting Started

1. **Initialize a npm package**
   - Run the command to initialize a new npm package. Use the flag to automatically generate a package.json file without any prompts.

```
npm init --y
```

2. **Install dependencies**
   - Install Express, Morgan, dotenv, and Mongoose using npm.

```
  npm install express morgan mongoose dotenv
```

3. **Install Nodemon (if you haven't yet)**

   - Install Nodemon globally using npm. The `-g` flag allows you to use Nodemon in any project without needing to install it every time.

4. **Add a `dev` script to `package.json`**
   - Open your `package.json` file and add a new script under the `scripts` section that will run Nodemon with your main application file.

```
  "dev": "nodemon app.js"
```

5. **Create `app.js` file**
   - In the root of your project directory, create a new file named `app.js`.

## Iteration 1. Setting Up Your Server

1. **Import Express**

   - In your `app.js` file, import the Express module.

2. **Instantiate Express**

   - Create an instance of Express and assign it to a variable.

3. **Require Morgan**

   - Import the Morgan module for logging.

4. **Create a logger variable**

   - Instantiate Morgan with a specific configuration and assign it to a variable.

5. **Create a .env file**

   - Create a .env file and include variables for PORT and MONGODB_URI. Then make sure to import the env config in the app.js.

   ```
   require("dotenv").config()
   ```

   _after that, you will be able to use the variables through ***process.env.NAME_OF_VARIABLE***_

6. **Use the logger as middleware**

   - Use the Morgan logger as middleware in your Express app.

7. **Run the server**
   - Use the npm script you defined earlier to start the server. Verify that you see the console log feedback indicating the server is running correctly.

## Iteration 2. Connecting to MongoDB

1. **Create a `config` folder**

   - In the root of your project directory, create a folder named `config`.

2. **Create a `mongoose.config.js` file**

   - In the `config` folder, create a file named `mongoose.config.js`.

3. **Set up a connect function**
   - In the `mongoose.config.js` file, create a function to connect to MongoDB using Mongoose. Ensure that you export this function so it can be used in `app.js` to then call the function.

## Iteration 3. Defining Models

1. **Create a `models` folder**

   - In the root of your project directory, create a folder named `models`.

2. **Define the Project model**

   - In the `models` folder, create a file named `Project.js`. Define a Mongoose schema for the Project model with the following fields: `title`, `description`, and `tasks`. The `tasks` field should be an array of references to the Task model.

3. **Define the Task model**
   - In the `models` folder, create a file named `Task.js`. Define a Mongoose schema for the Task model with the following fields: `title`, `status`, and `project`. The `project` field should be a reference to the Project model.

## Iteration 4. Creating Routes

1. **Create a `routes` folder**

   - In the root of your project directory, create a folder named `routes`.

2. **Define Project routes**

   - In the `routes` folder, create a file named `project.routes.js`. Define the following routes:
     - A GET route to retrieve all projects.
     - A GET route to retrieve a single project by its ID.
     - A POST route to create a new project.
     - A PUT route to update an existing project by its ID.
     - A DELETE route to delete an existing project by its ID. (_***As a bonus, try to delete all of the tasks that belong to that project***_)

3. **Define Task routes**
   - In the `routes` folder, create a file named `task.routes.js`. Define the following routes:
     - A POST route to create a new task. The request body should include the project ID to which the task belongs.
     - A PUT route to update an existing task by its ID, specifically for updating its status.
     - A DELETE route to delete an existing task by its ID. (Remove the task from the project task array it belongs as well)

## Iteration 5. Testing Your Routes

To test your routes, use Postman, Insomnia, or even your browser (for GET requests). This will help you verify that your endpoints are working as expected.

Happy coding!
