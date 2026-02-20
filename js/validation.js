// Validation Functions

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
