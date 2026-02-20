// Summary Display Functions

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
                <button onclick="editStep(2)" class="text-purple-600 hover:text-purple-700 flex items-center gap-1 text-sm font-semibold">
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
                <button onclick="editStep(3)" class="text-purple-600 hover:text-purple-700 flex items-center gap-1 text-sm font-semibold">
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
                <button onclick="editStep(4)" class="text-purple-600 hover:text-purple-700 flex items-center gap-1 text-sm font-semibold">
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
    
    for (let i = 1; i <= totalSteps; i++) {
        const indicator = document.getElementById(`step-indicator-${i}`);
        const circle = indicator.querySelector('.step-circle');
        const label = indicator.querySelector('span');
        
        circle.className = 'step-circle w-16 h-16 rounded-full bg-white text-purple-600 flex items-center justify-center font-bold text-xl ring-4 ring-purple-300 transition-all shadow-lg';
        circle.innerHTML = '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>';
        if (label) label.className = 'text-sm font-bold text-white text-center';
        
        const line = indicator.parentElement.querySelector('.h-1');
        if (line) line.className = 'flex-1 h-1 bg-white rounded transition-all mt-8';
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
