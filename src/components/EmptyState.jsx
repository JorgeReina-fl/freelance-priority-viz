const EmptyState = ({ onLoadDemo }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[600px] bg-[#1a1a1a] border border-gray-800 rounded-xl p-12">
            <div className="max-w-md text-center">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3">
                    No hay transacciones
                </h3>

                {/* Description */}
                <p className="text-gray-400 mb-8 leading-relaxed">
                    Comienza añadiendo tu primera transacción o carga datos de ejemplo para ver cómo funcionan las visualizaciones.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={onLoadDemo}
                        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold rounded-lg shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105"
                    >
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="23 4 23 10 17 10"></polyline>
                                <polyline points="1 20 1 14 7 14"></polyline>
                                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                            </svg>
                            <span>Cargar Datos de Demo</span>
                        </div>
                    </button>
                </div>

                {/* Info */}
                <p className="text-gray-500 text-sm mt-6">
                    Los datos de demo incluyen 20 transacciones variadas para mostrar todas las funcionalidades
                </p>
            </div>
        </div>
    );
};

export default EmptyState;
