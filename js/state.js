// Wizard State Management
const STORAGE_KEY = 'wizard_pet_food_data';
let currentStep = 1;
const totalSteps = 4;

const formData = {
    businessName: '',
    description: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    hours: {},
    deliveryMethods: [],
    paymentMethods: [],
    categories: [],
    primaryColor: '#a855f7',
    secondaryColor: '#ec4899',
    logo: null
};

const daysOfWeek = [
    { key: 'monday', label: 'Segunda-feira' },
    { key: 'tuesday', label: 'Terça-feira' },
    { key: 'wednesday', label: 'Quarta-feira' },
    { key: 'thursday', label: 'Quinta-feira' },
    { key: 'friday', label: 'Sexta-feira' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' }
];

// Load data from localStorage
function loadFromStorage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const data = JSON.parse(saved);
            Object.assign(formData, data);
        } catch (e) {
            console.error('Error loading saved data:', e);
        }
    }
}

// Save data to localStorage
function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// Update form data
function updateFormData(field, value) {
    formData[field] = value;
    saveToStorage();
}
