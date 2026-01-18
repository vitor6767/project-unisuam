const products = [
            { id: 1, category: 'tonico', title: 'Tônico Minoxidil Turbo', desc: 'Solução 5% para crescimento acelerado e preenchimento de falhas.', price: 'R$ 65,00', image: '../Assets/tonicocapilar.png' },
            { id: 2, category: 'barba', title: 'Óleo Hidratante Wood', desc: 'Essência amadeirada. Hidrata os fios e evita coceira na pele.', price: 'R$ 39,90', image: '../Assets/modelador.png' },
            { id: 3, category: 'tonico', title: 'Tônico Fortalecedor Raiz', desc: 'Com biotina e cafeína. Engrossa o fio e previne a queda.', price: 'R$ 55,00', image: '../Assets/tonicocapilar.png' },
            { id: 4, category: 'barba', title: 'Balm Modelador', desc: 'Alinha os fios rebeldes da barba e bigode com efeito matte.', price: 'R$ 42,00', image: '../Assets/modelador.png' },
            { id: 5, category: 'barba', title: 'Shampoo para Barba Ice', desc: 'Limpeza profunda com sensação refrescante de mentol.', price: 'R$ 35,00', image: '../Assets/shampoo.png' },
            { id: 6, category: 'tonico', title: 'Kit Crescimento Total', desc: 'Combo com Tônico Turbo + Shampoo Antiqueda.', price: 'R$ 99,90', image: '../Assets/kittotal.png' }
        ];

        const grid = document.getElementById('product-grid');
        const buttons = document.querySelectorAll('.filter-btn');

        function renderProducts(category) {
            grid.innerHTML = ''; 
            const filtered = category === 'all' ? products : products.filter(p => p.category === category);
            filtered.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                const message = `Olá, gostaria de comprar o ${product.title} por ${product.price}`;
                const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
                card.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" class="card-image">
                    <div class="card-content">
                        <span class="category-tag">${product.category === 'tonico' ? 'Capilar' : 'Barba'}</span>
                        <h3 class="product-title">${product.title}</h3>
                        <p class="product-desc">${product.desc}</p>
                        <div class="price-row">
                            <span class="price">${product.price}</span>
                            <a href="${whatsappLink}" target="_blank" class="buy-btn">Comprar</a>
                        </div>
                    </div>
                `;
                grid.appendChild(card);
            });
        }

        function filterProducts(category) {
            renderProducts(category);
            buttons.forEach(btn => {
                btn.classList.remove('active');
                if(btn.getAttribute('onclick').includes(category)) btn.classList.add('active');
            });
        }

        renderProducts('all');

        document.querySelectorAll('.slide-menu a').forEach(link => {
            link.addEventListener('click', () => {
                document.getElementById('menu-toggle').checked = false;
            });
        });