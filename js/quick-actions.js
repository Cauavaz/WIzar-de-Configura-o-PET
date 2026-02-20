// Quick Actions for Hours Page

function setAllDaysOpen() {
    daysOfWeek.forEach(day => {
        formData.hours[day.key].closed = false;
        formData.hours[day.key].open = '09:00';
        formData.hours[day.key].close = '18:00';
    });
    
    renderHours();
    saveToStorage();
    
    // Show success message
    showQuickActionMessage('Todos os dias configurados como abertos! 🎉');
}

function setWeekdaysOnly() {
    daysOfWeek.forEach(day => {
        // Close Saturday and Sunday
        if (day.key === 'saturday' || day.key === 'sunday') {
            formData.hours[day.key].closed = true;
        } else {
            formData.hours[day.key].closed = false;
            formData.hours[day.key].open = '09:00';
            formData.hours[day.key].close = '18:00';
        }
    });
    
    renderHours();
    saveToStorage();
    
    // Show success message
    showQuickActionMessage('Configurado para abrir apenas em dias úteis! 📅');
}

function showQuickActionMessage(message) {
    // Create temporary message
    const messageDiv = document.createElement('div');
    messageDiv.className = 'fixed top-24 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fadeIn';
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transition = 'opacity 0.3s';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}
