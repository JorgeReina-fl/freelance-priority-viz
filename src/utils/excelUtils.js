import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';

// Column mapping: internal name -> Excel display name
const COLUMN_MAPPING = {
    id: 'ID',
    tipo: 'Tipo',
    monto: 'Monto (€)',
    fecha_vencimiento: 'Fecha de Vencimiento',
    categoria: 'Concepto',
    nivel_impacto: 'Nivel de Impacto (1-10)',
    rubro: 'Categoría'
};

// Reverse mapping: Excel display name -> internal name
const REVERSE_COLUMN_MAPPING = Object.entries(COLUMN_MAPPING).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
}, {});

/**
 * Export transactions to Excel file (using XLSX for simplicity)
 */
export const exportToExcel = (transactions) => {
    // Transform data to user-friendly format
    const excelData = transactions.map(t => ({
        [COLUMN_MAPPING.id]: t.id,
        [COLUMN_MAPPING.tipo]: t.tipo === 'ingreso' ? 'Ingreso' : 'Gasto',
        [COLUMN_MAPPING.monto]: t.monto,
        [COLUMN_MAPPING.fecha_vencimiento]: t.fecha_vencimiento,
        [COLUMN_MAPPING.categoria]: t.categoria,
        [COLUMN_MAPPING.nivel_impacto]: t.nivel_impacto,
        [COLUMN_MAPPING.rubro]: t.rubro || 'General'
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const columnWidths = [
        { wch: 12 }, // ID
        { wch: 10 }, // Tipo
        { wch: 12 }, // Monto
        { wch: 20 }, // Fecha
        { wch: 30 }, // Concepto
        { wch: 22 }, // Nivel de Impacto
        { wch: 15 }  // Categoría
    ];
    worksheet['!cols'] = columnWidths;

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transacciones');

    // Generate filename with date
    const filename = `finanzas-freelance-${new Date().toISOString().split('T')[0]}.xlsx`;

    // Download file
    XLSX.writeFile(workbook, filename);
};

/**
 * Download Excel template for data import with professional styling (using ExcelJS)
 */
export const downloadTemplate = async () => {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Freelance Priority Viz';
    workbook.created = new Date();

    // --- 1. Instructions Sheet ---
    const wsInstructions = workbook.addWorksheet('Instrucciones', {
        views: [{ showGridLines: false }]
    });

    // Title
    wsInstructions.mergeCells('A1:C1');
    const titleCell = wsInstructions.getCell('A1');
    titleCell.value = 'Guía de Importación de Datos';
    titleCell.font = { name: 'Arial', size: 16, bold: true, color: { argb: 'FF1F2937' } };
    titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
    wsInstructions.getRow(1).height = 30;

    // Headers
    const instructionHeaders = ['Columna', 'Descripción', 'Ejemplo'];
    wsInstructions.getRow(3).values = instructionHeaders;

    // Data
    const instructionsData = [
        ['Tipo', 'Ingreso o Gasto', 'Ingreso'],
        ['Monto (€)', 'Cantidad numérica (usa punto para decimales)', 1500.50],
        ['Fecha de Vencimiento', 'Fecha en formato YYYY-MM-DD', '2025-12-31'],
        ['Concepto', 'Descripción breve de la transacción', 'Diseño Web Cliente X'],
        ['Nivel de Impacto (1-10)', 'Número del 1 al 10 (1=Bajo, 10=Alto)', 8],
        ['Categoría', 'Categoría para agrupar (Clientes, Impuestos, etc.)', 'Clientes']
    ];

    instructionsData.forEach((row, index) => {
        wsInstructions.getRow(4 + index).values = row;
    });

    // Styling Instructions Table
    const instructionsTableRange = `A3:C${3 + instructionsData.length}`;

    // Header Style
    ['A3', 'B3', 'C3'].forEach(cellRef => {
        const cell = wsInstructions.getCell(cellRef);
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF1E3A8A' } // Dark Blue
        };
        cell.font = { color: { argb: 'FFFFFFFF' }, bold: true }; // White text
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    // Borders for all cells
    wsInstructions.getRows(3, instructionsData.length + 1).forEach(row => {
        row.eachCell({ includeEmpty: true }, cell => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            cell.alignment = { vertical: 'middle', wrapText: true };
        });
    });

    // Column Widths
    wsInstructions.getColumn(1).width = 25;
    wsInstructions.getColumn(2).width = 50;
    wsInstructions.getColumn(3).width = 25;


    // --- 2. Data Sheet (Template) ---
    const wsData = workbook.addWorksheet('Datos');

    const templateHeaders = [
        COLUMN_MAPPING.tipo,
        COLUMN_MAPPING.monto,
        COLUMN_MAPPING.fecha_vencimiento,
        COLUMN_MAPPING.categoria,
        COLUMN_MAPPING.nivel_impacto,
        COLUMN_MAPPING.rubro
    ];

    const headerRow = wsData.getRow(1);
    headerRow.values = templateHeaders;
    headerRow.height = 25;

    // Header Style
    headerRow.eachCell((cell) => {
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF1E3A8A' } // Dark Blue
        };
        cell.font = { color: { argb: 'FFFFFFFF' }, bold: true };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
    });

    // Example Row
    const exampleRow = wsData.getRow(2);
    exampleRow.values = [
        'Gasto',
        150.00,
        new Date().toISOString().split('T')[0],
        'Licencia Software',
        5,
        'Software'
    ];

    // Example Row Style
    exampleRow.eachCell((cell) => {
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
    });

    // Number Format for Monto (Column B / 2)
    wsData.getColumn(2).numFmt = '#,##0.00 "€"';

    // Column Widths
    wsData.columns = [
        { width: 15 }, // Tipo
        { width: 15 }, // Monto
        { width: 20 }, // Fecha
        { width: 35 }, // Concepto
        { width: 25 }, // Impacto
        { width: 20 }  // Categoría
    ];

    // Generate File
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'plantilla-importacion.xlsx';
    anchor.click();
    window.URL.revokeObjectURL(url);
};

/**
 * Import transactions from Excel file
 */
export const importFromExcel = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                // Find the sheet with data
                // We look for a sheet that has the required columns
                let targetSheetName = null;
                let jsonData = [];

                for (const sheetName of workbook.SheetNames) {
                    const worksheet = workbook.Sheets[sheetName];
                    const tempJson = XLSX.utils.sheet_to_json(worksheet);

                    if (tempJson.length > 0) {
                        const firstRow = tempJson[0];
                        // Check if this sheet has the "Monto (€)" column (a key indicator)
                        if (COLUMN_MAPPING.monto in firstRow || 'Monto' in firstRow) {
                            targetSheetName = sheetName;
                            jsonData = tempJson;
                            break;
                        }
                    }
                }

                if (!targetSheetName) {
                    // Fallback to first sheet if no specific match found, but warn if empty
                    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                    jsonData = XLSX.utils.sheet_to_json(firstSheet);
                }

                if (jsonData.length === 0) {
                    reject(new Error('El archivo Excel está vacío o no tiene datos válidos'));
                    return;
                }

                // Validate required columns
                const firstRow = jsonData[0];
                const requiredColumns = [
                    COLUMN_MAPPING.tipo,
                    COLUMN_MAPPING.monto,
                    COLUMN_MAPPING.categoria
                ];

                const missingColumns = requiredColumns.filter(col => !(col in firstRow));
                if (missingColumns.length > 0) {
                    reject(new Error(`Faltan columnas requeridas en la hoja de datos: ${missingColumns.join(', ')}`));
                    return;
                }

                // Transform data back to internal format
                const transactions = jsonData.map((row, index) => {
                    // Map tipo back to internal format
                    let tipo = 'gasto';
                    if (row[COLUMN_MAPPING.tipo]) {
                        const tipoValue = row[COLUMN_MAPPING.tipo].toString().toLowerCase();
                        if (tipoValue.includes('ingreso')) {
                            tipo = 'ingreso';
                        }
                    }

                    return {
                        id: row[COLUMN_MAPPING.id] || Date.now() + index,
                        tipo: tipo,
                        monto: Number(row[COLUMN_MAPPING.monto]) || 0,
                        fecha_vencimiento: row[COLUMN_MAPPING.fecha_vencimiento] || new Date().toISOString().split('T')[0],
                        categoria: row[COLUMN_MAPPING.categoria] || 'Sin categoría',
                        nivel_impacto: Number(row[COLUMN_MAPPING.nivel_impacto]) || 5,
                        rubro: row[COLUMN_MAPPING.rubro] || 'Otros'
                    };
                });

                resolve(transactions);
            } catch (error) {
                reject(new Error('Error al leer el archivo Excel: ' + error.message));
            }
        };

        reader.onerror = () => {
            reject(new Error('Error al leer el archivo'));
        };

        reader.readAsArrayBuffer(file);
    });
};
