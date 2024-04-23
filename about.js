
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');
const titleSection = document.querySelector(".section-title");
const loader = document.querySelector('.loader');

loader.classList.remove('hidden');

fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${myParam}`).then((res)=>res.json())
.then((data)=>{
    loader.classList.add('hidden');
    getDrinks(data.drinks[0])
});

function getDrinks(item){
    titleSection.innerHTML = '';
        const div = document.createElement('div');
        div.classList.add('titles');
        div.innerHTML = `
        <h2 class="section-text" style="margin-bottom: 56px; margin-top: 16px">${item.strDrink}</h2>
                <div class="drink">
                    <img
                        src=${item.strDrinkThumb}
                        alt="${item.strDrink}"
                    />
                    <div class="drink-info">
                        <p><span class="drink-data">name :</span> ${item.strDrink}</p>
                        <p>
                            <span class="drink-data">category :</span> ${item.strCategory}
                        </p>
                        <p><span class="drink-data">info :</span> ${item.strAlcoholic}</p>
                        <p>
                            <span class="drink-data">glass :</span> ${item.strGlass}
                            glass
                        </p>
                        <p>
                            <span class="drink-data">instructons :</span> ${item.strInstructions}
                        </p>
                        <p>
                            <span class="drink-data">ingredients :</span
                            ><span>${item.strIngredient1}</span><span> ${item.strIngredient2}</span
                            ><span> ${item.strIngredient3}</span><span> ${item.strIngredient4}</span>
                        </p>
                    </div>
                </div>
        `

        titleSection.appendChild(div);
      

}


