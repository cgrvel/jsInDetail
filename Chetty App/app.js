//Module concept as like simple pojos of java

/* First, take a look at this sample module

var module = (function() {
 
  // Private variables and functions
  var privateVar = 'Private!';
 
  // Public methods
  return {
    getPrivateVar: function() {
      return privateVar;
    }
  }
 
})();
How does it work? The IIFE is invoked immediately, and the code inside of it is executed. So, all variables and function declarations are being declared.
Then, it returns an object that will be assigned to the variable (var module). This object contains all public methods that are accessible through the module variable now.
All variables and functions declared inside the IIFE are private. We cannot access them in any way outside of the  IIFE. However, methods returned in an object are public, and they have access to private variables and functions due to a closure (an inner function has always access to variables/parameters/functions of the outer function, even if this outer function has already returned).
That's why we can write module.getPrivateVar() to call a public method, and access a private variable. */

var budgerController = (function() {
   //Example
   /*
    var x = 25; // private variable 
    //private function
    var add = function (a) {
        return x+a
    }
    object contains functions accessible outside
    return {
        publicTest : function(b) {
            return add(b)
        }
    }
    */

   var Expense = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
      this.percentage = -1;
   };

   Expense.prototype.calcPercentage = function(totalIncome) {
      if (totalIncome > 0) {
         this.percentage = Math.round((this.value / totalIncome) * 100);
      } else {
         this.percentage = -1;
      }
   };

   Expense.prototype.getPercentage = function() {
      return this.percentage;
   };

   var Income = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
   };

   var data = {
      allItems: {
         exp: [],
         inc: []
      },
      totals: {
         exp: 0,
         inc: 0
      },
      budget: 0,
      percentage: -1
   };

   var calculateTotal = function(type) {
      var total = 0;
      data.allItems[type].forEach(function(cur) {
         total += cur.value;
      });
      data.totals[type] = total;
   };

   return {
      addItem: function(type, des, val) {
         var newItem, id;
         /* data.allitems[type] basicillay could be
            data.allitems['inc']
            OR
            data.allitems['exp'] */
         if (data.allItems[type].length <= 0) {
            id = 0;
         } else {
            id = data.allItems[type][data.allItems[type].length - 1].id + 1;
         }
         if (type === 'inc') newItem = new Income(id, des, val);
         else newItem = new Expense(id, des, val);

         data.allItems[type].push(newItem);
         return newItem;
      },
      deleteItem: function(type, id) {
         var ids, index;
         ids = data.allItems[type].map(function(current) {
            return current.id;
         });
         index = ids.indexOf(id);
         if (index !== -1) {
            data.allItems[type].splice(index, 1);
         }
      },
      calculateBudget: function() {
         // calculate income and exp
         calculateTotal('exp');
         calculateTotal('inc');
         // calculate the budget inc-exp
         data.budget = data.totals.inc - data.totals.exp;
         // calculate the % of income, spent
         if (data.totals.inc > 0) {
            data.percentage = Math.round(
               (data.totals.exp / data.totals.inc) * 100
            );
         } else {
            data.percentage = -1;
         }
      },
      calcualtePercentages: function() {
         data.allItems.exp.forEach(function(current) {
            current.calcPercentage(data.totals.inc);
         });
      },
      getPercentages: function() {
         var allPerc = data.allItems.exp.map(function(current) {
            return current.getPercentage();
         });
         return allPerc;
      },
      getBudget: function() {
         return {
            budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percentage: data.percentage
         };
      },
      test: function() {
         console.log(data);
      }
   };
})();

var UIController = (function() {
   var DomStrings = {
      inputType: '.add__type',
      inputDescription: '.add__description',
      inputValue: '.add__value',
      inputButton: '.add__btn',
      incomeContainer: '.income__list',
      expenseContainer: '.expenses__list',
      budgetLabel: '.budget__value',
      incomeLabel: '.budget__income--value',
      expenseLabel: '.budget__expenses--value',
      percentageLabel: '.budget__expenses--percentage',
      container: '.container',
      expencePercentageLabel: '.item__percentage',
      dateLabel: '.budget__title--month'
   };

   var formatNumber = function(num, type) {
      num = Math.abs(num); // -5 or 5 returns 5
      num = num.toFixed(2); // no of decimal point
      numSplit = num.split('.');
      int = numSplit[0];
      if (int.length > 3) {
         int =
            int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
            // beyond 99999 use below 
            /* console.log(num.toLocaleString('en', {
               useGrouping: true
           }))  */
      }
      decimal = numSplit[1];

      return (type === 'exp' ? '- ' : (sign = '+ ')) + int + '.' + decimal;
   };

   var nodeListforEach = function(list, callBackFunction) {
      for (var i = 0; i < list.length; i++) {
         callBackFunction(list[i], i);
      }
   }

   return {
      getInput: function() {
         return {
            type: document.querySelector(DomStrings.inputType).value,
            des: document.querySelector(DomStrings.inputDescription).value,
            value: parseFloat(
               document.querySelector(DomStrings.inputValue).value
            )
         };
      },
      addListItem: function(obj, type) {
         var html, newHtml, element;

         //create HTML string with placeholders

         if (type === 'inc') {
            element = DomStrings.incomeContainer;
            html =
               '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
         } else if (type === 'exp') {
            element = DomStrings.expenseContainer;
            html =
               '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
         }

         //replace the placeholder with real data

         newHtml = html.replace('%id%', obj.id);
         newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
         newHtml = newHtml.replace('%description%', obj.description);

         //insert html to the dom using insertAdjacentHTML method

         document
            .querySelector(element)
            .insertAdjacentHTML('beforeend', newHtml);
      },

      deleteListItem: function(selectorId) {
         // var element =  document.getElementById(selectorId);
         // element.parentNode.removeChild(element);
         document.getElementById(selectorId).remove(); // not supported in IE
      },

      clearFields: function() {
         var fields, fieldsArr;

         fields = document.querySelectorAll(
            DomStrings.inputDescription + ',' + DomStrings.inputValue
         );

         fieldsArr = Array.prototype.slice.call(fields); // method borrowing from Array - slice method
         fieldsArr.forEach(function(element, index, array) {
            element.value = '';
         });
         fieldsArr[0].focus();
         // fields.forEach(function (element, index, array){
         //     element.value = '';
         // })
         // fields.forEach(element => {
         //     element.value = '';
         // })
      },
      displayBudget: function(obj) {
         var type;
         obj.budget > 0 ? (type = 'inc') : (type = 'exp');
         document.querySelector(
            DomStrings.budgetLabel
         ).textContent = formatNumber(obj.budget, type);
         document.querySelector(
            DomStrings.incomeLabel
         ).textContent = formatNumber(obj.totalInc, 'inc');
         document.querySelector(
            DomStrings.expenseLabel
         ).textContent = formatNumber(obj.totalExp, 'exp');
         if (obj.percentage > 0) {
            document.querySelector(DomStrings.percentageLabel).textContent =
               obj.percentage + '%';
         } else {
            document.querySelector(DomStrings.percentageLabel).textContent =
               '---';
         }
      },
      
      // ------------------------ PERFECT EXAMPLE OF a CALLBACK FUNCTION ------------------------ the declarative paradigm.
      /*       This is all about imperative vs. declarative programming. In the imperative paradigm, you tell the computer how to solve the problem, which tools to use to solve it. In this case, you tell the computer to use the for loop to iterate through the NodeList.
The declarative approach is a bit different. You use functions, like nodeListForEach, to solve the problem. You don't need to tell the computer to use the for loop. You now have a function to iterate through the NodeList.
Of course, this function needs to be first written in the imperative approach.
Benefits of declarative paradigm
The declarative paradigm adds another layer of abstraction. You don't need to know the internal logic of the nodeListForEach(). You don't care if it uses the for, for of, or any other loop. You just know that it iterates through the NodeList, and executes a callback function on each element.
Note: In this case, we know how exactly the nodeListForEach() function works because we're the ones that have implemented it but imagine if you would expose this function to other programmers as a library. They could use it in their code without even knowing how it's written.
One of the advantages is that you can reuse this function, which makes your code cleaner, and more descriptive (beacuse you have the name of the function instead of enigmatic for loops).

QUESTION:  the nodelistforeach () calls the callbak function with two arguments here, but we are calling with either 1 or 2 arg as per our requirements, pls explain the logic behind this.

EXPLANATION:  It depends on what we will use in our callback function, for example, if we only use the current element, we don't need to specify the parameter for the index.
The nodeListForEach() function always passes two arguments to the callback function - the current element and its index. The rest depends on your callback function. If you don't need these arguments, then don't write any parameters for the callback function. If you want the current element, write the first parameter, so it can be assigned to it.*/

      displayPercentages: function(percentages) {
         var fields = document.querySelectorAll(
            DomStrings.expencePercentageLabel
         );
         nodeListforEach(fields, function(current, index) {
            if (percentages[index] > 0) {
               current.textContent = percentages[index] + '%';
            } else {
               current.textContent = '--';
            }
         });
      },
      displayMonth : function() {
         var year, now, month, monthNames
         monthNames = ["January", "February", "March", "April", "May", "June",
         "July", "August", "September", "October", "November", "December"
       ];
         now = new Date();
         year = now.getFullYear()
         month =  now.getMonth()
         document.querySelector(DomStrings.dateLabel).textContent = monthNames[month] +' '+ year
      },
      changedType: function() {
         var fields = document.querySelectorAll(
            DomStrings.inputType + ','+
            DomStrings.inputDescription + ','+
            DomStrings.inputValue
         )
         nodeListforEach(fields, function(current) {
            current.classList.toggle('red-focus')
         }) 
         document.querySelector(DomStrings.inputButton).classList.toggle('red')
      },
      getDomStrings: function() {
         return DomStrings;
      }
   };
})();

var controller = (function(budgetCtrl, UICtrl) {
   //Example
   /*
    var z = budgetCtrl.publicTest(5)
    return {
        anotherPublic : function() {
            console.log(z)
        }
    }
    */
   var setEventListeners = function() {
      var DOM = UICtrl.getDomStrings();

      document
         .querySelector(DOM.inputButton)
         .addEventListener('click', ctrlAddItem);
      document.addEventListener('keypress', function(event) {
         if (event.keyCode == 13 || event.which == 13) {
            /*             The reason for this is that when a button has been clicked, it has focus in the browser. This means that the button is the selected element. Then, if the enter key is pressed, this triggers the default action on the button, which is a click event. This default action is controlled by the browser.
To prevent the click event being triggered in this case, we need to invoke the event.preventDefault() method to prevent the default action from occurring. To do this, we simply add the method to our keypress event listener function as follows:

document.addEventListener('keypress', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
        event.preventDefault(); // prevents the enter key from also triggering a click event
        ctrlAddItem();
    }
});
In our budget app, omitting the preventDefault() method doesn't have any negative effects, because we have data validation elsewhere in our code to ensure that nothing is added to the data structure unless there is valid input.

However, on other sites there may be negative impacts which can only be prevented by using the preventDefault() method. To be completely sure of no flow-on effects, we should also call the event.stopPropagation() method immediately after preventDefault() to stop the unwanted event from bubbling up in the DOM tree.*/
            event.preventDefault();
            ctrlAddItem();
         }
      }),
         // Event Deligation -- Event bubbling
      document
            .querySelector(DOM.container)
            .addEventListener('click', ctrlDeleteItem);
      document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType)
   };


   var updateBudget = function() {
      //calculate budget
      budgetCtrl.calculateBudget();
      //return the budget
      var budget = budgetCtrl.getBudget();
      //update in UI
      UICtrl.displayBudget(budget);
   };

   var updatePercentages = function() {
      // calcualte percentage
      budgetCtrl.calcualtePercentages();
      // return the percentage
      var percentages = budgetCtrl.getPercentages();
      // update in UI
      UICtrl.displayPercentages(percentages);
   };

   var ctrlAddItem = function() {
      var input, newItem;
      input = UICtrl.getInput();
      //When + is used, js will try to merge string 'input' with input (object)covnerted to string (which produces [object Object]).
      //console.log("asdf" + input)
      if (input.des !== '' && !isNaN(input.value) && input.value >= 0) {
         newItem = budgetCtrl.addItem(input.type, input.des, input.value);
         UICtrl.addListItem(newItem, input.type);
         UICtrl.clearFields();
         updateBudget();
         updatePercentages();
      }
   };

   var ctrlDeleteItem = function(event) {
      var itemId, id, type;
      // DOM traversing to parent

      itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
      if (itemId) {
         type = itemId.split('-')[0];
         id = parseInt(itemId.split('-')[1]);

         // delete id form data structure
         budgetCtrl.deleteItem(type, id);
         // delete form UI
         UICtrl.deleteListItem(itemId);
         // update the budget
         updateBudget();
         updatePercentages();
      }
   };

   return {
      init: function() {
         setEventListeners();
         UIController.displayBudget({
            budget: 0,
            totalInc: 0,
            totalExp: 0,
            percentage: -1
         });
         UICtrl.displayMonth()
      }
   };
})(budgerController, UIController).init();
