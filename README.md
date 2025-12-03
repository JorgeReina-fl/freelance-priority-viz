# 💼 Freelance Priority Viz

> **Visualización inteligente de prioridades financieras para autónomos y freelancers**

Una aplicación web moderna que transforma tus datos financieros en visualizaciones interactivas de D3.js, ayudándote a tomar decisiones estratégicas sobre tus ingresos y gastos.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react)
![D3.js](https://img.shields.io/badge/D3.js-7.9.0-F9A03C?style=flat&logo=d3.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.18-38B2AC?style=flat&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat&logo=vite)

---

## 🎯 Características Principales

### 📊 Visualizaciones Interactivas

- **Matriz de Eisenhower Financiera**: Clasifica tus gastos según urgencia (días restantes) e importancia (nivel de impacto). Identifica rápidamente qué gastos requieren atención inmediata.
  
- **Diagrama de Flujo Sankey**: Visualiza cómo fluye tu dinero desde la facturación bruta hasta el neto disponible, pasando por impuestos y gastos operativos.

### 💾 Gestión de Datos

- **Persistencia Local**: Tus datos se guardan automáticamente en el navegador (localStorage)
- **Exportar/Importar**: Descarga tus datos en formato JSON para backups o migración
- **Modo Demo**: Carga 20 transacciones de ejemplo para explorar las funcionalidades

### 📈 Dashboard Ejecutivo

- **KPIs en Tiempo Real**: 
  - Facturación Total
  - Gastos Pendientes
  - Cashflow Neto (con código de colores)

### ✨ Experiencia de Usuario

- **Animaciones Suaves**: Transiciones D3.js fluidas al añadir o eliminar datos
- **Tooltips Interactivos**: Información detallada al pasar el cursor
- **Diseño Responsivo**: Optimizado para desktop y móvil
- **Tema Oscuro**: Interfaz moderna con glassmorphism

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Propósito |
|------------|-----------|
| **React 19** | Framework de UI con hooks modernos |
| **D3.js v7** | Visualizaciones de datos personalizadas |
| **Tailwind CSS** | Diseño y estilos utility-first |
| **Vite** | Build tool rápido y moderno |
| **d3-sankey** | Plugin para diagramas Sankey |

---

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/freelance-priority-viz.git
cd freelance-priority-viz

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:5173
```

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
npm run lint     # Linter ESLint
```

---

## 📖 Guía de Uso

### 1️⃣ Primera Vez

Al abrir la aplicación sin datos, verás un **estado vacío** con un botón prominente:

- **"Cargar Datos de Demo"**: Carga 20 transacciones variadas para explorar las visualizaciones
- **"+ Nueva Transacción"** (FAB): Añade tu primera transacción manualmente

### 2️⃣ Añadir Transacciones

Haz clic en el botón flotante **+** (esquina inferior derecha) para abrir el formulario:

- **Tipo**: Ingreso o Gasto
- **Concepto**: Descripción (ej: "Proyecto Web Cliente A")
- **Monto**: Cantidad en euros
- **Fecha de Vencimiento**: Cuándo se cobra/paga
- **Nivel de Impacto**: Del 1 al 10 (qué tan crítico es)
- **Categoría**: Impuestos, Clientes, Software, etc.

### 3️⃣ Explorar Visualizaciones

#### Matriz de Eisenhower
- **Eje X**: Días restantes hasta el vencimiento (urgencia)
- **Eje Y**: Nivel de impacto (importancia)
- **Tamaño**: Monto del gasto
- **Color**: Clasificación automática
  - 🔴 Rojo: Urgente e Importante
  - 🟡 Amarillo: Importante
  - 🟠 Naranja: Urgente
  - 🔵 Azul: Baja prioridad

#### Flujo Financiero (Sankey)
- Visualiza el flujo de dinero desde ingresos hasta neto disponible
- Identifica qué porcentaje se va en impuestos vs. gastos operativos

### 4️⃣ Gestionar Datos

- **Exportar**: Descarga tus datos (botón en header)
- **Importar**: Sube un archivo JSON previamente exportado
- **Eliminar**: Usa el icono de papelera en la tabla de transacciones

---

## 🧠 Lógica Financiera: La Matriz de Eisenhower

### Concepto Original

La Matriz de Eisenhower es una herramienta de gestión del tiempo que clasifica tareas en 4 cuadrantes:

1. **Urgente e Importante**: Hacer inmediatamente
2. **Importante, No Urgente**: Planificar
3. **Urgente, No Importante**: Delegar
4. **Ni Urgente, Ni Importante**: Eliminar/Ignorar

### Adaptación Financiera

En esta aplicación, adaptamos la matriz para **gastos**:

- **Urgencia**: Calculada automáticamente según los días restantes hasta el vencimiento
  - ≤ 15 días = Urgente
  - \> 15 días = No urgente

- **Importancia**: Definida manualmente por el usuario (nivel de impacto 1-10)
  - ≥ 8 = Importante
  - < 8 = No importante

### Clasificación Automática

| Cuadrante | Condición | Color | Acción Recomendada |
|-----------|-----------|-------|-------------------|
| **Urgente y Caro** | Impacto ≥8 Y ≤15 días | 🔴 Rojo | Pagar inmediatamente |
| **Planificar** | Impacto ≥8 Y >15 días | 🟡 Amarillo | Reservar fondos |
| **Delegar** | Impacto <8 Y ≤15 días | 🟠 Naranja | Pagar pronto |
| **Ignorar** | Impacto <8 Y >15 días | 🔵 Azul | Baja prioridad |

### Beneficios

✅ **Priorización Visual**: Identifica rápidamente qué gastos requieren atención  
✅ **Prevención de Multas**: No olvides pagos importantes con vencimiento cercano  
✅ **Planificación de Cashflow**: Reserva dinero para gastos importantes futuros  
✅ **Optimización**: Identifica gastos de bajo impacto que podrías eliminar  

---

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── EisenhowerMatrix.jsx    # Scatter plot D3
│   ├── SankeyFlow.jsx           # Diagrama Sankey
│   ├── TransactionForm.jsx      # Formulario de entrada
│   ├── TransactionList.jsx      # Tabla de transacciones
│   ├── SummaryCards.jsx         # KPIs dashboard
│   ├── DataControls.jsx         # Exportar/Importar
│   └── EmptyState.jsx           # Estado vacío
├── hooks/
│   └── useFinanceData.js        # Hook de estado global
├── utils/
│   └── demoData.js              # Generador de datos demo
├── data/
│   └── mockData.json            # Datos de ejemplo
└── App.jsx                      # Componente principal
```

---

## 🎨 Personalización

### Modificar Categorías

Edita `src/components/TransactionForm.jsx`:

```javascript
const CATEGORIES = [
    'Impuestos',
    'Clientes',
    'Software',
    'Tu Categoría Aquí'  // Añade aquí
];
```

### Ajustar Umbrales de Urgencia

Edita `src/components/EisenhowerMatrix.jsx`:

```javascript
// Cambiar de 15 a 30 días
if (d.daysRemaining <= 30) return '#f97316'; // Urgente
```

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

**Tu Nombre**  
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)

---

## 🙏 Agradecimientos

- Inspirado en la metodología de Eisenhower para gestión del tiempo
- Visualizaciones basadas en ejemplos de [D3.js Gallery](https://observablehq.com/@d3/gallery)
- Diseño influenciado por las mejores prácticas de UI/UX modernas

---

**⭐ Si este proyecto te resulta útil, considera darle una estrella en GitHub!**
