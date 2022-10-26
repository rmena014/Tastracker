//JQUERY Symbols: $ is a selector for jQuery or another way of saying document.getElementById()

/*Class always contains a constructor, class is a template for creating objects */
const Task = class {
  /*This constructor will be executed when a new instance is created. */
  constructor() {
    this.init();
  }

  init() {
    /*This init function basically initializes all the event handlers */
    // add event handlers
    //.on method attaches an event handler function for one or more events to the selected element.
    //e = event parameter
    $("#add-task").on("submit", (e) => {
      this.addTask(e);
    });
    // $("#taskList").on("click", ".js-edit", (e) => {
    //   this.editTask(e);
    // });

    $("#taskList").on("click", ".js-delete", (e) => {
      this.deleteTask(e);
    });
    //^This event handler will execute when element with id taskList is clicked
    $("#taskList").on("click", ".js-check", (e) => {
      this.toggleDone(e);
    });
    //fetch call to the backend
    fetch("/getItems")
      .then((response) => response.json())
      .then((data) => {
        this.showTasks(data);
        //^Shows the data from the taskData.json file
      });
  }

  showTasks(taskList) {
    //Utilized forEach because we want to loop through each taskList
    taskList.forEach((task) => {
      //clone the template for each instance
      const template = $(".task-template").contents().clone();
      template.find(".text").text(task.text);
      //.attr retyrbs attributes of the selected element
      template.attr("data-id", task.id);
      console.log(template.get());
      if (task.checked) {
        template.find("input").attr("checked", true);
        template.addClass("is-complete");
        //adds line through task when task is complete
      }
      $("#taskList").append(template);
      //^appends taskList to the ul
    });
  }

  addTask(e) {
    //preventDefault here prevents website from refreshing when entering an input
    e.preventDefault();
    const task = $("#task").val();
    //^ Gets the text from the input with the use of the .val() method
    const template = $(".task-template").contents().clone();
    //^This line basically clones everything in the template class in the html
    template.find(".text").text(task);
    //^Replaces text in the p tags with the input

    fetch("/saveItem", {
      method: "post",
      //in the body we are sending data, and in header we are seeing what kind of data is being sent
      body: JSON.stringify({ text: task, checked: false }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.id);
        //id is added to the html element with the attribute method
        template.attr("data-id", data.id);
        $("#taskList").append(template);
      });
  }

  deleteTask(e) {
    //currentTarget = element that is clicked on
    const task = $(e.currentTarget).parent(".task");
    const id = task.data("id");
    task.remove();
    fetch("/deleteItem/" + id, {
      method: "delete",
    });
  }

  toggleDone(e) {
    e.preventDefault();
    const id = $(e.currentTarget)
      .parent(".task")
      .toggleClass("is-complete")
      .data("id");

    const isChecked = $(e.currentTarget).find("input").prop("checked");
    //^ .prop() gets the value of the element checked
    $(e.currentTarget).find("input").prop("checked", !isChecked);

    fetch("/updateItem/" + id, {
      method: "PATCH",
      body: JSON.stringify({ prop: "checked", value: !isChecked }),
      headers: {
        "Content-type": "application/json",
      },
    });
  }
};

/* document.ready waits for html to be loaded to excute function */
$(document).ready(function () {
  //Creates a new instance of the Task class.
  new Task();
});
