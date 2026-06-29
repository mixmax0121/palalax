import React from 'react';
import { ArrowRight, Search } from 'lucide-react';

export default function Hero({ searchTerm, setSearchTerm, onSearchSubmit }) {
  return (
    <section className="relative max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
      
      {/* Left Text Column */}
      <div className="md:col-span-6 space-y-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#222] tracking-tight leading-[1.15]">
          ค้นหาห้องพัก <br />
          <span className="text-[#d97736]">พร้อมเข้าอยู่</span>
        </h1>
        
        <p className="text-gray-600 text-base sm:text-lg font-light max-w-lg leading-relaxed">
          คัดสรรโครงการตกแต่งครบ พร้อมตรวจเช็คสถานะห้องว่าง Real-time ตอบโจทย์ไลฟ์สไตล์ทุกการอยู่อาศัย
        </p>

        {/* Search & Action CTA */}
        <div className="space-y-4 max-w-md">
          <div className="flex items-center bg-white p-2 rounded-full shadow-md border border-gray-200/80">
            <input
              type="text"
              placeholder="พิมพ์ชื่อโครงการ หรือสถานี BTS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent px-4 py-2 text-sm text-[#222] placeholder-gray-400 w-full focus:outline-none"
            />
            <button
              onClick={onSearchSubmit}
              className="px-6 py-3 rounded-full bg-[#d97736] hover:bg-[#c46425] text-white font-medium text-sm transition-all flex-shrink-0 flex items-center space-x-1 shadow"
            >
              <Search className="w-4 h-4 mr-1" />
              <span>ค้นหา</span>
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('property-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[#d97736] hover:text-[#c46425] font-semibold text-sm inline-flex items-center space-x-2 transition-colors"
            >
              <span>ดูอสังหาริมทรัพย์ทั้งหมด</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Hero Image Column */}
      <div className="md:col-span-6 relative">
        <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-gray-200">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85"
            alt="Living Space"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </section>
  );
}
