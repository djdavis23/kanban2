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
      <h6>Created:  ${list.created}</h6>
      <br />
      <p>${list.description}</p>
      <hr />        
    `
    store.state.activeTasks[list._id].forEach(task => {
      template += `
        <h4>${task.title}</h4>
        <p>${task.description}</p>
        <hr />
        <br />
      `
    })
    template += '</div>'
  })

  boardDetails.innerHTML = template
}

export default class ListController {

  getLists(boardId) {
    store.getListsByBoard(boardId, drawLists)
  }

}