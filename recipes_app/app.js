const favMealContainer = document.querySelector(`.favMeal-container`)
const mealContainer = document.querySelector(`.meal-container`)
const searchtext = document.querySelector(`#searchtext`)
const searchbtn = document.querySelector(`#searchbtn`)
const mealInfoContainer = document.querySelector(`.mealInfo-container`)

//fetch random meal
function randomMeals() {
  async function dailyBread() {
    const resp = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await resp.json();
    const meals = data.meals;
    const mealsId = data.meals[0].idMeal;
    // displaycontent(meals)
    altDisplay(meals)
  }
  dailyBread();
}
//display content
const displaycontent = (meals)=>{
  let displaymeal = meals.map((meal) => {
    const div = document.createElement(`div`)
    div.classList.add(`meals`)
  div.innerHTML =  `<img src="${meal.strMealThumb}" class="showInfo"/>
          <div class="meal">
            <p>${meal.strMeal}</p><button type="submit" id="${meal.idMeal}" class="addToFav">love</button>
          </div>`;
          const selectFav = div.querySelector(".addToFav");
          selectFav.addEventListener(`click`, (e) => {
            // location.reload()
            const id = e.target.id;
            if(selectFav.classList.contains(`active`)){
              removeFromLocalstorage(id)
              selectFav.classList.remove(`active`);
            }
            else{
              addFavToLocalStorage(id)
              selectFav.classList.add(`active`);
            }
            favMealContainer.innerHTML = ``
            updateFavmeals();
          });
          const showMeal = meals[0]
          const mealInfo = div.querySelector(`.showInfo`)
          mealInfo.addEventListener(`click`, ()=>{
            displayMealInfo(showMeal)
            console.log(`hello`)
          })

          mealContainer.append(div);
  });
 

}
const altDisplay = (meals)=>{
  for (let index = 0; index <= meals.length - 1; index++) {
    const meal = meals[index];
    console.log(meal);
    const div = document.createElement(`div`)
    div.classList.add(`meals`)
  div.innerHTML =  `<img src="${meal.strMealThumb}" class="showInfo"/>
          <div class="meal">
            <p>${meal.strMeal}</p><button type="submit" id="${meal.idMeal}" class="addToFav">love</button>
          </div>`;
          const selectFav = div.querySelector(".addToFav");
          selectFav.addEventListener(`click`, (e) => {
            // location.reload()
            const id = e.target.id;
            if(selectFav.classList.contains(`active`)){
              removeFromLocalstorage(id)
              selectFav.classList.remove(`active`);
            }
            else{
              addFavToLocalStorage(id)
              selectFav.classList.add(`active`);
            }
            favMealContainer.innerHTML = ``
            updateFavmeals();
          });
          // const showMeal = meals[0]
          const mealInfo = div.querySelector(`.showInfo`)
          mealInfo.addEventListener(`click`, ()=>{
            displayMealInfo(meal)
            console.log(meal)
            console.log(`hello`)
          })

          mealContainer.append(div);
  }
}

// local storage functionalities
const addFavToLocalStorage = (id) => {
localStorage.setItem("mealIds", JSON.stringify([...getFavFromLocalStorage(), id]));
}
;
const getFavFromLocalStorage = () => {
     return JSON.parse(localStorage.getItem(`mealIds`)) === null ? [] : JSON.parse(localStorage.getItem(`mealIds`)) ;
};
const removeFromLocalstorage = (mealsId)=>{
    localStorage.setItem("mealIds", JSON.stringify(getFavFromLocalStorage().filter((id)=> id !== mealsId)));
}

// add to favourite meal
async function getMealsById(id){
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const data = await resp.json();
  const meals = data.meals[0];
  return meals
}
//update favorite meal
async function updateFavmeals(){
let mealIds = getFavFromLocalStorage()
for (let index = 0; index < mealIds.length; index++) {
  let mealId = mealIds[index];
  const meals = await getMealsById(mealId)
  displayFav(meals)
}

}
//display favorite meal
const displayFav  = (meals)=>{
  const li = document.createElement(`li`)
  li.classList.add(`my-fav`)
  li.innerHTML =  `<img src="${meals.strMealThumb}" alt="favorite meal" class="showInfo" />
            <p>${meals.strMeal}</p>
            <button type="button" id="${meals.idMeal}" class="removeBtn"><img src="./images/trash-can-solid.svg" alt="" class="remove"/></button>`;

          const removeBtm = li.querySelector(`.removeBtn`)
          removeBtm.addEventListener(`click`, ()=>{
            removeFromLocalstorage(meals.idMeal)
            favMealContainer.innerHTML = ``
            updateFavmeals() 
          })
          const mealInfo = li.querySelector(`.showInfo`)
          mealInfo.addEventListener(`click`, ()=>{
            displayMealInfo(meals)
          })
  favMealContainer.appendChild(li)
}

//fetch meal by search 
async function getMealsBySearch(text){
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + text
  );
  const data = await resp.json();
  const meals = data.meals;
  console.log(meals)
  return meals
}
searchbtn.addEventListener(`click`, async()=>{
  mealContainer.innerHTML = ``
  const searchMeal = searchtext.value;
  const meals = await getMealsBySearch(searchMeal)
  console.log(meals)
  // displaycontent(meals)
  altDisplay(meals)
})
const displayMealInfo = (meals)=>{
  const div = document.createElement(`div`)
  div.classList.add(`mealInfo`)
  let ingredients = []
  for (let index = 1; index <= 20; index++) {
    const ingredient = meals[`strIngredient` + index];
    const measures = meals[`strMeasure` + index];
    if(ingredient){
      ingredients.push(`${ingredient} - ${measures}`)
    } else{break}
  }
  div.innerHTML =  `<div class="close"><button id="closeBtn">close</button></div>
          <div class="details"><h2>${meals.strMeal}</h2>
          <img src="${meals.strMealThumb}" alt="">
          <div class="instructions">${meals.strInstructions}</div>
          <ul class="ingerident">
          ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join(``)}
          </ul></div>`;
          const closeBtn = div.querySelector(`#closeBtn`)
          closeBtn.addEventListener(`click`, ()=>{
            mealInfoContainer.classList.remove(`popup`)
              mealInfoContainer.innerHTML = ``
          })
          mealInfoContainer.appendChild(div)
          mealInfoContainer.classList.add(`popup`)
}

// updateSearch()
function setupApp(){
   randomMeals();
   updateFavmeals()
}

setupApp()