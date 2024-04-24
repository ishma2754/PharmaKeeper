import { medicinesList, saveToStorage, renderFilterList, renderMedicinesList } from "./ui.js";
import { populateInputFieldsFromSpeech} from "./utils/speechutils.js";

export const nameInputElement = document.getElementById('nameInput');
export const dateInputElement = document.getElementById('dateInput');
export const descriptionInputElement = document.getElementById('descriptionInput');
export const quantityInputElement = document.getElementById('quantityInput');
export const nameFilterElement = document.getElementById('filterNameInput');
export const dateFilterElement = document.getElementById('filterDateInput');
const filterMedicineInputDisplay = document.querySelector('.js-filter-medicines');
const imageInputElement = document.getElementById('imageInput');
const speechButton = document.querySelector('.js-speech-button');


export function applyFilter() {
  const nameFilter = nameFilterElement.value.toLowerCase();
  const dateFilter = dateFilterElement.value;

  filterMedicineInputDisplay.innerHTML = '';


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
    //checkDueDates();
    applyFilter();

  }
        
  export function editMedicines(index) {
    
    const medicinesToEdit = medicinesList[index];

    populateInputFields(medicinesToEdit);
    console.log('populate:', medicinesToEdit);
    deleteMedicines(index);
    //checkDueDates();
    
    
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

    console.log(medicinesList);
   

    const name = nameInputElement.value;
  
    const dueDate = dateInputElement.value;
    
    const description = descriptionInputElement.value;
  
    const imageFile = imageInputElement.files[0];
  
    const quantity = quantityInputElement.value;

    if (!name || !dueDate || !description || !quantity || !imageFile) {
      alert("Please fill in all the fields.");
      return; 
    }
      const reader = new FileReader();
      reader.onload = function(e) {
        const imageUrl = e.target.result;
        medicinesList.push({ name, dueDate, description, imageUrl, quantity });
        saveToStorage();
        resetInputFields();
        renderMedicinesList();
        //checkDueDates();
      };
      reader.readAsDataURL(imageFile);
    };
  


    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US'; 
    
  
    recognition.onresult = function(event) {
  
      const transcript = event.results[0][0].transcript.trim().toLowerCase();
    
      populateInputFieldsFromSpeech(transcript); 
      
      };
    
    recognition.onerror = function(event) {
      console.error('Speech recognition error:', event.error);
    };
    
    
    
    speechButton.addEventListener('click', () => {
      recognition.start();
      speechButton.classList.add('speech-button-pressed');
    });
    
    recognition.onend = function() {
     
      speechButton.classList.remove('speech-button-pressed');
    };



  

  
    
  
  

