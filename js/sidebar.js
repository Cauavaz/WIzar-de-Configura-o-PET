// Controle do menu lateral

function configurarSidebar() {
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('sidebar-close');
    const overlay = document.getElementById('sidebar-overlay');
    const floatingBtn = document.getElementById('floating-menu-btn');
    const mainContainer = document.getElementById('main-container');
    
    if (window.innerWidth >= 1024) {
        // Desktop: mostrar menu por padrão
        sidebar.classList.remove('sidebar-hidden');
        sidebar.classList.add('sidebar-visible');
        mainContainer.style.marginLeft = '288px';
        floatingBtn.classList.add('hidden');
    } else {
        // Mobile: esconder menu por padrão
        sidebar.classList.add('sidebar-hidden');
        sidebar.classList.remove('sidebar-visible');
        mainContainer.style.marginLeft = '0';
        floatingBtn.classList.remove('hidden');
    }
    
    // Abrir sidebar com botão flutuante
    if (floatingBtn) {
        floatingBtn.addEventListener('click', function() {
            alternarSidebar();
        });
    }
    
    // Fechar sidebar com botão fechar
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Botão fechar clicado');
            fecharSidebarNoMobile();
        });
    } else {
        console.error('Close button not found!');
    }
    
    // Fechar sidebar ao clicar no overlay
    overlay.addEventListener('click', function() {
        fecharSidebarNoMobile();
    });
    
    // Fechar sidebar ao clicar em itens do menu no mobile
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth < 1024) {
                fecharSidebarNoMobile();
            }
        });
    });
    
    atualizarSidebarAtivo();
}

function alternarSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const mainContainer = document.getElementById('main-container');
    const floatingBtn = document.getElementById('floating-menu-btn');
    
    const isHidden = sidebar.classList.contains('sidebar-hidden');
    
    if (isHidden) {
        // Open sidebar
        sidebar.classList.remove('sidebar-hidden');
        sidebar.classList.add('sidebar-visible');
        floatingBtn.classList.add('hidden');
        if (window.innerWidth < 1024) {
            overlay.classList.remove('hidden');
        } else {
            mainContainer.style.marginLeft = '288px'; // 72 * 4 = 288px (w-72)
        }
    } else {
        // Close sidebar
        sidebar.classList.add('sidebar-hidden');
        sidebar.classList.remove('sidebar-visible');
        overlay.classList.add('hidden');
        mainContainer.style.marginLeft = '0';
        floatingBtn.classList.remove('hidden');
    }
}

function fecharSidebarNoMobile() {
    console.log('closeSidebarOnMobile called');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const mainContainer = document.getElementById('main-container');
    const floatingBtn = document.getElementById('floating-menu-btn');
    
    console.log('Sidebar element:', sidebar);
    console.log('Current classes:', sidebar.className);
    
    sidebar.classList.add('sidebar-hidden');
    sidebar.classList.remove('sidebar-visible');
    overlay.classList.add('hidden');
    mainContainer.style.marginLeft = '0';
    floatingBtn.classList.remove('hidden');
    
    console.log('After close - classes:', sidebar.className);
}

function atualizarSidebarAtivo() {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeItem = document.querySelector(`.menu-item[data-step="${currentStep}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}
