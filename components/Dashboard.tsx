
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, ReferenceLine, PieChart, Pie, Cell, Legend
} from 'recharts';
import { WORKFORCE_HISTORY, CONTRACT_TOTAL, PENALTY_PER_VACANCY } from '../data';

const COLORS = ['#2563eb', '#7c3aed', '#db2777', '#ea580c'];

const Dashboard: React.FC = () => {
  const latestData = WORKFORCE_HISTORY[WORKFORCE_HISTORY.length - 1];
  const gap = CONTRACT_TOTAL - latestData.actualOnSite;
  const estimatedPenalty = gap * PENALTY_PER_VACANCY;

  const pieData = [
    { name: 'النظافة', value: latestData.breakdown[0].staffCount },
    { name: 'العمليات', value: latestData.breakdown[1].staffCount },
    { name: 'الفنيين', value: latestData.breakdown[2].staffCount },
    { name: 'عجز', value: gap },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="العدد المستهدف" value={CONTRACT_TOTAL} unit="موظف" type="secondary" />
        <StatCard title="الحضور الفعلي" value={latestData.actualOnSite} target={CONTRACT_TOTAL} unit="موظف" type="info" />
        <StatCard title="إجمالي النقص" value={gap} unit="وظيفة" type="danger" />
        <StatCard title="الجزاءات التقديرية" value={estimatedPenalty.toLocaleString()} unit="ريال / شهر" type="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trend Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">تحليل الاستقرار التشغيلي السنوي</h3>
            <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold">12 شهر (فبراير 2025 - يناير 2026)</span>
          </div>
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
                <XAxis dataKey="month" axisLine={false} tickLine={false} dy={10} fontSize={11} />
                <YAxis axisLine={false} tickLine={false} domain={[400, 550]} fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <ReferenceLine y={CONTRACT_TOTAL} stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" label={{ value: 'الهدف', fill: '#ef4444', fontSize: 10, fontWeight: 'bold' }} />
                <Area type="monotone" dataKey="actualOnSite" name="الفعلي" stroke="#2563eb" strokeWidth={3} fill="url(#colorActual)" isAnimationActive={true} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Pie Chart */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">توزيع القوى العاملة (الشهر الحالي)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 3 ? '#f1f5f9' : COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Financial Impact Table */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 p-6 flex justify-between items-center">
          <div>
            <h3 className="text-white font-bold text-xl">سجل التكلفة والجزاءات السنوي</h3>
            <p className="text-slate-400 text-sm mt-1">تحليل شامل لجميع الأشهر من فبراير 2025 إلى يناير 2026</p>
          </div>
          <div className="text-left">
            <span className="text-slate-400 text-xs block">إجمالي الغرامات المحتملة (آخر شهر)</span>
            <span className="text-red-400 font-black text-2xl">{estimatedPenalty.toLocaleString()} ريال</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-slate-700 font-bold">الشهر</th>
                <th className="px-6 py-4 text-slate-700 font-bold">السنة</th>
                <th className="px-6 py-4 text-slate-700 font-bold">العجز</th>
                <th className="px-6 py-4 text-slate-700 font-bold">الغرامة المتوقعة</th>
                <th className="px-6 py-4 text-slate-700 font-bold">نسبة الالتزام</th>
                <th className="px-6 py-4 text-slate-700 font-bold">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {WORKFORCE_HISTORY.map((item, index) => {
                const gapVal = CONTRACT_TOTAL - item.actualOnSite;
                const penalty = gapVal * PENALTY_PER_VACANCY;
                const comp = ((item.actualOnSite / CONTRACT_TOTAL) * 100).toFixed(1);
                return (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{item.month}</td>
                    <td className="px-6 py-4 text-slate-500">{item.year}</td>
                    <td className="px-6 py-4 font-bold text-red-600">{gapVal}</td>
                    <td className="px-6 py-4 font-medium">{penalty.toLocaleString()} ر.س</td>
                    <td className="px-6 py-4 font-black text-blue-700">{comp}%</td>
                    <td className="px-6 py-4">
                      {gapVal > 50 ? (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">حرجة</span>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">مقبولة</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
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
  const colorMap = {
    info: 'border-blue-200 bg-blue-50/30 text-blue-700',
    danger: 'border-red-200 bg-red-50/30 text-red-700',
    warning: 'border-amber-200 bg-amber-50/30 text-amber-700',
    secondary: 'border-slate-200 bg-slate-50/30 text-slate-700'
  };

  return (
    <div className={`p-6 rounded-3xl border-2 transition-all hover:shadow-md ${colorMap[type]}`}>
      <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-70">{title}</p>
      <div className="flex items-baseline gap-2">
        <h4 className="text-3xl font-black">{value}</h4>
        <span className="text-xs font-bold opacity-60">{unit}</span>
      </div>
      {target && (
        <div className="mt-4 w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-current transition-all duration-1000"
            style={{ width: `${(Number(value) / target) * 100}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
