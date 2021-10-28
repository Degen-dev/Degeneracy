document.querySelector('#initiate').addEventListener('click', () => {
  initiate()
})

document.querySelector('#url-input').addEventListener('keyup', (e) => {
  if (e.keyCode==13 || e.key == "Enter") {
    initiate()
  }
})

const initiate = (url) => {
  var url = document.getElementById("url-input").value;
  if (!url == "") {
    var value = document.getElementById('url-input').value
    location.href = "/go/gateway?url=" + value
  } else {
    urlerror()
  }
}

function urlerror() {
  document.getElementById("error-disc").style.display = "inherit";
}
