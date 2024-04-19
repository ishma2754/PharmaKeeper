

import { medicinesList, saveToStorage, renderFilterList, renderMedicinesList } from "./ui.js";




const nameInputElement = document.getElementById('nameInput');
const dateInputElement = document.getElementById('dateInput');
const descriptionInputElement = document.getElementById('descriptionInput');
const quantityInputElement = document.getElementById('quantityInput');
const imageInputElement = document.getElementById('imageInput');

const nameFilterElement = document.getElementById('filterNameInput');
const dateFilterElement = document.getElementById('filterDateInput');


export function applyFilter() {
  const nameFilter = nameFilterElement.value.toLowerCase();
  const dateFilter = dateFilterElement.value;


  const filteredMedicines = medicinesList.filter(medicines => {
    const nameMatch = medicines.name.toLowerCase().includes(nameFilter);
    const dateMatch = medicines.dueDate.includes(dateFilter); 

    return nameMatch && dateMatch;});

    nameFilterElement.value = '';
    dateFilterElement.value = '';

    renderFilterList(filteredMedicines);
 };

  export  function deleteMedicines (index) {
    console.log('delete button:', medicinesList);
    medicinesList.splice(index, 1);
    saveToStorage();
    renderMedicinesList();
    applyFilter();
  }
        
  export function editMedicines(index) {
    console.log('edit button:', medicinesList);
    const medicinesToEdit = medicinesList[index];
    console.log('edit button:', medicinesToEdit);

    populateInputFields(medicinesToEdit);
    console.log('populate:', medicinesToEdit);
    deleteMedicines(index);
    
    function populateInputFields(medicines) {
      nameInputElement.value = medicines.name;
      
      dateInputElement.value = medicines.dueDate;
      
      descriptionInputElement.value = medicines.description;

      quantityInputElement.value = medicines.quantity;
    }


  };



  function resetInputFields() {
    nameInputElement.value = '';
    descriptionInputElement.value = '';
    dateInputElement.value = '';
    imageInputElement.value = '';
    quantityInputElement.value = '';
  }


  export function addMedicines() {
   

    const name = nameInputElement.value;
  
    const dueDate = dateInputElement.value;
    
    const description = descriptionInputElement.value;
  
    const imageFile = imageInputElement.files[0];
  
    const quantity = quantityInputElement.value;
  
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const imageUrl = e.target.result;
        medicinesList.push({ name, dueDate, description, imageUrl, quantity });
        saveToStorage();
        resetInputFields();
        renderMedicinesList();
       
      };
      reader.readAsDataURL(imageFile);
    } else {
      medicinesList.push({ name, dueDate, description, imageUrl: '', quantity });
      saveToStorage();
      resetInputFields();
      renderMedicinesList();
     
    }
  }
  

