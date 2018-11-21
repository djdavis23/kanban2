import Store from "../store/store.js";

var store = new Store();

//toggled when user clicks on the "Add Task" button
var newTaskFormVisible = false;

//toggles to display details of the active task in the right panel
var showTaskDetails = false;

//tracks active list for input during task create/delete
var activeListId;

//currently selected task
var activeTask;

//toggles visibility of new comment form
var commentFormVisible = false;

const detailPane = document.getElementById('detail-pane');
const mainContent = document.getElementById('main-content');

//draws the detail pane in the right panel.  Containers either the add task form,
//details of the active task or it is blank
function drawDetailPane() {
  var template = "";
  if (newTaskFormVisible) {
    //display New Task Form
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
    //display details of the active task
    template += `
      <h4 class="flexbox text-primary">
        <span>Task Details</span>
        <span>
          <i class="fa fa-window-minimize clickable"></i>&nbsp<i class="fa fa-trash clickable"></i>
        </span>
      </h4>
      <h4>${activeTask.title}</h4>
      <p>${activeTask.description}</p>
      <h5>Initiator: ${activeTask.userId}</h5>
      <h5>Created: ${new Date(activeTask.created).toDateString()}</h5>
      <h5>Status: ${activeTask.status}</h5>
      <button onclick="app.controllers.task.newComment()" class="btn btn-secondary">Add Comment</button>
    `
    if (commentFormVisible) {
      template += `
        <form onsubmit="app.controllers.task.createComment(event)">
          <input type="text" name="content" placeholder="New comment here" required>
        </form>
      `
    }

    template += `
      <h5>Comments: </h5>
      <hr />
    `
    if (store.state.activeComments[activeTask._id]) {
      store.state.activeComments[activeTask._id].forEach(comment => {
        template += `
        <p>${comment.userName} &nbsp ${comment.content} &nbsp&nbsp <i class="fa fa-trash-alt"></i> </p>
        <hr />
      `
      })
    }
  }
  detailPane.innerHTML = template;
}


/*  This draw function is a replica of drawLists() in the list controller (NOT DRY).  
I need to redraw after creating or deleting tasks and I could not 
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
                onclick="app.controllers.task.showTaskDetails('${task._id}', '${task.listId}');
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

  //event listener for the "Add Task" button
  showTaskForm(listId) {
    activeListId = listId;
    showTaskDetails = false;
    newTaskFormVisible = !newTaskFormVisible;
    drawDetailPane()
  }

  createTask(event) {
    event.preventDefault();
    //build new task object from form input
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

  showTaskDetails(taskId, listId) {
    console.log("show detail for task ", taskId)
    activeTask = store.getTask(taskId, listId)
    newTaskFormVisible = false
    showTaskDetails = true
    drawDetailPane()
  }


  deleteTask(taskId, listId) {
    store.deleteTask(taskId, listId, drawMainContent)
  }

  getComments(taskId) {
    console.log(`get comments for task ${taskId}`)
    store.getCommentsByTask(taskId, drawDetailPane)
  }

  newComment() {
    commentFormVisible = true
    drawDetailPane()
  }

  createComment(e) {
    e.preventDefault()
    let newComment = {
      content: e.target.content.value,
      userId: store.state.user._id,
      userName: store.state.user.userName,
      taskId: activeTask._id
    }
    store.createComment(newComment, activeTask._id, drawDetailPane)
    e.target.reset
    commentFormVisible = false
  }
}