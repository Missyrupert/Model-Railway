document.addEventListener('DOMContentLoaded', () => {
    const addItemForm = document.getElementById('addItemForm');
    const itemsContainer = document.querySelector('.item-cards-container');
    // The placeholder is managed dynamically within renderCollection

    let collection = []; // Will be populated from localStorage or initialized empty

    // --- LocalStorage Functions ---
    function saveCollectionToLocalStorage() {
        localStorage.setItem('modelRailwayCollection', JSON.stringify(collection));
    }

    function loadCollectionFromLocalStorage() {
        const storedCollection = localStorage.getItem('modelRailwayCollection');
        if (storedCollection) {
            collection = JSON.parse(storedCollection);
        } else {
            collection = []; // Ensure it's an empty array if nothing is stored
        }
    }
    // --- End LocalStorage Functions ---

    addItemForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const itemName = document.getElementById('itemName').value;
        const itemType = document.getElementById('itemType').value;
        const itemManufacturer = document.getElementById('itemManufacturer').value;
        const itemEra = document.getElementById('itemEra').value;
        const itemNotes = document.getElementById('itemNotes').value;

        const newItem = {
            id: Date.now().toString(),
            name: itemName,
            type: itemType,
            manufacturer: itemManufacturer,
            era: itemEra,
            notes: itemNotes
        };

        collection.push(newItem);
        saveCollectionToLocalStorage(); // Save after adding
        renderCollection();
        addItemForm.reset();
    });

    function renderCollection() {
        itemsContainer.innerHTML = ''; // Clear existing items

        if (collection.length === 0) {
            const p = document.createElement('p');
            p.classList.add('placeholder-text');
            p.textContent = 'Your collection will appear here. Add your first item!';
            itemsContainer.appendChild(p);
            return;
        }

        collection.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('item-card');

            card.innerHTML = `
                <h3>${item.name}</h3>
                <p><span class="label">Type:</span> ${item.type}</p>
                <p><span class="label">Manufacturer:</span> ${item.manufacturer}</p>
                <p><span class="label">Era:</span> ${item.era}</p>
                ${item.notes ? `<p><span class="label">Notes:</span> ${item.notes}</p>` : ''}
                <button class="btn btn-delete" data-id="${item.id}">Delete</button> 
            `; // Added "btn" class for base styling too
            itemsContainer.appendChild(card);
        });

        addDeleteEventListeners();
    }

    function addDeleteEventListeners() {
        const deleteButtons = document.querySelectorAll('.btn-delete');
        deleteButtons.forEach(button => {
            // Remove existing listener to prevent duplicates if renderCollection is called multiple times
            button.replaceWith(button.cloneNode(true)); 
        });
        // Re-query after cloning
        document.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.getAttribute('data-id');
                collection = collection.filter(item => item.id !== itemId);
                saveCollectionToLocalStorage(); // Save after deleting
                renderCollection();
            });
        });
    }

    // --- Initial Load and Render ---
    loadCollectionFromLocalStorage();
    renderCollection(); // Display whatever was loaded (or the placeholder)
});
