function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const cuisine = getQueryParameter('cuisine');

async function searchRecipes(cuisine) {
    const query = `healthy ${cuisine}`;
    try {
        const response = await fetch(`https://api.edamam.com/search?q=${query}&random=true&app_id=7aa516a5&app_key=dc836a223fb788b11ae390504d9e97ce&from=0&to=20`);
        const data = await response.json();
        displayRecipes(data.hits);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        displayRecipes([]);
    }
}

function displayRecipes(recipes) {
    const resultsList = document.querySelector('#results');
    let html = '';
    if (recipes.length === 0) {
        html = '<p><h1>No dishes found</h1></p>';
    } else {
        recipes.forEach((recipe, index) => {
            html += `
            <div class="recipe-card" data-index="${index}">
                <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                <h3>${recipe.recipe.label}</h3>
                <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
            </div>
            `;
        });
    }
    resultsList.innerHTML = html;

    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach(card => {
        card.addEventListener('click', () => {
            searchRecipes(cuisine);
        });
    });
}

searchRecipes(cuisine);