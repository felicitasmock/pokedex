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
    }
}

/**
 * function to show all Pokemons from JSON
 */
function showPokemons() {
    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        document.getElementById('contentContainer').innerHTML += `
        <div class="poke-box">${pokemon['name']}</div>
        `;
    }

}
