settings = {};
settings.misc = {};
settings.misc.disguise = {};
settings.misc.disguise.enabled = false;
settings.misc.disguise.name = "";
settings.misc.theme = "default";
settings.answer = {};
settings.answer.modes = {};
settings.answer.modes.auto = false;
settings.answer.modes.highlight = false;
settings.answer.modes.hidden = false;
settings.misc.highlight = {};
settings.misc.highlight.color = "green";
settings.misc.highlight.width = "8";
settings.answer.modes.auto.delay = 0;
settings.answer.enabled = false;
customPoints = false;
points = 1000;
time = 0;
setPoints = function(num) {
    if (num > 1000) {
        return false;
    }
    function findPoints(number) {
        time = number;
        var avaliableTime = functions.question().time / 1000;
        var points = Math.round((1 - (((time / 1000) / avaliableTime) / 2)) * 1000)
        return points
    }
    function pts(p) {
        var e = 0;
        while (findPoints(e) != p) {
            e++;
        }
        console.log("Points set to: " + String(p));
        return e;
    }
    pts(num);
}
game = {};
game.id = "";
functions = {};
functions.initilize = function() { console.log("loading..."); fetch("https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js").then((r) => r.text().then((t) => eval(t))).then(fulfilled,unfulfilled); function fulfilled() { $.get("https://kahoot.it/rest/kahoots/" + String(prompt("game-id")),function(responseText) { data = responseText; console.log("success!"); }) }; function unfulfilled() {console.warn("error loading jquery")} };
functions.storage = function() { try { return JSON.parse(localStorage.getItem('kahoot-game_session')) } catch { console.warn("error getting localStorage") } };
functions.question = function() { return data.questions[functions.storage().questionNumber] };
functions.answers = function() { let answers = []; for (let i = 0; i < functions.question().choices.length; i++) { if (functions.question().choices[i].correct == true) { answers.push(i); } } return answers; };
hacks = {};
hacks.modes = {};
hacks.modes.auto = {};
hacks.modes.auto.find = function() {if (functions.question().type == "multiple_select_quiz") {hacks.modes.auto.multi()} else if (functions.question().type == "open_ended") {hacks.modes.auto.open()} else if (functions.question().type == "quiz") {hacks.modes.auto.quiz();} else { console.warn("error in modes"); } }
hacks.modes.auto.quiz = function() { document.getElementsByTagName("button")[functions.answers()[0]].click(); }
hacks.modes.auto.multi = function() { for (let i = 0; i < functions.answers().length; i++) { document.getElementsByClassName("sc-iyASHB dcbrLs")[0].children[functions.answers()[i]].click(); }; document.getElementsByClassName('sc-fKFyDc kRBkdi sc-iXfyRr dvcamq')[0].click(); };
hacks.modes.auto.open = function() { try { document.getElementsByClassName("sc-ibhdcv hnkKVG")[0].placeholder = functions.question().choices[0].answer } catch { console.warn("non type answer, clicking random"); hacks.modes.auto.quiz(); } }
hacks.modes.highlight = {};
hacks.modes.highlight.find = function() {if (functions.question().type == "multiple_select_quiz") {hacks.modes.highlight.quiz()} else if (functions.question().type == "open_ended") {hacks.modes.auto.open()} else if (functions.question().type == "quiz") {hacks.modes.highlight.quiz();} else { console.warn("error in modes(1)"); } }
hacks.modes.highlight.quiz = function() { for (let i = 0; i < functions.answers().length; i++) { document.getElementsByClassName("sc-iyASHB dcbrLs")[0].children[functions.answers()[i]].style.border = String(settings.misc.highlight.width) + "px solid " + String(settings.misc.highlight.color)}}
hacks.modes.highlight.open = function() { hacks.modes.auto.open(); };
hacks.modes.hidden = {};
hacks.modes.hidden.listener = function() { for (let i = 0; i < document.getElementsByClassName("sc-iyASHB dcbrLs")[0].children.length; i++) { document.getElementsByClassName("sc-iyASHB dcbrLs")[0].children[i].addEventListener("mousedown",function() { for (let i = 0; i < functions.answers().length; i++) { document.getElementsByClassName("sc-iyASHB dcbrLs")[0].children[functions.answers()[i]].click(); }; }) } };
var observer = setInterval(function () { if (location.href.includes("getready")) { clearInterval(observer); let lastUrl = location.href; new MutationObserver(() => { const url = location.href; if (url !== lastUrl) { lastUrl = url; onQuestionStart(); } }).observe(document, { subtree: true, childList: true }); } });
function onQuestionStart() {
    if (location.href.includes("gameblock")) {

        if (settings.answer.modes.auto == true) { 

            if (customPoints) {
                setTimeout(function() { hacks.modes.auto.find() },time);
            } else {
                hacks.modes.auto.find();
            }

        }

        if (settings.answer.modes.highlight == true) {
            hacks.modes.highlight.find();
        }

        if (settings.answer.modes.hidden == true) {
            if (functions.question().type == "open_ended") {
                hacks.modes.auto.open();
            } else {
                hacks.modes.hidden.listener();
            }
        }

    }
}
function enableDisguise() {
    settings.misc.disguise.enabled = true;
    console.log("success!");
}
function disableDisguise() {
    settings.misc.disguise.enabled = false;
    console.log("success!");
}
function highlightColor(color) {
    settings.misc.highlight.color = color;
    console.log("success!");
}
function setDisguise(name) {
    settings.misc.disguise.name = name;
    console.log("success!");
}
function useHighlight() {
    settings.answer.modes.auto = false;
    settings.answer.modes.highlight = true;
    settings.answer.modes.hidden = false;
    console.log("success!");
}
function useAuto() {
    settings.answer.modes.auto = true;
    settings.answer.modes.highlight = false;
    settings.answer.modes.hidden = false;
    console.log("success!");
}
function useHidden() {
    settings.answer.modes.auto = false;
    settings.answer.modes.highlight = false;
    settings.answer.modes.hidden = true;
    console.log("success!");
}
setInterval(() => {
    try {
        if (settings.misc.disguise.enabled) {
            document.getElementsByClassName("sc-JJYMh gTnOVg")[0].innerText = settings.misc.disguise.name;
            console.log("Disguise changed to " + settings.misc.disguise.name);
        }
    } catch {

    }
}, 1000);
functions.initilize();
console.log("%cHelp".padStart(35),"color:mediumblue;font-family:system-ui;font-size:1.5rem;-webkit-text-stroke: 1px black;font-weight:1000;");
console.log("%cCommands:".padStart(0),"color:mediumblue;font-family:system-ui;font-size:0.85rem;-webkit-text-stroke: 1px black;font-weight:1000;");
console.log("%c1. useAuto()".padStart(0),"color:mediumblue;font-family:system-ui;font-size:0.75rem;-webkit-text-stroke: 1px black;font-weight:1000;");
console.log("%c2. useHighlight()".padStart(0),"color:mediumblue;font-family:system-ui;font-size:0.75rem;-webkit-text-stroke: 1px black;font-weight:1000;");
console.log("%c3. useHidden()".padStart(0),"color:mediumblue;font-family:system-ui;font-size:0.75rem;-webkit-text-stroke: 1px black;font-weight:1000;");
console.log("%c4. setPoints('amount-you-want')".padStart(0),"color:mediumblue;font-family:system-ui;font-size:0.75rem;-webkit-text-stroke: 1px black;font-weight:850;");
console.log("%c5. highlightColor('color')".padStart(0),"color:mediumblue;font-family:system-ui;font-size:0.75rem;-webkit-text-stroke: 1px black;font-weight:850;");
console.log("%c6. enableDisguise()".padStart(0),"color:mediumblue;font-family:system-ui;font-size:0.75rem;-webkit-text-stroke: 1px black;font-weight:850;");
console.log("%c7. disableDisguise()".padStart(0),"color:mediumblue;font-family:system-ui;font-size:0.75rem;-webkit-text-stroke: 1px black;font-weight:850;");
console.log("%c8. randomDisguise()".padStart(0),"color:mediumblue;font-family:system-ui;font-size:0.75rem;-webkit-text-stroke: 1px black;font-weight:850;");
function randomDisguise() {
    names = []
    $.get("https://apis.kahoot.it/namerator", function(data) {
        names.push(JSON.parse(data).name)
        enableDisguise();
        setDisguise(names[0]);
        console.log("disguise set to " + names[0]);
    })
}