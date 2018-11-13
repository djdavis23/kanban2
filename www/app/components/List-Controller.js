import Store from "../store/store.js";

let store = new Store()

const listButtons = document.getElementById("header-right")


function drawListButtons() {
  let template = `
   <div class="row">
    <div class="col-8"></div>
    <div class="col-4">
      <h3 class="text-white mt-2">Welcome ${store.state.user.userName}!</h3>
      <button onClick="app.controllers.list.createList()" class="btn btn-secondary mt-1">Add New List</button>
    </div>
   </div>
  `
  listButtons.innerHTML = template
}

export default class ListController {

  getLists(boardId) {
    console.log("getting lists")
    drawListButtons();
  }

}