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

// Pickup Swiperスライダー初期化
document.addEventListener('DOMContentLoaded', function() {
  const pickupSwiper = new Swiper('.pickup-swiper', {
    slidesPerView: 3,
    spaceBetween: 35,
    loop: true,
    loopAdditionalSlides: 1,
    loopedSlides: 1,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 15,
        loopedSlides: 1,
      },
      480: {
        slidesPerView: 1,
        spaceBetween: 20,
        loopedSlides: 1,
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 20,
        loopedSlides: 2,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 25,
        loopedSlides: 2,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 35,
        loopedSlides: 3,
      },
    },
  });
});

// Gallery モーダル機能
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('galleryModal');
  const modalImage = document.getElementById('modalImage');
  const modalClose = document.getElementById('modalClose');
  const modalOverlay = document.getElementById('modalOverlay');
  const galleryImages = document.querySelectorAll('.photo-animate-wrap');

  // 画像クリックでモーダル表示
  galleryImages.forEach(wrap => {
    wrap.addEventListener('click', function() {
      const img = this.querySelector('img');
      const modalSrc = this.getAttribute('data-modal');
      modalImage.src = modalSrc || img.src;
      modalImage.alt = img.alt;
      modal.classList.add('active');
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
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // スクロール復活
  }
});

// ハンバーガーメニュー
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburgerMenu'); // ハンバーガー
  const mobileNav = document.getElementById('mobileNavList'); // メニュー全体
  const mobileHeader = document.querySelector('.mobile-header'); // ロゴ含む上部

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');          // ハンバーガー → × 変形
    mobileNav.classList.toggle('active');          // メニュー表示・非表示
    mobileHeader.classList.toggle('hide-logo');    // ロゴ表示・非表示
  });
});




