document.addEventListener('DOMContentLoaded', (event) => {
    // Retrieve values from localStorage
    const height = localStorage.getItem('height');
    const weightLift = localStorage.getItem('weightLift');
    const ageDecade = localStorage.getItem('ageDecade');
    const exerciseHours = localStorage.getItem('exerciseHours');

    // Check if values exist before using them
    if (height && weightLift && ageDecade && exerciseHours) {
        console.log('Height:', height);
        console.log('Weight to Lift:', weightLift);
        console.log('Age Decade:', ageDecade);
        console.log('Exercise Hours:', exerciseHours);

        // Categorize BMI
        const categorizeBMI = (weightLift) => {
            if (weightLift < 18.5) {
                return 'Underweight';
            } else if (weightLift >= 18.5 && weightLift < 25) {
                return 'Healthy BMI';
            } else if (weightLift >= 25 && weightLift < 30) {
                return 'Overweight';
            } else if (weightLift >= 30 && weightLift < 35) {
                return 'Class I obesity';
            } else if (weightLift >= 35 && weightLift < 40) {
                return 'Class II obesity';
            } else {
                return 'Class III obesity';
            }
        };

        // Categorize age decade
        const categorizeAgeDecade = (ageDecade) => {
            const age = parseInt(ageDecade);
            if (age < 30) {
                return '10-30';
            } else if (age < 50) {
                return '30-50';
            } else if (age < 70) {
                return '50-70';
            } else {
                return '70+';
            }
        };

        // Categorize exercise hours
        const categorizeExerciseHours = (exerciseHours) => {
            const hours = parseInt(exerciseHours);
            if (hours < 5) {
                return '0 to 5';
            } else if (hours < 15) {
                return '5 to 15';
            } else if (hours < 25) {
                return '15 to 25';
            } else {
                return '25+';
            }
        };

        // Display messages
        const displayMessage = (bmiCategory, ageCategory, exerciseCategory) => {
            let message = '';

            // BMI
            if (bmiCategory === 'Healthy BMI') {
                message += 'You have a healthy BMI. ';
            } else if (bmiCategory === 'Underweight') {
                message += 'You are underweight. Consider a balanced diet. ';
            } else {
                message += 'Consider a healthy diet and exercise plan. ';
            }

            // Age
            if (ageCategory === '10-30') {
                message += 'You are in your prime years. ';
            } else if (ageCategory === '30-50') {
                message += 'You are in a mature age group. ';
            } else if (ageCategory === '50-70') {
                message += 'You are experienced and wise. ';
            } else {
                message += 'You are very experienced. ';
            }

            // Exercise
            if (exerciseCategory === '0 to 5') {
                message += 'Try to exercise more regularly.';
            } else if (exerciseCategory === '5 to 15') {
                message += 'Good job on exercising. Keep it up!';
            } else if (exerciseCategory === '15 to 25') {
                message += 'You are very active. Well done!';
            } else {
                message += 'You are extremely active. Fantastic!';
            }

            return message;
        };

        // Get the categories
        const bmiCategory = categorizeBMI(weightLift);
        const ageCategory = categorizeAgeDecade(ageDecade);
        const exerciseCategory = categorizeExerciseHours(exerciseHours);

        // Display the results
        document.getElementById('bmi-result').innerHTML = `<p>BMI Category: ${bmiCategory}</p>`;
        document.getElementById('age-decade-result').innerHTML = `<p>Age Decade: ${ageCategory}</p>`;
        document.getElementById('exercise-hours-result').innerHTML = `<p>Exercise Hours: ${exerciseCategory}</p>`;
        document.getElementById('final-message').innerHTML = `<p>${displayMessage(bmiCategory, ageCategory, exerciseCategory)}</p>`;

    } else {
        console.log('No data available');
    }
});
