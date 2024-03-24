function updateCharacters() {
  let l = document.getElementById("charArea").value.length;
  console.log(l);
  document.getElementById('chars').innerHTML = l;
  if (l >= 1000) {
    document.getElementById("charArea").style.backgroundColor = "red";
  } else {
    document.getElementById("charArea").style.backgroundColor = "#101a24"
  }
}