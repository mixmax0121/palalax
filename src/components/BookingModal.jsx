import React, { useState } from 'react';
import { X, CheckCircle2, Building, Send, Calendar, User, Phone, Mail } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, selectedProperty, onAddBooking }) {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    moveInDate: '',
    note: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onAddBooking) {
      await onAddBooking({
        ...formData,
        propertyTitle: selectedProperty ? selectedProperty.title : 'สอบถามห้องพักทั่วไป (ทุกหมวดหมู่)'
      });
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', phone: '', email: '', moveInDate: '', note: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-lg rounded-3xl border border-emerald-500/30 shadow-2xl overflow-hidden relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-slate-400 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white">ส่งข้อมูลนัดชมห้องเรียบร้อยแล้ว!</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              ขอบคุณที่สนใจนัดชมห้องพักกับ Parallax Space เจ้าหน้าที่ฝ่ายดูแลผู้เช่าจะติดต่อกลับหาคุณภายใน 15 นาที เพื่อยืนยันเวลานัดชมครับ
            </p>
            <button
              onClick={handleReset}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg mt-4"
            >
              ตกลง
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <div className="inline-flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Building className="w-4 h-4" />
                <span>APPOINTMENT FORM</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                {selectedProperty ? `นัดชมห้อง: ${selectedProperty.title}` : 'แบบฟอร์มนัดชมห้อง'}
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                กรอกข้อมูลเพื่อให้ทีมงาน Parallax Space ติดต่อกลับและยืนยันเวลานัดชมห้อง
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-300 font-medium mb-1.5 flex items-center">
                  <User className="w-3.5 h-3.5 text-emerald-400 mr-1.5" /> ชื่อ-นามสกุล ผู้สนใจเช่า *
                </label>
                <input
                  type="text"
                  required
                  placeholder="สมชาย มั่นคง"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1.5 flex items-center">
                    <Phone className="w-3.5 h-3.5 text-emerald-400 mr-1.5" /> เบอร์โทรศัพท์ *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="081-234-5678"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1.5 flex items-center">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400 mr-1.5" /> วันที่พร้อมเข้าอยู่
                  </label>
                  <input
                    type="date"
                    value={formData.moveInDate}
                    onChange={e => setFormData({...formData, moveInDate: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5">หมายเหตุเพิ่มเติม (ถ้ามี)</label>
                <textarea
                  rows="3"
                  placeholder="เช่น มีเลี้ยงสัตว์เลี้ยงเล็ก, ต้องการสัญญาเช่า 1 ปี..."
                  value={formData.note}
                  onChange={e => setFormData({...formData, note: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/30 flex items-center justify-center space-x-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>ยืนยันส่งข้อมูลนัดชมห้อง</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
