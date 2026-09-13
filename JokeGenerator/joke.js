const url = "https://v2.jokeapi.dev/joke/Any";

const setup = document.querySelector(".setup");
const punchline = document.querySelector(".punchline");
const btn = document.querySelector(".btn");

btn.addEventListener("click", getJoke);

async function getJoke() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.type === "single") {
            setup.textContent = data.joke;
            punchline.textContent = "";
        } else {
            setup.textContent = data.setup;
            punchline.textContent = data.delivery;
        }
    } catch (error) {
        setup.textContent = "Something went wrong!";
        punchline.textContent = "";
        console.log(error);
    }
}
