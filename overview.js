let pokemons = [];

// function to load pokemon API
async function getPokemons() {
    let url = 'https://pokeapi.co/api/v2/pokemon/?limit=60';
    let response = await fetch(url);
    allPokemons = await response.json();
    let all = allPokemons['results'];

    console.log('loaded pokemon:', all);
    pushPokemons(all);
    showPokemons();
}


/**
 * function to push all pokemons from API into JSON
 * 
 * @param {string} all - All Pokemons get pushed in JSON
 */
function pushPokemons(all) {
    for (let i = 0; i < all.length; i++) {
        let pokemon = all[i];
        pokemons.push(pokemon);
    }
}

/**
 * function to show all Pokemons from JSON
 */
function showPokemons() {
    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        document.getElementById('contentContainer').innerHTML += `
        <div onclick="openPokemon(${i})" id="pokeBox${i}" class="poke-box">
                <h2 id="pokeName${i}"whats>${pokemon['name']}</h2>
                <div class="img-bg"></div>
                <img class="poke-img" id="pokeIMG${i}"></img>
        </div>
        `;
        getIMGcolor(i);

    }
}


/**
 * function to open detail view of selected Pokemon
 */
function openPokemon(i) {
    var b = document.getElementById(`pokeName${i}`).innerHTML;
    urlName = 'pokeDetail.html?name=' + encodeURIComponent(b);
    document.location.href = urlName;
}


/**
 * function to get the img of each pokemon
 * 
 * @param {number} i - This is the number of the pokemon to get img
 */
async function getIMGcolor(i) {

    const pokemonURL = pokemons[i]['url'];
    let url = pokemonURL;
    let response = await fetch(url);
    currentPokemon = await response.json();

    // console.log('pokemon name:', currentPokemon['name']);
    let img = currentPokemon['sprites']['other']['dream_world']['front_default'];
    document.getElementById(`pokeIMG${i}`).src = img;
    getPokeColor(i);
}

/**
 * function to get the background color of each pokemon
 * 
 * @param {number} i This gets the URL for species to get the background color of each pokemon
 */
async function getPokeColor(i) {
    let speciesURL = currentPokemon['species']['url'];
    //console.log('species URL', speciesURL);

    let sResponse = await fetch(speciesURL);
    species = await sResponse.json();
    //console.log('species', species);

    let color = species['color']['name'];
    //console.log('color', color);


    if (color == 'green') {
        color = '#49D0B1';
    }
    if (color == 'red') {
        color = '#FB6C6C';
    }
    if (color == 'blue') {
        color = '#76BDFE';
    }
    if (color == 'yellow') {
        color = '#FFD86F';
    }
    if (color == 'brown') {
        color = '#B2746C';
    }
    if (color == 'purple') {
        color = '#7C528D';
    }
    if (color == 'white') {
        color = 'white';
        document.getElementById(`pokeBox${i}`).style.color = 'gray';
    }

    document.getElementById(`pokeBox${i}`).style.backgroundColor = color;


    //pushes color into Pokemon JSON
    pokemons[i].color = color;
    //saves pokemon Array in local storage
    setArray('backgroundColor', pokemons);
}

// sets arry in local storage
function setArray(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

function getArray(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
    // gibt mir das was im local storage steht, ODER (||) gibt mir nichts ([])
}

