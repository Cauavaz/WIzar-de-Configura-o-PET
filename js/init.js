// Inicialização do aplicativo

document.addEventListener('DOMContentLoaded', function() {
    carregarDoArmazenamento();
    inicializarHorarios();
    configurarEventListeners();
    configurarSidebar();
    atualizarIndicadorPasso();
    preencherCamposFormulario();
    atualizarProgresso();
    
    // Inicializar efeitos do widget da sidebar
    if (typeof inicializarEfeitosWidgetSidebar === 'function') {
        inicializarEfeitosWidgetSidebar();
    }
    
    // Atualização inicial do widget da sidebar
    if (typeof atualizarWidgetSidebar === 'function') {
        atualizarWidgetSidebar();
    }
});
