document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    theMovieDb.common.api_key = "3ba2e8da73270c632742baee65e499a2";
    let answer = {title: "Title", id: 0, year: 1999, season: "Season", episodes: 13, category: "Category"};

    let tries = 0;

    var submit = document.getElementById('submit-button');
    var search = document.getElementById('search-button');
    var form = document.getElementById('input-form');

    if (form.attachEvent) {
        submit.attachEvent("click", submitGuess);
        search.attachEvent("click", searchTitle);
    } else {
        submit.addEventListener("click", submitGuess);
        search.addEventListener("click", searchTitle);
    }


    var titles = [];

    //var gInput = document.getElementById('guess-input');

    //gInput.addEventListener("keydown", startSearch);
    //gInput.addEventListener("keyup",searchTitle);

    //function startSearch() {
    //    gInput.addEventListener("keyup",searchTitle);
    //    gInput.removeEventListener("keydown", startSearch);
    //}
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
        if (guess == answer.title) {
            console.warn("Correct Answer. Title is: " + answer.title);
            for (let i = 1; i <= 5; i++) {
                document.getElementById((5*tries)+i).textContent = "=";    
            }
        }
        else {
            document.getElementById((5*tries)+1).textContent = "¬";
            let guessData = getData(guess);
            let resArray = compareData(guessData,answer);
            for(let i=0;i<resArray.length;i++) {
                let fill = "";
                switch (resArray[i]) {
                    case 0:
                        fill = "¬";
                        break;
                    case 1:
                        fill = "=";
                        break;
                    case 2:
                        fill = ">";
                        break;
                    case 3:
                        fill = "<";
                        break;
                    default:
                        console.warn ("Error: " + i + "=" + resArray[i]);
                }
                document.getElementById((5*tries)+i+2).textContent = fill;
            }
        }
        tries = tries+1;
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

    function compareData (data1, data2) {
        let result = [compare(data1.year,data2.year),compare(data1.season,data2.season),compare(data1.episodes,data2.episodes),compare(data1.category,data2.category)];
        return result;
    }

    function compare (param1, param2) {
        if (typeof param1 === typeof param2) {
            if (typeof param1 === 'number') {
                if (param1 == param2) return 1;
                else if (param1 > param2) return 2;
                else if(param1 < param2) return 3;
                else return 4;
            }
            else {
                if (param1 == param2) return 1;
                else return 0;
            }
        }
        else return 5;
    }

    function searchTitle (e) {
        if (e.preventDefault) e.preventDefault();
        
        let sInput = document.getElementById("guess-input").value;
        theMovieDb.search.getMovie({"query":encodeURI(sInput)},successCB,errorCB);
        //gInput.removeEventListener("keyup",searchTitle);
        return false;
    }

    function successCB(data) {
        console.log("Success callback: " + data);
    };
            
    function errorCB(data) {
        console.log("Error callback: " + data);
    };
    
})