document.addEventListener('DOMContentLoaded', () => {
  const addContactForm = document.getElementById('addContactForm');
  const contactList = document.getElementById('contactList');

  addContactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(addContactForm);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email')
    };

    try {
      const response = await fetch('/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Contact added successfully!');
        await refreshContactList();
        addContactForm.reset();
      } else {
        alert('Failed to add contact.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  async function refreshContactList() {
    try {
      const response = await fetch('/contacts');
      if (response.ok) {
        const contacts = await response.json();
        displayContacts(contacts);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function displayContacts(contacts) {
    contactList.innerHTML = '';
    contacts.forEach(contact => {
      const contactDiv = document.createElement('div');
      contactDiv.textContent = `Name: ${contact.name}, Phone: ${contact.phone}, Email: ${contact.email}`;
      contactList.appendChild(contactDiv);
    });
  }

  refreshContactList();
});
