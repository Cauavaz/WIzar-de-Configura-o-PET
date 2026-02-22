// Popup com detalhes do progresso

function mostrarDetalhesProgresso() {
    const missingItems = [];
    
    // Passo 1: Informações básicas
    const step1Missing = [];
    if (!formData.businessName) step1Missing.push('Nome do negócio');
    if (!formData.description) step1Missing.push('Descrição');
    if (!formData.phone) step1Missing.push('Telefone');
    if (!formData.whatsapp) step1Missing.push('WhatsApp');
    if (!formData.email) step1Missing.push('E-mail');
    if (!formData.address) step1Missing.push('Endereço/Região');
    
    if (step1Missing.length > 0) {
        missingItems.push({
            step: 1,
            title: 'Informações Básicas',
            items: step1Missing,
            icon: '📋'
        });
    }
    
    // Passo 2: Horários
    let hasValidHours = false;
    if (formData.hours && Object.keys(formData.hours).length > 0) {
        for (let day in formData.hours) {
            const dayData = formData.hours[day];
            if (!dayData.closed && dayData.open && dayData.close && dayData.open !== '' && dayData.close !== '') {
                hasValidHours = true;
                break;
            }
        }
    }
    
    if (!hasValidHours) {
        missingItems.push({
            step: 2,
            title: 'Horários de Funcionamento',
            items: ['Configure pelo menos um dia de funcionamento'],
            icon: '⏰'
        });
    }
    
    // Passo 3: Entrega e Pagamento
    const step3Missing = [];
    if (formData.deliveryMethods.length === 0) step3Missing.push('Formas de entrega');
    if (formData.paymentMethods.length === 0) step3Missing.push('Métodos de pagamento');
    if (formData.categories.length === 0) step3Missing.push('Categorias de produtos');
    
    if (step3Missing.length > 0) {
        missingItems.push({
            step: 3,
            title: 'Entrega e Pagamento',
            items: step3Missing,
            icon: '🚚'
        });
    }
    
    // Passo 4: Identidade Visual
    const step4Missing = [];
    if (!formData.colorsSelected || !formData.primaryColor) step4Missing.push('Cor primária');
    if (!formData.colorsSelected || !formData.secondaryColor) step4Missing.push('Cor secundária');
    if (!formData.logo) step4Missing.push('Logotipo');
    
    if (step4Missing.length > 0) {
        missingItems.push({
            step: 4,
            title: 'Identidade Visual',
            items: step4Missing,
            icon: '🎨'
        });
    }
    
    // Gerar HTML para o popup
    let popupHTML = '';
    
    if (missingItems.length === 0) {
        // Tudo completo!
        popupHTML = `
            <div class="text-center py-8">
                <div class="mb-6">
                    <i class="fas fa-check-circle text-green-500 text-7xl"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-3">Tudo Completo! 🎉</h3>
                <p class="text-gray-600 text-lg mb-6">Você preencheu todos os passos necessários.</p>
                <div class="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                    <p class="text-green-800 font-semibold">
                        <i class="fas fa-rocket"></i> Pronto para publicar seu site!
                    </p>
                </div>
            </div>
        `;
    } else {
        // Mostrar itens faltantes
        const itemsHTML = missingItems.map(section => `
            <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-3 border-l-4 border-purple-500">
                <div class="flex items-start gap-3">
                    <div class="text-3xl">${section.icon}</div>
                    <div class="flex-1">
                        <h4 class="font-bold text-gray-800 mb-2 flex items-center gap-2">
                            ${section.title}
                            <button onclick="navegarParaPasso(${section.step}); Swal.close();" class="text-xs bg-purple-600 text-white px-3 py-1 rounded-full hover:bg-purple-700 transition-all">
                                <i class="fas fa-arrow-right"></i> Ir para passo
                            </button>
                        </h4>
                        <ul class="space-y-1">
                            ${section.items.map(item => `
                                <li class="text-sm text-gray-700 flex items-center gap-2">
                                    <i class="fas fa-exclamation-circle text-orange-500"></i>
                                    <span>${item}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `).join('');
        
        popupHTML = `
            <div class="text-left">
                <div class="text-center mb-6">
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">Itens Pendentes</h3>
                    <p class="text-gray-600">Complete os campos abaixo para finalizar:</p>
                </div>
                
                <div class="max-h-96 overflow-y-auto pr-2">
                    ${itemsHTML}
                </div>
                
                <div class="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center">
                    <p class="text-blue-800 text-sm">
                        <i class="fas fa-info-circle"></i> 
                        <strong>${missingItems.length}</strong> ${missingItems.length === 1 ? 'passo precisa' : 'passos precisam'} ser completado${missingItems.length === 1 ? '' : 's'}
                    </p>
                </div>
            </div>
        `;
    }
    
    // Mostrar popup com SweetAlert2
    Swal.fire({
        html: popupHTML,
        width: '600px',
        showConfirmButton: missingItems.length > 0,
        showCancelButton: false,
        confirmButtonText: '<i class="fas fa-check"></i> Entendi',
        confirmButtonColor: '#a855f7',
        customClass: {
            popup: 'rounded-2xl',
            confirmButton: 'rounded-xl px-6 py-3 font-semibold shadow-lg',
            htmlContainer: 'text-left'
        },
        showCloseButton: true,
        backdrop: 'rgba(0,0,0,0.4)'
    });
}

// Tornar função disponível globalmente
if (typeof window !== 'undefined') {
    window.mostrarDetalhesProgresso = mostrarDetalhesProgresso;
}
