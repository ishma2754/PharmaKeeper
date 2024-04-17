const medicinesList = JSON.parse(localStorage.getItem('medicinesList')) || [];

renderMedicinesList();



function applyFilter() {
  const nameFilter = document.querySelector('.js-filter-name-input').value.toLowerCase();
  const dateFilter = document.querySelector('.js-filter-date-input').value;

  const nameFilterElement = document.querySelector('.js-filter-name-input');
  const dateFilterElement = document.querySelector('.js-filter-date-input')


  const filteredMedicines = medicinesList.filter(medicines => {
    const nameMatch = medicines.name.toLowerCase().includes(nameFilter);
    const dateMatch = medicines.dueDate.includes(dateFilter); // Assuming dueDate is always present

    return nameMatch && dateMatch;});

    nameFilterElement.value = '';
    dateFilterElement.value = '';

    renderFilterList(filteredMedicines);
 

};



document.querySelector('.js-filter-button').addEventListener('click', () => {
  applyFilter();
});




function renderFilterList(filteredMedicines = medicinesList) {
  
  const filterListHTML = filteredMedicines.map((medicinesObject, index) => {
    const { name, dueDate, description, imageUrl, quantity } = medicinesObject;
    return `
      <div class="details">
      <div class="brand-name-display">${name}</div> 
      <div class="due-date-name-display">${dueDate}</div>
      <div class="description-display">${description}</div>
      <div class="image-container">${imageUrl ? `<img width="220" src="${imageUrl}" alt="medicine-Image">` : 'No Image'}</div>
      <div class="quantity-display">${quantity} quantity</div>
      </div>`;
  }).join('');



  document.querySelector('.js-filter-medicines').innerHTML = filterListHTML;

}





function renderSummary(medicinesListList) {
  const totalMedicines = medicinesList.length;
  document.querySelector('.js-total-medicines').textContent = totalMedicines;
  function renderSummary(medicinesList) {
    const totalMedicines = medicinesList.length;
    document.querySelector('.js-total-medicines').textContent = totalMedicines;
  
    const earliestMedicines = findEarliestDueMedicines(medicinesList);
    if (earliestMedicines) {
      

      document.querySelector('.js-earliest-expiry').innerHTML = `Earliest Expiry:<span class="earliest-name">${earliestMedicines.name}</span>, Due on: <span class="earliest-date">${earliestMedicines.dueDate}</span>`;
     
    } else {
      document.querySelector('.js-earliest-expiry').innerHTML = `<span class="earliest-name">No medicines found.</span>`;
    }
  }
  
  function findEarliestDueMedicines(medicinesList) {
    if (medicinesList.length === 0) {
      return null;
    }
  
    return medicinesList.reduce((earliest, currentMedicines) => {
      const earliestDueDate = new Date(earliest.dueDate);
      const currentDueDate = new Date(currentMedicines.dueDate);
      return earliestDueDate < currentDueDate ? earliest : currentMedicines;
    });
  }
  
  // Call renderSummary function in your code
  renderSummary(medicinesList);
}


function renderMedicinesList() {
  const medicinesListHTML = medicinesList.map((medicinesObject, index) => {
    const { name, dueDate, description, imageUrl, quantity  } = medicinesObject;
    return `
    <div class="details">
      <div class="brand-name-display">${name}</div> 
      <div class="due-date-name-display">${dueDate}</div>
      <div class="description-display">${description}</div>
      <div class="image-container">${imageUrl ? `<img src="${imageUrl}" alt="medicine-Image">` : 'No Image'}</div>
      <div class="quantity-display">${quantity} quantity</div>
      <button class="delete-medicines-button js-delete-medicines-button">Delete</button>
      <button class="edit-medicines-button js-edit-medicines-button">Edit</button>
    </div>
      `;
  }).join(''); 

  document.querySelector('.js-medicines-grid-display')
  .innerHTML = medicinesListHTML;

  renderSummary(medicinesList);

  //all will give us all the elements on the page that have class delete-button
  document.querySelectorAll('.js-delete-medicines-button')
   .forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      medicinesList.splice(index, 1);
      localStorage.setItem('medicinesList', JSON.stringify(medicinesList))
      renderMedicinesList();
      applyFilter();
    });
   });

   document.querySelectorAll('.js-edit-medicines-button').forEach((editButton, index) => {
    editButton.addEventListener('click', () => {
      const medicinesToEdit = medicinesList[index];
      populateInputFields(medicinesToEdit);
      medicinesList.splice(index, 1);
      renderMedicinesList();
      applyFilter();
    });
  });
  
  
  function populateInputFields(medicines) {
  const inputElement = document.querySelector('.js-name-input');
  inputElement.value = medicines.name;
  
  const dateInputElement = document.querySelector('.js-due-date-input');
  dateInputElement.value = medicines.dueDate;
  
  const descriptionInputElement = document.querySelector('.js-description-input');
  descriptionInputElement.value = medicines.description;

  const quantityInputElement = document.querySelector('.js-quantity-input');
  quantityInputElement.value = medicines.quantity;
  }

}



document.querySelector('.js-add-medicines-button')
 .addEventListener('click', () => {
    addMedicines();
 });


function addMedicines() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');

  const dueDate = dateInputElement.value;

  const descriptionInputElement = document.querySelector('.js-description-input');
  
  const description = descriptionInputElement.value;


  const imageFile = document.querySelector('.js-medicines-image-input').files[0];

  const quantityInputElement = document.querySelector('.js-quantity-input');
  const quantity = quantityInputElement.value;




  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const imageUrl = e.target.result;
      medicinesList.push({ name, dueDate, description, imageUrl, quantity });
      localStorage.setItem('medicinesList', JSON.stringify(medicinesList));
      inputElement.value = '';
      descriptionInputElement.value = '';
      dateInputElement.value = '';
      document.querySelector('.js-medicines-image-input').value = '';
      quantityInputElement.value = '';
      renderMedicinesList();
     
    };
    reader.readAsDataURL(imageFile);
  } else {
    medicinesList.push({ name, dueDate, description, imageUrl: '', quantity });
    localStorage.setItem('medicinesList', JSON.stringify(medicinesList));
    inputElement.value = '';
    descriptionInputElement.value = '';
    dateInputElement.value = '';
    document.querySelector('.js-medicines-image-input').value = '';
    quantityInputElement.value = '';
    renderMedicinesList();
   
  }
}



