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

function setLanguage(lang) {
    state.language = lang;
    document.documentElement.setAttribute('lang', lang);
    updateLanguage();
}

function updateLanguage() {
    // This function can be expanded to update text content based on language
    // For now, it just sets the lang attribute
    document.documentElement.setAttribute('lang', state.language);
    
    // You can add translation logic here later
    // For example:
    // const translations = {
    //     en: { ... },
    //     ko: { ... }
    // };
}

