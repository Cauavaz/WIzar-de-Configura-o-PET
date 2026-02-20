// Event Handlers and Navigation

function nextStep() {
    if (currentStep === totalSteps) {
        showSummary();
        updateProgress();
        return;
    }
    
    if (validateStep(currentStep)) {
        currentStep++;
        updateStepDisplay();
        updateSidebarActive();
        updateProgress();
    }
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
        updateSidebarActive();
        updateProgress();
    }
}

function navigateToStep(step) {
    if (step >= 1 && step <= totalSteps) {
        currentStep = step;
        updateStepDisplay();
        updateSidebarActive();
        updateProgress();
        
        if (window.innerWidth < 1024) {
            toggleSidebar();
        }
    }
}

function editStep(step) {
    currentStep = step;
    updateStepDisplay();
    updateSidebarActive();
    updateProgress();
}

function publishSite() {
    const confirmation = confirm('🎉 Parabéns! Seu site está pronto para ser publicado!\n\nEm produção, os dados seriam enviados para o servidor.\n\nDeseja continuar?');
    
    if (confirmation) {
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
                <button onclick="location.reload()" class="mt-8 px-8 py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg">
                    Criar Novo Site
                </button>
            </div>
        `;
        
        document.getElementById('summary-content').innerHTML = successHTML;
        document.getElementById('prev-btn').classList.add('hidden');
        document.getElementById('publish-btn').classList.add('hidden');
    }
}

function showSummaryFromMenu() {
    let allValid = true;
    for (let i = 1; i <= totalSteps; i++) {
        if (!validateStep(i)) {
            allValid = false;
            currentStep = i;
            updateStepDisplay();
            updateSidebarActive();
            updateProgress();
            
            if (window.innerWidth < 1024) {
                toggleSidebar();
            }
            
            alert(`Por favor, complete o passo ${i} antes de continuar.`);
            return;
        }
    }
    
    if (allValid) {
        showSummary();
        updateProgress();
        
        if (window.innerWidth < 1024) {
            toggleSidebar();
        }
    }
}
