document.addEventListener("DOMContentLoaded", ()=>{
  // console.log("hello!");
let allMonstersDiv = document.getElementById('monster-container') //to append monster info
let createMonsterForm = document.getElementById('monster-form') //for event listener
let monsterName = document.querySelector("[name=name]") //to get input value
let monsterAge = document.querySelector("[name=age]") //to get input value
let monsterDescription = document.querySelector("[name=description]") //to get input value
let buttonForward = document.querySelector("#forward")
let buttonBackward = document.querySelector("#back")
let pageNum = 1

fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
.then(resp => resp.json())
.then(monsters => monsters.forEach(monster => showMonster(monster))) //GET monster & show

createMonsterForm.addEventListener("submit", (e)=>{
  event.preventDefault()
  fetch("http://localhost:3000/monsters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name: monsterName.value, age: monsterAge.value, description: monsterDescription.value})
  })
  .then(resp => resp.json())
  .then(monster => showMonster(monster))

  monsterName.value=""
  monsterAge.value=""
  monsterDescription.value=""
})

buttonForward.addEventListener("click", ()=>{
  allMonstersDiv.innerHTML = ""
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum+1}`)
  .then(resp => resp.json())
  .then(monsters => monsters.forEach(monster => showMonster(monster)))
  pageNum ++
})

buttonBackward.addEventListener("click", ()=>{
  allMonstersDiv.innerHTML = ""
  if (pageNum >= 1) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum-1}`)
    .then(resp => resp.json())
    .then(monsters => monsters.forEach(monster => showMonster(monster)))
    pageNum --
  }
  else {
    fetch("http://localhost:3000/monsters/?_limit=50&_page=1")
    .then(resp => resp.json())
    .then(monsters => monsters.forEach(monster => showMonster(monster)))
  }
})

//to show monster on the page
function showMonster(monster) {
  let monsterBox = document.createElement("div")
  monsterBox.innerHTML = `
  <h3>Name: ${monster.name}</h3>
  <p>Age: ${monster.age}</p>
  <p>Description: ${monster.description}</p>
  `
  monsterBox.className = "monster-box"
  monsterBox.dataset.id = monster.id
  return allMonstersDiv.appendChild(monsterBox)
}



})
