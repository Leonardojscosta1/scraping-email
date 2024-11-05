const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendEmail(items) {
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  
  let emailBody = '<h1 style="text-align: center;">Livros em Destaque</h1>';
  emailBody += '<ul style="list-style-type: none; padding: 0; margin: 0;">';

  items.forEach(item => {
    emailBody += `
      <li style="margin-bottom: 20px; border: 1px solid #ccc; padding: 10px; border-radius: 5px; background-color: #f9f9f9;">
        <h2 style="margin: 0;">${item.bookName}</h2>
        <p style="font-weight: bold;">Tag: <span style="color: green;">${item.tag}</span></p>
        <p>Preço de: <span style="text-decoration: line-through;">${item.priceFrom}</span> <br>
        Preço por: <span style="color: red;">${item.priceTo}</span></p>
        <a href="${item.link}" style="text-decoration: none; color: white; background-color: blue; padding: 10px 15px; border-radius: 5px;">Ver no site</a>
        <div style="margin-top: 10px;">
          <img src="${item.imageUrl}" alt="${item.bookName}" style="max-width: 100%; height: auto; border-radius: 5px;">
        </div>
      </li>
    `;
  });

  emailBody += '</ul>';

  
  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL_RECIPIENT,
    subject: 'Livros em Destaque',
    html: emailBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail enviado com sucesso.');
    return true;
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    return false;
  }
}

module.exports = sendEmail;
