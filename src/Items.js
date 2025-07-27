import React, { useState, useEffect } from 'react';
import './Login.css'; 

function Items() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch items on component mount

  useEffect(() => {
  fetch('/api/items')
    .then(res => res.json())
    .then(data => {
      setItems(data);
    });
}, []);

  // Create item

 const handleAdd = () => {
  setErrorMessage(''); // Clear previous errors

  if (!name || !email) {
    setErrorMessage('Name and Email are required');
    return;
  }

  fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email }),
  })
    .then(async res => {
      if (!res.ok) {
        const error = await res.json();
        setErrorMessage(error.message || 'Failed to add item');
        return null;
      }
      return res.json();
    })
    .then(item => {
      if (item) {
        setItems([...items, item]);
        setName('');
        setEmail('');
      }
    })
    .catch(err => {
      setErrorMessage('Network error. Please try again.');
      console.error(err);
    });
};
;



  // Update item
  const handleEdit = (id, currentName, currentEmail) => {
    const newName = prompt('Edit name:', currentName);
    const newEmail = prompt('Edit email:', currentEmail);
    if (newName && newEmail) {
      fetch(`/api/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, email: newEmail }),
      })
        .then(res => res.json())
        .then(updated => {
          setItems(items.map(item => (item._id === id ? updated : item)));
        });
    }
  };

  // Delete item
  const handleDelete = (id) => {
    fetch(`/api/items/${id}`, { method: 'DELETE' })
      .then(() => setItems(items.filter(item => item._id !== id)));
  };

  return (
    <div>
      <h2>Name</h2>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
      />
      <h2>Email</h2>
      <input
        value={email}
        type='email'
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required="true" 
        errorMessage="Please enter a valid email"
      />
      <br/>
      <span className='error-message'>{errorMessage}</span>
      <br />
      <button className='itembutton' onClick={handleAdd}>Add</button>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            Name: {item.name} Email: {item.email}
            <span
              style={{ color: 'blue', cursor: 'pointer', marginLeft: 10 }}
              onClick={() => handleEdit(item._id, item.name, item.email)}
            >
              Edit
            </span>
            <span
              style={{ color: 'red', cursor: 'pointer', marginLeft: 10 }}
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Items;