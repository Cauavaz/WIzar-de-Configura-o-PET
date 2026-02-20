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

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadFromStorage();
    initializeHours();
    setupEventListeners();
    updateStepIndicator();
    populateFormFields();
    setupSidebar();
    updateProgress();
});

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

// Initialize hours with default values
function initializeHours() {
    if (Object.keys(formData.hours).length === 0) {
        daysOfWeek.forEach(day => {
            formData.hours[day.key] = {
                open: '09:00',
                close: '18:00',
                closed: day.key === 'sunday'
            };
        });
    }
    renderHours();
}

// Render hours section
function renderHours() {
    const container = document.getElementById('hours-container');
    container.innerHTML = '';
    
    daysOfWeek.forEach(day => {
        const dayData = formData.hours[day.key];
        const div = document.createElement('div');
        div.className = 'bg-gray-50 rounded-xl p-4';
        div.innerHTML = `
            <div class="flex items-center gap-3 mb-3">
                <input type="checkbox" id="day-${day.key}" ${!dayData.closed ? 'checked' : ''} 
                    class="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500 cursor-pointer">
                <label for="day-${day.key}" class="font-semibold text-gray-700 cursor-pointer">${day.label}</label>
            </div>
            <div id="hours-${day.key}" class="${dayData.closed ? 'hidden' : ''} flex gap-3">
                <div class="flex-1">
                    <label class="text-xs text-gray-600">Abre:</label>
                    <input type="time" id="open-${day.key}" value="${dayData.open}" 
                        class="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-500 outline-none">
                </div>
                <div class="flex-1">
                    <label class="text-xs text-gray-600">Fecha:</label>
                    <input type="time" id="close-${day.key}" value="${dayData.close}" 
                        class="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-500 outline-none">
                </div>
            </div>
            <div id="closed-${day.key}" class="${!dayData.closed ? 'hidden' : ''} text-gray-500 italic">Fechado</div>
        `;
        container.appendChild(div);
        
        // Event listeners for this day
        document.getElementById(`day-${day.key}`).addEventListener('change', function(e) {
            formData.hours[day.key].closed = !e.target.checked;
            document.getElementById(`hours-${day.key}`).classList.toggle('hidden');
            document.getElementById(`closed-${day.key}`).classList.toggle('hidden');
            saveToStorage();
        });
        
        document.getElementById(`open-${day.key}`).addEventListener('change', function(e) {
            formData.hours[day.key].open = e.target.value;
            saveToStorage();
        });
        
        document.getElementById(`close-${day.key}`).addEventListener('change', function(e) {
            formData.hours[day.key].close = e.target.value;
            saveToStorage();
        });
    });
}

// Setup all event listeners
function setupEventListeners() {
    // Navigation buttons
    document.getElementById('prev-btn').addEventListener('click', previousStep);
    document.getElementById('next-btn').addEventListener('click', nextStep);
    document.getElementById('publish-btn').addEventListener('click', publishSite);
    
    // Step 1: Basic Info
    ['businessName', 'description', 'phone', 'whatsapp', 'email', 'address'].forEach(field => {
        const element = document.getElementById(field);
        element.addEventListener('input', function(e) {
            formData[field] = e.target.value;
            clearError(element);
            saveToStorage();
        });
    });
    
    // Step 3: Delivery methods
    document.querySelectorAll('.delivery-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const value = this.dataset.value;
            const index = formData.deliveryMethods.indexOf(value);
            
            if (index > -1) {
                formData.deliveryMethods.splice(index, 1);
                this.classList.remove('border-purple-500', 'bg-purple-50');
                this.classList.add('border-gray-300');
            } else {
                formData.deliveryMethods.push(value);
                this.classList.remove('border-gray-300');
                this.classList.add('border-purple-500', 'bg-purple-50');
            }
            
            clearError(document.getElementById('delivery-error'));
            saveToStorage();
        });
    });
    
    // Step 3: Payment methods
    document.querySelectorAll('.payment-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const value = this.dataset.value;
            const index = formData.paymentMethods.indexOf(value);
            
            if (index > -1) {
                formData.paymentMethods.splice(index, 1);
                this.classList.remove('border-purple-500', 'bg-purple-50');
                this.classList.add('border-gray-300');
            } else {
                formData.paymentMethods.push(value);
                this.classList.remove('border-gray-300');
                this.classList.add('border-purple-500', 'bg-purple-50');
            }
            
            clearError(document.getElementById('payment-error'));
            saveToStorage();
        });
    });
    
    // Step 3: Categories
    document.getElementById('add-category').addEventListener('click', addCategory);
    document.getElementById('category-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addCategory();
        }
    });
    
    // Step 4: Logo upload
    document.getElementById('logo-upload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                formData.logo = event.target.result;
                document.getElementById('logo-image').src = event.target.result;
                document.getElementById('logo-preview').classList.remove('hidden');
                document.getElementById('logo-placeholder').classList.add('hidden');
                saveToStorage();
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Step 4: Colors
    const primaryColor = document.getElementById('primary-color');
    const primaryColorText = document.getElementById('primary-color-text');
    const secondaryColor = document.getElementById('secondary-color');
    const secondaryColorText = document.getElementById('secondary-color-text');
    
    primaryColor.addEventListener('input', function(e) {
        const color = e.target.value;
        formData.primaryColor = color;
        primaryColorText.value = color;
        document.getElementById('primary-preview').style.backgroundColor = color;
        saveToStorage();
    });
    
    primaryColorText.addEventListener('input', function(e) {
        const color = e.target.value;
        if (/^#[0-9A-F]{6}$/i.test(color)) {
            formData.primaryColor = color;
            primaryColor.value = color;
            document.getElementById('primary-preview').style.backgroundColor = color;
            saveToStorage();
        }
    });
    
    secondaryColor.addEventListener('input', function(e) {
        const color = e.target.value;
        formData.secondaryColor = color;
        secondaryColorText.value = color;
        document.getElementById('secondary-preview').style.backgroundColor = color;
        saveToStorage();
    });
    
    secondaryColorText.addEventListener('input', function(e) {
        const color = e.target.value;
        if (/^#[0-9A-F]{6}$/i.test(color)) {
            formData.secondaryColor = color;
            secondaryColor.value = color;
            document.getElementById('secondary-preview').style.backgroundColor = color;
            saveToStorage();
        }
    });
}

// Populate form fields from saved data
function populateFormFields() {
    // Basic info
    document.getElementById('businessName').value = formData.businessName || '';
    document.getElementById('description').value = formData.description || '';
    document.getElementById('phone').value = formData.phone || '';
    document.getElementById('whatsapp').value = formData.whatsapp || '';
    document.getElementById('email').value = formData.email || '';
    document.getElementById('address').value = formData.address || '';
    
    // Delivery methods
    formData.deliveryMethods.forEach(method => {
        const btn = document.querySelector(`.delivery-option[data-value="${method}"]`);
        if (btn) {
            btn.classList.remove('border-gray-300');
            btn.classList.add('border-purple-500', 'bg-purple-50');
        }
    });
    
    // Payment methods
    formData.paymentMethods.forEach(method => {
        const btn = document.querySelector(`.payment-option[data-value="${method}"]`);
        if (btn) {
            btn.classList.remove('border-gray-300');
            btn.classList.add('border-purple-500', 'bg-purple-50');
        }
    });
    
    // Categories
    renderCategories();
    
    // Logo
    if (formData.logo) {
        document.getElementById('logo-image').src = formData.logo;
        document.getElementById('logo-preview').classList.remove('hidden');
        document.getElementById('logo-placeholder').classList.add('hidden');
    }
    
    // Colors
    document.getElementById('primary-color').value = formData.primaryColor;
    document.getElementById('primary-color-text').value = formData.primaryColor;
    document.getElementById('secondary-color').value = formData.secondaryColor;
    document.getElementById('secondary-color-text').value = formData.secondaryColor;
    document.getElementById('primary-preview').style.backgroundColor = formData.primaryColor;
    document.getElementById('secondary-preview').style.backgroundColor = formData.secondaryColor;
}

// Add category
function addCategory() {
    const input = document.getElementById('category-input');
    const value = input.value.trim();
    
    if (value && !formData.categories.includes(value)) {
        formData.categories.push(value);
        input.value = '';
        renderCategories();
        clearError(document.getElementById('categories-error'));
        saveToStorage();
    }
}

// Render categories
function renderCategories() {
    const container = document.getElementById('categories-list');
    container.innerHTML = '';
    
    formData.categories.forEach((category, index) => {
        const tag = document.createElement('span');
        tag.className = 'category-tag inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-medium';
        tag.innerHTML = `
            ${category}
            <button type="button" class="hover:bg-purple-200 rounded-full p-1 transition-all" onclick="removeCategory(${index})">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        `;
        container.appendChild(tag);
    });
}

// Remove category
function removeCategory(index) {
    formData.categories.splice(index, 1);
    renderCategories();
    saveToStorage();
}

// Validation
function validateStep(step) {
    clearAllErrors();
    let isValid = true;
    
    if (step === 1) {
        if (!formData.businessName.trim()) {
            showError('businessName', 'Nome do estabelecimento é obrigatório');
            isValid = false;
        }
        
        if (!formData.description.trim()) {
            showError('description', 'Descrição é obrigatória');
            isValid = false;
        }
        
        if (!formData.phone.trim()) {
            showError('phone', 'Telefone é obrigatório');
            isValid = false;
        }
        
        if (!formData.whatsapp.trim()) {
            showError('whatsapp', 'WhatsApp é obrigatório');
            isValid = false;
        }
        
        if (!formData.email.trim()) {
            showError('email', 'E-mail é obrigatório');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            showError('email', 'E-mail inválido');
            isValid = false;
        }
        
        if (!formData.address.trim()) {
            showError('address', 'Endereço/região é obrigatório');
            isValid = false;
        }
    }
    
    if (step === 3) {
        if (formData.deliveryMethods.length === 0) {
            showError('delivery-error', 'Selecione ao menos uma forma de entrega');
            isValid = false;
        }
        
        if (formData.paymentMethods.length === 0) {
            showError('payment-error', 'Selecione ao menos um método de pagamento');
            isValid = false;
        }
        
        if (formData.categories.length === 0) {
            showError('categories-error', 'Adicione ao menos uma categoria de produto');
            isValid = false;
        }
    }
    
    return isValid;
}

// Show error message
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        if (field.tagName === 'INPUT' || field.tagName === 'TEXTAREA') {
            field.classList.add('border-red-500');
            const errorMsg = field.parentElement.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.textContent = message;
                errorMsg.classList.remove('hidden');
            }
        } else {
            field.textContent = message;
            field.classList.remove('hidden');
        }
    }
}

// Clear error for specific field
function clearError(field) {
    if (field) {
        if (field.tagName === 'INPUT' || field.tagName === 'TEXTAREA') {
            field.classList.remove('border-red-500');
            const errorMsg = field.parentElement.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.classList.add('hidden');
            }
        } else {
            field.classList.add('hidden');
        }
    }
}

// Clear all errors
function clearAllErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('input, textarea').forEach(el => el.classList.remove('border-red-500'));
}

// Navigation
function nextStep() {
    if (currentStep === totalSteps) {
        showSummary();
        updateProgress();
        return;
    }
    
    if (validateStep(currentStep)) {
        currentStep++;
        updateStepDisplay();
        updateSidebarActive();
        updateProgress();
    }
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
        updateSidebarActive();
        updateProgress();
    }
}

function updateStepDisplay() {
    // Hide all steps
    document.querySelectorAll('.step-content').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show current step
    if (currentStep <= totalSteps) {
        document.getElementById(`step-${currentStep}`).classList.add('active');
        document.getElementById('summary').classList.remove('active');
        document.getElementById('next-btn').classList.remove('hidden');
        document.getElementById('publish-btn').classList.add('hidden');
    }
    
    // Update buttons
    document.getElementById('prev-btn').disabled = currentStep === 1;
    
    // Update indicator
    updateStepIndicator();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateStepIndicator() {
    for (let i = 1; i <= totalSteps; i++) {
        const indicator = document.getElementById(`step-indicator-${i}`);
        const circle = indicator.querySelector('.step-circle');
        const label = indicator.querySelector('span');
        
        // Get the line after this step (if exists)
        let nextLine = null;
        if (i < totalSteps) {
            const nextIndicator = document.getElementById(`step-indicator-${i + 1}`);
            if (nextIndicator && nextIndicator.parentElement) {
                const lines = nextIndicator.parentElement.querySelectorAll('.h-1');
                if (lines.length > 0) {
                    nextLine = Array.from(lines).find(l => l.classList.contains('h-1'));
                }
            }
        }
        
        if (i < currentStep) {
            // Completed
            circle.className = 'step-circle w-16 h-16 rounded-full bg-white text-purple-600 flex items-center justify-center font-bold text-xl ring-4 ring-purple-300 transition-all shadow-lg';
            circle.innerHTML = '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>';
            if (label) label.className = 'text-sm font-bold text-white text-center';
            // Make line white for completed steps
            if (nextLine) nextLine.className = 'flex-1 h-1 bg-white rounded transition-all mt-8';
        } else if (i === currentStep) {
            // Current
            circle.className = 'step-circle w-16 h-16 rounded-full bg-white text-purple-600 flex items-center justify-center font-bold text-xl ring-4 ring-purple-300 transition-all shadow-lg';
            circle.textContent = i;
            if (label) label.className = 'text-sm font-bold text-white text-center';
            // Keep line purple for current step
            if (nextLine) nextLine.className = 'flex-1 h-1 bg-purple-400 rounded transition-all mt-8';
        } else {
            // Future
            circle.className = 'step-circle w-16 h-16 rounded-full bg-purple-400 text-white flex items-center justify-center font-bold text-xl transition-all shadow-lg';
            circle.textContent = i;
            if (label) label.className = 'text-sm font-bold text-white text-center';
            // Keep line purple for future steps
            if (nextLine) nextLine.className = 'flex-1 h-1 bg-purple-400 rounded transition-all mt-8';
        }
    }
}

// Show summary
function showSummary() {
    const deliveryLabels = {
        'own': 'Delivery Próprio',
        'third-party': 'Delivery Terceiros',
        'pickup': 'Retirada no Local'
    };
    
    const paymentLabels = {
        'cash': 'Dinheiro',
        'debit': 'Cartão de Débito',
        'credit': 'Cartão de Crédito',
        'pix': 'PIX',
        'voucher': 'Vale Alimentação'
    };
    
    const daysLabels = {
        monday: 'Segunda',
        tuesday: 'Terça',
        wednesday: 'Quarta',
        thursday: 'Quinta',
        friday: 'Sexta',
        saturday: 'Sábado',
        sunday: 'Domingo'
    };
    
    let hoursHTML = '';
    Object.entries(formData.hours).forEach(([day, hours]) => {
        hoursHTML += `
            <div class="flex justify-between items-center">
                <span class="font-medium text-gray-700">${daysLabels[day]}:</span>
                <span class="text-gray-600">
                    ${hours.closed ? '<span class="text-red-600">Fechado</span>' : `${hours.open} - ${hours.close}`}
                </span>
            </div>
        `;
    });
    
    const summaryHTML = `
        <div class="bg-purple-50 rounded-2xl p-6 mb-6">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                    Informações Básicas
                </h3>
                <button onclick="editStep(1)" class="text-purple-600 hover:text-purple-700 flex items-center gap-1 text-sm font-semibold">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Editar
                </button>
            </div>
            <div class="grid md:grid-cols-2 gap-4">
                <div>
                    <p class="text-sm text-gray-600">Nome</p>
                    <p class="font-semibold text-gray-800">${formData.businessName}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-600">E-mail</p>
                    <p class="font-semibold text-gray-800">${formData.email}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-600">Telefone</p>
                    <p class="font-semibold text-gray-800">${formData.phone}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-600">WhatsApp</p>
                    <p class="font-semibold text-gray-800">${formData.whatsapp}</p>
                </div>
                <div class="md:col-span-2">
                    <p class="text-sm text-gray-600">Descrição</p>
                    <p class="font-semibold text-gray-800">${formData.description}</p>
                </div>
                <div class="md:col-span-2">
                    <p class="text-sm text-gray-600">Endereço/Região</p>
                    <p class="font-semibold text-gray-800">${formData.address}</p>
                </div>
            </div>
        </div>

        <div class="bg-purple-50 rounded-2xl p-6 mb-6">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Horários
                </h3>
                <button onclick="editStep(2)" class="text-primary-600 hover:text-primary-700 flex items-center gap-1 text-sm font-semibold">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Editar
                </button>
            </div>
            <div class="grid md:grid-cols-2 gap-3">
                ${hoursHTML}
            </div>
        </div>

        <div class="bg-purple-50 rounded-2xl p-6 mb-6">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/>
                    </svg>
                    Entrega e Pagamento
                </h3>
                <button onclick="editStep(3)" class="text-primary-600 hover:text-primary-700 flex items-center gap-1 text-sm font-semibold">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Editar
                </button>
            </div>
            <div class="space-y-4">
                <div>
                    <p class="text-sm text-gray-600 mb-2">Formas de Entrega</p>
                    <div class="flex flex-wrap gap-2">
                        ${formData.deliveryMethods.map(m => `<span class="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">${deliveryLabels[m]}</span>`).join('')}
                    </div>
                </div>
                <div>
                    <p class="text-sm text-gray-600 mb-2">Métodos de Pagamento</p>
                    <div class="flex flex-wrap gap-2">
                        ${formData.paymentMethods.map(m => `<span class="px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-semibold">${paymentLabels[m]}</span>`).join('')}
                    </div>
                </div>
                <div>
                    <p class="text-sm text-gray-600 mb-2">Categorias</p>
                    <div class="flex flex-wrap gap-2">
                        ${formData.categories.map(c => `<span class="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">${c}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-pink-50 rounded-2xl p-6">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                    </svg>
                    Identidade Visual
                </h3>
                <button onclick="editStep(4)" class="text-primary-600 hover:text-primary-700 flex items-center gap-1 text-sm font-semibold">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Editar
                </button>
            </div>
            <div class="flex flex-col md:flex-row gap-6">
                ${formData.logo ? `
                    <div class="w-40 h-40 border-2 border-gray-300 rounded-xl p-4 flex items-center justify-center bg-white">
                        <img src="${formData.logo}" alt="Logo" class="max-w-full max-h-full object-contain">
                    </div>
                ` : ''}
                <div class="flex-1">
                    <div class="flex gap-6 items-center">
                        <div>
                            <p class="text-sm text-gray-600 mb-2">Cor Primária</p>
                            <div class="flex items-center gap-2">
                                <div class="w-16 h-16 rounded-xl border-2 border-gray-300 shadow-lg" style="background-color: ${formData.primaryColor}"></div>
                                <span class="font-mono text-sm font-semibold text-gray-700">${formData.primaryColor}</span>
                            </div>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600 mb-2">Cor Secundária</p>
                            <div class="flex items-center gap-2">
                                <div class="w-16 h-16 rounded-xl border-2 border-gray-300 shadow-lg" style="background-color: ${formData.secondaryColor}"></div>
                                <span class="font-mono text-sm font-semibold text-gray-700">${formData.secondaryColor}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-8 p-6 bg-purple-100 border-2 border-purple-300 rounded-2xl">
            <p class="text-purple-900 text-center text-lg">
                <strong>🎉 Tudo pronto!</strong> Clique em "Publicar Site" para finalizar.
            </p>
        </div>
    `;
    
    document.getElementById('summary-content').innerHTML = summaryHTML;
    document.getElementById('summary').classList.add('active');
    document.querySelectorAll('.step-content').forEach(step => {
        if (step.id !== 'summary') step.classList.remove('active');
    });
    
    document.getElementById('next-btn').classList.add('hidden');
    document.getElementById('publish-btn').classList.remove('hidden');
    
    // Update all step indicators to completed
    for (let i = 1; i <= totalSteps; i++) {
        const indicator = document.getElementById(`step-indicator-${i}`);
        const circle = indicator.querySelector('.step-circle');
        const label = indicator.querySelector('span');
        
        circle.className = 'step-circle w-12 h-12 rounded-full bg-white text-primary-600 flex items-center justify-center font-bold text-lg transition-all';
        circle.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>';
        if (label) label.className = 'mt-2 text-sm font-medium text-white hidden md:block';
        
        const line = indicator.querySelector('.step-line');
        if (line) line.className = 'step-line h-1 flex-1 mx-2 bg-white rounded transition-all';
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Edit step from summary
function editStep(step) {
    currentStep = step;
    updateStepDisplay();
    updateSidebarActive();
    updateProgress();
}

// Publish site
function publishSite() {
    const confirmation = confirm('🎉 Parabéns! Seu site está pronto para ser publicado!\n\nEm produção, os dados seriam enviados para o servidor.\n\nDeseja continuar?');
    
    if (confirmation) {
        console.log('Dados do site:', formData);
        
        // Show success message
        const successHTML = `
            <div class="text-center py-12">
                <div class="mb-6">
                    <svg class="w-32 h-32 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                <h2 class="text-4xl font-bold text-gray-800 mb-4">Site Publicado com Sucesso! 🎉</h2>
                <p class="text-xl text-gray-600 mb-8">Seu site de Pet Food Delivery está no ar!</p>
                <div class="bg-green-50 border-2 border-green-200 rounded-2xl p-6 max-w-2xl mx-auto">
                    <p class="text-green-800 mb-4">
                        <strong>Em produção, seu site estaria disponível em:</strong>
                    </p>
                    <p class="text-2xl font-mono font-bold text-green-700">
                        https://seu-petshop.com.br
                    </p>
                </div>
                <button onclick="location.reload()" class="mt-8 px-8 py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg">
                    Criar Novo Site
                </button>
            </div>
        `;
        
        document.getElementById('summary-content').innerHTML = successHTML;
        document.getElementById('prev-btn').classList.add('hidden');
        document.getElementById('publish-btn').classList.add('hidden');
    }
}

// Sidebar Functions
function setupSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('sidebar-toggle');
    const overlay = document.getElementById('sidebar-overlay');
    
    // Toggle sidebar on mobile
    toggle.addEventListener('click', function() {
        toggleSidebar();
    });
    
    // Update active menu item
    updateSidebarActive();
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    sidebar.classList.toggle('sidebar-hidden');
    overlay.classList.toggle('hidden');
}

function updateSidebarActive() {
    // Remove active from all menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active to current step
    const activeItem = document.querySelector(`.menu-item[data-step="${currentStep}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

function navigateToStep(step) {
    if (step >= 1 && step <= totalSteps) {
        currentStep = step;
        updateStepDisplay();
        updateSidebarActive();
        updateProgress();
        
        // Close sidebar on mobile
        if (window.innerWidth < 1024) {
            toggleSidebar();
        }
    }
}

function showSummaryFromMenu() {
    // Validate all steps before showing summary
    let allValid = true;
    for (let i = 1; i <= totalSteps; i++) {
        if (!validateStep(i)) {
            allValid = false;
            currentStep = i;
            updateStepDisplay();
            updateSidebarActive();
            updateProgress();
            
            if (window.innerWidth < 1024) {
                toggleSidebar();
            }
            
            alert(`Por favor, complete o passo ${i} antes de continuar.`);
            return;
        }
    }
    
    if (allValid) {
        showSummary();
        updateProgress();
        
        if (window.innerWidth < 1024) {
            toggleSidebar();
        }
    }
}

function updateProgress() {
    let completedSteps = 0;
    
    // Check step 1
    if (formData.businessName && formData.description && formData.phone && 
        formData.whatsapp && formData.email && formData.address) {
        completedSteps++;
    }
    
    // Step 2 is always considered complete (hours have defaults)
    completedSteps++;
    
    // Check step 3
    if (formData.deliveryMethods.length > 0 && formData.paymentMethods.length > 0 && 
        formData.categories.length > 0) {
        completedSteps++;
    }
    
    // Step 4 is always considered complete (colors have defaults)
    completedSteps++;
    
    const percentage = Math.round((completedSteps / totalSteps) * 100);
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = document.getElementById('progress-percent');
    
    if (progressBar && progressPercent) {
        progressBar.style.width = percentage + '%';
        progressPercent.textContent = percentage + '%';
    }
}
