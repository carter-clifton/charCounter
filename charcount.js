function updateCharacters() {
  let l = document.getElementById("charArea").value.length;
  document.getElementById('chars').innerHTML = l;
  if (l >= parseInt(document.getElementById("characterLimitInput").value)) {
    document.getElementById('body').style.backgroundColor = "#f44336";
    document.getElementById('charArea').style.backgroundColor = "#b71c1c";
    document.getElementById('characterLimitInput').style.backgroundColor = "#b71c1c"
  } else {
    document.getElementById('body').style.backgroundColor = "#15222e";
    document.getElementById('charArea').style.backgroundColor = "#101a24";
    document.getElementById('characterLimitInput').style.backgroundColor = "#101a24"
  }
}