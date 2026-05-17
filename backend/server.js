const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

const demoUsers = [
    {
        id: 'USR-001',
        name: 'Admin User',
        email: 'admin@amstermedcare.com',
        password: 'admin123',
        role: 'Super Admin',
        permissions: ['*'],
    },
    {
        id: 'USR-002',
        name: 'Maya Pharmacist',
        email: 'pharmacist@amstermedcare.com',
        password: 'pharma123',
        role: 'Pharmacist',
        permissions: ['dashboard:read', 'orders:update', 'prescriptions:verify', 'products:read'],
    },
    {
        id: 'USR-003',
        name: 'Inventory Manager',
        email: 'inventory@amstermedcare.com',
        password: 'stock123',
        role: 'Inventory Manager',
        permissions: ['dashboard:read', 'products:manage', 'stock:manage'],
    },
];

const seedData = {
    customers: [
        { id: 'CUST-001', name: 'Rahul Krishnan', email: 'rahul.k@example.ae', phone: '+971 50 432 1001', location: 'Dubai Marina', orders: 12, totalSpent: 12500, status: 'Active' },
        { id: 'CUST-002', name: 'Aisha Mohammed', email: 'aisha.m@example.ae', phone: '+971 55 432 1002', location: 'Jumeirah', orders: 5, totalSpent: 4500, status: 'Active' },
        { id: 'CUST-003', name: 'John Doe', email: 'john.d@example.ae', phone: '+971 52 432 1003', location: 'Abu Dhabi', orders: 2, totalSpent: 1200, status: 'Inactive' },
        { id: 'CUST-004', name: 'Sneha Patel', email: 'sneha.p@example.ae', phone: '+971 56 432 1004', location: 'Sharjah', orders: 8, totalSpent: 8900, status: 'Active' },
        { id: 'CUST-005', name: 'Vishnu R', email: 'vishnu.r@example.ae', phone: '+971 54 432 1005', location: 'Ajman', orders: 0, totalSpent: 0, status: 'Blocked' },
    ],
    products: [
        { sku: 'PRD001', name: 'Panadol Advance 500mg', genericName: 'Paracetamol', brand: 'GSK', supplier: 'Aster Distribution', category: 'Medicine', purchaseCost: 8.50, sellingPrice: 12.00, gpPercent: '29.17', vatAmount: 0.60, stock: 1250, reservedStock: 45, damagedStock: 2, dosageInfo: 'Take 1-2 tablets every 4-6 hours', prescriptionRequired: false, batchNumber: 'B-PAN502', expiryDate: '2027-11-20', warehouseLocation: 'Zone A - Aisle 3', status: 'In Stock' },
        { sku: 'PRD002', name: 'Solgar Vitamin C 1000mg', genericName: 'Ascorbic Acid', brand: 'Solgar', supplier: 'Gulf Drug LLC', category: 'Supplement', purchaseCost: 45.00, sellingPrice: 75.00, gpPercent: '40.00', vatAmount: 3.75, stock: 430, reservedStock: 10, damagedStock: 0, dosageInfo: 'Take 1 capsule daily with meals', prescriptionRequired: false, batchNumber: 'B-SOL889', expiryDate: '2028-02-15', warehouseLocation: 'Zone C - Aisle 1', status: 'In Stock' },
        { sku: 'PRD003', name: 'Omron M3 Blood Pressure Monitor', genericName: 'BP Monitor', brand: 'Omron', supplier: 'Modern Pharmaceutical LLC', category: 'Equipment', purchaseCost: 190.00, sellingPrice: 295.00, gpPercent: '35.59', vatAmount: 14.75, stock: 15, reservedStock: 1, damagedStock: 0, dosageInfo: 'Use as directed by physician', prescriptionRequired: false, batchNumber: 'B-OMR003', expiryDate: '2030-05-10', warehouseLocation: 'Zone D - Shelf 2', status: 'Low Stock' },
        { sku: 'PRD004', name: 'Amoxicillin 500mg Capsules', genericName: 'Amoxicillin Trihydrate', brand: 'Julphar', supplier: 'Julphar Gulf Pharmaceutical', category: 'Medicine', purchaseCost: 12.00, sellingPrice: 22.50, gpPercent: '46.67', vatAmount: 1.13, stock: 0, reservedStock: 0, damagedStock: 0, dosageInfo: 'Take 1 capsule every 8 hours as directed', prescriptionRequired: true, batchNumber: 'B-AMX991', expiryDate: '2026-08-30', warehouseLocation: 'Zone A - Vault Rx', status: 'Out of Stock' },
        { sku: 'PRD005', name: 'N95 Respirator Masks (3M)', genericName: 'Respirator Mask', brand: '3M', supplier: 'Aster Distribution', category: 'Safety', purchaseCost: 20.00, sellingPrice: 35.00, gpPercent: '42.86', vatAmount: 1.75, stock: 850, reservedStock: 12, damagedStock: 1, dosageInfo: 'Single-use protective mask', prescriptionRequired: false, batchNumber: 'B-3MN95', expiryDate: '2031-01-01', warehouseLocation: 'Zone B - Pallet 4', status: 'In Stock' },
    ],
    orders: [
        { id: 'ORD-9024', customerName: 'Rahul Krishnan', phone: '+971 50 123 4567', email: 'rahul.k@example.ae', address: 'Apartment 1402, Marina Heights, Dubai Marina, Dubai', date: '2026-05-17', subtotal: 120, vat: 6, discount: 10, total: 116, status: 'Processing', paymentMethod: 'Online Visa Card', paymentStatus: 'Paid', items: [{ name: 'Panadol Advance 500mg', qty: 2, price: 12, total: 24 }, { name: 'Solgar Vitamin C 1000mg', qty: 1, price: 75, total: 75 }, { name: 'N95 Respirator Masks (3M)', qty: 1, price: 21, total: 21 }], rxReference: 'RX-5021', deliveryAgent: 'Unassigned' },
        { id: 'ORD-9023', customerName: 'Aisha Mohammed', phone: '+971 56 987 6543', email: 'aisha.m@example.ae', address: 'Villa 45, Al Khawaneej 2, Dubai', date: '2026-05-17', subtotal: 450, vat: 22.5, discount: 0, total: 472.5, status: 'Pending', paymentMethod: 'Cash on Delivery (COD)', paymentStatus: 'Pending', items: [{ name: 'Omron M3 Blood Pressure Monitor', qty: 1, price: 295, total: 295 }, { name: 'Solgar Vitamin C 1000mg', qty: 2, price: 75, total: 150 }], rxReference: null, deliveryAgent: 'Unassigned' },
    ],
    offers: [
        { id: 'OFF-001', code: 'WELCOME25', title: 'New User Discount', type: 'Percentage', value: '25%', minOrder: 49, validUntil: '2026-12-31', status: 'Active' },
        { id: 'OFF-002', code: 'FREEDEL', title: 'Free Delivery', type: 'Shipping', value: 'Free', minOrder: 99, validUntil: '2026-06-30', status: 'Active' },
        { id: 'OFF-003', code: 'SUMMER10', title: 'Summer Special', type: 'Percentage', value: '10%', minOrder: 149, validUntil: '2026-08-31', status: 'Active' },
        { id: 'OFF-004', code: 'FLAT500', title: 'Flat Discount', type: 'Fixed', value: 50, minOrder: 500, validUntil: '2026-05-01', status: 'Expired' },
    ],
    prescriptions: [
        { id: 'RX-5021', customer: 'Rahul Krishnan', date: '2026-05-17 09:15 AM', items: 3, status: 'Pending Review', urgency: 'High' },
        { id: 'RX-5020', customer: 'Aisha Mohammed', date: '2026-05-16 02:45 PM', items: 1, status: 'Approved', urgency: 'Normal' },
        { id: 'RX-5019', customer: 'Sneha Patel', date: '2026-05-16 11:20 AM', items: 5, status: 'Rejected', urgency: 'Normal' },
    ],
    inventory: [],
    deliveries: [],
    'sales-reports': [],
};

const resourceNames = Object.keys(seedData);

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
        cb(null, uploadsDir);
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

        db.run(`CREATE TABLE IF NOT EXISTS resource_items (
            resource TEXT NOT NULL,
            item_id TEXT NOT NULL,
            data TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (resource, item_id)
        )`, seedResources);
    }
});

const runQuery = (sql, params = []) => new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve(this);
    });
});

const allQuery = (sql, params = []) => new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
    });
});

const getQuery = (sql, params = []) => new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
    });
});

const getItemId = (resource, item) => {
    if (item.id) return String(item.id);
    if (item.sku) return String(item.sku);
    return `${resource.toUpperCase()}-${Date.now()}`;
};

const seedResources = async () => {
    try {
        await Promise.all(resourceNames.map(async (resource) => {
            const row = await getQuery('SELECT COUNT(*) AS count FROM resource_items WHERE resource = ?', [resource]);
            if (row.count > 0) return;

            await Promise.all(seedData[resource].map((item) => runQuery(
                'INSERT INTO resource_items (resource, item_id, data) VALUES (?, ?, ?)',
                [resource, getItemId(resource, item), JSON.stringify(item)],
            )));
        }));
        console.log('Resource tables are ready.');
    } catch (err) {
        console.error('Error seeding resources:', err.message);
    }
};

const parseResourceRow = (row) => JSON.parse(row.data);

const isSupportedResource = (resource) => resourceNames.includes(resource);

const buildCreatedItem = (resource, payload) => {
    const item = { ...payload };
    const prefix = {
        customers: 'CUST',
        orders: 'ORD',
        offers: 'OFF',
        prescriptions: 'RX',
        deliveries: 'DEL',
        inventory: 'INV',
        'sales-reports': 'SAL',
    }[resource] || resource.toUpperCase().slice(0, 3);

    if (!item.id && !item.sku) {
        item.id = `${prefix}-${Date.now()}`;
    }

    if (resource === 'orders') {
        item.date = item.date || new Date().toISOString().slice(0, 10);
        item.status = item.status || 'Pending';
        item.paymentStatus = item.paymentStatus || 'Pending';
        item.items = item.items || [];
    }

    return item;
};

// Routes

// 1. Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend is running' });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = demoUsers.find((candidate) => candidate.email === email && candidate.password === password);

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const issuedAt = Date.now();
    const expiresAt = issuedAt + 1000 * 60 * 60 * 8;
    const sessionUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
    };

    res.json({
        token: Buffer.from(JSON.stringify({ sub: user.id, exp: expiresAt })).toString('base64'),
        user: sessionUser,
        expiresAt,
    });
});

app.get('/api/auth/validate', (req, res) => {
    res.json({ valid: true });
});

app.get('/api/auth/activity-logs', (req, res) => {
    res.json([]);
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
        const prescription = {
            id: `RX-${this.lastID}`,
            customer: patient_name,
            date: new Date().toISOString().slice(0, 16).replace('T', ' '),
            items: 1,
            status: 'Pending Review',
            urgency: 'Normal',
            mobile,
            notes,
            filePath: file_path,
        };

        runQuery(
            'INSERT OR REPLACE INTO resource_items (resource, item_id, data) VALUES (?, ?, ?)',
            ['prescriptions', prescription.id, JSON.stringify(prescription)],
        ).catch((resourceErr) => console.error('Prescription resource sync failed:', resourceErr.message));

        res.status(201).json({
            id: prescription.id,
            message: 'Prescription uploaded successfully!',
            file_path 
        });
    });
});

app.get('/api/:resource', async (req, res) => {
    const { resource } = req.params;
    if (!isSupportedResource(resource)) {
        return res.status(404).json({ error: 'Unknown resource.' });
    }

    try {
        const rows = await allQuery(
            'SELECT data FROM resource_items WHERE resource = ? ORDER BY created_at DESC',
            [resource],
        );
        res.json(rows.map(parseResourceRow));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/:resource/:id', async (req, res) => {
    const { resource, id } = req.params;
    if (!isSupportedResource(resource)) {
        return res.status(404).json({ error: 'Unknown resource.' });
    }

    try {
        const row = await getQuery(
            'SELECT data FROM resource_items WHERE resource = ? AND item_id = ?',
            [resource, id],
        );
        if (!row) return res.status(404).json({ error: 'Item not found.' });
        res.json(parseResourceRow(row));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/:resource', async (req, res) => {
    const { resource } = req.params;
    if (!isSupportedResource(resource)) {
        return res.status(404).json({ error: 'Unknown resource.' });
    }

    try {
        const item = buildCreatedItem(resource, req.body);
        const itemId = getItemId(resource, item);
        await runQuery(
            'INSERT OR REPLACE INTO resource_items (resource, item_id, data, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)',
            [resource, itemId, JSON.stringify(item)],
        );
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/:resource/:id', async (req, res) => {
    const { resource, id } = req.params;
    if (!isSupportedResource(resource)) {
        return res.status(404).json({ error: 'Unknown resource.' });
    }

    try {
        const existingRow = await getQuery(
            'SELECT data FROM resource_items WHERE resource = ? AND item_id = ?',
            [resource, id],
        );
        if (!existingRow) return res.status(404).json({ error: 'Item not found.' });

        const updatedItem = { ...parseResourceRow(existingRow), ...req.body };
        const updatedId = getItemId(resource, updatedItem);
        if (updatedId !== id) {
            await runQuery('DELETE FROM resource_items WHERE resource = ? AND item_id = ?', [resource, id]);
        }
        await runQuery(
            'INSERT OR REPLACE INTO resource_items (resource, item_id, data, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)',
            [resource, updatedId, JSON.stringify(updatedItem)],
        );
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/:resource/:id', async (req, res) => {
    const { resource, id } = req.params;
    if (!isSupportedResource(resource)) {
        return res.status(404).json({ error: 'Unknown resource.' });
    }

    try {
        await runQuery('DELETE FROM resource_items WHERE resource = ? AND item_id = ?', [resource, id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please kill the process using it.`);
    } else {
        console.error('Server error:', err);
    }
    process.exit(1);
});
