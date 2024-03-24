function updateCharacters() {
  let l = document.getElementById("charArea").value.length;
  console.log(l);
  document.getElementById('chars').innerHTML = l;
}