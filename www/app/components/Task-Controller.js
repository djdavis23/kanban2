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
    <h4>Create New Task:</h4>
    <form onSubmit="app.controllers.task.createTask(event)">
      <input type="text" class="form-control mt-2" name="title" placeholder="title" required />
      <input type="text" class="form-control mt-2" name="description" placeholder="description" required>
      <label for="status" class="mt-2">Task Status:</label>
      <select class="form-control" name="status" id="task-status">
        <option value="To-Do" selected>To-Do</option>
        <option value="In-Work">In-Work</option>
        <option value="Complete">Complete</option>
      </select>
      <button type="Submit" class="btn btn-primary mt-2">Submit</button>
    </form>
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
    drawDetailPane()
  }

  createTask(event) {
    console.log(`creating new task for list ${activeListId}`)
    event.preventDefault();
    let newTask = {
      title: event.target.title.value,
      description: event.target.description.value,
      listId: this.activeListId,
      boardId: store.state.activeBoard._id,
      status: event.target.status.value
    }
    newTaskFormVisible = false
    event.target.reset()
    store.createTask(newTask, activeListId, drawDetailPane)
  }

  showTaskDetails(taskId) {
    console.log(`show detail for task ${taskId}`)
    newTaskFormVisible = false
    showTaskDetails = true
    drawDetailPane()
  }

  getComments(taskId) {
    console.log(`get comments for task ${taskId}`)
  }

  deleteTask(taskId) {
    console.log(`delete task ${taskId}`)
  }
}