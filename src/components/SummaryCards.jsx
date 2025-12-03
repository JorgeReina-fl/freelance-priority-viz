const SummaryCards = ({ transactions }) => {
    const today = new Date();

    // Calculate KPIs
    const totalRevenue = transactions
        .filter(t => t.tipo === 'ingreso')
        .reduce((sum, t) => sum + t.monto, 0);

    const pendingExpenses = transactions
        .filter(t => {
            if (t.tipo !== 'gasto') return false;
            const dueDate = new Date(t.fecha_vencimiento);
            return dueDate >= today;
        })
        .reduce((sum, t) => sum + t.monto, 0);

    const totalExpenses = transactions
        .filter(t => t.tipo === 'gasto')
        .reduce((sum, t) => sum + t.monto, 0);

    const netCashflow = totalRevenue - totalExpenses;

    const kpis = [
        {
            label: 'Facturación Total',
            value: totalRevenue,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
            ),
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-500/10',
            textColor: 'text-blue-400'
        },
        {
            label: 'Gastos Pendientes',
            value: pendingExpenses,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
            ),
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-500/10',
            textColor: 'text-orange-400'
        },
        {
            label: 'Cashflow Neto',
            value: netCashflow,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
            ),
            color: netCashflow >= 0 ? 'from-emerald-500 to-emerald-600' : 'from-red-500 to-red-600',
            bgColor: netCashflow >= 0 ? 'bg-emerald-500/10' : 'bg-red-500/10',
            textColor: netCashflow >= 0 ? 'text-emerald-400' : 'text-red-400'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {kpis.map((kpi, idx) => (
                <div
                    key={idx}
                    className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className={`${kpi.bgColor} p-3 rounded-lg`}>
                            <div className={kpi.textColor}>
                                {kpi.icon}
                            </div>
                        </div>
                        {idx === 2 && (
                            <span className={`text-xs font-medium px-2 py-1 rounded ${netCashflow >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                                }`}>
                                {netCashflow >= 0 ? 'Positivo' : 'Negativo'}
                            </span>
                        )}
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm mb-1">{kpi.label}</p>
                        <p className={`text-3xl font-bold ${kpi.textColor}`}>
                            €{Math.abs(kpi.value).toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SummaryCards;
