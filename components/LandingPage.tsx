import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Zap, Server, Eye, CheckCircle, ArrowRight, PlayCircle, Globe, Menu, X, Activity, AlertTriangle, BarChart3, Video, MapPin as MapPinIcon, Star, Linkedin, Mail, Phone, Map, Quote, Send } from 'lucide-react';

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
      url: "https://placehold.co/1200x600/333333/FFFFFF?text=Industrial+Emissions+Zone+B",
      title: "Industrial Emissions",
      location: "Zone B - 08:30 AM"
    },
    {
      url: "https://placehold.co/1200x600/555555/FFFFFF?text=Illegal+Waste+Burning+District+9",
      title: "Illegal Waste Burning",
      location: "District 9 - 10:15 PM"
    },
    {
      url: "https://placehold.co/1200x600/777777/FFFFFF?text=Urban+Traffic+Smog+City+Center",
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

  // --- NAVIGATION REFACTOR ---
  const navLinks = [
    { name: 'Features', id: 'features' },
    { name: 'How it Works', id: 'how-it-works' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'Team', id: 'team' },
    { name: 'Contact', id: 'contact' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

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
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer z-50" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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
                <button 
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium text-slate-600 hover:text-primary transition-colors relative group whitespace-nowrap bg-transparent border-none cursor-pointer"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </button>
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
              <button 
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="text-2xl font-bold text-slate-800 hover:text-primary bg-transparent border-none cursor-pointer"
              >
                {item.name}
              </button>
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
                    Illegal Waste Burning Detection
                  </span>
                </h1>
                
                <p className="mt-4 text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Protecting Urban Air Quality with Real-time Monitoring & Instant Telegram Alerts.
                </p>
                
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button 
                    onClick={onLogin}
                    className="px-8 py-4 bg-primary hover:bg-primaryDark text-white font-bold rounded-xl shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => scrollToSection('how-it-works')}
                    className="px-8 py-4 bg-white hover:bg-gray-50 text-slate-700 font-semibold rounded-xl border border-gray-200 shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <PlayCircle className="w-5 h-5 text-gray-400" />
                    Watch Demo
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
                          src="https://placehold.co/1200x600/10B981/FFFFFF?text=Clean+Air+Sentinel+Hero"
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
        </div>
      </section>

      {/* Features Grid */}
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
              <h3 className="text-xl font-bold text-dark mb-3">AI Deep Learning</h3>
              <p className="text-slate-500 leading-relaxed">Uses YOLOv8 to detect smoke/fire in noisy urban environments.</p>
            </div>
            
            <div className="group bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Real-time Alerts</h3>
              <p className="text-slate-500 leading-relaxed">Instant notifications via Telegram with images.</p>
            </div>
            
            <div className="group bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-green-200 hover:shadow-xl hover:shadow-green-500/5 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                <Server className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">No New Hardware</h3>
              <p className="text-slate-500 leading-relaxed">Works with existing CCTV (RTSP/ONVIF). 100% Software solution.</p>
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
            <div className="hidden md:block absolute top-[2.5rem] left-[16%] right-[16%] h-0.5 bg-slate-200 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {[
                  { id: 1, title: 'Connect Cameras', text: 'Connect existing cameras via RTSP.', icon: <Video className="w-6 h-6 text-blue-600" /> },
                  { id: 2, title: 'AI Analysis', text: 'AI analyzes video stream 24/7.', icon: <Eye className="w-6 h-6 text-primary" /> },
                  { id: 3, title: 'Instant Alert', text: 'Receive instant alerts & evidence on Telegram.', icon: <Zap className="w-6 h-6 text-orange-500" /> }
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

      {/* Pricing Section - Specific Content Updates */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
             <h2 className="text-3xl md:text-4xl font-extrabold text-dark mb-4">Pricing & Packages</h2>
             <p className="text-lg text-slate-500">Flexible options for every scale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             {/* Basic Plan */}
             <div className="p-8 rounded-3xl border border-slate-200 bg-white hover:border-slate-300 transition-colors flex flex-col">
                <h3 className="text-xl font-bold text-slate-900">Basic Plan</h3>
                <p className="text-sm text-slate-500 mb-6">SMEs, Single Factories, Residential Areas</p>
                
                <div className="my-4">
                    <span className="text-2xl font-bold text-slate-900">Affordable</span>
                    <p className="text-xs text-slate-400">Easy to Deploy</p>
                </div>
                
                <div className="mt-4 space-y-4 mb-8 flex-1">
                    <div className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle size={16} className="text-primary"/> <strong>&lt; 50 Cameras</strong></div>
                    <div className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle size={16} className="text-primary"/> Fire/Smoke & Illegal Waste Burning Detection</div>
                    <div className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle size={16} className="text-primary"/> Real-time Telegram Alerts</div>
                    <div className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle size={16} className="text-primary"/> Event Logging & Standard Video Proof Storage</div>
                </div>

                <button className="w-full py-3 bg-green-50 text-green-700 border border-green-200 rounded-xl font-bold hover:bg-green-100 transition-all mt-auto">
                    Start Basic Plan
                </button>
             </div>

             {/* Pro Plan */}
             <div className="p-8 rounded-3xl border-2 border-primary bg-white shadow-2xl relative transform md:-translate-y-4 flex flex-col">
                <div className="absolute top-0 right-0 left-0 bg-primary text-white text-xs font-bold text-center py-2 rounded-t-2xl uppercase tracking-wider">Recommended</div>
                <h3 className="text-xl font-bold text-slate-900 mt-4">Pro Plan</h3>
                <p className="text-sm text-slate-500 mb-6">Industrial Zones, Smart Cities, Major Infrastructure</p>
                
                <div className="my-4">
                    <span className="text-2xl font-bold text-slate-900">Enterprise Pricing</span>
                    <p className="text-xs text-slate-400">For Large Scale & Distributed Architecture</p>
                </div>

                <div className="mt-4 space-y-4 mb-8 flex-1">
                    <div className="flex items-center gap-3 text-sm text-slate-700 font-medium"><CheckCircle size={16} className="text-primary"/> <strong>Unlimited Cameras</strong></div>
                    <div className="flex items-center gap-3 text-sm text-slate-700 font-medium"><CheckCircle size={16} className="text-primary"/> Deep Analytics & Reports (By Area, Time, Risk)</div>
                    <div className="flex items-center gap-3 text-sm text-slate-700 font-medium"><CheckCircle size={16} className="text-primary"/> Custom Dashboard & Multi-channel Alerts</div>
                    <div className="flex items-center gap-3 text-sm text-slate-700 font-medium"><CheckCircle size={16} className="text-primary"/> API Integration (GIS, Urban Management)</div>
                    <div className="flex items-center gap-3 text-sm text-slate-700 font-medium"><CheckCircle size={16} className="text-primary"/> User Role Management (Decentralized)</div>
                </div>
                
                <button className="w-full py-3 bg-primary hover:bg-primaryDark text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/30 mt-auto">
                    Contact Sales for Enterprise
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-dark mb-4">What Our Partners Say</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {[
                    { name: 'Jane Doe', role: 'Mayor, Green City', img: 'https://placehold.co/150x150/e2e8f0/94a3b8?text=Jane', text: "Clean-Air Sentinel has revolutionized how we monitor industrial zones. Response times have dropped by 80%." },
                    { name: 'John Smith', role: 'Head of Environment', img: 'https://placehold.co/150x150/e2e8f0/94a3b8?text=John', text: "The AI detection is incredibly accurate. We've significantly reduced illegal waste burning in just 3 months." }
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
                <h2 className="text-3xl md:text-4xl font-extrabold text-dark mb-4">Meet the Team</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                {[
                    { name: 'Đức Dũng', role: 'Team Lead & AI Architect', img: 'https://placehold.co/300x300/e2e8f0/94a3b8?text=Dung', desc: 'Leading the vision for smart city integration.' },
                    { name: 'Thành Hiệu', role: 'Frontend Engineer & UI/UX', img: 'https://placehold.co/300x300/e2e8f0/94a3b8?text=Hieu', desc: 'Crafting intuitive interfaces for complex data.' },
                    { name: 'Kỳ Duyên', role: 'Backend Developer & Data Analyst', img: 'https://placehold.co/300x300/e2e8f0/94a3b8?text=Duyen', desc: 'Optimizing real-time data processing pipelines.' }
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

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                {/* Contact Text */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-dark mb-6">Ready to Clean Up Your City?</h2>
                    <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                        Join the growing network of smart cities using AI to protect their citizens. Schedule a demo or talk to our experts today.
                    </p>
                    
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                                <Mail className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Email Us</h4>
                                <p className="text-slate-500">support@cleanair.ai</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                                <Phone className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Call Us</h4>
                                <p className="text-slate-500">+1 (555) 123-4567</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                                <MapPinIcon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Visit HQ</h4>
                                <p className="text-slate-500">123 Green Tech Blvd, Silicon Valley, CA</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 lg:p-10">
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                            <input 
                                type="text" 
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" 
                                placeholder="John Doe" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Work Email</label>
                            <input 
                                type="email" 
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" 
                                placeholder="john@company.com" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                            <textarea 
                                rows={4} 
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none" 
                                placeholder="Tell us about your city's needs..."
                            ></textarea>
                        </div>
                        <button className="w-full py-4 bg-primary hover:bg-primaryDark text-white font-bold rounded-xl shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1">
                            <Send size={18} />
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
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
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-primary text-left">Live Monitoring</button></li>
                <li><button onClick={() => scrollToSection('features')} className="hover:text-primary text-left">Incident Reporting</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><button onClick={() => scrollToSection('team')} className="hover:text-primary text-left">About Us</button></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2"><Mail size={16}/> support@cleanair.ai</li>
                <li className="flex items-center gap-2"><Phone size={16}/> +1 (555) 123-4567</li>
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