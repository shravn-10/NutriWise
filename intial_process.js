document.addEventListener('DOMContentLoaded', (event) => {
    // Reset form on page load
    window.onload = function() {
        document.querySelector('form').reset();
        document.getElementById('height-value').innerText = '100'; // Set initial height value
    };

    // Show the first card initially
    const cards = document.querySelectorAll('.card');
    let currentCardIndex = 0;
    showCard(currentCardIndex);

    // Add event listeners to next buttons
    const nextButtons = document.querySelectorAll('.next-btn');
    nextButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (index < cards.length - 1) {
                currentCardIndex++;
                showCard(currentCardIndex);
            }
            if (currentCardIndex === cards.length - 1) {
                document.getElementById('submit-btn').style.display = 'block';
                button.style.display = 'none';
            }
        });
    });

    function showCard(index) {
        cards.forEach((card, i) => {
            if (i === index) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    // Handle form submission
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Retrieve form values
        const cuisine = document.getElementById('cuisine').value;
        const dietaryRestrictions = document.getElementById('dietary-restrictions').value;
        const purposeRadios = document.getElementsByName('purpose_website');
        let purpose;
        for (const radio of purposeRadios) {
            if (radio.checked) {
                purpose = radio.value;
                break;
            }
        }
        const height = document.getElementById('height').value;
        const weightLift = document.getElementById('weight-lift').value;
        const ageDecade = document.getElementById('age-decade').value;
        const exerciseHours = document.getElementById('exercise-hours').value;

        // Store values in localStorage
        localStorage.setItem('cuisine', cuisine);
        localStorage.setItem('dietaryRestrictions', dietaryRestrictions);
        localStorage.setItem('purpose', purpose);
        localStorage.setItem('height', height);
        localStorage.setItem('weightLift', weightLift);
        localStorage.setItem('ageDecade', ageDecade);
        localStorage.setItem('exerciseHours', exerciseHours);

        // Redirect to second_page.html
        window.location.href = 'second_page.html';
    });
});
