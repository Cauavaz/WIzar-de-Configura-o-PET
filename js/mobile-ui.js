// Mobile UI Updates

// Update mobile step indicator when step changes
function atualizarIndicadorPassoMobile() {
    const mobileStepNumber = document.getElementById('mobile-step-number');
    const mobileStepName = document.getElementById('mobile-step-name');
    
    if (!mobileStepNumber || !mobileStepName) return;
    
    const stepNames = {
        1: 'Informações Básicas',
        2: 'Horários de Funcionamento',
        3: 'Entrega e Pagamento',
        4: 'Identidade Visual',
        5: 'Preview do Dashboard'
    };
    
    mobileStepNumber.textContent = currentStep;
    mobileStepName.textContent = stepNames[currentStep] || 'Revisão Final';
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.atualizarIndicadorPassoMobile = atualizarIndicadorPassoMobile;
}
