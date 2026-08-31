/**
 * ALI INTERNATIONAL TRAVELS & TOURS
 * Brand Identity: MdRajAullah Ali Communication
 * Location: Rajbiraj, Saptari, Nepal
 * Primary Contact: +977 9801551011 / +977 9804740282
 * Vanilla JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- 1. Page Loader Dismissal ---
  const pageLoader = document.getElementById('pageLoader');
  if (pageLoader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        pageLoader.classList.add('hidden');
      }, 350);
    });
    // Fallback if load already fired
    setTimeout(() => {
      if (!pageLoader.classList.contains('hidden')) {
        pageLoader.classList.add('hidden');
      }
    }, 1500);
  }

  // --- 2. Sticky Navbar & Header Scroll Effect ---
  const siteHeader = document.getElementById('siteHeader');
  const backToTopBtn = document.getElementById('backToTopBtn');

  function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;

    if (siteHeader) {
      if (scrollY > 50) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 3. Mobile Navigation Drawer ---
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileNav() {
    if (mobileNavDrawer && mobileNavBackdrop && menuToggleBtn) {
      mobileNavDrawer.classList.add('open');
      mobileNavBackdrop.classList.add('open');
      menuToggleBtn.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileNav() {
    if (mobileNavDrawer && mobileNavBackdrop && menuToggleBtn) {
      mobileNavDrawer.classList.remove('open');
      mobileNavBackdrop.classList.remove('open');
      menuToggleBtn.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', () => {
      if (mobileNavDrawer && mobileNavDrawer.classList.contains('open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', closeMobileNav);
  }

  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', closeMobileNav);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileNav();
      closeServiceModal();
    }
  });

  // --- 4. Active Navigation Highlighting on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightActiveNav() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav, { passive: true });

  // --- 5. Scroll Reveal Animations (IntersectionObserver) ---
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // --- 6. Animated Statistics Counters ---
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  function animateCounters() {
    statNumbers.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target') || '0');
      const suffix = counter.getAttribute('data-suffix') || '';
      const isDecimal = target % 1 !== 0;
      const duration = 1800;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        // easeOutExpo
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentValue = isDecimal 
          ? (easeProgress * target).toFixed(1)
          : Math.floor(easeProgress * target);

        counter.textContent = `${currentValue}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = `${isDecimal ? target.toFixed(1) : target}${suffix}`;
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  const statsSection = document.getElementById('statsSection');
  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animatedStats = true;
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(statsSection);
  } else {
    animateCounters();
  }

  // --- 7. Service Modal Data & Interactive Handlers ---
  const serviceDetails = {
    passport: {
      title: 'Passport Assistance',
      icon: 'passport',
      desc: 'Complete guided support for online e-Passport pre-enrollment applications, document verification, appointment scheduling, and procedural guidelines.',
      requirements: [
        'National ID (NID) Card or Verified NID Number',
        'Nepali Citizenship Certificate (Original & Copy)',
        'Old Passport details (if renewal / lost passport)',
        'Marriage Certificate (if applicable)',
        'Recent digital passport-standard photograph'
      ],
      process: [
        '1. Information review & document verification at our center',
        '2. Online e-Passport application submission & appointment selection',
        '3. Biometric appointment preparation & barcode slip printing',
        '4. Guidance for visiting the District Administration Office (DAO) / Department of Passports'
      ]
    },
    nationalId: {
      title: 'National ID Online Services',
      icon: 'id-card',
      desc: 'Assistance with online biometric pre-registration for the National Identity Card (Rastriya Parichayapatra) and verification assistance.',
      requirements: [
        'Original Nepali Citizenship Certificate',
        'Parents & Grandparents citizenship / identification details',
        'Marriage certificate & Spouse details (for married applicants)',
        'Active mobile phone number for SMS verification'
      ],
      process: [
        '1. Collection of personal & family demographic data',
        '2. Online pre-enrollment form submission',
        '3. Slot confirmation & printout of the registration token slip',
        '4. Instructions for biometric submission at designated local center'
      ]
    },
    policeReport: {
      title: 'Police Report Online Assistance',
      icon: 'shield',
      desc: 'Online application assistance for Nepal Police Clearance Certificate (Police Report) required for foreign employment, study abroad, and travel.',
      requirements: [
        'Clear scan/copy of valid Passport (data page)',
        'Citizenship Certificate copy (both sides)',
        'Passport-sized photograph (plain background)',
        'Marriage certificate (for married female applicants if name change)'
      ],
      process: [
        '1. Verification of identity documents & travel purpose',
        '2. Submission of the electronic Police Clearance Report application',
        '3. Online tracking and status monitoring',
        '4. Download & verified printout upon clearance issuance'
      ]
    },
    visa: {
      title: 'Visa Checking & Assistance',
      icon: 'file-check',
      desc: 'Assistance with tourist, business, visit, and employment visa verification, online visa checking portals, requirement compilation, and documentation.',
      requirements: [
        'Valid Passport (minimum 6 months validity)',
        'Destination country visa application requirements & photographs',
        'Sponsorship / Invitation / Employment letter (if applicable)',
        'Travel itinerary & financial support documentation'
      ],
      process: [
        '1. Consultation on destination-specific visa prerequisites',
        '2. Electronic visa verification or portal form submission',
        '3. Document review & checklist validation',
        '4. Ongoing status inquiry and dispatch guidance'
      ]
    },
    airTickets: {
      title: 'Air Ticket Booking & Confirmation',
      icon: 'plane',
      desc: 'Domestic & International flight booking, seat selection, itinerary planning, date changes, web check-in assistance, and ticket re-confirmation.',
      requirements: [
        'Passenger full name as displayed on Passport / Citizenship',
        'Travel dates and destination routes',
        'Valid Passport details for international flights',
        'Contact phone number and email address'
      ],
      process: [
        '1. Flight schedule inquiry & competitive fare comparison',
        '2. Route and airline selection with baggage confirmation',
        '3. Ticket issuance, PNR confirmation & electronic receipt generation',
        '4. Pre-departure web check-in and advisory support'
      ]
    },
    travelTours: {
      title: 'Domestic & International Travel Assistance',
      icon: 'map-pin',
      desc: 'Tailored travel planning, hotel reservations, airport transfer guidance, holiday tour packages across Nepal and international destinations.',
      requirements: [
        'Traveler details and group size',
        'Preferred destinations & travel dates',
        'Budget and accommodation preferences'
      ],
      process: [
        '1. Personalized itinerary formulation and budget estimation',
        '2. Transport, hotel, and guided excursion bookings',
        '3. Complete itinerary voucher delivery',
        '4. Dedicated support throughout your journey'
      ]
    },
    billPayments: {
      title: 'Digital Utility Bill Payments',
      icon: 'receipt',
      desc: 'Instant, secure payment assistance for Electricity (NEA), Nepal Telecom / Ncell, High-Speed Internet (WorldLink, Vianet, ClassicTech, DishHome, etc.), and TV bills.',
      requirements: [
        'Customer ID / Account Number / SC Number',
        'Counter Name (for Electricity / Water)',
        'Registered phone or subscriber account details'
      ],
      process: [
        '1. Inquiry and account statement lookup',
        '2. Real-time digital bill settlement',
        '3. Official printed receipt and confirmation transaction ID'
      ]
    },
    drivingLicense: {
      title: 'Driving License Online Form Assistance',
      icon: 'car',
      desc: 'Assistance with Department of Transport Management (DoTM) online driving license application forms, renewals, category additions, and test exam scheduling.',
      requirements: [
        'Nepali Citizenship Certificate (Original & Copy)',
        'Existing Driving License details (for renewal/category add)',
        'Medical certificate / Blood group detail',
        'Passport-size digital photograph'
      ],
      process: [
        '1. Online system profile setup & category selection',
        '2. Examination center & biometric date selection',
        '3. Applicant application printout with confirmation barcode',
        '4. Pre-test guidance and transport office instructions'
      ]
    },
    moneyTransfer: {
      title: 'Money Transfer Assistance',
      icon: 'banknote',
      desc: 'Convenient assistance for domestic remittance, digital wallet transfers (eSewa, Khalti, ConnectIPS), bank deposits, and international remittance collection guidance.',
      requirements: [
        'Sender / Receiver Government ID verification',
        'Remittance MTCN / Control Number (for payout guidance)',
        'Bank Account Number, Bank Name & Branch'
      ],
      process: [
        '1. Verification of transfer credentials and recipient details',
        '2. Secure digital transaction execution or verification',
        '3. Instant payment acknowledgment receipt'
      ]
    },
    onlineForms: {
      title: 'Public Digital & Online Form Services',
      icon: 'layout',
      desc: 'Comprehensive public digital assistance for Public Service Commission (Lok Sewa Aayog) forms, Teacher Service Commission, college enrollments, and government portals.',
      requirements: [
        'Applicant academic certificates & transcripts',
        'Citizenship Certificate and photograph/signature scans',
        'Specific portal login credentials or advertisement details'
      ],
      process: [
        '1. Digital scanning, resizing and document preparation',
        '2. Accurate online portal data entry and voucher payment',
        '3. Final submission confirmation and admit card generation'
      ]
    }
  };

  const serviceModalOverlay = document.getElementById('serviceModalOverlay');
  const serviceModalDialog = document.getElementById('serviceModalDialog');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalServiceTitle = document.getElementById('modalServiceTitle');
  const modalServiceDesc = document.getElementById('modalServiceDesc');
  const modalReqList = document.getElementById('modalReqList');
  const modalProcessList = document.getElementById('modalProcessList');
  const modalWhatsappCta = document.getElementById('modalWhatsappCta');

  function openServiceModal(serviceKey) {
    const data = serviceDetails[serviceKey];
    if (!data) return;

    if (modalServiceTitle) modalServiceTitle.textContent = data.title;
    if (modalServiceDesc) modalServiceDesc.textContent = data.desc;

    if (modalReqList) {
      modalReqList.innerHTML = '';
      data.requirements.forEach(req => {
        const li = document.createElement('li');
        li.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> ${req}`;
        modalReqList.appendChild(li);
      });
    }

    if (modalProcessList) {
      modalProcessList.innerHTML = '';
      data.process.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        modalProcessList.appendChild(li);
      });
    }

    if (modalWhatsappCta) {
      const encodedMsg = encodeURIComponent(`Hello Ali International Travels & Tours, I would like to enquire about assistance with: ${data.title}. Please guide me with the latest requirements.`);
      modalWhatsappCta.href = `https://wa.me/9779801551011?text=${encodedMsg}`;
    }

    if (serviceModalOverlay) {
      serviceModalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeServiceModal() {
    if (serviceModalOverlay) {
      serviceModalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeServiceModal);
  }

  if (serviceModalOverlay) {
    serviceModalOverlay.addEventListener('click', (e) => {
      if (e.target === serviceModalOverlay) {
        closeServiceModal();
      }
    });
  }

  // Bind service modal triggers (Cards & Dashboard Items)
  const serviceTriggers = document.querySelectorAll('[data-service-key]');
  serviceTriggers.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const key = el.getAttribute('data-service-key');
      if (key) openServiceModal(key);
    });
  });

  // --- 8. Travel Destinations Filter ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const destinationCards = document.querySelectorAll('.destination-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      destinationCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Bind explore button on destination cards to pre-fill WhatsApp message
  const destinationExploreBtns = document.querySelectorAll('.destination-explore-btn');
  destinationExploreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const destName = btn.getAttribute('data-destination') || 'Travel Services';
      const msg = encodeURIComponent(`Hello Ali International Travels & Tours, I am interested in travel assistance and ticket booking for: ${destName}. Please share details and pricing.`);
      window.open(`https://wa.me/9779801551011?text=${msg}`, '_blank');
    });
  });

  // --- 9. Testimonials Carousel ---
  const testimonialTrack = document.getElementById('testimonialTrack');
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const prevTestimonialBtn = document.getElementById('prevTestimonialBtn');
  const nextTestimonialBtn = document.getElementById('nextTestimonialBtn');
  const carouselDotsContainer = document.getElementById('carouselDots');

  let currentSlide = 0;
  const totalSlides = testimonialSlides.length;
  let autoSlideTimer = null;

  if (testimonialTrack && totalSlides > 0) {
    // Generate dots
    if (carouselDotsContainer) {
      carouselDotsContainer.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        dot.setAttribute('aria-label', `Go to testimonial slide ${i + 1}`);
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
          goToSlide(i);
          resetAutoSlide();
        });
        carouselDotsContainer.appendChild(dot);
      }
    }

    function updateSlidePosition() {
      testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      const dots = document.querySelectorAll('.carousel-dot');
      dots.forEach((d, idx) => {
        d.classList.toggle('active', idx === currentSlide);
      });
    }

    function goToSlide(index) {
      currentSlide = (index + totalSlides) % totalSlides;
      updateSlidePosition();
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    if (nextTestimonialBtn) {
      nextTestimonialBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
      });
    }

    if (prevTestimonialBtn) {
      prevTestimonialBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
      });
    }

    function startAutoSlide() {
      autoSlideTimer = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
      if (autoSlideTimer) clearInterval(autoSlideTimer);
    }

    function resetAutoSlide() {
      stopAutoSlide();
      startAutoSlide();
    }

    const carouselWrapper = document.getElementById('testimonialCarouselWrap');
    if (carouselWrapper) {
      carouselWrapper.addEventListener('mouseenter', stopAutoSlide);
      carouselWrapper.addEventListener('mouseleave', startAutoSlide);
    }

    // Touch Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    testimonialTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    testimonialTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        nextSlide();
        resetAutoSlide();
      } else if (touchEndX - touchStartX > 50) {
        prevSlide();
        resetAutoSlide();
      }
    }, { passive: true });

    startAutoSlide();
  }

  // --- 10. FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answerPane = item.querySelector('.faq-answer-pane');

    if (questionBtn && answerPane) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherPane = otherItem.querySelector('.faq-answer-pane');
            if (otherPane) otherPane.style.maxHeight = null;
          }
        });

        // Toggle current
        if (!isActive) {
          item.classList.add('active');
          answerPane.style.maxHeight = answerPane.scrollHeight + 'px';
        } else {
          item.classList.remove('active');
          answerPane.style.maxHeight = null;
        }
      });
    }
  });

  // Open first FAQ item by default
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    const firstPane = firstItem.querySelector('.faq-answer-pane');
    firstItem.classList.add('active');
    if (firstPane) {
      firstPane.style.maxHeight = firstPane.scrollHeight + 'px';
    }
  }

  // --- 11. Toast Notifications System ---
  function showToast(title, message, type = 'success') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.innerHTML = `
      <div class="toast-icon ${type}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <div class="toast-content">
        <h5>${title}</h5>
        <p>${message}</p>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 20);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 4500);
  }

  // --- 12. Contact Form & WhatsApp Generator ---
  const enquiryForm = document.getElementById('enquiryForm');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('fullName');
      const phoneInput = document.getElementById('phoneNumber');
      const serviceSelect = document.getElementById('serviceRequired');
      const messageInput = document.getElementById('enquiryMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const service = serviceSelect ? serviceSelect.value : '';
      const message = messageInput ? messageInput.value.trim() : '';

      // Client-side Validation
      if (!name) {
        showToast('Required Field', 'Please enter your full name.', 'error');
        nameInput?.focus();
        return;
      }

      if (!phone || phone.length < 8) {
        showToast('Valid Phone Required', 'Please enter a valid contact phone number.', 'error');
        phoneInput?.focus();
        return;
      }

      if (!service) {
        showToast('Service Selection', 'Please select a service required.', 'error');
        serviceSelect?.focus();
        return;
      }

      // Generate WhatsApp Formatted Message
      const formattedWhatsAppMessage = 
`Hello Ali International Travels & Tours,
My name is ${name}.
Phone: ${phone}
I need assistance with: ${service}
Message: ${message || 'Please provide information and guided support.'}`;

      const encodedURL = `https://wa.me/9779801551011?text=${encodeURIComponent(formattedWhatsAppMessage)}`;

      // Show confirmation toast
      showToast('Enquiry Ready', 'Redirecting to WhatsApp to send your enquiry directly to our team...', 'success');

      // Reset form
      enquiryForm.reset();

      // Open WhatsApp chat in a new tab
      setTimeout(() => {
        window.open(encodedURL, '_blank');
      }, 800);
    });
  }

  // --- 13. Smooth Scroll for all internal anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});
