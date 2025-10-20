// ===========================
// 現代簡約風格 - 命理服務網站
// 主要 JavaScript 功能
// ===========================

document.addEventListener('DOMContentLoaded', function() {
  // 初始化所有功能
  initSmoothScroll();
  initNavigation();
  initAnimations();
});

/**
 * 平滑滾動功能
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // 排除導航欄 Logo 的滾動行為
      if (href === '#') {
        return;
      }
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const offsetTop = target.offsetTop - 80; // 考慮固定導航欄的高度
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // 更新活動導航項目
        updateActiveNavLink(href);
      }
    });
  });
}

/**
 * 更新活動導航項目
 */
function updateActiveNavLink(href) {
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === href) {
      link.classList.add('active');
    }
  });

  // 點擊導航連結後關閉漢堡選單
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNavLinks = document.querySelector(".nav-links");
  if (mainNavLinks.classList.contains("active")) {
    mainNavLinks.classList.remove("active");
    menuToggle.classList.remove("active");
  }
}

/**
 * 導航欄功能
 */
function initNavigation() {
  const nav = document.querySelector('nav');
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });
  
  // 監聽滾動事件，更新導航欄樣式
  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      nav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
      nav.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
  });
}

/**
 * 動畫效果
 */
function initAnimations() {
  // 使用 Intersection Observer 實現元素進入視口時的動畫
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // 監聽所有卡片元素
  const cards = document.querySelectorAll('.service-card, .ig-post-card, .contact-item');
  cards.forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
  });
}

/**
 * 添加 CSS 動畫
 */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

/**
 * 工具函數：複製文本到剪貼板
 */
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('已複製到剪貼板！');
  }).catch(err => {
    console.error('複製失敗:', err);
  });
}

/**
 * 工具函數：格式化日期
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('zh-Hant-TW', options);
}

/**
 * 工具函數：驗證電子郵件格式
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 導出函數供外部使用
window.fortuneTelling = {
  copyToClipboard,
  formatDate,
  validateEmail
};

