document.addEventListener('DOMContentLoaded', function() {

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all scroll animation elements
    const scrollAnimationElements = document.querySelectorAll('.scroll-animation');
    scrollAnimationElements.forEach(element => {
        observer.observe(element);
    });

    // Lightbox Gallery Functionality
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    const captionText = document.getElementById('caption');

    if (galleryItems.length > 0 && lightbox && lightboxImg && closeLightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                lightbox.style.display = 'flex'; // Use flex to help with centering
                lightboxImg.src = this.dataset.full;
                if (captionText) {
                    captionText.innerHTML = this.alt;
                }
            });
        });

        closeLightbox.addEventListener('click', function() {
            lightbox.style.display = 'none';
            lightboxImg.src = ''; // Clear image source
            if (captionText) {
                captionText.innerHTML = '';
            }
        });

        // Close lightbox when clicking outside the image (on the background)
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) { // Check if the click is directly on the lightbox background
                lightbox.style.display = 'none';
                lightboxImg.src = '';
                if (captionText) {
                    captionText.innerHTML = '';
                }
            }
        });
    }

    // Formspree Contact Form Handler
    const consultationForm = document.getElementById('consultation-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = consultationForm ? consultationForm.querySelector('.submit-btn') : null;

    if (consultationForm && formStatus && submitBtn) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            formStatus.style.display = 'none';
            
            // Get form data
            const formData = new FormData(consultationForm);
            
            // Submit to Formspree
            fetch(consultationForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                // Success
                formStatus.textContent = 'Thank you for your message! We will get back to you within 24 hours.';
                formStatus.className = 'form-status success';
                formStatus.style.display = 'block';
                consultationForm.reset();
                
                // Scroll to status message
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
            })
            .catch(error => {
                // Error
                console.error('Form submission error:', error);
                formStatus.textContent = 'Sorry, there was an error submitting your request. Please try again or contact us directly at (250) 818-5611.';
                formStatus.className = 'form-status error';
                formStatus.style.display = 'block';
                
                // Scroll to status message
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
            })
            .finally(() => {
                // Reset button state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
                // Hide status message after 8 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 8000);
            });
        });
        
        // Real-time validation feedback
        const requiredFields = consultationForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
        
        function validateField(field) {
            const value = field.value.trim();
            const fieldType = field.type;
            const fieldName = field.name;
            
            // Remove existing error styling
            field.classList.remove('error');
            
            // Check if required field is empty
            if (field.hasAttribute('required') && value === '') {
                field.classList.add('error');
                return false;
            }
            
            // Email validation
            if (fieldType === 'email' && value !== '') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    field.classList.add('error');
                    return false;
                }
            }
            
            return true;
        }
    }

    // Basic Contact Form Handler (for static site - keeping for compatibility)
    const contactForm = document.getElementById('contact-form');
    const oldFormStatus = document.getElementById('form-status');

    if (contactForm && oldFormStatus && !consultationForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission
            
            // Basic validation example (can be expanded)
            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const message = contactForm.querySelector('#message').value.trim();

            if (name === '' || email === '' || message === '') {
                oldFormStatus.textContent = 'Please fill in all required fields (Name, Email, Message).';
                oldFormStatus.style.color = 'red';
                return;
            }
            
            // Simulate form submission
            oldFormStatus.textContent = 'Thank you for your message! We will get back to you soon.';
            oldFormStatus.style.color = '#2E7D32'; // Green for success
            contactForm.reset(); // Clear the form fields

            // Optional: Hide message after a few seconds
            setTimeout(() => {
                oldFormStatus.textContent = '';
            }, 5000);
        });
    }

}); 