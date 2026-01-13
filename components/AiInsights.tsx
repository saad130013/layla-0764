
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
  const maxDeficit = Math.max(...WORKFORCE_HISTORY.map(d => CONTRACT_TOTAL - d.actualOnSite));
  const maxDeficitMonth = WORKFORCE_HISTORY.find(d => (CONTRACT_TOTAL - d.actualOnSite) === maxDeficit)?.month;
  
  const chartData = WORKFORCE_HISTORY.map(d => ({
    ...d,
    gap: CONTRACT_TOTAL - d.actualOnSite
  }));

  const handlePrint = () => {
    setIsPreparing(true);
    setTimeout(() => {
      window.print();
      setIsPreparing(false);
    }, 800);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Action Bar - UI Only */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-5 rounded-2xl shadow-md border border-slate-200 sticky top-24 z-10 no-print">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-100 rounded-xl">
            <DocumentTextIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <span className="font-bold text-slate-800 block text-lg">تصدير التقرير الفني المتكامل</span>
            <span className="text-xs text-slate-500 font-medium">يتضمن الجداول والرسوم البيانية في ملف PDF واحد</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button 
            onClick={handlePrint}
            disabled={isPreparing}
            className={`flex-1 md:flex-none px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${
              isPreparing 
              ? 'bg-slate-100 text-slate-400 cursor-wait' 
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02] shadow-blue-200'
            }`}
          >
            {isPreparing ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin"></div>
                <span>جاري تحضير الوثيقة...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                <span>حفظ كملف PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Document Container */}
      <div className="report-container bg-white shadow-2xl rounded-sm border border-slate-200 min-h-[1000px] flex flex-col print:m-0 print:border-none">
        
        {/* 1. Header Area */}
        <div className="p-10 border-b-8 border-slate-900 bg-slate-50/50">
          <div className="flex justify-between items-start mb-8">
            <div className="text-right">
              <h1 className="text-3xl font-black text-slate-900 mb-1">التقرير السنوي لتحليل القوى العاملة</h1>
              <p className="text-lg text-slate-600 font-bold mb-1">مشروع صيانة ونظافة مستشفى الملك عبدالعزيز (M-232)</p>
              <div className="flex gap-4 mt-4 text-xs font-bold text-slate-500">
                <span>تاريخ التقرير: {reportDate}</span>
                <span>•</span>
                <span>العدد التعاقدي: {CONTRACT_TOTAL}</span>
                <span>•</span>
                <span>المرجع: KAH-REP-2025</span>
              </div>
            </div>
            <div className="text-left">
              <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center mb-1 shadow-lg">
                <BuildingHospitalIcon className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Visual Analytics Section (Charts) */}
        <div className="p-10 pb-4">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
            أولاً: التحليل البياني للأداء
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Workforce Trend Chart */}
            <div className="border border-slate-100 rounded-xl p-4 bg-white shadow-sm">
              <h3 className="text-xs font-bold text-slate-500 mb-4 text-center">تذبذب العمالة الفعلية مقابل المستهدف (531)</h3>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={WORKFORCE_HISTORY}>
                    <defs>
                      <linearGradient id="printGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis domain={[400, 550]} fontSize={10} axisLine={false} tickLine={false} />
                    <ReferenceLine y={CONTRACT_TOTAL} stroke="#ef4444" strokeDasharray="3 3" />
                    <Area type="monotone" dataKey="actualOnSite" stroke="#2563eb" strokeWidth={2} fill="url(#printGradient)" isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Monthly Deficit Chart */}
            <div className="border border-slate-100 rounded-xl p-4 bg-white shadow-sm">
              <h3 className="text-xs font-bold text-slate-500 mb-4 text-center">توزيع إجمالي النقص الشهري</h3>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis fontSize={10} axisLine={false} tickLine={false} />
                    <Bar dataKey="gap" fill="#ef4444" radius={[2, 2, 0, 0]} isAnimationActive={false} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Data Table Section */}
        <div className="px-10 pb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
            ثانياً: سجل البيانات التفصيلي
          </h2>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-center text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-bold">
                  <th className="py-3 border-l border-slate-700">الفترة الزمنية</th>
                  <th className="py-3 border-l border-slate-700">العدد الفعلي (من {CONTRACT_TOTAL})</th>
                  <th className="py-3 border-l border-slate-700">إجمالي النقص</th>
                  <th className="py-3">نسبة الالتزام</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {WORKFORCE_HISTORY.map((item, idx) => {
                  const gap = CONTRACT_TOTAL - item.actualOnSite;
                  const compliance = ((item.actualOnSite / CONTRACT_TOTAL) * 100).toFixed(1);
                  return (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="py-2.5 font-bold text-slate-700 border-l border-slate-100">{item.month} {item.year}</td>
                      <td className="py-2.5 border-l border-slate-100">{item.actualOnSite}</td>
                      <td className={`py-2.5 font-black border-l border-slate-100 ${gap > 40 ? 'text-red-600' : 'text-slate-600'}`}>{gap}</td>
                      <td className="py-2.5 font-bold">{compliance}%</td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-black border-t-2 border-slate-300">
                  <td className="py-3 text-slate-800">المتوسط العام</td>
                  <td className="py-3 text-blue-700">{averageActual}</td>
                  <td className="py-3 text-red-600">{CONTRACT_TOTAL - averageActual}</td>
                  <td className="py-3">{((averageActual / CONTRACT_TOTAL) * 100).toFixed(1)}%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* 4. Recommendations & Summary */}
        <div className="px-10 flex-1">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
            ثالثاً: الملاحظات والتوصيات
          </h2>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
              <span className="text-[10px] font-black text-red-400 uppercase">أعلى عجز مسجل</span>
              <div className="text-xl font-black text-red-700 mt-1">{maxDeficit} عامل/عاملة</div>
              <p className="text-[10px] text-red-600 mt-1">سُجل في شهر {maxDeficitMonth}، ويتطلب إجراءً إدارياً فورياً.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <span className="text-[10px] font-black text-blue-400 uppercase">مستوى الاستقرار</span>
              <div className="text-xl font-black text-blue-700 mt-1">92.4% متوسط التغطية</div>
              <p className="text-[10px] text-blue-600 mt-1">يعتبر مستوى القوى العاملة ضمن النطاق المقبول تشغيلياً.</p>
            </div>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <ul className="space-y-3 text-sm text-slate-700 list-disc list-inside">
              <li>يجب على المقاول تعويض النقص الحاد في الأشهر الأخيرة (ديسمبر/يناير) للوصول للعدد {CONTRACT_TOTAL}.</li>
              <li>التركيز على استقرار العمالة في المواقع الحرجة لضمان جودة الخدمات الطبية.</li>
              <li>تزويد إدارة المستشفى بخطة زمنية لتأمين النقص البالغ <span className="font-bold text-red-600">{CONTRACT_TOTAL - averageActual}</span> وظيفة كمتوسط.</li>
            </ul>
          </div>
        </div>

        {/* 5. Signatures Section */}
        <div className="mt-10 p-10 border-t border-slate-100 grid grid-cols-3 gap-8 text-center">
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase">إعداد</p>
            <div className="h-12 border-b border-slate-200 flex items-center justify-center text-slate-300 italic">التوقيع</div>
            <p className="text-xs font-bold text-slate-800">مشرف تخطيط الموارد</p>
          </div>
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase">مراجعة</p>
            <div className="h-12 border-b border-slate-200 flex items-center justify-center text-slate-300 italic">التوقيع</div>
            <p className="text-xs font-bold text-slate-800">مدير المشروع الفني</p>
          </div>
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase">الاعتماد الرسمي</p>
            <div className="h-12 flex items-center justify-center text-slate-200 underline decoration-dotted underline-offset-8">الختم الرسمي</div>
            <p className="text-xs font-bold text-slate-800">مدير مستشفى الملك عبدالعزيز</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-900 text-white flex justify-between items-center rounded-b-sm">
          <div className="text-[9px] text-slate-400">نظام تحليل العمالة الرقمي © 2025 - تقرير صادر آلياً</div>
          <div className="text-[10px] font-black">صفحة 1 من 1</div>
        </div>
      </div>
    </div>
  );
};

export default AiInsights;
