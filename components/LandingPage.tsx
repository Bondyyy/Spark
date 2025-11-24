import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Zap, Server, Eye, CheckCircle, ArrowRight, PlayCircle, Globe, Database, Users, Menu, X, Activity, AlertTriangle, CloudFog, BarChart3, BellRing, Video, ChevronRight, ChevronLeft, Quote, Map, Mail, Phone, Linkedin, MapPin as MapPinIcon, Star } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Feedback State
  const [feedbackRating, setFeedbackRating] = useState<string | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [starRating, setStarRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Refs for Charts
  const deathChartRef = useRef<HTMLCanvasElement>(null);
  const economicChartRef = useRef<HTMLCanvasElement>(null);
  const chartInstances = useRef<any[]>([]);

  const slides = [
    {
      url: "https://images.unsplash.com/photo-1611273426761-54c981458147?q=80,w=1000",
      title: "Industrial Emissions",
      location: "Zone B - 08:30 AM"
    },
    {
      url: "https://images.unsplash.com/photo-1596464522434-d02241604169?q=80,w=1000",
      title: "Illegal Waste Burning",
      location: "District 9 - 10:15 PM"
    },
    {
      url: "https://images.unsplash.com/photo-1550479023-2a811e19dfd3?q=80,w=1000",
      title: "Urban Traffic Smog",
      location: "City Center - Rush Hour"
    }
  ];

  // Carousel Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Chart.js Initialization
  useEffect(() => {
    const initCharts = () => {
      // Cleanup old charts
      chartInstances.current.forEach(chart => chart.destroy());
      chartInstances.current = [];

      if (typeof (window as any).Chart === 'undefined') return;

      const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            grid: { color: '#f1f5f9' },
            ticks: { font: { family: 'Inter' } }
          },
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Inter' } }
          }
        }
      };

      // Bar Chart: Premature Deaths
      if (deathChartRef.current) {
        const ctx1 = deathChartRef.current.getContext('2d');
        if (ctx1) {
          const chart1 = new (window as any).Chart(ctx1, {
            type: 'bar',
            data: {
              labels: ['2020', '2021', '2022', '2023', '2024'],
              datasets: [{
                label: 'Premature Deaths (Millions)',
                data: [6.8, 7.2, 7.9, 8.4, 9.1],
                backgroundColor: '#EF4444',
                borderRadius: 4,
              }]
            },
            options: {
              ...commonOptions,
              plugins: { ...commonOptions.plugins, title: { display: true, text: 'Premature Deaths (Millions/Year)', align: 'start', font: { size: 14, weight: '600' } } }
            }
          });
          chartInstances.current.push(chart1);
        }
      }

      // Line Chart: Economic Loss
      if (economicChartRef.current) {
        const ctx2 = economicChartRef.current.getContext('2d');
        if (ctx2) {
          const chart2 = new (window as any).Chart(ctx2, {
            type: 'line',
            data: {
              labels: ['2020', '2021', '2022', '2023', '2024'],
              datasets: [{
                label: 'Economic Loss (Billions USD)',
                data: [2.1, 2.9, 3.8, 4.5, 5.2],
                borderColor: '#F59E0B',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                tension: 0.4,
                fill: true
              }]
            },
            options: {
              ...commonOptions,
              plugins: { ...commonOptions.plugins, title: { display: true, text: 'Global Economic Loss ($ Billions)', align: 'start', font: { size: 14, weight: '600' } } }
            }
          });
          chartInstances.current.push(chart2);
        }
      }
    };

    // Small delay to ensure script loads if not already there
    const timeout = setTimeout(initCharts, 500);
    return () => clearTimeout(timeout);
  }, []);

  const handleEmojiClick = (emoji: string) => {
    setFeedbackRating(emoji);
    if (emoji === '🤩') {
      setStarRating(5);
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-light font-sans selection:bg-primary/20">
      
      {/* Modern Responsive Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex justify-between items-center h-16">
            
            {/* Left: Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer z-50">
              <div className="bg-primary text-white p-2 rounded-lg shadow-lg shadow-primary/30">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <span className={`text-xl font-bold tracking-tight transition-colors ${isScrolled || isMobileMenuOpen ? 'text-dark' : 'text-dark lg:text-slate-900'}`}>
                CLEAN-AIR <span className="text-primary">SENTINEL</span>
              </span>
            </div>

            {/* Center: Navigation Links (Absolute Centering) */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center gap-8 lg:gap-12">
              {navLinks.map((item) => (
                <a 
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-slate-600 hover:text-primary transition-colors relative group whitespace-nowrap"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
              {/* Desktop CTA */}
              <div className="hidden md:block">
                <button
                  onClick={onLogin}
                  className="bg-dark hover:bg-slate-800 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  Access Dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <div className="md:hidden z-50">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-slate-700 hover:text-primary transition-colors p-2"
                >
                  {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`fixed inset-0 bg-white z-40 flex flex-col justify-center items-center gap-8 transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}>
            {navLinks.map((item) => (
              <a 
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold text-slate-800 hover:text-primary"
              >
                {item.name}
              </a>
            ))}
             <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onLogin();
                }}
                className="bg-primary text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg mt-4"
              >
                Access Dashboard
              </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-blue-100 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Glowing Border Box Container */}
          <div className="glowing-border-box p-6 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Left Column: Text */}
              <div className="text-center lg:text-left animate-fade-in-up">
                <h1 className="text-5xl lg:text-7xl font-extrabold text-dark tracking-tight mb-6 leading-[1.1]">
                  AI-Powered <br className="hidden lg:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-600">
                    Clean Air Defense
                  </span>
                </h1>
                
                <p className="mt-4 text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Instantly detect illegal waste burning with existing city cameras. Protect urban air quality with real-time monitoring and automated alerts.
                </p>
                
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button 
                    onClick={onLogin}
                    className="px-8 py-4 bg-primary hover:bg-primaryDark text-white font-bold rounded-xl shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
                  >
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="px-8 py-4 bg-white hover:bg-gray-50 text-slate-700 font-semibold rounded-xl border border-gray-200 shadow-sm transition-all flex items-center justify-center gap-2">
                    <PlayCircle className="w-5 h-5 text-gray-400" />
                    Live Demo
                  </button>
                </div>
                
                <div className="mt-10 pt-8 border-t border-slate-200 flex items-center justify-center lg:justify-start gap-8 text-slate-400 grayscale opacity-70">
                   <div className="flex items-center gap-2"><ShieldCheck size={20}/> GovTech</div>
                   <div className="flex items-center gap-2"><Globe size={20}/> SmartCity</div>
                   <div className="flex items-center gap-2"><Server size={20}/> AWS Partner</div>
                </div>
              </div>

              {/* Right Column: Visual (Static Image) */}
              <div className="relative hidden lg:block h-full min-h-[500px] flex items-center justify-center">
                  {/* Background Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/10 to-blue-100/30 rounded-full blur-3xl"></div>

                  <div className="relative z-10 p-8">
                      <img
                          src="https://images.unsplash.com/photo-1579762145710-bbef99291b5c?q=80&w=1000"
                          alt="AI data processing"
                          loading="lazy"
                          className="w-full h-auto max-w-[600px] object-contain rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                      />
                  </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION: The Crisis (Redesigned) */}
      <section id="crisis" className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-dark mb-4">The Silent Crisis: Urban Air Quality</h2>
            <p className="text-lg md:text-xl text-slate-500">
              Illegal waste burning and industrial emissions are choking our cities. The evidence is visible, but often ignored.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Left Column: Image Carousel */}
            {/* Mobile: Reduced height (h-72), Desktop: Full height (lg:h-[500px]) */}
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl h-72 md:h-96 lg:h-[500px]">
              {/* Slides */}
              {slides.map((slide, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img 
                    src={slide.url} 
                    alt={slide.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                    <div className="absolute bottom-0 left-0 p-6 md:p-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-bold mb-3 backdrop-blur-sm">
                        <AlertTriangle size={14} /> CRITICAL LEVEL
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{slide.title}</h3>
                      <p className="text-slate-300 flex items-center gap-2 text-sm md:text-base">
                        <MapPinIcon size={16} /> {slide.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Carousel Controls */}
              <div className="absolute bottom-6 right-6 z-20 flex gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentSlide === idx ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Charts */}
            <div className="flex flex-col gap-6">
              {/* Chart 1: Deaths */}
              <div className="flex-1 bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-slate-100 relative min-h-[250px]">
                 <div className="h-full w-full">
                    <canvas ref={deathChartRef} className="w-full h-full"></canvas>
                 </div>
                 <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-red-50 text-red-600 p-2 rounded-lg">
                    <Activity size={20} />
                 </div>
              </div>

              {/* Chart 2: Economy */}
              <div className="flex-1 bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-slate-100 relative min-h-[250px]">
                 <div className="h-full w-full">
                    <canvas ref={economicChartRef} className="w-full h-full"></canvas>
                 </div>
                 <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-orange-50 text-orange-600 p-2 rounded-lg">
                    <BarChart3 size={20} />
                 </div>
              </div>
            </div>
          </div>

          {/* Statistics Bar (Stacked on Mobile, Row on Desktop) */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
            <div className="text-center p-6 bg-white rounded-2xl border border-red-100 shadow-sm hover:shadow-md transition-shadow">
               <h4 className="text-4xl md:text-5xl font-extrabold text-red-600 mb-2">9M+</h4>
               <p className="text-slate-600 font-medium">Premature Deaths/Year</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
               <h4 className="text-4xl md:text-5xl font-extrabold text-orange-500 mb-2">30%</h4>
               <p className="text-slate-600 font-medium">Rise in Respiratory Issues</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
               <h4 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-2">$5B+</h4>
               <p className="text-slate-600 font-medium">Annual Economic Loss</p>
            </div>
          </div>

          {/* Subtle CTA Link */}
          <div className="mt-10 text-center">
            <a 
              href="#how-it-works" 
              className="group inline-flex items-center gap-1 text-primary font-medium italic hover:text-primaryDark transition-colors border-b border-primary"
            >
              See how we detect these hazards in real-time <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid (Moved Down) */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-dark mb-4">Why Clean-Air Sentinel?</h2>
            <p className="text-lg text-slate-500">We bridge the gap between existing city surveillance infrastructure and advanced environmental protection.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="group bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                <Eye className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Computer Vision</h3>
              <p className="text-slate-500 leading-relaxed">Proprietary YOLOv8 model trained on 50,000+ images of urban waste burning. Filters out fog, steam, and vehicle exhaust with 99% accuracy.</p>
            </div>
            
            <div className="group bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Instant Dispatch</h3>
              <p className="text-slate-500 leading-relaxed">Don't wait for citizen reports. Authorities receive Telegram/SMS alerts with location pins and image proof within 10 seconds of detection.</p>
            </div>
            
            <div className="group bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-green-200 hover:shadow-xl hover:shadow-green-500/5 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                <Server className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Hardware Agnostic</h3>
              <p className="text-slate-500 leading-relaxed">Zero hardware investment. Our lightweight edge gateway software connects to any RTSP/ONVIF camera stream you already own.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Steps Layout */}
      <section id="how-it-works" className="py-24 bg-light relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-dark">How It Works</h2>
            <p className="mt-4 text-slate-500">Three simple steps to cleaner air.</p>
          </div>
          
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[2.5rem] left-[16%] right-[16%] h-0.5 bg-slate-200 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {[
                  { id: 1, title: 'Connect Streams', text: 'Securely link your existing CCTV/IP cameras via RTSP. No new hardware needed.', icon: <Video className="w-6 h-6 text-blue-600" /> },
                  { id: 2, title: 'AI Analysis', text: 'Our YOLOv8 model scans feeds in real-time, detecting smoke signatures and fire patterns.', icon: <Eye className="w-6 h-6 text-primary" /> },
                  { id: 3, title: 'Instant Alert', text: 'Authorities receive immediate notifications with location data and visual proof.', icon: <BellRing className="w-6 h-6 text-orange-500" /> }
              ].map((step) => (
                <div key={step.id} className="relative group">
                  <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center border-4 border-white shadow-lg relative z-10 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                    <div className="absolute top-0 right-0 -mr-1 -mt-1 w-6 h-6 bg-slate-900 rounded-full text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                      {step.id}
                    </div>
                  </div>
                  <div className="mt-8 text-center px-4">
                    <h3 className="text-xl font-bold text-dark mb-3">{step.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section (Simplified - 2 Tiers) */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
             <h2 className="text-3xl md:text-4xl font-extrabold text-dark mb-4">Simple, Transparent Pricing</h2>
             <p className="text-lg text-slate-500">Choose the plan that fits your community's needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             {/* Starter */}
             <div className="p-8 rounded-3xl border border-slate-200 bg-white hover:border-slate-300 transition-colors flex flex-col">
                <h3 className="text-xl font-bold text-slate-900">Community Starter</h3>
                <div className="my-6">
                    <span className="text-4xl font-extrabold text-slate-900">Free</span>
                    <span className="text-slate-500"> / Forever</span>
                </div>
                <p className="text-sm text-slate-500 mb-8 h-10">Perfect for individuals or small communities to report incidents manually.</p>
                <button className="w-full py-3 border-2 border-slate-200 rounded-xl font-bold text-slate-600 hover:border-slate-400 hover:text-slate-900 transition-all mt-auto">Sign Up Free</button>
                <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle size={16} className="text-primary"/> Manual Incident Reporting</div>
                    <div className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle size={16} className="text-primary"/> Public Pollution Map</div>
                    <div className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle size={16} className="text-primary"/> Email Alerts (15m Delay)</div>
                </div>
             </div>

             {/* Smart District (Highlighted) */}
             <div className="p-8 rounded-3xl border-2 border-primary bg-white shadow-2xl relative transform md:-translate-y-4 flex flex-col">
                <div className="absolute top-0 right-0 left-0 bg-primary text-white text-xs font-bold text-center py-2 rounded-t-2xl uppercase tracking-wider">Most Popular</div>
                <h3 className="text-xl font-bold text-slate-900 mt-4">Smart District</h3>
                <div className="my-6">
                    <span className="text-4xl font-extrabold text-slate-900">$49</span>
                    <span className="text-slate-500"> / month</span>
                </div>
                <p className="text-sm text-green-600 font-bold italic mb-8 h-10 flex items-center gap-1"><CheckCircle size={14}/> 7-Day Free Trial. No credit card required.</p>
                <button className="w-full py-3 bg-primary hover:bg-primaryDark text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/30 mt-auto">Start Free Trial</button>
                <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3 text-sm text-slate-700 font-medium"><CheckCircle size={16} className="text-primary"/> Up to 5 AI Cameras</div>
                    <div className="flex items-center gap-3 text-sm text-slate-700 font-medium"><CheckCircle size={16} className="text-primary"/> Real-time Telegram Alerts</div>
                    <div className="flex items-center gap-3 text-sm text-slate-700 font-medium"><CheckCircle size={16} className="text-primary"/> Basic Analytics Dashboard</div>
                    <div className="flex items-center gap-3 text-sm text-slate-700 font-medium"><CheckCircle size={16} className="text-primary"/> Standard Support</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-dark mb-4">What Our Partners Say</h2>
                <p className="text-slate-500">Hear from cities and organizations benefiting from Clean-Air Sentinel.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {[
                    { name: 'Jane Doe', role: 'Mayor, Green City', img: 'https://i.pravatar.cc/150?img=1', text: "Clean-Air Sentinel has revolutionized how we monitor industrial zones. Response times have dropped by 80%." },
                    { name: 'John Smith', role: 'Head of Environment, EcoTown', img: 'https://i.pravatar.cc/150?img=2', text: "The AI detection is incredibly accurate. We've significantly reduced illegal waste burning in just 3 months." }
                ].map((item, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative">
                        <Quote className="absolute top-6 right-6 text-slate-100 w-12 h-12" fill="currentColor"/>
                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <img src={item.img} alt={item.name} className="w-14 h-14 rounded-full border-2 border-white shadow-md" />
                            <div>
                                <h4 className="font-bold text-dark">{item.name}</h4>
                                <p className="text-sm text-slate-500">{item.role}</p>
                            </div>
                        </div>
                        <p className="text-slate-600 leading-relaxed italic relative z-10">"{item.text}"</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-dark mb-4">Meet the Minds Behind Clean-Air Sentinel</h2>
                <p className="text-slate-500">Dedicated to protecting our urban environment through advanced AI technology.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                {[
                    { name: 'Đức Dũng', role: 'Team Lead & AI Architect', img: 'https://i.pravatar.cc/300?img=11', desc: 'Leading the vision for smart city integration.' },
                    { name: 'Thành Hiệu', role: 'Frontend Engineer & UI/UX', img: 'https://i.pravatar.cc/300?img=12', desc: 'Crafting intuitive interfaces for complex data.' },
                    { name: 'Kỳ Duyên', role: 'Backend Developer & Data Analyst', img: 'https://i.pravatar.cc/300?img=5', desc: 'Optimizing real-time data processing pipelines.' }
                ].map((member, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center group">
                        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-slate-50 shadow-lg group-hover:scale-105 transition-transform duration-300">
                            <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-xl font-bold text-dark mb-1">{member.name}</h3>
                        <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
                        <p className="text-slate-500 text-sm mb-4 leading-relaxed max-w-xs">{member.desc}</p>
                        <a href="#" className="text-slate-400 hover:text-[#0077b5] transition-colors"><Linkedin size={20} /></a>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Contact Section (Lead Gen) */}
      <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
             <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
             <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">
                {/* Left: Value Prop */}
                <div className="p-10 md:p-14 md:w-5/12 bg-dark text-white flex flex-col justify-center">
                    <h2 className="text-3xl font-extrabold mb-6">Ready to Clear the Air?</h2>
                    <p className="text-slate-300 mb-8 leading-relaxed">Join the network of smart cities today. Get a <strong className="text-primary">Free Urban Air Analysis Report</strong> for your district when you reach out.</p>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle className="text-primary w-5 h-5"/> Instant Setup</li>
                        <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle className="text-primary w-5 h-5"/> 24/7 Monitoring</li>
                        <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle className="text-primary w-5 h-5"/> Cost Effective</li>
                    </ul>
                </div>

                {/* Right: Form */}
                <div className="p-10 md:p-14 md:w-7/12">
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Work Email <span className="text-red-500">*</span></label>
                            <input type="email" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="john@city.gov" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Organization / City Name</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Department of Environment" />
                        </div>
                        <button className="w-full py-4 bg-primary hover:bg-primaryDark text-white font-bold rounded-xl shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5 mt-2">
                            Get My Free Report
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </section>

      {/* Advanced Feedback Section (With Branching Logic) */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-xl mx-auto px-4 text-center">
            <h3 className="text-lg font-bold text-dark mb-2">Help us improve</h3>
            
            {!feedbackSubmitted ? (
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm transition-all duration-300">
                    <p className="text-slate-500 mb-6 text-sm">How relevant is this solution to your city?</p>
                    
                    {/* Emoji Selectors */}
                    <div className="flex justify-center gap-8 mb-6">
                        {['😡', '😐', '🤩'].map((emoji) => (
                            <button 
                                key={emoji}
                                onClick={() => handleEmojiClick(emoji)}
                                className={`text-4xl transition-transform duration-200 transform hover:scale-110 ${
                                    feedbackRating === emoji ? 'scale-125 grayscale-0' : 'grayscale hover:grayscale-0 opacity-70 hover:opacity-100'
                                }`}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>

                    {/* Conditional Rendering Based on Feedback */}
                    {feedbackRating === '🤩' && (
                       // Positive Feedback Flow
                       <div className="text-left space-y-4 animate-fade-in-up pt-4 border-t border-slate-200">
                           {/* Star Rating */}
                           <div className="flex flex-col items-center gap-2 mb-4">
                              <p className="text-sm font-semibold text-slate-700">Rate your experience:</p>
                              <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button key={star} onClick={() => setStarRating(star)} className="focus:outline-none transition-transform hover:scale-110">
                                    <Star 
                                      size={28} 
                                      className={`${star <= starRating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'} transition-colors`} 
                                    />
                                  </button>
                                ))}
                              </div>
                           </div>

                           {/* Positive Tags */}
                           <div>
                              <p className="text-sm font-semibold text-slate-700 mb-2">What did you like most?</p>
                              <div className="flex flex-wrap gap-2">
                                {['Accurate Detection', 'Fast Alerts', 'Easy to Use', 'Dashboard UI'].map((tag) => (
                                  <button 
                                    key={tag}
                                    onClick={() => toggleTag(tag)}
                                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                                      selectedTags.includes(tag) 
                                        ? 'bg-primary text-white border-primary shadow-sm' 
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-primary'
                                    }`}
                                  >
                                    {tag}
                                  </button>
                                ))}
                              </div>
                           </div>

                           <textarea 
                                placeholder="Tell us more about what you loved..." 
                                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none h-24 resize-none bg-white placeholder-slate-400"
                           ></textarea>
                           <button 
                                onClick={() => setFeedbackSubmitted(true)}
                                className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primaryDark transition-colors shadow-lg shadow-primary/30"
                           >
                               Send Love
                           </button>
                       </div>
                    )}

                    {(feedbackRating === '😡' || feedbackRating === '😐') && (
                        // Negative/Neutral Feedback Flow
                        <div className="text-left space-y-4 animate-fade-in-up pt-4 border-t border-slate-200">
                            <p className="text-sm font-semibold text-slate-700">Tell us what went wrong:</p>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    {id: 'price', label: 'Pricing Concern'},
                                    {id: 'clarity', label: 'Hard to Understand'},
                                    {id: 'features', label: 'Missing Features'},
                                    {id: 'other', label: 'Other'}
                                ].map(item => (
                                    <label key={item.id} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer bg-white p-2 rounded border border-slate-200 hover:border-primary transition-colors">
                                        <input type="checkbox" className="rounded text-primary focus:ring-primary border-gray-300" />
                                        {item.label}
                                    </label>
                                ))}
                            </div>
                            <textarea 
                                placeholder="How can we improve?" 
                                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none h-24 resize-none bg-white placeholder-slate-400"
                            ></textarea>
                            <button 
                                onClick={() => setFeedbackSubmitted(true)}
                                className="w-full py-3 bg-dark text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg"
                            >
                                Send Feedback
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-green-50 p-8 rounded-2xl border border-green-100 animate-fade-in-up">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                        🎉
                    </div>
                    <h4 className="text-xl font-bold text-green-800 mb-2">Thank You!</h4>
                    <p className="text-green-700">Your feedback helps us build a better Sentinel.</p>
                </div>
            )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <span className="font-bold text-slate-900">CLEAN-AIR</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                Empowering cities with AI-driven environmental surveillance. Detect, Report, Resolve.
              </p>
              <div className="flex gap-4">
                 <a href="#" className="text-slate-400 hover:text-primary"><Linkedin size={20}/></a>
                 <a href="#" className="text-slate-400 hover:text-primary"><Globe size={20}/></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-primary">Live Monitoring</a></li>
                <li><a href="#" className="hover:text-primary">Incident Reporting</a></li>
                <li><a href="#" className="hover:text-primary">Data Analytics</a></li>
                <li><a href="#" className="hover:text-primary">API Docs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-primary">About Us</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2"><Mail size={16}/> support@cleanair.ai</li>
                <li className="flex items-center gap-2"><Phone size={16}/> +1 (555) 123-4567</li>
                <li className="flex items-center gap-2"><Map size={16}/> 123 Innovation Dr, Tech City</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-100 text-center text-sm text-slate-400">
            &copy; 2024 Clean-Air Sentinel. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;