document.addEventListener('DOMContentLoaded', () => {
    const addItemForm = document.getElementById('addItemForm');
    const itemsContainer = document.querySelector('.item-cards-container');
    const placeholderText = document.querySelector('.placeholder-text');

    // In-memory array to store items (will be replaced by localStorage later)
    let collection = [];

    addItemForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const itemName = document.getElementById('itemName').value;
        const itemType = document.getElementById('itemType').value;
        const itemManufacturer = document.getElementById('itemManufacturer').value;
        const itemEra = document.getElementById('itemEra').value;
        const itemNotes = document.getElementById('itemNotes').value;

        const newItem = {
            id: Date.now().toString(), // Simple unique ID
            name: itemName,
            type: itemType,
            manufacturer: itemManufacturer,
            era: itemEra,
            notes: itemNotes
        };

        collection.push(newItem);
        renderCollection(); // Update the display
        addItemForm.reset(); // Clear the form
    });

    function renderCollection() {
        itemsContainer.innerHTML = ''; // Clear existing items

        if (collection.length === 0) {
            if (placeholderText) { // Check if placeholder exists
                itemsContainer.appendChild(placeholderText); // Re-add placeholder if needed
            } else { // Or create it if it was removed completely
                const p = document.createElement('p');
                p.classList.add('placeholder-text');
                p.textContent = 'Your collection will appear here. Add your first item!';
                itemsContainer.appendChild(p);
            }
            return;
        }

        // If placeholder was part of initial HTML and we have items, ensure it's removed.
        const currentPlaceholder = itemsContainer.querySelector('.placeholder-text');
        if (currentPlaceholder) {
            currentPlaceholder.remove();
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
                <button class="btn-delete" data-id="${item.id}">Delete</button>
            `;
            itemsContainer.appendChild(card);
        });

        // Add event listeners for delete buttons
        addDeleteEventListeners();
    }

    function addDeleteEventListeners() {
        const deleteButtons = document.querySelectorAll('.btn-delete');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.getAttribute('data-id');
                collection = collection.filter(item => item.id !== itemId);
                renderCollection();
            });
        });
    }

    // --- LocalStorage for Persistence (The NEXT step after basic JS works) ---
    // We'll add functions here to save to and load from localStorage
    // e.g., saveCollectionToLocalStorage() and loadCollectionFromLocalStorage()
    // and call loadCollectionFromLocalStorage() on page load.

    // Initial render (if loading from localStorage in future)
    renderCollection();
});
