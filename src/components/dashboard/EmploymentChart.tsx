import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts'

export interface MonthlyEmploymentData {
  mes: string
  admissoes: number
  desligamentos: number
}

interface EmploymentChartProps {
  data: MonthlyEmploymentData[]
}

export function EmploymentChart({ data }: EmploymentChartProps) {
  return (
    <div className="panel p-5 lg:p-6">
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="text-lg font-bold text-slate-900">
          Movimentação de Empregos (Admissões vs. Desligamentos)
        </h2>
        <p className="text-sm text-slate-500">
          Acompanhamento mensal do fluxo formal de trabalhadores no Recife.
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            {/* Linhas de grade suaves */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            
            {/* Eixos estilizados com cores da marca */}
            <XAxis dataKey="mes" tickLine={false} stroke="#64748b" fontSize={12} />
            <YAxis tickLine={false} stroke="#64748b" fontSize={12} />
            
            {/* Tooltip estilizado como os cards da interface */}
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)',
                color: '#0f172a',
                fontSize: '13px',
                fontWeight: 600,
              }}
              cursor={{ fill: '#f8fafc' }}
            />
            
            <Legend wrapperStyle={{ paddingTop: '16px', fontSize: '13px', color: '#475569' }} />
            
            {/* Barras usando a paleta do ObservaRecife:
                - Admissões: Azul Royal/Brand (#1e40af / brand-800)
                - Desligamentos: Azul Claro/Slate Mist (#94a3b8) para manter harmonia sem poluição visual
            */}
            <Bar 
              dataKey="admissoes" 
              name="Admissões" 
              fill="#16324f" 
              radius={[6, 6, 0, 0]} 
            />
            <Bar 
              dataKey="desligamentos" 
              name="Desligamentos" 
              fill="#94a3b8" 
              radius={[6, 6, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}