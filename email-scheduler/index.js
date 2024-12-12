const axios = require('axios');
const cheerio = require('cheerio');

async function fetchRealData() {
  try {
    // Replace this URL with the actual URL of your webpage
    const response = await axios.get('https://oscarmuru99.github.io/workout.github.io/');
    const html = response.data;
    const $ = cheerio.load(html);

    const participants = [];
    $('#participants .participant').each((index, element) => {
      const name = $(element).find('.name').text().trim();
      const days = parseInt($(element).find('.days').text().trim(), 10);
      const email = $(element).find('.email').text().trim(); // Add emails if available in the HTML

      participants.push({ name, days, email });
    });

    return participants;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

// Update the sendWeeklyEmails function to use real data
async function sendWeeklyEmails() {
  const participants = await fetchRealData();
  if (participants.length === 0) {
    console.log('❌ No participants found!');
    return;
  }

  const emailContent = generateEmailContent(participants);

  for (const participant of participants) {
    try {
      const info = await transporter.sendMail({
        from: '"Reto de Ejercicio" <your_email@gmail.com>',
        to: participant.email,
        subject: '🏆 Clasificación Semanal 🏋️‍♂️',
        html: emailContent,
      });

      console.log(`✅ Email sent to ${participant.name} (${participant.email})`);
    } catch (error) {
      console.error(`❌ Failed to send email to ${participant.name} (${participant.email}):`, error);
    }
  }
}

// Generate email content based on real data
function generateEmailContent(participants) {
  let tableRows = participants
    .map(
      (p, index) => `<tr><td>${index + 1}</td><td>${p.name}</td><td>${p.days}</td></tr>`
    )
    .join('');

  return `
    <h1>🏆 Tabla de Clasificación 🏋️‍♂️</h1>
    <table border="1" style="border-collapse: collapse; text-align: left;">
      <thead>
        <tr>
          <th>Posición</th>
          <th>Nombre</th>
          <th>Días</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;
}

// Schedule the email job to run every Monday at 8:00 AM
cron.schedule('*/1 * * * *', () => {
    console.log('Sending weekly emails...');
    sendWeeklyEmails();
  });
  
// Call this function in your cron job
/*cron.schedule('0 8 * * 1', () => {
  console.log('Sending weekly emails with real data...');
  sendWeeklyEmails();
});*/