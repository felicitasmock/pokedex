let currentPokemon;
let backgroundColor = [];
//let pokeSpecies;
//let evolution;

async function init() {
    loadPokemon();
    let currentPokemon = await loadPokemon();
    renderPokemonInfo(currentPokemon);
    // gets Array from local storage (to get background color)
    backgroundColor = getArray('backgroundColor');
    getbackgroundColor();
    requestSpeciesURL(currentPokemon);
}

/**
 * function to get pokemons from API
 */
async function loadPokemon() {
    //parse URL to get pokemon name
    let urlName = document.location.href;
    let pokemon = urlName.split('=')[1];
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    console.log('loaded pokemon:', currentPokemon);
    return currentPokemon;
}


// function to get all pokemon infos
function renderPokemonInfo(currentPokemon) {
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonImg').src = currentPokemon['sprites']['other']['dream_world']['front_default'];
    document.getElementById('height').innerHTML = currentPokemon['height'];
    document.getElementById('weight').innerHTML = currentPokemon['weight'];

    getBaseStats(currentPokemon);
    baseBar(currentPokemon);
    getMoves(currentPokemon);
}

/**
 * function to get the base stats
 */
function getBaseStats(currentPokemon) {
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
function baseBar(currentPokemon) {
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
 * function to get moves
 */
function getMoves(currentPokemon) {
    let moves = currentPokemon['moves'];
    for (let i = 0; i < moves.length; i++) {
        const move = moves[i];
        if (i < moves.length - 1) {
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

/**
 * function to define background color for the pokemon
 */
function getbackgroundColor() {
    for (let i = 0; i < backgroundColor.length; i++) {

        let pokeName = document.getElementById('pokemonName').innerHTML;
        let n = backgroundColor[i]['name'].includes(`${pokeName}`);
        let color = backgroundColor[i]['color'];

        if (n == true) {
            document.getElementById('pokedex').style.backgroundColor = color;
        }

        if (n == true && color == 'white') {
            document.getElementById('pokedex').style.color = 'gray';
            document.getElementById('back').style.color = 'gray';

        }
    }
}

/**
 * function to request Species JSON for more details
 */
async function requestSpeciesURL(currentPokemon) {
    let speciesURL = currentPokemon['species']['url'];
    //console.log('URL', speciesURL);

    let sResponse = await fetch(speciesURL);
    species = await sResponse.json();
    console.log('species Details', species);

    //pokeSpecies.push(species);
    getEggGroup();
    getGrowthRate();
    getHabitats();

    requestEvolutionChain(currentPokemon);
}

/**
 * function to get Egg Groups from Species JSON
 */
function getEggGroup() {
    let eggGroups = species['egg_groups'];

    for (let i = 0; i < eggGroups.length; i++) {
        const group = eggGroups[i];
        let egg = group['name'];
        document.getElementById('eggGroups').innerHTML += `<li>
                    ${egg} </li>
                `;
    }
}

/**
 * function to get Growth Rate from Species JSON
 */
function getGrowthRate() {
    let growthRate = species['growth_rate']['name'];
    document.getElementById('growthRate').innerHTML = growthRate;
}

/**
 * function to get Habitats from Species JSON
 */
function getHabitats() {
    let habitat = species['habitat']['name'];
    document.getElementById('habitat').innerHTML = habitat;
}

/**
 * function to request Evolution JSON
 */
async function requestEvolutionChain(currentPokemon) {
    let evoURL = species['evolution_chain']['url'];
    //console.log('URL', evoURL);

    let eResponse = await fetch(evoURL);
    evolution = await eResponse.json();
    console.log('Evolution', evolution);

    getTrigger(currentPokemon);
    getSpeciesOneImg(currentPokemon);
}

/**
 * function to get the trigger of evolution and the details
 * 
 * @param {string} currentPokemon - This is the varibale for the current Pokemon
 */
function getTrigger(currentPokemon) {
    let trigger = evolution['chain']['evolves_to'][0]["evolution_details"][0]['trigger']['name'];

    document.getElementById('trigger').innerHTML = trigger;

    document.getElementById('evoImg').src = currentPokemon['sprites']['other']['dream_world']['front_default'];
    document.getElementById('species0').innerHTML = currentPokemon['name'];
}

/**
 * function to get the next pokemon in evolution chain with name and img
 * 
 * @param {string} currentPokemon -  This is the varibale for the current Pokemon
 */
async function getSpeciesOneImg(currentPokemon) {
    //get name for next pokemon in evolution chain
    let species1 = evolution['chain']['evolves_to'][0]['species']['name'];

    let url = `https://pokeapi.co/api/v2/pokemon/${species1}`;
    let response = await fetch(url);
    let newPokemon = await response.json();
    console.log('New pokemon', newPokemon);

    //defines name in species to check wheter its the first in evolution chain or not
    let name1 = species['evolves_from_species'];
    // console.log('name 1', name1);

    checkEnvoles(currentPokemon, newPokemon, name1, species1);

}

/**
 * function to check if the evolution chain needs to be handled different
 * 
 * @param {string} currentPokemon - This is the variable of the current Pokemon
 * @param {string} newPokemon - This is the variable of the next Pokemon in evolution chain
 * @param {*} name1 -  this ist the varibale to check if it is the first pokemon in evolution chain
 * @param {*} species1 - This is the variable of the first pokemon in evolution chain
 */
function checkEnvoles(currentPokemon, newPokemon, name1, species1) {
    let envoles = evolution['chain']['evolves_to'][0]['evolves_to']['length'];
    console.log('envoles', envoles);

    let speciesSpecial = evolution["chain"]["evolves_to"][0]['species']['name'];
    console.log('extrawurst', speciesSpecial);

    if (envoles == 0) {
        console.log('Achtung', envoles);
        
        let speciesOneImgSpecial = newPokemon['sprites']['other']['dream_world']['front_default'];
        document.getElementById('evoImg1').src = speciesOneImgSpecial;
        document.getElementById('species1').innerHTML = speciesSpecial;

        let specialLevel = evolution["chain"]["evolves_to"][0]['evolution_details'][0]["min_level"];
        document.getElementById('level').innerHTML = specialLevel;
    }  if (speciesSpecial == pokemonName.innerHTML && envoles == 0) {
        hideEvolutionChain()

        //zeigt Fehlermeldung z.b. bei rattata, da else trotzdem ausgeführt wird, es species2 aber nicht gibt
    } else {
        //get name for second next pokemon in evolution chain
        let species2 = evolution['chain']['evolves_to'][0]['evolves_to'][0]['species']['name'];
        checkEvolutionChain(currentPokemon, newPokemon, name1, species1, species2);
    }
}

/**
 * function to check the evulition chain of the pokemon
 * 
 * @param {string} currentPokemon - This is the varibale for the current Pokemon
 * @param {string} newPokemon - This is the variable for the next Pokemon in evolution chain
 * @param {string} name1 - this ist the varibale to check if it is the first pokemon in evolution chain
 * @param {string} species1 -  this ist the varibale of the first pokemon in evolution chain
 * @param {string} species2 -  this ist the varibale of the second pokemon in evolution chain
 */
function checkEvolutionChain(currentPokemon, newPokemon, name1, species1, species2) {
    //current pokemon of site
    let pokemonName = currentPokemon['name'];
    console.log('aktueller pokemon', pokemonName);
    console.log('1. pokemon', species1);
    console.log('2. pokemon', species2);


    //if the first pokemon in evolutino chain is null - show next pokemon
    if (name1 == null) {

        let speciesOneImg = newPokemon['sprites']['other']['dream_world']['front_default'];
        document.getElementById('evoImg1').src = speciesOneImg;
        document.getElementById('species1').innerHTML = species1;

        let level = evolution['chain']['evolves_to'][0]["evolution_details"][0]['min_level'];
        document.getElementById('level').innerHTML = level;
    }


    //if the first pokemon in evolutino chain is NOT null - go to next function
    if (name1 !== null) {
        getSpeciesTwoImg(species2, pokemonName);
    }
}

/**
 * function to hide evolution chain if it is the last pokemon in evolution chain
 */
function hideEvolutionChain() {
    document.getElementById('trigger').style.display = "none";
    document.getElementById('species1').style.display = "none";
    document.getElementById('evoImgWrapper').style.display = "none";
}

/**
 * 
 * @param {string} species2 - This ist he varibale for the second pokemon
 * @param {string} pokemonName - This is the variable for the current Pokemon on site
 */
async function getSpeciesTwoImg(species2, pokemonName) {
    //if the second pokemon in evolution chain has same name as the current pokemon on site
    if (species2 == pokemonName) {
        hideEvolutionChain();
    } else {
        //else get name and IMG for next pokemon in evolution chain
        //get name for second next pokemon in evolution chain
        let species2 = evolution['chain']['evolves_to'][0]['evolves_to'][0]['species']['name'];
        let url = `https://pokeapi.co/api/v2/pokemon/${species2}`;
        let response = await fetch(url);
        let nextPokemon = await response.json();
        console.log('New pokemon', nextPokemon);
        console.log('level2', species2);

        let speciesOneImg = nextPokemon['sprites']['other']['dream_world']['front_default'];
        document.getElementById('evoImg1').src = speciesOneImg;
        document.getElementById('species1').innerHTML = species2;

        let level2 = evolution["chain"]['evolves_to'][0]['evolves_to'][0]['evolution_details'][0]['min_level'];
        document.getElementById('level').innerHTML = level2;
    }
}

// sets array in local storage
function setArray(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

function getArray(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
    // gibt mir das was im local storage steht, ODER (||) gibt mir nichts ([])
}
