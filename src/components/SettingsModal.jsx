import { useState } from 'react';

const SettingsModal = ({ isOpen, onClose, onRestartTour, onClearData }) => {
    if (!isOpen) return null;

    const handleDelete = () => {
        if (window.confirm('¿Estás seguro de que quieres borrar TODOS los datos? Esta acción no se puede deshacer.')) {
            onClearData();
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-xl font-bold text-white">Configuración</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    {/* General Settings */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">General</h3>
                        <button
                            onClick={() => {
                                onRestartTour();
                                onClose();
                            }}
                            className="w-full flex items-center gap-3 p-4 bg-gray-800/50 hover:bg-gray-800 text-white rounded-lg transition-colors border border-gray-700"
                        >
                            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                </svg>
                            </div>
                            <div className="text-left">
                                <div className="font-medium">Reiniciar Tour Guiado</div>
                                <div className="text-xs text-gray-400">Vuelve a ver la explicación de las funcionalidades</div>
                            </div>
                        </button>
                    </div>

                    {/* Danger Zone */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-red-400 uppercase tracking-wider">Zona de Peligro</h3>
                        <div className="p-4 border border-red-500/30 bg-red-500/10 rounded-lg">
                            <p className="text-sm text-gray-300 mb-4">
                                Esta acción eliminará permanentemente todas tus transacciones y configuraciones.
                            </p>
                            <button
                                onClick={handleDelete}
                                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-red-600/20"
                            >
                                Borrar todos los datos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
