/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
const risposte = {}; 


const boxes = document.querySelectorAll('.choice-grid div');  
for (const box of boxes) {
    box.addEventListener('click', ChooseBox);  
}

function restart(){     
    for (const key in risposte) {
        delete risposte[key];
    }
    console.log(risposte); 
    const notShow = document.querySelector('#result');
    notShow.classList.add('hidden');  
    for (const box of boxes) {
        box.classList.remove('opacity'); 
        box.classList.remove('selected'); 
        box.addEventListener('click', ChooseBox);
        box.querySelector('.checkbox').src = "images/unchecked.png"; 
    }

}
function chooseResult(){
    if(risposte.one === risposte.two || risposte.one === risposte.three)
        return risposte.one;
    if(risposte.two === risposte.one || risposte.two === risposte.three)
        return risposte.two;
    if(risposte.three === risposte.one || risposte.three === risposte.two)
        return risposte.three;
    return risposte.one;
}

function showValue(key){
    console.log(RESULTS_MAP[key]); 
    const show = document.querySelector('#result');
    show.querySelector('h1').textContent = RESULTS_MAP[key].title;
    show.querySelector('p').textContent = RESULTS_MAP[key].contents;
    show.classList.remove('hidden');
    const button = document.querySelector('#button');
    button.addEventListener('click',restart);
}

function opacity(selected){
   
    const risposteId = selected.dataset.choiceId;
    
    const answers = selected.parentNode.querySelectorAll('div');
    for (const ans of answers) {
        if(ans.dataset.choiceId !== risposteId){
            ans.classList.add('opacity');
            ans.querySelector('.checkbox').src = "images/unchecked.png";
            ans.classList.remove('selected');
        }
    }
}

function ChooseBox(event){
    console.log("selezionato"); 
    const box = event.currentTarget;
    box.querySelector('.checkbox').src = "images/checked.png";
    box.classList.add('selected');
    box.classList.remove('opacity');
    opacity(box);
    risposte[box.dataset.questionId] = box.dataset.choiceId;
    console.log(risposte) 
    if(risposte.one && risposte.two && risposte.three){
        for (const box of boxes) {
            box.removeEventListener('click',ChooseBox);
        }
        console.log('Fine selezione'); 
        showValue(chooseResult());
    }
}