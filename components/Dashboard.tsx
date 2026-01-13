
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend, Cell, PieChart, Pie, ReferenceLine
} from 'recharts';
import { WORKFORCE_HISTORY, CONTRACT_TOTAL } from '../data';

const Dashboard: React.FC = () => {
  const latestData = WORKFORCE_HISTORY[WORKFORCE_HISTORY.length - 1];
  const complianceRate = ((latestData.actualOnSite / CONTRACT_TOTAL) * 100).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="العدد الأصلي بالعقد" value={CONTRACT_TOTAL} unit="عامل وعاملة" type="secondary" />
        <StatCard title="الفعلي (يناير 26)" value={latestData.actualOnSite} target={CONTRACT_TOTAL} unit="عامل" type="info" />
        <StatCard title="إجمالي النقص" value={CONTRACT_TOTAL - latestData.actualOnSite} unit="وظيفة" type="danger" />
        <StatCard title="أعلى نقص مسجل" value={80} unit="عامل (ديسمبر)" type="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trend Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-2 text-right">منحنى العمالة الفعلية ضد العقد (531)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={WORKFORCE_HISTORY}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} dy={10} />
                <YAxis axisLine={false} tickLine={false} domain={[400, 550]} />
                <Tooltip />
                <ReferenceLine y={CONTRACT_TOTAL} label={{ position: 'top', value: '531', fill: '#ef4444', fontWeight: 'bold' }} stroke="#ef4444" strokeDasharray="5 5" />
                <Area type="monotone" dataKey="actualOnSite" name="الفعلي" stroke="#2563eb" strokeWidth={3} fill="url(#colorActual)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gap Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-2 text-right">تحليل "إجمالي النقص" شهرياً</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WORKFORCE_HISTORY.map(d => ({ ...d, gap: CONTRACT_TOTAL - d.actualOnSite }))}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="gap" name="إجمالي النقص" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* The Specific Table requested by user */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 p-4 flex justify-between items-center">
          <h3 className="text-white font-bold text-lg">جدول مقارنة العمالة والنقص (مستهدف العقد: {CONTRACT_TOTAL})</h3>
          <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold">تحديث فبراير 25 - يناير 26</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b-2 border-slate-200">
                <th className="px-6 py-4 text-slate-700 font-bold border-l border-slate-200">الأشهر</th>
                <th className="px-6 py-4 text-slate-700 font-bold border-l border-slate-200">العدد الفعلي المتواجد من {CONTRACT_TOTAL} عامل وعاملة</th>
                <th className="px-6 py-4 text-red-600 font-bold">إجمالي النقص</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {WORKFORCE_HISTORY.map((item, index) => {
                const gap = CONTRACT_TOTAL - item.actualOnSite;
                return (
                  <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800 border-l border-slate-100 bg-slate-50/30">{item.month}-{item.year.toString().slice(-2)}</td>
                    <td className="px-6 py-4 font-medium text-slate-600 border-l border-slate-100">{item.actualOnSite}</td>
                    <td className={`px-6 py-4 font-black ${gap > 40 ? 'text-red-700 bg-red-50/50' : 'text-red-500'}`}>
                      {gap}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-900 text-white font-bold">
                <td className="px-6 py-4">المتوسط السنوي</td>
                <td className="px-6 py-4">
                  {Math.round(WORKFORCE_HISTORY.reduce((acc, curr) => acc + curr.actualOnSite, 0) / WORKFORCE_HISTORY.length)}
                </td>
                <td className="px-6 py-4 text-red-400">
                  {Math.round(WORKFORCE_HISTORY.reduce((acc, curr) => acc + (CONTRACT_TOTAL - curr.actualOnSite), 0) / WORKFORCE_HISTORY.length)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  target?: number;
  unit: string;
  type: 'info' | 'danger' | 'warning' | 'secondary';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, target, unit, type }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 transition-transform hover:scale-[1.02]">
      <p className="text-sm font-semibold text-slate-500 mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <h4 className="text-3xl font-black text-slate-900">{value}</h4>
        <span className="text-sm font-medium text-slate-400">{unit}</span>
      </div>
      {target && (
        <div className="mt-4">
          <div className="flex justify-between text-[10px] mb-1">
            <span className="text-slate-400">نسبة الإنجاز من العقد</span>
            <span className="text-slate-600 font-bold">{Math.round((Number(value) / target) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${type === 'danger' ? 'bg-red-500' : 'bg-blue-600'}`}
              style={{ width: `${(Number(value) / target) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
