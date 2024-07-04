async function findRecipes() {
    const ingredients = document.getElementById('ingredients').value;
    const exclude = document.getElementById('exclude').value.split(',').map(item => item.trim());
    const apiKey = '3c8283966b138fb4e09ac5ec5202e7f2';
    const appId = '22a10e41';
    
    let apiUrl = `https://api.edamam.com/search?q=${encodeURIComponent(ingredients)}&app_id=${appId}&app_key=${apiKey}&to=10`;
    exclude.forEach(excludeItem => {
        apiUrl += `&excluded=${encodeURIComponent(excludeItem)}`;
    });

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayRecipes(data.hits);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';

    if (recipes.length === 0) {
        recipesContainer.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    recipes.forEach(recipeData => {
        const recipe = recipeData.recipe;
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');

        const recipeTitle = document.createElement('h2');
        recipeTitle.textContent = recipe.label;

        const recipeLink = document.createElement('a');
        recipeLink.href = recipe.url;
        recipeLink.textContent = 'View Recipe';
        recipeLink.target = '_blank';

        recipeElement.appendChild(recipeTitle);
        recipeElement.appendChild(recipeLink);
        recipesContainer.appendChild(recipeElement);
    });
}
