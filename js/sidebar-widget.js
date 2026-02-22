// Widget de progresso no menu lateral

function atualizarWidgetSidebar() {
    // Calcula progresso baseado nos passos completos
    let completedSteps = 0;
    
    // Passo 1: Informações básicas
    if (formData.businessName && formData.description && formData.phone && 
        formData.whatsapp && formData.email && formData.address) {
        completedSteps++;
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
    if (hasValidHours) {
        completedSteps++;
    }
    
    // Passo 3: Entrega e Pagamento
    if (formData.deliveryMethods.length > 0 && formData.paymentMethods.length > 0 && 
        formData.categories.length > 0) {
        completedSteps++;
    }
    
    // Passo 4: Identidade Visual
    if (formData.colorsSelected && formData.primaryColor && formData.secondaryColor && formData.logo) {
        completedSteps++;
    }
    
    const percentage = Math.round((completedSteps / 4) * 100);
    
    // Atualizar gráfico circular de progresso
    const circle = document.getElementById('sidebar-progress-circle');
    const progressText = document.getElementById('sidebar-progress-text');
    const stepsText = document.getElementById('sidebar-steps-completed');
    const timeEstimate = document.getElementById('sidebar-time-estimate');
    
    if (circle && progressText) {
        // Calcular stroke-dashoffset (314 é a circunferência para r=50)
        const circumference = 314;
        const offset = circumference - (percentage / 100) * circumference;
        
        circle.style.strokeDashoffset = offset;
        progressText.textContent = percentage + '%';
    }
    
    // Atualizar contador de passos
    if (stepsText) {
        stepsText.textContent = `${completedSteps}/4`;
    }
    
    // Atualizar estimativa de tempo
    if (timeEstimate) {
        const remainingSteps = 4 - completedSteps;
        const minutesPerStep = 2;
        const estimatedMinutes = remainingSteps * minutesPerStep;
        
        if (estimatedMinutes === 0) {
            timeEstimate.textContent = '✓ Pronto';
        } else {
            timeEstimate.textContent = `~${estimatedMinutes}min`;
        }
    }
    
    // Atualizar indicadores de progresso
    for (let i = 1; i <= 4; i++) {
        const dot = document.getElementById(`sidebar-step-dot-${i}`);
        if (dot) {
            if (i <= completedSteps) {
                dot.className = 'w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 shadow-lg shadow-pink-500/50';
            } else {
                dot.className = 'w-2 h-2 rounded-full bg-white/30 transition-all duration-300';
            }
        }
    }
}

// Adicionar efeito hover 3D ao gráfico circular
function inicializarEfeitosWidgetSidebar() {
    const widget = document.querySelector('.mt-8.p-4.bg-gradient-to-br');
    
    if (widget) {
        widget.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
        });
        
        widget.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    }
}

// Inicializar ao carregar a página
if (typeof window !== 'undefined') {
    window.atualizarWidgetSidebar = atualizarWidgetSidebar;
    window.inicializarEfeitosWidgetSidebar = inicializarEfeitosWidgetSidebar;
}
