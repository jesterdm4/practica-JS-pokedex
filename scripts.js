const pokeCard = document.querySelector('[name="data-poke-card"]');
const pokeName = document.querySelector('[name="data-poke-name"]');
const pokeImgContainer = document.querySelector('[name="data-poke-img-container"]');
const pokeImg = document.querySelector('[name="data-poke-img"]');
const pokeId = document.querySelector('[name="data-poke-id"]');
const pokeTypes = document.querySelector('[name="data-poke-types"]');
const pokeStats = document.querySelector('[name="data-poke-stats"]');

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F'
};

const serchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const { stats, types } = data;
    
    console.log(data)

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;

    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = '5px 5px';
    pokeImg.style.borderRadius = '50%';
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div"); //no entiendo porque este div y el siguiente quedan dentro del primero
        const statElementAmount = document.createElement("div");//este es el div siguiente
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    }); 
}

const renderNotFound = () => {
    pokeName.textContent = 'Error';
    pokeImg.setAttribute('src', './MissingNo.png');
    pokeImg.style.background = '#fff';
    pokeImg.style.borderRadius = '0%';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.innerHTML = '';
}