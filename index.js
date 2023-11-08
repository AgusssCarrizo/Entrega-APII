const pokemon = document.getElementById("pokemon");
const poke = document.getElementById("buscar");
const btn = document.getElementById("btn-add");
const input = document.getElementById("input");
const url = "https://pokeapi.co/api/v2/pokemon";

const getData = async (url, id) => {
   const response = await fetch(`${url}/${id || ""}`);

   const data = await response.json();
   console.log(data);
   return data;
};

const isEmptyInput = () => {
   return input.value.trim() === "";
};

const renderPokeCard = (product) => {
   pokemon.innerHTML = pokemonInfo(product);
};
const showError = (input, msg) => {
   const formField = input.parentElement;
   const error = formField.querySelector("small");
   error.style.display = "block";
   error.textContent = msg;
   const poke = cardField.getElementById("pokemon");
   poke.classList.add("none");
};
const showSuccess = (input) => {
   const formField = input.parentElement;
   const error = formField.querySelector("small");
   error.style.display = "none";
   error.textContent = "";
};
const searchPoke = async (e) => {
   e.preventDefault();
   if (isEmptyInput(input)) {
      showError(input, "Ingresa un ID de Pokémon");
      return;
   }

   const id = input.value;
   if (id > 1018) {
      showError(input, "El ID de Pokémon no puede ser mayor a 1018");

      return false;
   }
   const product = await getData(url, id);
   if (product) {
      renderPokeCard(product);
      showSuccess(input);
      return true;
   }
};
const pokemonInfo = (product) => {
   const {stats, moves, species, sprites} = product;
   const moveList = moves
      .slice(0, 5)
      .map((move) => move.move.name)
      .join(", ");
   const statsList = stats
      .slice(0, 5)
      .map((stats) => stats.base_stat)
      .join(", ");
   return `
   <div class="container">
   <div class="images">
   <div class="imagen">
   <img src="${sprites.front_default}" alt="" />
   <p>Front</p>
   </div>
   <div class="imagen">
   <img src="${sprites.back_default}" alt="" />
   <p>Back</p>
   </div>
   </div>
   <h3>${species.name}</h3>
   <div class="parrafo uno">
   <p><span>Movimientos:</span> ${moveList}</p>
   </div>
   <div class="parrafo dos">
   <p><span>stats:</span> ${statsList}</p>
   </div>
   
    </div>`;
};
console.log(poke);

const init = async () => {
   poke.addEventListener("submit", searchPoke);
};

init();
