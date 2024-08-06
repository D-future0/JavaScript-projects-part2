const edit = document.querySelector(`.edit`)
const trash = document.querySelector(`.trash`)
const main = document.querySelector(`.main`)
const text = document.querySelector(`textarea`)

edit.addEventListener(`click`, ()=>{
    main.classList.toggle(`hide`)
    text.classList.toggle(`hide`)
})
text.addEventListener(`input`, (e)=>{
const{ value } = e.target.value
console.log(value)
main.innerHTML= marked(value)
})