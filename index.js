
// Theme Toggle

const themebtn = document.getElementById('theme-toggle'); // No dot
const body = document.body;

const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'light') {
    body.classList.add('light-theme');
    themebtn.textContent = '☀️';
} else {
    body.classList.remove('light-theme');
    themebtn.textContent = '🌙';
}

themebtn.addEventListener('click', () => {
    body.classList.toggle('light-theme'); // typo fixed
    if (body.classList.contains('light-theme')) {
        themebtn.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    } else {
        themebtn.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }
});

// Mobile Navigation 
const mobileMenu = document.querySelector('.mobile-menu');
const navBtn = document.querySelector('.navbtn'); // Use querySelector for the class
const mobileThemeToggleBtn = document.querySelector('.mobile-theme-toggle-btn');
const mobileHomeBtn = document.getElementById('mobile-homebtn');
const mobileAboutBtn = document.getElementById('mobile-aboutbtn');

// Fixed the typo: addEventListener
if (navBtn) {
    navBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle('active');
    });
}

mobileThemeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-theme'); // typo fixed
    if (body.classList.contains('light-theme')) {
        themebtn.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    } else {
        themebtn.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }
});

mobileAboutBtn.addEventListener('click', () => {
    if (!heroSection.classList.contains('hidden')) { 
        heroSection.classList.add('hidden');
        aboutMeSection.classList.remove('hidden');
        aboutMeSection.classList.add('fade-in');
    }
    else if (!fullBlogPost.classList.contains('hidden')) {
        fullBlogPost.classList.add('hidden');
        aboutMeSection.classList.remove('hidden');
        aboutMeSection.classList.add('fade-in');
    }
});

mobileHomeBtn.addEventListener('click', () => {
    if ((!aboutMeButton.classList.contains('hidden')) || (!fullBlogPost.classList.contains('hidden'))) {
        aboutMeSection.classList.add('hidden');
        fullBlogPost.classList.add('hidden');
        heroSection.classList.remove('hidden');
        heroSection.classList.add('fade-in');
    }
});

// View More Button and Extra Blog Posts

const viewMoreButtons = document.getElementById('view-more-posts');
const extraPosts = document.querySelectorAll('.extra-post');
const blogPosts = document.getElementById('main-blog-posts');
let postsVisible = false;


viewMoreButtons.addEventListener('click', () => {
    if (!postsVisible) {

        extraPosts.forEach((post, index) => {
            setTimeout(() => {
                post.classList.add('sliding-in'); 
                post.offsetWidth;

                post.classList.remove('hidden');
                setTimeout(() => {
                    post.classList.remove('sliding-in');
                }, 300);
            }, index * 100) 
        });

        postsVisible = true;
        setTimeout(() => {
            if (extraPosts.length > 0) {
                extraPosts[0].scrollIntoView({behavior: 'smooth', block: 'start' });
            }
        }, extraPosts.length * 100 + 100);
    } else {

        extraPosts.forEach((post, index) => {
        setTimeout(() => {
            post.classList.add("sliding-out");
            setTimeout(() => {
                post.classList.add('hidden');
                post.classList.remove('sliding-out');
            }, 300);
            }, index * 100);
        });
        postsVisible = false;

        setTimeout(() => {
                blogPosts.scrollIntoView({behavior: 'smooth', block: 'start' });
        }, 600);
    }

    viewMoreButtons.textContent = postsVisible ? "VIew Less" : "View More";
})

// Hero Section

const heroSection = document.getElementById('hero-section');
const fullBlogPost = document.getElementById('blog-1');
const backToHomeButton = document.getElementById('back-to-home');
const homeBtn = document.getElementById('homebtn');
const aboutMeSection = document.getElementById('about-section');
const aboutMeButton = document.getElementById('aboutbtn');

heroSection.addEventListener('click', () => {
    if (!heroSection.classList.contains('hidden')) {
        heroSection.classList.add('hidden');
        fullBlogPost.classList.remove('hidden');
        fullBlogPost.classList.add('fade-in');
    }
});

backToHomeButton.addEventListener('click', () => {
    if (!fullBlogPost.classList.contains('hidden')) {
        fullBlogPost.classList.add('hidden');
        heroSection.classList.remove('hidden');
        heroSection.classList.add('fade-in');
    }
});

aboutMeButton.addEventListener('click', () => {
    if (!heroSection.classList.contains('hidden')) { 
        heroSection.classList.add('hidden');
        aboutMeSection.classList.remove('hidden');
        aboutMeSection.classList.add('fade-in');
    }
    else if (!fullBlogPost.classList.contains('hidden')) {
        fullBlogPost.classList.add('hidden');
        aboutMeSection.classList.remove('hidden');
        aboutMeSection.classList.add('fade-in');
    }
});

homeBtn.addEventListener('click', () => {
    if ((!aboutMeButton.classList.contains('hidden')) || (!fullBlogPost.classList.contains('hidden'))) {
        aboutMeSection.classList.add('hidden');
        fullBlogPost.classList.add('hidden');
        heroSection.classList.remove('hidden');
        heroSection.classList.add('fade-in');
    }
});

/* Footer */

const footer = document.querySelector('footer');
const currentYear = new Date().getFullYear();
footer.innerHTML = 
    `
        <h4>My Learning Journal</h4>
        <p>Copyright ©${currentYear}</p>
    `