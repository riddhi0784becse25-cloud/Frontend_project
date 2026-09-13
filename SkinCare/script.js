function checkAnswers(){

    var score = 0;

    var q1 = document.querySelector('input[name="q1"]:checked');
    var q2 = document.querySelector('input[name="q2"]:checked');
    var q3 = document.querySelector('input[name="q3"]:checked');
    var q4 = document.querySelector('input[name="q4"]:checked');
    var q5 = document.querySelector('input[name="q5"]:checked');

    if(!q1 || !q2 || !q3 || !q4 || !q5){
        alert("Please answer all questions!");
        return;
    }

    if(q1.value == "b") score++;
    if(q2.value == "b") score++;
    if(q3.value == "a") score++;
    if(q4.value == "a") score++;
    if(q5.value == "b") score++;

    document.getElementById("scoreResult").innerHTML =
    "Your Score: " + score + " / 5";

    if(score >= 3){

        setTimeout(function(){

            document.getElementById("quizPage").style.display = "none";
            document.getElementById("spinPage").style.display = "block";

        },1500);

    }
    else{
        document.getElementById("scoreResult").innerHTML +=
        "<br>❌ Score at least 3 to unlock the Spin Wheel!";
    }

}


function spinWheel(){

    var wheel = document.getElementById("wheel");

    var discounts = ["5% OFF", "10% OFF", "15% OFF", "20% OFF", "25% OFF"];

    var randomNumber = Math.floor(Math.random() * discounts.length);

    wheel.style.transform = "rotate(720deg)";

    setTimeout(function(){

        wheel.innerHTML = discounts[randomNumber];

        document.getElementById("discountResult").innerHTML =
        "🎉 Congratulations! You won " + discounts[randomNumber];

    },2000);

}

