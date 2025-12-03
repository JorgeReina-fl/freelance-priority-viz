# 💼 Freelance Priority Viz

> **Visualización inteligente de prioridades financieras para autónomos y freelancers**

Una aplicación web moderna que transforma tus datos financieros en visualizaciones interactivas de D3.js, ayudándote a tomar decisiones estratégicas sobre tus ingresos y gastos.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![D3.js](https://img.shields.io/badge/D3.js-F9A03C?style=for-the-badge&logo=d3.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 🚀 Demo en Vivo
👉 **[Probar Aplicación Online](https://freelance-priority-viz.onrender.com/)**

---

## 🎯 Características Principales

### 📊 Visualizaciones Interactivas

- **Matriz de Eisenhower Financiera**: Clasifica tus gastos según urgencia (días restantes) e importancia (nivel de impacto). Identifica rápidamente qué gastos requieren atención inmediata.
- **Diagrama de Flujo Sankey**: Visualiza cómo fluye tu dinero desde la facturación bruta hasta el neto disponible, pasando por impuestos y gastos operativos.

### 💾 Gestión de Datos Profesional

- **Excel Integrado**: Importa y exporta archivos `.xlsx` reales con estilos corporativos (gracias a `exceljs` y `xlsx`).
- **Plantillas Inteligentes**: Descarga una plantilla formateada con instrucciones para evitar errores al subir datos.
- **Persistencia Local**: Tus datos se guardan automáticamente en el navegador (`localStorage`) por privacidad.
- **Modo Demo**: Carga datos de ejemplo con un clic para probar la herramienta al instante.

### 📈 Dashboard Ejecutivo

- **KPIs en Tiempo Real**: 
  - Facturación Total
  - Gastos Pendientes
  - Cashflow Neto (con código de colores)

### ✨ Experiencia de Usuario

- **Tour Guiado**: Un asistente interactivo (Driver.js) te enseña a usar la app paso a paso.
- **Animaciones Suaves**: Transiciones D3.js fluidas (Enter/Update/Exit pattern).
- **Feedback Visual**: Notificaciones tipo "Toast" para confirmar acciones.
- **Tema Oscuro**: Interfaz moderna diseñada con Tailwind CSS.

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Propósito |
|------------|-----------|
| **React** | Framework de UI con hooks modernos |
| **D3.js v7** | Visualizaciones de datos personalizadas |
| **Tailwind CSS** | Diseño y estilos utility-first |
| **Vite** | Build tool rápido y moderno |
| **ExcelJS** | Generación de reportes Excel con estilos |
| **SheetJS (xlsx)** | Procesamiento de datos de hojas de cálculo |
| **Driver.js** | Tour de bienvenida interactivo |

---

## 🚀 Instalación y Uso Local

### Prerrequisitos

- Node.js 18+ 
- npm

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone [https://github.com/JorgeReina-fl/freelance-priority-viz.git](https://github.com/JorgeReina-fl/freelance-priority-viz.git)
cd freelance-priority-viz

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:5173
```
## 📖 Guía de Uso

### 1️⃣ Primera Vez
Al abrir la aplicación sin datos, verás un **estado vacío**. Tienes dos opciones para comenzar:
- **Tour Guiado:** Inicia un recorrido paso a paso por las funcionalidades.
- **Cargar Datos de Demo:** Usa este botón para visualizar inmediatamente la potencia de los gráficos con datos de prueba.

### 2️⃣ Añadir Transacciones
Haz clic en el botón flotante **+** (o "Nueva Transacción") para abrir el formulario:

| Campo | Descripción |
| :--- | :--- |
| **Tipo** | Ingreso o Gasto. |
| **Concepto** | Descripción breve (ej: "Proyecto Web Cliente A"). |
| **Monto** | Cantidad en euros. |
| **Fecha de Vencimiento** | Cuándo se cobra o se paga. |
| **Nivel de Impacto** | Del 1 al 10 (qué tan crítico es el movimiento). |
| **Categoría** | Etiquetas como Impuestos, Clientes, Software, etc. |

### 3️⃣ Explorar Visualizaciones (Matriz Eisenhower)
El gráfico principal organiza tus finanzas en 4 cuadrantes:

- **Eje X:** Días restantes hasta el vencimiento (Urgencia).
- **Eje Y:** Nivel de impacto (Importancia).
- **Tamaño:** Representa el monto del gasto.

**Código de Colores:**
- 🔴 **Rojo:** Urgente e Importante (Pagar ya).
- 🟡 **Amarillo:** Importante (Planificar).
- 🔵 **Azul:** Baja prioridad.

### 4️⃣ Excel y Seguridad
- **Plantilla:** Si tienes dudas del formato para importar datos, descarga la plantilla desde el botón *"¿No tienes el formato?"*.
- **Zona de Peligro:** En configuración (⚙️) puedes borrar todos los datos almacenados y reiniciar la app.

---

## 🧠 Lógica Financiera

Adaptamos la matriz de productividad para la gestión de gastos:

| Cuadrante | Condición | Color | Acción Recomendada |
| :--- | :--- | :--- | :--- |
| **Urgente y Caro** | Impacto ≥8 **Y** ≤15 días | 🔴 Rojo | Pagar inmediatamente |
| **Planificar** | Impacto ≥8 **Y** >15 días | 🟡 Amarillo | Reservar fondos |
| **Delegar** | Impacto <8 **Y** ≤15 días | 🟠 Naranja | Pagar pronto |
| **Ignorar** | Impacto <8 **Y** >15 días | 🔵 Azul | Baja prioridad |

---

## 📁 Estructura del Proyecto

```bash
src/
├── components/
│   ├── EisenhowerMatrix.jsx    # Scatter plot D3
│   ├── SankeyFlow.jsx          # Diagrama Sankey
│   ├── TransactionForm.jsx     # Formulario
│   ├── DataControls.jsx        # Lógica Excel (Import/Export)
│   └── ...
├── hooks/
│   └── useFinanceData.js       # Hook de estado y persistencia
├── utils/
│   ├── excelUtils.js           # Lógica SheetJS/ExcelJS
│   └── tourSteps.js            # Configuración del Tour
└── App.jsx                     # Componente principal
```
---

## 📄 Licencia
Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor
Jorge Reina

### 🐙 GitHub: @JorgeReina-fl

### 💼 LinkedIn: Jorge Reina

### 📸 Instagram: @jorgereina.fl

#### ⭐ Si este proyecto te resulta útil, considera darle una estrella en GitHub!
