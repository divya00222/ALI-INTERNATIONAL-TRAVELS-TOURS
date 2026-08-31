/**
 * ALI INTERNATIONAL TRAVELS & TOURS
 * Brand Identity: MdRajAullah Ali Communication
 * Location: Rajbiraj, Saptari, Nepal
 * Primary Contact: +977 9801551011 / +977 9804740282
 * Vanilla JavaScript Engine (Pure Static / Zero Dependencies)
 */

(function () {
  'use strict';

  /**
   * Helper for error-isolated initialization
   */
  function safeInit(fn, name) {
    try {
      fn();
    } catch (err) {
      console.warn('[Ali Travels] Warning initializing ' + name + ':', err);
    }
  }

  /**
   * 2. Sticky Header & Back to Top Controller
   */
  function initHeaderAndScroll() {
    const siteHeader = document.getElementById('siteHeader');
    const backToTopBtn = document.getElementById('backToTopBtn');

    function onScroll() {
      const scrollY = window.scrollY || window.pageYOffset || 0;

      if (siteHeader) {
        if (scrollY > 50) {
          siteHeader.classList.add('scrolled');
        } else {
          siteHeader.classList.remove('scrolled');
        }
      }

      if (backToTopBtn) {
        if (scrollY > 350) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /**
   * 3. Mobile Navigation Drawer Controller
   */
  function initMobileNav() {
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const mobileNavDrawer = document.getElementById('mobileNavDrawer');
    const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
    const mobileDrawerClose = document.getElementById('mobileDrawerClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function openMobileNav() {
      if (mobileNavDrawer) mobileNavDrawer.classList.add('open');
      if (mobileNavBackdrop) mobileNavBackdrop.classList.add('open');
      if (menuToggleBtn) {
        menuToggleBtn.classList.add('active');
        menuToggleBtn.setAttribute('aria-expanded', 'true');
      }
      document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
      if (mobileNavDrawer) mobileNavDrawer.classList.remove('open');
      if (mobileNavBackdrop) mobileNavBackdrop.classList.remove('open');
      if (menuToggleBtn) {
        menuToggleBtn.classList.remove('active');
        menuToggleBtn.setAttribute('aria-expanded', 'false');
      }
      document.body.style.overflow = '';
    }

    if (menuToggleBtn) {
      menuToggleBtn.addEventListener('click', function () {
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

    mobileNavLinks.forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeMobileNav();
      }
    });
  }

  /**
   * 4. Active Navigation Highlighting on Scroll
   */
  function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    function onScrollNav() {
      const scrollPosition = (window.scrollY || window.pageYOffset || 0) + 140;

      sections.forEach(function (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', onScrollNav, { passive: true });
    onScrollNav();
  }

  /**
   * 5. Scroll Reveal Animations (Safe, Non-blocking)
   */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    revealElements.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  /**
   * 6. Statistics Counter Animation
   */
  function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    let animatedStats = false;

    function animateCounters() {
      statNumbers.forEach(function (counter) {
        const target = parseFloat(counter.getAttribute('data-target') || '0');
        const suffix = counter.getAttribute('data-suffix') || '';
        const isDecimal = target % 1 !== 0;
        const duration = 1600;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentValue = isDecimal
            ? (easeProgress * target).toFixed(1)
            : Math.floor(easeProgress * target);

          counter.textContent = currentValue + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
          }
        }

        requestAnimationFrame(updateCounter);
      });
    }

    const statsSection = document.getElementById('statsSection');
    if (statsSection && 'IntersectionObserver' in window) {
      const statsObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !animatedStats) {
            animatedStats = true;
            animateCounters();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      statsObserver.observe(statsSection);
    } else {
      animateCounters();
    }
  }

  /**
   * 7. Interactive Service Modals
   */
  function initServiceModals() {
    const serviceDetails = {
      passport: {
        title: 'Passport Assistance',
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
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalServiceTitle = document.getElementById('modalServiceTitle');
    const modalServiceDesc = document.getElementById('modalServiceDesc');
    const modalReqList = document.getElementById('modalReqList');
    const modalProcessList = document.getElementById('modalProcessList');
    const modalWhatsappCta = document.getElementById('modalWhatsappCta');

    function openModal(key) {
      const data = serviceDetails[key];
      if (!data) return;

      if (modalServiceTitle) modalServiceTitle.textContent = data.title;
      if (modalServiceDesc) modalServiceDesc.textContent = data.desc;

      if (modalReqList) {
        modalReqList.innerHTML = '';
        data.requirements.forEach(function (req) {
          const li = document.createElement('li');
          li.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> ' + req;
          modalReqList.appendChild(li);
        });
      }

      if (modalProcessList) {
        modalProcessList.innerHTML = '';
        data.process.forEach(function (step) {
          const li = document.createElement('li');
          li.textContent = step;
          modalProcessList.appendChild(li);
        });
      }

      if (modalWhatsappCta) {
        const encodedMsg = encodeURIComponent('Hello Ali International Travels & Tours, I would like to enquire about assistance with: ' + data.title + '. Please guide me with the latest requirements.');
        modalWhatsappCta.href = 'https://wa.me/9779801551011?text=' + encodedMsg;
      }

      if (serviceModalOverlay) {
        serviceModalOverlay.classList.add('open');
        serviceModalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeModal() {
      if (serviceModalOverlay) {
        serviceModalOverlay.classList.remove('open');
        serviceModalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    }

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }

    if (serviceModalOverlay) {
      serviceModalOverlay.addEventListener('click', function (e) {
        if (e.target === serviceModalOverlay) {
          closeModal();
        }
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    });

    const serviceTriggers = document.querySelectorAll('[data-service-key]');
    serviceTriggers.forEach(function (el) {
      el.addEventListener('click', function (e) {
        const key = el.getAttribute('data-service-key');
        if (key && serviceDetails[key]) {
          e.preventDefault();
          openModal(key);
        }
      });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          const key = el.getAttribute('data-service-key');
          if (key && serviceDetails[key]) {
            e.preventDefault();
            openModal(key);
          }
        }
      });
    });
  }

  /**
   * 8. Travel Destinations Filter
   */
  function initDestinationFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const destinationCards = document.querySelectorAll('.destination-card');

    if (!filterBtns.length || !destinationCards.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        destinationCards.forEach(function (card) {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            setTimeout(function () {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 30);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(function () {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });

    const destinationExploreBtns = document.querySelectorAll('.destination-explore-btn');
    destinationExploreBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const destName = btn.getAttribute('data-destination') || 'Travel Services';
        const msg = encodeURIComponent('Hello Ali International Travels & Tours, I am interested in travel assistance and ticket booking for: ' + destName + '. Please share details and pricing.');
        window.open('https://wa.me/9779801551011?text=' + msg, '_blank');
      });
    });
  }

  /**
   * 9. Testimonials Carousel Slider
   */
  function initTestimonialCarousel() {
    const testimonialTrack = document.getElementById('testimonialTrack');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevTestimonialBtn = document.getElementById('prevTestimonialBtn');
    const nextTestimonialBtn = document.getElementById('nextTestimonialBtn');
    const carouselDotsContainer = document.getElementById('carouselDots');

    if (!testimonialTrack || !testimonialSlides.length) return;

    let currentSlide = 0;
    const totalSlides = testimonialSlides.length;
    let autoSlideTimer = null;

    if (carouselDotsContainer) {
      carouselDotsContainer.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        dot.setAttribute('aria-label', 'Go to testimonial slide ' + (i + 1));
        if (i === 0) dot.classList.add('active');
        (function (index) {
          dot.addEventListener('click', function () {
            goToSlide(index);
            resetAutoSlide();
          });
        })(i);
        carouselDotsContainer.appendChild(dot);
      }
    }

    function updateSlidePosition() {
      testimonialTrack.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
      const dots = document.querySelectorAll('.carousel-dot');
      dots.forEach(function (d, idx) {
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
      nextTestimonialBtn.addEventListener('click', function () {
        nextSlide();
        resetAutoSlide();
      });
    }

    if (prevTestimonialBtn) {
      prevTestimonialBtn.addEventListener('click', function () {
        prevSlide();
        resetAutoSlide();
      });
    }

    function startAutoSlide() {
      stopAutoSlide();
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
    testimonialTrack.addEventListener('touchstart', function (e) {
      if (e.changedTouches && e.changedTouches[0]) {
        touchStartX = e.changedTouches[0].screenX;
      }
    }, { passive: true });

    testimonialTrack.addEventListener('touchend', function (e) {
      if (e.changedTouches && e.changedTouches[0]) {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
          nextSlide();
          resetAutoSlide();
        } else if (touchEndX - touchStartX > 50) {
          prevSlide();
          resetAutoSlide();
        }
      }
    }, { passive: true });

    startAutoSlide();
  }

  /**
   * 10. FAQ Accordion Controller
   */
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(function (item) {
      const questionBtn = item.querySelector('.faq-question-btn');
      const answerPane = item.querySelector('.faq-answer-pane');

      if (questionBtn && answerPane) {
        questionBtn.addEventListener('click', function () {
          const isActive = item.classList.contains('active');

          faqItems.forEach(function (otherItem) {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
              const otherBtn = otherItem.querySelector('.faq-question-btn');
              if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
              const otherPane = otherItem.querySelector('.faq-answer-pane');
              if (otherPane) otherPane.style.maxHeight = null;
            }
          });

          if (!isActive) {
            item.classList.add('active');
            questionBtn.setAttribute('aria-expanded', 'true');
            answerPane.style.maxHeight = answerPane.scrollHeight + 'px';
          } else {
            item.classList.remove('active');
            questionBtn.setAttribute('aria-expanded', 'false');
            answerPane.style.maxHeight = null;
          }
        });
      }
    });

    // Expand the first FAQ by default
    const firstItem = faqItems[0];
    if (firstItem) {
      const firstBtn = firstItem.querySelector('.faq-question-btn');
      const firstPane = firstItem.querySelector('.faq-answer-pane');
      firstItem.classList.add('active');
      if (firstBtn) firstBtn.setAttribute('aria-expanded', 'true');
      if (firstPane) firstPane.style.maxHeight = firstPane.scrollHeight + 'px';
    }
  }

  /**
   * 11. Toast Notifications Helper
   */
  function showToast(title, message, type) {
    type = type || 'success';
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.innerHTML =
      '<div class="toast-icon ' + type + '">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
          '<polyline points="20 6 9 17 4 12"/>' +
        '</svg>' +
      '</div>' +
      '<div class="toast-content">' +
        '<h5>' + title + '</h5>' +
        '<p>' + message + '</p>' +
      '</div>';

    container.appendChild(toast);

    setTimeout(function () {
      toast.classList.add('show');
    }, 20);

    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 400);
    }, 4500);
  }

  /**
   * 12. Contact Form & WhatsApp Generator
   */
  function initContactForm() {
    const enquiryForm = document.getElementById('enquiryForm');
    if (!enquiryForm) return;

    enquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('fullName');
      const phoneInput = document.getElementById('phoneNumber');
      const serviceSelect = document.getElementById('serviceRequired');
      const messageInput = document.getElementById('enquiryMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const service = serviceSelect ? serviceSelect.value : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name) {
        showToast('Required Field', 'Please enter your full name.', 'error');
        if (nameInput) nameInput.focus();
        return;
      }

      if (!phone || phone.length < 7) {
        showToast('Valid Phone Required', 'Please enter a valid contact phone number.', 'error');
        if (phoneInput) phoneInput.focus();
        return;
      }

      if (!service) {
        showToast('Service Selection', 'Please select a service required.', 'error');
        if (serviceSelect) serviceSelect.focus();
        return;
      }

      const formattedWhatsAppMessage =
        'Hello Ali International Travels & Tours,\n' +
        'My name is: ' + name + '\n' +
        'Phone: ' + phone + '\n' +
        'Service Required: ' + service + '\n' +
        'Message / Details: ' + (message || 'Please provide information and guided support.');

      const encodedURL = 'https://wa.me/9779801551011?text=' + encodeURIComponent(formattedWhatsAppMessage);

      showToast('Enquiry Ready', 'Redirecting to WhatsApp to send your enquiry directly to our team...', 'success');

      enquiryForm.reset();

      setTimeout(function () {
        window.open(encodedURL, '_blank');
      }, 700);
    });
  }

  /**
   * 13. Smooth Scrolling for Internal Anchor Links
   */
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 76;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + (window.pageYOffset || window.scrollY || 0) - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * Main Initialization Routine
   */
  function initAll() {
    safeInit(initHeaderAndScroll, 'HeaderAndScroll');
    safeInit(initMobileNav, 'MobileNav');
    safeInit(initNavHighlight, 'NavHighlight');
    safeInit(initScrollReveal, 'ScrollReveal');
    safeInit(initCounters, 'Counters');
    safeInit(initServiceModals, 'ServiceModals');
    safeInit(initDestinationFilters, 'DestinationFilters');
    safeInit(initTestimonialCarousel, 'TestimonialCarousel');
    safeInit(initFaqAccordion, 'FaqAccordion');
    safeInit(initContactForm, 'ContactForm');
    safeInit(initSmoothScroll, 'SmoothScroll');
  }

  // Execute on DOMContentLoaded or immediately if DOM is already ready
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initAll();
  } else {
    document.addEventListener('DOMContentLoaded', initAll);
  }

})();
