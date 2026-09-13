function generateTable() {

    let number = document.getElementById("numberInput").value;
    let resultDiv = document.getElementById("result");

    if (number === "") {
        resultDiv.innerHTML = "Please enter a number!";
        return;
    }

    number = Number(number);   // convert string to number

    let output = "";
    let a = 0;
    let b = 1;

    if (number >= 1) output += a + "<br>";
    if (number >= 2) output += b + "<br>";

    for (let i = 2; i < number; i++) {
        let next = a + b;
        output += next + "<br>";
        a = b;
        b = next;
    }

    resultDiv.innerHTML = output;
}
