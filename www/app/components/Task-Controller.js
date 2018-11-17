import Store from "../store/store.js";

var store = new Store();

var newTaskFormVisible = false;

var showTaskDetails = false;

var activeListId;

var detailPane = document.getElementById('detail-pane');

function drawDetailPane() {
  var template = "";
  if (newTaskFormVisible) {
    template += `
      <h2 class="text-primary">Task Form Here</h2>
    `
  }
  else if (showTaskDetails) {

  }
  detailPane.innerHTML = template;
}

export default class TaskController {

  showTaskForm(listId) {
    this.activeListId = listId;
    showTaskDetails = false;
    newTaskFormVisible = !newTaskFormVisible;
  }

  createTask(event) {
    console.log(`creating new task for list ${activeListId}`)
  }

  showTaskDetails(taskId) {
    console.log(`show detail for task ${taskId}`)
  }

  getComments(taskId) {
    console.log(`get comments for task ${taskId}`)
  }

  deleteTask(taskId) {
    console.log(`delete task ${taskId}`)
  }
}