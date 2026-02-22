// Display real form data in dashboard

function updateDashboardWithFormData() {
    // Update business info section
    updateBusinessInfoCard();
    
    // Update delivery methods info
    updateDeliveryMethodsCard();
    
    // Update payment methods info
    updatePaymentMethodsCard();
    
    // Update hours info
    updateHoursCard();
}

function updateBusinessInfoCard() {
    const infoSection = document.getElementById('dashboard-business-info');
    if (!infoSection || !formData.businessName) return;
    
    const deliveryLabels = {
        'own': 'Delivery Próprio',
        'third-party': 'Delivery Terceiros',
        'pickup': 'Retirada no Local'
    };
    
    const paymentLabels = {
        'cash': 'Dinheiro',
        'debit': 'Débito',
        'credit': 'Crédito',
        'pix': 'PIX',
        'voucher': 'Vale'
    };
    
    infoSection.innerHTML = `
        <div class="bg-white rounded-xl p-6 shadow-lg mb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span class="w-3 h-3 bg-purple-500 rounded-full"></span>
                Informações do Negócio
            </h3>
            <div class="grid md:grid-cols-2 gap-4">
                <div>
                    <p class="text-sm text-gray-600 mb-1">Nome do Negócio</p>
                    <p class="font-semibold text-gray-800">${formData.businessName}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-600 mb-1">Telefone</p>
                    <p class="font-semibold text-gray-800">${formData.phone || 'Não informado'}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-600 mb-1">WhatsApp</p>
                    <p class="font-semibold text-gray-800">${formData.whatsapp || 'Não informado'}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-600 mb-1">Email</p>
                    <p class="font-semibold text-gray-800">${formData.email || 'Não informado'}</p>
                </div>
                <div class="md:col-span-2">
                    <p class="text-sm text-gray-600 mb-1">Endereço</p>
                    <p class="font-semibold text-gray-800">${formData.address || 'Não informado'}</p>
                </div>
                ${formData.deliveryMethods.length > 0 ? `
                <div class="md:col-span-2">
                    <p class="text-sm text-gray-600 mb-2">Formas de Entrega</p>
                    <div class="flex flex-wrap gap-2">
                        ${formData.deliveryMethods.map(m => `<span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">${deliveryLabels[m]}</span>`).join('')}
                    </div>
                </div>
                ` : ''}
                ${formData.paymentMethods.length > 0 ? `
                <div class="md:col-span-2">
                    <p class="text-sm text-gray-600 mb-2">Métodos de Pagamento</p>
                    <div class="flex flex-wrap gap-2">
                        ${formData.paymentMethods.map(m => `<span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">${paymentLabels[m]}</span>`).join('')}
                    </div>
                </div>
                ` : ''}
                ${formData.categories.length > 0 ? `
                <div class="md:col-span-2">
                    <p class="text-sm text-gray-600 mb-2">Categorias de Produtos</p>
                    <div class="flex flex-wrap gap-2">
                        ${formData.categories.map(c => `<span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">${c}</span>`).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        </div>
    `;
}

function updateDeliveryMethodsCard() {
    // Already handled in updateBusinessInfoCard
}

function updatePaymentMethodsCard() {
    // Already handled in updateBusinessInfoCard
}

function updateHoursCard() {
    const hoursSection = document.getElementById('dashboard-hours-info');
    if (!hoursSection || !formData.hours || Object.keys(formData.hours).length === 0) return;
    
    const daysLabels = {
        'monday': 'Segunda',
        'tuesday': 'Terça',
        'wednesday': 'Quarta',
        'thursday': 'Quinta',
        'friday': 'Sexta',
        'saturday': 'Sábado',
        'sunday': 'Domingo'
    };
    
    let openDays = [];
    for (let day in formData.hours) {
        const dayData = formData.hours[day];
        if (!dayData.closed && dayData.open && dayData.close) {
            openDays.push({
                name: daysLabels[day],
                hours: `${dayData.open} - ${dayData.close}`
            });
        }
    }
    
    if (openDays.length > 0) {
        hoursSection.innerHTML = `
            <div class="bg-white rounded-xl p-6 shadow-lg mb-6">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span class="w-3 h-3 bg-blue-500 rounded-full"></span>
                    Horários de Funcionamento
                </h3>
                <div class="grid md:grid-cols-2 gap-3">
                    ${openDays.map(day => `
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span class="font-semibold text-gray-700">${day.name}</span>
                            <span class="text-sm text-gray-600">${day.hours}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

// Initialize when dashboard is shown
document.addEventListener('DOMContentLoaded', function() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            const step5 = document.getElementById('step-5');
            if (step5 && step5.classList.contains('active')) {
                setTimeout(() => {
                    updateDashboardWithFormData();
                }, 1500);
            }
        });
    });
    
    observer.observe(document.body, {
        attributes: true,
        subtree: true,
        attributeFilter: ['class']
    });
});
