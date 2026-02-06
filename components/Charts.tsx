import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { ChartDataItem } from '../types';

/* --- Custom Tooltip --- */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/50 text-slate-800 animate-in fade-in zoom-in duration-200">
        <p className="font-bold text-sm mb-1">{label || payload[0].name}</p>
        <p className="text-lg font-mono text-blue-600">
          {payload[0].value} <span className="text-xs text-slate-500">votes</span>
        </p>
      </div>
    );
  }
  return null;
};

/* --- 3D Bar Chart --- */
interface BarChartProps {
  data: ChartDataItem[];
  dataKey?: string;
}

export const NeonBarChart: React.FC<BarChartProps> = ({ data, dataKey = "value" }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
        barSize={40}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis 
          dataKey="name" 
          stroke="#64748b" 
          tick={{ fill: '#64748b', fontSize: 12 }} 
          axisLine={false} 
          tickLine={false}
          interval={0}
          angle={-10}
          textAnchor="end"
        />
        <YAxis 
          stroke="#64748b" 
          tick={{ fill: '#64748b', fontSize: 12 }} 
          axisLine={false} 
          tickLine={false} 
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }} />
        <Bar dataKey={dataKey} radius={[8, 8, 4, 4]}>
          {data.map((entry, index) => (
             <Cell 
               key={`cell-${index}`} 
               fill={entry.color || (index % 2 === 0 ? '#3b82f6' : '#8b5cf6')} 
               style={{
                 filter: `drop-shadow(0px 4px 10px ${entry.color ? entry.color + '66' : '#3b82f666'})`,
               }}
             />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

/* --- 3D Pie Chart --- */
interface PieChartProps {
  data: ChartDataItem[];
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return percent > 0.05 ? (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs font-bold drop-shadow-md">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

export const NeonPieChart: React.FC<PieChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          innerRadius={60}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color || '#3b82f6'} 
              stroke="white"
              strokeWidth={2}
              style={{
                 filter: `drop-shadow(0px 0px 8px ${entry.color ? entry.color + '88' : '#3b82f688'})`,
              }}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          layout="vertical" 
          verticalAlign="middle" 
          align="right"
          wrapperStyle={{ paddingLeft: '20px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

/* --- Simple Progress Bars --- */
export const NeonProgressBar: React.FC<{ label: string; value: number; max: number; color: string }> = ({ label, value, max, color }) => {
  const width = (value / max) * 100;
  return (
    <div className="mb-6 group">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        <span className="text-sm font-mono text-slate-500">{value} votes</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden shadow-inner">
        <div 
          className="h-4 rounded-full transition-all duration-1000 ease-out relative"
          style={{ width: `${width}%`, backgroundColor: color, boxShadow: `0 0 15px ${color}` }}
        >
            <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-l from-white/30 to-transparent" />
        </div>
      </div>
    </div>
  );
};
