// //PROTOTYPE EXPLANATION
// //Using function constructor

// var Person = function(name, age, occupation) {
//   this.name = name;
//   this.age = age;
//   this.occupation = occupation;
// };

// Person.prototype.yearOfBirth = function() {
//   console.log(2020 - this.age);
// };

// Person.prototype.lastName = "Pandey";

// var Jhon = new Person("raj", 26, "SW Prof");

// Jhon.yearOfBirth();
// console.log(Jhon);
// console.log(Jhon);

// Person.prototype = null;

// var lol = new Person("as", 98, "OMG");

// //OBJECT CREATE

// var personProto = {
//   calcAge: function() {
//     console.log(2020 - this.yearOfBirth);
//   }
// };

// var noob = Object.create(personProto);

// noob.name = "john";
// noob.yearOfBirth = 1990;

// var pete = Object.create(personProto, {
//   name: { value: "pete" },
//   yearOfBirth: { value: 1994 }
// });

// var check = Object.create(null);

//There's a difference here, with Object.create you can create an object that doesn't inherit from anything, Object.create(null);, on the other hand, if you set SomeConstructor.prototype = null; the newly created object will inherit from Object.prototype.
https://stackoverflow.com/questions/4166616/understanding-the-difference-between-object-create-and-new-somefunction

//CALLBACK function // Passing function as parameter 


// var years = [1994, 1996, 1998, 2000];

// var res = function(arr, fn) {
//     var array = [];
//     for(i=0; i<arr.length ;i++) {
//         array.push(fn(arr[i]));
//     }
//     return array;
// }

// function addPlusTwoYear (el) {
//     return el+2;
// }

// function age (year) {
//     return 2020 - year;
// }

// var finalres = res(years, addPlusTwoYear);
// var age = res(years, age);
// console.log(finalres, age);

//CALLBACK funtion returns another function

// function interviewQuestion (job) {
//     if (job === 'web') {
//         return function(name) {
//             console.log(name + ' what is UX')
//         }
//     } else if (job === 'teacher'){
//         return function(name) {
//             console.log(name+ ' what class do you teach')
//         }
//     }
// }

// var webQuestion = interviewQuestion('web');
// var teacherQuestion = interviewQuestion('teacher')
// webQuestion('raj');
// teacherQuestion('pandey');
// //left to right evaluation
// interviewQuestion('teacher')('pavi')

//IIFE immediate invoked function kinda private

// function game () {
//     var score = Math.random() *10;
//     console.log(score>=5);
// }
// game();

// (function game () {
//     var score = Math.random() *10;
//     console.log(score>=5);
// })();

// (function game (goodluck) {
//     var score = Math.random() *10;
//     console.log(score>=5-goodluck);
// })(4);

//CLOSURES

// function retirement (retirementAge) {
//     var a = 'years until retirement'
//     return function (yearOfBirth) {
//         var age = 2020 - yearOfBirth;
//         console.log((retirementAge-age) + a);
//     }
// }

// var retUS = retirement(66);
// var retIND =  retirement(60);
// retIND(1956)
// retUS(1994);
// //same one
// retirement(66)(1994);

/* without closure method
function interviewQuestion (job) {
    if (job === 'web') {
        return function(name) {
            console.log(name + ' what is UX')
        }
    } else if (job === 'teacher'){
        return function(name) {
            console.log(name+ ' what class do you teach')
        }
    }
}*/
// // the CLOSURES way

//  function interviewQuestion (job) {
//      return function (name) {
//          if(job === 'web')
//          console.log(name + ' what is UX')
//          else if (job === 'teacher')
//          console.log(name+ ' what class do you teach')
//         else 
//         console.log(name+ ' its not for u')
//         }
//  }

//  interviewQuestion('web')('raj');
//  interviewQuestion('teacher')('pandey');
//  interviewQuestion('lol')('mass');

//  //simple closure example
//  function parent() {
//     var a = 'hello';
   
//     function inner() {
//       console.log(a);
//     }
//     inner();
//   }
   
//   parent();


// Bind, call, apply // https://www.taniarascia.com/this-bind-call-apply-javascript/

// var raj = {
//     name: 'raj',
//     age: 25,
//     greet: function(style, timeOfDay) {
//         if(style === 'chumma') {
//             console.log('dei ennaah da ' + this.name + ' unuku ' + this.age +' ah. Good '+ timeOfDay)
//         }
//         else if(style === 'gethu') {
//             console.log('wassup bruh, im '  + this.name + ' enaku '+ this.age+' aachu. Good '+ timeOfDay)
//         }
//     }
// }

// raj.greet('chumma','morning')

// var pavi = {
//     name : 'pavi',
//     age : 24
// }
// // method borrowing // CALL method
// raj.greet.call(pavi,'gethu', 'evening CALL method')

// // APPLY method
// raj.greet.apply(pavi,['gethu', 'evening APPLY method'])

// // BIND method returns a funtion // corieng techni
// var rajChumma = raj.greet.bind(raj,'chumma');
// rajChumma('morning BIND method')
// rajChumma('evening BIND method')

// var paviGethu = raj.greet.bind(pavi,'gethu');
// paviGethu('night BIND method')


//another example



var years = [1994, 1996, 1998, 2004];

var res = function(arr, fn) {
    var array = [];
    for(i=0; i<arr.length ;i++) {
        array.push(fn(arr[i]));
    }
    return array;
}

function fullAge (limit, el) {
    return el >= limit;
}

function age (year) {
    return 2020 - year;
}

var ages = res(years, age);
var validAges = res(ages, fullAge.bind(this, 20))
console.log(age , indlimit)