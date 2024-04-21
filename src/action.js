

import { medicinesList, saveToStorage, renderFilterList, renderMedicinesList, checkDueDates } from "./ui.js";




const nameInputElement = document.getElementById('nameInput');
const dateInputElement = document.getElementById('dateInput');
const descriptionInputElement = document.getElementById('descriptionInput');
const quantityInputElement = document.getElementById('quantityInput');
const imageInputElement = document.getElementById('imageInput');
const speechButton = document.querySelector('.js-speech-button');

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
    checkDueDates();
    applyFilter();

  }
        
  export function editMedicines(index) {
    
    const medicinesToEdit = medicinesList[index];

    populateInputFields(medicinesToEdit);
    console.log('populate:', medicinesToEdit);
    deleteMedicines(index);
    checkDueDates();
    
    
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
  


  
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const imageUrl = e.target.result;
        medicinesList.push({ name, dueDate, description, imageUrl, quantity });
        saveToStorage();
        resetInputFields();
        renderMedicinesList();
        checkDueDates();
      };
      reader.readAsDataURL(imageFile);
    }
  }


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


function populateInputFieldsFromSpeech(transcript) {
  const nameInputElement = document.getElementById('nameInput');
  const dateInputElement = document.getElementById('dateInput');
  const descriptionInputElement = document.getElementById('descriptionInput');
  const quantityInputElement = document.getElementById('quantityInput');

  const nameFilterElement = document.getElementById('filterNameInput');
  const dateFilterElement = document.getElementById('filterDateInput');


  if (transcript.includes('filter brand name')) {
    const brandName = extractValue(transcript, 'filter brand name');
    nameFilterElement.value = brandName;
    
  } else if (transcript.includes('filter due date')) {
    const dueDate = extractValue(transcript, 'filter due date');
    dateFilterElement.value = convertDueDate(transcript);
    if (formattedDueDate) {
      dateInputElement.value = formattedDueDate; // Set the formatted due date
    } else {
      console.error('Invalid due date format detected in transcript:', dueDate);
      // Handle the case where the due date format is invalid
    }
   
  } else {


  if (transcript.includes('brand name')) {
    const brandName = extractValue(transcript, 'brand name');
    nameInputElement.value = brandName;
  }
    if (transcript.includes('due date')) {
      const dueDate = extractValue(transcript, 'due date');
      const formattedDueDate = convertDueDate(transcript); // Call convertDueDate function
      if (formattedDueDate) {
        dateInputElement.value = formattedDueDate; // Set the formatted due date
      } else {
        console.error('Invalid due date format detected in transcript:', dueDate);
        // Handle the case where the due date format is invalid
      }

    }
       

  }

  if (transcript.includes('quantity')) {
    const quantity = extractValue(transcript, 'quantity');
    quantityInputElement.value = quantity;
  }
  if (transcript.includes('description')) {
    const description = extractValue(transcript, 'description');
    descriptionInputElement.value = description;
  }

  
}


function extractValue(text, keyword) {
  const keywordIndex = text.indexOf(keyword);
  if (keywordIndex !== -1) {
    const value = text.slice(keywordIndex + keyword.length).trim();
    return value;
  }
  return '';

  
}




function convertDueDate(transcript) {

  const dateRegex = /(\d{1,2})(?:st|nd|rd|th)?\s*(?:of)?\s*(january|february|march|april|may|june|july|august|september|october|november|december)\s*(\d{2,4})/i;

 
  const match = transcript.match(dateRegex);
  if (match) {
    const day = parseInt(match[1]);
    const monthName = match[2];
    const year = parseInt(match[3]);

    
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    const monthIndex = months.indexOf(monthName.toLowerCase()) + 1;

    
    if (!isNaN(day) && !isNaN(monthIndex) && !isNaN(year)) {
      
      const date = new Date(year, monthIndex - 1, day);
      return date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
    } else {
      alert('Invalid month name detected in the transcript.');
      return null;
    }
  } else {
    alert('The transcript does not consist of a complete date (day, month, and year).');
    return null;
  }

 
  };




  

  
    
  
  

