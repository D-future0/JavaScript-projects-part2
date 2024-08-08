const addNote = document.querySelector(`#add-note`)
const noteCenter = document.querySelector(`.note-center`)

addNote.addEventListener(`click`, ()=>{
addToNote()
})

const addToNote = ()=>{
    const div = document.createElement(`div`)
    div.classList.add(`note`)
    div.innerHTML = `<div class="tool-bar">
    <button class="edit">edit</button>
    <button class="trash">trash</button>
</div>
<div class="main"></div>
<textarea name="text" class="text hide"></textarea>`;



const edit = div.querySelector(`.edit`)
const trash = div.querySelector(`.trash`)
const main = div.querySelector(`.main`)
const text = div.querySelector(`textarea`)

edit.addEventListener(`click`, ()=>{
    main.classList.toggle(`hide`)
    text.classList.toggle(`hide`)
})
trash.addEventListener(`click`, (e)=>{
    // const trashNote = e.target.parentElement.parentElement
    div.remove()
})
text.addEventListener(`input`, (e)=>{
const { value } = e.target
console.log(value)
main.innerHTML = `${marked.parse(value)}`
})
noteCenter.appendChild(div)
}
const addToLs = ()=>{
    localStorage.setItem(`pages`, JSON.stringify([...getFromLs(), note])) 
 }
 const getFromLs = ()=>{
     return JSON.parse(localStorage.getItem(`pages`)) === null ? [] : JSON.parse(localStorage.getItem(`pages`)) ;
 }
 window.