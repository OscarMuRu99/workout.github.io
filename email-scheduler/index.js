require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const fs = require('fs');

// Sample participant data
const participants = [
  { name: "Oscar", email: "oscarmuru@outlook.com", days: 6 },
  { name: "Arturo", email: "arturo@example.com", days: 6 },
  { name: "Alfonso", email: "alfonso@example.com", days: 6 },
  { name: "Vala", email: "vala@example.com", days: 2 },
  { name: "Meño", email: "meno@example.com", days: 2 },
  { name: "Romo", email: "romo@example.com", days: 7 },
];

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'oscarjojo99@gmail.com', // Use environment variables
    pass: 'cvoi nhsu yjxo ydhd', // Use environment variables
  },
});

// Function to generate the email content
function generateEmailContent() {
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

// Function to send emails
async function sendWeeklyEmails() {
  const emailContent = generateEmailContent();
  let logEntries = [];

  for (const participant of participants) {
    try {
      const info = await transporter.sendMail({
        from: '"Reto de Ejercicio" <your_email@gmail.com>',
        to: participant.email,
        subject: '🏆 Clasificación Semanal 🏋️‍♂️',
        html: emailContent,
      });

      const logEntry = `✅ Email sent to ${participant.name} (${participant.email}) - Message ID: ${info.messageId}`;
      logEntries.push(logEntry);
      console.log(logEntry);
    } catch (error) {
      const logEntry = `❌ Failed to send email to ${participant.name} (${participant.email}): ${error}`;
      logEntries.push(logEntry);
      console.error(logEntry);
    }
  }

  // Save logs to a file
  fs.appendFileSync('email-log.txt', logEntries.join('\n') + '\n');
}

// Schedule the email job to run every Monday at 8:00 AM
cron.schedule('*/1 * * * *', () => {
  console.log('Sending weekly emails...');
  sendWeeklyEmails();
});

// Start the server (optional for frontend integration)
const app = express();
app.get('/', (req, res) => res.send('Email Scheduler is Running'));
app.listen(3000, () => console.log('Server running on http://localhost:3000'));