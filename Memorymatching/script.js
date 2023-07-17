const cards=['A','B','C','D','E','F','G','H','A','B','C','D','E','F','G','H'];
let moves=0;
let timer;
let flippedCards=[];
let matchedPairs=0;

document.addEventListener('DOMContentLoaded',()=>{
    const grid=document.getElementById('grid');
    const movesDisplay=document.getElementById('moves');
    const timerDisplay=document.getElementById('timer');
    const newGameButton=document.getElementById('new-game');

    shuffle(cards);

    cards.forEach((cards,index)=>{
        const cardElement=document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index=index;
        
       cardElement.addEventListener('click',handleCardClick);
       grid.appendChild(cardElement);
    });

    function handleCardClick(){
        if(flippedCards.length<2 && !this.classList.contains('flipped') && !this.classList.contains('matched')){
            this.textContent=cards[this.dataset.index];
            this.classList.add('flipped');
            flippedCards.push(this);
            console.log(cards);
            

            if(flippedCards.length==2){
                setTimeout(checkMatching,1000);
                moves++;
                movesDisplay.textContent=moves;
            }
        }
    }
    

    function checkMatching(){
        const[card1,card2]=flippedCards;
        const index1=parseInt(card1.dataset.index);
        const index2=parseInt(card2.dataset.index);


        if(cards[index1]=== cards[index2]){
            card1.classList.add('matched');
            card2.classList.add('matched');

            matchedPairs++;

            if(matchedPairs===cards.length/2){
                clearInterval(timer);
                alert(`Congratulations! You won in ${timerDisplay.textContent} with ${moves} moves.`);
            }
        }
        else{
            card1.textContent='';
            card2.textContent='';
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }

        flippedCards=[];
    }

    function startTimer(){
        let seconds=0;
        timer=setInterval(()=>{
            seconds++;
            timerDisplay.textContent=`${seconds}s`;
        },1000);
    }

    newGameButton.addEventListener('click',()=>{
        clearInterval(timer);
        moves=0;
        matchedPairs=0;
        movesDisplay.textContent=moves;
        timerDisplay.textContent='0s';

        shuffle(cards);

        const cardElements=document.querySelectorAll('.card');
        cardElements.forEach(card=>{
            card.textContent='';
            card.classList.remove('flipped','matched');
        });

        startTimer();
    });

    startTimer();

});


function shuffle(array){
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [array[i],array[j]]=[array[j],array[i]];
    }

}