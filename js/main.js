document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    let answer = {title: "Title", id: 0, year: 1999, season: "Season", episodes: 13, category: "Category"};

    var form = document.getElementById('input-form');
if (form.attachEvent) {
    form.attachEvent("submit", submitGuess);
} else {
    form.addEventListener("submit", submitGuess);
}

    function createSquares() {
        const gameBoard = document.getElementById("board");

        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
        }

    }

    function submitGuess (e) {
        if (e.preventDefault) e.preventDefault();
        
        let guess = document.getElementById("guess-input").value;
        
        if(isValid(guess)) {
            processAnswer(guess);
            
            document.getElementById("input-form").reset();
        }
        return false;
    }

    function isValid (guess) {
        return true;
    }

    function processAnswer(guess) {
        console.warn(guess);
        if (guess == answer[1]) console.warn("Correct Answer. Title is: " + answer.title);
        else {
            let guessData = getData(guess);
            if (guessData.year == answer.year) console.warn("Correct Year! " + guessData.year + "/" + answer.year);
            if (guessData.season == answer.season) console.warn("Correct Season! " + guessData.season + "/" + answer.season);
            if (guessData.episodes == answer.episodes) console.warn("Correct Episodes! " + guessData.episodes + "/" + answer.episodes);
            if (guessData.category == answer.category) console.warn("Correct Category! " + guessData.category + "/" + answer.category);
        }
    }
    
    function getData(guess) {
        let data = {title: guess, id: null, year: null, season: null, episodes: null, category: null}
        if (guess == "Otto") {
            data.id = -1;
            data.year = 1999;
            data.season = "Season";
            data.episodes = 26;
            data.category = "Other";
        }
        else if (guess == "Teste") {
            data.id = -2;
            data.year = 1998;
            data.season = "Other";
            data.episodes = 13;
            data.category = "Category";
        }
        else {
            data.id = -3;
            data.year = 2000;
            data.season = "Other";
            data.episodes = 6;
            data.category = "Other";
        }
        return data;
    }
})