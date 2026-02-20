// UI Updates and Display Functions

function updateStepDisplay() {
    // Hide all steps
    document.querySelectorAll('.step-content').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show current step
    if (currentStep <= totalSteps) {
        document.getElementById(`step-${currentStep}`).classList.add('active');
        document.getElementById('summary').classList.remove('active');
        document.getElementById('next-btn').classList.remove('hidden');
        document.getElementById('publish-btn').classList.add('hidden');
    }
    
    // Update buttons
    document.getElementById('prev-btn').disabled = currentStep === 1;
    
    // Update indicator
    updateStepIndicator();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateStepIndicator() {
    for (let i = 1; i <= totalSteps; i++) {
        const indicator = document.getElementById(`step-indicator-${i}`);
        const circle = indicator.querySelector('.step-circle');
        const label = indicator.querySelector('span');
        
        // Get the line after this step (if exists)
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
            // Completed
            circle.className = 'step-circle w-16 h-16 rounded-full bg-white text-purple-600 flex items-center justify-center font-bold text-xl ring-4 ring-purple-300 transition-all shadow-lg';
            circle.innerHTML = '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>';
            if (label) label.className = 'text-sm font-bold text-white text-center';
            if (nextLine) nextLine.className = 'flex-1 h-1 bg-white rounded transition-all mt-8';
        } else if (i === currentStep) {
            // Current
            circle.className = 'step-circle w-16 h-16 rounded-full bg-white text-purple-600 flex items-center justify-center font-bold text-xl ring-4 ring-purple-300 transition-all shadow-lg';
            circle.textContent = i;
            if (label) label.className = 'text-sm font-bold text-white text-center';
            if (nextLine) nextLine.className = 'flex-1 h-1 bg-purple-400 rounded transition-all mt-8';
        } else {
            // Future
            circle.className = 'step-circle w-16 h-16 rounded-full bg-purple-400 text-white flex items-center justify-center font-bold text-xl transition-all shadow-lg';
            circle.textContent = i;
            if (label) label.className = 'text-sm font-bold text-white text-center';
            if (nextLine) nextLine.className = 'flex-1 h-1 bg-purple-400 rounded transition-all mt-8';
        }
    }
}

function updateProgress() {
    let completedSteps = 0;
    
    if (formData.businessName && formData.description && formData.phone && 
        formData.whatsapp && formData.email && formData.address) {
        completedSteps++;
    }
    
    completedSteps++;
    
    if (formData.deliveryMethods.length > 0 && formData.paymentMethods.length > 0 && 
        formData.categories.length > 0) {
        completedSteps++;
    }
    
    completedSteps++;
    
    const percentage = Math.round((completedSteps / totalSteps) * 100);
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = document.getElementById('progress-percent');
    
    if (progressBar && progressPercent) {
        progressBar.style.width = percentage + '%';
        progressPercent.textContent = percentage + '%';
    }
}

function clearError(field) {
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

function clearAllErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('input, textarea').forEach(el => el.classList.remove('border-red-500'));
}

function showError(fieldId, message) {
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
