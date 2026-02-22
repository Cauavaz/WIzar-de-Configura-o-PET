// Animações e dados do dashboard

// Contador animado rápido (300ms)
function animateCounter(elementId, targetValue, prefix = '', suffix = '', duration = 300) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startValue = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Função de suavização para animação
        const easeOutQuad = progress * (2 - progress);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuad);
        
        if (prefix === 'R$') {
            element.textContent = prefix + ' ' + currentValue.toLocaleString('pt-BR');
        } else {
            element.textContent = prefix + currentValue + suffix;
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            // Garantir que o valor final seja exato
            if (prefix === 'R$') {
                element.textContent = prefix + ' ' + targetValue.toLocaleString('pt-BR');
            } else {
                element.textContent = prefix + targetValue + suffix;
            }
        }
    }
    
    requestAnimationFrame(update);
}

// Animar barras de progresso
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.transition = 'width 1.5s ease-out';
            bar.style.width = targetWidth;
        }, index * 200);
    });
}

// Animar barras do gráfico
function animateChartBars() {
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        // Armazenar altura alvo do atributo data ou estilo atual
        const targetHeight = bar.getAttribute('data-height') || bar.style.height;
        
        // Começar do zero
        bar.style.height = '0%';
        bar.style.transition = 'none';
        
        // Forçar reflow
        bar.offsetHeight;
        
        // Animar até altura alvo
        setTimeout(() => {
            bar.style.transition = 'height 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
            bar.style.height = targetHeight;
        }, index * 150 + 100);
    });
}

// Gerar dados de pedidos recentes usando dados reais do formulário
function populateRecentOrders() {
    const ordersContainer = document.getElementById('recent-orders');
    if (!ordersContainer) return;
    
    // Usar categorias reais dos dados do formulário
    const categories = formData.categories.length > 0 ? formData.categories : ['Ração Premium', 'Petiscos', 'Brinquedos', 'Acessórios'];
    
    // Gerar pedidos baseados em dados reais
    const customerNames = ['Maria Silva', 'João Santos', 'Ana Costa', 'Pedro Lima', 'Carla Souza'];
    const statuses = [
        { name: 'Entregue', color: 'green' },
        { name: 'Em trânsito', color: 'blue' },
        { name: 'Preparando', color: 'yellow' },
        { name: 'Pendente', color: 'orange' }
    ];
    
    const orders = customerNames.slice(0, 5).map((customer, index) => {
        const category = categories[index % categories.length];
        const status = statuses[index % statuses.length];
        const value = (Math.random() * 150 + 50).toFixed(2);
        
        return {
            customer: customer,
            product: category,
            value: `R$ ${value.replace('.', ',')}`,
            status: status.name,
            statusColor: status.color
        };
    });
    
    const statusColors = {
        green: 'bg-green-100 text-green-700',
        blue: 'bg-blue-100 text-blue-700',
        yellow: 'bg-yellow-100 text-yellow-700',
        orange: 'bg-orange-100 text-orange-700'
    };
    
    ordersContainer.innerHTML = orders.map(order => `
        <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <td class="py-3 px-4 text-sm text-gray-800">${order.customer}</td>
            <td class="py-3 px-4 text-sm text-gray-600">${order.product}</td>
            <td class="py-3 px-4 text-sm font-semibold text-gray-800">${order.value}</td>
            <td class="py-3 px-4">
                <span class="px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.statusColor]}">
                    ${order.status}
                </span>
            </td>
        </tr>
    `).join('');
}

// Exibir informações reais do negócio
function displayBusinessInfo() {
    // Adicionar nome do negócio ao dashboard se disponível
    if (formData.businessName) {
        const dashboardHeader = document.querySelector('#step-5 h2');
        if (dashboardHeader) {
            dashboardHeader.innerHTML = `
                <span class="text-3xl font-bold text-gray-800">Dashboard - ${formData.businessName}</span>
                <p class="text-gray-600 text-base font-normal mt-2">${formData.description || 'Painel de controle do seu pet shop'}</p>
            `;
        }
    }
}

// Inicializar animações do dashboard
function initDashboard() {
    // Exibir informações reais do negócio
    displayBusinessInfo();
    
    // Calcular métricas baseadas nos dados do formulário
    const categoriesCount = formData.categories.length || 4;
    const estimatedSales = categoriesCount * 2500 + Math.floor(Math.random() * 5000);
    const estimatedOrders = Math.floor(estimatedSales / 150);
    const estimatedCustomers = Math.floor(estimatedOrders * 5);
    
    // Animar métricas com valores calculados - Rápido e suave
    setTimeout(() => {
        animateCounter('metric-sales', estimatedSales, 'R$', '', 400);
        animateCounter('metric-orders', estimatedOrders, '', '', 350);
        animateCounter('metric-customers', estimatedCustomers, '', '', 380);
    }, 100);
    
    // Animar gráficos - Mais rápido
    setTimeout(() => {
        animateProgressBars();
        animateChartBars();
    }, 300);
    
    // Preencher pedidos - Mais rápido
    setTimeout(() => {
        populateRecentOrders();
    }, 500);
}

// Chamar init quando passo 5 ficar ativo
document.addEventListener('DOMContentLoaded', function() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            const step5 = document.getElementById('step-5');
            if (step5 && step5.classList.contains('active')) {
                initDashboard();
                observer.disconnect();
            }
        });
    });
    
    observer.observe(document.body, {
        attributes: true,
        subtree: true,
        attributeFilter: ['class']
    });
    
    // Também inicializar se já estiver no passo 5
    setTimeout(() => {
        const step5 = document.getElementById('step-5');
        if (step5 && step5.classList.contains('active')) {
            initDashboard();
        }
    }, 100);
});
