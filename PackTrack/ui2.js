function addtoBlacklist() {
  console.log (location.href)

}

function whitelist() {

}

document.getElementById('addToBlacklist').addEventListener("click", addtoBlacklist)

document.getElementById('goHome').addEventListener("click", function goHome() {
  window.location.href = "/home.html";
})
