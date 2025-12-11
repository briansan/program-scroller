// State Management
const state = {
    currentSection: 0,
    sections: [],
    fontSize: 'medium',
    language: 'en'
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initializeSections();
    initializeNavigation();
    initializeTOC();
    initializeTextControls();
    updateLanguage();
    preventIOSZoom();
});

// Prevent iOS Safari zoom gestures
function preventIOSZoom() {
    let lastTouchEnd = 0;
    
    // Prevent double-tap zoom
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Prevent pinch zoom
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Prevent gesture zoom
    document.addEventListener('gesturestart', (e) => {
        e.preventDefault();
    });
    
    document.addEventListener('gesturechange', (e) => {
        e.preventDefault();
    });
    
    document.addEventListener('gestureend', (e) => {
        e.preventDefault();
    });
}

// Initialize sections
function initializeSections() {
    state.sections = Array.from(document.querySelectorAll('.section'));
    if (state.sections.length > 0) {
        showSection(0);
    }
}

// Get section title
function getSectionTitle(section) {
    const h1 = section.querySelector('h1');
    const h2 = section.querySelector('h2');
    if (h1) return h1.textContent.trim();
    if (h2) return h2.textContent.trim();
    return 'Table of Contents';
}

// Update TOC label with current section title
function updateTOCLabel() {
    const tocLabel = document.querySelector('.toc-label');
    const currentSection = state.sections[state.currentSection];
    if (tocLabel && currentSection) {
        tocLabel.textContent = getSectionTitle(currentSection);
    }
}

// Show specific section
function showSection(index) {
    if (index < 0 || index >= state.sections.length) return;
    
    // Hide all sections
    state.sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    state.sections[index].classList.add('active');
    state.currentSection = index;
    
    // Update TOC active state
    updateTOCActive();
    
    // Update TOC label with section title
    updateTOCLabel();
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigation functions
function initializeNavigation() {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    
    prevButton.addEventListener('click', () => {
        if (state.currentSection > 0) {
            showSection(state.currentSection - 1);
        }
    });
    
    nextButton.addEventListener('click', () => {
        if (state.currentSection < state.sections.length - 1) {
            showSection(state.currentSection + 1);
        }
    });
    
    updateNavigationButtons();
}

function updateNavigationButtons() {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    
    prevButton.disabled = state.currentSection === 0;
    nextButton.disabled = state.currentSection === state.sections.length - 1;
}

// Table of Contents functions
function initializeTOC() {
    const tocToggle = document.getElementById('tocToggle');
    const tocDropdown = document.getElementById('tocDropdown');
    const tocLinks = document.querySelectorAll('.toc-link');
    
    // Toggle dropdown
    tocToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        tocDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!tocToggle.contains(e.target) && !tocDropdown.contains(e.target)) {
            tocDropdown.classList.remove('active');
        }
    });
    
    // Handle TOC link clicks
    tocLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            const sectionIndex = state.sections.findIndex(
                section => section.getAttribute('data-section') === sectionId
            );
            
            if (sectionIndex !== -1) {
                showSection(sectionIndex);
                tocDropdown.classList.remove('active');
            }
        });
    });
    
    updateTOCActive();
}

function updateTOCActive() {
    const tocLinks = document.querySelectorAll('.toc-link');
    const currentSectionId = state.sections[state.currentSection]?.getAttribute('data-section');
    
    tocLinks.forEach(link => {
        if (link.getAttribute('data-section') === currentSectionId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Text Controls functions
function initializeTextControls() {
    const textControlToggle = document.getElementById('textControlToggle');
    const textControlMenu = document.getElementById('textControlMenu');
    const fontSizeButtons = document.querySelectorAll('.font-size-btn');
    const languageButtons = document.querySelectorAll('.language-btn');
    
    // Toggle menu
    textControlToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        textControlMenu.classList.toggle('active');
        textControlToggle.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!textControlToggle.contains(e.target) && !textControlMenu.contains(e.target)) {
            textControlMenu.classList.remove('active');
            textControlToggle.classList.remove('active');
        }
    });
    
    // Font size controls
    fontSizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            fontSizeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const size = button.getAttribute('data-size');
            setFontSize(size);
        });
    });
    
    // Language controls
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            languageButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const lang = button.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
}

function setFontSize(size) {
    state.fontSize = size;
    document.body.className = document.body.className.replace(/font-\w+/g, '');
    if (size !== 'medium') {
        document.body.classList.add(`font-${size}`);
    }
}

// Translations object
const translations = {
    en: {
        'toc-label': 'Table of Contents',
        'toc-cover': 'Cover',
        'toc-section1': 'Section 1',
        'toc-section2': 'Section 2',
        'toc-section3': 'Section 3',
        'cover-title': 'Service Program',
        'cover-subtitle': 'Lorem ipsum dolor sit amet',
        'section1-title': 'Section 1',
        'section1-p1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'section1-p2': 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'section2-title': 'Section 2',
        'section2-p1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'section2-p2': 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'section3-title': 'Section 3',
        'section3-p1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'section3-p2': 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'font-size-label': 'Font Size',
        'language-label': 'Language'
    },
    ko: {
        'toc-label': '목차',
        'toc-cover': '표지',
        'toc-section1': '1부',
        'toc-section2': '2부',
        'toc-section3': '3부',
        'cover-title': '예배 프로그램',
        'cover-subtitle': '한글 로렘 입숨 더미 텍스트',
        'section1-title': '1부',
        'section1-p1': '한글 로렘 입숨은 한국어로 된 더미 텍스트입니다. 다양한 한글 문장과 단어를 사용하여 텍스트의 레이아웃과 디자인을 테스트하는 데 사용됩니다. 이 텍스트는 실제 의미를 전달하지 않지만, 한글의 특성을 잘 보여줍니다.',
        'section1-p2': '한글은 조선 세종대왕이 창제한 독창적인 문자 체계입니다. 자음과 모음의 조합으로 이루어져 있으며, 과학적이고 체계적인 구조를 가지고 있습니다. 한글은 배우기 쉽고 사용하기 편리한 문자로 세계적으로 인정받고 있습니다.',
        'section2-title': '2부',
        'section2-p1': '한글 로렘 입숨은 한국어로 된 더미 텍스트입니다. 다양한 한글 문장과 단어를 사용하여 텍스트의 레이아웃과 디자인을 테스트하는 데 사용됩니다. 이 텍스트는 실제 의미를 전달하지 않지만, 한글의 특성을 잘 보여줍니다.',
        'section2-p2': '한글은 조선 세종대왕이 창제한 독창적인 문자 체계입니다. 자음과 모음의 조합으로 이루어져 있으며, 과학적이고 체계적인 구조를 가지고 있습니다. 한글은 배우기 쉽고 사용하기 편리한 문자로 세계적으로 인정받고 있습니다.',
        'section3-title': '3부',
        'section3-p1': '한글 로렘 입숨은 한국어로 된 더미 텍스트입니다. 다양한 한글 문장과 단어를 사용하여 텍스트의 레이아웃과 디자인을 테스트하는 데 사용됩니다. 이 텍스트는 실제 의미를 전달하지 않지만, 한글의 특성을 잘 보여줍니다.',
        'section3-p2': '한글은 조선 세종대왕이 창제한 독창적인 문자 체계입니다. 자음과 모음의 조합으로 이루어져 있으며, 과학적이고 체계적인 구조를 가지고 있습니다. 한글은 배우기 쉽고 사용하기 편리한 문자로 세계적으로 인정받고 있습니다.',
        'font-size-label': '글자 크기',
        'language-label': '언어'
    }
};

function setLanguage(lang) {
    state.language = lang;
    document.documentElement.setAttribute('lang', lang);
    updateLanguage();
}

function updateLanguage() {
    const lang = state.language;
    const translation = translations[lang] || translations.en;
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translation[key]) {
            element.textContent = translation[key];
        }
    });
    
    // Update TOC label if it's showing a section title
    updateTOCLabel();
}

