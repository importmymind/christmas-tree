const gifts = {
    1: { 
        type: "wish_star", // Yeni özel tipimiz
        title: "Make a Wish ✨", 
        desc: "Hold the star to gather energy...", 
        icon: "⭐" 
    },
    
    
    2: { 
        type: "piano_gift", 
        title: "Melody Maker 🎹", 
        desc: "Compose your own Christmas jingle!", 
        icon: "🎼" 
    },
    
    // --- FORTUNE COOKIE ---
    3: { 
        type: "fortune", 
        title: "Fortune Cookie 🥠", 
        desc: "Your cookie has cracked, revealing your destiny:",
        customImage: "assets/contents/misfortune_cookie.png", 
        messages: [
            "A thrilling time is in your immediate future. 🌟",
            "Your ability to juggle many tasks will take you far. 🤹",
            "Trust your intuition. The universe is guiding you. 🔮",
            "An unexpected adventure will soon begin. ✈️",
            "Good things come to those who wait, but better things come to those who go out and get them. 🚀",
            "A surprise from an old friend is coming. 💌",
            "Love is just around the corner. ❤️"
        ],
        icon: "🥠"
    },
    
    4: { 
        type: "music_gift", 
        title: "Magical Music Box 🎶", 
        desc: "Tap Play to spin the record!", 
        gifImage: "assets/contents/record_player.mp4", 
        
        icon: "🎶" 
    },
    5: { 
        type: "css_flower", 
        title: "Digital Bloom", // Emojiyi SİLDİK (Kodla resim ekleyeceğiz)
        desc: "A special Kokina flower coded just for you... 🎄", // Açıklamayı da Kokina'ya uygun yaptık
        icon: "🌹" // Ağaçta kapalıyken görünecek ikon (Gül veya Çam Ağacı yapabilirsin)
    },
    // --- SONNY ANGEL (GACHA) ---
    6: { 
        type: "gacha", 
        title: "Surprise Sonny Angel!", 
        desc: "A blind box! Tap it to reveal the baby inside! ✨", 
        closedImage: "assets/contents/sonny_closed_box.png",
        images: [ 
            "assets/contents/sonny1.png", "assets/contents/sonny2.png", "assets/contents/sonny3.png",
            "assets/contents/sonny4.png", "assets/contents/sonny5.png", "assets/contents/sonny6.png",
            "assets/contents/sonny7.png", "assets/contents/sonny8.png", "assets/contents/sonny9.png",
            "assets/contents/sonny10.png", "assets/contents/sonny11.png", "assets/contents/sonny12.png"
        ],
        icon: "🎁" 
    },
    7: { 
        type: "magic_gift", 
        category: "game",
        title: "Game of the Year Edition 🎮", 
        desc: "Loading new adventure... Press Start to reveal your quest!", 
        closedImage: "assets/contents/game_icon.png", 
        options: [
            { src: "assets/contents/game1.jpg" }, { src: "assets/contents/game2.jpg" }, { src: "assets/contents/game3.jpg" }, { src: "assets/contents/game4.jpg" },
            { src: "assets/contents/game5.jpg" }, { src: "assets/contents/game6.jpg" }, { src: "assets/contents/game7.jpg" }, { src: "assets/contents/game8.jpg" }
        ],
        icon: "🎮" 
    },
    8: { 
        type: "ticket", 
        title: "Dream Destination ✈️", 
        desc: "Where will 2026 take you? Tap the box to get your boarding pass!", 
        closedImage: "assets/contents/suitcase.png",
        options: [
            { src: "assets/contents/hogwarts.png", msg: "Pack your wand! You're going to Hogwarts! 🧙‍♂️✨" },
            { src: "assets/contents/disneyland.png", msg: "The magic awaits! You are off to Disneyland! 🎢🏰" },
            { src: "assets/contents/lapland.png", msg: "Get ready for the Northern Lights! Lapland calls! ❄️🦌" }
        ],
        icon: "✈️"
    },
    // --- DREAM TICKET (NEW!) ---
    9: { 
        type: "magic_gift", 
        category: "book", 
        title: "Blind Date with a Book ", 
        desc: "A mystery wrapped in pages... Let fate decide your next adventure!", 
        closedImage: "assets/contents/cat_icon.png", 
        
        options: [
            { src: "assets/contents/book1.jpg" },
            { src: "assets/contents/book2.jpg"},
            { src: "assets/contents/book3.jpg" },
            { src: "assets/contents/book4.jpg" },
            { src: "assets/contents/book5.jpg" },
            { src: "assets/contents/book6.jpg" }
        ],
        icon: "📚"
    },
    
    // --- 10 NUMARA: KAR KÜRESİ ---
    10: { 
        type: "snow_globe", 
        title: "Winter Magic ❄️", 
        desc: "Shake the globe for a snowy surprise!", 
        icon: "🔮" 
    },
    // --- MOVIE NIGHT (ROULETTE) ---
   11: { 
        type: "movie", 
        title: "Christmas Movie Roulette 🎬", 
        desc: "Can’t decide? Let the Christmas spirit decide what you’ll watch tonight! 🎄✨", 
        closedImage: "assets/contents/popcorn_box.png",
        
        // Sadece resim ve başlık kaldı, mesajlar silindi
        options: [
            { src: "assets/contents/movie1.jpg", title: "Home Alone" },
            { src: "assets/contents/movie2.jpg", title: "The Grinch" },
            { src: "assets/contents/movie3.jpg", title: "Elf" },
            { src: "assets/contents/movie4.jpg", title: "Klaus" }
        ],
        icon: "🍿" 
    },
    
    // --- GAME RECOMMENDATION (BOX 12) ---
    
    // --- 13 NUMARA: ZAMAN KAPSÜLÜ (MEKTUP) ---
    13: { 
        type: "time_capsule", 
        title: "Future Self 📜", 
        desc: "Write a note for next year...", 
        icon: "⏳" 
    },

    // --- 14 NUMARA: SÜS TASARIM ATÖLYESİ ---
    14: { 
        type: "ornament_design", 
        title: "Ornament Workshop 🎨", 
        desc: "Design your own unique ornament for the tree!", 
        icon: "🎨" 
    },

    
};