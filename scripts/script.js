const recipeContainer = document.getElementById('recipe');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
const likeButton = document.getElementById('like-button');
const nahButton = document.getElementById('nah-button');
const signInButton = document.getElementById('sign-in-button');
const recipeFindButton = document.getElementById('recipe-find-button');

let currentRecipeIndex = 0;
let recipes = [];
let likedRecipes = [];
let rightArrowClickCount = 0;

async function fetchRecipes() {
    try {
        const response = await fetch('https://api.edamam.com/api/recipes/v2?type=public&app_id=22a10e41&app_key=%203c8283966b138fb4e09ac5ec5202e7f2%09&cuisineType=American&cuisineType=Asian&cuisineType=British&cuisineType=Caribbean&cuisineType=Central%20Europe&cuisineType=Chinese&cuisineType=Eastern%20Europe&cuisineType=French&cuisineType=Indian&cuisineType=Italian&cuisineType=Japanese&cuisineType=Kosher&cuisineType=Mediterranean&cuisineType=Mexican&cuisineType=Middle%20Eastern&cuisineType=Nordic&cuisineType=South%20American&cuisineType=South%20East%20Asian&random=true&field=label&field=image&field=url&field=shareAs&field=yield&field=dietLabels&field=healthLabels&field=calories&field=cuisineType&field=mealType&field=dishType');
        const data = await response.json();
        
        recipes = data.hits.map(hit => hit.recipe);
        displayRecipe(currentRecipeIndex);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        recipeContainer.innerHTML = '<p>Error fetching recipes. Please try again later.</p>';
    }
}

function displayRecipe(index) {
    const recipe = recipes[index];
    if (recipe) {
        const { label, image, cuisineType, healthLabels, url, calories, dietLabels, mealType, dishType, yield: servings } = recipe;
        
        recipeContainer.innerHTML = `
            <h2>${label}</h2>
            <img src="${image}" alt="${label}">
            <!-- <p><strong>Cuisine Type:</strong> ${cuisineType ? cuisineType.join(', ') : 'Unknown Cuisine'}</p> -->
            <!-- <p><strong>Health Labels:</strong> ${healthLabels ? healthLabels.join(', ') : 'None'}</p> -->
            <p><strong>URL:</strong> <a href="${url}" target="_blank">View Recipe</a></p>
            <p><strong>Calories:</strong> ${calories ? calories.toFixed(2) : 'N/A'}</p>
            <!-- <p><strong>Diet Labels:</strong> ${dietLabels ? dietLabels.join(', ') : 'None'}</p> -->
            <!-- <p><strong>Meal Type:</strong> ${mealType ? mealType.join(', ') : 'N/A'}</p> -->
            <!-- <p><strong>Dish Type:</strong> ${dishType ? dishType.join(', ') : 'N/A'}</p> -->
            <p><strong>Servings:</strong> ${servings ? servings : 'N/A'}</p>
        `;
    } else {
        recipeContainer.innerHTML = '<p>No recipes available. Please try again later.</p>';
    }
}

leftArrow.addEventListener('click', () => {
    if (currentRecipeIndex > 0) {
        currentRecipeIndex--;
        displayRecipe(currentRecipeIndex);
    }
});

rightArrow.addEventListener('click', async () => {
    if (currentRecipeIndex < recipes.length - 1) {
        currentRecipeIndex++;
        displayRecipe(currentRecipeIndex);
        rightArrowClickCount++;
        if (rightArrowClickCount >= 2) {
            signInButton.style.display = 'block';
            recipeFindButton.style.display = 'block';
            // signInButton.classList.add('zoom');
            // recipeFindButton.classList.add('zoom');
        }
    } else {
        await fetchRecipes();
    }
});

likeButton.addEventListener('click', () => {
    const recipe = recipes[currentRecipeIndex];
    likedRecipes.push({ label: recipe.label, uri: recipe.url });
    alert(`Liked! Recipes saved: ${likedRecipes.map(item => item.label).join(', ')}`);
});

nahButton.addEventListener('click', async () => {
    const recipe = recipes[currentRecipeIndex];
    const cuisines = recipe.cuisineType || [];

    recipes.splice(currentRecipeIndex, 1);

    if (recipes.length === 0) {
        await fetchRecipes();
    } else {
        const filteredRecipes = recipes.filter(r => cuisines.some(c => r.cuisineType && r.cuisineType.includes(c)));
        
        if (filteredRecipes.length > 0) {
            recipes = filteredRecipes;
            currentRecipeIndex = 0;
        } else {
            await fetchRecipes();
        }
    }

    displayRecipe(currentRecipeIndex);
});

function NavigateToRecipeFinder() {
    window.location.href = "pages/recipeFinder.html";
}

function NavigateToFirstPage() {
    window.location.href = "pages/first_page.html";
}

fetchRecipes();
