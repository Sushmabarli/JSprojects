const newYears="1 Jan 2024"; 
const daysEl=document.getElementById('days');
const hoursEl=document.getElementById('hours');
const minsEl=document.getElementById('mins');
const secondsEl=document.getElementById('seconds');

function countdown(){
    const newYearsDate=new Date(newYears);
    const currentDate=new Date();
    let y=newYearsDate-currentDate;
    const totalseconds=y/1000;
    const days=Math.floor(totalseconds/3600/24);
    const hours=Math.floor(totalseconds/3600)%24;
    const mins=Math.floor(totalseconds/60)%60;
    const secs= Math.floor(totalseconds%60);  
    console.log(days,hours,mins,seconds);

    daysEl.innerHTML=formatTime(days);
    hoursEl.innerHTML=formatTime(hours);
    minsEl.innerHTML=formatTime(mins);
    secondsEl.innerHTML=formatTime(secs);
    
}

function formatTime(time){
    return time<10?`0${time}`:time;
}

countdown();

setInterval(countdown,1000);