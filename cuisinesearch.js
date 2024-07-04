// Select the dish and apply the green border
/*function selectDish(card) {
    // Remove selected class from all recipe cards
    document.querySelectorAll('.recipe-card').forEach(card => {
        card.classList.remove('selected');
        card.style.border = ''; // Remove green border
    });

    // Select the clicked card
    card.classList.add('selected');
    card.style.border = '3px solid #4CAF50'; // Add green border

    // Get the cuisine associated with the selected card
    const cuisine = card.querySelector('h2').id;
    searchRecipes(cuisine); // Pass the cuisine to the searchRecipes function
}*/
function selectDish(card) {
    // Get the cuisine associated with the selected card
    const cuisine = card.querySelector('h2').id;

    // Redirect to results.html with the selected cuisine as a query parameter
    window.location.href = `results.html?cuisine=${cuisine}`;
}


// Search form elements
const searchInput = document.querySelector('.search-bar input'); // Assuming you have an input for search
const resultsList = document.querySelector('#results'); // Assuming you have a container for results

// Function to search recipes using the API
async function searchRecipes(cuisine) {
    const query = `healthy ${cuisine} `;
    try {
        const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=7aa516a5&app_key=dc836a223fb788b11ae390504d9e97ce&from=0&to=20&random=true`);
        const data = await response.json();
        displayRecipes(data.hits);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        
        displayRecipes([]); // Display no dishes message if there's an error
    }
}

// Function to display the recipes
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

// Example search form submission (if you have a search form)
// searchForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const searchValue = searchInput.value.trim();
//     searchRecipes(searchValue);
// });
