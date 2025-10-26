import React, { useEffect, useRef, useState } from 'react';
// import Typed from 'typed.js';
// import { motion, AnimatePresence } from 'motion';
// import { toast, Toaster } from 'sonner';
// import jsPDF from 'jspdf';
import { 
  Home, 
  User, 
  List, 
  Users, 
  Briefcase, 
  MessageSquare, 
  Settings, 
  Sun, 
  Moon, 
  ShoppingBag, 
  Code, 
  Palette, 
  Smartphone, 
  Megaphone, 
  Server, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin, 
  Copy,
  Check,
  Linkedin,
  Twitter,
  Github
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [backSection, setBackSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [styleSwitcherOpen, setStyleSwitcherOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [activeColor, setActiveColor] = useState('color-4');
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'completed'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const typingRef = useRef<HTMLSpanElement>(null);
  // const typedInstance = useRef<Typed | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Simple typing animation without Typed.js
    const typingElement = typingRef.current;
    if (typingElement) {
      const strings = ["Full Stack Developer", "UI/UX Designer", "React Specialist", "Mobile App Developer"];
      let currentStringIndex = 0;
      let currentCharIndex = 0;
      let isDeleting = false;
      let animationId: NodeJS.Timeout;
      
      const typeText = () => {
        const currentString = strings[currentStringIndex];
        
        if (isDeleting) {
          typingElement.textContent = currentString.substring(0, currentCharIndex - 1);
          currentCharIndex--;
        } else {
          typingElement.textContent = currentString.substring(0, currentCharIndex + 1);
          currentCharIndex++;
        }
        
        let typeSpeed = isDeleting ? 150 : 200;
        
        if (!isDeleting && currentCharIndex === currentString.length) {
          typeSpeed = 4000; // Much longer pause at end
          isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
          isDeleting = false;
          currentStringIndex = (currentStringIndex + 1) % strings.length;
          typeSpeed = 1500; // Much longer pause before typing next string
        }
        
        animationId = setTimeout(typeText, typeSpeed);
      };
      
      typeText();
      
      // Cleanup function to clear timeout
    return () => {
        if (animationId) {
          clearTimeout(animationId);
      }
    };
    }
  }, []);

  // Portfolio cursor-following image animation
  useEffect(() => {
    const items = document.querySelectorAll('.list-images__item');
    const imageBox = document.querySelector('.list-images__image-box') as HTMLElement;

    if (!imageBox || items.length === 0) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    // Image Animation
    const animateImage = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      imageBox.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(4deg)`;

      animationFrameId = requestAnimationFrame(animateImage);
    };

    animateImage();

    // Show Image
    const showImage = (e: MouseEvent) => {
      const cursorX = e.clientX;
      const cursorY = e.clientY;

      targetX = cursorX;
      targetY = cursorY;

      let hovered = false;

      items.forEach((item) => {
        const itemPlace = item.getBoundingClientRect();

        const isHovered =
          cursorX >= itemPlace.left &&
          cursorX <= itemPlace.right &&
          cursorY >= itemPlace.top &&
          cursorY <= itemPlace.bottom;

        if (isHovered) {
          const imgUrl = item.getAttribute('data-img');
          const oldImage = imageBox.querySelector('img');

          if (oldImage) oldImage.remove();

          const newImage = document.createElement('img');

          imageBox.appendChild(newImage);
          imageBox.classList.add('active');
          if (imgUrl) newImage.src = imgUrl;

          hovered = true;
        }
      });

      if (!hovered) imageBox.classList.remove('active');
    };

    document.addEventListener('mousemove', showImage);

    return () => {
      document.removeEventListener('mousemove', showImage);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeSection]); // Re-run when section changes

  useEffect(() => {
    // Load Font Awesome dynamically with proper CORS settings
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css';
    link.crossOrigin = 'anonymous';
    link.integrity = 'sha512-Evv42AuqBLVR3OMXBXrI4PW/IEF4KqXWHfYeHt8794l4P1wLGDOqF9BdZ+PCqTLlJfpHHI2w8qGxp/4Zr0tU/UQ==';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    document.body.className = '';
    if (isDark) {
      document.body.classList.add('dark');
    }
    document.body.classList.add(activeColor);
  }, [activeColor, isDark]);

  const handleNavClick = (section: string) => {
    setBackSection(activeSection);
    setActiveSection(section);
    if (window.innerWidth < 1200) {
      setMobileMenuOpen(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const toggleStyleSwitcher = () => {
    setStyleSwitcherOpen(!styleSwitcherOpen);
  };

  const handleColorChange = (color: string) => {
    setActiveColor(color);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    // Get form data
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    
    // Validate all fields
    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields!');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address!');
      return;
    }
    
    // Start loading
    setIsSubmitting(true);
    
    try {
      // Submit to Formcarry using fetch with proper headers
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('subject', subject);
      formData.append('message', message);
      
      const response = await fetch('https://formcarry.com/s/Vh9xj_dDkg1', {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // This prevents CORS issues and redirects
      });

      // Simulate a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Since we're using no-cors mode, we can't read the response
      // But we know the form was submitted, so show success
    setShowThankYou(true);
    
    // Reset form
    if (formRef.current) {
      formRef.current.reset();
    }
    
      // Hide thank you message after 5 seconds
    setTimeout(() => {
      setShowThankYou(false);
      }, 5000);
      
    } catch (error) {
      // Network or other error
      alert('Sorry, there was an error sending your message. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      // Stop loading
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    const email = 'suraj.parkash.mandhan@gmail.com';
    
    try {
      // Use reliable fallback method (works in all environments)
      const textArea = document.createElement('textarea');
      textArea.value = email;
      
      // Make textarea invisible but ensure it's in viewport
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.width = '2em';
      textArea.style.height = '2em';
      textArea.style.padding = '0';
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        alert('Email copied to clipboard!');
      } else {
        throw new Error('Copy command failed');
      }
    } catch (err) {
      console.error('Copy failed:', err);
      // Fallback: Show email in alert for manual copy
      alert('Please copy manually: ' + email);
    }
  };

  const handleDownloadCV = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    
    if (!button.classList.contains('dl-working')) {
      setIsDownloading(true);
      setDownloadStatus('downloading');
      button.classList.add('dl-working');
      
      setTimeout(() => {
        // Open CV template in new window for printing/downloading
        const cvWindow = window.open('/cv-template.html', '_blank');
        if (cvWindow) {
          cvWindow.onload = () => {
            // Wait for fonts to load, then trigger print dialog
            setTimeout(() => {
              cvWindow.print();
            }, 1000);
          };
        }
        
        // Update to Completed at 90% of animation (2.7 seconds)
        setTimeout(() => {
          setDownloadStatus('completed');
        }, 700);
      }, 2000);
      
      // Reset after completed state shows for 3 seconds (2.7s + 3s = 5.7s)
      setTimeout(() => {
        button.classList.remove('dl-working');
        setDownloadStatus('idle');
        setIsDownloading(false);
      }, 5700);
    }
  };

  return (
    <div className="main-container">
      <div className={`aside ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="logo">
          <a href="#"><span>S</span>uraj</a>
        </div>

        <div 
          className={`nav-toggler ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
        </div>

        <ul className="nav">
          <li><a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={() => handleNavClick('home')}><Home />Home</a></li>
          <li><a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={() => handleNavClick('about')}><User />About</a></li>
          <li><a href="#services" className={activeSection === 'services' ? 'active' : ''} onClick={() => handleNavClick('services')}><List />Services</a></li>
          <li><a href="#team" className={activeSection === 'team' ? 'active' : ''} onClick={() => handleNavClick('team')}><Users />Our Team</a></li>
          <li><a href="#portfolio" className={activeSection === 'portfolio' ? 'active' : ''} onClick={() => handleNavClick('portfolio')}><Briefcase />Portfolio</a></li>
          <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={() => handleNavClick('contact')}><MessageSquare />Contact</a></li>
        </ul>
      </div>

      <div className="main-content">
        <section className={`home section ${activeSection === 'home' ? 'active' : ''} ${backSection === 'home' ? 'back-section' : ''} ${mobileMenuOpen ? 'open' : ''}`} id="home">
          <div className="container">
            <div className="row">
              <div className="home-info padd-15">
                <h3 className="hello">Hello, my name is <span className="name">Suraj Parkash</span></h3>
                <h3 className="profession">I'm a <span className="typing" ref={typingRef}></span></h3>
                <p>With over 7+ years of industry experience, I specialize in building high-performance web and mobile applications that combine stunning design with rock-solid functionality. From pixel-perfect UI/UX to scalable full-stack solutions, I transform ideas into powerful digital experiences that drive real results.</p>
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <button 
                  type="button" 
                  data-dl 
                  className={`btn download-btn ${downloadStatus === 'completed' ? 'dl-completed' : ''}`}
                  onClick={handleDownloadCV}
                  disabled={isDownloading}
                >
                  {downloadStatus === 'completed' ? (
                    <Check style={{ width: '20px', height: '20px' }} />
                  ) : (
                    <span className="dl-icon"></span>
                  )}
                  <span style={{ marginLeft: '8px', fontWeight: 600 }}>
                    {downloadStatus === 'idle' && 'Download'}
                    {downloadStatus === 'downloading' && 'Downloading…'}
                    {downloadStatus === 'completed' && 'Completed!'}
                  </span>
                </button>
                  
                  <a 
                    href="https://in.linkedin.com/in/suraj-parkash-mandhan-556a61246" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn linkedin-btn"
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      textDecoration: 'none',
                      backgroundColor: 'transparent',
                      color: '#0077b5',
                      padding: '12px 24px',
                      borderRadius: '40px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      border: '2px solid #0077b5',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#0077b5';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#0077b5';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <Linkedin style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>
              </div>

              <div className="home-img padd-15">
                <img src="/images/My Profile/suraj.png" alt="Suraj Parkash Mandhan" />
              </div>
            </div>
          </div>
        </section>

        <section className={`about section ${activeSection === 'about' ? 'active' : ''} ${backSection === 'about' ? 'back-section' : ''} ${mobileMenuOpen ? 'open' : ''}`} id="about">
          <div className="container">
            <div className="row">
              <div className="section-title padd-15">
                <h2>About me</h2>
              </div>
            </div>

            <div className="row">
              <div className="about-content padd-15">
                <div className="row">
                  <div className="about-text padd-15">
                    <h3>Hi, I'm Suraj — <span>Full Stack Developer & UI/UX Specialist</span></h3>
                    <p>A passionate Full Stack Developer with a unique background in Quality Assurance. My journey from QA to full-stack development has equipped me with a deep understanding of both quality and functionality — ensuring every project I build not only looks exceptional but performs flawlessly.</p>
                    <p>I specialize in UI/UX design and excel at converting any design into pixel-perfect, 100% responsive web and mobile interfaces. Whether it's a small project or a complex, detail-heavy application, I deliver efficiently — often completing designs within a week.</p>
                    <p>Leading a talented team of developers skilled across various technologies, we confidently take on projects of any scale. My focus is simple: clean design, solid functionality, and fast delivery.</p>
                    <p><strong>💡 "I don't just code — I craft seamless digital experiences."</strong></p>
                  </div>
                </div>

                <div className="row">
                  <div className="personal-info padd-15">
                    <div className="row">
                      <div className="info-item padd-15">
                        <p>Birthday: <span>07 Oct 1997</span></p>
                      </div>

                      <div className="info-item padd-15">
                        <p>Age: <span>28</span></p>
                      </div>

                      <div className="info-item padd-15">
                        <p>Country: <span>India</span></p>
                      </div>

                      <div className="info-item padd-15">
                        <p>Email: <span>suraj.parkash.mandhan@gmail.com</span></p>
                      </div>

                      <div className="info-item padd-15">
                        <p>Degree: <span>B.tech</span></p>
                      </div>

                      <div className="info-item padd-15">
                        <p>Phone: <span>+91 906 832 7292</span></p>
                      </div>

                      <div className="info-item padd-15">
                        <p>State: <span>Haryana</span></p>
                      </div>

                      <div className="info-item padd-15">
                        <p>Freelance: <span>Available</span></p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="buttons padd-15">
                        <a href="#contact" className="btn hire-me" onClick={() => handleNavClick('contact')}>Hire me!</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="education padd-15">
                    <h3 className="title">Education</h3>
                    <div className="row">
                      <div className="timeline-box padd-15">
                        <div className="timeline shadow-dark">
                          <div className="timeline-item">
                            <div className="circle-dot"></div>
                            <h3 className="timeline-date">
                              <Calendar className="inline-icon" /> Graduated
                            </h3>
                            <h4 className="timeline-title">Bachelor of Technology - BTech</h4>
                            <p className="timeline-text">Kurukshetra University - Completed comprehensive engineering degree with focus on computer science and technology fundamentals, building strong foundation in programming, software development, and system design.</p>
                          </div>

                          <div className="timeline-item">
                            <div className="circle-dot"></div>
                            <h3 className="timeline-date">
                              <Calendar className="inline-icon" /> 2017 - 2018
                            </h3>
                            <h4 className="timeline-title">Diploma in Computer Application</h4>
                            <p className="timeline-text">KALPANA CHAWLA COMPUTECH PRIVATE LIMITED - Gained hands-on expertise in computer applications, software tools, and practical IT skills essential for modern workplace environments.</p>
                          </div>

                          <div className="timeline-item">
                            <div className="circle-dot"></div>
                            <h3 className="timeline-date">
                              <Calendar className="inline-icon" /> 2016
                            </h3>
                            <h4 className="timeline-title">AutoCAD Professional Training</h4>
                            <p className="timeline-text">Autodesk Certified - Advanced AutoCAD training covering 2D/3D design, technical drawings, and architectural modeling. Enhanced technical design capabilities and precision drafting skills.</p>
                          </div>

                          <div className="timeline-item">
                            <div className="circle-dot"></div>
                            <h3 className="timeline-date">
                              <Calendar className="inline-icon" /> High School
                            </h3>
                            <h4 className="timeline-title">CBSE Board - Non-Medical (12th)</h4>
                            <p className="timeline-text">Completed senior secondary education with focus on Physics, Chemistry, and Mathematics, building strong analytical and problem-solving foundation.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="experience padd-15">
                    <h3 className="title">Experience</h3>
                    <div className="row">
                      <div className="timeline-box padd-15">
                        <div className="timeline shadow-dark">
                          <div className="timeline-item">
                            <div className="circle-dot"></div>
                            <h3 className="timeline-date">
                              <Calendar className="inline-icon" /> Feb 2024 - Present
                            </h3>
                            <h4 className="timeline-title">Senior Quality Assurance Lead</h4>
                            <p className="timeline-text"><strong>Base2Brand Infotech Pvt. Ltd.</strong> - Leading QA strategy and automation initiatives. Architecting comprehensive test frameworks, mentoring QA teams, and ensuring 100% quality delivery across web and mobile applications. Driving CI/CD integration and performance optimization.</p>
                          </div>

                          <div className="timeline-item">
                            <div className="circle-dot"></div>
                            <h3 className="timeline-date">
                              <Calendar className="inline-icon" /> Mar 2023 - Feb 2024
                            </h3>
                            <h4 className="timeline-title">Lead Quality Analyst</h4>
                            <p className="timeline-text"><strong>Henceforth Solutions Pvt Ltd, Sahibzada Ajit Singh Nagar, Punjab</strong> - Spearheaded end-to-end testing strategies for complex applications. Implemented automated testing suites using Selenium and Cypress. Collaborated with cross-functional teams to ensure seamless product releases.</p>
                          </div>

                          <div className="timeline-item">
                            <div className="circle-dot"></div>
                            <h3 className="timeline-date">
                              <Calendar className="inline-icon" /> Sep 2022 - Mar 2023
                            </h3>
                            <h4 className="timeline-title">Sr. Quality Analyst</h4>
                            <p className="timeline-text"><strong>Henceforth Solutions Pvt Ltd</strong> - Managed quality assurance processes for multiple projects simultaneously. Developed detailed test plans, executed comprehensive testing cycles, and improved bug detection rate by 40% through strategic testing approaches.</p>
                          </div>

                          <div className="timeline-item">
                            <div className="circle-dot"></div>
                            <h3 className="timeline-date">
                              <Calendar className="inline-icon" /> Nov 2021 - Aug 2022
                            </h3>
                            <h4 className="timeline-title">Jr. Quality Analyst</h4>
                            <p className="timeline-text"><strong>PROLAB Technologies (CMMI Institute Partner), Chandigarh</strong> - Performed functional, regression, and integration testing. Documented test cases and collaborated with development teams to resolve defects. Gained expertise in Agile methodologies and CMMI standards.</p>
                          </div>

                          <div className="timeline-item">
                            <div className="circle-dot"></div>
                            <h3 className="timeline-date">
                              <Calendar className="inline-icon" /> Jul 2021 - Nov 2021
                            </h3>
                            <h4 className="timeline-title">QA Intern</h4>
                            <p className="timeline-text"><strong>PROLAB Technologies (CMMI Institute Partner)</strong> - Learned software testing fundamentals, participated in test case design, and assisted senior QA engineers in manual testing activities. Built strong foundation in quality assurance principles.</p>
                          </div>

                          <div className="timeline-item">
                            <div className="circle-dot"></div>
                            <h3 className="timeline-date">
                              <Calendar className="inline-icon" /> Jan 2021 - Jun 2021
                            </h3>
                            <h4 className="timeline-title">QA Automation Specialist</h4>
                            <p className="timeline-text"><strong>WebtechLearning - Web Education Academy, Chandigarh</strong> - Developed automated test scripts using industry-standard tools. Focused on web application testing, API testing, and test automation frameworks. Enhanced efficiency through automation-first approach.</p>
                          </div>

                          <div className="timeline-item">
                            <div className="circle-dot"></div>
                            <h3 className="timeline-date">
                              <Calendar className="inline-icon" /> Sep 2020 - Jan 2021
                            </h3>
                            <h4 className="timeline-title">Process Quality Analyst</h4>
                            <p className="timeline-text"><strong>WebtechLearning - Web Education Academy</strong> - Analyzed and improved quality processes, conducted process audits, and implemented best practices for quality assurance. Focused on process optimization and documentation standards.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`service section ${activeSection === 'services' ? 'active' : ''} ${backSection === 'services' ? 'back-section' : ''} ${mobileMenuOpen ? 'open' : ''}`} id="services">
          <div className="container">
            <div className="row">
              <div className="section-title padd-15">
                <h2>Services</h2>
              </div>
            </div>

            <div className="row">
              <div className="service-item padd-15">
                <div className="flip-box">
                  <div className="flip-box-front">
                    <div className="service-item-inner">
                      <div className="icon">
                        <ShoppingBag />
                      </div>
                      <h4>Shopify Development</h4>
                      <p>Custom Shopify store development with theme customization and e-commerce solutions</p>
                    </div>
                  </div>
                  <div className="flip-box-back">
                    <div className="service-item-inner">
                      <h4>Shopify Development</h4>
                      <ul className="service-list">
                        <li><Check /> Custom Theme Development</li>
                        <li><Check /> Shopify App Integration</li>
                        <li><Check /> Payment Gateway Setup</li>
                        <li><Check /> Store Migration</li>
                        <li><Check /> SEO Optimization</li>
                        <li><Check /> Store Maintenance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="service-item padd-15">
                <div className="flip-box">
                  <div className="flip-box-front">
                    <div className="service-item-inner">
                      <div className="icon">
                        <Code />
                      </div>
                      <h4>Web Development</h4>
                      <p>Full-stack web development services with responsive design and modern frameworks</p>
                    </div>
                  </div>
                  <div className="flip-box-back">
                    <div className="service-item-inner">
                      <h4>Web Development</h4>
                      <ul className="service-list">
                        <li><Check /> Responsive Web Design</li>
                        <li><Check /> React & Next.js Development</li>
                        <li><Check /> Backend API Development</li>
                        <li><Check /> Database Design</li>
                        <li><Check /> Performance Optimization</li>
                        <li><Check /> Web Security</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="service-item padd-15">
                <div className="flip-box">
                  <div className="flip-box-front">
                    <div className="service-item-inner">
                      <div className="icon">
                        <Palette />
                      </div>
                      <h4>Graphic & UX-UI Design</h4>
                      <p>Professional design solutions to create intuitive interfaces and stunning visual identities</p>
                    </div>
                  </div>
                  <div className="flip-box-back">
                    <div className="service-item-inner">
                      <h4>Graphic & UX-UI Design</h4>
                      <ul className="service-list">
                        <li><Check /> UI/UX Design</li>
                        <li><Check /> Logo & Brand Identity</li>
                        <li><Check /> Wireframing & Prototyping</li>
                        <li><Check /> Design System Creation</li>
                        <li><Check /> User Research</li>
                        <li><Check /> Graphic Design</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="service-item padd-15">
                <div className="flip-box">
                  <div className="flip-box-front">
                    <div className="service-item-inner">
                      <div className="icon">
                        <Smartphone />
                      </div>
                      <h4>Mobile Apps</h4>
                      <p>Native and cross-platform mobile application development for iOS and Android</p>
                    </div>
                  </div>
                  <div className="flip-box-back">
                    <div className="service-item-inner">
                      <h4>Mobile Apps</h4>
                      <ul className="service-list">
                        <li><Check /> iOS App Development</li>
                        <li><Check /> Android App Development</li>
                        <li><Check /> React Native Apps</li>
                        <li><Check /> App UI/UX Design</li>
                        <li><Check /> App Store Deployment</li>
                        <li><Check /> App Maintenance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="service-item padd-15">
                <div className="flip-box">
                  <div className="flip-box-front">
                    <div className="service-item-inner">
                      <div className="icon">
                        <Megaphone />
                      </div>
                      <h4>Digital Marketing</h4>
                      <p>Comprehensive digital marketing strategies including SEO and social media marketing</p>
                    </div>
                  </div>
                  <div className="flip-box-back">
                    <div className="service-item-inner">
                      <h4>Digital Marketing</h4>
                      <ul className="service-list">
                        <li><Check /> SEO & SEM</li>
                        <li><Check /> Social Media Marketing</li>
                        <li><Check /> Content Marketing</li>
                        <li><Check /> Email Marketing</li>
                        <li><Check /> Analytics & Reporting</li>
                        <li><Check /> Conversion Optimization</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="service-item padd-15">
                <div className="flip-box">
                  <div className="flip-box-front">
                    <div className="service-item-inner">
                      <div className="icon">
                        <Server />
                      </div>
                      <h4>Devops Service</h4>
                      <p>DevOps solutions with CI/CD pipelines, cloud infrastructure and automation</p>
                    </div>
                  </div>
                  <div className="flip-box-back">
                    <div className="service-item-inner">
                      <h4>Devops Service</h4>
                      <ul className="service-list">
                        <li><Check /> CI/CD Pipeline Setup</li>
                        <li><Check /> Cloud Infrastructure (AWS, Azure)</li>
                        <li><Check /> Docker & Kubernetes</li>
                        <li><Check /> Server Automation</li>
                        <li><Check /> Monitoring & Logging</li>
                        <li><Check /> Security & Compliance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`team section ${activeSection === 'team' ? 'active' : ''} ${backSection === 'team' ? 'back-section' : ''} ${mobileMenuOpen ? 'open' : ''}`} id="team">
          <div className="container">
            <div className="row">
              <div className="section-title padd-15">
                <h2>Our Team</h2>
              </div>
            </div>

            <div className="team-carousel-wrapper">
              <div className="team-carousel p-[0px]">
                {[
                  {
                    name: "Deepak",
                    role: "Backend Developer",
                    image: "/images/Our Team/Deepak.png",
                    about: "Backend specialist with expertise in database design, API development, and server architecture. Building robust and scalable systems."
                  },
                  {
                    name: "Aman Kumar",
                    role: "UI/UX Designer",
                    image: "/images/Our Team/Aman.png",
                    about: "Creative designer focused on user experience and modern interface design. Bringing ideas to life with beautiful and functional designs."
                  },
                  {
                    name: "Suraj Parkash",
                    role: "Full Stack Developer",
                    image: "/images/My Profile/suraj.png",
                    about: "Passionate developer with expertise in React, Node.js, and modern web technologies. Creating innovative solutions for complex problems."
                  },
                  {
                    name: "Lalit",
                    role: "Mobile Developer",
                    image: "/images/Our Team/lalit.png",
                    about: "Mobile app developer with expertise in React Native and Flutter. Creating cross-platform mobile applications with native performance."
                  },
                  {
                    name: "Sahil",
                    role: "Graphic Designer",
                    image: "/images/Our Team/sahil.png",
                    about: "Creative graphic designer with expertise in visual branding, logo design, and digital marketing materials. Bringing brands to life through compelling visuals."
                  },
                  {
                    name: "Saddam Hussain",
                    role: "Shopify Developer",
                    image: "/images/Our Team/Saddam.png",
                    about: "Shopify specialist with expertise in e-commerce development, theme customization, and app integration. Building successful online stores for businesses."
                  }
                ].map((member, index) => {
                  const position = (index - activeTeamIndex + 6) % 6;
                  return (
                    <div
                      key={index}
                      className={`team-carousel-item position-${position}`}
                      onClick={() => setActiveTeamIndex(index)}
                    >
                      <div className="team-card">
                        <div className="team-card-inner">
                          <div className="team-card-front">
                            <img src={member.image} alt={member.name} />
                          </div>
                          <div className="team-card-back">
                            <h4>{member.name}</h4>
                            <p className="role">{member.role}</p>
                            <p className="about">{member.about}</p>
                            <div className="social-links">
                              <a href="https://in.linkedin.com/in/suraj-parkash-mandhan-556a61246" target="_blank" rel="noopener noreferrer"><Linkedin /></a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="team-card-info">
                        <h4>{member.name}</h4>
                        <p>{member.role}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <button 
                className="carousel-nav prev"
                onClick={() => setActiveTeamIndex((activeTeamIndex - 1 + 6) % 6)}
              >
                <ChevronLeft />
              </button>
              <button 
                className="carousel-nav next"
                onClick={() => setActiveTeamIndex((activeTeamIndex + 1) % 6)}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </section>

        <section className={`portfolio section ${activeSection === 'portfolio' ? 'active' : ''} ${backSection === 'portfolio' ? 'back-section' : ''} ${mobileMenuOpen ? 'open' : ''}`} id="portfolio">
          <div className="container">
            <div className="row">
              <div className="section-title padd-15">
                <h2>Portfolio</h2>
              </div>
            </div>

            <div className="list-images">
              <div className="list-images__heading-box">
                <h1 className="list-images__heading">
                  OUR
                  <span className="list-images__heading-span">
                    {' '}Recent
                  </span>
                  {' '}Projects
                </h1>
                <p className="list-images__text">
                  A glimpse into our vision brought to life — from private residences to public spaces.
                </p>
              </div>

              <div className="list-images__bottom">
                <div className="list-images__list-headers">
                  <span className="list-images__list-title">Project</span>
                  <span className="list-images__list-title">About</span>
                  <span className="list-images__list-title"></span>
                </div>

                <div className="list-images__list" id="image-list">
                  {/* List Item 1 */}
                  <div className="list-images__item" data-img="/images/Projects/Debras-Broadbeach-Store-Static-Page-Banner.webp">
                    <h2 className="list-images__item-heading">
                      Debra's Australia
                    </h2>
                    <p className="list-images__item-text">
                      A comprehensive e-commerce platform for premium Australian products.
                      Features responsive design, secure checkout, and seamless user experience.
                    </p>
                    <div className="list-images__item-image">
                      <img src="/images/Projects/Debras-Broadbeach-Store-Static-Page-Banner.webp" alt="Debra's Australia" loading="lazy" width="450" height="315" />
                    </div>
                    <a href="https://www.debras.com.au/" target="_blank" rel="noopener noreferrer" className="list-images__item-btn">
                      View
                    </a>
                  </div>

                  {/* List Item 2 */}
                  <div className="list-images__item" data-img="/images/Projects/shabadguru.png">
                    <h2 className="list-images__item-heading">
                      Shabad Guru
                    </h2>
                    <p className="list-images__item-text">
                      A spiritual and educational platform dedicated to Sikh teachings.
                      Built with accessibility in mind, featuring multilingual support and rich content.
                    </p>
                    <div className="list-images__item-image">
                      <img src="/images/Projects/shabadguru.png" alt="Shabad Guru" loading="lazy" width="450" height="315" />
                    </div>
                    <a href="https://shabad-guru.org/" target="_blank" rel="noopener noreferrer" className="list-images__item-btn">
                      View
                    </a>
                  </div>

                  {/* List Item 3 */}
                  <div className="list-images__item" data-img="/images/Projects/vipnumbershop.jpg">
                    <h2 className="list-images__item-heading">
                      VIP Number Shop
                    </h2>
                    <p className="list-images__item-text">
                      Premium mobile number marketplace with advanced search functionality.
                      Designed for easy browsing, filtering, and secure transactions of VIP numbers.
                    </p>
                    <div className="list-images__item-image">
                      <img src="/images/Projects/vipnumbershop.jpg" alt="VIP Number Shop" loading="lazy" width="450" height="315" />
                    </div>
                    <a href="https://www.vipnumbershop.com/" target="_blank" rel="noopener noreferrer" className="list-images__item-btn">
                      View
                    </a>
                  </div>

                  {/* List Item 4 */}
                  <div className="list-images__item" data-img="/images/Projects/warley_food_service.webp">
                    <h2 className="list-images__item-heading">
                      Warley Food Service
                    </h2>
                    <p className="list-images__item-text">
                      Professional catering and food service business website.
                      Showcases services, menu options, and streamlined booking system for clients.
                    </p>
                    <div className="list-images__item-image">
                      <img src="/images/Projects/warley_food_service.webp" alt="Warley Food Service" loading="lazy" width="450" height="315" />
                    </div>
                    <a href="https://warleyfoodservice.com/" target="_blank" rel="noopener noreferrer" className="list-images__item-btn">
                      View
                    </a>
                  </div>

                  {/* List Item 5 */}
                  <div className="list-images__item" data-img="/images/Projects/dip.webp">
                    <h2 className="list-images__item-heading">
                      DIP
                    </h2>
                    <p className="list-images__item-text">
                      Dip is a UK-based company that makes eco-friendly, plant-based cleaning products, primarily in the form of dissolvable, plastic-free laundry and dishwasher detergent sheet
                    </p>
                    <div className="list-images__item-image">
                      <img src="/images/Projects/dip.webp" alt="We Are DIP" loading="lazy" width="450" height="315" />
                    </div>
                    <a href="https://wearedip.co.uk/" target="_blank" rel="noopener noreferrer" className="list-images__item-btn">
                      View
                    </a>
                  </div>
                </div>
              </div>

              {/* Image Box for cursor-following effect */}
              <div className="list-images__image-box"></div>
            </div>
          </div>
        </section>

        <section className={`contact section ${activeSection === 'contact' ? 'active' : ''} ${backSection === 'contact' ? 'back-section' : ''} ${mobileMenuOpen ? 'open' : ''}`} id="contact">
          <div className="container">
            <div className="row">
              <div className="section-title padd-15">
                <h2>Contact</h2>
              </div>
            </div>

            <h3 className="contact-title padd-15">Have A <span className="text-blue">Project</span> ?<br />We Would <span className="text-red">Love</span> To <span className="text-orange">Help.</span></h3>
            <h4 className="contact-subtitle padd-15">Fill up the form and i will get back to you within 24 hours.</h4>

            <div className="row">
              <div className="contact-form padd-15">
                  {showThankYou && (
                  <div className="thank-you-message">
                      <p>Thank you for your message! We will get back to you soon.</p>
                  </div>
                  )}
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="form-item col-6 padd-15">
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="Name" name="name" />
                      </div>
                    </div>

                    <div className="form-item col-6 padd-15">
                      <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email" name="email" />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-item col-12 padd-15">
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="Subject" name="subject" />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-item col-12 padd-15">
                      <div className="form-group">
                        <textarea name="message" id="message" className="form-control" placeholder="Message"></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-item col-12 padd-15">
                      <div className="form-group">
                        <button 
                          type="submit" 
                          className="btn" 
                          disabled={isSubmitting}
                          style={{
                            opacity: isSubmitting ? 0.7 : 1,
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                          }}
                        >
                          {isSubmitting && (
                            <div 
                              style={{
                                width: '16px',
                                height: '16px',
                                border: '2px solid #ffffff',
                                borderTop: '2px solid transparent',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                              }}
                            />
                          )}
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <h3 className="contact-title padd-15">Any Question? Contact us!</h3>
            <h4 className="contact-subtitle padd-15">I'm at your service</h4>

            <div className="row contact-info-row">
              <div className="contact-info-item contact-info-left padd-15">
                <a href="tel:+919068327292" className="contact-link">
                  <div className="icon"><Phone /></div>
                  <h4>Call us on</h4>
                  <p>+91 906 832 7292</p>
                </a>
              </div>

              <div className="contact-info-item contact-info-center padd-15">
                <div className="email-wrapper">
                  <a href="mailto:suraj.parkash.mandhan@gmail.com" className="contact-link">
                    <div className="icon"><Mail /></div>
                    <h4>Email</h4>
                    <p>suraj.parkash.mandhan@gmail.com</p>
                  </a>
                  <button 
                    className="copy-btn" 
                    onClick={handleCopyEmail}
                    title="Copy email to clipboard"
                  >
                    <Copy />
                  </button>
                </div>
              </div>

              <div className="contact-info-item contact-info-right padd-15">
                <a 
                  href="https://www.google.com/maps/place/Haryana,+India" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-link"
                >
                  <div className="icon"><MapPin /></div>
                  <h4>Location</h4>
                  <p>India, Haryana</p>
                </a>
              </div>

              <div className="contact-info-item contact-info-linkedin padd-15">
                <a 
                  href="https://in.linkedin.com/in/suraj-parkash-mandhan-556a61246" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-link"
                >
                  <div className="icon"><Linkedin /></div>
                  <h4>LinkedIn</h4>
                  <p>Connect with me</p>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className={`style-switcher ${styleSwitcherOpen ? 'open' : ''}`}>
        <div className="style-switcher-toggler s-icon" onClick={toggleStyleSwitcher} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Settings />
        </div>

        <div className="day-night s-icon" onClick={toggleDarkMode} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isDark ? <Sun /> : <Moon />}
        </div>

        <h4>Theme Colors</h4>

        <div className="colors">
          <span className="color-1" onClick={() => handleColorChange('color-1')}></span>
          <span className="color-2" onClick={() => handleColorChange('color-2')}></span>
          <span className="color-3" onClick={() => handleColorChange('color-3')}></span>
          <span className="color-4" onClick={() => handleColorChange('color-4')}></span>
          <span className="color-5" onClick={() => handleColorChange('color-5')}></span>
        </div>
      </div>

      {/* <Toaster /> */}
    </div>
  );
}