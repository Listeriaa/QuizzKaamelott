// 3-Récupérer les résultats au click
// 4-Comparer les résultats
// 5- Afficher des phrases en fonction des résultats
// 6-Changer la couleur des blocs + animations en fonction des résultats


const reponses = ['a','b','c','b','a'];
//initialisation variable
let numberGoodAnswers=null;
 
const form = document.querySelector('.form-quizz');
form.addEventListener('submit', handleFormSubmit);


let input = document.querySelectorAll('input:checked');
let aide = document.getElementById('aide');
let note = document.getElementById('note');
let h4 = document.querySelector('#resultats h4');



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
        }
    }
    showResults(numberGoodAnswers);
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
            break;
        case 1:
            h4.textContent = `😭 Peux mieux faire ! 😭`
            aide.textContent = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
            break;
        case 2:
            h4.textContent = `👀 Il reste quelques erreurs. 😭`;
            aide.textContent = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
            break;
        case 3:
            h4.textContent = `✨ Encore un effort ... 👀`
            aide.textContent = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
            break;
        case 4:
            h4.textContent = `✨ Vous y êtes presque ! ✨`;
            aide.textContent = 'Retentez une autre réponse dans la case rouge, puis re-validez !';
            break;
        case 5:
        h4.textContent = `✔️ Bravo, c'est un sans faute ! ✔️`;       
        aide.textContent = '';
        break;
    }
    note.textContent = numberGoodAnswers + '/5';
}