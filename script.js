// Lista de participantes simulada
const participants = [
    { name: "Oscar", days: 6, image: "https://via.placeholder.com/50" },
    { name: "Arturo", days: 6, image: "https://via.placeholder.com/50" },
    { name: "Alfonso", days: 6, image: "https://via.placeholder.com/50" },
    { name: "Vala", days: 2, image: "https://via.placeholder.com/50" },
    { name: "Meño", days: 2, image: "https://via.placeholder.com/50" },
    { name: "Romo", days: 7, image: "https://via.placeholder.com/50" },
  ];
  
  // Función para renderizar la tabla de participantes
  function renderParticipants() {
    const participantsDiv = document.getElementById("participants");
    participantsDiv.innerHTML = ""; // Limpiar contenido
  
    // Ordenar por días acumulados (de mayor a menor)
    const sortedParticipants = participants.sort((a, b) => b.days - a.days);
  
    // Renderizar cada participante
    sortedParticipants.forEach((participant, index) => {
      const div = document.createElement("div");
      div.classList.add("participant");
  
      div.innerHTML = `
        <img src="${participant.image}" alt="${participant.name}">
        <span class="name">${index + 1}. ${participant.name}</span>
        <span class="days">${participant.days} días</span>
      `;
  
      participantsDiv.appendChild(div);
    });
  
    // Mostrar líder actual
    const leader = sortedParticipants[0];
    document.getElementById(
      "leader"
    ).textContent = `🥇 ${leader.name} con ${leader.days} días`;
  }
  
  // Inicializar dashboard
  renderParticipants();
  