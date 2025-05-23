var hangman = {
    guesses : 5,
    dictionary : ["Apple", "Orange", "Tomato", "Banana", "Strawberry"],

    word : null,
    wordlen : 0, 
    rights : 0,  
    wrongs : 0,
      
    hImg : null,
    hWord : null,
    hChar : null,
    hLives : null,

    init : () => {
        hangman.hImg = document.getElementById("hangman-img");
        hangman.hWord = document.getElementById("hangman-words");
        hangman.hChar = document.getElementById("hangman-char");
        hangman.hLives = document.getElementById("hangman-lives");

        for (var i=65; i<91; i++) {
            let charnow = document.createElement("input");
            charnow.type = "button";
            charnow.value = String.fromCharCode(i);
            charnow.disabled = true;
            charnow.onclick = () => hangman.check(charnow);
            hangman.hChar.appendChild(charnow);
        }

        let rst = document.getElementById("hangman-reset");
        rst.onclick = hangman.reset;
        rst.disabled = false;
        hangman.reset();
    },

    toggle : disable => {
        let all = hangman.hChar.getElementsByTagName("input");
        for (var i of all) { i.disabled = disable; }
    },

    reset : () => {
        hangman.rights = 0;
        hangman.wrongs = 0;
        hangman.hLives.innerHTML = hangman.guesses;
        hangman.hImg.style.opacity = 0;

        hangman.word = hangman.dictionary[Math.floor(Math.random() * Math.floor(hangman.dictionary.length))];
        hangman.word = hangman.word.toUpperCase();
        hangman.wordlen = hangman.word.length;

        hangman.hWord.innerHTML = "";
        for (var i=0; i<hangman.word.length; i++) {
            var charnow = document.createElement("span");
            charnow.innerHTML = "_";
            charnow.id = "hangword-" + i;
            hangman.hWord.appendChild(charnow);
        }

        hangman.toggle(false);
    },

    check : char => {
        var index = 0, hits = [];
        while (index >= 0) {
            index = hangman.word.indexOf(char.value, index);
            if (index == -1) {
                break;
            }
            else {
                hits.push(index);
                index++;
            }
        }

        if (hits.length > 0) {
            for (var hit of hits) {
                document.getElementById("hangword-" + hit).innerHTML = char.value;
            }

            hangman.rights += hits.length;
            if (hangman.rights == hangman.wordlen) {
                hangman.toggle(true);
            }
        } else {
            hangman.wrongs++;
            var livesleft = hangman.guesses - hangman.wrongs;
            hangman.hLives.innerHTML = livesleft;
            hangman.hImg.style.opacity = (1 - (livesleft/hangman.guesses)).toFixed(2);

            if (hangman.wrongs == hangman.guesses) {
                hangman.toggle(true);
            }
        }

        char.disabled = true;
    }
};
window.addEventListener("DOMContentLoaded", hangman.init);