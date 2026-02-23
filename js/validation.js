// Validação dos campos do formulário

function validarPasso(step) {
    limparTodosErros();
    let isValid = true;
    
    if (step === 1) {
        if (!formData.businessName.trim()) {
            mostrarErro('businessName', 'Nome do estabelecimento é obrigatório');
            isValid = false;
        }
        
        if (!formData.description.trim()) {
            mostrarErro('description', 'Descrição é obrigatória');
            isValid = false;
        }
        
        if (!formData.phone.trim()) {
            mostrarErro('phone', 'Telefone é obrigatório');
            isValid = false;
        }
        
        if (!formData.whatsapp.trim()) {
            mostrarErro('whatsapp', 'WhatsApp é obrigatório');
            isValid = false;
        }
        
        if (!formData.email.trim()) {
            mostrarErro('email', 'E-mail é obrigatório');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            mostrarErro('email', 'E-mail inválido');
            isValid = false;
        }
        
        if (!formData.address.trim()) {
            mostrarErro('address', 'Endereço/região é obrigatório');
            isValid = false;
        }
    }
    
    if (step === 3) {
        if (formData.deliveryMethods.length === 0) {
            mostrarErro('delivery-error', 'Selecione ao menos uma forma de entrega');
            isValid = false;
        }
        
        if (formData.paymentMethods.length === 0) {
            mostrarErro('payment-error', 'Selecione ao menos um método de pagamento');
            isValid = false;
        }
        
        if (formData.categories.length === 0) {
            mostrarErro('categories-error', 'Adicione ao menos uma categoria de produto');
            isValid = false;
        }
    }
    
    if (step === 4) {
        if (!formData.primaryColor || formData.primaryColor.trim() === '') {
            mostrarErro('primary-color-error', 'Por favor, selecione uma cor primária');
            isValid = false;
        }
        
        if (!formData.secondaryColor || formData.secondaryColor.trim() === '') {
            mostrarErro('secondary-color-error', 'Por favor, selecione uma cor secundária');
            isValid = false;
        }
        
        if (!formData.logo) {
            Swal.fire({
                title: 'Logotipo Obrigatório',
                text: 'Por favor, faça upload do logotipo da sua empresa.',
                icon: 'warning',
                confirmButtonColor: '#a855f7',
                confirmButtonText: 'Entendi'
            });
            isValid = false;
        }
    }
    
    return isValid;
}

function validarTodosPassos() {
    // Validar Passo 1: Informações Básicas
    const passo1Valido = formData.businessName.trim() !== '' &&
                         formData.description.trim() !== '' &&
                         formData.phone.trim() !== '' &&
                         formData.whatsapp.trim() !== '' &&
                         formData.email.trim() !== '' &&
                         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
                         formData.address.trim() !== '';
    
    // Validar Passo 2: Horários (pelo menos um dia aberto)
    let temDiaAberto = false;
    Object.values(formData.hours).forEach(day => {
        if (!day.closed && day.open && day.close) {
            temDiaAberto = true;
        }
    });
    
    // Validar Passo 3: Entrega e Pagamento
    const passo3Valido = formData.deliveryMethods.length > 0 &&
                         formData.paymentMethods.length > 0 &&
                         formData.categories.length > 0;
    
    // Validar Passo 4: Identidade Visual
    const passo4Valido = formData.primaryColor && formData.primaryColor.trim() !== '' &&
                         formData.secondaryColor && formData.secondaryColor.trim() !== '' &&
                         formData.logo;
    
    return passo1Valido && temDiaAberto && passo3Valido && passo4Valido;
}
