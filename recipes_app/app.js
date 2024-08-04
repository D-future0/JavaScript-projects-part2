const favMealContainer = document.querySelector(`.favMeal-container`)
const mealContainer = document.querySelector(`.meal-container`)
const searchtext = document.querySelector(`#searchtext`)
const searchbtn = document.querySelector(`#searchbtn`)

//fetch random meal
function randomMeals() {
  async function dailyBread() {
    const resp = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await resp.json();
    const meals = data.meals;
    const mealsId = data.meals[0].idMeal;
    displaycontent(meals)
  }
  dailyBread();
}
//display content
const displaycontent = (meals, mealsId)=>{
  let displaymeal = meals.map((meal) => {
    const div = document.createElement(`div`)
    div.classList.add(`meals`)
  div.innerHTML =  `<img src="${meal.strMealThumb}" />
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
            // mealContainer.innerHTML = ``
            updateFavmeals();
            // randomMeals();
          });
          mealContainer.append(div);
  });
 

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
  // console.log(meals)
  return meals
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

async function updateFavmeals(){
let mealIds = getFavFromLocalStorage()
for (let index = 0; index < mealIds.length; index++) {
  let mealId = mealIds[index];
  const meals = await getMealsById(mealId)
  displayFav(meals)
}

}
const displayFav  = (meals)=>{
  const favMeal = document.createElement(`li`)
  favMeal.innerHTML =  `<li class="my-fav">
            <img src="${meals.strMealThumb}" alt="favorite meal" />
            <p>${meals.strMeal}</p>
            <button type="button" id="${meals.idMeal}" class="removeBtn"><img src="./images/trash-can-solid.svg" alt="" class="remove"/></button>
          </li>`;

          const removeBtm = favMeal.querySelector(`.removeBtn`)
          removeBtm.addEventListener(`click`, ()=>{
            removeFromLocalstorage(meals.idMeal)
            favMealContainer.innerHTML = ``
            updateFavmeals()
            
          })
  favMealContainer.appendChild(favMeal)
}

searchbtn.addEventListener(`click`, async(e)=>{
  // e.preventDefault
  const searchMeal = searchtext.value;
  const meals = await getMealsBySearch(searchMeal)
  displaycontent(meals)
})

// updateSearch()
function setupApp(){
   randomMeals();
   updateFavmeals()
}

setupApp()