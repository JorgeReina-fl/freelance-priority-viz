import { useState } from 'react';

const CATEGORIES = [
    'Impuestos',
    'Clientes',
    'Software',
    'Oficina',
    'Servicios',
    'Formación',
    'Otros'
];

const TransactionForm = ({ onAdd, onClose }) => {
    const [formData, setFormData] = useState({
        concepto: '',
        monto: '',
        tipo: 'gasto',
        fecha_vencimiento: '',
        nivel_impacto: 5,
        rubro: 'Otros'
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'monto' || name === 'nivel_impacto' ? Number(value) : value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.concepto.trim()) newErrors.concepto = 'El concepto es obligatorio';
        if (!formData.monto || formData.monto <= 0) newErrors.monto = 'El monto debe ser mayor a 0';
        if (!formData.fecha_vencimiento) newErrors.fecha_vencimiento = 'La fecha es obligatoria';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Map form data to data structure
        // We map 'concepto' to 'categoria' to preserve chart labels
        // We map 'rubro' to a new field 'rubro' (or could be used for filtering later)
        const transaction = {
            tipo: formData.tipo,
            monto: Number(formData.monto),
            fecha_vencimiento: formData.fecha_vencimiento,
            categoria: formData.concepto, // Mapping Concepto -> categoria
            nivel_impacto: Number(formData.nivel_impacto),
            rubro: formData.rubro
        };

        onAdd(transaction);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-end z-50 transition-opacity">
            <div className="w-full max-w-md bg-[#1a1a1a] h-full shadow-2xl p-6 overflow-y-auto border-l border-gray-800 animate-slide-in">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-white">Nueva Transacción</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Tipo */}
                    <div className="flex gap-4 p-1 bg-gray-800 rounded-lg">
                        <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, tipo: 'ingreso' }))}
                            className={`flex-1 py-2 rounded-md font-medium transition-all ${formData.tipo === 'ingreso'
                                    ? 'bg-emerald-500 text-white shadow-lg'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Ingreso
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, tipo: 'gasto' }))}
                            className={`flex-1 py-2 rounded-md font-medium transition-all ${formData.tipo === 'gasto'
                                    ? 'bg-rose-500 text-white shadow-lg'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Gasto
                        </button>
                    </div>

                    {/* Concepto */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Concepto</label>
                        <input
                            type="text"
                            name="concepto"
                            value={formData.concepto}
                            onChange={handleChange}
                            className={`w-full bg-gray-900 border ${errors.concepto ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors`}
                            placeholder="Ej: Diseño Web Cliente X"
                        />
                        {errors.concepto && <p className="text-red-500 text-xs mt-1">{errors.concepto}</p>}
                    </div>

                    {/* Monto */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Monto (€)</label>
                        <input
                            type="number"
                            name="monto"
                            value={formData.monto}
                            onChange={handleChange}
                            className={`w-full bg-gray-900 border ${errors.monto ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors`}
                            placeholder="0.00"
                        />
                        {errors.monto && <p className="text-red-500 text-xs mt-1">{errors.monto}</p>}
                    </div>

                    {/* Fecha y Categoría (Row) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Vencimiento</label>
                            <input
                                type="date"
                                name="fecha_vencimiento"
                                value={formData.fecha_vencimiento}
                                onChange={handleChange}
                                className={`w-full bg-gray-900 border ${errors.fecha_vencimiento ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors`}
                            />
                            {errors.fecha_vencimiento && <p className="text-red-500 text-xs mt-1">{errors.fecha_vencimiento}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Categoría</label>
                            <select
                                name="rubro"
                                value={formData.rubro}
                                onChange={handleChange}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Impacto */}
                    <div>
                        <div className="flex justify-between mb-1">
                            <label className="block text-sm font-medium text-gray-400">Nivel de Impacto</label>
                            <span className={`text-sm font-bold ${formData.nivel_impacto >= 8 ? 'text-red-500' :
                                    formData.nivel_impacto >= 5 ? 'text-yellow-500' :
                                        'text-blue-500'
                                }`}>
                                {formData.nivel_impacto}/10
                            </span>
                        </div>
                        <input
                            type="range"
                            name="nivel_impacto"
                            min="1"
                            max="10"
                            value={formData.nivel_impacto}
                            onChange={handleChange}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Bajo</span>
                            <span>Medio</span>
                            <span>Crítico</span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-blue-900/20 mt-8"
                    >
                        Guardar Transacción
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TransactionForm;
