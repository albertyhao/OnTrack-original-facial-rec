function addNewBlacklist() {
  var newBlacklistItem = document.getElementById("askForBlacklist").value;
  var td1 = document.createElement("TH");
  var td2 = document.createElement("TH");
  var newRow = document.createElement("TR");
  newRow.appendChild(td1);
  newRow.appendChild(td2);
  td1.innerHTML = `${newBlacklistItem}`;
  td2.innerHTML = "<i class='far fa-times-circle'></i>";
  document.querySelector("tbody").appendChild(newRow);

}

document.getElementById("addToBlacklist").addEventListener("click", addNewBlacklist);

function deletefromBlacklist() {
  // TODO: use this for the delete function: document.getElementById("myTable").deleteTHead();

}
