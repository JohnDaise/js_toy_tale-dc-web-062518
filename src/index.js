const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false


// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", function (){
let button = document.getElementById("create-toy")
button.addEventListener('click', submitHandler)

  allToys()
})


function render(toy){
 let toyCollection = document.getElementById('toy-collection')
 let toyCard = document.createElement('div') //id class = "card"  also create id for each card
 let nameTitle = document.createElement('h2') //name
 let imageElement = document.createElement('img') //picture clas name "toy-avatar"
 let likeTag= document.createElement('p')// p tag of how many likes
 let likeButton = document.createElement('button') // class 'like-btn'
 likeButton.addEventListener('click', patchFetch)

 toyCard.className = "card"
 imageElement.className = 'toy-avatar'
 likeButton.className = 'like-btn'

  toyCollection.appendChild(toyCard)
  toyCard.appendChild(nameTitle)
  toyCard.appendChild(imageElement)
  toyCard.appendChild(likeTag)
  toyCard.appendChild(likeButton)

  toyCard.id = `toy-${toy.id}`
  likeTag.id = `like-${toy.id}`
  nameTitle.innerText = toy.name
  imageElement.src = toy.image
  likeTag.innerText = `${toy.likes}`
  // if (toy.likes === 1){likeTag.innerText = `${toy.likes} like`} else {likeTag.innerText = `${toy.likes} likes`}
  likeButton.innerText = "LIKE ❤️"


};


function submitHandler(e){
  e.preventDefault()
  console.log('created')
  let name = document.getElementById("name-input").value
  let image = document.getElementById("img-input").value
  fetchPost(name, image)

};


function allToys(){
  fetch(`http://localhost:3000/toys`)
  .then(response => response.json())
    .then(json => {
    let allToys = json
    allToys.forEach( toy => {
    render(toy)
    })
  })
};

function updateToy(toyUpdate){
document.querySelector('p')


  // let id = e.target.parentNode.id.split('-')[1]
  // let name = e.target.parentNode.querySelector('h2').innerText
  // let image = e.target.parentNode.querySelector('img').src.trim()
  // let likes = e.target.parentNode.querySelector('p')


}

function fetchPost(name, image){
  fetch(`http://localhost:3000/toys/`, {
    "method": "POST",
    "headers": {
           "Content-Type": "application/json"},
    "body": JSON.stringify({
        "name": name,
        "image": image,
        "likes": 0
    })
  }).then(response => response.json())
      .then(jsonData=>
        { let newToy = jsonData
          render(newToy)
        })
}

function patchFetch(e){

  let name = e.target.parentNode.querySelector('h2').innerText
  let image = e.target.parentNode.querySelector('img').value
  let likes = e.target.parentNode.querySelector('p').innerText
  let id = e.target.parentNode.id.split('-')[1]
  e.preventDefault()
  fetch(`http://localhost:3000/toys/${id}`, {
    "method": "PATCH",
    "headers": {
      "Content-Type": "application/json",
      "Accept": "application/json"  //this line isnt needed
         },
    "body": JSON.stringify({
        "name": name,             //for this we only need to pass in parameters that we will update
        "image": image,
        "likes": likes
    })
  }).then(response => response.json())
      .then(jsonData=> { jsonData
       let toyUpdate = document.getElementById(`like-${jsonData.id}`)
        toyUpdate.innerText = ++toyUpdate.innerText

        })
};



addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
