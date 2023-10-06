require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs'); // Require the 'fs' module
const ReactDOMServer = require('react-dom/server');
const React = require('react');
const { Container } = require('reactstrap');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

const username = 'mern_user';
const password = 'hAhDa1kQMQ0FEhck';
const dbName = 'cluster0';
const uri = `mongodb+srv://${username}:${password}@cluster0.qkrprta.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  checkin: Date,
  checkout: Date,
  guests: Number,
  children: Number,
});

const Booking = mongoose.model('Booking', bookingSchema);

const smtpTransporter = nodemailer.createTransport({
  host: 'smtpout.secureserver.net',
  port: 587,
  auth: {
    user: 'enquiry@ebenezerservicedapartments.com',
    pass: 'Bluelegion@19',
  },
});

app.post('/submit_booking', async (req, res) => {
  try {
    const formData = req.body;

    const booking = new Booking(formData);
    await booking.save();

    const mailOptions = {
      from: 'enquiry@ebenezerservicedapartments.com',
      to: 'enquiry@ebenezerservicedapartments.com',
      subject: 'New Booking',
      text: JSON.stringify(formData, null, 2),
    };

    await smtpTransporter.sendMail(mailOptions);

    // Log a success message
    console.log('Form submitted successfully');

    // Read the HTML content from thankyou.html (assuming it's in the root directory)
    const thankyouHtml = fs.readFileSync('./thankyou.html', 'utf8');

    // Send the HTML content as a response
    res.send(thankyouHtml);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});