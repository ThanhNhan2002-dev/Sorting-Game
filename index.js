document.addEventListener('DOMContentLoaded', () => {
    const numbersContainer = document.getElementById('numbers-container');
    const checkButton = document.getElementById('check-button');
    const messageDiv = document.getElementById('message');
    const attemptCountSpan = document.getElementById('attempt-count');
    const scoreCountSpan = document.getElementById('score-count');

    let attemptsLeft = 5;
    let score = 0;

    // Generate a shuffled array of numbers
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8];
    numbers = shuffleArray(numbers);

    // Create draggable elements for each number
    numbers.forEach(number => {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('number-item');
        numberDiv.setAttribute('draggable', true);
        numberDiv.textContent = number;
        numbersContainer.appendChild(numberDiv);
    });

    let draggedItem = null;

    // Add drag and drop functionality
    document.querySelectorAll('.number-item').forEach(item => {
        item.addEventListener('dragstart', function () {
            draggedItem = item;
            setTimeout(() => item.style.display = 'none', 0);
        });

        item.addEventListener('dragend', function () {
            setTimeout(() => {
                draggedItem.style.display = 'block';
                draggedItem = null;
            }, 0);
        });

        item.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        item.addEventListener('drop', function () {
            if (draggedItem) {
                this.parentNode.insertBefore(draggedItem, this);
            }
        });
    });

    // Check the order of numbers
    checkButton.addEventListener('click', () => {
        const currentOrder = Array.from(numbersContainer.children).map(item => parseInt(item.textContent));

        if (attemptsLeft > 0) {
            attemptsLeft--;
            attemptCountSpan.textContent = attemptsLeft;

            if (isSorted(currentOrder)) {
                score += 10;
                messageDiv.textContent = 'Correct! Numbers are in ascending order.';
                messageDiv.style.color = 'green';
            } else {
                messageDiv.textContent = 'Incorrect! Try again.';
                messageDiv.style.color = 'red';
            }

            scoreCountSpan.textContent = score;

            if (attemptsLeft === 0) {
                checkButton.disabled = true;
                messageDiv.textContent += ' Game over!';
            }
        }
    });

    // Helper function to shuffle array
    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // Helper function to check if array is sorted
    function isSorted(array) {
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] > array[i + 1]) {
                return false;
            }
        }
        return true;
    }
});
