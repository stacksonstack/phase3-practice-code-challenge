document.addEventListener("DOMContentLoaded", () => {


const spiceImage = document.querySelector(".detail-image")
const spiceTitle = document.querySelector(".title")
const spiceList = document.querySelector(".ingredients-list")
const updateForm = document.getElementById("update-form")
const addIngredients = document.getElementById("ingredient-form")
var id
function getSpices(){
    fetch("http://localhost:3000/spiceblends/")
    .then(resp => resp.json())
    .then(data => {
        renderSpice(data[0])
        id = data[0].id
        fetch("http://localhost:3000/ingredients")
        .then(resp => resp.json())
        .then(data => renderIngredients(data, id))
    })
}


function renderSpice(data){
    spiceImage.src = data.image 
    spiceTitle.innerHTML = data.title        
}

function renderIngredients(data, spice){  
    const ing = data.filter((i) => {
       return i.spiceblendId === spice    
    })
    ing.forEach((e)=>{
        const li = document.createElement("li")
        li.textContent = e.name
        spiceList.append(li)
    })  
}

updateForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const title = document.getElementById("spiceblend-title").value
    fetch(`http://localhost:3000/spiceblends/${id}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
        }, body: JSON.stringify({
            title: title
        })
    })
    .then(resp => resp.json())
    .then(data => spiceTitle.innerHTML = data.title)
})

addIngredients.addEventListener("submit", (e)=> {
    e.preventDefault()
    const ingredient = document.getElementById("ingredient-name").value
    fetch(`http://localhost:3000/ingredients`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
        }, body: JSON.stringify({
            name: ingredient,
            spiceblendId: id
        })
    })
    .then(resp => resp.json())
    .then(data => {
        const li = document.createElement("li")
        li.textContent = data.name
        spiceList.append(li)
    })
})


getSpices();

});

