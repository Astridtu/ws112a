document.addEventListener('DOMContentLoaded', () => {
  const addContactForm = document.getElementById('addContactForm');
  const contactList = document.getElementById('contactList');

  const ws = new WebSocket('ws://localhost:8080'); 

  addContactForm.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(addContactForm);
    const data = {
      type: 'add_contact',
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email')
    };

    ws.send(JSON.stringify(data));
  });

  ws.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    updateContactList(message);
  });

  function updateContactList(data) {
    const contactDiv = document.createElement('div');
    contactDiv.textContent = `Name: ${data.name}, Phone: ${data.phone}, Email: ${data.email}`;
    contactList.appendChild(contactDiv);
  }
});
