import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import EisenhowerMatrix from './components/EisenhowerMatrix';
import SankeyFlow from './components/SankeyFlow';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import DataControls from './components/DataControls';
import SummaryCards from './components/SummaryCards';
import EmptyState from './components/EmptyState';
import SettingsModal from './components/SettingsModal';
import Footer from './components/Footer';
import { useFinanceData } from './hooks/useFinanceData';
import { useAppTour } from './hooks/useAppTour';

function App() {
  const [activeView, setActiveView] = useState('eisenhower');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { transactions, addTransaction, deleteTransaction, exportData, importData, loadDemoData, clearAllData } = useFinanceData();
  const { startTour } = useAppTour();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />

      {/* Header */}
      <header className="border-b border-gray-800 bg-[#0a0a0a]/80 backdrop-blur-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Freelance Priority Viz
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Visualización inteligente de prioridades financieras
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div id="data-controls">
                <DataControls onExport={exportData} onImport={importData} />
              </div>

              {/* Settings Button */}
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors border border-gray-700"
                title="Configuración"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </button>

              {/* View Toggle */}
              <div id="view-toggle" className="flex gap-2 bg-[#1a1a1a] p-1 rounded-lg border border-gray-800">
                <button
                  onClick={() => setActiveView('eisenhower')}
                  className={`px-6 py-2.5 rounded-md font-medium transition-all duration-300 ${activeView === 'eisenhower'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-[#2a2a2a]'
                    }`}
                >
                  Matriz Eisenhower
                </button>
                <button
                  onClick={() => setActiveView('sankey')}
                  className={`px-6 py-2.5 rounded-md font-medium transition-all duration-300 ${activeView === 'sankey'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-[#2a2a2a]'
                    }`}
                >
                  Flujo Financiero
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 relative">
        {/* KPI Summary Cards */}
        <div id="kpi-dashboard">
          <SummaryCards transactions={transactions} />
        </div>

        {/* Info Card */}
        <div className="mb-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {activeView === 'eisenhower'
                  ? 'Matriz de Eisenhower Financiera'
                  : 'Diagrama de Flujo Financiero'}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {activeView === 'eisenhower'
                  ? 'Visualiza tus gastos según urgencia (días restantes) e importancia (nivel de impacto). El tamaño de cada burbuja representa el monto. Pasa el cursor sobre las burbujas para ver detalles.'
                  : 'Observa cómo fluye tu dinero desde la facturación bruta hasta el neto disponible, pasando por impuestos y gastos operativos. Las líneas muestran el porcentaje de cada flujo.'}
              </p>
            </div>
          </div>
        </div>

        {/* Visualization Container */}
        <div id="visualization-container" className="bg-[#1a1a1a] border border-gray-800 rounded-xl shadow-2xl overflow-hidden min-h-[600px]">
          {transactions.length === 0 ? (
            <EmptyState onLoadDemo={loadDemoData} />
          ) : (
            <div className="p-4">
              {activeView === 'eisenhower' ? (
                <EisenhowerMatrix data={transactions} />
              ) : (
                <SankeyFlow data={transactions} />
              )}
            </div>
          )}
        </div>

        {/* Legend for Eisenhower Matrix */}
        {activeView === 'eisenhower' && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Urgente e Importante', color: 'bg-red-500', desc: 'Impacto ≥8, ≤15 días' },
              { label: 'Importante', color: 'bg-yellow-500', desc: 'Impacto ≥8' },
              { label: 'Urgente', color: 'bg-orange-500', desc: '≤15 días' },
              { label: 'Baja Prioridad', color: 'bg-blue-500', desc: 'Resto' }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-4 h-4 ${item.color} rounded-full`}></div>
                  <span className="text-white font-medium text-sm">{item.label}</span>
                </div>
                <p className="text-gray-500 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Transaction List */}
        <div id="transaction-list">
          <TransactionList
            transactions={transactions}
            onDelete={deleteTransaction}
          />
        </div>

      </main>

      {/* FAB Button */}
      <button
        id="fab-button"
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-500 text-white rounded-full p-4 shadow-lg shadow-blue-500/40 transition-all transform hover:scale-110 z-30"
        title="Nueva Transacción"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      </button>

      {/* Modal Form */}
      {isFormOpen && (
        <TransactionForm
          onAdd={addTransaction}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onRestartTour={startTour}
        onClearData={clearAllData}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
