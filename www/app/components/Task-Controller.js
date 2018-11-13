import Store from "../store/store.js";

var store = new Store();

export default class TaskController {

  showTaskDetails(taskId) {
    console.log("show task detail")
  }

  getComments(taskId) {
    console.log("get task comments")
  }

  deleteTask(taskId) {
    console.log("delete task")
  }
}