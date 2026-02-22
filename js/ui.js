// Atualização da interface e exibição

function atualizarExibicaoPasso() {
    // Esconder todos os passos
    document.querySelectorAll('.step-content').forEach(step => {
        step.classList.remove('active');
    });
    
    // Mostrar passo atual
    if (currentStep <= totalSteps) {
        const currentStepElement = document.getElementById(`step-${currentStep}`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }
        const summaryEl = document.getElementById('summary');
        if (summaryEl) summaryEl.classList.remove('active');
        
        const nextBtn = document.getElementById('next-btn');
        const publishBtn = document.getElementById('publish-btn');
        if (nextBtn) nextBtn.classList.remove('hidden');
        if (publishBtn) publishBtn.classList.add('hidden');
    }
    
    // Atualizar botões
    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) prevBtn.disabled = currentStep === 1;
    
    // Atualizar indicador
    atualizarIndicadorPasso();
    
    // Atualizar indicador mobile
    if (typeof atualizarIndicadorPassoMobile === 'function') {
        atualizarIndicadorPassoMobile();
    }
    
    // Rolar para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function atualizarIndicadorPasso() {
    for (let i = 1; i <= totalSteps; i++) {
        const indicator = document.getElementById(`step-indicator-${i}`);
        if (!indicator) continue;
        
        const circle = indicator.querySelector('.step-circle');
        if (!circle) continue;
        
        const label = indicator.querySelector('span');
        
        // Pegar a linha após este passo (se existir)
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
            // Completo
            circle.className = 'step-circle w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-white text-purple-600 flex items-center justify-center font-bold text-lg md:text-xl lg:text-2xl ring-2 md:ring-4 ring-purple-300 transition-all shadow-lg';
            circle.innerHTML = '<svg class="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>';
            if (label) label.className = 'hidden lg:block text-xs lg:text-sm font-bold text-white text-center';
            if (nextLine) nextLine.className = 'flex-1 h-1 bg-white rounded transition-all mt-6 md:mt-8 lg:mt-10';
        } else if (i === currentStep) {
            // Ativo
            circle.className = 'step-circle w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-white text-purple-600 flex items-center justify-center font-bold text-lg md:text-xl lg:text-2xl ring-2 md:ring-4 ring-purple-300 transition-all shadow-lg';
            circle.textContent = i;
            if (label) label.className = 'hidden lg:block text-xs lg:text-sm font-bold text-white text-center';
            if (nextLine) nextLine.className = 'flex-1 h-1 bg-purple-400 rounded transition-all mt-6 md:mt-8 lg:mt-10';
        } else {
            // Pendente
            circle.className = 'step-circle w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-purple-400 text-white flex items-center justify-center font-bold text-lg md:text-xl lg:text-2xl transition-all shadow-lg';
            circle.textContent = i;
            if (label) label.className = 'hidden lg:block text-xs lg:text-sm font-bold text-white text-center';
            if (nextLine) nextLine.className = 'flex-1 h-1 bg-purple-400 rounded transition-all mt-6 md:mt-8 lg:mt-10';
        }
    }
}

function atualizarProgresso() {
    let completedSteps = 0;
    
    // Passo 1: Informações básicas
    if (formData.businessName && formData.description && formData.phone && 
        formData.whatsapp && formData.email && formData.address) {
        completedSteps++;
    }
    
    // Passo 2: Horários - verificar se pelo menos um dia tem horário definido
    let hasValidHours = false;
    if (formData.hours && Object.keys(formData.hours).length > 0) {
        for (let day in formData.hours) {
            const dayData = formData.hours[day];
            // Verificar se o dia está aberto e tem horários preenchidos
            if (!dayData.closed && dayData.open && dayData.close && dayData.open !== '' && dayData.close !== '') {
                hasValidHours = true;
                break;
            }
        }
    }
    if (hasValidHours) {
        completedSteps++;
    }
    
    // Passo 3: Entrega e Pagamento
    if (formData.deliveryMethods.length > 0 && formData.paymentMethods.length > 0 && 
        formData.categories.length > 0) {
        completedSteps++;
    }
    
    // Passo 4: Identidade Visual - verificar se cores e logo foram selecionados
    if (formData.colorsSelected && formData.primaryColor && formData.secondaryColor && formData.logo) {
        completedSteps++;
    }
    
    // Nota: Passo 5 (Dashboard) NÃO conta para o progresso
    // Progresso baseado apenas nos passos 1-4
    
    const percentage = Math.round((completedSteps / 4) * 100);
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = document.getElementById('progress-percent');
    
    if (progressBar && progressPercent) {
        progressBar.style.width = percentage + '%';
        progressPercent.textContent = percentage + '%';
    }
    
    // Atualizar widget da sidebar
    if (typeof atualizarWidgetSidebar === 'function') {
        atualizarWidgetSidebar();
    }
}

function limparErro(field) {
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

function limparTodosErros() {
    document.querySelectorAll('.error-message').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('input, textarea').forEach(el => el.classList.remove('border-red-500'));
}

function mostrarErro(fieldId, message) {
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
