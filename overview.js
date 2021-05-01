let pokemons = [];

// function to load pokemon API
async function getPokemons() {
    let url = 'https://pokeapi.co/api/v2/pokemon/';
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
        setArray('pokemons', pokemons);
    }
}

/**
 * function to show all Pokemons from JSON
 */
function showPokemons() {
    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        document.getElementById('contentContainer').innerHTML += `
        <div onclick="openPokemon(${i})" class="poke-box">
            <h2 id="pokeName${i}">${pokemon['name']}</h2>
            <img class="poke-img" id="pokeIMG${i}"></img>
        </div>
        `;
        getIMG(i)
    }


}


/**
 * functin to open detail view of selected Pokemon
 */
function openPokemon(i) {
    var b = document.getElementById(`pokeName${i}`).innerHTML;
    urlName = 'pokeDetail.html?name=' + encodeURIComponent(b);
    document.location.href = urlName;
}


/**
 * function to get the img of each pokemon
 * 
 * @param {number} i - THis is the number of the pokemon to get img
 */
async function getIMG(i) {

    const pokemonURL = pokemons[i]['url'];
    let url = pokemonURL;
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log('pokemon name:', currentPokemon['name']);
    let img = currentPokemon['sprites']['other']['dream_world']['front_default'];
    document.getElementById(`pokeIMG${i}`).src = img;

}


// sets arry in local storage
function setArray(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

function getArray(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
    // gibt mir das was im local storage steht, ODER (||) gibt mir nichts ([])
}
