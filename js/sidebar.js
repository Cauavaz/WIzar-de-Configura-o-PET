// Sidebar Navigation Functions

function setupSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('sidebar-toggle');
    const overlay = document.getElementById('sidebar-overlay');
    
    toggle.addEventListener('click', function() {
        toggleSidebar();
    });
    
    updateSidebarActive();
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    sidebar.classList.toggle('sidebar-hidden');
    overlay.classList.toggle('hidden');
}

function updateSidebarActive() {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeItem = document.querySelector(`.menu-item[data-step="${currentStep}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}
