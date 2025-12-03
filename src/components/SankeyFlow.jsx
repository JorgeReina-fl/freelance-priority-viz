import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';
import mockData from '../data/mockData.json';

const SankeyFlow = ({ data }) => {
    const svgRef = useRef(null);
    const tooltipRef = useRef(null);

    useEffect(() => {
        if (!svgRef.current || !data) return;

        // Clear previous content
        d3.select(svgRef.current).selectAll('*').remove();

        // Calculate financial flows from data
        const ingresos = data
            .filter(t => t.tipo === 'ingreso')
            .reduce((sum, t) => sum + t.monto, 0);

        const ivaIrpf = data
            .filter(t => t.tipo === 'gasto' && (
                (t.rubro === 'Impuestos') ||
                (!t.rubro && (
                    t.categoria.toLowerCase().includes('iva') ||
                    t.categoria.toLowerCase().includes('irpf') ||
                    t.categoria.toLowerCase().includes('retención')
                ))
            ))
            .reduce((sum, t) => sum + t.monto, 0);

        const gastosOperativos = data
            .filter(t => t.tipo === 'gasto' && !(
                (t.rubro === 'Impuestos') ||
                (!t.rubro && (
                    t.categoria.toLowerCase().includes('iva') ||
                    t.categoria.toLowerCase().includes('irpf') ||
                    t.categoria.toLowerCase().includes('retención')
                ))
            ))
            .reduce((sum, t) => sum + t.monto, 0);

        const netoDisponible = ingresos - ivaIrpf - gastosOperativos;

        // Sankey data structure
        const nodes = [
            { name: 'Facturación Bruta', id: 0 },
            { name: 'IVA/IRPF', id: 1 },
            { name: 'Gastos Operativos', id: 2 },
            { name: 'Neto Disponible', id: 3 }
        ];

        const links = [
            { source: 0, target: 1, value: ivaIrpf },
            { source: 0, target: 2, value: gastosOperativos },
            { source: 0, target: 3, value: netoDisponible }
        ];

        // Dimensions
        const margin = { top: 40, right: 200, bottom: 40, left: 200 };
        const width = 1000 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        // Create SVG
        const svg = d3.select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Create Sankey generator
        const sankeyGenerator = sankey()
            .nodeWidth(30)
            .nodePadding(40)
            .extent([[0, 0], [width, height]]);

        // Generate Sankey layout
        const { nodes: sankeyNodes, links: sankeyLinks } = sankeyGenerator({
            nodes: nodes.map(d => Object.assign({}, d)),
            links: links.map(d => Object.assign({}, d))
        });

        // Color scale
        const colorScale = d3.scaleOrdinal()
            .domain(['Facturación Bruta', 'IVA/IRPF', 'Gastos Operativos', 'Neto Disponible'])
            .range(['#3b82f6', '#ef4444', '#f59e0b', '#10b981']);

        // Create gradient for links
        const defs = svg.append('defs');

        sankeyLinks.forEach((link, i) => {
            const gradient = defs.append('linearGradient')
                .attr('id', `gradient-${i}`)
                .attr('gradientUnits', 'userSpaceOnUse')
                .attr('x1', link.source.x1)
                .attr('x2', link.target.x0);

            gradient.append('stop')
                .attr('offset', '0%')
                .attr('stop-color', colorScale(link.source.name))
                .attr('stop-opacity', 0.6);

            gradient.append('stop')
                .attr('offset', '100%')
                .attr('stop-color', colorScale(link.target.name))
                .attr('stop-opacity', 0.6);
        });

        // Draw links
        const linkElements = svg.append('g')
            .selectAll('.sankey-link')
            .data(sankeyLinks)
            .enter()
            .append('path')
            .attr('class', 'sankey-link')
            .attr('d', sankeyLinkHorizontal())
            .attr('stroke', (d, i) => `url(#gradient-${i})`)
            .attr('stroke-width', d => Math.max(1, d.width))
            .attr('fill', 'none')
            .attr('stroke-opacity', 0);

        // Animate links
        linkElements.transition()
            .duration(800)
            .delay((d, i) => i * 100)
            .attr('stroke-opacity', 0.5);

        // Tooltip for links
        const tooltip = d3.select(tooltipRef.current);

        linkElements
            .on('mouseover', function (event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('stroke-opacity', 0.9);

                const [x, y] = d3.pointer(event, svgRef.current.parentElement);

                tooltip
                    .style('opacity', 1)
                    .style('left', (x + 15) + 'px')
                    .style('top', (y - 15) + 'px')
                    .html(`
            <div class="tooltip-label">${d.source.name} → ${d.target.name}</div>
            <div class="tooltip-value">Monto: €${d.value.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</div>
            <div class="tooltip-value">Porcentaje: ${((d.value / ingresos) * 100).toFixed(1)}%</div>
          `);
            })
            .on('mousemove', function (event) {
                const [x, y] = d3.pointer(event, svgRef.current.parentElement);
                tooltip
                    .style('left', (x + 15) + 'px')
                    .style('top', (y - 15) + 'px');
            })
            .on('mouseout', function () {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('stroke-opacity', 0.5);

                tooltip.style('opacity', 0);
            });

        // Draw nodes
        const nodeElements = svg.append('g')
            .selectAll('.sankey-node')
            .data(sankeyNodes)
            .enter()
            .append('g')
            .attr('class', 'sankey-node');

        nodeElements.append('rect')
            .attr('x', d => d.x0)
            .attr('y', d => d.y0)
            .attr('height', 0) // Start with 0 height
            .attr('width', d => d.x1 - d.x0)
            .attr('fill', d => colorScale(d.name))
            .attr('opacity', 0)
            .attr('stroke', d => d3.color(colorScale(d.name)).darker(0.5))
            .attr('stroke-width', 2)
            .attr('rx', 4)
            .transition()
            .duration(800)
            .delay((d, i) => i * 150)
            .attr('height', d => d.y1 - d.y0)
            .attr('opacity', 0.9);

        // Node labels
        nodeElements.append('text')
            .attr('x', d => d.x0 < width / 2 ? d.x1 + 10 : d.x0 - 10)
            .attr('y', d => (d.y1 + d.y0) / 2)
            .attr('dy', '0.35em')
            .attr('text-anchor', d => d.x0 < width / 2 ? 'start' : 'end')
            .attr('fill', '#f5f5f5')
            .attr('font-size', '16px')
            .attr('font-weight', '600')
            .text(d => d.name);

        // Node values
        nodeElements.append('text')
            .attr('x', d => d.x0 < width / 2 ? d.x1 + 10 : d.x0 - 10)
            .attr('y', d => (d.y1 + d.y0) / 2 + 20)
            .attr('dy', '0.35em')
            .attr('text-anchor', d => d.x0 < width / 2 ? 'start' : 'end')
            .attr('fill', '#a0a0a0')
            .attr('font-size', '14px')
            .text(d => {
                const value = d.name === 'Facturación Bruta' ? ingresos :
                    d.name === 'IVA/IRPF' ? ivaIrpf :
                        d.name === 'Gastos Operativos' ? gastosOperativos :
                            netoDisponible;
                return `€${value.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`;
            });

        // Add title
        svg.append('text')
            .attr('x', width / 2)
            .attr('y', -15)
            .attr('text-anchor', 'middle')
            .attr('fill', '#f5f5f5')
            .attr('font-size', '18px')
            .attr('font-weight', '700')
            .text('Flujo Financiero del Autónomo');

        // Add summary box
        const summaryData = [
            { label: 'Facturación Total', value: ingresos, color: '#3b82f6' },
            { label: 'Impuestos (IVA/IRPF)', value: ivaIrpf, color: '#ef4444' },
            { label: 'Gastos Operativos', value: gastosOperativos, color: '#f59e0b' },
            { label: 'Neto Disponible', value: netoDisponible, color: '#10b981' }
        ];

    }, [data]);

    return (
        <div className="relative w-full flex flex-col justify-center items-center p-8">
            <svg ref={svgRef} className="max-w-full"></svg>
            <div
                ref={tooltipRef}
                className="tooltip"
                style={{ opacity: 0 }}
            ></div>

            {/* Summary Cards */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
                {[
                    {
                        label: 'Facturación Total',
                        value: data.filter(t => t.tipo === 'ingreso').reduce((s, t) => s + t.monto, 0),
                        color: 'bg-blue-500'
                    },
                    {
                        label: 'Impuestos',
                        value: data.filter(t => t.tipo === 'gasto' && (
                            (t.rubro === 'Impuestos') ||
                            (!t.rubro && (
                                t.categoria.toLowerCase().includes('iva') ||
                                t.categoria.toLowerCase().includes('irpf') ||
                                t.categoria.toLowerCase().includes('retención')
                            ))
                        )).reduce((s, t) => s + t.monto, 0),
                        color: 'bg-red-500'
                    },
                    {
                        label: 'Gastos Operativos',
                        value: data.filter(t => t.tipo === 'gasto' && !(
                            (t.rubro === 'Impuestos') ||
                            (!t.rubro && (
                                t.categoria.toLowerCase().includes('iva') ||
                                t.categoria.toLowerCase().includes('irpf') ||
                                t.categoria.toLowerCase().includes('retención')
                            ))
                        )).reduce((s, t) => s + t.monto, 0),
                        color: 'bg-yellow-500'
                    },
                    {
                        label: 'Neto Disponible',
                        value: data.filter(t => t.tipo === 'ingreso').reduce((s, t) => s + t.monto, 0) -
                            data.filter(t => t.tipo === 'gasto').reduce((s, t) => s + t.monto, 0),
                        color: 'bg-green-500'
                    }
                ].map((item, idx) => (
                    <div key={idx} className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4">
                        <div className={`w-3 h-3 ${item.color} rounded-full mb-2`}></div>
                        <div className="text-gray-400 text-sm mb-1">{item.label}</div>
                        <div className="text-white text-xl font-bold">
                            €{item.value.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SankeyFlow;
