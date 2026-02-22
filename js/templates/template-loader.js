// Sistema de templates HTML em JavaScript

const Templates = {
    step1: null,
    step2: null,
    step3: null,
    step4: null,
    step5: null,
    sidebar: null,
    summary: null,
    
    init() {
        this.injectSidebar();
        this.injectSteps();
        this.injectSummary();
    },
    
    injectSidebar() {
        const sidebarContainer = document.getElementById('sidebar-container');
        if (sidebarContainer && this.sidebar) {
            sidebarContainer.innerHTML = this.sidebar;
        }
    },
    
    // Injetar todos os templates de passos
    injectSteps() {
        const stepsContainer = document.getElementById('steps-container');
        if (!stepsContainer) return;
        
        const stepsHTML = `
            ${this.step1 || ''}
            ${this.step2 || ''}
            ${this.step3 || ''}
            ${this.step4 || ''}
            ${this.step5 || ''}
        `;
        
        stepsContainer.innerHTML = stepsHTML;
    },
    
    // Injetar template do resumo
    injectSummary() {
        const summaryContainer = document.getElementById('summary-container');
        if (summaryContainer && this.summary) {
            summaryContainer.innerHTML = this.summary;
        }
    }
};

// Tornar disponível globalmente
if (typeof window !== 'undefined') {
    window.Templates = Templates;
}
