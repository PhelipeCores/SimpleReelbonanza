



document.addEventListener('DOMContentLoaded', function () {
    const icon_width = 79;
    const icon_height = 79;
    const sum_icons = 9;
    const time_per_icon = 100;
    const indexes = [0, 0, 0];
    const iconMap = ['Banana', 'Seven', 'Cherry', 'Plum', 'Orange', 'Bell', 'Bar', 'Lemon', 'Bar', 'Lemon', 'Melon'];

    // Select the button element within the "spinButton" div by its class
    const spinButton = document.querySelector('.spinButton button');

    // Attach a click event listener to the button
    spinButton.addEventListener('click', () => {
        spinButton.disabled = true;
        spinningReels();
        setTimeout(() => {
            spinButton.disabled = false;
        }, 3000); // Adjust the delay as needed
    });

    // Rest of your code, including the spinningReels function
    function spinningReels() {
        const reelsList = document.querySelectorAll('.slots > .reel');

        Promise.all([...reelsList].map((reel, i) => roll(reel, i)))
            .then((deltas) => {
                deltas.forEach((delta, i) => (indexes[i] = (indexes[i] + delta) % sum_icons));
                indexes.map((index) => {
                    console.log(iconMap[index]);
                });

                if (indexes[0] === indexes[1] || (indexes[0] === indexes[1] && indexes[1] === indexes[2])) {
                    console.log('WIN WIN WIN');
                }
                spinButton.disabled = false; // Re-enable the button after spinning
            });
    }

    // Animates the html reel element (unchanged)
    const roll = (reel, offset = 0) => {
        const delta = (offset + 2) * sum_icons + Math.round(Math.random() * sum_icons);
        const style = getComputedStyle(reel);
        const backgroundPositionY = parseFloat(style['background-position-y']);
        const targetBackgroundPositionY = backgroundPositionY + delta * icon_height;
        const normTargetBackgroundPositionY = targetBackgroundPositionY % (sum_icons * icon_height);

        return new Promise((resolve, _reject) => {
            reel.style.transition = `background-position-y ${8 + delta * time_per_icon}ms cubic-bezier(.45, .05,.58,1.09)`;
            reel.style.backgroundPositionY = `${targetBackgroundPositionY}px`;

            setTimeout(() => {
                reel.style.transition = 'none';
                reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
                resolve(delta % sum_icons);
            }, 8 + delta * time_per_icon);
        });
    }

    // Initial call to start spinning
    spinningReels();
});
