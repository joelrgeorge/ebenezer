const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const ReactDOMServer = require('react-dom/server');
const React = require('react');
const { Container } = require('reactstrap'); // Import Reactstrap components on the server-side
const ThankYou = require('./views/thankyou.jsx').default; // Import your ThankYou component

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

    // Create a new booking document and save it to the database
    const booking = new Booking(formData);
    await booking.save();

    // Send the email
    const mailOptions = {
      from: 'enquiry@ebenezerservicedapartments.com',
      to: 'enquiry@ebenezerservicedapartments.com',
      subject: 'New Booking',
      text: JSON.stringify(formData, null, 2),
    };

    await smtpTransporter.sendMail(mailOptions);

    // Log a success message
    console.log('Form submitted successfully');

    // Render the ThankYou component to HTML
    const html = ReactDOMServer.renderToString(
      <Container>
        <ThankYou />
      </Container>
    );

    // Send the rendered HTML as a response
    res.send(html);
  } catch (error) {
    console.error(error); // Log the error to the console for debugging
    res.status(500).send('An error occurred.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});