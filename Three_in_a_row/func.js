function add(x,y){
    return x+y;
}
let a=5;
let b=3;

let result=add(a,b);
console.log(result);

function display(x,y,operation){

    var result=operation(x,y);

    console.log(result);
}

display(10,5,add);