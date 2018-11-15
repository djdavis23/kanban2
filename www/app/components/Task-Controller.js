import Store from "../store/store.js";

var store = new Store();

var newTaskFormVisible = false;

var listId;

export default class TaskController {

  showTaskForm(listId) {
    this.listId = listId;
    newTaskFormVisible = !newTaskFormVisible;
  }

  createTask(event) {
    console.log(`creating new task for list ${listId}`)
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