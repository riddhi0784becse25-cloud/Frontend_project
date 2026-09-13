function generateTable() {

    let number = document.getElementById("numberInput").value;
    let resultDiv = document.getElementById("result");

    if (number === "") {
        resultDiv.innerHTML = "Please enter a number!";
        return;
    }

    let output = "";
    let fact=1;
    for (let i = 1; i <= number; i++) {
        fact*=i;
        
        output+=fact+"<br>" ;
        
    }

    resultDiv.innerHTML = output;
}
