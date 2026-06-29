import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function FeaturedMonth({ properties, onSelectProperty }) {
  const featuredList = properties.filter(p => p.is_featured && p.status !== 'archived').slice(0, 3);
  const displayItems = featuredList.length > 0 ? featuredList : properties.slice(0, 3);

  return (
    <section className="bg-[#2a1d15] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side Header matching Warm Wood Section in mockup */}
        <div className="lg:col-span-4 space-y-4">
          <span className="text-xs text-[#d97736] font-bold uppercase tracking-widest">
            TOP SELECTION OF THE MONTH
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
            ห้องยอดนิยมประจำเดือน
          </h2>
          <p className="text-gray-300 text-sm font-light leading-relaxed">
            ยูนิตพิเศษยอดนิยม ตกแต่งพร้อมเข้าอยู่อย่างประณีตสไตล์ Studio ได้รับความสนใจนัดเข้าชมสูงสุดในเดือนนี้
          </p>
          <button
            onClick={() => onSelectProperty(displayItems[0])}
            className="px-6 py-3 rounded-full bg-[#d97736] hover:bg-[#c46425] text-white font-medium text-sm transition-all shadow-lg inline-flex items-center space-x-2"
          >
            <span>สนใจนัดชมห้องยอดนิยม</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Side 3 Cards matching Mockup */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {displayItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white/10 backdrop-blur border border-white/10 p-4 rounded-2xl text-white space-y-3 hover:bg-white/15 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <img 
                  src={item.image_url} 
                  alt={item.title}
                  className="w-full h-36 object-cover rounded-xl" 
                />
                <div>
                  <span className="text-[10px] text-[#d97736] font-bold uppercase tracking-wider block">
                    {item.category}
                  </span>
                  <h4 className="font-bold text-sm line-clamp-1 text-white">{item.title}</h4>
                  <p className="text-xs text-gray-300 mt-0.5">฿{item.price.toLocaleString()} / เดือน</p>
                </div>
              </div>
              <button
                onClick={() => onSelectProperty(item)}
                className="w-full py-2 rounded-lg bg-[#d97736] text-white text-xs font-medium hover:bg-[#c46425] transition-colors"
              >
                ดูรายละเอียดห้องนี้
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
