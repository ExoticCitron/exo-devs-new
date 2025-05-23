'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { User, Briefcase, Mail, Github, Linkedin, Twitter, ChevronDown, Code, Zap, Star, ChevronUp, ArrowRight, ChevronLeft, ChevronRight, Cpu, Globe, Palette } from 'lucide-react';
import Link from 'next/link';

const GlitchText = ({ text }: { text: string }) => {
  const [isGlitching, setIsGlitching] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsGlitching(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.span
      className="relative inline-block"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {text}
      <AnimatePresence>
        {isGlitching && (
          <motion.span
            className="absolute inset-0 text-red-500"
            style={{ clipPath: 'inset(0 0 0 0)' }}
            animate={{
              clipPath: [
                'inset(0 0 0 0)',
                'inset(100% 0 0 0)',
                'inset(50% 0 50% 0)',
                'inset(0 0 100% 0)',
              ],
            }}
            transition={{
              duration: 0.5,
              repeat: 20,
              repeatType: "reverse",
            }}
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.span>
  );
};

const BackgroundBubble = ({ size, position, color }: { size: number, position: { x: string, y: string }, color: string }) => (
  <motion.div
    className={`absolute rounded-full ${color} opacity-10 blur-xl`}
    style={{
      width: size,
      height: size,
      top: position.y,
      left: position.x,
    }}
    animate={{
      x: [0, 10, -10, 0],
      y: [0, -10, 10, 0],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  />
);

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: { x: number; y: number; size: number; speedX: number; speedY: number }[] = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { scrollY } = useScroll();

  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0.8]);
  const headerBlur = useTransform(scrollY, [0, 200], [0, 8]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header 
      className="container mx-auto px-4 py-6 relative"
      style={{ 
        opacity: headerOpacity,
        filter: `blur(${headerBlur}px)`,
      }}
    >
      <div className="flex justify-center">
        <motion.div
          className="bg-red-900 bg-opacity-40 backdrop-blur-md rounded-2xl px-8 py-4 shadow-lg relative"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          style={{
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.1), 0 0 40px rgba(255, 0, 0, 0.1)',
          }}
        >
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <motion.div
                className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <User className="w-6 h-6 text-red-100" />
              </motion.div>
              <span className="text-2xl font-bold text-red-300">Haveen</span>
            </div>
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                {['Home', 'About Me', 'Projects', 'Skills', 'Contact'].map((item) => (
                  <li key={item}>
                    <motion.button
                      className="text-red-200 hover:text-white transition-colors relative"
                      onHoverStart={() => setHoveredItem(item)}
                      onHoverEnd={() => setHoveredItem(null)}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                    >
                      {item}
                      <AnimatePresence>
                        {hoveredItem === item && (
                          <motion.div
                            className="absolute inset-0 bg-red-400 opacity-20 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-red-300 focus:outline-none">
                <ChevronDown className={`w-6 h-6 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-red-900 bg-opacity-40 py-2 mt-4 rounded-xl border border-red-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <nav className="container mx-auto px-4">
            <ul className="space-y-2">
              {['Home', 'About Me', 'Projects', 'Skills', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => {
                      scrollToSection(item.toLowerCase().replace(' ', '-'));
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-red-200 hover:text-red-100 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

const Section = ({ id, title, children }: { id: string, title: string, children: React.ReactNode }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <motion.section 
      id={id} 
      className="py-20 relative"
      ref={ref}
      style={{ opacity, scale }}
    >
      <h2 className="text-4xl font-bold text-center mb-12 text-red-300">{title}</h2>
      {children}
    </motion.section>
  );
};

const ProjectCard = ({ title, description, link, icon: Icon }: { title: string, description: string, link: string, icon: React.ElementType }) => (
  <motion.div 
    className="bg-gradient-to-br from-red-950 to-red-900 bg-opacity-60 p-6 rounded-2xl shadow-lg relative overflow-hidden group transform transition-all duration-300 hover:-rotate-3 hover:scale-105"
    whileHover={{ scale: 1.05 }}
  >
    <div className="absolute top-0 right-0 w-20 h-20 bg-red-800 rounded-bl-full opacity-20"></div>
    <Icon className="w-12 h-12 text-red-400 mb-4" />
    <h3 className="text-xl font-bold mb-2 text-red-300">{title}</h3>
    <p className="text-red-100 mb-4">{description}</p>
    <a href={link} className="text-red-400 hover:text-red-300 transition-colors inline-flex items-center group-hover:underline">
      Learn More
      <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
    </a>
  </motion.div>
);

const Skill = ({ name, level }: { name: string, level: number }) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div className="mb-4" ref={ref}>
      <div className="flex justify-between mb-1">
        <span className="text-red-300">{name}</span>
        <span className="text-red-400">{level}%</span>
      </div>
      <div className="w-full bg-red-900 rounded-full h-2.5 overflow-hidden">
        <motion.div 
          className="bg-red-500 h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${level}%` : 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isNameValid = name.trim() !== '';
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isMessageValid = message.trim() !== '';
    
    setIsFormValid(isNameValid && isEmailValid && isMessageValid);
  }, [name, email, message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);

    const webhookUrl = 'https://discord.com/api/webhooks/1303070139280789647/1747qs4njOra7uyUJkhVggvXSFilgno01cTilCIUyF5CTHoXaOKaBU1WODyFq3hkwav6';

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: `New contact form submission:
Name: ${name}
Email: ${email}
Message: ${message}`,
        }),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred. Please try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <motion.form 
      className="relative bg-red-950 bg-opacity-60 p-8 rounded-2xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 to-transparent opacity-20 rounded-2xl pointer-events-none"></div>
      <div className="relative mb-4 z-10">
        <input 
          type="text" 
          id="name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 bg-red-900 bg-opacity-50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500 peer placeholder-transparent" 
          placeholder="Name"
          required
        />
        <label 
          htmlFor="name" 
          className="absolute left-3 -top-2.5 text-red-300 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-red-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-red-300 peer-focus:text-sm"
        >
          Name
        </label>
      </div>
      <div className="relative mb-4 z-10">
        <input 
          type="email" 
          id="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 bg-red-900 bg-opacity-50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500 peer placeholder-transparent" 
          placeholder="Email"
          required
        />
        <label 
          htmlFor="email" 
          className="absolute left-3 -top-2.5 text-red-300 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-red-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-red-300 peer-focus:text-sm"
        >
          Email
        </label>
      </div>
      <div className="relative mb-4 z-10">
        <textarea 
          id="message" 
          rows={4} 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 bg-red-900 bg-opacity-50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500 peer placeholder-transparent"
          placeholder="Message"
          required
        ></textarea>
        <label 
          htmlFor="message" 
          className="absolute left-3 -top-2.5 text-red-300 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-red-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-red-300 peer-focus:text-sm"
        >
          Message
        </label>
      </div>
      <motion.button 
        type="submit"
        className={`bg-red-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg w-full transition-all duration-300 ${
          !isFormValid || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-500'
        }`}
        whileHover={isFormValid && !isSubmitting ? { scale: 1.05, boxShadow: '0 0 15px rgba(255, 65, 54, 0.5)' } : {}}
        whileTap={isFormValid && !isSubmitting ? { scale: 0.95 } : {}}
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </motion.button>
    </motion.form>
  );
};

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsVisible(latest > 100);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-4 right-4 bg-red-600 text-white p-2 rounded-full shadow-lg z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    { name: "Evan Jaden", role: "CEO, [REDACTED]", text: "Haveen's work is exceptional. His attention to detail and creative solutions have greatly improved our web presence." },
    { name: "Leo Olanti", role: "Client For Software Solutions", text: "Working with Haveen was a pleasure. He delivered our project on time and exceeded our expectations." },
    { name: "Incog [CLIENT NAME REDACTED]", role: "Founder Of A Discord Hostings Website", text: "Haveen's expertise in web development helped us launch our hosting solutions successfully. Highly recommended!" },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative bg-red-950 bg-opacity-60 p-8 rounded-2xl shadow-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 to-transparent opacity-20 rounded-2xl pointer-events-none"></div>
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-lg mb-4 text-red-100">"{testimonials[currentIndex].text}"</p>
            <p className="font-bold text-red-300">{testimonials[currentIndex].name}</p>
            <p className="text-sm text-red-400">{testimonials[currentIndex].role}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={prevTestimonial} className="text-red-400 hover:text-red-300 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={nextTestimonial} className="text-red-400 hover:text-red-300 transition-colors">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

const SkillCard = ({ skill, icon: Icon }: { skill: string, icon: React.ElementType }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-gradient-to-br from-red-950 to-red-900 p-6 rounded-2xl shadow-lg relative overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-red-800 opacity-0"
        initial={false}
        animate={{ opacity: isHovered ? 0.2 : 0 }}
      />
      <Icon className="w-12 h-12 text-red-400 mb-4" />
      <h3 className="text-xl font-bold text-red-300">{skill}</h3>
      <motion.div
        className="w-full h-1 bg-red-500 mt-4"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default function PortfolioWebsite() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-red-900 text-white overflow-hidden relative">
      <ParticleBackground />
      <BackgroundBubble size={300} position={{ x: '10%', y: '20%' }} color="bg-red-800" />
      <BackgroundBubble size={200} position={{ x: '80%', y: '50%' }} color="bg-red-700" />
      <BackgroundBubble size={150} position={{ x: '50%', y: '70%' }} color="bg-red-600" />
      
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: `${mousePosition.x / 5}px ${mousePosition.y / 5}px`,
        }}
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23FF0000" fill-opacity="0.2" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10">
        <Header />

        <main className="container mx-auto px-4">
          <Section id="home" title="">
            <div className="text-center">
              <motion.h2 
                className="text-4xl font-bold mb-2 text-red-300"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Hello, I'm
              </motion.h2>
              <h1 className="text-6xl font-bold mb-6 text-red-300 relative inline-block">
                <GlitchText text="Haveen" />
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-red-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
              </h1>
              <motion.p 
                className="text-4xl mb-8 text-red-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                👋
              </motion.p>
              <motion.p 
                className="text-xl mb-8 text-red-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Web Developer | Designer | Creative Thinker
              </motion.p>
              <motion.a 
                href="#contact"
                className="bg-red-600 text-white px-8 py-3 rounded-full font-bold text-lg inline-block shadow-lg"
                whileHover={{ backgroundColor: '#FF4136', scale: 1.05, boxShadow: '0 0 15px rgba(255, 65, 54, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
            </div>
          </Section>

          <Section id="about-me" title="About Me">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-red-950 bg-opacity-40 p-6 rounded-2xl">
                  <p className="text-lg mb-6 text-red-100">
                    I'm a passionate web developer with a keen eye for design and a love for creating intuitive, user-friendly experiences. I'm 16 and have expertise in React, Next.js, HTML and Python, and more importantly, I love to bring ideas to life through code.
                  </p>
                  <p className="text-lg mb-6 text-red-100">
                    When I'm not coding, you can find me exploring new technologies, at school, contributing to open-source projects, or enjoying a good cup of coffee while brainstorming my next 5 big moves.
                  </p>
                </div>
                <div className="bg-red-950 bg-opacity-40 p-6 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-4 text-red-300">My Skills</h3>
                  <Skill name="React" level={90} />
                  <Skill name="Next.js" level={85} />
                  <Skill name="TypeScript" level={80} />
                  <Skill name="UI/UX Design" level={75} />
                </div>
              </div>
            </div>
          </Section>

          <Section id="projects" title="My Projects">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProjectCard 
                title="Division"
                description="An innovative discord web application built with Python and SQLite database, showcasing AI-powered security features and seamless antinuke controls. In other words... the best security bot on discord"
                link="https://exo-devs.tech/"
                icon={Code}
              />
              <ProjectCard  
                title="exo.devs.tech"
                description="An innovative website developed using React Native, demonstrating cross-platform capabilities and intuitive interface design."
                link="#"
                icon={Zap}
              />
              <ProjectCard 
                title="Flux (soon)"
                description="A robust backend system powered by Node.js and Express, featuring RESTful API design and efficient database management."
                link="#"
                icon={Star}
              />
            </div>
          </Section>

          <Section id="testimonials" title="What People Say">
            <div className="max-w-2xl mx-auto">
              <TestimonialCarousel />
            </div>
          </Section>

          <Section id="skills" title="Skills Showcase">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <SkillCard skill="Frontend Development" icon={Code} />
              <SkillCard skill="Backend Development" icon={Cpu} />
              <SkillCard skill="UI/UX Design" icon={Palette} />
              <SkillCard skill="Responsive Design" icon={Globe} />
              <SkillCard skill="API Integration" icon={Zap} />
              <SkillCard skill="Performance Optimization" icon={Star} />
            </div>
          </Section>

          <Section id="contact" title="Get in Touch">
            <div className="max-w-md mx-auto">
              <ContactForm />
            </div>
          </Section>
        </main>

        <footer className="bg-gradient-to-r from-black to-red-950 py-12 mt-20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-red-300 mb-4">&copy; 2024 Haveen. All rights reserved.</p>
            <div className="flex justify-center space-x-4">
              <a href="https://github.com/ExoticCitron" className="text-red-400 hover:text-red-300 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-red-400 hover:text-red-300 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-red-400 hover:text-red-300 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </footer>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
