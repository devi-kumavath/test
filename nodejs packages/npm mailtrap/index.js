const express = require("express");
const nodemailer = require("nodemailer");

const port = 3800;
const app = express();

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false, // Use TLS
    auth: {
        user: '4b22a6aa1cca8c',
        pass: '7740a52b115844'
    }
});

// Define email content with Instagram-related HTML
const mailOptions = {
    from: 'devikumavath2023@gmail.com',
    to: 'devikumavath2023@gmail.com',
    subject: 'Follow the_techie_girl on Instagram!',
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 5px;
              background-color: #f9f9f9;
            }
            h1 {
              color: #333;
            }
            p {
              color: #555;
            }
            .instagram-button {
              background-color: #bc2a8d;
              border: none;
              color: white;
              padding: 10px 20px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 16px;
              border-radius: 5px;
              cursor: pointer;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Hello from Devi Kumavath!</h1>
            <p>Are you on Instagram? Follow <strong>the_techee_girl</strong> for awesome tech content!</p>
            <a href="https://www.instagram.com/the_techee_girl/" class="instagram-button">Follow on Instagram</a>
          </div>
        </body>
      </html>
    `
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error:', error);
    } else {
        console.log('Email sent:', info);
    }
});

// Start the Express app
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
