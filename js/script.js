document.addEventListener('DOMContentLoaded', function() {

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

    // Basic Contact Form Handler (for static site)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission
            
            // Basic validation example (can be expanded)
            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const message = contactForm.querySelector('#message').value.trim();

            if (name === '' || email === '' || message === '') {
                formStatus.textContent = 'Please fill in all required fields (Name, Email, Message).';
                formStatus.style.color = 'red';
                return;
            }
            
            // Simulate form submission
            formStatus.textContent = 'Thank you for your message! We will get back to you soon.';
            formStatus.style.color = '#2E7D32'; // Green for success
            contactForm.reset(); // Clear the form fields

            // Optional: Hide message after a few seconds
            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        });
    }

}); 