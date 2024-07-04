document.addEventListener('DOMContentLoaded', (event) => {
    
    window.onload = function() {
        document.querySelector('form').reset();
        document.getElementById('height-value').innerText = '100'; 
    };

    const cards = document.querySelectorAll('.card');
    let currentCardIndex = 0;
    showCard(currentCardIndex);

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

    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

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

        localStorage.setItem('cuisine', cuisine);
        localStorage.setItem('dietaryRestrictions', dietaryRestrictions);
        localStorage.setItem('purpose', purpose);
        localStorage.setItem('height', height);
        localStorage.setItem('weightLift', weightLift);
        localStorage.setItem('ageDecade', ageDecade);
        localStorage.setItem('exerciseHours', exerciseHours);

        window.location.href = 'second_page.html';
    });
});