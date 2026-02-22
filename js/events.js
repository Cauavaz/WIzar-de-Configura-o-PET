// Event Listeners Setup

function configurarEventListeners() {
    // Navigation buttons
    document.getElementById('prev-btn').addEventListener('click', passoAnterior);
    document.getElementById('next-btn').addEventListener('click', proximoPasso);
    document.getElementById('publish-btn').addEventListener('click', publicarSite);
    
    // Step 1: Basic Info
    ['businessName', 'description', 'phone', 'whatsapp', 'email', 'address'].forEach(field => {
        const element = document.getElementById(field);
        element.addEventListener('input', function(e) {
            formData[field] = e.target.value;
            limparErro(element);
            salvarNoArmazenamento();
        });
    });
    
    // Step 3: Delivery methods
    document.querySelectorAll('.delivery-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const value = this.dataset.value;
            const index = formData.deliveryMethods.indexOf(value);
            const checkmark = this.querySelector('.delivery-check');
            
            if (index > -1) {
                formData.deliveryMethods.splice(index, 1);
                this.classList.remove('border-purple-500', 'bg-purple-50');
                this.classList.add('border-gray-300');
                if (checkmark) checkmark.classList.add('hidden');
            } else {
                formData.deliveryMethods.push(value);
                this.classList.remove('border-gray-300');
                this.classList.add('border-purple-500', 'bg-purple-50');
                if (checkmark) {
                    checkmark.classList.remove('hidden');
                    checkmark.classList.add('flex');
                }
            }
            
            limparErro(document.getElementById('delivery-error'));
            salvarNoArmazenamento();
        });
    });
    
    // Step 3: Payment methods
    document.querySelectorAll('.payment-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const value = this.dataset.value;
            const index = formData.paymentMethods.indexOf(value);
            const checkmark = this.querySelector('.payment-check');
            
            if (index > -1) {
                formData.paymentMethods.splice(index, 1);
                this.classList.remove('border-purple-500', 'bg-purple-50');
                this.classList.add('border-gray-300');
                if (checkmark) checkmark.classList.add('hidden');
            } else {
                formData.paymentMethods.push(value);
                this.classList.remove('border-gray-300');
                this.classList.add('border-purple-500', 'bg-purple-50');
                if (checkmark) {
                    checkmark.classList.remove('hidden');
                    checkmark.classList.add('flex');
                }
            }
            
            limparErro(document.getElementById('payment-error'));
            salvarNoArmazenamento();
        });
    });
    
    // Step 3: Categories
    document.getElementById('add-category').addEventListener('click', adicionarCategoria);
    document.getElementById('category-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            adicionarCategoria();
        }
    });
    
    // Step 3: Hours
    Object.keys(formData.hours).forEach(day => {
        document.getElementById(`open-${day}`).addEventListener('change', function(e) {
            formData.hours[day].open = e.target.value;
            salvarNoArmazenamento();
            atualizarProgresso();
        });
        
        document.getElementById(`close-${day}`).addEventListener('change', function(e) {
            formData.hours[day].close = e.target.value;
            salvarNoArmazenamento();
            atualizarProgresso();
        });
    });
    
    // Step 4: Logo upload
    document.getElementById('logo-upload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                formData.logo = event.target.result;
                document.getElementById('logo-image').src = event.target.result;
                document.getElementById('logo-preview').classList.remove('hidden');
                document.getElementById('logo-placeholder').classList.add('hidden');
                salvarNoArmazenamento();
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Step 4: Colors
    const primaryColor = document.getElementById('primary-color');
    const primaryColorText = document.getElementById('primary-color-text');
    const secondaryColor = document.getElementById('secondary-color');
    const secondaryColorText = document.getElementById('secondary-color-text');
    
    primaryColor.addEventListener('input', function(e) {
        const color = e.target.value;
        
        formData.primaryColor = color;
        formData.colorsSelected = true;  // Mark as user-selected
        primaryColorText.value = color;
        
        // Update preview box
        const previewBox = document.getElementById('primary-preview');
        if (previewBox) {
            previewBox.style.backgroundColor = color;
        }
        
        // Update 3D cubes
        if (typeof atualizarCoresCubo === 'function') {
            atualizarCoresCubo(color, 'primary');
        }
        
        salvarNoArmazenamento();
        atualizarProgresso();
    });
    
    primaryColorText.addEventListener('input', function(e) {
        const color = e.target.value;
        if (/^#[0-9A-F]{6}$/i.test(color)) {
            formData.primaryColor = color;
            formData.colorsSelected = true;  // Mark as user-selected
            primaryColor.value = color;
            document.getElementById('primary-preview').style.backgroundColor = color;
            if (typeof atualizarCoresCubo === 'function') {
                atualizarCoresCubo(color, 'primary');
            }
            salvarNoArmazenamento();
            atualizarProgresso();
        }
    });
    
    secondaryColor.addEventListener('input', function(e) {
        const color = e.target.value;
        
        formData.secondaryColor = color;
        formData.colorsSelected = true;  // Mark as user-selected
        secondaryColorText.value = color;
        
        // Update preview box
        const previewBox = document.getElementById('secondary-preview');
        if (previewBox) {
            previewBox.style.backgroundColor = color;
        }
        
        // Update 3D cubes
        if (typeof atualizarCoresCubo === 'function') {
            atualizarCoresCubo(color, 'secondary');
        }
        
        salvarNoArmazenamento();
        atualizarProgresso();
    });
    
    secondaryColorText.addEventListener('input', function(e) {
        const color = e.target.value;
        if (/^#[0-9A-F]{6}$/i.test(color)) {
            formData.secondaryColor = color;
            formData.colorsSelected = true;  // Mark as user-selected
            secondaryColor.value = color;
            document.getElementById('secondary-preview').style.backgroundColor = color;
            if (typeof atualizarCoresCubo === 'function') {
                atualizarCoresCubo(color, 'secondary');
            }
            salvarNoArmazenamento();
            atualizarProgresso();
        }
    });
}
