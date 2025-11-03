// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    console.log('Phoenix HSC NEBOSH Courses Clone - Ready!');

    // Filter functionality
    initializeFilters();

    // FAQ accordion functionality
    initializeFAQ();

    // Smooth scrolling for anchor links
    initializeSmoothScroll();
});

// Filter tabs functionality
function initializeFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const courseCards = document.querySelectorAll('.course-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');

            // Get filter value
            const filterValue = this.getAttribute('data-filter');

            // Show/hide courses based on filter
            // Note: In a real implementation, you would filter based on actual data attributes
            // For this clone, all courses remain visible as we don't have the filter data
            courseCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    // In a real scenario, you'd check card's data attributes
                    card.style.display = 'block';
                }
            });
        });
    });
}

// FAQ accordion functionality
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for valid anchor links
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Add hover effects for course cards
const courseCards = document.querySelectorAll('.course-card');
courseCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Search functionality (basic implementation)
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const courseCards = document.querySelectorAll('.course-card');

        courseCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.course-description');
            const descText = description ? description.textContent.toLowerCase() : '';

            if (title.includes(searchTerm) || descText.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Mobile menu toggle (placeholder for future implementation)
const menuToggle = document.querySelector('.menu-toggle');
if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('active');
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe course cards for animation
document.querySelectorAll('.course-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});