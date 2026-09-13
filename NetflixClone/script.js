// Simple hover effect logging (for learning JS basics)
const movies = document.querySelectorAll(".row img");

movies.forEach(movie => {
    movie.addEventListener("click", () => {
        alert("Movie clicked!");
    });
});
