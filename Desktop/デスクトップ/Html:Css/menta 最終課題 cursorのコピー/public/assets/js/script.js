// Planセクションのタブ機能
// スムーズなフェード切り替え＋レイアウト維持
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}); 

// --- スクロール連動ナビ ---
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('#navi ul li a');
  const sectionIds = ['Pickup', 'Plan', 'Feature', 'Gallery', 'SNS', 'Contact'];
  const sections = sectionIds.map(id => document.getElementById(id));

  // スムーズスクロール機能
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const headerHeight = 120; // ヘッダーの高さを考慮
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  function onScroll() {
    let current = '';
    const scrollY = window.pageYOffset;
    sections.forEach((section, idx) => {
      if (section && section.offsetTop - 120 <= scrollY) {
        current = sectionIds[idx];
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll);
  onScroll(); // 初期化
}); 

// ContactボタンでContactセクションへスムーズスクロール
const contactBtn = document.querySelector('.contact-button');
if (contactBtn) {
  contactBtn.addEventListener('click', function() {
    const target = document.getElementById('Contact');
    if (target) {
      const y = target.getBoundingClientRect().top + window.pageYOffset - 60;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const stacks = document.querySelectorAll('.gallery-img-stack');
  stacks.forEach(stack => {
    setTimeout(() => {
      stack.classList.add('active');
    }, 2000); // 2秒後に切り替え
  });
});

// Pickup 3枚表示スライダー ナビ・ドット

document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.pickup-slider-simple');
  if (!slider) return;
  const track = slider.querySelector('.pickup-track');
  const slides = Array.from(slider.querySelectorAll('.pickup-slide'));
  const prevBtn = slider.querySelector('.pickup-nav.prev');
  const nextBtn = slider.querySelector('.pickup-nav.next');
  const dotsContainer = slider.querySelector('.pickup-dots');

  // 3枚表示分の幅を計算
  function getScrollAmount() {
    if (!slides[0]) return 0;
    // gap: 24px（CSSと合わせる）
    return slides[0].offsetWidth + 24;
  }

  // ドット生成
  const visibleCount = 3;
  const dotCount = Math.max(1, slides.length - visibleCount + 1);
  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  }
  const dots = Array.from(dotsContainer.querySelectorAll('button'));

  let current = 0;
  
  // スライドのアニメーションクラスを更新
  function updateSlideClasses() {
    slides.forEach((slide, index) => {
      slide.classList.remove('active', 'prev', 'next', 'hide');
      
      if (index >= current && index < current + visibleCount) {
        if (index === current) {
          slide.classList.add('active');
        } else {
          slide.classList.add('next');
        }
      } else if (index < current) {
        slide.classList.add('prev');
      } else {
        slide.classList.add('hide');
      }
    });
  }
  
  function update() {
    const scrollTo = getScrollAmount() * current;
    track.scrollTo({ left: scrollTo, behavior: 'smooth' });
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    updateSlideClasses();
  }

  prevBtn.addEventListener('click', () => {
    current = Math.max(0, current - 1);
    update();
  });
  nextBtn.addEventListener('click', () => {
    current = Math.min(dotCount - 1, current + 1);
    update();
  });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      current = i;
      update();
    });
  });

  // スクロールでドット連動
  track.addEventListener('scroll', () => {
    const idx = Math.round(track.scrollLeft / getScrollAmount());
    if (idx !== current) {
      current = idx;
      updateSlideClasses();
      dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    }
  });

  // 初期化
  update();
});

// Gallery モーダル機能
document.addEventListener('DOMContentLoaded', function() {
  const modalOverlay = document.getElementById('modalOverlay');
  const modalImage = document.getElementById('modalImage');
  const modalClose = document.getElementById('modalClose');
  const galleryImages = document.querySelectorAll('.gallery-grid .photo-animate-wrap img');

  // 画像クリックでモーダル表示
  galleryImages.forEach(img => {
    img.addEventListener('click', function() {
      modalImage.src = this.src;
      modalImage.alt = this.alt;
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // スクロール防止
    });
  });

  // ✖ボタンでモーダル閉じる
  modalClose.addEventListener('click', closeModal);

  // 外側クリックでモーダル閉じる
  modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // ESCキーでモーダル閉じる
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // スクロール復活
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburgerMenu');
  const overlay = document.getElementById('mobileMenuOverlay');
  if (hamburger && overlay) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
    });
  }
});

