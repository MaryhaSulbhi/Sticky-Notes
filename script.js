const addBtn=document.getElementById("addBtn")
const modal=document.getElementById("modal")
const saveNote=document.getElementById("saveNote")
const closeModal=document.getElementById("closeModal")

const titleInput=document.getElementById("noteTitle")
const textInput=document.getElementById("noteText")
const colorInput=document.getElementById("noteColor")

const container=document.getElementById("notesContainer")
const search=document.getElementById("search")
const themeBtn=document.getElementById("themeBtn")

let notes=JSON.parse(localStorage.getItem("notes"))||[]

function saveNotes(){

localStorage.setItem("notes",JSON.stringify(notes))

}

function renderNotes(filter=""){

container.innerHTML=""

notes
.filter(n=>n.title.toLowerCase().includes(filter.toLowerCase()))
.forEach((note,index)=>{

const div=document.createElement("div")
div.className="note"
div.style.background=note.color

const title=document.createElement("h3")
title.innerText=note.title

const text=document.createElement("p")
text.innerText=note.text

const btns=document.createElement("div")
btns.className="note-buttons"

const del=document.createElement("button")
del.innerText="Delete"

del.onclick=()=>{

notes.splice(index,1)
saveNotes()
renderNotes()

}

btns.appendChild(del)

div.append(title,text,btns)

container.appendChild(div)

})

}

addBtn.onclick=()=>{

modal.style.display="flex"

}

closeModal.onclick=()=>{

modal.style.display="none"

}

saveNote.onclick=()=>{

notes.push({

title:titleInput.value,
text:textInput.value,
color:colorInput.value

})

saveNotes()

modal.style.display="none"

titleInput.value=""
textInput.value=""

renderNotes()

}

search.oninput=(e)=>{

renderNotes(e.target.value)

}

themeBtn.onclick=()=>{

document.body.classList.toggle("dark")

}

renderNotes()