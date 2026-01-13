
import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, ReferenceLine 
} from 'recharts';
import { WORKFORCE_HISTORY, CONTRACT_TOTAL, PENALTY_PER_VACANCY } from '../data';
import { BuildingHospitalIcon, DocumentTextIcon } from './Icons';

const AiInsights: React.FC = () => {
  const [isPreparing, setIsPreparing] = useState<boolean>(false);
  const [reportDate] = useState(new Date().toLocaleDateString('ar-SA'));

  const totalActual = WORKFORCE_HISTORY.reduce((acc, curr) => acc + curr.actualOnSite, 0);
  const averageActual = Math.round(totalActual / WORKFORCE_HISTORY.length);
  const averagePenalty = (CONTRACT_TOTAL - averageActual) * PENALTY_PER_VACANCY;
  
  const chartData = WORKFORCE_HISTORY.map(d => ({
    ...d,
    gap: CONTRACT_TOTAL - d.actualOnSite
  }));

  const handlePrint = () => {
    setIsPreparing(true);
    const originalTitle = document.title;
    document.title = `التقرير_السنوي_الشامل_M232_${reportDate.replace(/\//g, '-')}`;

    setTimeout(() => {
      window.print();
      document.title = originalTitle;
      setIsPreparing(false);
    }, 800);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 print:pb-0 print:max-w-none">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl shadow-xl border border-blue-100 sticky top-24 z-10 no-print">
        <div className="flex items-center gap-4 text-right">
          <div className="p-3 bg-slate-900 rounded-2xl shadow-lg">
            <DocumentTextIcon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-xl">تصدير التقرير السنوي الكامل</h3>
            <p className="text-sm text-slate-500 font-medium">يشمل 12 شهراً من التحليل (فبراير 2025 - يناير 2026)</p>
          </div>
        </div>
        <button 
          onClick={handlePrint}
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl flex items-center gap-3"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
          </svg>
          طباعة التقرير (12 شهر)
        </button>
      </div>

      {/* Document View */}
      <div className="report-container bg-white shadow-2xl rounded-sm border border-slate-200 flex flex-col print:m-0 print:border-none print:shadow-none print:block">
        
        {/* Header Section */}
        <section className="p-10 border-b-[10px] border-slate-900 bg-slate-50/50 report-section">
          <div className="flex justify-between items-center">
            <div className="text-right">
              <h1 className="text-3xl font-black text-slate-900 mb-1">تقرير تحليل القوى العاملة السنوي الشامل</h1>
              <p className="text-lg text-slate-600 font-bold">مشروع M-232 | مستشفى الملك عبدالعزيز</p>
              <div className="flex gap-8 mt-4 text-sm font-bold text-slate-500">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase">النطاق الزمني</span>
                  <span className="text-slate-900">فبراير 2025 - يناير 2026 (12 شهر)</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase">متوسط التزام المقاول</span>
                  <span className="text-blue-700 font-black">{((averageActual / CONTRACT_TOTAL) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase">إجمالي العجز السنوي</span>
                  <span className="text-red-600 font-black">{WORKFORCE_HISTORY.reduce((acc, curr) => acc + (CONTRACT_TOTAL - curr.actualOnSite), 0)} وحدة/شهر</span>
                </div>
              </div>
            </div>
            <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl">
              <BuildingHospitalIcon className="w-12 h-12 text-white" />
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="p-8 report-section grid grid-cols-2 gap-6">
          <div className="border border-slate-100 rounded-2xl p-5 bg-white">
            <h3 className="text-[10px] font-black text-slate-500 mb-4 text-center">الاستقرار التشغيلي السنوي (الفعلي vs الهدف)</h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={WORKFORCE_HISTORY}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" fontSize={9} />
                  <YAxis domain={[400, 550]} fontSize={9} />
                  <ReferenceLine y={CONTRACT_TOTAL} stroke="#ef4444" strokeWidth={2} strokeDasharray="4 4" />
                  <Area type="monotone" dataKey="actualOnSite" stroke="#1d4ed8" fill="#dbeafe" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="border border-slate-100 rounded-2xl p-5 bg-white">
            <h3 className="text-[10px] font-black text-slate-500 mb-4 text-center">تحليل فجوات التوظيف الشهرية</h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" fontSize={9} />
                  <YAxis fontSize={9} />
                  <Bar dataKey="gap" fill="#dc2626" radius={[4, 4, 0, 0]} isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Full 12-Month Data Matrix */}
        <section className="px-8 pb-6 report-section">
          <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
            ثانياً: مصفوفة البيانات السنوية التفصيلية
          </h2>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-center text-[10px] border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-black">
                  <th className="py-2 px-2 border-l border-slate-700">الفترة</th>
                  <th className="py-2 px-2 border-l border-slate-700">المستهدف</th>
                  <th className="py-2 px-2 border-l border-slate-700">الفعلي</th>
                  <th className="py-2 px-2 border-l border-slate-700">العجز</th>
                  <th className="py-2 px-2 border-l border-slate-700">الغرامة (ر.س)</th>
                  <th className="py-2 px-2 border-l border-slate-700">الالتزام</th>
                  <th className="py-2 px-2">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {WORKFORCE_HISTORY.map((item, idx) => {
                  const g = CONTRACT_TOTAL - item.actualOnSite;
                  const pen = g * PENALTY_PER_VACANCY;
                  const comp = ((item.actualOnSite / CONTRACT_TOTAL) * 100).toFixed(1);
                  return (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}>
                      <td className="py-2 font-bold text-slate-800">{item.month} {item.year}</td>
                      <td className="py-2 text-slate-500">{CONTRACT_TOTAL}</td>
                      <td className="py-2 font-medium">{item.actualOnSite}</td>
                      <td className="py-2 font-black text-red-600">{g}</td>
                      <td className="py-2 font-bold text-slate-700">{pen.toLocaleString()}</td>
                      <td className="py-2 font-black text-blue-700">{comp}%</td>
                      <td className="py-2">
                        <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${Number(comp) < 90 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                          {Number(comp) < 90 ? 'ضعيف' : 'جيد'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Signatures */}
        <section className="p-8 mt-auto border-t border-slate-100 report-section bg-slate-50/20">
          <div className="grid grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">التحليل المالي</p>
              <div className="h-10 border-b border-dashed border-slate-300"></div>
            </div>
            <div className="space-y-2">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">إدارة العمليات</p>
              <div className="h-10 border-b border-dashed border-slate-300"></div>
            </div>
            <div className="space-y-2">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">التدقيق التعاقدي</p>
              <div className="h-10 border-b border-dashed border-slate-300"></div>
            </div>
            <div className="space-y-2">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">الاعتماد النهائي</p>
              <div className="h-10 border-b border-dashed border-slate-300"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AiInsights;
