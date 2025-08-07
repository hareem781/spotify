// Enhanced JavaScript for Spotify Redesign

// Dark mode toggle functionality - Simplified for instant whole page change
document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      const body = document.body;
      const icon = this.querySelector('i');
      
      // Toggle dark class on body - this will instantly change the whole page
      body.classList.toggle('dark');
      
      // Update icon based on current theme
      if (body.classList.contains('dark')) {
        icon.className = 'fas fa-sun text-white';
      } else {
        icon.className = 'fas fa-moon text-white';
      }
    });
  }
});

// Smooth scrolling for navigation links
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

// Intersection Observer for slide-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('slide-in');
    }
  });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Play button functionality
document.querySelectorAll('.fa-play').forEach(button => {
  button.addEventListener('click', function(e) {
    e.stopPropagation();
    
    // Add pulse animation
    this.classList.add('pulse');
    
    // Simulate play action
    const card = this.closest('.group');
    if (card) {
      const title = card.querySelector('h3')?.textContent || 'Unknown Track';
      updateNowPlaying(title);
    }
    
    // Remove pulse after animation
    setTimeout(() => {
      this.classList.remove('pulse');
    }, 2000);
  });
});

// Update now playing section
function updateNowPlaying(trackName) {
  const nowPlaying = document.querySelector('.fixed.bottom-0 p');
  if (nowPlaying) {
    nowPlaying.textContent = trackName;
  }
}

// Volume control functionality
function createVolumeSlider() {
  const volumeContainer = document.querySelector('.w-24');
  if (volumeContainer) {
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '100';
    slider.value = '50';
    slider.className = 'volume-slider w-full';
    
    slider.addEventListener('input', function() {
      const progress = this.value + '%';
      const progressBar = this.parentElement.querySelector('.bg-white');
      if (progressBar) {
        progressBar.style.width = progress;
      }
    });
    
    volumeContainer.innerHTML = '';
    volumeContainer.appendChild(slider);
  }
}

// Initialize volume slider
document.addEventListener('DOMContentLoaded', createVolumeSlider);

// Search functionality
function initializeSearch() {
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search for songs, artists, or albums...';
  searchInput.className = 'bg-gray-800 text-white px-4 py-2 rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-green-500';
  
  // Add search input to navigation if needed
  const nav = document.querySelector('nav');
  if (nav) {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'mt-4';
    searchContainer.appendChild(searchInput);
    nav.appendChild(searchContainer);
  }
}

// Initialize search
document.addEventListener('DOMContentLoaded', initializeSearch);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // Space bar to play/pause
  if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
    e.preventDefault();
    const playButton = document.querySelector('.fa-play');
    if (playButton) {
      playButton.click();
    }
  }
  
  // Left/Right arrows for previous/next
  if (e.code === 'ArrowLeft') {
    const prevButton = document.querySelector('.fa-step-backward');
    if (prevButton) {
      prevButton.click();
    }
  }
  
  if (e.code === 'ArrowRight') {
    const nextButton = document.querySelector('.fa-step-forward');
    if (nextButton) {
      nextButton.click();
    }
  }
});

// Lazy loading for local images
function lazyLoadImages() {
  const images = document.querySelectorAll('img[src*="assets/images"]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        // Remove skeleton class when image loads
        img.classList.remove('skeleton');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => {
    img.classList.add('skeleton');
    imageObserver.observe(img);
  });
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add hover effects for better UX
document.querySelectorAll('.group').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
});

// Progress bar animation
function animateProgressBar() {
  const progressBar = document.querySelector('.bg-white.h-1');
  if (progressBar) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.1;
      progressBar.style.width = progress + '%';
      
      if (progress >= 100) {
        clearInterval(interval);
        progress = 0;
        progressBar.style.width = '0%';
        animateProgressBar();
      }
    }, 1000);
  }
}

// Start progress bar animation
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(animateProgressBar, 1000);
});

// Add loading states
function addLoadingStates() {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      if (!this.classList.contains('loading')) {
        this.classList.add('loading');
        this.style.opacity = '0.7';
        
        setTimeout(() => {
          this.classList.remove('loading');
          this.style.opacity = '1';
        }, 1000);
      }
    });
  });
}

// Initialize loading states
document.addEventListener('DOMContentLoaded', addLoadingStates);

// Toast notifications
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white z-50 ${
    type === 'success' ? 'bg-green-500' : 'bg-blue-500'
  }`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Add toast for play actions
document.querySelectorAll('.fa-play').forEach(button => {
  button.addEventListener('click', function() {
    const card = this.closest('.group');
    const title = card?.querySelector('h3')?.textContent || 'Track';
    showToast(`Now playing: ${title}`, 'success');
  });
});
