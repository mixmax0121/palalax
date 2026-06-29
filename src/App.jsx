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
    setIsAdminMode(true);
    setViewMode('ADMIN');
  };

  // Render Full Admin Page View when viewMode is 'ADMIN'
  if (viewMode === 'ADMIN') {
    return (
      <AdminPage
        properties={properties}
        onUpdateStatus={handleUpdateStatus}
        onAddProperty={handleAddProperty}
        onDeleteProperty={handleDeleteProperty}
        onBackToHome={() => setViewMode('HOME')}
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

    </div>
  );
}
