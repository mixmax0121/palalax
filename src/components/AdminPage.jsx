import React, { useState } from 'react';
import { ShieldCheck, ArrowLeft, Plus, CheckCircle, Clock, AlertCircle, EyeOff, Trash2, Home, Building2, Layers, DollarSign, User, Phone, Calendar, Mail, Check, MessageSquare } from 'lucide-react';

export default function AdminPage({ 
  properties, 
  onUpdateStatus, 
  onAddProperty, 
  onDeleteProperty, 
  onBackToHome,
  bookings = [],
  onUpdateBookingStatus,
  onDeleteBooking
}) {
  const [activeTab, setActiveTab] = useState('ALL');
  const [updatingId, setUpdatingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'คอนโด',
    location: '',
    price: '',
    bedrooms: 1,
    bathrooms: 1,
    area_sqm: 35,
    image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    is_featured: false,
    near_bts: false,
  });

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    await onUpdateStatus(id, newStatus);
    setTimeout(() => setUpdatingId(null), 300);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location || !formData.price) {
      alert('กรุณากรอกข้อมูลที่จำเป็น (ชื่อห้อง, ทำเล, และราคา) ให้ครบถ้วน');
      return;
    }

    setIsSubmitting(true);
    await onAddProperty({
      ...formData,
      price: Number(formData.price),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      area_sqm: Number(formData.area_sqm),
      status: 'available'
    });
    setIsSubmitting(false);
    setShowAddForm(false);
    
    // Reset form
    setFormData({
      title: '',
      category: 'คอนโด',
      location: '',
      price: '',
      bedrooms: 1,
      bathrooms: 1,
      area_sqm: 35,
      image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      is_featured: false,
      near_bts: false,
    });
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    await onDeleteProperty(id);
    setDeletingId(null);
    setConfirmDeleteId(null);
  };

  const filteredProperties = activeTab === 'ALL' 
    ? properties 
    : properties.filter(p => p.status === activeTab);

  const availableCount = properties.filter(p => p.status === 'available').length;
  const reservedCount = properties.filter(p => p.status === 'reserved').length;
  const rentedCount = properties.filter(p => p.status === 'rented').length;
  const archivedCount = properties.filter(p => p.status === 'archived').length;
  const pendingBookingsCount = bookings.filter(b => b.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-white tracking-tight">ระบบหลังบ้านผู้ดูแลระบบ</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Admin Dashboard Mode
                </span>
              </div>
              <p className="text-xs text-slate-400">
                จัดการห้องพัก เช็ครายการนัดหมายเข้าชม ดูข้อมูลลูกค้าที่จองห้องเข้ามาได้แบบ Real-time
              </p>
            </div>
          </div>

          <button
            onClick={onBackToHome}
            className="px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center space-x-2 transition-all border border-slate-700 shadow-md active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับหน้าหลักเว็บไซต์</span>
          </button>
        </div>
      </header>

      {/* Main Admin Dashboard Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="glass-card p-5 rounded-2xl border border-teal-500/30 bg-teal-950/20 flex items-center justify-between col-span-2 md:col-span-1">
            <div>
              <p className="text-xs font-semibold text-teal-400">นัดชมห้องใหม่</p>
              <h3 className="text-2xl font-bold text-teal-300 mt-1">{pendingBookingsCount} <span className="text-xs font-normal text-teal-400/70">รายการ</span></h3>
            </div>
            <div className="p-3 bg-teal-500/20 text-teal-400 rounded-xl border border-teal-500/30">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/50 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400">อสังหาฯ ทั้งหมด</p>
              <h3 className="text-2xl font-bold text-white mt-1">{properties.length} <span className="text-xs font-normal text-slate-400">รายการ</span></h3>
            </div>
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
              <Building2 className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-400">ว่างพร้อมเช่า</p>
              <h3 className="text-2xl font-bold text-emerald-300 mt-1">{availableCount} <span className="text-xs font-normal text-emerald-400/70">ห้อง</span></h3>
            </div>
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-amber-500/20 bg-amber-950/10 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-400">ติดจอง</p>
              <h3 className="text-2xl font-bold text-amber-300 mt-1">{reservedCount} <span className="text-xs font-normal text-amber-400/70">ห้อง</span></h3>
            </div>
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-rose-500/20 bg-rose-950/10 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-rose-400">ปล่อยแล้ว</p>
              <h3 className="text-2xl font-bold text-rose-300 mt-1">{rentedCount} <span className="text-xs font-normal text-rose-400/70">ห้อง</span></h3>
            </div>
            <div className="p-3 bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/30">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* BOOKINGS SECTION: Customer Reservation Requests */}
        <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-teal-500/30 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>📩 รายการนัดชมห้องพัก & จองล่าสุดจากลูกค้า</span>
                  {pendingBookingsCount > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500 text-white animate-pulse">
                      {pendingBookingsCount} รายการใหม่
                    </span>
                  )}
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                รายชื่อและเบอร์โทรศัพท์ของผู้สนใจที่กรอกฟอร์มจองนัดชมห้องพักเข้ามาผ่านทางหน้าเว็บไซต์
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {bookings.length > 0 ? (
              bookings.map((b) => (
                <div key={b.id} className={`p-5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
                  b.status === 'pending' 
                    ? 'bg-slate-950/90 border-teal-500/40 ring-1 ring-teal-500/20' 
                    : 'bg-slate-950/40 border-slate-800 opacity-80'
                }`}>
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${
                        b.status === 'pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {b.status === 'pending' ? '⏳ รอนัดหมาย/ติดต่อกลับ' : '✅ ติดต่อเรียบร้อยแล้ว'}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" /> {b.createdAt}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <User className="w-4 h-4 text-teal-400" />
                      <span>{b.name}</span>
                      <a href={`tel:${b.phone}`} className="text-xs font-bold text-teal-400 hover:underline flex items-center gap-1 ml-2 bg-teal-500/10 px-2.5 py-1 rounded-lg border border-teal-500/20">
                        <Phone className="w-3.5 h-3.5" /> {b.phone}
                      </a>
                    </h4>

                    <p className="text-xs text-slate-300 font-medium">
                      🏢 ห้องที่สนใจนัดชม: <span className="text-emerald-400 font-bold">{b.propertyTitle}</span>
                    </p>

                    {b.moveInDate && (
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" /> วันที่พร้อมเข้าอยู่ประมาณ: <span className="text-slate-200 font-semibold">{b.moveInDate}</span>
                      </p>
                    )}

                    {b.note && (
                      <div className="text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 mt-1 italic">
                        " {b.note} "
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                    {b.status === 'pending' ? (
                      <button
                        onClick={() => onUpdateBookingStatus && onUpdateBookingStatus(b.id, 'contacted')}
                        className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-1.5"
                      >
                        <Check className="w-4 h-4" />
                        <span>ทําเครื่องหมาย: ติดต่อแล้ว</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onUpdateBookingStatus && onUpdateBookingStatus(b.id, 'pending')}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl font-semibold"
                      >
                        เปลี่ยนเป็นรอนัดหมาย
                      </button>
                    )}

                    <button
                      onClick={() => onDeleteBooking && onDeleteBooking(b.id)}
                      title="ลบรายการนัดหมายนี้"
                      className="p-2.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors border border-transparent hover:border-rose-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 bg-slate-950/40 rounded-2xl border border-slate-800 text-slate-400 text-xs">
                ยังไม่มีรายการนัดชมห้องพักเข้ามาในขณะนี้
              </div>
            )}
          </div>
        </div>

        {/* Action Header & Add Form Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>จัดการรายการโพสต์ห้องพัก</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              คลิกเพื่อเพิ่มโพสต์ใหม่ ปรับเปลี่ยนสถานะห้องแบบ Real-time หรือลบโพสต์ที่ไม่ใช้งานแล้ว
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold rounded-2xl text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex-shrink-0"
          >
            <Plus className="w-5 h-5" />
            <span>{showAddForm ? 'ปิดฟอร์มเพิ่มห้องพัก' : '+ ลงประกาศเพิ่มห้องพักใหม่'}</span>
          </button>
        </div>

        {/* Add New Property Form Panel */}
        {showAddForm && (
          <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-emerald-500/40 shadow-2xl animate-fade-in space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-emerald-400 flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>ลงประกาศเพิ่มห้องพักใหม่ลงระบบ</span>
              </h3>
              <span className="text-xs text-slate-400">* กรอกข้อมูลเพื่อเปิดให้เช่าทันที</span>
            </div>

            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">ชื่ออสังหาริมทรัพย์ / ห้องพัก *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น Ashton Asoke Modern Luxury Suite"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">หมวดหมู่ *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="คอนโด">คอนโด</option>
                  <option value="บ้านเดี่ยว">บ้านเดี่ยว</option>
                  <option value="ทาวน์โฮม">ทาวน์โฮม</option>
                  <option value="ที่ดิน">ที่ดิน</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">ทำเล / ตำแหน่ง *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น สุขุมวิท - อโศก (ติด BTS อโศก / MRT สุขุมวิท)"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">ราคาเช่า (บาท/เดือน) *</label>
                <input
                  type="number"
                  required
                  placeholder="35000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">จำนวนห้องนอน</label>
                <input
                  type="number"
                  min="0"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">จำนวนห้องน้ำ</label>
                <input
                  type="number"
                  min="0"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">พื้นที่ (ตร.ม.)</label>
                <input
                  type="number"
                  min="0"
                  value={formData.area_sqm}
                  onChange={(e) => setFormData({ ...formData, area_sqm: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">รูปภาพ URL</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="md:col-span-3 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <div className="flex flex-wrap items-center gap-6">
                  <label className="flex items-center space-x-2.5 text-xs text-slate-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.near_bts}
                      onChange={(e) => setFormData({ ...formData, near_bts: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 bg-slate-950"
                    />
                    <span>ติด / ใกล้รถไฟฟ้า BTS/MRT</span>
                  </label>

                  <label className="flex items-center space-x-2.5 text-xs text-slate-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-500 bg-slate-950"
                    />
                    <span>แสดงในแถบห้องแนะนำประจำเดือน</span>
                  </label>
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-emerald-500/20"
                  >
                    {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกห้องพักลงระบบ'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Status Filter Tabs */}
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 overflow-x-auto py-1 w-full sm:w-auto">
            {[
              { label: 'ทั้งหมด', value: 'ALL', count: properties.length },
              { label: 'ว่าง (Available)', value: 'available', count: availableCount },
              { label: 'ติดจอง (Reserved)', value: 'reserved', count: reservedCount },
              { label: 'ปล่อยแล้ว (Rented)', value: 'rented', count: rentedCount },
              { label: 'ซ่อนอยู่ (Archived)', value: 'archived', count: archivedCount },
            ].map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.value
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400">
            แสดงผลตามสถานะห้องพัก
          </span>
        </div>

        {/* Property Cards Table */}
        <div className="space-y-4">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((prop) => (
              <div
                key={prop.id}
                className="glass-card p-5 rounded-3xl border border-slate-800 bg-slate-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-slate-700 transition-all shadow-lg"
              >
                {/* Property Info */}
                <div className="flex items-center space-x-5">
                  <img
                    src={prop.image_url}
                    alt={prop.title}
                    className="w-20 h-20 rounded-2xl object-cover border border-slate-700 flex-shrink-0 shadow-md"
                  />
                  <div>
                    <div className="flex items-center space-x-2.5">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-slate-800 text-emerald-400 border border-slate-700">
                        {prop.category}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">ID: {prop.id}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mt-1">{prop.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {prop.location} • <span className="text-emerald-400 font-bold text-sm">฿{prop.price.toLocaleString()}</span>/เดือน
                    </p>
                  </div>
                </div>

                {/* Property Actions: Status Toggle & Delete */}
                <div className="flex flex-col md:flex-row items-end md:items-center space-y-3 md:space-y-0 md:space-x-4 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-800">
                  
                  <div className="flex flex-col items-end space-y-1.5 w-full md:w-auto">
                    <span className="text-[11px] text-slate-400 font-medium">กดเพื่อเปลี่ยนสถานะ:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full md:w-auto">
                      
                      {/* Available */}
                      <button
                        onClick={() => handleStatusChange(prop.id, 'available')}
                        disabled={updatingId === prop.id}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 border ${
                          prop.status === 'available'
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 ring-2 ring-emerald-400/30 shadow-md'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-emerald-300 hover:bg-slate-750'
                        }`}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>ว่าง</span>
                      </button>

                      {/* Reserved */}
                      <button
                        onClick={() => handleStatusChange(prop.id, 'reserved')}
                        disabled={updatingId === prop.id}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 border ${
                          prop.status === 'reserved'
                            ? 'bg-amber-500 text-slate-950 border-amber-400 ring-2 ring-amber-400/30 shadow-md'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-amber-300 hover:bg-slate-750'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>ติดจอง</span>
                      </button>

                      {/* Rented */}
                      <button
                        onClick={() => handleStatusChange(prop.id, 'rented')}
                        disabled={updatingId === prop.id}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 border ${
                          prop.status === 'rented'
                            ? 'bg-rose-500 text-white border-rose-400 ring-2 ring-rose-400/30 shadow-md'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-rose-300 hover:bg-slate-750'
                        }`}
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>ปล่อยแล้ว</span>
                      </button>

                      {/* Archived */}
                      <button
                        onClick={() => handleStatusChange(prop.id, 'archived')}
                        disabled={updatingId === prop.id}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 border ${
                          prop.status === 'archived'
                            ? 'bg-slate-700 text-slate-200 border-slate-600 ring-2 ring-slate-500/30 shadow-md'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200 hover:bg-slate-750'
                        }`}
                      >
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>ซ่อน</span>
                      </button>

                    </div>
                  </div>

                  {/* Delete Post Button */}
                  <div className="pt-2 md:pt-0 md:pl-3 border-t md:border-t-0 md:border-l border-slate-800 flex items-center">
                    {confirmDeleteId === prop.id ? (
                      <div className="flex items-center space-x-2 animate-fade-in">
                        <button
                          onClick={() => handleDelete(prop.id)}
                          disabled={deletingId === prop.id}
                          className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl border border-rose-500 shadow-md"
                        >
                          {deletingId === prop.id ? 'กำลังลบ...' : 'ยืนยันลบโพสต์'}
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-2.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl"
                        >
                          ยกเลิก
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(prop.id)}
                        title="ลบโพสต์ห้องนี้"
                        className="p-2.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors border border-transparent hover:border-rose-500/20 flex items-center space-x-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-xs font-semibold md:hidden">ลบโพสต์</span>
                      </button>
                    )}
                  </div>

                </div>

              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 text-slate-400 text-sm">
              ไม่พบรายการอสังหาริมทรัพย์ในหมวดหมู่นี้
            </div>
          )}
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 px-6 text-center text-xs text-slate-500">
        Parallax Space Admin Panel • ระบบบริหารจัดการอสังหาริมทรัพย์หลังบ้าน
      </footer>

    </div>
  );
}
