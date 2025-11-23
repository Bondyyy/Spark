import React from 'react';
import { ShieldCheck, Zap, Server, Eye, CheckCircle, ArrowRight, PlayCircle } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-lg">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                CLEAN-AIR <span className="text-primary">SENTINEL</span>
              </span>
            </div>
            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
              <a href="#features" className="hover:text-primary transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
              <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
            </div>
            <button
              onClick={onLogin}
              className="bg-primary hover:bg-primaryDark text-white px-5 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Access Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            New: YOLOv8 Integration Live
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            AI-Powered Illegal <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-700">
              Waste Burning Detection
            </span>
          </h1>
          
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">
            Protecting Urban Air Quality with Real-time Monitoring & Instant Telegram Alerts.
            Identify pollution sources instantly without new hardware.
          </p>
          
          <div className="mt-10 flex justify-center gap-4">
            <button 
              onClick={onLogin}
              className="px-8 py-4 bg-primary hover:bg-primaryDark text-white font-bold rounded-lg shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white hover:bg-gray-50 text-slate-700 font-semibold rounded-lg border border-gray-200 shadow-sm transition-all flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-gray-400" />
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Why Clean-Air Sentinel?</h2>
            <p className="mt-4 text-slate-500">Advanced technology meeting critical environmental needs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Deep Learning</h3>
              <p className="text-slate-500">Uses YOLOv8 to detect smoke/fire in noisy urban environments with 99% accuracy, filtering out fog and steam.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-time Alerts</h3>
              <p className="text-slate-500">Instant notifications via Telegram with high-res image evidence, location tagging, and confidence scores.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                <Server className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">No New Hardware</h3>
              <p className="text-slate-500">100% Software solution. Connects seamlessly with existing RTSP/ONVIF city surveillance cameras.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
          </div>
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              <div className="bg-white p-6 text-center">
                <div className="w-16 h-16 mx-auto bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg mb-6">1</div>
                <h3 className="text-lg font-bold mb-2">Connect Cameras</h3>
                <p className="text-sm text-slate-500">Link existing RTSP streams to our secure local gateway.</p>
              </div>
              <div className="bg-white p-6 text-center">
                <div className="w-16 h-16 mx-auto bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg mb-6">2</div>
                <h3 className="text-lg font-bold mb-2">AI Analysis</h3>
                <p className="text-sm text-slate-500">Deep learning algorithms process video feeds 24/7 for smoke patterns.</p>
              </div>
              <div className="bg-white p-6 text-center">
                <div className="w-16 h-16 mx-auto bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg mb-6">3</div>
                <h3 className="text-lg font-bold mb-2">Receive Alerts</h3>
                <p className="text-sm text-slate-500">Authorities receive instant verified alerts to dispatch response teams.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-slate-400">Choose the plan that fits your monitoring scale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-primary transition-colors">
              <h3 className="text-2xl font-bold mb-2">Basic</h3>
              <p className="text-slate-400 mb-6">For SMEs & Small Residential Areas</p>
              <div className="text-4xl font-bold mb-6">$49<span className="text-lg text-slate-500 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary"/> Up to 10 Cameras</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary"/> standard Detection Speed</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary"/> Email Support</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary"/> 7-day Archive</li>
              </ul>
              <button className="w-full py-3 rounded-lg border border-slate-600 hover:bg-slate-700 font-medium transition-colors">
                Start Free Trial
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-primaryDark to-emerald-900 rounded-2xl p-8 border border-primary/30 relative overflow-hidden">
               <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">POPULAR</div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-emerald-100 mb-6">For Industrial Zones & Cities</p>
              <div className="text-4xl font-bold mb-6">$199<span className="text-lg text-emerald-200 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-300"/> Unlimited Cameras</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-300"/> Real-time Telegram Alerts</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-300"/> 24/7 Priority Support</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-300"/> Advanced Analytics & API</li>
              </ul>
              <button className="w-full py-3 rounded-lg bg-white text-emerald-900 hover:bg-emerald-50 font-bold transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-slate-400" />
            <span className="font-semibold text-slate-700">CLEAN-AIR SENTINEL</span>
          </div>
          <p className="text-slate-500 text-sm">© 2024 Clean-Air Sentinel. All rights reserved.</p>
          <div className="flex gap-6 text-slate-500">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;