// Gerenciamento de estado do formulário
const STORAGE_KEY = 'wizard_pet_food_data';
let currentStep = 1;
const totalSteps = 5;

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
    primaryColor: '',
    secondaryColor: '',
    logo: null,
    colorsSelected: false  // Flag para rastrear se o usuário selecionou cores
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

// Carregar dados do localStorage
function carregarDoArmazenamento() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const data = JSON.parse(saved);
            Object.assign(formData, data);
        } catch (e) {
            console.error('Erro ao carregar dados salvos:', e);
        }
    }
}

// Salvar dados no localStorage
function salvarNoArmazenamento() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// Atualizar dados do formulário
function atualizarDadosFormulario(field, value) {
    formData[field] = value;
    salvarNoArmazenamento();
}
