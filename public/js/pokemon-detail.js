document.addEventListener("DOMContentLoaded", async () => {
  const pokemonDetails = JSON.parse(localStorage.getItem('pokemonDetails'));

  if (!pokemonDetails) {
    alert("Pokémon não encontrado!");
    return;
  }

  const pokemonName = document.getElementById('pokemon-name');
  const pokemonImage = document.getElementById('pokemon-image');
  const powerWrapper = document.getElementById('power-wrapper');
  const movesContainer = document.getElementById('moves-container');
  const abilitiesContainer = document.getElementById('abilities-container');
  const statsContainer = document.getElementById('stats-container');

  pokemonName.textContent = pokemonDetails.name;

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonDetails.id}`);
  const data = await response.json();

  // Atualizar imagem
  pokemonImage.innerHTML = `<img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonDetails.id}.svg" alt="${pokemonDetails.name}" />`;

  // Atualizar tipos (power-wrapper)
  powerWrapper.innerHTML = data.types.map(type => `<p style="background-color: ${getTypeColor(type.type.name)};">${type.type.name}</p>`).join("");

  // Atualizar peso, altura e HP
  document.getElementById('pokemon-weight').textContent = (data.weight / 10) + " kg";
  document.getElementById('pokemon-height').textContent = (data.height / 10) + " m";
  document.getElementById('pokemon-hp').textContent = data.stats.find(stat => stat.stat.name === "hp").base_stat;

  // Atualizar movimentos
  movesContainer.innerHTML = data.moves.slice(0, 6).map(move => `<p>${move.move.name}</p>`).join("");

  // Atualizar habilidades
  abilitiesContainer.innerHTML = data.abilities.map(ability => `<p style="background-color: #ffca28;">${ability.ability.name}</p>`).join("");

  // Atualizar estatísticas
  statsContainer.innerHTML = data.stats.map(stat => `
    <div class="stats-wrap">
      <p class="stats">${stat.base_stat}</p>
      <progress class="progress-bar" value="${stat.base_stat}" max="200"></progress>
    </div>
  `).join("");

  // Atualizar background pelo tipo
  if (data.types.length > 0) {
    const mainType = data.types[0].type.name;
    document.body.setAttribute('data-type', mainType);
  }

  // Botão Adicionar ao Time
  const addToTeamButton = document.getElementById('add-to-team-btn');
  const teamSelectionContainer = document.getElementById('team-selection-container');
  const teamSelection = document.getElementById('team-selection');
  const confirmAddButton = document.getElementById('confirm-add');

  const teams = JSON.parse(localStorage.getItem('pokemonTeams')) || [];

  teamSelection.innerHTML = '';
  teams.forEach((team, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `Time ${index + 1}`;
    teamSelection.appendChild(option);
  });

  addToTeamButton.addEventListener('click', () => {
    teamSelectionContainer.classList.toggle('hidden');
  });

  confirmAddButton.addEventListener('click', () => {
    const selectedTeamIndex = teamSelection.value;
    if (selectedTeamIndex !== "") {
      const team = teams[selectedTeamIndex];

      if (team.pokemons.length >= 5) {
        alert('Este time já está cheio!');
        return;
      }

      const alreadyInTeam = team.pokemons.some(p => p.id === pokemonDetails.id);
      if (alreadyInTeam) {
        alert(`${pokemonDetails.name} já está no time!`);
        return;
      }

      team.pokemons.push(pokemonDetails);
      localStorage.setItem('pokemonTeams', JSON.stringify(teams));
      alert(`${pokemonDetails.name} foi adicionado ao Time ${selectedTeamIndex + 1}`);
      teamSelectionContainer.classList.add('hidden');
    }
  });
});

// Função para cor dos tipos
function getTypeColor(type) {
  const colors = {
    fire: "#f57d31",
    water: "#6493eb",
    grass: "#74cb48",
    electric: "#f9cf30",
    psychic: "#fb5584",
    normal: "#aaa67f",
    rock: "#b69e31",
    ground: "#dec16b",
    bug: "#a7b723",
    poison: "#a43e9e",
    fairy: "#e69eac",
    fighting: "#c12239",
    ghost: "#70559b",
    ice: "#9ad6df",
    dragon: "#7037ff",
    dark: "#75574c",
    steel: "#b7b9d0",
    flying: "#a891ec"
  };
  return colors[type] || "#888"; // fallback se não encontrado
}
