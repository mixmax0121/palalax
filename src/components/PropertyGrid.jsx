import React from 'react';
import PropertyCard from './PropertyCard';
import { Frown } from 'lucide-react';

export default function PropertyGrid({ 
  properties, 
  onSelectProperty, 
  isAdminMode, 
  onUpdateStatus 
}) {
  return (
    <section id="property-grid" className="max-w-7xl mx-auto px-6 mb-20 scroll-mt-24">
      
      {/* Section Title (Matching "Featured Collections" Section in image) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-3xl font-serif font-bold text-[#222]">
            คัดสรรโครงการอสังหาฯ แนะนำ
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            โครงการตกแต่งสไตล์ Studio พร้อมแสดงสถานะ Real-time แท้จริง
          </p>
        </div>
      </div>

      {/* Grid Layout 4 Columns */}
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelectProperty={onSelectProperty}
              isAdminMode={isAdminMode}
              onUpdateStatus={onUpdateStatus}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-2xl text-center max-w-lg mx-auto my-12 border border-gray-100 studio-shadow">
          <Frown className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#222] mb-1">ไม่พบรายการอสังหาริมทรัพย์</h3>
          <p className="text-gray-500 text-xs">
            ลองปรับเปลี่ยนคำค้นหา หรือรีเซ็ตตัวกรองสถานะใหม่อีกครั้ง
          </p>
        </div>
      )}

    </section>
  );
}
