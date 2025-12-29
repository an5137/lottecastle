
import React from 'react';
import { CONTACT_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1a1a1a] text-gray-400 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-[#8c734b] inline-block"></span>
              창원사화 롯데캐슬 포레스트
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              본 시스템은 실시간 이미지 분류 및 비교를 통해 입주 예정자 및 고객님들께 최적화된 공간 정보를 제공합니다.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">공인중개사 정보</h4>
            <div className="space-y-2 text-sm">
              <p><span className="text-[#8c734b]">소장 :</span> {CONTACT_INFO.agent}</p>
              <p><span className="text-[#8c734b]">상호 :</span> {CONTACT_INFO.office}</p>
              <p><span className="text-[#8c734b]">등록번호 :</span> {CONTACT_INFO.regNo}</p>
            </div>
          </div>

          <div className="flex flex-col justify-end items-start md:items-end">
             <a 
              href={`tel:${CONTACT_INFO.phone.replace(/-/g, '')}`}
              className="group bg-[#8c734b] text-white px-6 py-4 rounded-sm flex items-center gap-4 hover:bg-[#6e5a3b] transition-all"
             >
               <div className="flex flex-col items-start">
                 <span className="text-xs opacity-75">문의 전화</span>
                 <span className="text-xl font-bold">{CONTACT_INFO.phone}</span>
               </div>
               <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white/10">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
               </div>
             </a>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-[11px] text-center opacity-50 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} LOTTE CASTLE FOREST IMAGE COMPARE SERVICE. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
