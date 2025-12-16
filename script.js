// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.highlight-card, .project-card, .perk-card, .value-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form validation for login page (if needed)
const loginForm = document.querySelector('.login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('This is an employee-only portal. Please contact our tech team if you are an employee.');
    });
}

// Chat Mission Section
const messages = [
    { 
        text: "Throughout history, stories have shaped how children understand themselves and the world.", 
        side: "left", 
        image: "images/teowhite.png" 
    },
    { 
        text: "This belief is why we created Mloop Studio.", 
        side: "right", 
        image: "images/white-logo-text.png" 
    },
    { 
        text: "Through animation, we strive to help future generations grow into emotionally aware, self-reflective, and passion-driven individuals.", 
        side: "left", 
        image: "images/img3.png" 
    },
    { 
        text: "We are a small, independent studio working remotely, united by a shared purpose rather than a shared location.", 
        side: "right", 
        image: "images/image4.png" 
    }
];

let chatBubblesCreated = false;

function createChatBubbles() {
    const container = document.getElementById('chatContainer');
    if (!container || chatBubblesCreated) return;
    
    container.innerHTML = '';
    
    messages.forEach((msg, index) => {
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${msg.side}`;
        bubble.style.opacity = '0';
        bubble.style.transform = 'translateY(20px)';
        bubble.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        bubble.dataset.index = index;
        
        const content = document.createElement('div');
        content.className = 'bubble-content';
        content.textContent = msg.text;
        
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'bubble-image';
        
        const img = document.createElement('img');
        img.src = msg.image;
        img.alt = `Image ${index + 1}`;
        
        imageWrapper.appendChild(img);
        bubble.appendChild(content);
        bubble.appendChild(imageWrapper);
        container.appendChild(bubble);
    });
    
    chatBubblesCreated = true;
    
    // Observe each bubble individually
    observeChatBubbles();
}

// Individual bubble observer
function observeChatBubbles() {
    const bubbleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                bubbleObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    const bubbles = document.querySelectorAll('.chat-bubble');
    bubbles.forEach(bubble => {
        bubbleObserver.observe(bubble);
    });
}

// Intersection Observer for chat section
const chatObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            createChatBubbles();
            chatObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

// Initialize chat observer on page load
document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chatContainer');
    if (chatContainer) {
        chatObserver.observe(chatContainer);
    }
});