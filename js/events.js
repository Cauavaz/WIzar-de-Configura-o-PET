// Event Listeners Setup

function setupEventListeners() {
    // Navigation buttons
    document.getElementById('prev-btn').addEventListener('click', previousStep);
    document.getElementById('next-btn').addEventListener('click', nextStep);
    document.getElementById('publish-btn').addEventListener('click', publishSite);
    
    // Step 1: Basic Info
    ['businessName', 'description', 'phone', 'whatsapp', 'email', 'address'].forEach(field => {
        const element = document.getElementById(field);
        element.addEventListener('input', function(e) {
            formData[field] = e.target.value;
            clearError(element);
            saveToStorage();
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
            
            clearError(document.getElementById('delivery-error'));
            saveToStorage();
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
            
            clearError(document.getElementById('payment-error'));
            saveToStorage();
        });
    });
    
    // Step 3: Categories
    document.getElementById('add-category').addEventListener('click', addCategory);
    document.getElementById('category-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addCategory();
        }
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
                saveToStorage();
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
        primaryColorText.value = color;
        document.getElementById('primary-preview').style.backgroundColor = color;
        if (typeof updateCubeColors === 'function') {
            updateCubeColors(color, 'primary');
        }
        saveToStorage();
    });
    
    primaryColorText.addEventListener('input', function(e) {
        const color = e.target.value;
        if (/^#[0-9A-F]{6}$/i.test(color)) {
            formData.primaryColor = color;
            primaryColor.value = color;
            document.getElementById('primary-preview').style.backgroundColor = color;
            if (typeof updateCubeColors === 'function') {
                updateCubeColors(color, 'primary');
            }
            saveToStorage();
        }
    });
    
    secondaryColor.addEventListener('input', function(e) {
        const color = e.target.value;
        formData.secondaryColor = color;
        secondaryColorText.value = color;
        document.getElementById('secondary-preview').style.backgroundColor = color;
        if (typeof updateCubeColors === 'function') {
            updateCubeColors(color, 'secondary');
        }
        saveToStorage();
    });
    
    secondaryColorText.addEventListener('input', function(e) {
        const color = e.target.value;
        if (/^#[0-9A-F]{6}$/i.test(color)) {
            formData.secondaryColor = color;
            secondaryColor.value = color;
            document.getElementById('secondary-preview').style.backgroundColor = color;
            if (typeof updateCubeColors === 'function') {
                updateCubeColors(color, 'secondary');
            }
            saveToStorage();
        }
    });
}
