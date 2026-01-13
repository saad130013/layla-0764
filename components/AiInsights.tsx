
import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, ReferenceLine 
} from 'recharts';
import { WORKFORCE_HISTORY, CONTRACT_TOTAL } from '../data';
import { BuildingHospitalIcon, DocumentTextIcon } from './Icons';

const AiInsights: React.FC = () => {
  const [isPreparing, setIsPreparing] = useState<boolean>(false);
  const [reportDate] = useState(new Date().toLocaleDateString('ar-SA'));

  // Calculate stats for the report
  const totalActual = WORKFORCE_HISTORY.reduce((acc, curr) => acc + curr.actualOnSite, 0);
  const averageActual = Math.round(totalActual / WORKFORCE_HISTORY.length);
  
  const chartData = WORKFORCE_HISTORY.map(d => ({
    ...d,
    gap: CONTRACT_TOTAL - d.actualOnSite
  }));

  const handlePrint = () => {
    setIsPreparing(true);
    
    const originalTitle = document.title;
    const formattedDate = reportDate.replace(/\//g, '-');
    document.title = `تقرير_العمالة_Landscape_${formattedDate}`;

    setTimeout(() => {
      window.print();
      document.title = originalTitle;
      setIsPreparing(false);
    }, 800);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 print:pb-0 print:max-w-none">
      {/* Action Bar - UI Only */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl shadow-xl border border-blue-100 sticky top-24 z-10 no-print">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
            <DocumentTextIcon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-xl">تحميل التقرير (أفقي Landscape)</h3>
            <p className="text-sm text-slate-500 font-medium">تم تحسين العرض ليتناسب مع الطباعة العرضية</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button 
            onClick={handlePrint}
            disabled={isPreparing}
            className={`group relative flex-1 md:flex-none px-10 py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 overflow-hidden shadow-2xl ${
              isPreparing 
              ? 'bg-slate-100 text-slate-400 cursor-wait' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-1'
            }`}
          >
            {isPreparing ? (
              <>
                <div className="w-5 h-5 border-3 border-slate-300 border-t-indigo-600 rounded-full animate-spin"></div>
                <span>جاري التحضير...</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                </svg>
                <span>طباعة بالعرض (Landscape)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info - UI Only */}
      <div className="bg-indigo-50 border-r-4 border-indigo-400 p-4 rounded-xl flex items-center gap-4 no-print shadow-sm">
        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <p className="text-indigo-900 text-sm font-bold">تلميح الطباعة:</p>
          <p className="text-indigo-800 text-xs">تأكد من تغيير اتجاه الورقة إلى "أفقي" (Landscape) في نافذة الطباعة للحصول على أفضل نتيجة.</p>
        </div>
      </div>

      {/* Document View - Optimized for Landscape Print */}
      <div className="report-container bg-white shadow-2xl rounded-sm border border-slate-200 flex flex-col print:m-0 print:border-none print:shadow-none print:block print:bg-white print:h-auto print:overflow-visible">
        
        {/* Header - Wide Layout */}
        <section className="p-10 border-b-[10px] border-slate-900 bg-slate-50/50 report-section">
          <div className="flex justify-between items-center">
            <div className="text-right space-y-2">
              <div className="inline-block px-3 py-1 bg-slate-900 text-white text-[10px] font-black rounded mb-2 tracking-widest uppercase">
                تقرير فني معتمد - نسخة التحليل العرضي
              </div>
              <h1 className="text-4xl font-black text-slate-900">التقرير السنوي لتحليل القوى العاملة (M-232)</h1>
              <div className="flex gap-8 text-sm font-bold text-slate-500 pt-2">
                <p>المنشأة: <span className="text-slate-900">مستشفى الملك عبدالعزيز - جدة</span></p>
                <p>تاريخ الإصدار: <span className="text-slate-900">{reportDate}</span></p>
                <p>المستهدف التعاقدي: <span className="text-blue-600 font-black">{CONTRACT_TOTAL} وظيفة</span></p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center mb-1">
                <BuildingHospitalIcon className="w-12 h-12 text-white" />
              </div>
              <span className="text-[7px] font-black text-slate-400 uppercase tracking-tighter">Hospital Workforce Management</span>
            </div>
          </div>
        </section>

        {/* Charts - Side by Side in Landscape */}
        <section className="p-10 pb-6 report-section">
          <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span>
            أولاً: التحليل البياني (أداء العمالة الفعلي)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2 print:gap-6">
            <div className="border border-slate-100 rounded-2xl p-5 bg-white shadow-sm">
              <h3 className="text-xs font-black text-slate-500 mb-4 text-center">مقارنة الحضور الفعلي ضد العقد ({CONTRACT_TOTAL})</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={WORKFORCE_HISTORY}>
                    <defs>
                      <linearGradient id="printGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" fontSize={10} fontWeight="bold" />
                    <YAxis domain={[400, 550]} fontSize={10} />
                    <ReferenceLine y={CONTRACT_TOTAL} stroke="#ef4444" strokeWidth={2} strokeDasharray="4 4" />
                    <Area type="monotone" dataKey="actualOnSite" stroke="#1d4ed8" strokeWidth={2.5} fill="url(#printGrad)" isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="border border-slate-100 rounded-2xl p-5 bg-white shadow-sm">
              <h3 className="text-xs font-black text-slate-500 mb-4 text-center">تحليل صافي العجز الشهري المسجل</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" fontSize={10} fontWeight="bold" />
                    <YAxis fontSize={10} />
                    <Bar dataKey="gap" fill="#dc2626" radius={[3, 3, 0, 0]} isAnimationActive={false} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* Table - Optimized for width */}
        <section className="px-10 pb-6 report-section">
          <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span>
            ثانياً: مصفوفة البيانات الرقمية
          </h2>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-center text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-black">
                  <th className="py-3 border-l border-slate-700">الشهر</th>
                  <th className="py-3 border-l border-slate-700">الحضور الفعلي</th>
                  <th className="py-3 border-l border-slate-700">عدد العجز</th>
                  <th className="py-3 border-l border-slate-700">نسبة التغطية</th>
                  <th className="py-3 border-l border-slate-700">العمالة الإضافية</th>
                  <th className="py-3">الحالة التشغيلية</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {WORKFORCE_HISTORY.map((item, idx) => {
                  const gap = CONTRACT_TOTAL - item.actualOnSite;
                  const compliance = ((item.actualOnSite / CONTRACT_TOTAL) * 100).toFixed(1);
                  return (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}>
                      <td className="py-2.5 font-bold text-slate-800 border-l border-slate-100">{item.month} {item.year}</td>
                      <td className="py-2.5 font-medium border-l border-slate-100">{item.actualOnSite}</td>
                      <td className={`py-2.5 font-black border-l border-slate-100 ${gap > 40 ? 'text-red-600' : 'text-slate-600'}`}>{gap}</td>
                      <td className="py-2.5 font-bold text-blue-700 border-l border-slate-100">{compliance}%</td>
                      <td className="py-2.5 border-l border-slate-100">{item.rentalStaff}</td>
                      <td className="py-2.5">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded ${Number(compliance) < 90 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                          {Number(compliance) < 90 ? 'تنبيه' : 'مستقر'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer/Signatures - Spread across width */}
        <section className="p-10 pt-4 pb-10 mt-auto border-t border-slate-100 report-section">
          <div className="grid grid-cols-4 gap-8 text-center print:grid-cols-4">
            <div className="space-y-4">
              <p className="text-[9px] font-black text-slate-400 uppercase">إعداد: القسم الفني</p>
              <div className="h-12 border-b border-dashed border-slate-200"></div>
              <p className="text-xs font-bold text-slate-700">محلل البيانات</p>
            </div>
            <div className="space-y-4">
              <p className="text-[9px] font-black text-slate-400 uppercase">مراجعة: إدارة العمليات</p>
              <div className="h-12 border-b border-dashed border-slate-200"></div>
              <p className="text-xs font-bold text-slate-700">مدير التشغيل</p>
            </div>
            <div className="space-y-4">
              <p className="text-[9px] font-black text-slate-400 uppercase">تدقيق: العقود</p>
              <div className="h-12 border-b border-dashed border-slate-200"></div>
              <p className="text-xs font-bold text-slate-700">مشرف العقود</p>
            </div>
            <div className="space-y-4">
              <p className="text-[9px] font-black text-slate-400 uppercase">الاعتماد النهائي</p>
              <div className="h-12 border-b border-dashed border-slate-200"></div>
              <p className="text-xs font-black text-slate-900">مدير المستشفى</p>
            </div>
          </div>
        </section>

        <footer className="p-4 bg-slate-900 text-white flex justify-between items-center no-print">
          <p className="text-[9px] text-slate-400 font-bold">نظام التقارير الموحد M-232 | نسخة PDF Landscape</p>
          <div className="text-[9px] font-black bg-slate-800 px-2 py-1 rounded">2026</div>
        </footer>
      </div>
    </div>
  );
};

export default AiInsights;
