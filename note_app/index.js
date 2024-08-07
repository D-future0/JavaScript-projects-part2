const addNote = document.querySelector(`#add-note`)
const noteCenter = document.querySelector(`.note-center`)

console.log(addNote)
addNote.addEventListener(`click`, ()=>{
    const div = document.createElement(`div`)
    div.classList.add(`note`)
    div.innerHTML = `<div class="tool-bar">
    <button class="edit">edit</button>
    <button class="trash">trash</button>
</div>
<div class="main"></div>
<textarea name="text" class="text hide"></textarea>`;

noteCenter.appendChild(div)

const edit = document.querySelector(`.edit`)
const trash = document.querySelector(`.trash`)
const main = document.querySelector(`.main`)
const text = document.querySelector(`textarea`)

edit.addEventListener(`click`, ()=>{
    main.classList.toggle(`hide`)
    text.classList.toggle(`hide`)
})
trash.addEventListener(`click`, (e)=>{
    // const trashNote = e.target.parentElement.parentElement
    // note.remove()
})
text.addEventListener(`input`, (e)=>{
const{ value } = e.target
console.log(value)
main.innerHTML = `${marked.parse(value)}`
})

})
