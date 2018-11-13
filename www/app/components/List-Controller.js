import Store from "../store/store.js";

let store = new Store()

const boardDetails = document.getElementById("main-content")


function drawLists() {
  console.log("drawing lists")
  //draw list header
  let template = ""
  store.state.activeLists.forEach(list => {
    template += `
    <div class="col-4">
      <h3>${list.title}</h3>
      <h6>Creator:  ${list.author}</h6>
      <h6>Created:  ${new Date(list.created).toDateString()}</h6>
      <br />
      <p>${list.description}</p>
      <button class="btn btn-primary">Delete List</button>
      <button class="btn btn-primary">Add Task</button>
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
                <i class="fa fa-trash clickable" onclick="app.controllers.task.deleteTask('${task._id}')" aria-hidden="true"></i>
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

  boardDetails.innerHTML = template
}

export default class ListController {

  getLists(boardId) {
    store.getListsByBoard(boardId, drawLists)
  }

}