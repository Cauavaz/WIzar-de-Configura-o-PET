// Form Initialization and Population

function initializeHours() {
    if (Object.keys(formData.hours).length === 0) {
        daysOfWeek.forEach(day => {
            formData.hours[day.key] = {
                open: '09:00',
                close: '18:00',
                closed: day.key === 'sunday'
            };
        });
    }
    renderHours();
}

function renderHours() {
    const container = document.getElementById('hours-container');
    container.innerHTML = '';
    
    daysOfWeek.forEach(day => {
        const dayData = formData.hours[day.key];
        const div = document.createElement('div');
        div.className = 'bg-white border-2 border-gray-200 rounded-2xl p-5 hover:border-purple-300 transition-all shadow-sm hover:shadow-md';
        div.innerHTML = `
            <div class="flex items-center gap-3 mb-4">
                <div class="relative">
                    <input type="checkbox" id="day-${day.key}" ${!dayData.closed ? 'checked' : ''} 
                        class="w-6 h-6 text-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500 cursor-pointer border-2 border-gray-300">
                </div>
                <label for="day-${day.key}" class="font-bold text-lg text-gray-800 cursor-pointer flex-1">${day.label}</label>
                <div class="px-3 py-1 rounded-full text-xs font-semibold ${!dayData.closed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                    ${!dayData.closed ? '✓ Aberto' : '✕ Fechado'}
                </div>
            </div>
            <div id="hours-${day.key}" class="${dayData.closed ? 'hidden' : ''} grid grid-cols-2 gap-4">
                <div class="relative">
                    <label class="text-xs font-semibold text-gray-600 mb-1 block flex items-center gap-1">
                        <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                        Abertura
                    </label>
                    <input type="time" id="open-${day.key}" value="${dayData.open}" 
                        class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none font-semibold text-gray-700 bg-purple-50">
                </div>
                <div class="relative">
                    <label class="text-xs font-semibold text-gray-600 mb-1 block flex items-center gap-1">
                        <svg class="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                        </svg>
                        Fechamento
                    </label>
                    <input type="time" id="close-${day.key}" value="${dayData.close}" 
                        class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none font-semibold text-gray-700 bg-pink-50">
                </div>
            </div>
            <div id="closed-${day.key}" class="${!dayData.closed ? 'hidden' : ''} text-center py-4 text-gray-500 italic bg-gray-50 rounded-xl">
                <svg class="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Estabelecimento fechado
            </div>
        `;
        container.appendChild(div);
        
        const checkbox = document.getElementById(`day-${day.key}`);
        const statusBadge = checkbox.parentElement.parentElement.querySelector('.px-3');
        
        checkbox.addEventListener('change', function(e) {
            formData.hours[day.key].closed = !e.target.checked;
            document.getElementById(`hours-${day.key}`).classList.toggle('hidden');
            document.getElementById(`closed-${day.key}`).classList.toggle('hidden');
            
            // Update status badge
            if (e.target.checked) {
                statusBadge.className = 'px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700';
                statusBadge.textContent = '✓ Aberto';
            } else {
                statusBadge.className = 'px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700';
                statusBadge.textContent = '✕ Fechado';
            }
            
            saveToStorage();
        });
        
        document.getElementById(`open-${day.key}`).addEventListener('change', function(e) {
            formData.hours[day.key].open = e.target.value;
            saveToStorage();
        });
        
        document.getElementById(`close-${day.key}`).addEventListener('change', function(e) {
            formData.hours[day.key].close = e.target.value;
            saveToStorage();
        });
    });
}

function populateFormFields() {
    document.getElementById('businessName').value = formData.businessName || '';
    document.getElementById('description').value = formData.description || '';
    document.getElementById('phone').value = formData.phone || '';
    document.getElementById('whatsapp').value = formData.whatsapp || '';
    document.getElementById('email').value = formData.email || '';
    document.getElementById('address').value = formData.address || '';
    
    formData.deliveryMethods.forEach(method => {
        const btn = document.querySelector(`.delivery-option[data-value="${method}"]`);
        if (btn) {
            btn.classList.remove('border-gray-300');
            btn.classList.add('border-purple-500', 'bg-purple-50');
            const checkmark = btn.querySelector('.delivery-check');
            if (checkmark) {
                checkmark.classList.remove('hidden');
                checkmark.classList.add('flex');
            }
        }
    });
    
    formData.paymentMethods.forEach(method => {
        const btn = document.querySelector(`.payment-option[data-value="${method}"]`);
        if (btn) {
            btn.classList.remove('border-gray-300');
            btn.classList.add('border-purple-500', 'bg-purple-50');
            const checkmark = btn.querySelector('.payment-check');
            if (checkmark) {
                checkmark.classList.remove('hidden');
                checkmark.classList.add('flex');
            }
        }
    });
    
    renderCategories();
    
    if (formData.logo) {
        document.getElementById('logo-image').src = formData.logo;
        document.getElementById('logo-preview').classList.remove('hidden');
        document.getElementById('logo-placeholder').classList.add('hidden');
    }
    
    document.getElementById('primary-color').value = formData.primaryColor;
    document.getElementById('primary-color-text').value = formData.primaryColor;
    document.getElementById('secondary-color').value = formData.secondaryColor;
    document.getElementById('secondary-color-text').value = formData.secondaryColor;
    document.getElementById('primary-preview').style.backgroundColor = formData.primaryColor;
    document.getElementById('secondary-preview').style.backgroundColor = formData.secondaryColor;
}

function renderCategories() {
    const container = document.getElementById('categories-list');
    container.innerHTML = '';
    
    formData.categories.forEach((category, index) => {
        const tag = document.createElement('span');
        tag.className = 'category-tag inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-medium';
        tag.innerHTML = `
            ${category}
            <button type="button" class="hover:bg-purple-200 rounded-full p-1 transition-all" onclick="removeCategory(${index})">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        `;
        container.appendChild(tag);
    });
}

function removeCategory(index) {
    formData.categories.splice(index, 1);
    renderCategories();
    saveToStorage();
}

function addCategory() {
    const input = document.getElementById('category-input');
    const value = input.value.trim();
    
    if (value && !formData.categories.includes(value)) {
        formData.categories.push(value);
        input.value = '';
        renderCategories();
        clearError(document.getElementById('categories-error'));
        saveToStorage();
    }
}
