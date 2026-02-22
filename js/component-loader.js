// Component Loader System
// Loads HTML components dynamically to keep code modular and organized

const ComponentLoader = {
    // Cache for loaded components
    cache: {},
    
    // Load a component from the components folder
    async loadComponent(componentName) {
        // Check cache first
        if (this.cache[componentName]) {
            return this.cache[componentName];
        }
        
        try {
            const response = await fetch(`components/${componentName}.html`);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${componentName}`);
            }
            
            const html = await response.text();
            this.cache[componentName] = html;
            return html;
        } catch (error) {
            console.error(`Error loading component ${componentName}:`, error);
            return '';
        }
    },
    
    // Load and inject a component into a target element
    async injectComponent(componentName, targetSelector) {
        const html = await this.loadComponent(componentName);
        const target = document.querySelector(targetSelector);
        
        if (target && html) {
            target.innerHTML = html;
            return true;
        }
        
        return false;
    },
    
    // Load multiple components in parallel
    async loadMultiple(components) {
        const promises = components.map(comp => this.loadComponent(comp));
        return await Promise.all(promises);
    }
};

// Make globally available
if (typeof window !== 'undefined') {
    window.ComponentLoader = ComponentLoader;
}
