import React from 'react';
import { Building2, Phone, Mail, MapPin, Globe, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer-contact" className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-slate-950 font-bold" />
              </div>
              <span className="text-lg font-bold text-white tracking-wider uppercase">
                PARALLAX<span className="text-emerald-400">SPACE</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed font-light text-slate-400">
              แพลตฟอร์มปล่อยเช่าอสังหาริมทรัพย์ระดับพรีเมียม ตอบโจทย์ไลฟ์สไตล์ด้วยดีไซน์โมเดิร์นและระบบเช็คสถานะห้องว่างแบบ Real-time
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">หมวดหมู่ทรัพย์</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#property-grid" className="hover:text-emerald-400 transition-colors">คอนโดใกล้รถไฟฟ้า</a></li>
              <li><a href="#property-grid" className="hover:text-emerald-400 transition-colors">บ้านเดี่ยวพร้อมสวน</a></li>
              <li><a href="#property-grid" className="hover:text-emerald-400 transition-colors">ทาวน์โฮมทำเลดี</a></li>
              <li><a href="#property-grid" className="hover:text-emerald-400 transition-colors">ยูนิตเพนท์เฮาส์หรู</a></li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">ติดต่อฝ่ายดูแลผู้เช่า</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>02-123-4567 / 089-999-8888</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>contact@parallaxspace.co.th</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>ชั้น 24 อาคารเอ็กซ์เชนจ์ ทาวเวอร์ สุขุมวิท กรุงเทพฯ</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Hours & Social */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">เวลาทำการ</h4>
            <p className="text-xs mb-4 leading-relaxed">
              เปิดให้บริการทุกวัน: 09:00 - 19:00 น.<br />
              (สามารถนัดหมายเข้าชมห้องนอกเวลาได้)
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 rounded-xl bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-3 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} Parallax Space Real Estate Rental. All rights reserved. Powered by Supabase & React.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-slate-400">เงื่อนไขข้อตกลง</a>
            <a href="#" className="hover:text-slate-400">นโยบายความเป็นส่วนตัว</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
