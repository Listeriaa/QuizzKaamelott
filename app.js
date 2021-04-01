// 3-Récupérer les résultats au click
// 4-Comparer les résultats
// 5- Afficher des phrases en fonction des résultats
// 6-Changer la couleur des blocs + animations en fonction des résultats


const reponses = ['a','b','c','b','a'];
//initialisation variable
let numberGoodAnswers=null;
 
const form = document.querySelector('.form-quizz');
form.addEventListener('submit', handleFormSubmit);

window.addEventListener('DOMContentLoaded', handleLoadPage);
let input = document.querySelectorAll('input:checked');
let aide = document.getElementById('aide');
let note = document.getElementById('note');
let h4 = document.querySelector('#resultats h4');

function handleLoadPage(){
    let ms = 250;
    
    var questionBlockElements = document.querySelectorAll('.question-block');

    console.log(questionBlockElements.length);
    for (let i=0 ; i < questionBlockElements.length ; i++){
        
        setTimeout(function() {
            questionBlockElements[i].classList.remove("ishidden");
            questionBlockElements[i].classList.add("scale");
        }, ms)
        ms+=250;
        console.log(ms);
        
        setTimeout(function() {
            questionBlockElements[i].classList.remove("scale");
            
        }, 2500)
        
     } 
     setTimeout(function() {
         document.querySelector("button").classList.remove("ishidden");
        document.querySelector("button").classList.add("scale");
     }, 1750)
     setTimeout(function() {
     document.querySelector("#resultats").classList.remove("ishidden");
     document.querySelector("#resultats").classList.add("scale");
    }, 2000)
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    //je réinitialise le tableau des résultats a chaque submit et le nombre de bonnes réponses
    let results = [];
    numberGoodAnswers = 0;
    
    //ca récupère les valeurs des input qui ont été checked (selectionnés)
    let input = document.querySelectorAll('input:checked');
    let questionBlockElements = document.querySelectorAll('.question-block');
   
    
    //je remplis mon tableau results
    for (let index =0 ; index < input.length ; index++){
        results.push(input[index].value);
        console.log(results);
    }

    for (let index in results) {
        let isOK = checkAnswers(results[index], reponses[index]);
        if (isOK) {
            questionBlockElements[index].style.backgroundColor="#8ade93";

        } else {
            questionBlockElements[index].style.backgroundColor="#ffbeb9";
            questionBlockElements[index].classList.add('echec');
            setTimeout(function() {
                questionBlockElements[index].classList.remove('echec');
            }, 500)
        }
       
    }

    showResults(numberGoodAnswers);
    results=[];
}


function checkAnswers(answers, userAnswers) {
    if (answers === userAnswers) {
        console.log("gagné");
        numberGoodAnswers++;
        return true;
    } else {
        console.log('perdu');
        return false;
        
    }
}

function showResults(numberGoodAnswers) {
    switch(numberGoodAnswers) {
        case 0:
            h4.textContent = `👎 Peux mieux faire ! 👎`;
            aide.textContent = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
            document.getElementById('resultats').style.backgroundColor="#ffbeb9";
            break;
        case 1:
            h4.textContent = `😭 Peux mieux faire ! 😭`
            aide.textContent = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
            document.getElementById('resultats').style.backgroundColor="#ffbeb9";
            break;
        case 2:
            h4.textContent = `👀 Il reste quelques erreurs. 😭`;
            aide.textContent = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
            document.getElementById('resultats').style.backgroundColor="#ffbeb9";
            break;
        case 3:
            h4.textContent = `✨ Encore un effort ... 👀`
            aide.textContent = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
            document.getElementById('resultats').style.backgroundColor="#ffbeb9";
            break;
        case 4:
            h4.textContent = `✨ Vous y êtes presque ! ✨`;
            aide.textContent = 'Retentez une autre réponse dans la case rouge, puis re-validez !';
            document.getElementById('resultats').style.backgroundColor="#ffbeb9";
            break;
        case 5:
            h4.textContent = `✔️ Bravo, c'est un sans faute ! ✔️`;       
            aide.textContent = '';
            document.getElementById('resultats').style.backgroundColor="#8ade93";
            break;
        default:
            "c'est inattendu";
            break;
    }
    note.textContent = numberGoodAnswers + '/5';
}

