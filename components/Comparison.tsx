
import React, { useState } from 'react';
import { WORKFORCE_HISTORY, CONTRACT_TOTAL } from '../data';

const Comparison: React.FC = () => {
  const [monthA, setMonthA] = useState(0); 
  const [monthB, setMonthB] = useState(WORKFORCE_HISTORY.length - 1); 

  const dataA = WORKFORCE_HISTORY[monthA];
  const dataB = WORKFORCE_HISTORY[monthB];

  // Calculate deviation from 531
  const devA = dataA.actualOnSite - CONTRACT_TOTAL;
  const devB = dataB.actualOnSite - CONTRACT_TOTAL;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4">
          <span className="text-slate-600 font-bold">مقارنة:</span>
          <select 
            value={monthA}
            onChange={(e) => setMonthA(Number(e.target.value))}
            className="p-2 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {WORKFORCE_HISTORY.map((d, i) => (
              <option key={i} value={i}>{d.month} {d.year}</option>
            ))}
          </select>
          <span className="text-slate-400">ضد</span>
          <select 
            value={monthB}
            onChange={(e) => setMonthB(Number(e.target.value))}
            className="p-2 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {WORKFORCE_HISTORY.map((d, i) => (
              <option key={i} value={i}>{d.month} {d.year}</option>
            ))}
          </select>
        </div>
        <div className="text-sm font-bold text-blue-600 px-4 py-2 bg-blue-50 rounded-full">
          المستهدف التعاقدي: {CONTRACT_TOTAL}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DeviationCard 
          month={dataA.month} 
          actual={dataA.actualOnSite} 
          target={CONTRACT_TOTAL} 
          deviation={devA}
        />
        <DeviationCard 
          month={dataB.month} 
          actual={dataB.actualOnSite} 
          target={CONTRACT_TOTAL} 
          deviation={devB}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h4 className="font-bold text-slate-800">جدول المقارنة التفصيلي بالعدد الأصلي (531)</h4>
        </div>
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200">
              <th className="px-6 py-4 text-slate-700 font-bold">المؤشر</th>
              <th className="px-6 py-4 text-slate-700 font-bold">{dataA.month}</th>
              <th className="px-6 py-4 text-slate-700 font-bold">{dataB.month}</th>
              <th className="px-6 py-4 text-slate-700 font-bold">الانحراف عن العقد (531)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <TableRow label="العمالة الفعلية" valA={dataA.actualOnSite} valB={dataB.actualOnSite} target={CONTRACT_TOTAL} showDeviation />
            <TableRow label="العمالة المستأجرة" valA={dataA.rentalStaff} valB={dataB.rentalStaff} />
            <TableRow label="نسبة التغطية من العقد" valA={((dataA.actualOnSite / CONTRACT_TOTAL) * 100).toFixed(1)} valB={((dataB.actualOnSite / CONTRACT_TOTAL) * 100).toFixed(1)} suffix="%" />
            <TableRow label="إجمالي العجز" valA={CONTRACT_TOTAL - dataA.actualOnSite} valB={CONTRACT_TOTAL - dataB.actualOnSite} negativeBad />
            <TableRow label="نسبة الإجازات" valA={dataA.vacationPercentage} valB={dataB.vacationPercentage} suffix="%" />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DeviationCard: React.FC<{ month: string, actual: number, target: number, deviation: number }> = ({ month, actual, target, deviation }) => {
  const isNegative = deviation < 0;
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
      <div>
        <p className="text-slate-500 text-sm font-bold mb-1">الوضع في {month}</p>
        <div className="text-3xl font-black text-slate-900">{actual} <span className="text-sm font-normal text-slate-400">/ {target}</span></div>
      </div>
      <div className={`px-4 py-2 rounded-xl text-center ${isNegative ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
        <div className="text-xs font-bold uppercase">الفجوة</div>
        <div className="text-xl font-black">{deviation > 0 ? '+' : ''}{deviation}</div>
      </div>
    </div>
  );
};

const TableRow: React.FC<{ label: string, valA: any, valB: any, suffix?: string, target?: number, showDeviation?: boolean, negativeBad?: boolean }> = ({ label, valA, valB, suffix = '', target, showDeviation, negativeBad }) => {
  const valBNum = parseFloat(valB);
  const deviation = target ? valBNum - target : null;
  
  return (
    <tr>
      <td className="px-6 py-4 font-medium text-slate-800">{label}</td>
      <td className="px-6 py-4 text-slate-600">{valA}{suffix}</td>
      <td className="px-6 py-4 text-slate-600">{valB}{suffix}</td>
      <td className="px-6 py-4">
        {showDeviation && deviation !== null && (
          <div className={`inline-flex items-center gap-2 font-bold ${deviation >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            {deviation > 0 ? '+' : ''}{deviation} وظيفة
          </div>
        )}
        {!showDeviation && negativeBad && (
           <div className={`font-bold ${parseFloat(valB) > parseFloat(valA) ? 'text-red-600' : 'text-emerald-600'}`}>
             {parseFloat(valB) > parseFloat(valA) ? '↑ تزايد' : '↓ تناقص'}
           </div>
        )}
      </td>
    </tr>
  );
};

export default Comparison;
