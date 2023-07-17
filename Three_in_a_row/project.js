//deposit some money
//to determine the number of line tobet on
//collect a bet amount
//spin the slot machine
//check if the user won
//give the user the winnings
//play again

const prompt=require("prompt-sync")();

const ROWS=3;
const cols=3;

const SYMBOLS_COUNT={
    A: 2,
    B: 4,
    C: 6,
    D: 8,
};

const SYMBOLS_VALUES={

    A: 5,
    B: 4,
    C: 3,
    D: 2,

};

const deposit=()=> {

    while(true){

        const depositAmount=prompt("Enter a deposit amount: ");

        const numberdepositAmount=parseFloat(depositAmount);

        if(isNaN(numberdepositAmount) || numberdepositAmount<=0){

            console.log("Invalid deposit amount,try again.");

        }else{
            return numberdepositAmount;

        }
    }

};

const getNumberOfLines=()=> {

    while(true){

        const lines=prompt("Enter the number of lines(1-3): ");

        const numberoflines=parseFloat(lines);

        if(isNaN(numberoflines) || numberoflines<=0 || numberoflines>3){

            console.log("Invalid number of lines,try again.");

        }else{
            return numberoflines;

        }
    }

};

const getBet=(balance,lines)=>{

    while(true){

        const bet=prompt("Enter the bet amount per line:  ");

        const numberbet=parseFloat(bet);

        if(isNaN(numberbet) || numberbet<=0 || numberbet>balance/lines){

            console.log("Invalid bet amount,try again.");

        }else{
            return numberbet;

        }
    }
};


const spin=()=>{

    const symbols=[];
    for(const[symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0;i<count;i++){
            symbols.push(symbol);
        }
    }


    const reel=[];
    for(let i=0;i<cols;i++){
        reel.push([]);
        const reelSymbols=[...symbols]
        for(let j=0;j<ROWS;j++){
            const randomIndex=Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbol=reelSymbols[randomIndex];
            reel[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1);

        }
    }
    console.log(reel);
    return reel;
}; 

const transpose=(reel)=>{
    const rows=[];

    for(let i=0;i<ROWS;i++){
        rows.push([]);
        for(let j=0;j<cols;j++){
            rows[i].push(reel[j][i]);
        }
    }
    console.log(rows);

    return rows;
};

const printRows=(rows)=>{
    for(const row of rows){
        let rowString="";
        for(const[i,symbol] of row.entries()){
           rowString+=symbol;
            if(i!=row.length-1){
                rowString+=" | ";
            }
        }
        console.log(rowString);

    }
};


const getWinnings=(rows,bet,lines)=>{
    let winnings=0;
    for(let row=0;row<lines;row++){
        const symbols=rows[row];
        let allSame=true;

        for(const symbol of symbols){
            if(symbol!=symbol[0]){
                allSame=false;
                break;
            }
        }

        if(allSame){
            winnings+=bet*SYMBOLS_VALUES[symbols[0]];

        }
    }return winnings;
};



const game=()=>{
    let balance=deposit();
 while(true){
    console.log("You have a balance of $"+balance);
    const numberoflines=getNumberOfLines();
    const bet=getBet(balance,numberoflines);
    balance-=bet*numberoflines;
    const reels=spin();
    const rows=transpose(reels);
    printRows(rows);
    const winnings=getWinnings(rows,bet,numberoflines);
    balance+=winnings;
    console.log("You Won,$"+winnings.toString());

    if(balance<=0){
        console.log("You ran out of money!");
        break;
    }
    const playAgain=prompt("DO you want to play again(y/n)?");

    if(playAgain!="y")break;
 }   


}

game();