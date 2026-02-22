// Quick Actions for Hours Page

function definirTodosDiasAbertos() {
    daysOfWeek.forEach(day => {
        formData.hours[day.key].closed = false;
        formData.hours[day.key].open = '09:00';
        formData.hours[day.key].close = '18:00';
    });
    
    renderizarHorarios();
    salvarNoArmazenamento();
    atualizarProgresso();  // Atualizar progresso após definir horários
    
    // Show success message
    mostrarMensagemAcaoRapida('Todos os dias configurados como abertos! 🎉');
}

function definirApenasDiasUteis() {
    daysOfWeek.forEach(day => {
        // Close Saturday and Sunday
        if (day.key === 'saturday' || day.key === 'sunday') {
            formData.hours[day.key].closed = true;
            formData.hours[day.key].open = '';
            formData.hours[day.key].close = '';
        } else {
            formData.hours[day.key].closed = false;
            formData.hours[day.key].open = '09:00';
            formData.hours[day.key].close = '18:00';
        }
    });
    
    renderizarHorarios();
    salvarNoArmazenamento();
    atualizarProgresso();  // Atualizar progresso após definir horários
    
    // Show success message
    mostrarMensagemAcaoRapida('Configurado para abrir apenas em dias úteis! 📅');
}

function mostrarMensagemAcaoRapida(message) {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
            popup: 'rounded-xl'
        }
    });
}
