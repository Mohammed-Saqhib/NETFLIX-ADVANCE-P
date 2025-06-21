// Netflix Household Verify - Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get the Netflix intro overlay that's already in the HTML
    const overlayElement = document.getElementById('nf-intro-overlay');
    
    if (overlayElement) {
        // Temporarily prevent scrolling during intro animation
        document.body.style.overflow = 'hidden';
        
        // Hide all content initially (but don't hide the intro)
        const mainContent = document.querySelectorAll('.header, .container');
        mainContent.forEach(el => {
            el.style.opacity = '0';
        });
        
        // After Netflix animation completes, fade out splash screen
        setTimeout(() => {
            overlayElement.classList.add('hide');
            
            // Make content visible after fade completes
            setTimeout(() => {
                document.body.style.overflow = '';
                
                // Fade in main content with proper timing
                mainContent.forEach(el => {
                    el.style.opacity = '1';
                    el.style.transition = 'opacity 0.8s ease-in-out';
                });
                
                // Force layout recalculation for smooth animations
                document.body.offsetHeight;
                
            }, 800); // Match with CSS fade-out duration
        }, 2500); // Match with animation sequence in HTML
    }
    
    // Initialize all functionality
    initStepToggle();
    initFAQAccordion();
    initSmoothScrolling();
    initProgressIndicators();
    
    // Initialize new enhanced features
    initThemeSwitcher();
    initEnhancedAnimations();
    initImprovedNotifications();
    initAccessibilityImprovements();
    
    // Add this new function call to ensure tutorial links work properly
    initTutorialLinks();
    
    // Explicitly add scroll-to-top functionality
    addScrollToTop();
});

// Step-by-step guide toggle functionality
function initStepToggle() {
    const stepButtons = document.querySelectorAll('.view-steps-btn');
    
    stepButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            // Prevent default button behavior
            event.preventDefault();
            event.stopPropagation();
            
            const method = this.getAttribute('data-method');
            const stepsContainer = document.getElementById(`${method}-steps`);
            
            if (!stepsContainer) {
                console.error(`Steps container not found for method: ${method}`);
                return;
            }
            
            // Get current visibility state - more reliable check
            const isVisible = stepsContainer.classList.contains('visible');
            
            // Toggle visibility with improved animation sequence
            if (isVisible) {
                // First change opacity
                stepsContainer.style.opacity = '0';
                stepsContainer.style.transform = 'translateY(-10px)';
                
                // Then hide after transition completes
                setTimeout(() => {
                    stepsContainer.style.display = 'none';
                    stepsContainer.classList.remove('visible');
                    this.textContent = 'View Steps';
                    this.classList.remove('btn--primary');
                    this.classList.add('btn--outline');
                }, 300);
            } else {
                // First set display to block but opacity 0
                stepsContainer.style.display = 'block';
                stepsContainer.style.opacity = '0';
                stepsContainer.style.transform = 'translateY(-10px)';
                
                // Force layout recalculation before animation begins
                stepsContainer.offsetHeight;
                
                // Now set up the transition and add the visible class
                stepsContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                stepsContainer.classList.add('visible');
                
                // Update button state immediately for better UX
                this.textContent = 'Hide Steps';
                this.classList.remove('btn--outline');
                this.classList.add('btn--primary');
                
                // Finally, animate in
                requestAnimationFrame(() => {
                    stepsContainer.style.opacity = '1';
                    stepsContainer.style.transform = 'translateY(0)';
                    
                    // Scroll into view once visible
                    setTimeout(() => {
                        stepsContainer.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'nearest' 
                        });
                    }, 100);
                });
            }
        });
    });
    
    // Ensure the steps containers are properly initialized
    document.querySelectorAll('.steps-container').forEach(container => {
        container.style.display = 'none';
        container.classList.remove('visible');
        // Reset any inline styles that might persist
        container.style.opacity = '';
        container.style.transform = '';
    });
}

// Enhanced FAQ Accordion functionality
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // First, ensure all FAQ answers are hidden initially with consistent styling
    document.querySelectorAll('.faq-answer').forEach(answer => {
        answer.style.display = 'none';
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        answer.classList.remove('open');
    });
    
    // Remove any existing click handlers to prevent duplicates
    faqQuestions.forEach(question => {
        const newQuestion = question.cloneNode(true);
        if (question.parentNode) {
            question.parentNode.replaceChild(newQuestion, question);
        }
        
        // Add fresh click handler
        newQuestion.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const faqId = this.getAttribute('data-faq');
            const answer = document.getElementById(faqId);
            
            if (!answer) {
                console.error(`FAQ answer not found: ${faqId}`);
                return false;
            }
            
            const icon = this.querySelector('.faq-icon');
            
            // Check if already open
            const isOpen = answer.classList.contains('open');
            
            // Close all other FAQs with clean transitions
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this && otherQuestion !== newQuestion) {
                    const otherId = otherQuestion.getAttribute('data-faq');
                    const otherAnswer = document.getElementById(otherId);
                    const otherIcon = otherQuestion.querySelector('.faq-icon');
                    
                    if (otherAnswer && otherAnswer.classList.contains('open')) {
                        otherAnswer.classList.remove('open');
                        otherAnswer.style.opacity = '0';
                        otherAnswer.style.maxHeight = '0';
                        
                        if (otherIcon) {
                            otherIcon.classList.remove('rotate');
                            otherIcon.textContent = '+';
                        }
                        
                        setTimeout(() => {
                            otherAnswer.style.display = 'none';
                        }, 300);
                    }
                }
            });
            
            // Toggle current FAQ with better animation
            if (isOpen) {
                answer.style.opacity = '0';
                answer.style.maxHeight = '0';
                answer.classList.remove('open');
                
                if (icon) {
                    icon.classList.remove('rotate');
                    icon.textContent = '+';
                }
                
                setTimeout(() => {
                    answer.style.display = 'none';
                }, 300);
            } else {
                // Show before animation
                answer.style.display = 'block';
                answer.style.transition = 'opacity 0.3s ease, max-height 0.3s ease';
                
                // Force reflow to ensure transition works
                answer.offsetHeight;
                
                // Apply transitions
                answer.classList.add('open');
                answer.style.opacity = '1';
                answer.style.maxHeight = '500px';
                
                if (icon) {
                    icon.classList.add('rotate');
                    icon.textContent = '×';
                }
                
                // Smooth scroll to FAQ item with slight delay for better UX
                setTimeout(() => {
                    this.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 100);
            }
            
            return false;
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Add loading effect
                this.classList.add('loading');
                
                setTimeout(() => {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    this.classList.remove('loading');
                    
                    // Highlight target section briefly
                    targetElement.style.transform = 'scale(1.01)';
                    targetElement.style.transition = 'transform 0.3s ease';
                    
                    setTimeout(() => {
                        targetElement.style.transform = 'scale(1)';
                    }, 300);
                }, 200);
            }
        });
    });
}

// Progress indicators for multi-step processes
function initProgressIndicators() {
    const stepContainers = document.querySelectorAll('.steps-container');
    
    stepContainers.forEach(container => {
        const steps = container.querySelectorAll('li');
        
        steps.forEach((step, index) => {
            step.style.cursor = 'pointer';
            step.setAttribute('data-step', index + 1);
            
            // Add click handler for step completion
            step.addEventListener('click', function() {
                this.classList.toggle('completed');
                
                if (this.classList.contains('completed')) {
                    this.style.textDecoration = 'line-through';
                    this.style.opacity = '0.7';
                    this.innerHTML = '✅ ' + this.innerHTML;
                } else {
                    this.style.textDecoration = 'none';
                    this.style.opacity = '1';
                    this.innerHTML = this.innerHTML.replace('✅ ', '');
                }
                
                // Check if all steps are completed
                const allSteps = container.querySelectorAll('li');
                const completedSteps = container.querySelectorAll('li.completed');
                
                if (allSteps.length === completedSteps.length) {
                    showNotification('All steps completed! 🎉', 'success');
                }
            });
        });
    });
}

// Theme switcher functionality
function initThemeSwitcher() {
    // Create theme switcher
    const themeSwitch = document.createElement('button');
    themeSwitch.className = 'theme-switch';
    themeSwitch.setAttribute('aria-label', 'Toggle dark/light mode');
    themeSwitch.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    document.body.appendChild(themeSwitch);
    
    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    let currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        themeSwitch.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
    } else if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeSwitch.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    } else {
        // Default based on system preference
        if (prefersDarkScheme.matches) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.setAttribute('data-theme', 'light');
        }
    }
    
    // Toggle theme on click
    themeSwitch.addEventListener('click', function() {
        let theme;
        if (document.body.getAttribute('data-theme') === 'light') {
            document.body.removeAttribute('data-theme');
            document.body.setAttribute('data-theme', 'dark'); 
            theme = 'dark';
            this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
        } else {
            document.body.removeAttribute('data-theme');
            document.body.setAttribute('data-theme', 'light');
            theme = 'light';
            this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
        }
        localStorage.setItem('theme', theme);
        
        // Show theme change notification
        showNotification(`Switched to ${theme} mode`, 'info');
    });
}

// Enhanced animations
function initEnhancedAnimations() {
    // Add animation to method cards
    const cards = document.querySelectorAll('.method-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 150));
    });
    
    // Animate headers on scroll
    const headers = document.querySelectorAll('.section__header');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    headers.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(20px)';
        header.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
        observer.observe(header);
    });
}

// Improved notification system
function initImprovedNotifications() {
    // Create a global notification function
    window.showNotification = function(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 400);
        });
        
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 400);
        }, 4000);
        
        // Click to dismiss
        notification.addEventListener('click', function() {
            this.classList.remove('show');
            setTimeout(() => {
                this.remove();
            }, 400);
        });
    };
}

// Accessibility improvements
function initAccessibilityImprovements() {
    // Add aria labels to interactive elements
    const interactiveElements = document.querySelectorAll('button, a');
    interactiveElements.forEach(element => {
        if (!element.getAttribute('aria-label') && !element.innerText.trim()) {
            const closest = element.querySelector('*:not(svg)') || element;
            if (closest.innerText) {
                element.setAttribute('aria-label', closest.innerText);
            }
        }
    });
    
    // Add focus indicators
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        :focus-visible {
            outline: 3px solid rgba(229, 9, 20, 0.6) !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(styleElement);
    
    // Improve form labels
    const inputs = document.querySelectorAll('input:not([aria-label])');
    inputs.forEach(input => {
        const placeholder = input.getAttribute('placeholder');
        if (placeholder) {
            input.setAttribute('aria-label', placeholder);
        }
    });
}

// Initialize additional features
setTimeout(() => {
    initTooltips();
    
    // Add copy functionality to verification codes in tutorials
    addCopyButtons();
    
    // Initialize keyboard navigation
    initKeyboardNavigation();
}, 1000);

function addCopyButtons() {
    const codeElements = document.querySelectorAll('code, .verification-code');
    
    codeElements.forEach(element => {
        if (element.textContent.match(/\d{6}/)) {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'btn btn--sm btn--outline copy-btn';
            copyBtn.textContent = '📋 Copy';
            copyBtn.style.marginLeft = '8px';
            
            copyBtn.addEventListener('click', function() {
                navigator.clipboard.writeText(element.textContent).then(() => {
                    this.textContent = '✅ Copied!';
                    setTimeout(() => {
                        this.textContent = '📋 Copy';
                    }, 2000);
                });
            });
            
            element.parentNode.appendChild(copyBtn);
        }
    });
}

function initKeyboardNavigation() {
    // Tab navigation for better accessibility
    const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach((element, index) => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                // Custom tab behavior can be added here if needed
            }
        });
    });
}

// Performance optimization: Lazy load non-critical features
window.addEventListener('load', function() {
    // Initialize search functionality
    initSearch();
    
    // Add scroll-to-top button - ensure it runs on load
    addScrollToTop();
    
    // Ensure FAQ items are properly initialized on load
    initializeFAQItems();
});

// Function to ensure FAQ answers are hidden on load
function initializeFAQItems() {
    const faqAnswers = document.querySelectorAll('.faq-answer');
    faqAnswers.forEach(answer => {
        answer.style.display = 'none';
        answer.classList.remove('open');
    });
    
    // Reset icons
    document.querySelectorAll('.faq-icon').forEach(icon => {
        icon.textContent = '+';
        icon.classList.remove('rotate');
    });
}

// Initialize tooltips functionality
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        
        if (tooltipText) {
            // Create tooltip element
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            
            // Handle mouse events
            element.addEventListener('mouseenter', () => {
                document.body.appendChild(tooltip);
                const rect = element.getBoundingClientRect();
                tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
                tooltip.style.left = `${rect.left + window.scrollX + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
                tooltip.style.opacity = '1';
            });
            
            element.addEventListener('mouseleave', () => {
                if (tooltip.parentNode) {
                    tooltip.style.opacity = '0';
                    setTimeout(() => {
                        if (tooltip.parentNode) {
                            document.body.removeChild(tooltip);
                        }
                    }, 300);
                }
            });
        }
    });
}

function addScrollToTop() {
    // Get existing button or create a new one if it doesn't exist
    let scrollBtn = document.getElementById('back-to-top');
    
    if (!scrollBtn) {
        scrollBtn = document.createElement('button');
        scrollBtn.id = 'back-to-top';
        scrollBtn.className = 'scroll-to-top btn btn--primary';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        scrollBtn.innerHTML = '↑';
        document.body.appendChild(scrollBtn);
    }
    
    // Set initial state
    scrollBtn.style.display = 'none';
    
    // Enhanced scroll event handling with throttling for better performance
    let lastScrollTop = 0;
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        lastScrollTop = window.pageYOffset;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                if (lastScrollTop > 300) {
                    scrollBtn.style.display = 'flex';
                } else {
                    scrollBtn.style.display = 'none';
                }
                ticking = false;
            });
            
            ticking = true;
        }
    });
    
    scrollBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Force check initial scroll position
    if (window.pageYOffset > 300) {
        scrollBtn.style.display = 'flex';
    }
}

// Add this new enhanced function to ensure tutorial links work properly
function initTutorialLinks() {
    // Select all tutorial links
    const tutorialLinks = document.querySelectorAll('.tutorial-link, .tutorial-link--large');
    
    tutorialLinks.forEach(link => {
        // Add YouTube specific class to YouTube links
        if (link.getAttribute('href').includes('youtu')) {
            link.classList.add('youtube-tutorial-link');
        }
        
        // Replace existing click handler with a more robust one
        link.addEventListener('click', function(e) {
            // Stop the event from bubbling up
            e.preventDefault();
            e.stopPropagation();
            
            // Get the URL
            const url = this.getAttribute('href');
            console.log('Opening tutorial:', url);
            
            // Prevent any default behavior and open in a new window
            try {
                const newWindow = window.open();
                newWindow.opener = null; // Security best practice
                newWindow.location.href = url;
                
                // Show success notification
                showNotification('YouTube tutorial opening in a new tab', 'success');
            } catch (error) {
                console.error("Error opening tutorial:", error);
                
                // Fallback method
                window.open(url, '_blank', 'noopener,noreferrer');
                showNotification('Opening tutorial video', 'info');
            }
        });
        
        // Make the link more interactive
        link.setAttribute('title', 'Click to open YouTube tutorial');
        
        // Ensure the play icon is present
        if (!link.querySelector('.play-icon')) {
            const text = link.innerHTML;
            link.innerHTML = text.replace('🎓', '<span class="play-icon">🎓</span>');
        }
    });
}

// Initialize immediately at script load
document.addEventListener('DOMContentLoaded', function() {
    // Special handler for TV section tutorial links
    setTimeout(() => {
        const tvTutorialLinks = document.querySelectorAll('#tv-users .tutorial-link');
        tvTutorialLinks.forEach(link => {
            // Make TV section links more prominent
            link.style.fontWeight = 'bold';
            link.style.border = '2px solid white';
            
            // Add a duplicate click handler directly on the element for redundancy
            link.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const url = this.getAttribute('href');
                console.log('Direct click on TV tutorial:', url);
                window.open(url, '_blank');
                
                // Show a clear notification
                showNotification('Opening Netflix verification tutorial on YouTube', 'success');
                return false;
            };
        });
    }, 500);
    
    // Force initialize view-steps buttons - IMPROVED with handler clearing
    document.querySelectorAll('.view-steps-btn').forEach(btn => {
        // Remove all existing click handlers to prevent duplicates
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        // Add single clean event handler
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const method = this.getAttribute('data-method');
            const stepsContainer = document.getElementById(`${method}-steps`);
            
            if (!stepsContainer) {
                console.error(`Steps container not found for method: ${method}`);
                return;
            }
            
            const isVisible = window.getComputedStyle(stepsContainer).display !== 'none';
            
            if (isVisible) {
                // First change opacity with proper transition
                stepsContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                stepsContainer.style.opacity = '0';
                stepsContainer.style.transform = 'translateY(-10px)';
                
                // Then hide after transition completes
                setTimeout(() => {
                    stepsContainer.style.display = 'none';
                    stepsContainer.classList.remove('visible');
                    this.textContent = 'View Steps';
                    this.classList.remove('btn--primary');
                    this.classList.add('btn--outline');
                }, 300);
            } else {
                // Set up transition BEFORE changing display
                stepsContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                stepsContainer.style.display = 'block';
                stepsContainer.style.opacity = '0';
                stepsContainer.style.transform = 'translateY(-10px)';
                
                // Force layout recalculation
                stepsContainer.offsetHeight;
                
                // Update UI state
                stepsContainer.classList.add('visible');
                this.textContent = 'Hide Steps';
                this.classList.remove('btn--outline');
                this.classList.add('btn--primary');
                
                // Animate in with requestAnimationFrame for better performance
                requestAnimationFrame(() => {
                    stepsContainer.style.opacity = '1';
                    stepsContainer.style.transform = 'translateY(0)';
                    
                    // Smooth scroll once visible
                    setTimeout(() => {
                        stepsContainer.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'nearest' 
                        });
                    }, 100);
                });
            }
        });
    });
});

// Add the missing search functionality
function initSearch() {
    // Create search container
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    
    // Create search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'form-control search-input';
    searchInput.placeholder = 'Search for verification tips...';
    searchInput.setAttribute('aria-label', 'Search verification methods');
    
    // Add search icon
    const searchIcon = document.createElement('span');
    searchIcon.className = 'search-icon';
    searchIcon.innerHTML = '🔍';
    
    // Build search component
    searchContainer.appendChild(searchIcon);
    searchContainer.appendChild(searchInput);
    
    // Insert after header
    const header = document.querySelector('.header');
    if (header && header.nextSibling) {
        header.parentNode.insertBefore(searchContainer, header.nextSibling);
    }
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm.length < 2) {
            resetSearchResults();
            return;
        }
        
        // Search in method titles and descriptions
        const methodCards = document.querySelectorAll('.method-card');
        let hasResults = false;
        
        methodCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';
            const steps = Array.from(card.querySelectorAll('.steps-list li'))
                .map(li => li.textContent.toLowerCase())
                .join(' ');
            
            const content = title + ' ' + description + ' ' + steps;
            
            if (content.includes(searchTerm)) {
                card.style.display = 'block';
                card.classList.add('search-highlight');
                hasResults = true;
            } else {
                card.style.display = 'none';
                card.classList.remove('search-highlight');
            }
        });
        
        // Search in FAQs
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question span').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
                item.classList.add('search-highlight');
                
                // Automatically open FAQ items that match search terms
                const faqId = item.querySelector('.faq-question').getAttribute('data-faq');
                const answerElement = document.getElementById(faqId);
                const icon = item.querySelector('.faq-icon');
                
                answerElement.style.display = 'block';
                answerElement.classList.add('open');
                icon.classList.add('rotate');
                icon.textContent = '×';
                
                hasResults = true;
            } else {
                item.style.display = 'none';
                item.classList.remove('search-highlight');
            }
        });
        
        // Show message if no results
        showSearchResults(hasResults);
    });
    
    // Add clear button and reset functionality
    const clearBtn = document.createElement('button');
    clearBtn.className = 'search-clear';
    clearBtn.innerHTML = '×';
    clearBtn.setAttribute('aria-label', 'Clear search');
    clearBtn.style.display = 'none';
    searchContainer.appendChild(clearBtn);
    
    searchInput.addEventListener('input', function() {
        clearBtn.style.display = this.value ? 'block' : 'none';
    });
    
    clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        resetSearchResults();
        this.style.display = 'none';
        searchInput.focus();
        
        // Ensure all FAQ answers are hidden after clearing search
        const faqAnswers = document.querySelectorAll('.faq-answer');
        faqAnswers.forEach(answer => {
            answer.style.display = 'none';
            answer.classList.remove('open');
        });
        
        // Reset all FAQ icons
        document.querySelectorAll('.faq-icon').forEach(icon => {
            icon.textContent = '+';
            icon.classList.remove('rotate');
        });
    });
    
    function resetSearchResults() {
        // Show all method cards
        const methodCards = document.querySelectorAll('.method-card');
        methodCards.forEach(card => {
            card.style.display = 'block';
            card.classList.remove('search-highlight');
        });
        
        // Show all FAQ items
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            item.style.display = 'block';
            item.classList.remove('search-highlight');
        });
        
        // Hide no results message
        const noResults = document.querySelector('.no-results');
        if (noResults) noResults.remove();
    }
    
    function showSearchResults(hasResults) {
        // Remove existing no results message
        const existingNoResults = document.querySelector('.no-results');
        if (existingNoResults) existingNoResults.remove();
        
        // Show no results message if needed
        if (!hasResults) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No verification methods found. Try different keywords.';
            
            // Add a button to reset search
            const resetBtn = document.createElement('button');
            resetBtn.className = 'btn btn--secondary btn--sm';
            resetBtn.textContent = 'Reset Search';
            resetBtn.addEventListener('click', function() {
                searchInput.value = '';
                resetSearchResults();
                clearBtn.style.display = 'none';
            });
            
            noResults.appendChild(document.createElement('br'));
            noResults.appendChild(resetBtn);
            
            // Add to the container
            const container = document.querySelector('.verification-methods') || document.querySelector('.section');
            container.appendChild(noResults);
        }
    }
}    // Add this to the end of the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Force FAQ initialization with a slight delay to ensure DOM is fully loaded
    setTimeout(() => {
        // Make sure FAQ items are properly initialized
        const faqAnswers = document.querySelectorAll('.faq-answer');
        faqAnswers.forEach(answer => {
            answer.style.display = 'none';
        });
        
        // Add click event listeners for debugging
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', function() {
                console.log('FAQ clicked:', this.getAttribute('data-faq'));
            });
        });
        
        // Ensure the back-to-top and theme buttons are properly initialized
        addScrollToTop();
        initThemeSwitcher();
        
        // Force check initial scroll position right away
        if (window.pageYOffset > 300) {
            const scrollBtn = document.getElementById('back-to-top');
            if (scrollBtn) scrollBtn.style.display = 'flex';
        }
        
        console.log('FAQ initialization complete');
    }, 100);
});

// Add animation to household rules cards
function animateHouseholdRules() {
    const ruleCards = document.querySelectorAll('.rule-card');
    
    ruleCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.7s cubic-bezier(0.165, 0.84, 0.44, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (index * 200));
    });
    
    const rulesHeader = document.querySelector('.household-rules h3');
    if (rulesHeader) {
        rulesHeader.style.opacity = '0';
        rulesHeader.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            rulesHeader.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
            rulesHeader.style.opacity = '1';
            rulesHeader.style.transform = 'translateY(0)';
        }, 200);
    }
}

// Initialize the animations when the section becomes visible
document.addEventListener('DOMContentLoaded', function() {
    // Set up intersection observer for household rules section
    const rulesSection = document.querySelector('.household-rules');
    if (rulesSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateHouseholdRules();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(rulesSection);
    }
});

// Add debug function for step toggling
function logDebug(message, data) {
  console.log(`[DEBUG] ${message}`, data);
}

// Add this to the end of the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
  // Add click event logging to view steps buttons
  document.querySelectorAll('.view-steps-btn').forEach(btn => {
    const method = btn.getAttribute('data-method');
    const stepsContainer = document.getElementById(`${method}-steps`);
    
    logDebug(`View Steps Button found for ${method}`, {
      button: btn,
      stepsContainer: stepsContainer,
      stepsContainerId: `${method}-steps`
    });
    
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      logDebug(`View Steps Button clicked for ${method}`, { 
        isVisible: window.getComputedStyle(stepsContainer).display !== 'none',
        display: window.getComputedStyle(stepsContainer).display
      });
    });
  });
});