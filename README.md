# Richard Mena Tasktracker

Throughout my journey of making this project, I had to go through 2-3 different iterations before finally settling on this one.
At first glance, I thought to myself this project was going to be a piece of cake but by the end I realized this was definitely not the case.
On my first iteration of this project, I was under the impression that the use of fs (filesystem) was optional. As a result, I began to research localStorage. Local storage is simply an object that allows you to save values in the browser. Later on I realized this was an issue
since the project needed data from a json file to be edited, created and deleted. Upon realizing this I immediately began to research rest APIs, CRUD operations and I went through countless sites on express documentation, fetch documentation, and of course w3schools and mdn.
Now that I was aware of all that was required I first began my final iteration by creating my server first. To begin I imported all the packages required which were filesystem and the express framework. I then established my port and moved on to creating the routes. Harold was a big help on this project as he gave the class a brief demonstration on how the server should look. I took what I learned from his lesson and knew that my server was definitely gonna consist of app.get, app.post and app.delete methods. The get method retrieves the information, post method submits data to the server and delete deletes the data. In terms of the fs, I had to utilize the readFile() method in order to read my json data file. After declaring all of my routes, I had to initialize an app.listen() function to start the server and make sure it listens on the correct port.
On my app.js file, I first declared a class named Task. My thought process for this was because a class is a template to create objects. I figured this would be a perfect implementation of this because for the task tracker we are basically creating new objects or "task" and messing with its data. Within this class I had a constructor function that will basically initialize an instance of the class Task. Within the constructor I had this.init() which is referring to a function I implementated later in the file. To keep this brief, after declaring my Task class, I created 5 functions that init(), showTasks(), addtask(), deleteTask(), and toggleDone(). The init function initializes all of my event handlers such as the addTask event, deleteTask event and so on. The showTasks function is a function that actually gets the inputted tasks to show up and append to an unordered list. The addtask function gives functionality to the add button and actually allows users to add tasks. The delete function deletes tasks by fetching the delete method implemented in the server. Last but not least, the toggle done function marks when a task is completed and this is done by fetching the patch method in the server.

# Difficulties and errors I had to solve

Without a doubt one of the issues I had was actually trying to get the addtask and deleteTask functions to work. I spent days attempting to find fixes to work. I eventually began to research more into api calls, and the fetch method. Prior to this I was just coding the functions without actually fetching the routes from the backend. A resource that truly helped me come to this conclusion was https://devhints.io/js-fetch. This resource is a fetch() cheatsheet with valuable information on how its formatted and the response and request options. However, while my delete task did begin to work, it was deleting all the tasks all at once. This issue also became a huge pain since I had to again extensively research ways to remove specific objects in a json file. While doing research on this, I came across a module name UUID which stands for universally unique identifier. I needed to import this package and implement it into my delete tasks function so that only tasks with that specific id get deleted. Since each id is unique only one tasks would get deleted and that is how I overcame that error. Lastly, a big error I was having was with my toggleDone function. At first I was under the impression that using the put method and making a seperate object marking that it was done. Instead I began to research the patch request method. This method basically allows you to partially modify a resource. In my eyes it was basically a way to update an object. As a result I implemented a patch route on my back end and fetched it on my toggleDone task. I then created a property for each json object that will create a true or false if it is completed or not.

# Resources Used

https://expressjs.com/en/guide/routing.html#route-parameters

https://expressjs.com/en/api.html#req.params

https://devhints.io/js-fetch

https://expressjs.com/en/api.html#app.listen

https://expressjs.com/en/starter/static-files.html#serving-static-files-in-express

https://api.jquery.com/
