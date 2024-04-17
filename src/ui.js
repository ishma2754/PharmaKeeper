import { applyFilter, deleteMedicines, editMedicines, addMedicines } from "./action.js";

export const medicinesList = JSON.parse(localStorage.getItem('medicinesList')) || [];

renderMedicinesList();



document.querySelector('.js-filter-button').addEventListener('click', () => {
  applyFilter();
});



export function renderFilterList(filteredMedicines = medicinesList) {
  
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




function renderSummary(medicinesList) {
  const totalMedicines = medicinesList.length;
  document.querySelector('.js-total-medicines').textContent = totalMedicines;
  function renderSummary(medicinesList) {
    const totalMedicines = medicinesList.length;
    document.querySelector('.js-total-medicines').textContent = totalMedicines;
  
    const earliestMedicines = findEarliestDueMedicines(medicinesList);
    if (earliestMedicines) {
      

      document.querySelector('.js-earliest-expiry').innerHTML = `Earliest Expiry:   <span class="earliest-name">${earliestMedicines.name}</span>, Due on: <span class="earliest-date">${earliestMedicines.dueDate}</span>`;
     
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
  
  renderSummary(medicinesList);
}

export function renderMedicinesList() {
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


 document.querySelectorAll('.js-delete-medicines-button')
   .forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      deleteMedicines(index);
    });
   });


 
 
   document.querySelectorAll('.js-edit-medicines-button').forEach((editButton, index) => {
    editButton.addEventListener('click', () => {
      editMedicines(index);
    });
  });
  
}

document.querySelector('.js-add-medicines-button')
 .addEventListener('click', () => {
    addMedicines();
 });
