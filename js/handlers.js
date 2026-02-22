// Navegação entre passos do wizard

function proximoPasso() {
    if (currentStep === totalSteps) {
        mostrarResumo();
        atualizarProgresso();
        return;
    }
    
    if (validarPasso(currentStep)) {
        currentStep++;
        atualizarExibicaoPasso();
        atualizarSidebarAtivo();
        atualizarProgresso();
    }
}

function passoAnterior() {
    if (currentStep > 1) {
        currentStep--;
        atualizarExibicaoPasso();
        atualizarSidebarAtivo();
        atualizarProgresso();
    }
}

function navegarParaPasso(step) {
    if (step >= 1 && step <= totalSteps) {
        currentStep = step;
        atualizarExibicaoPasso();
        atualizarSidebarAtivo();
        atualizarProgresso();
        
        if (window.innerWidth < 1024) {
            alternarSidebar();
        }
    }
}

function editarPasso(step) {
    currentStep = step;
    atualizarExibicaoPasso();
    atualizarSidebarAtivo();
    atualizarProgresso();
}

function publicarSite() {
    Swal.fire({
        title: '🎉 Parabéns!',
        html: '<p class="text-lg">Seu site está pronto para ser publicado!</p><p class="text-sm text-gray-600 mt-2">Em produção, os dados seriam enviados para o servidor.</p>',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#a855f7',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Sim, publicar!',
        cancelButtonText: 'Cancelar',
        customClass: {
            popup: 'rounded-2xl',
            confirmButton: 'rounded-xl px-6 py-3 font-semibold',
            cancelButton: 'rounded-xl px-6 py-3 font-semibold'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Show data in console for development
            console.log('Dados do site:', formData);
        
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
                <button onclick="resetarWizard()" class="mt-8 px-8 py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg">
                    Criar Novo Site
                </button>
            </div>
        `;
        
            document.getElementById('summary-content').innerHTML = successHTML;
            document.getElementById('prev-btn').classList.add('hidden');
            document.getElementById('publish-btn').classList.add('hidden');
        }
    });
}

function resetarWizard() {
    // Limpar localStorage
    localStorage.removeItem(STORAGE_KEY);
    
    // Resetar dados do formulário para estado inicial
    formData.businessName = '';
    formData.description = '';
    formData.phone = '';
    formData.whatsapp = '';
    formData.email = '';
    formData.address = '';
    formData.hours = {};
    formData.deliveryMethods = [];
    formData.paymentMethods = [];
    formData.categories = [];
    formData.primaryColor = '';
    formData.secondaryColor = '';
    formData.logo = null;
    formData.colorsSelected = false;
    
    // Voltar para o passo 1
    currentStep = 1;
    
    // Reinicializar horários
    inicializarHorarios();
    
    // Limpar todos os erros
    limparTodosErros();
    
    // Mostrar botões de navegação novamente
    const prevBtn = document.getElementById('prev-btn');
    const publishBtn = document.getElementById('publish-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) prevBtn.classList.remove('hidden');
    if (publishBtn) publishBtn.classList.add('hidden');
    if (nextBtn) nextBtn.classList.remove('hidden');
    
    // Atualizar interface
    atualizarExibicaoPasso();
    atualizarSidebarAtivo();
    atualizarProgresso();
    
    // Limpar todos os campos do formulário
    document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea').forEach(input => {
        input.value = '';
    });
    
    // Resetar seletores de cor para branco (#ffffff)
    const defaultPrimary = '#ffffff';
    const defaultSecondary = '#ffffff';
    
    document.getElementById('primary-color').value = defaultPrimary;
    document.getElementById('primary-color-text').value = defaultPrimary;
    document.getElementById('secondary-color').value = defaultSecondary;
    document.getElementById('secondary-color-text').value = defaultSecondary;
    
    // Atualizar caixas de prévia de cor
    const primaryPreview = document.getElementById('primary-preview');
    const secondaryPreview = document.getElementById('secondary-preview');
    if (primaryPreview) {
        primaryPreview.style.backgroundColor = defaultPrimary;
        primaryPreview.style.color = '#000000'; // Texto preto para fundo branco
    }
    if (secondaryPreview) {
        secondaryPreview.style.backgroundColor = defaultSecondary;
        secondaryPreview.style.color = '#000000'; // Texto preto para fundo branco
    }
    
    // Atualizar cubos 3D se a função existir
    if (typeof atualizarCoresCubo === 'function') {
        atualizarCoresCubo(defaultPrimary, 'primary');
        atualizarCoresCubo(defaultSecondary, 'secondary');
    }
    
    // Resetar logo
    document.getElementById('logo-preview').classList.add('hidden');
    document.getElementById('logo-placeholder').classList.remove('hidden');
    
    // Limpar seleções de entrega e pagamento
    document.querySelectorAll('.delivery-option, .payment-option').forEach(btn => {
        btn.classList.remove('border-purple-500', 'bg-purple-50');
        btn.classList.add('border-gray-300');
        const checkmark = btn.querySelector('.delivery-check, .payment-check');
        if (checkmark) {
            checkmark.classList.add('hidden');
            checkmark.classList.remove('flex');
        }
    });
    
    // Limpar categorias
    document.getElementById('categories-list').innerHTML = '';
    
    // Re-renderizar horários
    renderizarHorarios();
    
    // Mostrar toast de sucesso
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Wizard resetado!',
        text: 'Pronto para criar um novo site.',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
            popup: 'rounded-xl'
        }
    });
}

function mostrarResumoDoMenu() {
    let allValid = true;
    for (let i = 1; i <= totalSteps; i++) {
        if (!validarPasso(i)) {
            allValid = false;
            currentStep = i;
            atualizarExibicaoPasso();
            atualizarSidebarAtivo();
            atualizarProgresso();
            
            if (window.innerWidth < 1024) {
                alternarSidebar();
            }
            
            Swal.fire({
                title: 'Atenção!',
                text: `Por favor, complete o passo ${i} antes de continuar.`,
                icon: 'warning',
                confirmButtonColor: '#a855f7',
                confirmButtonText: 'Entendi',
                customClass: {
                    popup: 'rounded-2xl',
                    confirmButton: 'rounded-xl px-6 py-3 font-semibold'
                }
            });
            return;
        }
    }
    
    if (allValid) {
        // Definir currentStep para resumo (além do totalSteps)
        currentStep = totalSteps + 1;
        mostrarResumo();
        atualizarProgresso();
        atualizarSidebarAtivo();
        
        if (window.innerWidth < 1024) {
            alternarSidebar();
        }
    }
}
