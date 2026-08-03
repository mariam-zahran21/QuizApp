const scoresContainer = document.getElementById("scores");

let scores = JSON.parse(localStorage.getItem("scores")) || [];

scores.sort((a, b) => b.score - a.score);

if (scores.length === 0) {

    scoresContainer.innerHTML = `
        <p class="text-center text-gray-500 text-xl">
            No scores yet. Play the quiz first!
        </p>
    `;

} else {

    scores.forEach((player, index) => {

        scoresContainer.innerHTML += `
            
            <div class="flex items-center justify-between bg-white rounded-xl p-5">

                <div class="flex items-center gap-4">

                    <span class="text-2xl font-bold text-pink-500">
                        ${index + 1}
                    </span>

                    <span class="text-xl font-semibold text-gray-700">
                        ${player.name}
                    </span>

                </div>

                <span class="text-xl font-bold text-purple-500">
                    ${player.score} / ${player.total}
                </span>

            </div>

        `;
    });
}