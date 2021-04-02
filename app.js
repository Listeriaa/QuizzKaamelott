// 3-Récupérer les résultats au click
// 4-Comparer les résultats
// 5- Afficher des phrases en fonction des résultats
// 6-Changer la couleur des blocs + animations en fonction des résultats

const app = {
    reponses : ['a','b','c','b','a'],

    //initialisation variable
    numberGoodAnswers : 0,
    
    aide : document.getElementById('aide'),
    note : document.getElementById('note'),
    h4 : document.querySelector('#resultats h4'),
    questionBlockElements : document.querySelectorAll('.question-block'),
    form : document.querySelector('.form-quizz'),

    init : function() {
        app.form.addEventListener('submit', app.handleFormSubmit);
    },

    handleLoadPage: function(){
            let ms = 250;
            
            var questionBlockElements = document.querySelectorAll('.question-block');
        
            console.log(questionBlockElements.length);
            for (let i=0 ; i < questionBlockElements.length ; i++){
                
                setTimeout(function() {
                    questionBlockElements[i].classList.remove("ishidden");
                    questionBlockElements[i].classList.add("scale");
                }, ms)
                ms+=250;
                
                
                setTimeout(function() {
                    questionBlockElements[i].classList.remove("scale");
                    document.querySelector("button").classList.remove("scale");
                    document.querySelector("#resultats").classList.remove("scale");
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
        },


    handleFormSubmit :function (evt) {
        evt.preventDefault();

        //je réinitialise le tableau des résultats a chaque submit et le nombre de bonnes réponses
        app.numberGoodAnswers=0;
        let input = document.getElementsByTagName('input');
        let inputChecked = [];
        console.log(input);
        for (let index =0 ; index < input.length ; index++){
            if (input[index].checked === true){
            inputChecked.push(input[index].value);
            }
        }
        console.log(inputChecked);
        if (inputChecked.length !== app.reponses.length) {
            alert("Il faut répondre à toutes les questions ;)");
        } else {
            for (let index in inputChecked) {
                let isOK = app.checkAnswers(inputChecked[index], app.reponses[index]);
                console.log(isOK);
                console.log(app.numberGoodAnswers);
                if (isOK) {
                    app.questionBlockElements[index].style.backgroundColor="#8ade93";
    
                } else {
                    app.questionBlockElements[index].style.backgroundColor="#ffbeb9";
                    app.questionBlockElements[index].classList.add('echec');
                    setTimeout(function() {
                        app.questionBlockElements[index].classList.remove('echec');
                    }, 500)
                }
            }
            app.showResults(app.numberGoodAnswers);
        }
        inputChecked=[];
        
    },

    checkAnswers: function(answers, userAnswers) {
        if (answers === userAnswers) {
            app.numberGoodAnswers++;
            return true;
        } else {
            return false;
            
        }
    },

    showResults: function (numberGoodAnswers) {
        switch(numberGoodAnswers) {
            case 0:
                app.h4.textContent = `👎 Peux mieux faire ! 👎`;
                app.aide.textContent = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
                document.getElementById('resultats').style.backgroundColor="#ffbeb9";
                break;
            case 1:
                app.h4.textContent = `😭 Peux mieux faire ! 😭`
                app.aide.textContent = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
                document.getElementById('resultats').style.backgroundColor="#ffbeb9";
                break;
            case 2:
                app.h4.textContent = `👀 Il reste quelques erreurs. 😭`;
                app.aide.textContent = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
                document.getElementById('resultats').style.backgroundColor="#ffbeb9";
                break;
            case 3:
               app.h4.textContent = `✨ Encore un effort ... 👀`
                app.aide.textContent = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
                document.getElementById('resultats').style.backgroundColor="#ffbeb9";
                break;
            case 4:
                app.h4.textContent = `✨ Vous y êtes presque ! ✨`;
                app.aide.textContent = 'Retentez une autre réponse dans la case rouge, puis re-validez !';
                document.getElementById('resultats').style.backgroundColor="#ffbeb9";
                break;
            case 5:
                app.h4.textContent = `✔️ Bravo, c'est un sans faute ! ✔️`;       
                app.aide.textContent = '';
                document.getElementById('resultats').style.backgroundColor="#8ade93";
                break;
            default:
                "c'est inattendu";
                break;
        }
        app.note.textContent = numberGoodAnswers + '/5';
    }
}
document.addEventListener('DOMContentLoaded', app.init);
window.addEventListener('load', app.handleLoadPage);
