// Application Initialization

document.addEventListener('DOMContentLoaded', function() {
    loadFromStorage();
    initializeHours();
    setupEventListeners();
    setupSidebar();
    updateStepIndicator();
    populateFormFields();
    updateProgress();
});
