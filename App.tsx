
import React, { useState } from 'react';
import { ViewType } from './types';
import Dashboard from './components/Dashboard';
import Comparison from './components/Comparison';
import AiInsights from './components/AiInsights';
import { 
  ChartBarIcon, 
  ArrowsRightLeftIcon, 
  BuildingHospitalIcon,
  DocumentTextIcon
} from './components/Icons';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>(ViewType.DASHBOARD);

  return (
    <div className="flex min-h-screen bg-slate-50 overflow-hidden print:overflow-visible print:bg-white">
      {/* Sidebar - Hidden on Print */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-20 no-print">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <BuildingHospitalIcon className="w-8 h-8 text-blue-400" />
          <h1 className="text-xl font-bold tracking-tight">نظام إدارة العمالة</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveView(ViewType.DASHBOARD)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeView === ViewType.DASHBOARD ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <ChartBarIcon className="w-5 h-5" />
            <span className="font-medium">لوحة التحكم</span>
          </button>
          
          <button
            onClick={() => setActiveView(ViewType.COMPARISON)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeView === ViewType.COMPARISON ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <ArrowsRightLeftIcon className="w-5 h-5" />
            <span className="font-medium">المقارنة الشهرية</span>
          </button>
          
          <button
            onClick={() => setActiveView(ViewType.AI_INSIGHTS)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeView === ViewType.AI_INSIGHTS ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <DocumentTextIcon className="w-5 h-5" />
            <span className="font-medium">التقرير المعتمد (PDF)</span>
          </button>
        </nav>
        
        <div className="p-4 border-t border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>العدد المستهدف بالعقد:</span>
            <span className="font-bold text-blue-400">531</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative h-screen print:h-auto print:overflow-visible">
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-10 px-8 py-4 no-print">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800">
              {activeView === ViewType.DASHBOARD && 'ملخص القوى العاملة'}
              {activeView === ViewType.COMPARISON && 'مقارنة الأشهر'}
              {activeView === ViewType.AI_INSIGHTS && 'تصدير التقرير الفني'}
            </h2>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-slate-100 rounded-full text-sm font-semibold text-slate-600">
                مشروع M-232
              </div>
              <div className="px-4 py-2 bg-blue-50 rounded-full text-sm font-semibold text-blue-600">
                مستشفى الملك عبدالعزيز - جدة
              </div>
            </div>
          </div>
        </header>

        <div className={`p-8 ${activeView === ViewType.AI_INSIGHTS ? 'print:p-0 print:bg-white' : ''}`}>
          {activeView === ViewType.DASHBOARD && <Dashboard />}
          {activeView === ViewType.COMPARISON && <Comparison />}
          {activeView === ViewType.AI_INSIGHTS && <AiInsights />}
        </div>
      </main>
    </div>
  );
};

export default App;
