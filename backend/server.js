const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Database Setup
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        // Create tables
        db.run(`CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            phone TEXT,
            service TEXT,
            message TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS prescriptions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            patient_name TEXT,
            mobile TEXT,
            notes TEXT,
            file_path TEXT,
            status TEXT DEFAULT 'Pending',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT,
            phone TEXT,
            total_amount REAL,
            items TEXT,
            status TEXT DEFAULT 'Pending',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});

// Routes

// 1. Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend is running' });
});

// 2. Submit Contact Form
app.post('/api/contact', (req, res) => {
    const { name, email, phone, service, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const sql = `INSERT INTO contacts (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [name, email, phone, service, message], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, message: 'Message sent successfully!' });
    });
});

// 3. Upload Prescription
app.post('/api/upload-prescription', upload.single('prescription'), (req, res) => {
    const { patient_name, mobile, notes } = req.body;
    const file = req.file;

    if (!patient_name || !mobile || !file) {
        return res.status(400).json({ error: 'Patient name, mobile, and prescription file are required.' });
    }

    const file_path = `/uploads/${file.filename}`;
    const sql = `INSERT INTO prescriptions (patient_name, mobile, notes, file_path) VALUES (?, ?, ?, ?)`;
    
    db.run(sql, [patient_name, mobile, notes, file_path], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            id: this.lastID, 
            message: 'Prescription uploaded successfully!',
            file_path 
        });
    });
});

// 4. Place Order
app.post('/api/orders', (req, res) => {
    const { customer_name, phone, total_amount, items } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ error: 'Order must contain items.' });
    }

    const itemsJson = JSON.stringify(items);
    const sql = `INSERT INTO orders (customer_name, phone, total_amount, items) VALUES (?, ?, ?, ?)`;
    
    db.run(sql, [customer_name || 'Guest', phone || 'N/A', total_amount, itemsJson], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, message: 'Order placed successfully!' });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
