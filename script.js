// Dark mode toggle
const toggleButton = document.getElementById("dark-mode-toggle");
toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Update button text based on mode
    if (document.body.classList.contains("dark-mode")) {
        toggleButton.innerHTML = "☀️ Light Mode";
    } else {
        toggleButton.innerHTML = "🌙 Dark Mode";
    }

    // Save preference to localStorage
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

// Check for saved dark mode preference and initialize page
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
        toggleButton.innerHTML = "☀️ Light Mode";
    }

    // Set up smooth scrolling for navigation links
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            // Get the target section id from the href
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            // Smooth scroll to the section
            targetSection.scrollIntoView({ behavior: "smooth" });

            // Update active class
            navLinks.forEach(navLink => navLink.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Set home as active by default on page load
    const setActiveNavOnLoad = () => {
        const homeLink = document.querySelector('.nav-link[href="#home"]');
        if (homeLink) {
            navLinks.forEach(navLink => navLink.classList.remove("active"));
            homeLink.classList.add("active");
        }
    };

    // Call this function with a small delay to ensure proper initialization
    setTimeout(setActiveNavOnLoad, 100);

    // Highlight active section based on scroll position
    const sections = document.querySelectorAll(".section");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Add offset to account for the fixed header
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    // Add animation to stats numbers
    animateStats();
});

// Animate stats numbers
function animateStats() {
    const stats = [
        { id: "projects-count", value: 10 },
        { id: "experience", value: 2 },
        { id: "technologies", value: 10 }
    ];

    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        let count = 0;

        const interval = setInterval(() => {
            if (count >= stat.value) {
                clearInterval(interval);
                element.innerText = count + "+";
            } else {
                count++;
                element.innerText = count + "+";
            }
        }, 200);
    });
}

// Add responsive menu toggle for mobile
const setResponsiveMenu = () => {
    if (window.innerWidth <= 767) {
        const navbar = document.querySelector('.navbar');
        const navContainer = document.querySelector('.nav-container');

        // Check if we already have a menu toggle button
        if (!document.querySelector('.menu-toggle')) {
            // Create menu toggle button
            const menuToggle = document.createElement('button');
            menuToggle.classList.add('menu-toggle');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            navbar.insertBefore(menuToggle, navContainer);

            // Initially hide the nav container on mobile
            navContainer.classList.add('nav-hidden');

            // Toggle menu visibility
            menuToggle.addEventListener('click', () => {
                navContainer.classList.toggle('nav-hidden');
                menuToggle.innerHTML = navContainer.classList.contains('nav-hidden')
                    ? '<i class="fas fa-bars"></i>'
                    : '<i class="fas fa-times"></i>';
            });

            // Hide menu when clicking a nav link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 767) {
                        navContainer.classList.add('nav-hidden');
                        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                });
            });
        }
    } else {
        // Remove menu toggle if screen is resized to desktop
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.remove();
        }

        // Show nav container on desktop
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            navContainer.classList.remove('nav-hidden');
        }
    }
};

// Call on load and resize
window.addEventListener('load', setResponsiveMenu);
window.addEventListener('resize', setResponsiveMenu);


//js for email sent to me 
document.addEventListener("DOMContentLoaded", function() {
  (function(){
    emailjs.init("JSNW18NPSlcYpAwWAsWO9");
  })();

  var form = document.getElementById("contact-form");
  if(form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      emailjs.sendForm('service_kslrfjq', 'template_pnumybr', this)
        .then(function() {
          alert('Message sent! Thank you for contacting me.');
          form.reset();
        }, function(error) {
          alert('Failed to send: ' + JSON.stringify(error));
        });
    });
  } else {
    console.log("Form not found!");
  }
});