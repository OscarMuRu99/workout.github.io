// Lista de participantes simulada
const participants = [
  { name: "Oscar", days: 8, image: "images/oscar.png" },
  { name: "Arturo", days: 6, image: "images/arturo.png" },
  { name: "Alfonso", days: 6, image: "images/alfonso.png" },
  { name: "Vala", days: 3, image: "images/vala.png" },
  { name: "Meño", days: 3, image: "images/meno.png" },
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
      <img src="${participant.image}" alt="${participant.name}" class="participant-image">
      <span class="name">${index + 1}. ${participant.name}</span>
      <span class="days">${participant.days} días</span>
    `;

    participantsDiv.appendChild(div);
  });

  // Mostrar líder actual
  if (sortedParticipants.length > 0) {
    const leader = sortedParticipants[0];
    const leaderPhoto = document.getElementById("leader-photo");
    const leaderText = document.getElementById("leader");

    leaderPhoto.src = leader.image;
    leaderPhoto.style.display = "block";
    leaderText.textContent = `🥇 ${leader.name} con ${leader.days} días`;
  } else {
    document.getElementById("leader").textContent = "¡No hay participantes!";
    document.getElementById("leader-photo").style.display = "none";
  }

  // Agregar evento de clic a las imágenes para abrir el modal
  document.querySelectorAll(".participant-image").forEach(img => {
    img.addEventListener("click", event => openModal(event.target.src));
  });
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

// Función para abrir el modal
function openModal(imageSrc) {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  modalImage.src = imageSrc;
  modal.style.display = "flex"; // Asegura que el modal esté centrado
}

// Función para cerrar el modal
function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";
}

// Inicializar la página
renderParticipants();

// Iniciar contador regresivo
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Agregar eventos para cerrar el modal
document.querySelector(".close").addEventListener("click", closeModal);
document.getElementById("imageModal").addEventListener("click", event => {
  if (event.target.id === "imageModal") closeModal();
});