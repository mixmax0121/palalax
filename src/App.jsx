import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HighlightedCards from './components/HighlightedCards';
import PropertyFilter from './components/PropertyFilter';
import PropertyGrid from './components/PropertyGrid';
import FeaturedMonth from './components/FeaturedMonth';
import AdminPage from './components/AdminPage';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';
import { 
  getProperties, 
  updatePropertyStatus, 
  addProperty, 
  deleteProperty,
  getBookings,
  addBooking,
  updateBookingStatus,
  deleteBooking 
} from './lib/supabaseClient';

export default function App() {
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // View mode state: 'HOME' or 'ADMIN'
  const [viewMode, setViewMode] = useState('HOME');

  // Filtering states
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilters, setStatusFilters] = useState({
    available: false,
    reserved: false,
    rented: false,
  });
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [filterBts, setFilterBts] = useState(false);

  // Admin and Modal states
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Security and entry parameters
  const [showAdminEntry, setShowAdminEntry] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      localStorage.setItem('parallax_space_admin_entry', 'true');
      return true;
    }
    return localStorage.getItem('parallax_space_admin_entry') === 'true';
  });

  const [isAdminAuthorized, setIsAdminAuthorized] = useState(() => {
    return localStorage.getItem('parallax_space_admin_authorized') === 'true';
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');


  // Load properties and bookings on component mount
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const propsData = await getProperties();
      const booksData = await getBookings();
      setProperties(propsData);
      setBookings(booksData);
      setLoading(false);
    }
    loadData();
  }, []);

  // Handler for Updating Property Status
  const handleUpdateStatus = async (id, newStatus) => {
    const updated = properties.map(p => p.id === id ? { ...p, status: newStatus } : p);
    setProperties(updated);
    localStorage.setItem('parallax_space_properties', JSON.stringify(updated));
    await updatePropertyStatus(id, newStatus);
  };

  // Handler for Adding New Property
  const handleAddProperty = async (newPropData) => {
    const res = await addProperty(newPropData);
    const addedItem = res.data || { ...newPropData, id: `prop-${Date.now()}` };
    const updated = [addedItem, ...properties];
    setProperties(updated);
    localStorage.setItem('parallax_space_properties', JSON.stringify(updated));
  };

  // Handler for Deleting Property
  const handleDeleteProperty = async (id) => {
    await deleteProperty(id);
    const updated = properties.filter(p => p.id !== id);
    setProperties(updated);
    localStorage.setItem('parallax_space_properties', JSON.stringify(updated));
  };

  // Handlers for Booking Management
  const handleAddBooking = async (bookingData) => {
    const res = await addBooking(bookingData);
    if (res.data) {
      setBookings(prev => [res.data, ...prev]);
    }
  };

  const handleUpdateBookingStatus = async (id, newStatus) => {
    await updateBookingStatus(id, newStatus);
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const handleDeleteBooking = async (id) => {
    await deleteBooking(id);
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  // Reset all filters
  const handleResetFilters = () => {
    setActiveCategory('ALL');
    setSearchTerm('');
    setStatusFilters({ available: false, reserved: false, rented: false });
    setShowOnlyAvailable(false);
    setFilterBts(false);
  };

  // Filter properties based on active filters
  const filteredProperties = properties.filter(prop => {
    if (prop.status === 'archived' && !isAdminMode && viewMode !== 'ADMIN') {
      return false;
    }

    if (activeCategory !== 'ALL' && prop.category !== activeCategory) {
      return false;
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchTitle = prop.title.toLowerCase().includes(term);
      const matchLoc = prop.location.toLowerCase().includes(term);
      if (!matchTitle && !matchLoc) return false;
    }

    if (showOnlyAvailable) {
      if (prop.status !== 'available') return false;
    } else {
      const activeStatusKeys = Object.keys(statusFilters).filter(k => statusFilters[k]);
      if (activeStatusKeys.length > 0) {
        if (!activeStatusKeys.includes(prop.status)) return false;
      }
    }

    if (filterBts && !prop.near_bts) {
      return false;
    }

    return true;
  });

  const handleOpenBookingForProperty = (prop) => {
    setSelectedProperty(prop);
    setIsBookingOpen(true);
  };

  const handleOpenGeneralBooking = () => {
    setSelectedProperty(null);
    setIsBookingOpen(true);
  };

  const handleOpenAdmin = () => {
    if (isAdminAuthorized) {
      setIsAdminMode(true);
      setViewMode('ADMIN');
    } else {
      setShowPasswordModal(true);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Default secret password is "parallax1234"
    if (passwordInput === 'parallax1234') {
      setIsAdminAuthorized(true);
      localStorage.setItem('parallax_space_admin_authorized', 'true');
      setIsAdminMode(true);
      setViewMode('ADMIN');
      setShowPasswordModal(false);
      setPasswordError('');
      setPasswordInput('');
    } else {
      setPasswordError('รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthorized(false);
    setIsAdminMode(false);
    localStorage.removeItem('parallax_space_admin_authorized');
    setViewMode('HOME');
  };

  // Render Full Admin Page View when viewMode is 'ADMIN'
  if (viewMode === 'ADMIN') {
    return (
      <AdminPage
        properties={properties}
        onUpdateStatus={handleUpdateStatus}
        onAddProperty={handleAddProperty}
        onDeleteProperty={handleDeleteProperty}
        onBackToHome={() => {
          setIsAdminMode(false); // Reset toggle style
          setViewMode('HOME');
        }}
        bookings={bookings}
        onUpdateBookingStatus={handleUpdateBookingStatus}
        onDeleteBooking={handleDeleteBooking}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-[#222222] flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Header Navigation */}
      <Header
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onOpenBooking={handleOpenGeneralBooking}
        isAdminMode={isAdminMode}
        onOpenAdmin={handleOpenAdmin}
        showOnlyAvailable={showOnlyAvailable}
        setShowOnlyAvailable={setShowOnlyAvailable}
        showAdminEntry={showAdminEntry}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Hero Banner Section */}
        <Hero
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearchSubmit={() => {
            const el = document.getElementById('property-grid');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3 Highlighted Feature Cards */}
        <HighlightedCards
          showOnlyAvailable={showOnlyAvailable}
          setShowOnlyAvailable={setShowOnlyAvailable}
          filterBts={filterBts}
          setFilterBts={setFilterBts}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Property Filter Bar & Grid Showcase */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PropertyFilter
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            statusFilters={statusFilters}
            setStatusFilters={setStatusFilters}
            filterBts={filterBts}
            setFilterBts={setFilterBts}
            onResetFilters={handleResetFilters}
            totalResultsCount={filteredProperties.length}
          />
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-400 font-medium animate-pulse">
            กำลังโหลดข้อมูลอสังหาริมทรัพย์จาก Supabase...
          </div>
        ) : (
          <PropertyGrid
            properties={filteredProperties}
            onSelectProperty={handleOpenBookingForProperty}
            isAdminMode={isAdminMode}
            onUpdateStatus={handleUpdateStatus}
          />
        )}

        {/* Bottom Showcase: Popular Rooms of the Month */}
        <FeaturedMonth
          properties={properties}
          onSelectProperty={handleOpenBookingForProperty}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Dialog Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedProperty={selectedProperty}
        onAddBooking={handleAddBooking}
      />

      {/* Admin Password Authentication Lock Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-8 max-w-md w-full text-white space-y-6 relative shadow-2xl">
            <button 
              onClick={() => { setShowPasswordModal(false); setPasswordError(''); setPasswordInput(''); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold text-lg"
            >
              ✕
            </button>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center border border-amber-500/30">
                🔒
              </div>
              <h3 className="text-xl font-bold text-white">ยืนยันรหัสผ่านผู้ดูแลระบบ</h3>
              <p className="text-xs text-slate-400">ระบุรหัสผ่านลับของคุณเพื่อปลดล็อกหน้าระบบหลังบ้าน</p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1.5 font-medium">รหัสผ่านลับแอดมิน *</label>
                <input
                  type="password"
                  required
                  placeholder="กรอกรหัสผ่านลับแอดมิน..."
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500"
                />
                {passwordError && <p className="text-rose-400 text-xs mt-1.5 font-medium">⚠️ {passwordError}</p>}
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowPasswordModal(false); setPasswordError(''); setPasswordInput(''); }}
                  className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg"
                >
                  เข้าสู่ระบบหลังบ้าน
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
