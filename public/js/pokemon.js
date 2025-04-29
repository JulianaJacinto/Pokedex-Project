// === CONFIGURAÇÕES ===
const MAX_POKEMON = 151; // Número máximo de pokémons a serem carregados inicialmente

// === ELEMENTOS ===
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-found-message");

let allPokemons = [];
let teams = [];
let teamIdCounter = 1;

// === FETCH INICIAL DOS POKEMONS ===
fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
  .then((response) => response.json())
  .then((data) => {
    allPokemons = data.results;
    renderPokemons(allPokemons);
  });

// === FUNÇÕES PRINCIPAIS ===

// Renderizar lista de pokémons
function renderPokemons(pokemons) {
  listWrapper.innerHTML = "";

  pokemons.forEach((pokemon) => {
    const pokemonID = pokemon.url.split("/")[6];
    const listItem = document.createElement("div");
    listItem.className = "list-item";
    listItem.innerHTML = `
      <div class="number-wrap">
        <p class="caption-fonts">#${pokemonID}</p>
      </div>
      <div class="img-wrap">
        <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}" />
      </div>
      <div class="name-wrap">
        <p class="body3-fonts">${pokemon.name}</p>
      </div>
    `;

    // Clicar no Pokémon: adicionar ao time
    listItem.addEventListener("click", async () => {
      const success = await fetchPokemonDataBeforeRedirect(pokemonID);
      if (success) {
        // Armazenar os dados no localStorage para a página de detalhes
        localStorage.setItem('pokemonDetails', JSON.stringify({
          id: pokemonID,
          name: pokemon.name
        }));
        window.location.href = `detail.html?id=${pokemonID}`;
      }
    });

    listWrapper.appendChild(listItem);
  });
}

// Função para buscar detalhes de Pokémon (pode usar depois para detalhes!)
async function fetchPokemonDataBeforeRedirect(id) {
  try {
    const [pokemon, pokemonSpecies] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json()),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(res => res.json()),
    ]);
    return true;
  } catch (error) {
    console.error("Falha ao buscar dados do Pokémon antes do redirecionamento");
  }
}

// Criar novo time
function createTeam(teamName) {
  const newTeam = {
    id: teamIdCounter++,
    name: teamName,
    pokemons: []
  };
  teams.push(newTeam);
  saveTeamsToStorage();
  renderTeams();
}

// Adicionar Pokémon ao time
function addPokemonToTeam(teamId, pokemonId, pokemonName) {
  const team = teams.find(t => t.id === teamId);
  if (!team) return alert("Time não encontrado!");

  if (team.pokemons.length >= 5) {
    alert("O time já tem 5 Pokémons!");
    return;
  }

  const alreadyInTeam = team.pokemons.some(p => p.id === pokemonId);
  if (alreadyInTeam) {
    alert("Esse Pokémon já está no time!");
    return;
  }

  team.pokemons.push({ id: pokemonId, name: pokemonName });
  saveTeamsToStorage();
  renderTeams();
}

// Remover Pokémon do time
function removePokemonFromTeam(teamId, pokemonId) {
  const team = teams.find(t => t.id === teamId);
  if (!team) return;

  team.pokemons = team.pokemons.filter(p => p.id !== pokemonId);
  saveTeamsToStorage();
  renderTeams();
}

// Deletar time inteiro
function deleteTeam(teamId) {
  const confirmDelete = confirm("Tem certeza que deseja deletar este time?");
  if (!confirmDelete) return;

  teams = teams.filter(t => t.id !== teamId);
  saveTeamsToStorage();
  renderTeams();
}

// Renderizar times na tela
function renderTeams() {
  const teamsContainer = document.getElementById("teams-container");
  if (!teamsContainer) return; // Se não existir a div ainda

  teamsContainer.innerHTML = "";

  teams.forEach(team => {
    const teamDiv = document.createElement("div");
    teamDiv.className = "team";

    teamDiv.innerHTML = `
      <div class="team-header">
        <h3>${team.name}</h3>
        <button onclick="deleteTeam(${team.id})" class="delete-team-btn">
          <i class="fa-solid fa-trash"></i> Excluir Time
        </button>
      </div>
      <ul>
        ${team.pokemons.map(p => `
          <li>
            ${p.name} (#${p.id})
            <button onclick="removePokemonFromTeam(${team.id}, '${p.id}')">Remover</button>
          </li>`).join('')}
      </ul>
    `;

    teamsContainer.appendChild(teamDiv);
  });
}

// Salvar times no localStorage
function saveTeamsToStorage() {
  localStorage.setItem("pokemonTeams", JSON.stringify(teams));
}

// Carregar times do localStorage
function loadTeamsFromStorage() {
  const storedTeams = localStorage.getItem("pokemonTeams");
  if (storedTeams) {
    teams = JSON.parse(storedTeams);
    teamIdCounter = teams.length ? Math.max(...teams.map(t => t.id)) + 1 : 1;
    renderTeams();
  }
}

// Buscar enquanto digita
searchInput.addEventListener("keyup", handleSearch);

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  let filteredPokemons;

  if (numberFilter.checked) {
    filteredPokemons = allPokemons.filter((pokemon) => {
      const pokemonID = pokemon.url.split("/")[6];
      return pokemonID.startsWith(searchTerm);
    });
  } else if (nameFilter.checked) {
    filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchTerm)
    );
  } else {
    filteredPokemons = allPokemons;
  }

  renderPokemons(filteredPokemons);

  if (filteredPokemons.length === 0) {
    notFoundMessage.style.display = "block";
  } else {
    notFoundMessage.style.display = "none";
  }
}

// Botão para limpar busca
const closeButton = document.querySelector("#search-close-icon");
if (closeButton) {
  closeButton.addEventListener("click", clearSearch);
}

function clearSearch() {
  searchInput.value = "";
  renderPokemons(allPokemons);
  notFoundMessage.style.display = "none";
}

const createTeamBtn = document.getElementById("create-team-btn");
const teamNameInput = document.getElementById("team-name-input");

if (createTeamBtn) {
  createTeamBtn.addEventListener("click", () => {
    const teamName = teamNameInput.value.trim();
    if (teamName.length === 0) {
      alert("Digite um nome para o time!");
      return;
    }
    createTeam(teamName);
    teamNameInput.value = "";
  });
}

loadTeamsFromStorage();