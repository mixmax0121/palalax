import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HighlightedCards({ 
  showOnlyAvailable, 
  setShowOnlyAvailable, 
  filterBts, 
  setFilterBts,
  activeCategory,
  setActiveCategory
}) {

  const handleCardClick = (type) => {
    const gridEl = document.getElementById('property-grid');
    if (type === 'available') {
      setShowOnlyAvailable(!showOnlyAvailable);
    } else if (type === 'bts') {
      setFilterBts(!filterBts);
    } else if (type === 'house') {
      setActiveCategory(activeCategory === 'บ้านเดี่ยว' ? 'ALL' : 'บ้านเดี่ยว');
    }

    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: ว่างพร้อมอยู่ */}
        <div 
          onClick={() => handleCardClick('available')}
          className={`bg-white p-5 rounded-2xl border transition-all cursor-pointer flex items-center space-x-4 studio-card-shadow hover:-translate-y-1 ${
            showOnlyAvailable ? 'ring-2 ring-[#d97736] bg-amber-50/20' : 'border-gray-100'
          }`}
        >
          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&q=80" 
              alt="ว่างพร้อมอยู่" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <span className="text-[11px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              Real-time
            </span>
            <h3 className="font-bold text-[#222] text-lg mt-1">ว่างพร้อมอยู่</h3>
            <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">เช็คสถานะและย้ายเข้าได้ทันที</p>
            <span className="text-xs text-[#d97736] font-semibold mt-2 inline-flex items-center">
              <span>{showOnlyAvailable ? 'กำลังกรองห้องว่าง' : 'เช็คห้องว่าง'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </span>
          </div>
        </div>

        {/* Card 2: คอนโดใกล้รถไฟฟ้า */}
        <div 
          onClick={() => handleCardClick('bts')}
          className={`bg-white p-5 rounded-2xl border transition-all cursor-pointer flex items-center space-x-4 studio-card-shadow hover:-translate-y-1 ${
            filterBts ? 'ring-2 ring-[#d97736] bg-amber-50/20' : 'border-gray-100'
          }`}
        >
          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&q=80" 
              alt="คอนโดใกล้รถไฟฟ้า" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <span className="text-[11px] font-bold uppercase text-teal-600 bg-teal-50 px-2 py-0.5 rounded">
              ทำเลเมือง
            </span>
            <h3 className="font-bold text-[#222] text-lg mt-1">คอนโดใกล้รถไฟฟ้า</h3>
            <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">เดินทางสะดวก ใกล้ BTS & MRT</p>
            <span className="text-xs text-[#d97736] font-semibold mt-2 inline-flex items-center">
              <span>{filterBts ? 'แสดงติด BTS' : 'ดูคอนโด'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </span>
          </div>
        </div>

        {/* Card 3: บ้านเดี่ยวให้เช่า */}
        <div 
          onClick={() => handleCardClick('house')}
          className={`bg-white p-5 rounded-2xl border transition-all cursor-pointer flex items-center space-x-4 studio-card-shadow hover:-translate-y-1 ${
            activeCategory === 'บ้านเดี่ยว' ? 'ring-2 ring-[#d97736] bg-amber-50/20' : 'border-gray-100'
          }`}
        >
          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&q=80" 
              alt="บ้านเดี่ยวให้เช่า" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <span className="text-[11px] font-bold uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
              พื้นที่กว้าง
            </span>
            <h3 className="font-bold text-[#222] text-lg mt-1">บ้านเดี่ยวให้เช่า</h3>
            <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">บ้านหรูพร้อมสวนส่วนตัว</p>
            <span className="text-xs text-[#d97736] font-semibold mt-2 inline-flex items-center">
              <span>{activeCategory === 'บ้านเดี่ยว' ? 'กำลังดูบ้านเดี่ยว' : 'ชมบ้านเดี่ยว'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
