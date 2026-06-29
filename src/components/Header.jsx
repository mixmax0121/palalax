import React, { useState } from 'react';
import { Building2, ShieldCheck, CheckCircle, Menu, X } from 'lucide-react';

export default function Header({ 
  activeCategory, 
  setActiveCategory, 
  onOpenBooking, 
  isAdminMode, 
  onOpenAdmin,
  showOnlyAvailable,
  setShowOnlyAvailable,
  showAdminEntry = false
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'หน้าแรก', value: 'ALL' },
    { label: 'บ้านเดี่ยว', value: 'บ้านเดี่ยว' },
    { label: 'คอนโด', value: 'คอนโด' },
    { label: 'ทาวน์โฮม', value: 'ทาวน์โฮม' },
  ];

  const handleNavClick = (value) => {
    setActiveCategory(value);
    setMobileMenuOpen(false);
  };

  const handleStatusCheckClick = () => {
    setShowOnlyAvailable(!showOnlyAvailable);
    setMobileMenuOpen(false);
    const el = document.getElementById('property-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('ALL')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#d97736] to-[#c46425] flex items-center justify-center text-white font-bold text-lg shadow-md shadow-[#d97736]/20 group-hover:scale-105 transition-transform">
            PS
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-[#222222]">
              Parallax<span className="font-light text-[#666666]">Space</span>
            </span>
            <p className="text-[10px] text-gray-400 font-medium tracking-wider -mt-1 uppercase">Real Estate Rental</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNavClick(item.value)}
              className={`transition-colors relative py-1 ${
                activeCategory === item.value
                  ? 'text-[#d97736] font-bold'
                  : 'text-[#444444] hover:text-[#d97736]'
              }`}
            >
              {item.label}
              {activeCategory === item.value && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#d97736] rounded-full" />
              )}
            </button>
          ))}

          {/* Quick Filter: Available Only */}
          <button
            onClick={handleStatusCheckClick}
            className={`flex items-center space-x-1.5 transition-colors ${
              showOnlyAvailable ? 'text-emerald-600 font-bold' : 'text-[#d97736] hover:underline font-semibold'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>สถานะห้องว่าง</span>
          </button>
        </nav>

        {/* Right Action Area */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Admin Toggle Switcher (Shown only if authorized entry) */}
          {(showAdminEntry || isAdminMode) && (
            <button
              onClick={onOpenAdmin}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                isAdminMode
                  ? 'bg-amber-100 text-amber-800 border-amber-300 shadow-sm'
                  : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
              }`}
            >
              {isAdminMode ? '🛡️ เปิดระบบหลังบ้าน (Admin)' : 'โหมด Admin'}
            </button>
          )}

          {/* ปุ่ม ติดต่อสอบถาม */}
          <button
            onClick={onOpenBooking}
            className="px-6 py-2.5 rounded-full bg-[#d97736] hover:bg-[#c46425] text-white font-medium text-sm transition-all shadow-md shadow-[#d97736]/20"
          >
            ติดต่อสอบถาม
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-2">
          {(showAdminEntry || isAdminMode) && (
            <button
              onClick={onOpenAdmin}
              className={`p-2 rounded-lg text-xs border ${
                isAdminMode ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-gray-600 hover:text-black bg-gray-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`py-2 px-3 rounded-lg text-sm text-left font-medium ${
                  activeCategory === item.value ? 'bg-[#d97736] text-white font-bold' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleStatusCheckClick}
            className="w-full py-2.5 px-4 rounded-lg bg-emerald-50 text-emerald-700 font-medium flex items-center justify-center space-x-2"
          >
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>เช็คสถานะห้องว่าง (Real-time)</span>
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
            className="w-full py-3 rounded-full bg-[#d97736] text-white font-bold text-center shadow-md"
          >
            ติดต่อสอบถาม
          </button>
        </div>
      )}
    </header>
  );
}
