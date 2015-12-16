  $(document).ready(function() {
      var qNum = '';

      $.get('questions.xml', function(xml) {
          var $questions = $(xml).find("question");
          qNum = $questions.length;
          var question = new Object();
          var count = 1;
          var correct = 0;
          var wrong = 0;
          var mytime;
          var tt;
          var start = new Date().getTime();


          var arr = [];
          while (arr.length < qNum) {
              var randomnumber = Math.ceil(Math.random() * qNum);
              var found = false;
              for (var i = 0; i < arr.length; i++) {
                  if (arr[i] == randomnumber) {
                      found = true;
                      break;
                  }
              }
              if (!found) arr[arr.length] = randomnumber;
          }


          var list = '';

          function nextQuestion(i, dest) {

              var newElement = document.createElement('div');
              question.text = $questions.eq(arr[i] - 1).find("text").text();
              question.answer = [];
              question.st = [];
              var $answers = $questions.eq(arr[i] - 1).find("answer");
              var x = 0;
              $answers.each(function() {
                  question.answer[x] = $(this).text();
                  question.st[x] = $(this).attr("status");
                  if (question.st[x] === "right") {
                      question.correct = x;
                  }
                  x++;
              });




              list = '<div class="row" id="qBox"><p class="col-sm-12">Question ' + i + ': ' + question.text + 
                        '</p><form class="form" id="question' + i + '" action=""><table>';
              for (var z = 0; z < question.answer.length; z++) {

                  list = list + '<tr><td class="cratio col-sm-1" id="answer' + z + 
                                '"><input type="radio" class="canswer" name="answer" value="' + z + '" id="radio' + i + 
                                z + '"></td><td class="col-sm-11"><label   for="radio' + i + z + '">' + question.answer[z] + '</label></td>';
              }
              list = list + '</form></div>';
              newElement.innerHTML = list;

              document.getElementById("main-mid").appendChild(newElement);

          }
          nextQuestion(count, "main-mid");
          ferfreshButton();


function display_ct() {

    var now = new Date().getTime();
    var time = now - start;
    var average = Math.floor((time /count)/1000 );
   
    document.getElementById('time').innerHTML = average;
 
}

          function updateCorrect() {
              correct++;
              document.getElementById("acorrect").innerHTML = correct;
              updateRate();
          }

          function updateWrong() {
              wrong++;
              document.getElementById("awrong").innerHTML = wrong;
              updateRate();
          }

          function updateRate() {
              var rate = Math.round((correct / count) * 100);
              document.getElementById("srate").innerHTML = rate + "%";
          }

          function ferfreshButton() {
              $("#qbtn").click(function() {
                  var current = "#question" + count;
                  var answer = $(current).serialize();
                  if (answer.length === 0) {
                      alert("Select your answer.");
                  }
                  else {
                      var next = "q" + count;
                      var matches = answer.match(/answer=(\d+)/);
                      var answNum = Number(matches[1]);
                      var currentAnsw = "#question" + count + " #answer" + answNum;
                      if (answNum === question.correct) {
                          $(currentAnsw).addClass(question.st[answNum]);
                          updateCorrect();
                      }
                      else {
                          updateWrong();
                          $(currentAnsw).addClass(question.st[answNum]);
                          var rightAnsw = "#question" + count + " #answer" + question.correct;
                          $(rightAnsw).addClass("right");
                      }
                      $(currentAnsw).addClass(question.st[answNum]);
                      $("html, body").animate({
                          scrollTop: $(document).height()
                      }, "slow");
                      display_ct()
                      count = count + 1;
                      nextQuestion(count, next);
                     
                  }
              });
          }
      });
  });