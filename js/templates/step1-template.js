// Template do passo 1 - Informações básicas

Templates.step1 = `
<div id="step-1" class="step-content active animate-fadeIn">
    <div class="grid lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
        <!-- Left Column - Form Fields (3/5) -->
        <div class="lg:col-span-3 space-y-4 sm:space-y-6">
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Nome do Estabelecimento *
                </label>
                <input type="text" id="businessName" 
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                    placeholder="Ex: Pet Shop Amigo Fiel">
                <p class="error-message text-red-600 text-sm mt-1 hidden"></p>
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Telefone *
                </label>
                <input type="tel" id="phone" 
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                    placeholder="(11) 1234-5678">
                <p class="error-message text-red-600 text-sm mt-1 hidden"></p>
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    WhatsApp *
                </label>
                <input type="tel" id="whatsapp" 
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                    placeholder="(11) 91234-5678">
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    E-mail *
                </label>
                <input type="email" id="email" 
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                    placeholder="contato@petshop.com.br">
                <p class="error-message text-red-600 text-sm mt-1 hidden"></p>
            </div>
        </div>

        <!-- Right Column - Image Area (2/5) -->
        <div class="lg:col-span-2 flex flex-col justify-center">
            <div class="relative bg-gradient-to-br from-purple-100 via-pink-50 to-purple-50 rounded-2xl p-8 shadow-xl">
                <div class="absolute top-4 right-4 w-20 h-20 bg-purple-200 rounded-full opacity-30"></div>
                <div class="absolute bottom-4 left-4 w-16 h-16 bg-pink-200 rounded-full opacity-30"></div>
                
                <div class="relative z-10 flex flex-col items-center">
                    <img src="./imgs/svg/dog.svg" class="w-64 h-64 object-contain mb-4">
                    <div class="text-center">
                        <h3 class="text-lg font-bold text-purple-800 mb-2">🐾 Bem-vindo!</h3>
                        <p class="text-sm text-gray-600">Configure seu pet shop em minutos</p>
                    </div>
                </div>
                
                <div class="mt-6 flex justify-center gap-2">
                    <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <div class="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Additional Fields Below -->
    <div class="grid md:grid-cols-2 gap-6 mt-6">
        <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
                Descrição do Negócio *
            </label>
            <textarea id="description" rows="4"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none resize-none"
                placeholder="Descreva seu pet shop, serviços oferecidos..."></textarea>
            <p class="error-message text-red-600 text-sm mt-1 hidden"></p>
        </div>

        <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
                Endereço/Região de Atendimento *
            </label>
            <textarea id="address" rows="4"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none resize-none"
                placeholder="Rua, bairro, cidade ou região que atende"></textarea>
            <p class="error-message text-red-600 text-sm mt-1 hidden"></p>
        </div>
    </div>
</div>
`;
