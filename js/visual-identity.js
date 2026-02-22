// Visual Identity Interactive Features

// Rotate cubes on hover
function configurarInteracaoCubo() {
    const cubePrimary = document.querySelector('#cube-primary .cube');
    const cubeSecondary = document.querySelector('#cube-secondary .cube');
    
    if (cubePrimary) {
        let rotationX = -20;
        let rotationY = 30;
        
        document.getElementById('cube-primary').addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            rotationY = 30 + ((x - centerX) / centerX) * 30;
            rotationX = -20 + ((y - centerY) / centerY) * -30;
            
            cubePrimary.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        });
        
        document.getElementById('cube-primary').addEventListener('mouseleave', function() {
            cubePrimary.style.transform = 'rotateX(-20deg) rotateY(30deg)';
        });
    }
    
    if (cubeSecondary) {
        let rotationX = -20;
        let rotationY = -30;
        
        document.getElementById('cube-secondary').addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            rotationY = -30 + ((x - centerX) / centerX) * 30;
            rotationX = -20 + ((y - centerY) / centerY) * -30;
            
            cubeSecondary.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        });
        
        document.getElementById('cube-secondary').addEventListener('mouseleave', function() {
            cubeSecondary.style.transform = 'rotateX(-20deg) rotateY(-30deg)';
        });
    }
}

// Auto-rotate cubes animation
function iniciarAnimacaoCubo() {
    const cubePrimary = document.querySelector('#cube-primary .cube');
    const cubeSecondary = document.querySelector('#cube-secondary .cube');
    
    let angle = 0;
    
    setInterval(() => {
        angle += 0.5;
        
        if (cubePrimary && !cubePrimary.matches(':hover')) {
            cubePrimary.style.transform = `rotateX(-20deg) rotateY(${30 + Math.sin(angle * 0.02) * 10}deg)`;
        }
        
        if (cubeSecondary && !cubeSecondary.matches(':hover')) {
            cubeSecondary.style.transform = `rotateX(-20deg) rotateY(${-30 + Math.cos(angle * 0.02) * 10}deg)`;
        }
    }, 50);
}

// Update cube colors when color picker changes
function atualizarCoresCubo(color, type) {
    const cube = type === 'primary' ? document.querySelector('#cube-primary .cube') : document.querySelector('#cube-secondary .cube');
    const hexDisplay = type === 'primary' ? document.getElementById('primary-hex-display') : document.getElementById('secondary-hex-display');
    
    if (!cube) return;
    
    // Generate color variations for cube faces
    const baseColor = color;
    const darkerColor = ajustarCor(color, -20);
    const darkestColor = ajustarCor(color, -40);
    const lighterColor = ajustarCor(color, 20);
    const lightestColor = ajustarCor(color, 40);
    
    const faces = cube.querySelectorAll('.cube-face');
    if (faces.length >= 6) {
        faces[0].style.background = baseColor;      // front
        faces[1].style.background = darkerColor;    // back
        faces[2].style.background = darkestColor;   // right
        faces[3].style.background = lighterColor;   // left
        faces[4].style.background = lightestColor;  // top
        faces[5].style.background = darkestColor;   // bottom
    }
    
    if (hexDisplay) {
        hexDisplay.textContent = color;
    }
}

// Adjust color brightness
function ajustarCor(color, amount) {
    const num = parseInt(color.replace('#', ''), 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
    const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

// Apply color palette (make it globally accessible)
window.aplicarPaletaCores = (primaryColor, secondaryColor) => {
    // Update form data
    formData.primaryColor = primaryColor;
    formData.secondaryColor = secondaryColor;
    formData.colorsSelected = true;  // Mark as user-selected
    
    // Update color inputs
    document.getElementById('primary-color').value = primaryColor;
    document.getElementById('primary-color-text').value = primaryColor;
    document.getElementById('secondary-color').value = secondaryColor;
    document.getElementById('secondary-color-text').value = secondaryColor;
    
    // Update preview boxes
    document.getElementById('primary-preview').style.backgroundColor = primaryColor;
    document.getElementById('secondary-preview').style.backgroundColor = secondaryColor;
    
    // Update cubes
    atualizarCoresCubo(primaryColor, 'primary');
    atualizarCoresCubo(secondaryColor, 'secondary');
    
    // Save to storage
    salvarNoArmazenamento();
    
    // Update progress
    atualizarProgresso();
    
    // Show feedback
    mostrarMensagemPaletaAplicada();
};

function mostrarMensagemPaletaAplicada() {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: '🎨 Paleta aplicada!',
        text: 'Cores atualizadas com sucesso.',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        customClass: {
            popup: 'rounded-xl'
        }
    });
}

// Initialize visual identity features
function inicializarIdentidadeVisual() {
    // Setup cube interaction
    configurarInteracaoCubo();
    
    // Start auto-rotation animation
    iniciarAnimacaoCubo();
    
    // Update cubes with current colors (use defaults if empty)
    const primaryColor = formData.primaryColor || '#a855f7';
    const secondaryColor = formData.secondaryColor || '#ec4899';
    
    atualizarCoresCubo(primaryColor, 'primary');
    atualizarCoresCubo(secondaryColor, 'secondary');
    
    // Only save to formData if user has actually selected colors
    // (this prevents counting step 4 as complete on initial load)
}

// Call init when step 4 becomes active
document.addEventListener('DOMContentLoaded', function() {
    // Observer to detect when step 4 is shown
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            const step4 = document.getElementById('step-4');
            if (step4 && step4.classList.contains('active')) {
                inicializarIdentidadeVisual();
                observer.disconnect();
            }
        });
    });
    
    observer.observe(document.body, {
        attributes: true,
        subtree: true,
        attributeFilter: ['class']
    });
    
    // Also init if already on step 4
    setTimeout(() => {
        const step4 = document.getElementById('step-4');
        if (step4 && step4.classList.contains('active')) {
            inicializarIdentidadeVisual();
        }
    }, 100);
});
