import React from 'react';
import { Bed, Bath, Maximize, MapPin, Train, ShieldAlert } from 'lucide-react';

export default function PropertyCard({ property, onSelectProperty, isAdminMode, onUpdateStatus }) {
  
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500 text-white font-bold text-xs shadow">
            🟢 ว่างพร้อมอยู่
          </span>
        );
      case 'reserved':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500 text-white font-bold text-xs shadow">
            🟠 ติดจอง
          </span>
        );
      case 'rented':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-rose-500 text-white font-bold text-xs shadow">
            🔴 ปล่อยแล้ว
          </span>
        );
      case 'archived':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-700 text-white font-bold text-xs shadow">
            ⚪ ซ่อนข้อมูล
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 studio-shadow hover:shadow-xl transition-all duration-300 flex flex-col group">
      
      {/* Image Container with Badge */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <img
          src={property.image_url}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Real-time Status Badge */}
        <div className="absolute top-3 left-3 z-10">
          {renderStatusBadge(property.status)}
        </div>

        {property.near_bts && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2 py-1 rounded bg-teal-500 text-white text-[10px] font-bold shadow flex items-center">
              <Train className="w-3 h-3 mr-0.5" /> BTS
            </span>
          </div>
        )}
      </div>

      {/* Card Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span className="text-[11px] font-semibold text-[#d97736] uppercase tracking-wider block">
            {property.category}
          </span>
          <h3 className="font-bold text-[#222] text-lg mt-0.5 line-clamp-1 group-hover:text-[#d97736] transition-colors">
            {property.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1 flex items-center line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-gray-400 mr-1 flex-shrink-0" />
            {property.location}
          </p>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-gray-50 border border-gray-100 text-gray-600 text-xs font-medium text-center">
          <div>{property.bedrooms} นอน</div>
          <div className="border-x border-gray-200">{property.bathrooms} น้ำ</div>
          <div>{property.area_sqm} ตร.ม.</div>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-gray-100 flex items-baseline justify-between">
          <div className="text-xl font-bold text-[#222]">
            ฿{property.price.toLocaleString()}<span className="text-xs text-gray-400 font-normal">/ด.</span>
          </div>
        </div>

        {/* Admin Quick Quick Status Switcher */}
        {isAdminMode && (
          <div className="pt-2 border-t border-amber-200 bg-amber-50/60 p-2 rounded-xl text-center">
            <span className="text-[10px] text-amber-900 font-bold block mb-1">เปลี่ยนสถานะ (แอดมิน):</span>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={(e) => { e.stopPropagation(); onUpdateStatus(property.id, 'available'); }}
                className={`py-1 rounded text-[10px] font-bold ${
                  property.status === 'available' ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                }`}
              >
                ว่าง
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onUpdateStatus(property.id, 'reserved'); }}
                className={`py-1 rounded text-[10px] font-bold ${
                  property.status === 'reserved' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                }`}
              >
                ติดจอง
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onUpdateStatus(property.id, 'rented'); }}
                className={`py-1 rounded text-[10px] font-bold ${
                  property.status === 'rented' ? 'bg-rose-600 text-white' : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                }`}
              >
                ปล่อยแล้ว
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => onSelectProperty(property)}
          className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-[#d97736] text-white font-medium text-xs transition-colors"
        >
          {property.status === 'available' ? 'ดูรายละเอียด / สนใจเช่า' : property.status === 'reserved' ? 'ดูรายละเอียด (ติดจอง)' : 'ปล่อยห้องแล้ว'}
        </button>
      </div>

    </div>
  );
}
