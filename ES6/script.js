// ES 6

// const // immutable
// let // mutable

////////////////////////////FUNCTIONS
//ES5
// function liscence(testPassed) {
//    console.log(name); // undefined
//    if (testPassed) {
//       var name = 'Raj';
//       var YOB = 1994;
//    }
//    console.log(name, YOB); // function scoped variables - var
// }
// //ES6
// function liscence6(testPassed) {
//    console.log(name); // will give an undefind error --- the TEMPORAL DEAD ZONE TDZ --- https://stackoverflow.com/questions/33198849/what-is-the-temporal-dead-zone
//    if (testPassed) {
//       let name = 'Raj';
//       const YOB = 1994;
//    }
//    console.log(name, YOB); // block scoped variables - let, const
// }
// liscence(true);
// liscence6(true);

// for (let i = 0; i < 4; i++) {
//     setTimeout(() => console.log(i), 0)
//   }

//   for (var i = 0; i < 4; i++) {
//     setTimeout(() => console.log(i), 0)
//   }
///////////////////////////IIFE and BLOCKS
//ES5
// (function () {
//   var c =3  
// })()

// //ES6
// {
//     const a = 2 // block scoped
//     let b = 2 // block scoped
//     var c = 3 // not block scoped 
// }

/////////////////////////Strings

/* let firstName = 'Raj'
const yob = 1994
function calcAge(year) {
  return 2020 - year
}

//ES5
console.log('This is '+firstName+'. I am '+calcAge(yob))

//ES6 template literal

console.log(`This is ${firstName} . I am ${calcAge(yob)}`)

const str = `${firstName} `

console.log(str.startsWith('R'))
console.log(str.endsWith('j'))
console.log(str.includes(' '))
console.log(str.repeat(5)) */

//////////////////////////Arrow functions

/* const years = [1994, 1995, 1956, 1959]

//ES5
var ages5 = years.map(function(el) {
  return 2020-el
})
console.log(ages5)

//ES6
// const ages6 = years.map(el => 2020-el)
let ages6 = years.map(el => 2020-el)
console.log(ages6)
ages6 = years.map((el,i) => `Age element ${i} is ${el}`)
console.log(ages6)
ages6 = years.map((el,i) => { return `Age element ${i} is ${el}` })
console.log(ages6) */

//////////////////////////AF Lexical this keyword
//ES 5 
/* var box5 = {
  color:'green',
  position:1,
  clickMe: function () {
    var self = this
    document.querySelector('.green').addEventListener('click', function() {
      console.log('This is box number '+ self.position+ ' and is '+self.color +' color')
    })
  }
}
//box5.clickMe()

//ES 6 
const box6 = {
  color:'green',
  position:1,
  clickMe: function () {
    document.querySelector('.green').addEventListener('click', () => {
      console.log('This is box number '+ this.position+ ' and is '+this.color +' color')
    })
  }
}
box6.clickMe() */
//this one below wont work as it shares te window object
/* const box66 = {
  color:'green',
  position:1,
  clickMe:  () => {
    document.querySelector('.green').addEventListener('click', () => {
      console.log('This is box number '+ this.position+ ' and is '+this.color +' color')
    })
  }
}
box66.clickMe() */
/* 
function Person5(name) {
  this.name = name
}
//ES5
Person5.prototype.myFriends = function (friends) {
 var arr = friends.map(function(el) {
   return this.name+' is friend with '+el
 }.bind(this)) // binds the function with - this 
 console.log(arr)
}

var friends = ['pradeep', 'kumar']
new Person5('Raj').myFriends(friends)
//ES6
function Person6(name) {
  this.name = name
}
Person6.prototype.myFriends = function (friends) {
  var arr = friends.map(el => `${this.name} is friend with ${el}` )
  console.log(arr)
 }
 
 var friends = ['pradeep', 'kumar']
 new Person6('Pavi').myFriends(friends) */

 ///////////////Destructuring
 //ES5

 /* var raj = ['raj', 25]
 var name = raj[0]
 var age = raj[1] */

 //ES6
 /* const [name, age] = ['pavi', 25]
console.log(name)
console.log(age)
const obj = {
  firstName: 'Raj',
  lastName: 'G'
}

const {firstName, lastName} = obj
console.log(firstName, lastName)

const {firstName: a, lastName: b} = obj
console.log(a, b)

function caclAgeRetire (year) {
  const age = new Date().getFullYear() - year
  return [age, 60-age]
}

const [age2, retirement] = caclAgeRetire(1994)
console.log(age2)
console.log(retirement) */

////////////////////Arrays

//const boxes = document.querySelectorAll('.box');
//ES5
//var boxesArray = Array.prototype.slice.call(boxes);
// boxesArray.forEach(function(cur){
//   cur.style.backgroundColor = 'dodgerblue'
// })
//ES6
//Array.from(boxes).forEach(cur => cur.style.backgroundColor = 'dodgerblue')
////loop
//ES5
// for (var i=0; i < boxesArray.length; i++){
//   if(boxesArray[i].className === 'box blue') {
//     continue
//   }
//   boxesArray[i].textContent = 'i Changed to blue'
// }
//ES6
// for (const current of boxesArray) {     //for of loop
//   if(current.className.includes('blue')) {
//     continue
//   }
//   current.textContent = 'mee to'
// }
////index of
/* var age = [12,17,15,19,18]
//ES5
var full = age.map(function(cur) {
  return cur>18
})
console.log(full)
console.log(full.indexOf(true))
console.log(age[full.indexOf(true)])
//ES6
console.log(age.findIndex(cur => cur>=18))
console.log(age.find(cur => cur>=18)) */

/////////////////////////////SPREAD OPERATOR


/* function addages (a, b, c ,d) {
  return a+b+c+d
}
var sum1 = addages(18, 13, 12, 21)
console.log(sum1)

// ES5
var ages = [18, 13, 12, 21]
var sum2 = addages.apply(null, ages)
console.log(sum2)
// ES6
console.log(addages(...ages)) // Exapand the array -- spread operator
// joining the array
var ages1 = [18, 13, 12, 21]
var ages2 = [18, 13, 12, 21]
var ages3 = [...ages1,28,...ages2]
console.log(ages3)
// works on nodelist too
const h = document.querySelector('h1')
const boxes = document.querySelectorAll('.box')
console.log(typeof boxes)
console.log(boxes)
const all = [h,...boxes] // converted from node list to array

Array.from(all).forEach(cur => cur.style.color = 'purple') */

////////////////////////////// REST PARAMETERS opposite of SPREAD OPERATORS
//ES5
/* function isFullAge5() {
  console.log(arguments)
  var arr = Array.prototype.slice.call(arguments)
  arr.forEach(function(curr) {
    console.log((2020-curr) >= 18) // Arguments object
  })
}

isFullAge5(1994,2004,1998)

//ES6
function isFullAge6(...years) {
  console.log(years)
  years.forEach(function(curr) {
    console.log((2020-curr) >= 18) // this will be an array object
  })
}
isFullAge6(1994,2004,1998)

//ES5
function isFullAge52(limit) {
  console.log(arguments)
  var arr = Array.prototype.slice.call(arguments, 1)
  arr.forEach(function(curr) {
    console.log((2020-curr) >= limit) // Arguments object
  })
}

isFullAge52(21, 1994, 2004, 1998)

//ES6
function isFullAge62(limit, ...years) {
  console.log(years)
  years.forEach(function(curr) {
    console.log((2020-curr) >= limit) // this will be an array object
  })
}
isFullAge62(21,1994,2004,1998) */

///////////////////////////////////////////DEFAULT PARAMETERS

//ES5
/* function Person5(firstName, yob, lastName) {
  this.firstName =firstName,
  this.yob =yob,
  lastName === undefined ? lastName = 'Govind': lastName;
  this.lastName = lastName
}

var raj =new Person('raj', 1994)
var pavi = new Person('pavi', 1995, 'pandey') 

//ES6

function Person6(firstName, yob, lastName = 'Govind') { // we can define the default in the parameter 
  this.firstName =firstName,
  this.yob =yob,
  this.lastName = lastName
}
var raj =new Person6('raj', 1994) */


////////////////////////////////////////   MAPS   //////////////////////////////////////

/* const question = new Map();
question.set('question', 'Who is your fav hero in DOTA2 ?')
question.set(1,'Pudge')
question.set(2,'CM')
question.set('correct',1)
question.set(true,'correct ans')
question.set(false,'wrong ans')

console.log(question.get('question'))
//console.log(question.size)

question.delete('key')//to delete

//console.log(question.has(2)) // to check the key
// question.clear() // to clear the map

//question.forEach((value, key) => console.log(key,value))

for(let [key, value] of question.entries()) { // using the destructuring 
  //console.log(key, value)
  if (typeof(key) === 'number') {
    console.log(key, value)
  }
}

const ans = parseInt(prompt('give an answer'))

console.log(question.get(ans === question.get('correct'))) */

//////////////////////////////////////////// CLASSES ////////////////////////
// ES5 
/* var Person5 = function(firstName, yob) {
  this.firstName =firstName,
  this.yob = yob
}
Person5.prototype.calcAge = function () {
  var age = new Date().getFullYear() - this.yob
  console.log(age)
}

//var raj5 = new Person5('raj',1994)
//raj5.calcAge()

var Athlete = function(name, yob, medals) {
  Person5.call(this, name, yob)
  this.medals = medals
}

Athlete.prototype = Object.create(Person5.prototype)

Athlete.prototype.addMedal = function () {
  this.medals++
  console.log(this.medals)
}

var kuma = new Athlete('kumar', 1993, 3)
kuma.calcAge()
kuma.addMedal() */

//ES6

/* class Person6 { // 1) are not hoisted -- first implement to later use // 2) only add method to classes not properties
  constructor (firstName , yob) {
    this.firstName =firstName,
    this.yob =yob
  }
  calcAge() {
    var age = new Date().getFullYear() - this.yob
    console.log(age)
  }

  static greeting () {
    console.log('hi')
  }
}
//var raj6 = new Person6('raj',1994)
//raj6.calcAge()
//Person6.greeting()
class Athlete6 extends Person6 {
  constructor (firstName, yob, medals) {
    super(firstName, yob)
    this.medals = medals
  }
  addMedals() {
    this.medals++
    console.log(this.medals)
  }
}
const kuma = new Athlete6('kumar', 1993, 3)
kuma.calcAge()
kuma.addMedals() */