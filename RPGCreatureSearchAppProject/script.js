document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const creatureNameEl = document.getElementById("creature-name");
  const creatureIdEl = document.getElementById("creature-id");
  const weightEl = document.getElementById("weight");
  const heightEl = document.getElementById("height");
  const typesEl = document.getElementById("types");
  const hpEl = document.getElementById("hp");
  const attackEl = document.getElementById("attack");
  const defenseEl = document.getElementById("defense");
  const specialAttackEl = document.getElementById("special-attack");
  const specialDefenseEl = document.getElementById("special-defense");
  const speedEl = document.getElementById("speed");
  const spriteEl = document.getElementById("creature-sprite");

  const API_URL_BASE =
    "https://rpg-creature-api.freecodecamp.rocks/api/creature/";

  const fetchCreatureData = async () => {
    const query = searchInput.value.trim();
    if (!query) {
      alert("Please enter a creature name or ID.");
      return;
    }

    const apiQuery = /^\d+$/.test(query) ? query : query.toLowerCase();
    const fullApiUrl = API_URL_BASE + apiQuery;

    try {
      const response = await fetch(fullApiUrl);
      if (!response.ok) {
        alert("Creature not found"); // User stories 14 & 19 expect this.
        resetDisplay();
        return;
      }
      const data = await response.json();
      displayCreatureData(data);
    } catch (error) {
      console.error("Fetch error or JSON parsing error:", error);
      // This catch block is for network errors (e.g., DNS, server unreachable)
      // or errors during response.json() parsing if response.ok was true but content was bad.
      alert("Creature not found"); // Fallback alert consistent with user stories.
      resetDisplay();
    }
  };

  const displayCreatureData = (data) => {
    // User Story 15 & 17 name format: PYROLYNX, AQUOROC (UPPERCASE)
    creatureNameEl.textContent = data.name.toUpperCase();
    // User Story 15 & 17 ID format: #1 or 1, #2 or 2
    creatureIdEl.textContent = `#${data.id}`;
    // User Story 15 & 17 weight/height format: Weight: 42 or 42, Height: 32 or 32
    weightEl.textContent = `Weight: ${data.weight}`;
    heightEl.textContent = `Height: ${data.height}`;

    typesEl.innerHTML = ""; // Clear previous types (User Story 16 & 18)
    // New API structure for types: data.types is an array of { name: "fire" }
    data.types.forEach((typeObj) => {
      const typeSpan = document.createElement("span");
      const typeName = typeObj.name; // Directly use typeObj.name
      typeSpan.textContent = typeName.toUpperCase();
      typeSpan.classList.add("type-badge");
      typeSpan.classList.add(typeName.toLowerCase()); // For type-specific styling
      typesEl.appendChild(typeSpan);
    });

    const getStat = (statName, statsArray) => {
      const stat = statsArray.find((s) => s.name === statName);
      return stat ? stat.base_stat : "N/A";
    };

    // User Story 15 & 17: hp, attack, etc. values
    hpEl.textContent = getStat("hp", data.stats);
    attackEl.textContent = getStat("attack", data.stats);
    defenseEl.textContent = getStat("defense", data.stats);
    specialAttackEl.textContent = getStat("special-attack", data.stats);
    specialDefenseEl.textContent = getStat("special-defense", data.stats);
    speedEl.textContent = getStat("speed", data.stats);

    // New API structure for sprite: data.sprite
    if (data.sprite) {
      spriteEl.src = data.sprite;
      spriteEl.alt = `Sprite of ${data.name}`;
      // spriteEl.style.display = 'block'; // CSS will handle this
    } else {
      spriteEl.src = "";
      spriteEl.alt = "No sprite available";
      // spriteEl.style.display = 'none'; // CSS will handle this
    }
  };

  const resetDisplay = () => {
    creatureNameEl.textContent = "";
    creatureIdEl.textContent = "";
    weightEl.textContent = "";
    heightEl.textContent = "";
    typesEl.innerHTML = "";
    hpEl.textContent = "";
    attackEl.textContent = "";
    defenseEl.textContent = "";
    specialAttackEl.textContent = "";
    specialDefenseEl.textContent = "";
    speedEl.textContent = "";
    spriteEl.src = "";
    spriteEl.alt = "Creature Sprite";
    // spriteEl.style.display = 'none'; // CSS will hide if src is empty
  };

  searchButton.addEventListener("click", fetchCreatureData);
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      fetchCreatureData();
    }
  });

  // Ensure sprite is hidden initially if no src by default (CSS also helps)
  if (!spriteEl.getAttribute("src") || spriteEl.getAttribute("src") === "") {
    spriteEl.style.display = "none";
  }
});
