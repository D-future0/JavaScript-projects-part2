const favMealContainer = document.querySelector(`.favMeal-container`)
const randomMeal = document.querySelector(`.random-meal`)
function randomMeals() {
  async function dailyBread2() {
    const resp = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await resp.json();
    const meals = data.meals;
    const mealsId = data.meals[0].idMeal;
    console.log(data.meals);
    let displaymeal = meals.map((meal) => {
      return `<img src="${meal.strMealThumb}" />
            <div class="meal">
              <p>${meal.strMeal}</p><button type="submit" id="${meal.idMeal}" class="addToFav">love</button>
            </div>`;
    });
    randomMeal.innerHTML = displaymeal;
    const selectFav = document.querySelector(".addToFav");
    selectFav.addEventListener(`click`, (e) => {
      const id = e.target.id;
      if(selectFav.classList.contains(`active`)){
        removeFromLocalstorage(id)
        selectFav.classList.remove(`active`);
      }
      else{
        addFavToLocalStorage(id)
        selectFav.classList.add(`active`);
      }
      ;
    });
  }
  dailyBread2();
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
  console.log(meals)
  return meals
}

async function updateFavmeals (){
let mealIds = getFavFromLocalStorage()
// let favMeals = []
for (let index = 0; index < mealIds.length; index++) {
  let mealId = mealIds[index];
  const meals = await getMealsById(mealId)
  // favMeals.push(meals)
  // console.log(meals)
  displayFav(meals)
}

}
const displayFav  = (meals)=>{
  const favMeal = document.createElement(`li`)
  favMeal.innerHTML =  `<li class="my-fav">
            <img src="${meals.strMealThumb}" alt="favorite meal" />
            <p>${meals.strMeal}</p>
          </li>`;
  favMealContainer.appendChild(favMeal)

}
function setupApp(){
   randomMeals();
   updateFavmeals()
}

setupApp()