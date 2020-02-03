(function() {
  //Function Declaration
  function Question (question, options, ans) {
    this.question = question;
    this.options = options;
    this.ans = ans;
  };

//   A function declaration creates a function that you can call later in your code, the interpreter always looks for variables and function declarations before going through each section of a script, line-by -line.

// This means that a function created with a function declaration can be called before it has even been declared (i.e. it is “hoisted”).

// In a function expression, the function is not processed until the interpreter gets to that statement. This means you cannot call this function before the interpreter has discovered it.

// https://www.youtube.com/watch?v=gjLn95skIKE

  Question.prototype.evaluation = function(usrAns, callback) {
    var sc;
    if (this.ans === usrAns) {
      console.log("correct");
      sc = callback(true);
      this.displayScore(sc);
    } else {
      console.log("try again");
      sc = callback(false);
      this.displayScore(sc);
    }
  };
    // //Function expression 
    // var Question = function(question, options, ans) {
    //     this.question = question;
    //     this.options = options;
    //     this.ans = ans;
    //   };

  Question.prototype.displayQuestion = function() {
    console.log(this.question);
    this.options.forEach(element => {
      console.log(element);
    });
  };

  Question.prototype.displayScore = function(score) {
    console.log("your score is :" + score);
    console.log("-----********------");
  };
  //Expression wont work because u have to call the keepScore function each time
  // var keepScore = function() {
  //     var score = 0;
  //     return function(correct) {
  //         if(correct)
  //         {
  //          score++
  //         }
  //         return score
  //     }
  // }

  function score() {
    var score = 0;
    return function(correct) {
      if (correct) {
        score++;
      }
      return score;
    };
  }
  //This works because it stores the return function in holdScore and its score() called each time
  var holdScore = score();

  var ques1 = new Question(
    "Who is the best hero in DOTA 2",
    ["Pudge", "Invoker", "Axe", "CM"],
    "Pudge"
  );
  var ques2 = new Question(
    "Who plays mid among these heros",
    ["Pudge", "Invoker", "Axe", "CM"],
    "Invoker"
  );
  var ques3 = new Question(
    "Who is the Support hero here ",
    ["Pudge", "Invoker", "Axe", "CM"],
    "CM"
  );

  var questions = [ques1, ques2, ques3];
  start();
  function start() {
    var displayQuestion = Math.floor(Math.random() * questions.length);
    questions[displayQuestion].displayQuestion();
    var ans = prompt("Please enter your answer, Choose wisely...");

    if (ans !== "quit") {
      questions[displayQuestion].evaluation(ans, holdScore);
      start();
    }
  }
  //Next level
})();
