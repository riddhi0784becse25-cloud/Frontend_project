function generateTable() {

    let number = document.getElementById("numberInput").value;
    let resultDiv = document.getElementById("result");

    if (number === "") {
        resultDiv.innerHTML = "Please enter a number!";
        return;
    }

    let output = "";

    for (let i = 1; i <= 10; i++) {
        output += number + " × " + i + " = " + (number * i) + "<br>";
    }

    resultDiv.innerHTML = output;
}
