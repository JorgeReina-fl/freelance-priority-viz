export const generateDemoData = () => {
    const today = new Date();

    const demoTransactions = [
        // Ingresos
        {
            id: Date.now() + 1,
            tipo: 'ingreso',
            monto: 3500,
            fecha_vencimiento: new Date(today.getTime() + 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            categoria: 'Desarrollo Web Cliente A',
            nivel_impacto: 8,
            rubro: 'Clientes'
        },
        {
            id: Date.now() + 2,
            tipo: 'ingreso',
            monto: 2800,
            fecha_vencimiento: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            categoria: 'Consultoría UX/UI',
            nivel_impacto: 7,
            rubro: 'Clientes'
        },
        {
            id: Date.now() + 3,
            tipo: 'ingreso',
            monto: 4200,
            fecha_vencimiento: new Date(today.getTime() + 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            categoria: 'App Mobile Cliente B',
            nivel_impacto: 9,
            rubro: 'Clientes'
        },
        {
            id: Date.now() + 4,
            tipo: 'ingreso',
            monto: 1500,
            fecha_vencimiento: new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            categoria: 'Mantenimiento Web',
            nivel_impacto: 6,
            rubro: 'Clientes'
        },
        {
            id: Date.now() + 5,
            tipo: 'ingreso',
            monto: 5600,
            fecha_vencimiento: new Date(today.getTime() + 32 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            categoria: 'E-commerce Cliente C',
            nivel_impacto: 9,
            rubro: 'Clientes'
        },

        // Gastos - Impuestos
        {
            id: Date.now() + 6,
            tipo: 'gasto',
            monto: 735,
            fecha_vencimiento: new Date(today.getTime() + 17 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            categoria: 'IVA Trimestral',
            nivel_impacto: 10,
            rubro: 'Impuestos'
        },
        {
            id: Date.now() + 7,
            tipo: 'gasto',
            monto: 450,
            fecha_vencimiento: new Date(today.getTime() + 17 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            categoria: 'IRPF Trimestral',
            nivel_impacto: 10,
            rubro: 'Impuestos'
        },

        // Gastos - Software
        {
            id: Date.now() + 8,
            tipo: 'gasto',
            monto: 89,
            fecha_vencimiento: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            categoria: 'Adobe Creative Cloud',
            nivel_impacto: 4,
            rubro: 'Software'
        },
        {
            id: Date.now() + 9,
            tipo: 'gasto',
            monto: 25,
            fecha_vencimiento: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            categoria: 'GitHub Pro',
            nivel_impacto: 3,
            rubro: 'Software'
        },
        {
            id: Date.now() + 10,
            tipo: 'gasto',
            monto: 45,
            fecha_vencimiento: new Date(today.getTime() + 19 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            categoria: 'Figma Professional',
            nivel_impacto: 4,
            rubro: 'Software'
        },

        // Gastos - Servicios
        {
            id: Date.now() + 11,
            tipo: 'gasto',
            monto: 320,
            fecha_vencimiento: new Date(today.getTime() + 9 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            categoria: 'Seguro Autónomo',
            nivel_impacto: 8,
            rubro: 'Servicios'
        },
        {
            id: Date.now() + 12,
            tipo: 'gasto',
            monto: 180,
            fecha_vencimiento: new Date(today.getTime() + 27 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            categoria: 'Cuota Autónomo',
            nivel_impacto: 9,
            rubro: 'Servicios'
        },
        {
            id: Date.now() + 13,
            tipo: 'gasto',
            monto: 50,
            fecha_vencimiento: new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            categoria: 'Internet Fibra',
            nivel_impacto: 6,
            rubro: 'Servicios'
        },

        // Gastos - Oficina
        {
            id: Date.now() + 14,
            tipo: 'gasto',
            monto: 15,
            fecha_vencimiento: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            categoria: 'Hosting Web',
            nivel_impacto: 3,
            rubro: 'Oficina'
        },
        {
            id: Date.now() + 15,
            tipo: 'gasto',
            monto: 95,
            fecha_vencimiento: new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            categoria: 'Electricidad Oficina',
            nivel_impacto: 5,
            rubro: 'Oficina'
        },
        {
            id: Date.now() + 16,
            tipo: 'gasto',
            monto: 120,
            fecha_vencimiento: new Date(today.getTime() + 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            categoria: 'Material Oficina',
            nivel_impacto: 3,
            rubro: 'Oficina'
        },

        // Gastos - Formación
        {
            id: Date.now() + 17,
            tipo: 'gasto',
            monto: 150,
            fecha_vencimiento: new Date(today.getTime() + 23 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            categoria: 'Curso React Avanzado',
            nivel_impacto: 4,
            rubro: 'Formación'
        },

        // Gastos - Otros
        {
            id: Date.now() + 18,
            tipo: 'gasto',
            monto: 12,
            fecha_vencimiento: new Date(today.getTime() + 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            categoria: 'Dominio .com',
            nivel_impacto: 2,
            rubro: 'Otros'
        },
        {
            id: Date.now() + 19,
            tipo: 'gasto',
            monto: 250,
            fecha_vencimiento: new Date(today.getTime() + 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            categoria: 'Asesoría Fiscal',
            nivel_impacto: 7,
            rubro: 'Servicios'
        },
        {
            id: Date.now() + 20,
            tipo: 'gasto',
            monto: 75,
            fecha_vencimiento: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            categoria: 'AWS Hosting',
            nivel_impacto: 5,
            rubro: 'Software'
        }
    ];

    return demoTransactions;
};
