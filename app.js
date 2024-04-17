// Define colors for different Pokémon types
const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

// URL of the PokeAPI
const url = "https://pokeapi.co/api/v2/pokemon/";

// Get references to HTML elements
const card = document.getElementById("pokemon-card");
const btn = document.getElementById("generate-btn");

// Function to fetch Pokémon data from PokeAPI
let getPokeData = () => {
  // Generate a random number between 1 and 150 for Pokémon ID
  let id = Math.floor(Math.random() * 150) + 1;
  // Combine the PokeAPI URL with Pokémon ID to get specific Pokémon data
  const finalUrl = url + id;
  // Fetch data from the generated URL
  fetch(finalUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Once data is fetched, generate a card with the data
      generateCard(data);
    })
    .catch((error) => {
      // Handle errors here
      console.error("There was a problem with the fetch operation:", error);
    });
};

// Function to generate Pokémon card
let generateCard = (data) => {
  // Extract necessary data from the fetched Pokémon data
  const hp = data.stats[0].base_stat;
  const imgSrc = data.sprites.other.dream_world.front_default;
  const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
  const statAttack = data.stats[1].base_stat;
  const statDefense = data.stats[2].base_stat;
  const statSpeed = data.stats[5].base_stat;

  // Determine the theme color of the card based on the Pokémon's type
  const themeColor = typeColor[data.types[0].type.name];

  // Populate the card HTML with the extracted data
  card.innerHTML = `
              <p class="hp">
                <span>HP</span>
                  ${hp}
              </p>
              <img src=${imgSrc} />
              <h2 class="poke-name">${pokeName}</h2>
              <div class="types">
               
              </div>
              <div class="stats">
                <div>
                  <h3>${statAttack}</h3>
                  <p>Attack</p>
                </div>
                <div>
                  <h3>${statDefense}</h3>
                  <p>Defense</p>
                </div>
                <div>
                  <h3>${statSpeed}</h3>
                  <p>Speed</p>
                </div>
              </div>
        `;

  // Add Pokémon types to the card
  appendTypes(data.types);

  // Apply styles to the card based on the theme color
  styleCard(themeColor);
};

// Function to add Pokémon types to the card
let appendTypes = (types) => {
  types.forEach((item) => {
    let span = document.createElement("SPAN");
    span.textContent = item.type.name;
    document.querySelector(".types").appendChild(span);
  });
};

// Function to style the card
let styleCard = (color) => {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
  card.querySelectorAll(".types span").forEach((typeColor) => {
    typeColor.style.backgroundColor = color;
  });
};

// Event listeners to trigger Pokémon card generation
btn.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData);
