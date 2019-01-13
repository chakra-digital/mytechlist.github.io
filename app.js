// Tech Class: Represents a Tech
class Tech {
    constructor(name, developer, website ){
        this.name = name;
        this.developer = developer;
        this.website = website;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayTech() {
        const techs = Store.getTechs();

        techs.forEach((tech) => UI.addTechToList(tech));
    }

    static addTechToList(tech) {
        const list = document.querySelector('#tech-list');

        const row = document.createElement('tr');

        row.innerHTML = ` 
          <td>${tech.name}</td>
          <td>${tech.developer}</td>
          <td>${tech.website}</td>
          <td><a href="#" class="btn btn-warning btn-sm 
          delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteTech(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove()
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#tech-form');
        container.insertBefore(div, form);
        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(),3000);
    }

    static clearFields() {
        document.querySelector('#name').value = '';
        document.querySelector('#developer').value = '';
        document.querySelector('#website').value = '';
    }
}

// Store Class: Handles Storage
class Store {
    static getTechs() {
     let techs;
     if(localStorage.getItem('techs') === null) {
       techs = [];
     } else {
         techs = JSON.parse(localStorage.getItem('techs'));
     }

     return techs;
    }

    static addTech(tech) {
        const techs = Store.getTechs();

        techs.push(tech);

        localStorage.setItem('techs', JSON.stringify(techs));
    }

    static removeTech(website) {
        const techs = Store.getTechs();

        techs.forEach((tech, index) => {
            if(tech.website === website) {
                techs.splice(index, 1);
            }
        });
        localStorage.setItem('techs', JSON.stringify(techs));
    }
}

// Events: Display Tech
document.addEventListener('DOMContentLoaded', UI.displayTech);

// Events: Add a Tech
document.querySelector('#tech-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
   
    // Get form values
    const name = document.querySelector('#name').value;
    const developer = document.querySelector('#developer').value;
    const website = document.querySelector('#website').value;

    // Validate
    if(name ==='' || developer ==='' ||  website ==='') {
       UI.showAlert('Please fill in all fields', 'info');
    } else {
        // Instatiate tech
        const tech = new Tech(name, developer, website);

        // Add Tech to UI
        UI.addTechToList(tech);

        // Add Tech to Store
        Store.addTech(tech);

        // Show success message
        UI.showAlert('Tech Added ✅', 'success')

        // Clear fields
        UI.clearFields();
    }
});

// Event: Remove a Tech [both UI & Store]
document.querySelector('#tech-list').addEventListener('click', (e) => {
    UI.deleteTech(e.target);

    // Remove Tech from Store
    Store.removeTech(e.target.parentElement.previousElementSibling.textContent);

     // Show success message
     UI.showAlert('Tech Removed ❎', 'warning');
});

// Powered by Chakra