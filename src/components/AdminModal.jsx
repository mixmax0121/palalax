import React, { useState } from 'react';
import { ShieldCheck, X, RefreshCw, CheckCircle, Clock, AlertCircle, EyeOff, Plus, Check, Trash2, Home, Building } from 'lucide-react';

export default function AdminModal({ isOpen, onClose, properties, onUpdateStatus, onAddProperty, onDeleteProperty }) {
  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-5xl rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                ระบบหลังบ้านผู้ดูแลระบบ (Admin Panel)
              </h2>
              <p className="text-xs text-amber-300/80">
                เพิ่มห้องพักใหม่ ปรับเปลี่ยนสถานะ หรือลบโพสต์อสังหาริมทรัพย์ที่ปล่อยแล้ว
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold rounded-xl text-sm flex items-center space-x-1.5 shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>{showAddForm ? 'ซ่อนฟอร์ม' : 'เพิ่มห้องพักใหม่'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Add New Property Form Modal/Panel */}
        {showAddForm && (
          <div className="bg-slate-900/90 p-6 border-b border-amber-500/30 animate-fade-in">
            <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>ลงประกาศเพิ่มห้องพักใหม่</span>
            </h3>
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">ชื่ออสังหาริมทรัพย์ / ห้องพัก *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น Ashton Asoke Modern Luxury Suite"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">หมวดหมู่ *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="คอนโด">คอนโด</option>
                  <option value="บ้านเดี่ยว">บ้านเดี่ยว</option>
                  <option value="ทาวน์โฮม">ทาวน์โฮม</option>
                  <option value="ที่ดิน">ที่ดิน</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">ทำเล / ตำแหน่ง *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น สุขุมวิท - อโศก (ติด BTS อโศก)"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">ราคาเช่า (บาท/เดือน) *</label>
                <input
                  type="number"
                  required
                  placeholder="35000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">จำนวนห้องนอน</label>
                <input
                  type="number"
                  min="0"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">จำนวนห้องน้ำ</label>
                <input
                  type="number"
                  min="0"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">พื้นที่ (ตร.ม.)</label>
                <input
                  type="number"
                  min="0"
                  value={formData.area_sqm}
                  onChange={(e) => setFormData({ ...formData, area_sqm: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-semibold text-slate-300 mb-1">รูปภาพ URL</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="md:col-span-3 flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.near_bts}
                      onChange={(e) => setFormData({ ...formData, near_bts: e.target.checked })}
                      className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>ติด / ใกล้รถไฟฟ้า BTS/MRT</span>
                  </label>

                  <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="rounded border-slate-700 text-amber-500 focus:ring-amber-500"
                    />
                    <span>แสดงในแถบห้องแนะนำประจำเดือน</span>
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all"
                  >
                    {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกห้องพักลงระบบ'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Admin Filters & Status Tabs */}
        <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 overflow-x-auto py-1">
            {[
              { label: 'ทั้งหมด', value: 'ALL', count: properties.length },
              { label: 'ว่าง (Available)', value: 'available', count: properties.filter(p => p.status === 'available').length },
              { label: 'ติดจอง (Reserved)', value: 'reserved', count: properties.filter(p => p.status === 'reserved').length },
              { label: 'ปล่อยแล้ว (Rented)', value: 'rented', count: properties.filter(p => p.status === 'rented').length },
              { label: 'ซ่อนอยู่ (Archived)', value: 'archived', count: properties.filter(p => p.status === 'archived').length },
            ].map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.value
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-400">
            * สามารถกดปรับสถานะ หรือกดลบโพสต์ห้องที่หมดสัญญาได้ทันที
          </div>
        </div>

        {/* Property List Table */}
        <div className="overflow-y-auto p-6 flex-1 space-y-3">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((prop) => (
              <div
                key={prop.id}
                className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-slate-700"
              >
                {/* Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={prop.image_url}
                    alt={prop.title}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-700 flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-emerald-400">
                        {prop.category}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">ID: {prop.id}</span>
                    </div>
                    <h4 className="text-base font-bold text-white mt-0.5">{prop.title}</h4>
                    <p className="text-xs text-slate-400">
                      {prop.location} • <span className="text-white font-semibold">฿{prop.price.toLocaleString()}</span>/เดือน
                    </p>
                  </div>
                </div>

                {/* Actions: Status & Delete */}
                <div className="flex flex-col md:flex-row items-end md:items-center space-y-2 md:space-y-0 md:space-x-3 w-full md:w-auto">
                  <div className="flex flex-col items-end space-y-1.5 w-full md:w-auto">
                    <span className="text-[11px] text-slate-400">เปลี่ยนสถานะ:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 w-full md:w-auto">
                      
                      {/* Available */}
                      <button
                        onClick={() => handleStatusChange(prop.id, 'available')}
                        disabled={updatingId === prop.id}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 border ${
                          prop.status === 'available'
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 ring-2 ring-emerald-400/30 shadow-md'
                            : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-emerald-300 hover:bg-slate-800'
                        }`}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>ว่าง</span>
                      </button>

                      {/* Reserved */}
                      <button
                        onClick={() => handleStatusChange(prop.id, 'reserved')}
                        disabled={updatingId === prop.id}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 border ${
                          prop.status === 'reserved'
                            ? 'bg-amber-500 text-slate-950 border-amber-400 ring-2 ring-amber-400/30 shadow-md'
                            : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-amber-300 hover:bg-slate-800'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>ติดจอง</span>
                      </button>

                      {/* Rented */}
                      <button
                        onClick={() => handleStatusChange(prop.id, 'rented')}
                        disabled={updatingId === prop.id}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 border ${
                          prop.status === 'rented'
                            ? 'bg-rose-500 text-white border-rose-400 ring-2 ring-rose-400/30 shadow-md'
                            : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-rose-300 hover:bg-slate-800'
                        }`}
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>ปล่อยแล้ว</span>
                      </button>

                      {/* Archived */}
                      <button
                        onClick={() => handleStatusChange(prop.id, 'archived')}
                        disabled={updatingId === prop.id}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 border ${
                          prop.status === 'archived'
                            ? 'bg-slate-700 text-slate-200 border-slate-600 ring-2 ring-slate-500/30 shadow-md'
                            : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>ซ่อน</span>
                      </button>

                    </div>
                  </div>

                  {/* Delete Button / Confirmation */}
                  <div className="pt-2 md:pt-0 md:pl-2 border-t md:border-t-0 md:border-l border-slate-800 flex items-center">
                    {confirmDeleteId === prop.id ? (
                      <div className="flex items-center space-x-1 animate-fade-in">
                        <button
                          onClick={() => handleDelete(prop.id)}
                          disabled={deletingId === prop.id}
                          className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl border border-rose-500"
                        >
                          {deletingId === prop.id ? 'กำลังลบ...' : 'ยืนยันลบ'}
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs rounded-xl"
                        >
                          ยกเลิก
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(prop.id)}
                        title="ลบโพสต์ห้องนี้"
                        className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors border border-transparent hover:border-rose-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                </div>

              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-400 text-sm">
              ไม่พบรายการอสังหาริมทรัพย์ในหมวดหมู่นี้
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>* โหมดแอดมินช่วยให้คุณจัดการห้องพัก เพิ่ม หรือลบข้อมูลได้อย่างสะดวก</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors"
          >
            ปิดหน้าแอดมิน
          </button>
        </div>

      </div>
    </div>
  );
}
