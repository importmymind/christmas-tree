// --- SNOW EFFECT ---
function createSnow() {
    const container = document.getElementById('snowContainer');
    if(!container) return;
    const flakeCount = 60; 
    
    for(let i=0; i<flakeCount; i++) {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.innerHTML = '❄'; 
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.animationDuration = Math.random() * 10 + 10 + 's'; 
        flake.style.opacity = Math.random() * 0.5 + 0.3;
        flake.style.fontSize = Math.random() * 15 + 10 + 'px';
        flake.style.animationDelay = '-' + (Math.random() * 20) + 's';
        container.appendChild(flake);
    }
}

// --- LIGHTS EFFECT ---
function createLights() {
    const container = document.getElementById('treeContainer');
    if(!container) return;
    const colors = ['#ff5252', '#ffd740', '#40c4ff', '#69f0ae'];
    
    for(let i=0; i<15; i++) {
        const light = document.createElement('div');
        light.className = 'light';
        light.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        light.style.color = light.style.backgroundColor; 
        light.style.left = (Math.random() * 80 + 10) + '%';
        light.style.top = (Math.random() * 80 + 10) + '%';
        light.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
        container.appendChild(light);
    }
}



// --- MAGIC MOUSE DUST ---
document.addEventListener('mousemove', (e) => {
    if(Math.random() < 0.7) return; 
    const dust = document.createElement('div');
    dust.className = 'magic-dust';
    dust.style.left = e.clientX + 'px';
    dust.style.top = e.clientY + 'px';
    dust.style.background = Math.random() > 0.5 ? '#fff' : '#ffd700';
    document.body.appendChild(dust);
    setTimeout(() => { dust.remove(); }, 800);
});

// --- OPEN GIFT FUNCTION ---
function openGift(id) {
    const box = document.querySelector(`.box-${id}`); 
    
    // Güvenlik: Kutu zaten 'box-opened' ise dur
    if(box.classList.contains('box-opened')) {
        return; 
    }

    // 1. Kutuyu açıldı olarak işaretle (YEŞİL RENK İÇİN ÖNEMLİ)
    box.classList.add('box-opened'); 
    
    // 2. Konfeti patlat
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ['#c62828', '#388e3c', '#ffd740'] });

    const data = gifts[id];
    
    if (data) {
        showModal(data, box, id); 
    }

    // 3. YENİ EKLEME: İndirme butonunu kontrol et (500ms sonra)
    // Bu satır mutlaka süslü parantezin İÇİNDE olmalı
    setTimeout(checkDownloadButton, 500);
}

// --- MODAL GÖSTERME ---
function showModal(data, boxElement = null, id = null) {
    const mIcon = document.getElementById('mIcon');
    const mTitle = document.getElementById('mTitle');
    const mDesc = document.getElementById('mDesc');
    const mAction = document.getElementById('mAction');
    
    mAction.innerHTML = '';
    mTitle.innerText = data.title;
    mDesc.innerText = data.desc;
    mIcon.style.display = 'block'; 

    // 1. GACHA (SONNY ANGEL, AURA, TAROT)
    if (data.type === 'gacha') {
        mIcon.style.display = 'none';
        
        // closedImage'in var olduğundan emin olalım (Yoksa hata vermesin)
        const boxImg = data.closedImage ? data.closedImage : "assets/contents/sonny_closed_box.png";

        mAction.innerHTML = `
            <div style="cursor: pointer; text-align: center;" onclick="revealGacha(this, ${id})">
                <p id="gachaHint" style="color: #c62828; font-weight:bold; font-size: 16px; animation: pulse 1s infinite;">Tap to Open! 👇</p>
                <img src="${boxImg}" id="gachaClosedBox" class="clickable-box" style="width: 160px; margin-bottom: 15px;">
            </div>
            <div id="gachaResultContainer"></div>
        `;
    }

    // 2. FORTUNE COOKIE
    else if (data.type === 'fortune') {
        mIcon.style.display = 'none'; 
        const randomMsg = data.messages[Math.floor(Math.random() * data.messages.length)];
        const cookieSrc = data.customImage ? data.customImage : "";
        
        mAction.innerHTML = `
            <div style="cursor: pointer;" onclick="crackCookie(this)">
                <img src="${cookieSrc}" alt="Cookie" class="clickable-cookie" style="width: 150px; margin-bottom: 10px;">
                <p id="cookieHint" style="color: #666; font-size: 14px; animation: pulse 1s infinite;">🍪 Click to crack! 🔨</p>
            </div>
            <div id="fortuneResult" class="fortune-text">
                "${randomMsg}"
            </div>
        `;

        // Ağaçtaki kutuyu güncelle
        if(boxElement) {
            updateBoxContent(boxElement, `
                <img src="${cookieSrc}" class="box-prize-img">
                <div class="box-prize-text">${randomMsg}</div>
            `);
        }
    }

    // 3. TICKET (DREAM DESTINATION) - YENİ
    else if (data.type === 'ticket') {
        mIcon.style.display = 'none';
        
        mAction.innerHTML = `
            <div style="cursor: pointer; text-align: center;" onclick="revealTicket(this, ${id})">
                <p id="ticketHint" style="color: #c62828; font-weight:bold; font-size: 16px; animation: pulse 1s infinite;"> Tap to reveal destination! 👇</p>
                <img src="${data.closedImage}" id="ticketClosedBox" class="clickable-box" style="width: 160px; margin-bottom: 15px;">
            </div>
            <div id="ticketResultContainer"></div>
        `;
    }

    else if (data.type === 'movie') {
        mIcon.style.display = 'none';
        
        mAction.innerHTML = `
            <div style="cursor: pointer; text-align: center;" onclick="revealMovie(this, ${id})">
                <img src="${data.closedImage}" id="movieClosedBox" class="clickable-box" style="width: 160px; margin-bottom: 15px;">
                <p id="movieHint" style="color: #c62828; font-weight:bold; font-size: 16px; animation: pulse 1s infinite;">🍿 Tap to Spin! 🎬</p>
            </div>
            <div id="movieResultContainer"></div>
        `;
    }

    // --- MAGIC GIFT (BOOK & GAME) - YENİ TİP ---
    else if (data.type === 'magic_gift') {
        mIcon.style.display = 'none';
        
        // Kategoriye göre (book/game) farklı buton yazısı
        let hintText = data.category === 'book' ? "✨ Reveal the Book ✨" : "🕹️ Press Start 🕹️";
        let iconSize = data.category === 'book' ? "120px" : "140px"; // Oyun ikonu biraz daha büyük olabilir

        mAction.innerHTML = `
            <div style="cursor: pointer; text-align: center;" onclick="revealMagicGift(this, ${id})">
                <p id="magicHint" style="color: #6a1b9a; font-weight:bold; font-size: 18px; margin-bottom: 15px; animation: pulse 1s infinite;">${hintText}</p>
                <img src="${data.closedImage}" id="magicClosedBox" class="clickable-box" style="width: ${iconSize}; filter: drop-shadow(0 0 10px rgba(106, 27, 154, 0.5));">
            </div>
            <div id="magicResultContainer"></div>
        `;
    }

   
    
    // ----------------------------------------------------
    // --- 2. KUTU: GELİŞMİŞ PİYANO (KLAVYE + DEMO + İNDİRME) ---
    // ----------------------------------------------------
    else if (data.type === 'piano_gift') {
        mIcon.style.display = 'none';

        mAction.innerHTML = `
            <div class="piano-wrapper">
                <div class="piano-screen" id="pianoStatus">Use Keyboard (A-K) or Mouse 🎵</div>

                <div class="piano-keys">
                    <div class="key white" data-note="C" data-key="a" onclick="playPiano('C')"><span>Do <small>(A)</small></span></div>
                    <div class="key white" data-note="D" data-key="s" onclick="playPiano('D')"><span>Re <small>(S)</small></span></div>
                    <div class="key white" data-note="E" data-key="d" onclick="playPiano('E')"><span>Mi <small>(D)</small></span></div>
                    <div class="key white" data-note="F" data-key="f" onclick="playPiano('F')"><span>Fa <small>(F)</small></span></div>
                    <div class="key white" data-note="G" data-key="g" onclick="playPiano('G')"><span>Sol <small>(G)</small></span></div>
                    <div class="key white" data-note="A" data-key="h" onclick="playPiano('A')"><span>La <small>(H)</small></span></div>
                    <div class="key white" data-note="B" data-key="j" onclick="playPiano('B')"><span>Si <small>(J)</small></span></div>
                    <div class="key white" data-note="C2" data-key="k" onclick="playPiano('C2')"><span>Do <small>(K)</small></span></div>
                </div>

                <div class="piano-controls" style="flex-wrap: wrap;">
                    <button id="btnRecord" onclick="toggleRecord()" class="p-btn record-btn">🔴 Record</button>
                    <button id="btnPlay" onclick="playRecording()" class="p-btn play-btn" disabled>▶️ Play</button>
                    <button onclick="clearRecording()" class="p-btn clear-btn">🗑️ Reset</button>
                </div>
                
                <div class="piano-controls" style="margin-top:10px; justify-content: center;">
                    <button onclick="playJingleBellsDemo()" class="p-btn demo-btn">🎄 Demo (Jingle Bells)</button>
                    <button id="btnSave" onclick="saveToBox()" class="p-btn download-btn" disabled style="display:none;">Save🎁 </button>
                </div>
            </div>
        `;
        
        resetPianoVariables();
        // Klavye dinleyicisini aktif et (Aşağıda tanımlayacağız)
        enableKeyboard(true); 
    }



    else if (data.type === 'music_gift') {
        mIcon.style.display = 'none'; 
        
        // 1. Ekrana Müzik Çaları Bas (Hiçbir şeye tıklamadan direkt gelir)
        mAction.innerHTML = `
            <div class="player-wrapper" style="animation: fadeIn 0.5s;">
                <div class="record-container" id="recordContainer">
                    <video src="${data.gifImage}" id="recordVideo" loop muted playsinline class="record-video"></video>
                </div>

                <div class="song-info">
                    <h3 id="songTitle">Winter Vibes ❄️</h3>
                    <p>Christmas Special</p>
                </div>

                <div class="progress-area">
                    <span id="currentTime">0:00</span>
                    <div class="progress-bar" onclick="seekAudio(event)">
                        <div class="progress-fill" id="progressFill"></div>
                    </div>
                    <span id="durationTime">0:00</span>
                </div>

                <div class="controls">
                    <button class="ctrl-btn" onclick="prevSong()">⏮</button>
                    <button class="play-btn-main" onclick="togglePlayPause()" id="mainPlayBtn">▶</button>
                    <button class="ctrl-btn" onclick="nextSong()">⏭</button>
                </div>
            </div>
        `;

        // Şarkıyı hazırla
        setTimeout(() => {
            loadSong(currentSongIndex);
        }, 100);

        // 2. AĞAÇTAKİ KUTUYU GÜNCELLE (RESİM KOYMA KISMI BURASI)
        const treeBox = document.querySelector(`.box-${id}`); // Tıklanan kutuyu bul
        
        if (treeBox) {
            // Kutunun rengini koyulaştır ve altın çerçeve ekle
            treeBox.style.background = "#222"; 
            treeBox.style.boxShadow = "inset 0 0 10px #000";
            treeBox.style.border = "2px solid #d4af37";

            // İçine senin 'mini_disk.png' resmini koy ve döndür
            treeBox.innerHTML = `
                <div style="width:100%; height:100%; display:flex; justify-content:center; align-items:center; overflow:hidden;">
                    <img src="assets/contents/mini_disk.png" 
                         alt="Playing" 
                         style="width:90%; height:90%; object-fit:contain; animation: spinRecord 4s linear infinite;">
                </div>
            `;
        }
    }

    // ----------------------------------------------------
    // --- 14. KUTU: SÜS TASARIM ATÖLYESİ ---
    // ----------------------------------------------------
    else if (data.type === 'ornament_design') {
        mIcon.style.display = 'none';

        // 1. DIŞ ÇERÇEVEYİ AYARLA
        const modalContent = document.querySelector('.modal-content') || document.querySelector('#modal > div');
        if (modalContent) {
            modalContent.classList.add('workshop-active');
            
            // --- KRİTİK DÜZELTME: Eski Başlık ve Beyaz Şeridi Yok Et ---
            // Modalın orjinal header kısmını bulup gizliyoruz
            const oldHeader = modalContent.querySelector('.modal-header');
            if (oldHeader) oldHeader.style.display = 'none';
            
            // Eğer başlık header içinde değilse, boşta duran eski yazıları bul ve gizle
            const orphans = modalContent.querySelectorAll('h2, h3, p, .close, .btn-close');
            orphans.forEach(el => {
                // Bizim yeni tasarımımızın parçası değilse gizle
                if (!el.closest('.workshop-wrapper')) {
                    el.style.display = 'none';
                }
            });
            // ------------------------------------------------------------

            const modalDialog = modalContent.closest('.modal-dialog') || modalContent.parentElement;
            if (modalDialog) {
                modalDialog.style.minWidth = '900px';
                modalDialog.style.width = '900px';
            }
        }

        // 2. YENİ HTML (Kapatma Butonu Eklendi)
        mAction.innerHTML = `
            <div class="workshop-wrapper">
                
                <div class="workshop-close-icon" onclick="(typeof closeModal === 'function' ? closeModal() : document.getElementById('modal').style.display='none')">✕</div>

                

                <div class="workshop-split-container">
                    
                    <div class="workshop-left">
                        <div class="ornament-container">
                            <div class="ornament-hook"></div>
                            <div class="glass-reflection"></div>
                            <canvas id="drawingCanvas" width="280" height="280"></canvas>
                        </div>
                    </div>

                    <div class="workshop-right">
                        <div class="ornament-toolbar">
                            <div class="toolbar-section">
                                <div class="tool-dot active" onclick="setDesignColor('#ff0000', this)" style="background:#ff0000;"></div>
                                <div class="tool-dot" onclick="setDesignColor('#ffd700', this)" style="background:#ffd700;"></div>
                                <div class="tool-dot" onclick="setDesignColor('#ffffff', this)" style="background:#ffffff;"></div>
                                <div class="tool-dot" onclick="setDesignColor('#00ff00', this)" style="background:#00ff00;"></div>
                                <div class="custom-color-wrapper"><input type="color" onchange="setDesignColor(this.value, this)" class="custom-color-input"></div>
                            </div>
                            <div class="toolbar-section">
                                <span style="font-size:12px; color:#ccc;">Size:</span>
                                <input type="range" id="brushSize" min="2" max="30" value="5" class="brush-slider">
                            </div>
                            <div class="toolbar-section">
                                <button onclick="setDesignMode('brush')" id="brushBtn" class="action-btn active">🖌️</button>
                                <button onclick="setDesignMode('sticker')" id="stickerBtn" class="action-btn">✨</button>
                                <button onclick="clearDesignCanvas()" class="action-btn">🗑️</button>
                            </div>
                            <div class="toolbar-section">
                                <button onclick="saveOrnamentToTree()" class="save-btn">🎁 Hang It!</button>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        `;
        
        setTimeout(initOrnamentWorkshop, 50);
    }
    // --- CANVAS KOKİNA (DÜZELTİLMİŞ BAŞLIK İKONU) ---
    // ----------------------------------------------------
    else if (data.type === 'css_flower') {
        // --- KRİTİK DÜZELTME BURADA ---
        // 1. BAŞLIK İKONUNU GÜNCELLE (Emoji yerine PNG)
        
        // ÖNCE MEVCUT İÇERİĞİ (Pembe Emojiyi) TAMAMEN SİL:
        mIcon.innerHTML = ""; 
        
        // Görünür olduğundan emin ol ve hizalamayı ayarla
        mIcon.style.display = 'inline-flex'; 
        mIcon.style.alignItems = 'center';

        // ŞİMDİ SADECE SENİN RESMİNİ EKLE:
        // margin-left başlık metni ile arasına biraz boşluk koyar.
        mIcon.innerHTML = `<img src="assets/contents/kokina_static.png" alt="Kokina Icon" style="width: 32px; height: 32px; margin-left: 10px;">`;
        
        // 2. Modal İçeriği (Canvas Alanı - Aynı kalıyor)
        mAction.innerHTML = `
            <div class="canvas-wrapper" style="background: radial-gradient(circle, #222, #000); border-radius: 10px; overflow:hidden;">
                <canvas id="kokinaCanvas" width="300" height="350"></canvas>
                <p class="bloom-text" style="color: rgba(255,255,255,0.7); margin-bottom: 15px; margin-top: 10px;">Kokina Bloom 🌹</p>
            </div>
        `;

        // 3. Canvas Çizimini Başlat ve Kutu ID'sini Gönder (Aynı kalıyor)
        setTimeout(() => {
            drawKokina('kokinaCanvas', id);
        }, 100);
    }

    // ----------------------------------------------------
    // --- 13. KUTU: TIME CAPSULE (ENGLISH TEXT) ---
    // ----------------------------------------------------
    else if (data.type === 'time_capsule') {
        mIcon.style.display = 'none';

        mAction.innerHTML = `
            <div class="capsule-wrapper">
                
                <div class="parchment-paper" id="letterPaper">
                    <div class="paper-header">Dear Future Me,</div>
                    <textarea id="futureNote" placeholder="What are your dreams for 2026? What do you want to remember from today?"></textarea>
                    <div class="paper-footer">Date: Dec 2025</div>
                    
                    <div class="wax-seal" id="waxSeal">
                        <span style="font-size:18px; color:#5e0000; font-weight:bold;">2026</span>
                    </div>
                </div>

                <button onclick="sealTheLetter()" id="btnSeal" class="seal-btn">
                     Seal & Lock
                </button>

                <div id="sealedMessage" style="display:none; color:#ffd700; margin-top:20px; font-size:16px; text-align:center;">
                    ✨ Letter locked until 2026!
                </div>
            </div>
        `;
    }

    // ----------------------------------------------------
    // --- 10. KUTU: KAR KÜRESİ (CANVAS) ---
    // ----------------------------------------------------
    else if (data.type === 'snow_globe') {
        mIcon.style.display = 'none';

        mAction.innerHTML = `
            <div class="globe-wrapper">
                <h2 class="globe-title">Happy New Year!</h2>
                
                <div class="globe-container" id="globeContainer" onclick="shakeGlobe()">
                    <div class="globe-glass">
                        <canvas id="snowCanvas"></canvas>
                        <div class="globe-highlight"></div>
                    </div>
                    <div class="globe-base">
                        <div class="base-plate">2025</div>
                    </div>
                </div>

                <button onclick="shakeGlobe()" class="shake-btn">
                    ❄️ Shake Me! ❄️
                </button>
            </div>
        `;

        // Kar Küresi Animasyonunu Başlat
        setTimeout(() => {
            initSnowGlobe();
        }, 100);
    }

    // ----------------------------------------------------
    // --- DİLEK YILDIZI (WISH STAR) ENTEGRASYONU ---
    // ----------------------------------------------------
    else if (data.type === 'wish_star') {
        mIcon.style.display = 'none'; // Başlık ikonunu gizle

        // HTML Yapısını Modalın İçine Gömüyoruz
        mAction.innerHTML = `
            <div class="wish-wrapper" style="position:relative; width:100%; height:400px; background:#020205; border-radius:12px; overflow:hidden; display:flex; flex-direction:column; align-items:center; justify-content:center;">
                
                <canvas id="skyCanvas" style="position:absolute; top:0; left:0; z-index:1;"></canvas>

                <div style="position:relative; z-index:10; display:flex; flex-direction:column; align-items:center; width:100%;">
                    
                    <div class="star-container" id="starBtn">
                        <svg class="star-icon" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                    </div>

                    <div class="energy-bar-bg" id="energyBarContainer">
                        <div class="energy-bar-fill" id="energyBarFill"></div>
                    </div>

                    <p class="hint" id="hintText">Hold the star to make a wish...</p>
                </div>
            </div>
        `;

        // Oyunu ve Animasyonları Başlat
        setTimeout(() => {
            initWishStarGame();
        }, 100);
    }
    // 4. IMAGE (SABİT RESİM)
    else if (data.type === 'image') {
        mIcon.style.display = 'none';
        mAction.innerHTML = `<img src="${data.src}" style="max-width: 100%; border-radius: 10px; margin-top:10px;">`;

        if(boxElement) {
            updateBoxContent(boxElement, `<img src="${data.src}" class="box-prize-img">`);
        }
    }

   

    document.getElementById('modalOverlay').classList.add('active');
}

// --- YARDIMCI: KUTUYU AÇ VE İÇERİĞİ DEĞİŞTİR ---
function updateBoxContent(box, htmlContent) {
    box.classList.add('opened');
    box.innerHTML = htmlContent;
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
}

// --- GACHA REVEAL (SONNY, AURA, TAROT) ---
function revealGacha(containerElement, id) {
    const closedImg = document.getElementById('gachaClosedBox');
    const hint = document.getElementById('gachaHint');
    const resultContainer = document.getElementById('gachaResultContainer');
    const data = gifts[id];

    if(resultContainer.innerHTML !== "") return;

    closedImg.classList.remove('clickable-box');
    closedImg.classList.add('box-opening-shake');
    hint.style.display = 'none';

    setTimeout(() => {
        closedImg.classList.add('fade-out-box');
        
        const randomImg = data.images[Math.floor(Math.random() * data.images.length)];

        // AĞAÇTAKİ KUTUYU BURADA GÜNCELLİYORUZ!
        const treeBox = document.querySelector(`.box-${id}`);
        if(treeBox) {
            // DEĞİŞİKLİK BURADA: style="height: 85%; width: auto;" ekledik.
            // Bu sayede bebek kutuyu dikey olarak tamamen dolduracak.
            updateBoxContent(treeBox, `<img src="${randomImg}" class="box-prize-img" style="height: 85% !important; width: auto !important;">`);
        }

        setTimeout(() => {
             closedImg.style.display = 'none'; 
             
             resultContainer.innerHTML = `
                <div style="margin-top:10px; animation: popIn 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                    <img src="${randomImg}" alt="Prize" style="max-width: 180px; border-radius: 10px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));">
                    <p style="margin-top:15px; color:#666;">✨ You got this one! ✨</p>
                </div>
            `;
            confetti({ particleCount: 150, spread: 100, origin: { y: 0.7 }, colors: ['#FFD700', '#FF69B4', '#00FFFF'] });
        }, 300); 
    }, 800); 
}

// --- TICKET REVEAL (TRAVEL) ---
function revealTicket(containerElement, id) {
    const closedImg = document.getElementById('ticketClosedBox');
    const hint = document.getElementById('ticketHint');
    const resultContainer = document.getElementById('ticketResultContainer');
    const data = gifts[id];

    if(resultContainer.innerHTML !== "") return;

    closedImg.classList.remove('clickable-box');
    closedImg.classList.add('box-opening-shake');
    hint.style.display = 'none';

    setTimeout(() => {
        closedImg.classList.add('fade-out-box');
        
        // Rastgele Bilet Seçimi
        const randomIndex = Math.floor(Math.random() * data.options.length);
        const selectedOption = data.options[randomIndex];

        // Ağaçtaki kutuyu güncelle
        const treeBox = document.querySelector(`.box-${id}`);
        if(treeBox) {
            updateBoxContent(treeBox, `<img src="${selectedOption.src}" class="box-prize-img ticket-img">`);
        }

        setTimeout(() => {
             closedImg.style.display = 'none'; 
             
             resultContainer.innerHTML = `
                <div style="margin-top:10px; animation: popIn 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                    <img src="${selectedOption.src}" alt="Destination" style="max-width: 100%; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
                    <p style="margin-top:15px; color:#c62828; font-weight: bold; font-size: 18px;">${selectedOption.msg}</p>
                </div>
            `;
            confetti({ particleCount: 150, spread: 100, origin: { y: 0.7 }, colors: ['#ffffff', '#40c4ff', '#ffd700'] });
        }, 300); 
    }, 800); 
}

// --- COOKIE CRACK ---
function crackCookie(element) {
    const img = element.querySelector('img');
    const hint = document.getElementById('cookieHint');
    const result = document.getElementById('fortuneResult');

    if(result.style.display === 'block') return;

    img.classList.add('cookie-shake');
    
    setTimeout(() => {
        hint.style.display = 'none'; 
        result.style.display = 'block'; 
        img.classList.remove('cookie-shake'); 
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 }, colors: ['#ffd700'] });
    }, 500);
}
// --- MOVIE REVEAL FONKSİYONU ---
// --- MOVIE REVEAL (SADECE RESİM - YAZISIZ) ---
function revealMovie(containerElement, id) {
    const closedImg = document.getElementById('movieClosedBox');
    const hint = document.getElementById('movieHint');
    const resultContainer = document.getElementById('movieResultContainer');
    const data = gifts[id]; 

    if(resultContainer.innerHTML !== "") return; 

    closedImg.classList.remove('clickable-box');
    closedImg.classList.add('box-opening-shake');
    hint.style.display = 'none';

    setTimeout(() => {
        closedImg.classList.add('fade-out-box');
        
        const randomIndex = Math.floor(Math.random() * data.options.length);
        const selectedMovie = data.options[randomIndex]; 

        // Ağaçtaki kutuyu güncelle
        const treeBox = document.querySelector(`.box-${id}`);
        if(treeBox) {
            updateBoxContent(treeBox, `<img src="${selectedMovie.src}" class="box-prize-img ticket-img" style="width:90%; height:auto;">`);
        }

        setTimeout(() => {
             closedImg.style.display = 'none'; 
             
             // --- DEĞİŞİKLİK BURADA: Başlık (h3) ve Yazı (p) kodlarını sildim ---
             // Sadece resmi ortalayıp biraz büyüttüm
             resultContainer.innerHTML = `
                <div style="margin-top:10px; display:flex; justify-content:center; animation: popIn 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                    <img src="${selectedMovie.src}" alt="Movie Poster" style="max-width: 220px; border-radius: 10px; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
                </div>
            `;
            
            confetti({ particleCount: 120, spread: 90, origin: { y: 0.7 }, colors: ['#ffd700', '#ff5252', '#ffffff'] });

        }, 300); 
    }, 800); 
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
}

// --- SİHİRLİ EFEKT İLE AÇMA (SADECE RESİM - YAZISIZ) ---
function revealMagicGift(containerElement, id) {
    const closedImg = document.getElementById('magicClosedBox');
    const hint = document.getElementById('magicHint');
    const resultContainer = document.getElementById('magicResultContainer');
    const data = gifts[id]; 

    if(resultContainer.innerHTML !== "") return; 

    // 1. Animasyonu Başlat
    closedImg.classList.remove('clickable-box');
    closedImg.classList.add('spin-out-effect'); 
    hint.style.display = 'none';

    setTimeout(() => {
        closedImg.style.display = 'none';

        // 2. Rastgele Seçim
        const randomIndex = Math.floor(Math.random() * data.options.length);
        const selectedItem = data.options[randomIndex]; 

        // 3. Ağaçtaki Kutuyu Güncelle
        const treeBox = document.querySelector(`.box-${id}`);
        if(treeBox) {
            updateBoxContent(treeBox, `<img src="${selectedItem.src}" class="box-prize-img" style="height: 90% !important; width: auto !important;">`);
        }

        // 4. Sonucu Göster (BAŞLIK VE YAZI SİLİNDİ, SADECE RESİM)
        resultContainer.innerHTML = `
            <div class="magic-pop-in" style="display:flex; justify-content:center; margin-top: 10px;">
                <img src="${selectedItem.src}" alt="Prize" style="max-width: 200px; border-radius: 8px; box-shadow: 0 0 25px rgba(255, 215, 0, 0.6);">
            </div>
        `;

        // Konfeti
        confetti({ particleCount: 150, spread: 120, origin: { y: 0.7 }, colors: ['#9c27b0', '#ffd700', '#00e5ff'] });

    }, 800); 
}

document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('bgMusic');
    music.volume = 0.4; // Ses seviyesi %40 (0.0 ile 1.0 arası)
});

// --- MÜZİK KONTROL ---
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const btn = document.querySelector('.music-control');
    const icon = document.getElementById('musicIcon');

    if (music.paused) {
        music.play();
        icon.innerText = "🎵"; // Çalıyor ikonu
        btn.classList.add('music-playing');
    } else {
        music.pause();
        icon.innerText = "🔇"; // Sessiz ikonu
        btn.classList.remove('music-playing');
    }
}



// ==========================================
// --- PROFESYONEL MÜZİK ÇALAR SİSTEMİ ---
// ==========================================

// Müzik Listesi
const playlist = [
    "assets/music/music1.mp3",
    "assets/music/music2.mp3",
    "assets/music/music3.mp3",
    "assets/music/music4.mp3",
    "assets/music/music5.mp3"
];

let currentSongIndex = 0;
let isPlaying = false;

// --- 1. Kutuyu Aç ve Direkt Player'ı Göster (SADE VE HIZLI) ---
function revealMusicBox(containerElement, id) {
    const resultContainer = document.getElementById('musicResultContainer');
    
    // HTML'deki kapalı kutu ve yazı elementlerini seç
    const closedImg = document.getElementById('musicClosedBox');
    const hint = document.getElementById('musicHint');
    
    const data = gifts[id]; 

    // Eğer zaten açıksa işlem yapma
    if(resultContainer.innerHTML !== "") return; 

    // --- DEĞİŞİKLİK BURADA: Kapalı kutuyu ve yazıyı ANINDA yok et ---
    if(closedImg) closedImg.style.display = 'none'; // Kutuyu gizle
    if(hint) hint.style.display = 'none'; // "Tap to listen" yazısını gizle

    // Player Arayüzünü Oluştur (Mavi butonlar silindi)
    resultContainer.innerHTML = `
        <div class="player-wrapper" style="animation: fadeIn 0.5s;">
            <div class="record-container" id="recordContainer">
                <video src="${data.gifImage}" id="recordVideo" loop muted playsinline class="record-video"></video>
            </div>

            <div class="song-info">
                <h3 id="songTitle">Winter Vibes ❄️</h3>
                <p>Christmas Special</p>
            </div>

            <div class="progress-area">
                <span id="currentTime">0:00</span>
                <div class="progress-bar" onclick="seekAudio(event)">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
                <span id="durationTime">0:00</span>
            </div>

            <div class="controls">
                <button class="ctrl-btn" onclick="prevSong()">⏮</button>
                <button class="play-btn-main" onclick="togglePlayPause()" id="mainPlayBtn">▶</button>
                <button class="ctrl-btn" onclick="nextSong()">⏭</button>
            </div>
        </div>
    `;

    // İlk şarkıyı yükle
    loadSong(currentSongIndex);
}
// 2. Şarkıyı Yükle
function loadSong(index) {
    const musicPlayer = document.getElementById('bgMusic');
    const songTitle = document.getElementById('songTitle');
    
    if(index >= playlist.length) index = 0;
    if(index < 0) index = playlist.length - 1;
    
    currentSongIndex = index;
    musicPlayer.src = playlist[currentSongIndex];
    songTitle.innerText = `Track ${currentSongIndex + 1}`;
    
    // Müzik yüklenince süreyi güncelle
    musicPlayer.onloadedmetadata = function() {
        document.getElementById('durationTime').innerText = formatTime(musicPlayer.duration);
    };
}

// 3. Play / Pause Fonksiyonu
function togglePlayPause() {
    const musicPlayer = document.getElementById('bgMusic');
    const video = document.getElementById('recordVideo');
    const playBtn = document.getElementById('mainPlayBtn');
    const recordContainer = document.getElementById('recordContainer');

    if (musicPlayer.paused) {
        // BAŞLAT
        musicPlayer.play();
        video.play();
        playBtn.innerText = "⏸"; // Durdur ikonu
        playBtn.classList.add('playing');
        recordContainer.classList.add('vibrating'); // Titreşim efekti
        startProgressLoop(); // İlerleme çubuğunu başlat
        
        // Sağ alttaki genel ikon
        document.getElementById('musicIcon').innerText = "🎵";
        document.querySelector('.music-control').classList.add('music-playing');
    } else {
        // DURDUR
        musicPlayer.pause();
        video.pause();
        playBtn.innerText = "▶"; // Oynat ikonu
        playBtn.classList.remove('playing');
        recordContainer.classList.remove('vibrating');
        
        document.getElementById('musicIcon').innerText = "🔇";
        document.querySelector('.music-control').classList.remove('music-playing');
    }
}

// 4. İleri / Geri Sarma
function nextSong() {
    currentSongIndex++;
    if (currentSongIndex > playlist.length - 1) currentSongIndex = 0;
    loadSong(currentSongIndex);
    togglePlayPause(); // Otomatik başlat
}

function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) currentSongIndex = playlist.length - 1;
    loadSong(currentSongIndex);
    togglePlayPause();
}

// 5. İlerleme Çubuğu Güncelleme
function startProgressLoop() {
    const musicPlayer = document.getElementById('bgMusic');
    const progressFill = document.getElementById('progressFill');
    const currentTimeEl = document.getElementById('currentTime');

    musicPlayer.ontimeupdate = function() {
        const percent = (musicPlayer.currentTime / musicPlayer.duration) * 100;
        progressFill.style.width = `${percent}%`;
        currentTimeEl.innerText = formatTime(musicPlayer.currentTime);
    };
}

// Çubuğa tıklayınca şarkıyı oraya sarma
function seekAudio(e) {
    const musicPlayer = document.getElementById('bgMusic');
    const progressBar = document.querySelector('.progress-bar');
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    const duration = musicPlayer.duration;
    
    musicPlayer.currentTime = (clickX / width) * duration;
}

// Zaman Formatı (Saniye -> dk:sn)
function formatTime(seconds) {
    if(isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}
// Başlat

// ==========================================
// --- KOKİNA ÇİZİM MOTORU (CANVAS) ---
// ==========================================
// ==========================================
// --- KOKİNA ÇİZİM MOTORU (FOTOĞRAF MODLU) ---
// ==========================================
// DİKKAT: Fonksiyon artık boxId (Kutu Numarası) da alıyor
function drawKokina(canvasId, boxId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const width = canvas.width;
    const height = canvas.height;
    
    let branches = [];
    let berries = [];
    let animationId;
    // Çizimin tamamen bitip bitmediğini kontrol eden bayrak
    let finished = false; 

    function random(min, max) { return Math.random() * (max - min) + min; }

    // --- DAL SINIFI ---
    class Branch {
        constructor(x, y, angle, length, thickness) {
            this.x = x; this.y = y;
            this.angle = angle;
            this.targetLength = length;
            this.currentLength = 0;
            this.thickness = thickness;
            this.color = `hsl(${100 + random(-10, 20)}, ${random(40, 60)}%, ${random(20, 35)}%)`; 
            this.leaves = [];
            this.finished = false;
            // Düz ve dik dallar için düşük eğrilik
            this.curve = random(-0.01, 0.01); 
        }
        update() {
            if (this.currentLength < this.targetLength) {
                this.currentLength += 1.5;
                this.angle += this.curve * (1 - this.currentLength / this.targetLength);
                if (this.currentLength > 10 && Math.random() < 0.2) this.addLeaf();
            } else {
                this.finished = true;
            }
        }
        addLeaf() {
            const lx = this.x + Math.cos(this.angle) * this.currentLength;
            const ly = this.y + Math.sin(this.angle) * this.currentLength;
            const la = this.angle + (Math.random() < 0.5 ? 1 : -1) * Math.PI/3;
            const size = random(6, 12);
            this.leaves.push({ x: lx, y: ly, angle: la, size: 0, targetSize: size, color: this.color });
        }
        draw() {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            const endX = this.x + Math.cos(this.angle) * this.currentLength;
            const endY = this.y + Math.sin(this.angle) * this.currentLength;
            ctx.lineWidth = this.thickness * (1 - this.currentLength/this.targetLength);
            ctx.lineCap = 'round';
            ctx.strokeStyle = this.color;
            ctx.lineTo(endX, endY);
            ctx.stroke();
            this.leaves.forEach(leaf => {
                if (leaf.size < leaf.targetSize) leaf.size += 0.3;
                ctx.fillStyle = leaf.color;
                ctx.beginPath();
                ctx.translate(leaf.x, leaf.y);
                ctx.rotate(leaf.angle);
                ctx.moveTo(0,0);
                ctx.quadraticCurveTo(leaf.size, leaf.size/3, leaf.size*1.5, 0);
                ctx.quadraticCurveTo(leaf.size, -leaf.size/3, 0, 0);
                ctx.fill();
                ctx.strokeStyle = "rgba(0,0,0,0.2)"; ctx.lineWidth = 0.5; ctx.stroke();
                ctx.rotate(-leaf.angle);
                ctx.translate(-leaf.x, -leaf.y);
            });
            ctx.restore();
        }
    }

    // --- MEYVE SINIFI ---
    class Berry {
        constructor(x, y) {
            this.x = x; this.y = y;
            this.size = 0;
            this.targetSize = random(3, 6);
            this.timer = 0;
            this.delay = random(0, 50);
            this.finished = false; // Meyvenin büyümesi bitti mi?
        }
        update() {
            this.timer++;
            if(this.timer > this.delay) {
                if (this.size < this.targetSize) {
                    this.size += 0.2;
                } else {
                    this.finished = true;
                }
            }
        }
        draw() {
            if(this.size <= 0) return;
            ctx.save();
            ctx.translate(this.x, this.y);
            const grad = ctx.createRadialGradient(-this.size/3, -this.size/3, this.size/10, 0, 0, this.size);
            grad.addColorStop(0, "white");
            grad.addColorStop(0.3, "#ff4d4d");
            grad.addColorStop(1, "#8b0000");
            ctx.fillStyle = grad;
            ctx.shadowColor = "rgba(0,0,0,0.5)"; ctx.shadowBlur = 3;
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI*2);
            ctx.fill();
            ctx.restore();
        }
    }

    // --- BAŞLATMA ---
    const branchCount = 60; // Dolgunluk için 60 dal
    for(let i=0; i<branchCount; i++) {
        const x = width/2 + random(-15, 15);
        const y = height;
        const angle = -Math.PI/2 + random(-0.25, 0.25); // Dik duruş için dar açı
        const len = height * 0.6 + random(-30, 50);
        const b = new Branch(x, y, angle, len, random(2, 4));
        b.curve = random(-0.01, 0.01); // Neredeyse hiç eğilme yok
        branches.push(b);
    }

    // --- ANİMASYON DÖNGÜSÜ (FOTOĞRAF ÇEKME EKLENDİ) ---
    function animate() {
        ctx.clearRect(0, 0, width, height);

        let allBranchesDone = true;
        branches.forEach(b => {
            b.update();
            b.draw();
            if(!b.finished) allBranchesDone = false;
        });

        if(allBranchesDone && berries.length === 0) {
            for(let i=0; i<25; i++) { 
                const host = branches[Math.floor(random(0, branches.length))];
                const ratio = random(0.7, 0.98); 
                const cx = host.x + Math.cos(host.angle) * (host.targetLength * ratio);
                const cy = host.y + Math.sin(host.angle) * (host.targetLength * ratio);
                const count = random(8, 15);
                for(let j=0; j<count; j++) {
                    berries.push(new Berry(cx + random(-12,12), cy + random(-12,12)));
                }
            }
        }

        let allBerriesDone = true;
        berries.forEach(b => {
            b.update();
            b.draw();
            if(!b.finished) allBerriesDone = false;
        });

        // KONTROL: Eğer meyveler oluşturulduysa VE hepsi büyüdüyse VE daha önce fotoğraf çekilmediyse
        if (berries.length > 0 && allBerriesDone && !finished) {
            finished = true;
            
            // Çizim tamamen bittikten 1 saniye sonra fotoğrafını çek ve kutuya koy
            setTimeout(() => {
                // 1. Canvas'ın o anki halini resim verisine (base64 string) çevir
                const dataURL = canvas.toDataURL('image/png');

                // 2. Ağaçtaki ilgili kutuyu bul
                const treeBox = document.querySelector(`.box-${boxId}`);

                if (treeBox && dataURL) {
                    // 3. Kutunun stilini ayarla (Koyu kırmızı çerçeve)
                    treeBox.style.background = "#1a1a1a"; 
                    treeBox.style.border = "2px solid #d32f2f";

                    // 4. İçine çekilen fotoğrafı koy
                    treeBox.innerHTML = `
                        <img src="${dataURL}" 
                             alt="Final Kokina Bloom" 
                             style="width:100%; height:100%; object-fit:cover; border-radius: 4px;">
                    `;
                    treeBox.classList.add('box-opened');
                }
            }, 1000); // 1 saniye bekleme süresi
        }

        if(document.getElementById(canvasId)) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}

// ==========================================
// --- DİLEK YILDIZI OYUN MOTORU ---
// ==========================================
function initWishStarGame() {
    const canvas = document.getElementById('skyCanvas');
    const starBtn = document.getElementById('starBtn');
    const energyBarContainer = document.getElementById('energyBarContainer');
    const energyBarFill = document.getElementById('energyBarFill');
    const hintText = document.getElementById('hintText');
    
    if (!canvas || !starBtn) return; // Hata önleyici

    const ctx = canvas.getContext('2d');
    
    // Modal boyutlarına göre ayarla
    let width = canvas.parentElement.offsetWidth;
    let height = 400; // Modal yüksekliği
    canvas.width = width;
    canvas.height = height;

    let stars = [];
    let shootingStars = [];
    let isCharging = false;
    let energyLevel = 0;
    let animationId;

    // --- YARDIMCI FONKSİYONLAR ---
    function random(min, max) { return Math.random() * (max - min) + min; }

    // --- YILDIZ SINIFI ---
    class Star {
        constructor() {
            this.x = random(0, width);
            this.y = random(0, height);
            this.size = random(0.5, 1.5);
            this.opacity = random(0.1, 1);
            this.blinkSpeed = random(0.005, 0.02);
        }
        draw() {
            this.opacity += this.blinkSpeed;
            if (this.opacity > 1 || this.opacity < 0.1) this.blinkSpeed *= -1;
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // --- KAYAN YILDIZ SINIFI ---
    class ShootingStar {
        constructor(isShower = false) {
            this.x = isShower ? width/2 : random(0, width);
            this.y = isShower ? height/2 : random(0, height/2);
            this.angle = isShower ? random(0, Math.PI*2) : Math.PI/4;
            
            // --- HIZ AYARI BURADA ---
            if (isShower) {
                // Patlama anı (Daha yavaş başlatıyoruz: 10-20 yerine 4-10 yaptık)
                this.speed = random(4, 10); 
                this.friction = 0.96; // Her karede %4 yavaşlasın (Süzülme efekti)
                this.gravity = 0.05;  // Hafifçe aşağı süzülsün
            } else {
                // Normal kayan yıldızlar (Arka plan)
                this.speed = random(10, 20);
                this.friction = 1; // Yavaşlama yok
                this.gravity = 0;
            }

            this.size = random(1, 3);
            this.dead = false;
            this.trail = [];
            this.color = ['#ffeb3b', '#ffffff', '#00e5ff', '#ff7043'][Math.floor(random(0,4))];
            this.alpha = 1; // Yavaşça sönmesi için opaklık ekledik
        }

        update() {
            this.trail.push({x: this.x, y: this.y});
            
            // Kuyruk uzunluğunu artırdık (8 yerine 15) ki yavaşlarken izi kalsın
            if(this.trail.length > 15) this.trail.shift();

            // Hareketi uygula
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed + this.gravity; // Gravity eklendi

            // Hızı yavaşlat (Sürtünme)
            this.speed *= this.friction;

            // Eğer çok yavaşladıysa veya görünmez olduysa yok et
            if (this.speed < 0.1) this.alpha -= 0.02;
            if (this.alpha <= 0) this.dead = true;

            // Ekran dışına çıkma kontrolü
            if (this.x < -50 || this.x > width+50 || this.y < -50 || this.y > height+50) this.dead = true;
        }

        draw() {
            ctx.save(); // Ayarları kaydet
            ctx.globalAlpha = this.alpha; // Sönme efekti için
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.size;
            ctx.lineCap = 'round';
            
            ctx.beginPath();
            if(this.trail.length > 0) {
                ctx.moveTo(this.trail[0].x, this.trail[0].y);
                for(let t of this.trail) ctx.lineTo(t.x, t.y);
            }
            ctx.stroke();
            ctx.restore(); // Ayarları geri yükle
        }
    }

    // --- SETUP ---
    for(let i=0; i<100; i++) stars.push(new Star());

    // --- OYUN DÖNGÜSÜ ---
    function animate() {
        if(!document.getElementById('skyCanvas')) return; // Modal kapandıysa dur
        
        ctx.clearRect(0, 0, width, height);
        stars.forEach(s => s.draw());
        
        shootingStars.forEach((s, i) => {
            s.update();
            s.draw();
            if(s.dead) shootingStars.splice(i, 1);
        });

        // Şarj Mantığı
        if(isCharging && energyLevel < 100) {
            energyLevel += 0.8; // Dolum hızı
            energyBarFill.style.width = energyLevel + "%";
            
            // Dolarken titreme efekti
            starBtn.style.transform = `scale(0.95) rotate(${random(-3,3)}deg)`;
            
        } else if (isCharging && energyLevel >= 100) {
             hintText.innerText = "READY! Release to wish!";
             hintText.style.color = "#4eff4e";
             starBtn.style.transform = `scale(1.1)`;
        } else if (!isCharging && energyLevel > 0) {
            // Enerji düşüşü
            energyLevel -= 5;
            if(energyLevel < 0) energyLevel = 0;
            energyBarFill.style.width = energyLevel + "%";
            starBtn.style.transform = `scale(1)`;
        }

        requestAnimationFrame(animate);
    }
    animate();

    // --- OLAY YÖNETİCİLERİ ---// --- OLAY DİNLEYİCİLERİ (EVENTS) ---
    function startCharge(e) {
        if(e.cancelable) e.preventDefault();
        isCharging = true;
        energyBarContainer.style.opacity = 1;
        hintText.innerText = "Gathering energy...";
        hintText.style.color = "#fff";
        starBtn.classList.add('glow');
    }

    function endCharge() {
        isCharging = false;
        starBtn.classList.remove('glow');
        starBtn.style.transform = `scale(1)`;

        if(energyLevel >= 95) {
            // --- BAŞARILI! (Dilek Gönderildi) ---
            hintText.innerText = "Wish Sent to the Universe! ✨";
            hintText.style.color = "#ffd700";
            energyBarContainer.style.opacity = 0;
            
            // Patlama Efekti
            for(let i=0; i<20; i++) shootingStars.push(new ShootingStar(true));

            // ==========================================================
            // --- YENİ: AĞAÇTAKİ 1. KUTUYU GÜNCELLE (YILDIZ KOY) ---
            // ==========================================================
            // 1. Ağaçtaki 1 numaralı kutuyu bul
            // Not: Eğer 1. kutu değilse '.box-1' kısmını '.box-X' olarak değiştir.
            const treeBox = document.querySelector('.box-1'); 
            
            if (treeBox) {
                // 2. Kutunun stilini güncelle (Gece mavisi arka plan, altın çerçeve)
                treeBox.style.background = "linear-gradient(135deg, #0a0a2a, #1a1a4a)";
                treeBox.style.border = "2px solid #ffd700";
                treeBox.style.boxShadow = "0 0 15px rgba(255, 215, 0, 0.5)"; // Hafif altın parıltı

                // 3. İçine Modal'daki Altın Yıldız SVG İkonunu Koy
                treeBox.innerHTML = `
                    <div style="width:100%; height:100%; display:flex; justify-content:center; align-items:center;">
                        <svg viewBox="0 0 24 24" style="width:50%; height:50%; fill:#ffd700; filter:drop-shadow(0 0 5px rgba(255,215,0,0.6));">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                    </div>
                `;
                
                // Kutunun açıldığını işaretle
                treeBox.classList.add('box-opened');
            }
            // ==========================================================

        } else {
            // BAŞARISIZ (Erken Bırakıldı)
            hintText.innerText = "Hold longer to wish...";
            hintText.style.color = "rgba(255,255,255,0.5)";
        }
    }
    // Mouse ve Dokunmatik desteği
    starBtn.addEventListener('mousedown', startCharge);
    starBtn.addEventListener('touchstart', startCharge);
    
    // Global bırakma kontrolü (Kutudan dışarı kaysa bile algılasın)
    window.addEventListener('mouseup', endCharge);
    window.addEventListener('touchend', endCharge);
}

// ==========================================
// --- GELİŞMİŞ PİYANO SİSTEMİ (KLAVYE + DEMO + İNDİR) ---
// ==========================================

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let isRecording = false;
let recordedNotes = [];
let recordStartTime = 0;
let isPlayingBack = false;
let pressedKeysMap = {}; // Basılı tutulan tuşları takip etmek için

// Frekanslar
const noteFreqs = {
    'C': 261.63, 'D': 293.66, 'E': 329.63, 'F': 349.23,
    'G': 392.00, 'A': 440.00, 'B': 493.88, 'C2': 523.25
};

// Klavye Harita (Hangi tuş hangi notaya denk geliyor)
const keyboardMap = {
    'a': 'C', 's': 'D', 'd': 'E', 'f': 'F',
    'g': 'G', 'h': 'A', 'j': 'B', 'k': 'C2'
};

// Jingle Bells Notası (Kısa Versiyon)
// E-E-E, E-E-E, E-G-C-D-E
const jingleBellsNotes = [
    // "Jin - gle - Bells" (İlk Kısım)
    {note:'E', time:0}, 
    {note:'E', time:400},  // Eskiden 200'dü
    {note:'E', time:800},  // Eskiden 400'dü (Burada biraz bekler)
    
    // "Jin - gle - Bells" (İkinci Kısım)
    {note:'E', time:1600}, // Eskiden 800'dü
    {note:'E', time:2000}, // Eskiden 1000'di
    {note:'E', time:2400}, // Eskiden 1200'dü
    
    // "Jin - gle - All - The - Way" (Son Kısım)
    {note:'E', time:3200}, // E
    {note:'G', time:3600}, // G
    {note:'C', time:4000}, // C
    {note:'D', time:4400}, // D
    {note:'E', time:4800}  // E (Uzun bitiş)
];

function resetPianoVariables() {
    isRecording = false;
    recordedNotes = [];
    isPlayingBack = false;
    pressedKeysMap = {};
}

// --- KLAVYE ENTEGRASYONU ---
function handleKeyDown(e) {
    // Eğer modal açık değilse veya tuş zaten basılıysa işlem yapma
    if (!document.getElementById('pianoStatus') || pressedKeysMap[e.key]) return;
    
    const note = keyboardMap[e.key.toLowerCase()];
    if (note) {
        pressedKeysMap[e.key] = true; // Tuş basıldı olarak işaretle
        playPiano(note, true); // true: Klavyeden geldiğini belirtir
    }
}

function handleKeyUp(e) {
    pressedKeysMap[e.key] = false; // Tuş bırakıldı
}

// Modal açılıp kapandığında klavye dinleyicisini yönetmek için
function enableKeyboard(enable) {
    if(enable) {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
    } else {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
    }
}


// --- 1. SES ÇALMA FONKSİYONU ---
function playPiano(note, fromKeyboard = false) {
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.type = 'sine'; 
    osc.frequency.setValueAtTime(noteFreqs[note], audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1);
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 1);

    // Görsel Efekt (Hem fare hem klavye için çalışır)
    const keyEl = document.querySelector(`.key[data-note="${note}"]`);
    if(keyEl) {
        keyEl.classList.add('active');
        // Klavyeden basıldıysa daha hızlı sönsün, mouse ise biraz kalsın
        setTimeout(() => keyEl.classList.remove('active'), fromKeyboard ? 150 : 250);
    }

    if (isRecording) {
        const timeOffset = Date.now() - recordStartTime;
        recordedNotes.push({ note: note, time: timeOffset });
    }
}

// --- 2. KAYIT KONTROLLERİ ---
function toggleRecord() {
    const btnRecord = document.getElementById('btnRecord');
    const status = document.getElementById('pianoStatus');
    const btnPlay = document.getElementById('btnPlay');
    const btnDownload = document.getElementById('btnDownload');

    if (!isRecording) {
        isRecording = true;
        recordedNotes = [];
        recordStartTime = Date.now();
        btnRecord.innerHTML = "⏹ Stop";
        btnRecord.classList.add('recording-pulse');
        status.innerText = "Recording... 🔴"; status.style.color = "#ff4d4d";
        btnPlay.disabled = true;
        btnDownload.style.display = 'none'; // Kayıt sırasında indirmeyi gizle
    } else {
        isRecording = false;
        btnRecord.innerHTML = "🔴 Record";
        btnRecord.classList.remove('recording-pulse');
        
        if (recordedNotes.length > 0) {
            status.innerText = "Melody Saved! ✅"; status.style.color = "#4eff4e";
            btnPlay.disabled = false;
            btnDownload.style.display = 'inline-block'; // İndirme butonunu göster
            btnDownload.disabled = false;

            // Ağaçtaki kutuyu güncelle (Hareketli GIF ile)
            updateTreeBoxWithMusic(2); 
        } else {
            status.innerText = "No notes recorded 🤷‍♂️"; status.style.color = "#ccc";
        }
    }
}

function playRecording(notesToPlay = null) {
    // Eğer dışarıdan nota gelmediyse kayıtlıları çal
    const notes = notesToPlay || recordedNotes;
    if (notes.length === 0 || isPlayingBack) return;

    isPlayingBack = true;
    const status = document.getElementById('pianoStatus');
    status.innerText = notesToPlay ? "Playing Demo... 🎄" : "Playing Your Song... 🎶";
    
    notes.forEach((item, index) => {
        setTimeout(() => {
            playPiano(item.note);
            if (index === notes.length - 1) {
                isPlayingBack = false;
                status.innerText = notesToPlay ? "Demo Finished! Your turn!" : "Finished ✨";
                status.style.color = notesToPlay ? "#ffd700" : "#4eff4e";
            }
        }, item.time);
    });
}

function clearRecording() {
    recordedNotes = [];
    document.getElementById('btnPlay').disabled = true;
    document.getElementById('btnDownload').style.display = 'none';
    document.getElementById('pianoStatus').innerText = "Cleared 🗑️";
    isRecording = false;
    document.getElementById('btnRecord').innerHTML = "🔴 Record";
    document.getElementById('btnRecord').classList.remove('recording-pulse');
}

// --- 3. YENİ ÖZELLİKLER (DEMO & İNDİR) ---

// Jingle Bells Demo Çal
function playJingleBellsDemo() {
    if(isPlayingBack || isRecording) return;
    // Önceden tanımladığımız jingleBellsNotes dizisini çalıyoruz
    playRecording(jingleBellsNotes);
}

// Besteyi İndir (JSON olarak)
function downloadComposition() {
    if(recordedNotes.length === 0) return;

    // Notaları JSON metnine çevir
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(recordedNotes));
    
    // Sahte bir indirme linki oluştur ve tıkla
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "my_christmas_melody.json");
    document.body.appendChild(downloadAnchorNode); // Firefox için gerekli
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

// --- 4. AĞAÇ GÜNCELLEME (Hareketli GIF ile) ---
// AĞAÇ GÜNCELLEME (Kayıt bitince çalışır ve Piyano Resmi Koyar)
function updateTreeBoxWithMusic(boxId) {
    const treeBox = document.querySelector(`.box-${boxId}`);
    
    if (treeBox) {
        // Kutunun stilini siyah yap (Piyano asilliği)
        treeBox.style.background = "#000"; 
        treeBox.style.border = "2px solid #fff"; // Beyaz çerçeve

        // İçine 'piano.png' resmini koy
        treeBox.innerHTML = `
            <img src="assets/contents/piano.png" 
                 alt="Piano Gift" 
                 style="width:90%; height:90%; object-fit:contain;">
        `;
        
        // Kutunun açıldığını işaretle
        treeBox.classList.add('box-opened');
    }
}   

// --- KAYIT KONTROLLERİ ---
function toggleRecord() {
    const btnRecord = document.getElementById('btnRecord');
    const status = document.getElementById('pianoStatus');
    const btnPlay = document.getElementById('btnPlay');
    const btnSave = document.getElementById('btnSave'); // İsmi değiştirdik

    if (!isRecording) {
        // Kayda Başla
        isRecording = true;
        recordedNotes = [];
        recordStartTime = Date.now();
        btnRecord.innerHTML = "⏹ Stop";
        btnRecord.classList.add('recording-pulse');
        status.innerText = "Recording... 🔴"; status.style.color = "#ff4d4d";
        btnPlay.disabled = true;
        btnSave.style.display = 'none'; // Kayıt sırasında gizle
    } else {
        // Kaydı Bitir
        isRecording = false;
        btnRecord.innerHTML = "🔴 Record";
        btnRecord.classList.remove('recording-pulse');
        
        if (recordedNotes.length > 0) {
            status.innerText = "Melody Captured! ✅"; 
            status.style.color = "#4eff4e";
            btnPlay.disabled = false;
            
            // Kaydet Butonunu Göster
            btnSave.style.display = 'inline-block'; 
            btnSave.disabled = false;
            btnSave.innerText = "Save🎁"; // Yazıyı sıfırla
            btnSave.style.background = "#2196F3";
        } else {
            status.innerText = "No notes recorded 🤷‍♂️"; status.style.color = "#ccc";
        }
    }
}

// --- YENİ: DOSYA İNDİRMEK YERİNE KUTUYA İŞLEME ---
function saveToBox() {
    const btnSave = document.getElementById('btnSave');
    const status = document.getElementById('pianoStatus');

    // 1. Ağaçtaki kutuyu güncelle (Piyano Resmi Koy)
    // Not: Buradaki '2' kutunun ID'sidir. 
    updateTreeBoxWithMusic(2); 

    // 2. Butonun üzerinde geri bildirim ver
    btnSave.innerText = "✔ Placed! ";
    btnSave.style.background = "#4CAF50"; // Yeşil yap
    btnSave.disabled = true; // Tekrar basılmasın

    // 3. Durum ekranına yaz
    status.innerText = "Gift is Ready on the Tree! 🎄";
    status.style.color = "#ffd700";
}

// ==========================================
// --- ZAMAN KAPSÜLÜ MOTORU ---
// ==========================================

function sealTheLetter() {
    const note = document.getElementById('futureNote').value;
    const paper = document.getElementById('letterPaper');
    const seal = document.getElementById('waxSeal');
    const btn = document.getElementById('btnSeal');
    const msg = document.getElementById('sealedMessage');

    // Boş mektup engelleme
    if(note.trim().length < 5) {
        alert("Please write a few words to your future self!");
        return;
    }

    // 1. Yazmayı engelle ve butonu gizle
    document.getElementById('futureNote').disabled = true;
    btn.style.display = 'none';

    // 2. KAĞIT KATLANMA ANİMASYONU BAŞLAT
    paper.classList.add('folding-animation');

    // 3. Animasyonun ortasında MÜHÜR BAS (Efekt)
    setTimeout(() => {
        seal.style.opacity = '1';
        seal.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 800);

    // 4. İşlem Tamamlandığında (Ağacı Güncelle)
    setTimeout(() => {
        msg.style.display = 'block';
        msg.classList.add('fade-in');
        
        // --- 13 NUMARALI KUTUYU HEDEF ALIYORUZ ---
        const treeBox = document.querySelector('.box-13');
        
        if(treeBox) {
            // Kutuyu koyu ahşap rengine çevir
            treeBox.style.background = "#2d1b0e"; 
            treeBox.style.border = "2px solid #c5a059"; // Altın çerçeve
            
            // İçine mühürlü zarf resmini koy (assets/contents/envelope.png)
            treeBox.innerHTML = `
                <img src="assets/contents/envelope.png" 
                     alt="Sealed Letter" 
                     style="width:85%; height:85%; object-fit:contain; filter:drop-shadow(0 5px 5px rgba(0,0,0,0.5));">
            `;
            treeBox.classList.add('box-opened');
        }

    }, 2000);
}


// ==========================================
// --- KAR KÜRESİ MOTORU ---
// ==========================================
let shakeVelocity = 0;
let isShaking = false;

function initSnowGlobe() {
    const canvas = document.getElementById('snowCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Boyutlandırma
    const size = 280; // Modal içine sığması için
    canvas.width = size;
    canvas.height = size;

    let snowflakes = [];
    const numFlakes = 150;

    // --- KAR TANESİ SINIFI ---
    class Snowflake {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 2 + 0.5;
            this.speed = Math.random() * 1 + 0.5;
            this.wind = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.3;
        }
        update() {
            // Sallanma Etkisi
            if (Math.abs(shakeVelocity) > 0.1) {
                this.x += (Math.random() - 0.5) * shakeVelocity * 2;
                this.y += (Math.random() - 0.5) * shakeVelocity * 2;
            } else {
                // Normal Düşüş
                this.y += this.speed;
                this.x += this.wind + Math.sin(this.y * 0.05) * 0.2;
            }
            // Sınır Kontrolü
            if (this.y > canvas.height) { this.y = -5; this.x = Math.random() * canvas.width; }
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    // --- KARDAN ADAM ÇİZİMİ (DETAYLI: ŞAPKA & ATKI EKLENDİ) ---
    function drawSnowman() {
        const centerX = canvas.width / 2;
        // Kardan adamın taban konumu
        const bottomY = canvas.height - 40; 

        ctx.save();
        
        // 1. Gölge
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.beginPath();
        ctx.ellipse(centerX, bottomY + 10, 50, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        // 2. Alt Gövde
        ctx.beginPath();
        ctx.arc(centerX, bottomY - 30, 45, 0, Math.PI * 2);
        let grad1 = ctx.createRadialGradient(centerX - 15, bottomY - 45, 5, centerX, bottomY - 30, 45);
        grad1.addColorStop(0, '#ffffff');
        grad1.addColorStop(1, '#dceeff');
        ctx.fillStyle = grad1;
        ctx.fill();

        // 3. Orta Gövde
        ctx.beginPath();
        ctx.arc(centerX, bottomY - 95, 35, 0, Math.PI * 2);
        let grad2 = ctx.createRadialGradient(centerX - 10, bottomY - 105, 5, centerX, bottomY - 95, 35);
        grad2.addColorStop(0, '#ffffff');
        grad2.addColorStop(1, '#dceeff');
        ctx.fillStyle = grad2;
        ctx.fill();

        // 4. Kafa
        ctx.beginPath();
        ctx.arc(centerX, bottomY - 150, 25, 0, Math.PI * 2);
        let grad3 = ctx.createRadialGradient(centerX - 8, bottomY - 158, 4, centerX, bottomY - 150, 25);
        grad3.addColorStop(0, '#ffffff');
        grad3.addColorStop(1, '#dceeff');
        ctx.fillStyle = grad3;
        ctx.fill();

        // 5. Gözler
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(centerX - 8, bottomY - 155, 3, 0, Math.PI * 2);
        ctx.arc(centerX + 8, bottomY - 155, 3, 0, Math.PI * 2);
        ctx.fill();

        // 6. Havuç Burun
        ctx.fillStyle = '#ff7043';
        ctx.beginPath();
        ctx.moveTo(centerX, bottomY - 150);
        ctx.lineTo(centerX + 15, bottomY - 148); // Uzun burun
        ctx.lineTo(centerX, bottomY - 145);
        ctx.fill();

        // 7. Düğmeler
        ctx.fillStyle = '#2c3e50';
        ctx.beginPath();
        ctx.arc(centerX, bottomY - 105, 3, 0, Math.PI * 2);
        ctx.arc(centerX, bottomY - 95, 3, 0, Math.PI * 2);
        ctx.arc(centerX, bottomY - 85, 3, 0, Math.PI * 2);
        ctx.fill();

        // 8. Kollar (Dallar)
        ctx.strokeStyle = '#5d4037';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        // Sol Kol
        ctx.beginPath();
        ctx.moveTo(centerX - 25, bottomY - 100);
        ctx.lineTo(centerX - 55, bottomY - 110);
        ctx.moveTo(centerX - 55, bottomY - 110);
        ctx.lineTo(centerX - 65, bottomY - 120); 
        ctx.stroke();
        // Sağ Kol
        ctx.beginPath();
        ctx.moveTo(centerX + 25, bottomY - 100);
        ctx.lineTo(centerX + 55, bottomY - 115);
        ctx.moveTo(centerX + 55, bottomY - 115);
        ctx.lineTo(centerX + 60, bottomY - 130);
        ctx.stroke();

        // 9. ATKI (Detaylı Kırmızı Atkı)
        ctx.strokeStyle = '#c62828';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(centerX - 20, bottomY - 125);
        ctx.quadraticCurveTo(centerX, bottomY - 120, centerX + 20, bottomY - 125);
        ctx.stroke();
        // Atkı ucu
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(centerX + 15, bottomY - 125);
        ctx.lineTo(centerX + 25, bottomY - 90);
        ctx.stroke();

        // 10. ŞAPKA (Siyah Silindir Şapka)
        ctx.fillStyle = '#333';
        // Alt kenar
        ctx.beginPath();
        ctx.rect(centerX - 30, bottomY - 170, 60, 5);
        ctx.fill();
        // Üst kısım
        ctx.beginPath();
        ctx.rect(centerX - 20, bottomY - 195, 40, 25);
        ctx.fill();
        // Şerit (Kırmızı)
        ctx.fillStyle = '#c62828';
        ctx.beginPath();
        ctx.rect(centerX - 20, bottomY - 178, 40, 5);
        ctx.fill();

        // 11. Zemin Kar Tepesi
        ctx.fillStyle = '#eef';
        ctx.beginPath();
        ctx.arc(centerX, canvas.height + 220, 300, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    function drawSnowball(x, y, r) {
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2);
        let g = ctx.createRadialGradient(x-r/3, y-r/3, r/5, x, y, r);
        g.addColorStop(0, '#fff'); g.addColorStop(1, '#dceeff');
        ctx.fillStyle = g; ctx.fill();
    }

    // --- ANİMASYON ---
    for (let i = 0; i < numFlakes; i++) snowflakes.push(new Snowflake());

    function animate() {
        if(!document.getElementById('snowCanvas')) return; // Modal kapandıysa dur
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        drawSnowman();
        snowflakes.forEach(f => { f.update(); f.draw(); });

        if (shakeVelocity > 0) {
            shakeVelocity *= 0.95;
            if (shakeVelocity < 0.5) shakeVelocity = 0;
        }
        requestAnimationFrame(animate);
    }
    animate();
}

// Global Sallama Fonksiyonu
// Global Sallama Fonksiyonu ve Kutuya Fotoğraf Aktarma
window.shakeGlobe = function() {
    const container = document.getElementById('globeContainer');
    const canvas = document.getElementById('snowCanvas'); // Canvas'ı seçtik
    
    if (isShaking || !container) return;

    isShaking = true;
    container.classList.add('shaking');
    shakeVelocity = 20; // Kar fırtınası başlat

    setTimeout(() => {
        container.classList.remove('shaking');
        isShaking = false;

        // AĞAÇTAKİ KUTUYU GÜNCELLE (10 Numara)
        const treeBox = document.querySelector('.box-10');
        
        if(treeBox && canvas) {
            // 1. Canvas'ın o anki görüntüsünü al (Fotoğrafını çek)
            const snapshot = canvas.toDataURL();

            // 2. Kutunun stilini Kar Küresi camı gibi yap
            treeBox.style.background = "radial-gradient(circle, #2b32b2, #1488cc)"; 
            treeBox.style.border = "2px solid #fff";
            treeBox.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";

            // 3. Çekilen fotoğrafı kutunun içine koy
            treeBox.innerHTML = `
                <img src="${snapshot}" 
                     alt="Snowman Snapshot" 
                     style="width:100%; height:100%; object-fit:cover; border-radius:50%; opacity: 0.9;">
            `;
            
            treeBox.classList.add('box-opened');
        }
    }, 500); // 0.5 saniye sonra fotoğrafı alıp kutuya koyar
}
// ==========================================
// --- SÜS TASARIM ATÖLYESİ  ---
// ==========================================

// Global Değişkenler
let isDesigning = false;
let designColor = '#ff0000'; // Varsayılan renk
let designMode = 'brush';

// --- 1. Atölye Başlatma ve Çizim Fonksiyonu ---
function initOrnamentWorkshop() {
    const canvas = document.getElementById('drawingCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Canvas ayarlarını sıfırla
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Çizim Başlangıcı
    const start = (e) => {
        isDesigning = true;
        const pos = getDesignPos(e, canvas);
        ctx.beginPath(); // Yeni çizgi başlat
        ctx.moveTo(pos.x, pos.y);
        
        // Eğer sticker modundaysa tıklandığı yere koy
        if (designMode === 'sticker') {
            drawSticker(ctx, pos.x, pos.y);
            isDesigning = false; // Sticker tek tıkla çalışır
        }
    };

    // Çizim Hareketi
    const move = (e) => {
        if (!isDesigning || designMode !== 'brush') return;
        const pos = getDesignPos(e, canvas);
        
        // Slider'dan güncel kalınlığı al
        const currentSize = document.getElementById('brushSize')?.value || 5;

        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = designColor; // Güncel rengi kullan (Beyaz düzeltmesi)
        ctx.lineWidth = currentSize;
        ctx.stroke();
    };

    const stop = () => {
        isDesigning = false;
        ctx.beginPath(); // Yolu kapat
    };

    // Olay Dinleyicileri (Mouse ve Dokunmatik)
    canvas.onmousedown = start;
    canvas.onmousemove = move;
    window.onmouseup = stop;
    
    canvas.ontouchstart = (e) => { e.preventDefault(); start(e.touches[0]); };
    canvas.ontouchmove = (e) => { e.preventDefault(); move(e.touches[0]); };
}

// Pozisyon Hesaplama Yardımcısı
function getDesignPos(e, canvas) {
    const rect = canvas.getBoundingClientRect();
    return { 
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / rect.height)
    };
}

// --- 2. Renk Değiştirme Fonksiyonu (Beyaz Rengi Garantiye Alır) ---
function setDesignColor(c, el) {
    designColor = c;
    
    // Aktif topu işaretle
    document.querySelectorAll('.tool-dot').forEach(d => d.classList.remove('active'));
    if(el && el.classList.contains('tool-dot')) {
        el.classList.add('active');
    }
}

// --- 3. Mod Değiştirme (Fırça / Sticker) ---
function setDesignMode(m) {
    designMode = m;
    // Butonların aktifliğini değiştir
    document.getElementById('brushBtn').classList.toggle('active', m === 'brush');
    document.getElementById('stickerBtn').classList.toggle('active', m === 'sticker');
}

// --- 4. Temizleme ---
function clearDesignCanvas() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// --- 5. Sticker Çizimi ---
function drawSticker(ctx, x, y) {
    const stickers = ['✨', '⭐', '❄️', '🎁', '🎄'];
    const currentSize = document.getElementById('brushSize')?.value || 5;
    ctx.font = `${currentSize * 5}px serif`; 
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = designColor;
    ctx.fillText(stickers[Math.floor(Math.random() * stickers.length)], x, y);
}

// --- 6. AĞACA ASMA FONKSİYONU (KOYU ARKA PLAN DÜZELTMESİ) ---
function saveOrnamentToTree() {
    const canvas = document.getElementById('drawingCanvas');
    const treeBox = document.querySelector('.box-14'); 
    const modal = document.getElementById('modal');

    if (treeBox && canvas) {
        const snapshot = canvas.toDataURL(); 

        treeBox.classList.add('box-opened');

        // 1. KUTU STİLLERİ (TAŞMAYI ENGELLEMEK İÇİN)
        treeBox.style.cssText = `
            background: radial-gradient(circle at center, #0a2e1a, #04140a) !important;
            border: 2px solid #ffd700 !important;
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.5) !important;
            padding: 0 !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            overflow: hidden !important; /* KRİTİK NOKTA: Taşanları gizle */
            position: relative !important;
        `;

        // 2. İÇERİK (BOYUT AYARI)
        // height: 75% yaptık ki tepedeki askı için pay kalsın ve taşmasın.
        treeBox.innerHTML = `
            <div style="position: relative; height: 75%; aspect-ratio: 1/1; display: flex; justify-content: center; align-items: center; margin-top: 5px;">
                
                <div style="position: absolute; top: -10px; width: 12px; height: 15px; 
                            background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728); 
                            border-radius: 3px; z-index: 5;"></div>

                <div style="position: relative; width: 100%; height: 100%; 
                            border-radius: 50%; 
                            border: 1px solid rgba(255, 255, 255, 0.4); 
                            background: rgba(255, 255, 255, 0.1);
                            box-shadow: inset 0 0 10px rgba(255,255,255,0.2); 
                            overflow: hidden;">
                    
                    <img src="${snapshot}" style="width: 100%; height: 100%; object-fit: cover;">
                    
                    <div style="position: absolute; top: 15%; left: 15%; width: 45%; height: 25%; 
                                background: radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%, transparent 70%); 
                                border-radius: 50%; transform: rotate(-45deg); pointer-events: none;">
                    </div>
                </div>
            </div>
        `;

        if (modal) modal.style.display = 'none';
        if (typeof closeModal === 'function') closeModal();
    }
}

// --- HEDİYELERİ RESİM OLARAK İNDİRME ---

// Her hediye açıldığında butonu görünür yapalım
function checkDownloadButton() {
    const openedBoxes = document.querySelectorAll('.box-opened');
    const btn = document.getElementById('downloadBtn');
    if (openedBoxes.length > 0 && btn) {
        btn.style.display = 'block';
        btn.classList.add('animate-bounce'); // Dikkat çeksin diye zıplasın
    }
}

// --- BASİT EKRAN GÖRÜNTÜSÜ ALMA (TEMİZ VE KISA) ---

// 1. Butonu Görünür Yapma Kontrolü (Hediye açılınca çalışır)
function checkDownloadButton() {
    const openedBoxes = document.querySelectorAll('.box-opened');
    const btn = document.getElementById('downloadBtn');
    
    // Eğer en az 1 kutu açılmışsa butonu göster
    if (openedBoxes.length > 0 && btn) {
        btn.style.display = 'block'; 
        // Kullanıcının dikkatini çekmek için minik bir animasyon (opsiyonel)
        btn.animate([
            { transform: 'scale(0.9)' },
            { transform: 'scale(1)' }
        ], { duration: 200 });
    }
}

// 2. Ekran Görüntüsü Alma Fonksiyonu
function downloadScreenshot() {
    const btn = document.getElementById('downloadBtn');
    const musicIcon = document.querySelector('.music-control'); // Müzik ikonu

    // Fotoğrafta butonların çıkmaması için gizle
    btn.style.display = 'none';
    if(musicIcon) musicIcon.style.display = 'none';

    // Tüm sayfanın fotoğrafını çek
    html2canvas(document.body, {
        scale: 2, // Kaliteli olsun
        backgroundColor: '#0f172a', // Arka plan rengini garantiye al
        useCORS: true // Resim yükleme sorunlarını önle
    }).then(canvas => {
        // İndirme işlemini başlat
        const link = document.createElement('a');
        link.download = 'Yilbasi-Agacim-2026.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        // Butonları geri getir
        btn.style.display = 'block';
        if(musicIcon) musicIcon.style.display = 'flex';
    });
}



createSnow();
createLights();