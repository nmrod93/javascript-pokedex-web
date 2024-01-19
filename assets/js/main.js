const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="handleOpenModal(${JSON.stringify(pokemon).split('"').join("&quot;")})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function handleOpenModal(pokemon) {
    // console.log(pokemon)
    var modal = document.getElementById('modal')
    var modalContent = document.querySelector('.modal-content')

    var modalHTML = `
            <div class="modal-content">
                <div>
                    <span class="close" onclick="handleCloseModal()">&times;</span>
                </div>
                <h1>TESTE</h1>
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        `

    modalContent.innerHTML = modalHTML
    modal.style.display = 'block'   
}

function handleCloseModal() {
    var modal = document.getElementById('modal')
    modal.style.display = 'none'
}

