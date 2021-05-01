let currentPokemon;
let pokemons = [];

/**
 * function to get pokemons of JSON out of local storage
 */
/*
function getPokemons() {
    pokemons = getArray('pokemons');
}

// function to load pokemon API
async function loadPokemon() {
    getPokemons();
    for (let i = 0; i < pokemons.length; i++) {
        const pokemonURL = pokemons[i]['url'];
        let url = pokemonURL;
        let response = await fetch(url);
        currentPokemon = await response.json();
    }
    console.log('loaded pokemon:', currentPokemon);
    console.log('pokemon name:', currentPokemon['name']);
    renderPokemonInfo();

}
*/


async function loadPokemon(){
    //parse URL to get pokemon name
    let urlName = document.location.href;

    let pokemon = urlName.split('=')[1];
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log('loaded pokemon:', currentPokemon);
    renderPokemonInfo();
}


// function to get all pokemon infos
function renderPokemonInfo() {

    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonImg').src = currentPokemon['sprites']['other']['dream_world']['front_default'];
    document.getElementById('height').innerHTML = currentPokemon['height'];
    document.getElementById('weight').innerHTML = currentPokemon['weight'];

    getBaseStats();
    baseBar();
    getMoves();

}



/**
 * function to get the base stats
 */
function getBaseStats() {
    let stats = currentPokemon['stats']
    for (let i = 0; i < stats.length; i++) {
        const element = stats[i];
        let nameContainer = document.getElementById('base');
        nameContainer.innerHTML += `
            <tr>
                <td><b>${element['stat']['name']}</td>
                <td class="base-number">${element['base_stat']}</td>
                <td><div id="line" class="line"></div></td>
                <td id="baseLine${i}" class="base-line"><div id="line${i}"></div></td>
            </tr>
        `;
    }
}

/**
 * function to show colored bar of base stats
 */
function baseBar() {
    let stats = currentPokemon['stats']
    for (let i = 0; i < stats.length; i++) {
        const stat = stats[i];

        let percent = stat['base_stat'];
        if (percent < 50) {
            document.getElementById(`line${i}`).style.backgroundColor = 'red';
        } else {
            document.getElementById(`line${i}`).style.backgroundColor = 'green';
        }
        document.getElementById(`line${i}`).style.width = `${percent}%`;
        document.getElementById(`line${i}`).style.height = '10px';
    }
}
/**
 * functino to get moves
 */
function getMoves() {
    let moves = currentPokemon['moves'];
    for (let i = 0; i < 20; i++) {
        const move = moves[i];
        if (i < 19) {
            document.getElementById('moves').innerHTML += `<div class="moves">${move['move']['name']},</div>`;
        } else {
            document.getElementById('moves').innerHTML += `<div class="moves">${move['move']['name']}.</div>`;
        }
    }
}

//function to show active nav bar and open tab
function navBar(selection) {
    //defines selected nav item
    let selectedNavNumber = selection.slice(-1);
    // console.log('nav:', selectedNavNumber);

    // removes active class from all tabs and hides all tab content
    document.getElementById('inner-1').classList.add('hide');
    document.getElementById('1').classList.remove('active');
    document.getElementById('inner-2').classList.add('hide');
    document.getElementById('2').classList.remove('active');
    document.getElementById('inner-3').classList.add('hide');
    document.getElementById('3').classList.remove('active');
    document.getElementById('inner-3').classList.add('hide');
    document.getElementById('3').classList.remove('active');
    document.getElementById('inner-4').classList.add('hide');
    document.getElementById('4').classList.remove('active');

    // shows active nav tab and tab content
    document.getElementById('inner-' + selectedNavNumber).classList.remove('hide');
    document.getElementById(selectedNavNumber).classList.add('active');
}

// sets arry in local storage
function setArray(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

function getArray(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
    // gibt mir das was im local storage steht, ODER (||) gibt mir nichts ([])
}
