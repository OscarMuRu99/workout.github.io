// Lista de participantes simulada
const participants = [
  { name: "Oscar", days: 6, image: "images/oscar.png" },
  { name: "Arturo", days: 6, image: "images/arturo.png" },
  { name: "Alfonso", days: 6, image: "images/alfonso.png" },
  { name: "Vala", days: 2, image: "images/vala.png" },
  { name: "Meño", days: 2, image: "images/meno.png" },
  { name: "Romo", days: 7, image: "images/romo.png" },
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

// Función para actualizar el contador regresivo
function updateCountdown() {
  const endDate = new Date("2025-03-01T00:00:00");
  const now = new Date();
  const remainingTime = endDate - now;

  if (remainingTime <= 0) {
      document.getElementById("countdown").textContent = "¡El reto ha terminado!";
      clearInterval(countdownInterval);
      return;
  }

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  document.getElementById(
      "countdown"
  ).textContent = `Tiempo restante: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Inicializar dashboard
renderParticipants();

// Iniciar contador regresivo
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();de