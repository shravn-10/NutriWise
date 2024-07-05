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
        const response = await fetch('https://api.edamam.com/api/recipes/v2?type=public&app_id=22a10e41&app_key=%203c8283966b138fb4e09ac5ec5202e7f2&health=low-sugar&cuisineType=American&cuisineType=Asian&cuisineType=British&cuisineType=Caribbean&cuisineType=Central%20Europe&cuisineType=Chinese&cuisineType=Eastern%20Europe&cuisineType=French&cuisineType=Indian&cuisineType=Italian&cuisineType=Japanese&cuisineType=Kosher&cuisineType=Mediterranean&cuisineType=Mexican&cuisineType=Middle%20Eastern&cuisineType=Nordic&cuisineType=South%20American&cuisineType=South%20East%20Asian&field=label&field=image&field=url&field=shareAs&field=yield&field=dietLabels&field=healthLabels&field=calories&field=cuisineType&field=mealType&field=dishType&random=true');
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
        const { label, image, url, calories, yield: servings } = recipe;
        
        recipeContainer.innerHTML = `
            <h2>${label}</h2>
            <img src="${image}" alt="${label}">
            <p><strong>Source:</strong> <a href="${url}" target="_blank">View Recipe</a></p>
            <p><strong>Calories:</strong> ${calories ? calories.toFixed(2) : 'N/A'}</p>
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
        }
    } else {
        await fetchRecipes();
    }
});

likeButton.addEventListener('click', () => {
    const recipe = recipes[currentRecipeIndex];
    const recipeTuple = { label: recipe.label, uri: recipe.url };
    const isDuplicate = likedRecipes.some(likedRecipe => likedRecipe.label === recipeTuple.label && likedRecipe.uri === recipeTuple.uri);
    
    if (!isDuplicate) {
        likedRecipes.push(recipeTuple);
        alert(`Liked! Recipes saved: ${likedRecipes.map(item => item.label).join(', ')}`);
    } else {
        alert('This recipe is already liked!');
    }
});

nahButton.addEventListener('click', async () => {
    recipes.splice(currentRecipeIndex, 1);

    if (recipes.length === 0) {
        await fetchRecipes();
    } else {
        if (currentRecipeIndex >= recipes.length) {
            currentRecipeIndex = recipes.length - 1;
        }
        displayRecipe(currentRecipeIndex);
    }
});

function NavigateToRecipeFinder() {
    window.location.href = `pages/recipeFinder.html`;
}

function NavigateToFirstPage() {
    window.location.href = `pages/first_page.html`;
}

fetchRecipes();
