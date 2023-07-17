console.log('Hello world');

let name="Sushma";

console.log(name);

let person={

    name:"Sushma",
    age:21

};

person.name='simba';

person['age']=22;

let selection='age';

person[selection]=23;

console.log(person.name);

console.log(person.age);

let selectedColors=['red','blue'];

selectedColors[2]=1;

console.log(selectedColors[2]);

function greet(name){
    console.log("Hello "+name);
}

greet('Arjun');
greet('Krishna');


