function bookRoom() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let room = document.getElementById("room").value;
    let checkin = document.getElementById("checkin").value;
    let checkout = document.getElementById("checkout").value;
    let result = document.getElementById("result");

    if (name === "" || email === "" || room === "" || checkin === "" || checkout === "") {
        alert("Please fill all fields");
        return;
    }

    let inDate = new Date(checkin);
    let outDate = new Date(checkout);

    if (outDate <= inDate) {
        alert("Check-out date must be after check-in date");
        return;
    }

    let days = (outDate - inDate) / (1000 * 60 * 60 * 24);
    let price = 0;

    if (room === "single") price = 2000;
    else if (room === "double") price = 3500;
    else if (room === "deluxe") price = 5000;

    let total = days * price;

    result.style.display = "block";
    result.innerHTML = `
        <h4>Booking Confirmed ✅</h4>
        <p>Name: ${name}</p>
        <p>Room Type: ${room}</p>
        <p>Number of Days: ${days}</p>
        <p><strong>Total Amount: ₹${total}</strong></p>
    `;
}
