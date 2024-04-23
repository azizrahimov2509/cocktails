const cocktailsCenter = document.getElementById("cocktails-center");
const loader = document.querySelector(".loader");
let error = document.querySelector('#error');
const input = document.querySelector('#input')


loader.classList.remove('hidden');
error.classList.add('hidden');

function createDrinks(data) {
    cocktailsCenter.innerHTML = '';
    data.drinks.forEach((item) => {
        const article = document.createElement('article');
        article.classList.add('cocktail');
        article.innerHTML = `<div class="img-container">
        <img src="${item.strDrinkThumb}" alt="${item.strDrink}">
        </div>
        <div class="cocktail-footer"><h3>${item.strDrink}</h3>
        <h4>${item.strGlass}</h4>
        <p>${item.strAlcoholic}</p>
        <a class="btn btn-primary btn-details" href="about.html?id=${item.idDrink}">details</a>
        </div>`;
        cocktailsCenter.appendChild(article);
    });
}

function getDrink(dataType){
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/${dataType}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then((data) => {
            loader.classList.add('hidden');
            error.classList.add('hidden');
            createDrinks(data)
        })
        .catch((error) => {
            loader.classList.add('hidden');
            error.classList.add('hidden');
        });
}

getDrink("search.php?s=");



input.addEventListener('input', (e) => {
    cocktailsCenter.innerHTML = '';
    loader.classList.remove('hidden');
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${e.target.value}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            loader.classList.add('hidden');
            error.classList.add('hidden');
            if (data.drinks && data.drinks.length > 0) {
                createDrinks(data);
            } else {
                error.classList.remove('hidden');
                error.innerHTML = `<h2 style="display: flex; justify-content: center;color: red;" >Malumot topilmadi!</h2>`;
            }
        })
        .catch((err) => {
            loader.classList.add('hidden');
            error.classList.remove('hidden');
        });
});
