function selectDish(card) {
    const cuisine = card.querySelector('h2').id;
    window.location.href = `results.html?cuisine=${cuisine}`;
}


const searchInput = document.querySelector('.search-bar input');
const resultsList = document.querySelector('#results');

async function searchRecipes(cuisine) {
    const query = `healthy ${cuisine} `;
    try {
        const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=7aa516a5&app_key=dc836a223fb788b11ae390504d9e97ce&from=0&to=20&random=true`);
        const data = await response.json();
        displayRecipes(data.hits);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        
        displayRecipes([]);
    }
}

function displayRecipes(recipes) {
    let html = '';
    if (recipes.length === 0) {
        html = '<p><h1 style="color: white">No dishes found</h1></p>';
    } else {
        recipes.forEach((recipe) => {
            html += `
            <div>
                <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                <h3>${recipe.recipe.label}</h3>
                <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
            </div> 
            `;
        });
    }
    resultsList.innerHTML = html;
}