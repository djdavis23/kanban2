import Store from "../store/store.js";

let store = new Store()

const boardDetails = document.getElementById("main-content")


function drawLists() {
  console.log("drawing lists")
}

export default class ListController {

  getLists(boardId) {
    console.log("getting lists")
    drawLists();
  }

}