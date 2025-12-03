import { useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const TOUR_STORAGE_KEY = 'app_tour_completed';

export const useAppTour = () => {
    const hasSeenTour = () => {
        return localStorage.getItem(TOUR_STORAGE_KEY) === 'true';
    };

    const markTourAsCompleted = () => {
        localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    };

    const startTour = () => {
        const driverObj = driver({
            showProgress: true,
            showButtons: ['next', 'previous', 'close'],
            steps: [
                {
                    element: '#kpi-dashboard',
                    popover: {
                        title: '📊 Dashboard de KPIs',
                        description: 'Aquí ves tu salud financiera de un vistazo: facturación total, gastos pendientes y cashflow neto.',
                        side: 'bottom',
                        align: 'start'
                    }
                },
                {
                    element: '#visualization-container',
                    popover: {
                        title: '📈 Matriz de Eisenhower',
                        description: 'Este gráfico te dice qué facturas pagar primero según su urgencia (días restantes) e impacto (importancia). Las burbujas más grandes representan montos mayores.',
                        side: 'top',
                        align: 'center'
                    }
                },
                {
                    element: '#view-toggle',
                    popover: {
                        title: '🔄 Cambiar Vista',
                        description: 'Alterna entre la Matriz de Eisenhower y el Flujo Financiero (Sankey) para ver tus datos desde diferentes perspectivas.',
                        side: 'bottom',
                        align: 'center'
                    }
                },
                {
                    element: '#fab-button',
                    popover: {
                        title: '➕ Nueva Transacción',
                        description: 'Haz clic aquí para añadir tus ingresos y gastos. Puedes especificar el monto, fecha, nivel de impacto y categoría.',
                        side: 'left',
                        align: 'center'
                    }
                },
                {
                    element: '#data-controls',
                    popover: {
                        title: '💾 Exportar/Importar Excel',
                        description: 'Descarga tus datos en formato Excel para tener un backup, o sube un archivo Excel para importar transacciones.',
                        side: 'bottom',
                        align: 'end'
                    }
                },
                {
                    element: '#transaction-list',
                    popover: {
                        title: '📋 Historial de Transacciones',
                        description: 'Aquí puedes ver todas tus transacciones y eliminar las que ya no necesites.',
                        side: 'top',
                        align: 'center'
                    }
                },
                {
                    popover: {
                        title: '🎉 ¡Listo!',
                        description: 'Ya conoces todas las funcionalidades principales. Puedes volver a ver este tour haciendo clic en el botón de ayuda (?) en la esquina superior.',
                        side: 'center'
                    }
                }
            ],
            onDestroyStarted: () => {
                markTourAsCompleted();
                driverObj.destroy();
            }
        });

        driverObj.drive();
    };

    // Auto-start tour on first visit
    useEffect(() => {
        if (!hasSeenTour()) {
            // Delay to ensure DOM is ready
            const timer = setTimeout(() => {
                startTour();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    return {
        startTour,
        hasSeenTour
    };
};
