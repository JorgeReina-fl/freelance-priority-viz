import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import mockData from '../data/mockData.json';
import { generateDemoData } from '../utils/demoData';
import { exportToExcel, importFromExcel } from '../utils/excelUtils';

const STORAGE_KEY = 'freelance_finance_data';

export const useFinanceData = () => {
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Error parsing saved data', e);
                return mockData.transactions;
            }
        }
        return mockData.transactions;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }, [transactions]);

    const addTransaction = (transaction) => {
        const newTransaction = {
            ...transaction,
            id: Date.now(), // Simple ID generation
        };
        setTransactions(prev => [...prev, newTransaction]);
        toast.success('Transacción añadida correctamente');
    };

    const deleteTransaction = (id) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
        toast.success('Transacción eliminada');
    };

    const updateTransaction = (id, updatedFields) => {
        setTransactions(prev => prev.map(t =>
            t.id === id ? { ...t, ...updatedFields } : t
        ));
        toast.success('Transacción actualizada');
    };

    // Reset to mock data (useful for testing or clearing data)
    // Reset to mock data (useful for testing or clearing data)
    const resetData = () => {
        setTransactions(mockData.transactions);
        toast.success('Datos reiniciados a valores por defecto');
    };

    // Clear all data (Empty State)
    const clearAllData = () => {
        setTransactions([]);
        toast.success('Todos los datos han sido eliminados');
    };

    // Export data as Excel file
    const exportData = () => {
        exportToExcel(transactions);
        toast.success('Datos exportados correctamente');
    };

    // Import data from Excel file
    const importData = (file) => {
        return importFromExcel(file)
            .then(importedTransactions => {
                setTransactions(importedTransactions);
                toast.success(`${importedTransactions.length} transacciones importadas correctamente`);
                return importedTransactions.length;
            })
            .catch(error => {
                toast.error(error.message);
                throw error;
            });
    };

    // Load demo data
    const loadDemoData = () => {
        const demoData = generateDemoData();
        setTransactions(demoData);
        toast.success('Datos de demo cargados');
    };

    return {
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        resetData,
        clearAllData,
        exportData,
        importData,
        loadDemoData
    };
};
