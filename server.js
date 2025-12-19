// server.js - Backend Server
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message, phone } = req.body;
        
        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please fill all required fields' 
            });
        }
        
        // Email configuration (using Gmail as example)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'dganagonda@gmail.com', // Your email
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
                <hr>
                <p>Sent from NEXA Website</p>
            `
        };
        
        // Send email
        await transporter.sendMail(mailOptions);
        
        res.json({ 
            success: true, 
            message: 'Message sent successfully!' 
        });
        
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send message. Please try again later.' 
        });
    }
});

// Project Inquiry Endpoint
app.post('/api/project-inquiry', async (req, res) => {
    try {
        const { projectType, budget, timeline, name, email, description } = req.body;
        
        // Email content for project inquiry
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'dganagonda@gmail.com',
            subject: `New Project Inquiry: ${projectType}`,
            html: `
                <h2>New Project Inquiry</h2>
                <p><strong>Project Type:</strong> ${projectType}</p>
                <p><strong>Budget Range:</strong> ${budget}</p>
                <p><strong>Timeline:</strong> ${timeline}</p>
                <p><strong>Client Name:</strong> ${name}</p>
                <p><strong>Client Email:</strong> ${email}</p>
                <p><strong>Project Description:</strong></p>
                <p>${description}</p>
                <hr>
                <p>Sent from NEXA Website</p>
            `
        };
        
        await transporter.sendMail(mailOptions);
        
        res.json({ 
            success: true, 
            message: 'Project inquiry submitted successfully!' 
        });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to submit inquiry.' 
        });
    }
});

// Newsletter Subscription
app.post('/api/subscribe', async (req, res) => {
    try {
        const { email } = req.body;
        
        // In a real app, you'd save this to a database
        console.log('New subscription:', email);
        
        // Send welcome email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to NEXA Newsletter!',
            html: `
                <h2>Welcome to NEXA Digital Agency!</h2>
                <p>Thank you for subscribing to our newsletter.</p>
                <p>You'll receive updates about:</p>
                <ul>
                    <li>Latest web design trends</li>
                    <li>Digital marketing tips</li>
                    <li>Exclusive offers and promotions</li>
                    <li>Our latest projects and case studies</li>
                </ul>
                <p>Best regards,<br>The NEXA Team</p>
            `
        };
        
        await transporter.sendMail(mailOptions);
        
        res.json({ 
            success: true, 
            message: 'Subscribed successfully!' 
        });
        
    } catch (error) {
        console.error('Subscription error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Subscription failed.' 
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
