import Store from "../store/store.js";

var store = new Store();

var newTaskFormVisible = false;

var showTaskDetails = false;

var activeListId;

const detailPane = document.getElementById('detail-pane');
const mainContent = document.getElementById('main-content');

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


/*  This draw function is a replica of drawLists() in the list controller.  I don't like
the repeated code, but I need to redraw after creating or deleting tasks and I could not 
figure out how to invoke the drawLists() method from the task controller
*/
function drawMainContent() {
  let template = ""
  //draw each list associated with the active board
  store.state.activeLists.forEach(list => {
    //first draw the list title and description
    template += `
    <div class="col-4">
      <h3>${list.title}</h3>
      <h6>Creator:  ${list.author}</h6>
      <h6>Created:  ${new Date(list.created).toDateString()}</h6>
      <br />
      <p>${list.description}</p>
      <button onclick="app.controllers.list.deleteList('${list._id}')" class="btn btn-primary">Delete List</button>
      <button onclick="app.controllers.task.showTaskForm('${list._id}')" class="btn btn-primary">Add Task</button>
      <hr />        
    `
    //if tasks are associated with list, draw a card for each task
    if (store.state.activeTasks[list._id]) {
      store.state.activeTasks[list._id].forEach(task => {
        template += `
          <div class="card mb-3" style="max-width: 20rem;">
            <div class="card-header bg-secondary text-white flexbox">
              <div>Created: ${new Date(task.created).toDateString()}</div>
              <div>
                <i class="fa fa-arrows-alt clickable" aria-hidden="true" 
                onclick="app.controllers.task.showTaskDetails('${task._id}');
                app.controllers.task.getComments('${task._id}')"></i>&nbsp&nbsp
                <i class="fa fa-trash clickable" onclick="app.controllers.task.deleteTask('${task._id}', '${task.listId}')" aria-hidden="true"></i>
              </div>
            </div>
            <div class="card-body bg-light text-primary">
              <h4 class="card-title">${task.title}</h4>
              <p class="card-text">${task.description}</p>
            </div>
          </div>
        `
      })
    }
    template += '</div>'
  })

  mainContent.innerHTML = template
}

export default class TaskController {

  showTaskForm(listId) {
    activeListId = listId;
    showTaskDetails = false;
    newTaskFormVisible = !newTaskFormVisible;
    drawDetailPane()
  }

  createTask(event) {
    event.preventDefault();
    let newTask = {
      title: event.target.title.value,
      description: event.target.description.value,
      listId: activeListId,
      boardId: store.state.activeBoard._id,
      status: event.target.status.value
    }
    newTaskFormVisible = false
    event.target.reset()
    store.createTask(newTask, activeListId, drawMainContent)
    drawDetailPane()
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

  deleteTask(taskId, listId) {
    store.deleteTask(taskId, listId, drawMainContent)
  }
}