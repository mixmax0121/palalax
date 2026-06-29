import React from 'react';
import { Filter, Check, Train, RefreshCw } from 'lucide-react';

export default function PropertyFilter({
  activeCategory,
  setActiveCategory,
  statusFilters,
  setStatusFilters,
  filterBts,
  setFilterBts,
  onResetFilters,
  totalResultsCount
}) {
  const categories = [
    { label: 'ทั้งหมด', value: 'ALL' },
    { label: 'คอนโด', value: 'คอนโด' },
    { label: 'บ้านเดี่ยว', value: 'บ้านเดี่ยว' },
    { label: 'ทาวน์โฮม', value: 'ทาวน์โฮม' },
  ];

  const toggleStatusFilter = (statusKey) => {
    setStatusFilters(prev => ({
      ...prev,
      [statusKey]: !prev[statusKey]
    }));
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Category Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0">
          <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold mr-2 flex items-center">
            <Filter className="w-3.5 h-3.5 mr-1" /> ประเภท:
          </span>
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.value
                  ? 'bg-[#222] text-white shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Status Checkbox Filters & BTS Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold mr-1">
            กรองตามสถานะ:
          </span>

          <button
            onClick={() => toggleStatusFilter('available')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all border ${
              statusFilters.available
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm'
                : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
              statusFilters.available ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-gray-400'
            }`}>
              {statusFilters.available && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span>ว่างพร้อมอยู่</span>
          </button>

          <button
            onClick={() => toggleStatusFilter('reserved')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all border ${
              statusFilters.reserved
                ? 'bg-amber-50 text-amber-700 border-amber-300 shadow-sm'
                : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
              statusFilters.reserved ? 'bg-amber-500 border-amber-500 text-white' : 'border-gray-400'
            }`}>
              {statusFilters.reserved && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span>ติดจอง</span>
          </button>

          <button
            onClick={() => toggleStatusFilter('rented')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all border ${
              statusFilters.rented
                ? 'bg-rose-50 text-rose-700 border-rose-300 shadow-sm'
                : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
              statusFilters.rented ? 'bg-rose-600 border-rose-600 text-white' : 'border-gray-400'
            }`}>
              {statusFilters.rented && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span>ปล่อยแล้ว</span>
          </button>

          <button
            onClick={() => setFilterBts(!filterBts)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all border ${
              filterBts
                ? 'bg-teal-50 text-teal-700 border-teal-300'
                : 'bg-gray-50 text-gray-600 border-gray-200'
            }`}
          >
            <Train className="w-3.5 h-3.5 text-teal-600" />
            <span>ใกล้ BTS</span>
          </button>

          <button
            onClick={onResetFilters}
            className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
            title="รีเซ็ตตัวกรอง"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <div>
          แสดงผลรวม <span className="text-[#d97736] font-bold text-sm mx-1">{totalResultsCount}</span> ยูนิต
        </div>
      </div>
    </div>
  );
}
