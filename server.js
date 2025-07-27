const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Simple in-memory user store for authentication
const USERS = [{ username: 'admin', password: 'password123' }];

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(u => u.username === username && u.password === password);

  if (user) {
    res.status(200).json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});



// In-memory items array for demo purposes
let items = [];
let id = 1;

// GET all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// CREATE an item
// app.post('/api/items', (req, res) => {
//     if (!req.body.email.includes('@') || !req.body.email.includes('.')) {
//   return res.status(400).json({ message: 'Invalid email format' });
//   alert('Invalid email format');
//   return;
// }


//   const item = { _id: id++, name: req.body.name, email: req.body.email };
//   items.push(item);
//   res.json(item); 
// });

app.post('/api/items', (req, res) => {
  const { name, email } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'Name is required' });
  }

  if (!email || !email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  const item = { _id: id++, name, email };
  items.push(item);
  res.json(item);
});

// UPDATE an item
app.put('/api/items/:id', (req, res) => {
  const { name, email } = req.body;

  // Validate inputs
  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'Name is required' });
  }

  if (!email || !email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  const item = items.find(i => i._id == req.params.id);

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  // Update item fields
  item.name = name;
  item.email = email;

  res.json(item);
});



//Old code for reference
// // UPDATE an item
// app.put('/api/items/:id', (req, res) => {
//   const item = items.find(i => i._id == req.params.id);
//   if (item) {
//     item.name = req.body.name;
//     item.email = req.body.email;
//     res.json(item);
//   } else {
//     res.status(404).send();
//   }
// });

// DELETE an item
app.delete('/api/items/:id', (req, res) => {
  items = items.filter(i => i._id != req.params.id);
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));