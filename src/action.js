import { medicinesList, renderFilterList, renderMedicinesList } from "./ui.js";



export function applyFilter() {
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

    export function deleteMedicines(index) {
      medicinesList.splice(index, 1);
      localStorage.setItem('medicinesList', JSON.stringify(medicinesList));
      renderMedicinesList();
      applyFilter();
    };
        
    export function editMedicines(index) {
      console.log(medicinesList)
      const medicinesToEdit = medicinesList[index];
      populateInputFields(medicinesToEdit);
      medicinesList.splice(index, 1);
      renderMedicinesList();
      applyFilter();
    }
  
  
  
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



  export function addMedicines() {
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
  