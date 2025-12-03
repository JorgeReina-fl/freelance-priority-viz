import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import mockData from '../data/mockData.json';

const EisenhowerMatrix = ({ data }) => {
    const svgRef = useRef(null);
    const tooltipRef = useRef(null);

    useEffect(() => {
        if (!svgRef.current || !data) return;

        // Clear previous content
        d3.select(svgRef.current).selectAll('*').remove();

        // Dimensions
        const margin = { top: 40, right: 40, bottom: 60, left: 80 };
        const width = 900 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;

        // Process data - only gastos (expenses)
        const expenses = data
            .filter(t => t.tipo === 'gasto')
            .map(t => {
                const today = new Date();
                const dueDate = new Date(t.fecha_vencimiento);
                const daysRemaining = Math.max(0, Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24)));
                return {
                    ...t,
                    daysRemaining: Math.min(daysRemaining, 60) // Cap at 60 days
                };
            });

        // Create SVG
        const svg = d3.select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Scales
        const xScale = d3.scaleLinear()
            .domain([0, 60])
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([1, 10])
            .range([height, 0]);

        const sizeScale = d3.scaleSqrt()
            .domain([0, d3.max(expenses, d => d.monto)])
            .range([5, 40]);

        // Color scale based on urgency/importance
        const colorScale = (d) => {
            if (d.nivel_impacto >= 8 && d.daysRemaining <= 15) return '#ef4444'; // Urgent & Important
            if (d.nivel_impacto >= 8) return '#f59e0b'; // Important
            if (d.daysRemaining <= 15) return '#f97316'; // Urgent
            return '#3b82f6'; // Low priority
        };

        // Add quadrant backgrounds
        const quadrants = [
            { x: 0, y: 0, label: 'Urgente y Caro', shortLabel: 'Importante y Urgente', color: 'rgba(239, 68, 68, 0.05)' },
            { x: width / 2, y: 0, label: 'Planificar', shortLabel: 'Importante, No Urgente', color: 'rgba(245, 158, 11, 0.05)' },
            { x: 0, y: height / 2, label: 'Delegar', shortLabel: 'Urgente, No Importante', color: 'rgba(249, 115, 22, 0.05)' },
            { x: width / 2, y: height / 2, label: 'Ignorar', shortLabel: 'Ni Urgente, Ni Importante', color: 'rgba(59, 130, 246, 0.05)' }
        ];

        svg.selectAll('.quadrant')
            .data(quadrants)
            .enter()
            .append('rect')
            .attr('class', 'quadrant')
            .attr('x', d => d.x)
            .attr('y', d => d.y)
            .attr('width', width / 2)
            .attr('height', height / 2)
            .attr('fill', d => d.color)
            .attr('stroke', 'rgba(160, 160, 160, 0.1)')
            .attr('stroke-width', 1);

        // Add dashed center lines
        svg.append('line')
            .attr('x1', width / 2)
            .attr('y1', 0)
            .attr('x2', width / 2)
            .attr('y2', height)
            .attr('stroke', 'rgba(160, 160, 160, 0.3)')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '5,5');

        svg.append('line')
            .attr('x1', 0)
            .attr('y1', height / 2)
            .attr('x2', width)
            .attr('y2', height / 2)
            .attr('stroke', 'rgba(160, 160, 160, 0.3)')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '5,5');

        // Add watermark quadrant labels
        svg.selectAll('.quadrant-watermark')
            .data(quadrants)
            .enter()
            .append('text')
            .attr('class', 'quadrant-watermark')
            .attr('x', d => d.x + width / 4)
            .attr('y', d => d.y + height / 4)
            .attr('text-anchor', 'middle')
            .attr('fill', 'rgba(160, 160, 160, 0.15)')
            .attr('font-size', '28px')
            .attr('font-weight', '700')
            .text(d => d.label);

        // Add small quadrant labels at top
        svg.selectAll('.quadrant-label')
            .data(quadrants)
            .enter()
            .append('text')
            .attr('class', 'quadrant-label')
            .attr('x', d => d.x + width / 4)
            .attr('y', d => d.y + 20)
            .attr('text-anchor', 'middle')
            .attr('fill', 'rgba(160, 160, 160, 0.4)')
            .attr('font-size', '12px')
            .attr('font-weight', '600')
            .text(d => d.shortLabel);


        // Add grid
        svg.append('g')
            .attr('class', 'grid')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(xScale)
                .tickSize(-height)
                .tickFormat('')
            );

        svg.append('g')
            .attr('class', 'grid')
            .call(d3.axisLeft(yScale)
                .tickSize(-width)
                .tickFormat('')
            );

        // Add axes
        const xAxis = svg.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(xScale).ticks(10));

        xAxis.append('text')
            .attr('x', width / 2)
            .attr('y', 45)
            .attr('fill', '#f5f5f5')
            .attr('font-size', '14px')
            .attr('font-weight', '600')
            .attr('text-anchor', 'middle')
            .text('Días Restantes para Pagar');

        const yAxis = svg.append('g')
            .attr('class', 'axis')
            .call(d3.axisLeft(yScale).ticks(10));

        yAxis.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -height / 2)
            .attr('y', -60)
            .attr('fill', '#f5f5f5')
            .attr('font-size', '14px')
            .attr('font-weight', '600')
            .attr('text-anchor', 'middle')
            .text('Nivel de Impacto');

        // Add bubbles with enter/update/exit pattern
        const bubbles = svg.selectAll('.bubble')
            .data(expenses, d => d.id);

        // Exit old bubbles
        bubbles.exit()
            .transition()
            .duration(500)
            .attr('r', 0)
            .attr('opacity', 0)
            .remove();

        // Enter new bubbles
        const bubblesEnter = bubbles.enter()
            .append('circle')
            .attr('class', 'bubble')
            .attr('cx', width / 2) // Start from center
            .attr('cy', height / 2)
            .attr('r', 0)
            .attr('fill', d => colorScale(d))
            .attr('opacity', 0)
            .attr('stroke', d => colorScale(d))
            .attr('stroke-width', 2);

        // Merge enter + update selections
        const bubblesUpdate = bubblesEnter.merge(bubbles);

        // Animate to final positions
        bubblesUpdate.transition()
            .duration(800)
            .delay((d, i) => i * 30)
            .attr('cx', d => xScale(d.daysRemaining))
            .attr('cy', d => yScale(d.nivel_impacto))
            .attr('r', d => sizeScale(d.monto))
            .attr('opacity', 0.7);

        // Tooltip interactions
        const tooltip = d3.select(tooltipRef.current);

        bubblesUpdate
            .on('mouseover', function (event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('opacity', 1)
                    .attr('stroke-width', 3)
                    .attr('r', sizeScale(d.monto) * 1.2);

                const [x, y] = d3.pointer(event, svgRef.current.parentElement);

                tooltip
                    .style('opacity', 1)
                    .style('left', (x + 10) + 'px')
                    .style('top', (y + 10) + 'px')
                    .html(`
            <div class="tooltip-label">${d.categoria}</div>
            <div class="tooltip-value">Monto: €${d.monto.toLocaleString()}</div>
            <div class="tooltip-value">Vencimiento: ${new Date(d.fecha_vencimiento).toLocaleDateString('es-ES')}</div>
            <div class="tooltip-value">Días restantes: ${d.daysRemaining}</div>
            <div class="tooltip-value">Impacto: ${d.nivel_impacto}/10</div>
          `);
            })
            .on('mousemove', function (event) {
                const [x, y] = d3.pointer(event, svgRef.current.parentElement);
                tooltip
                    .style('left', (x + 10) + 'px')
                    .style('top', (y + 10) + 'px');
            })
            .on('mouseout', function (event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('opacity', 0.7)
                    .attr('stroke-width', 2)
                    .attr('r', sizeScale(d.monto));

                tooltip.style('opacity', 0);
            });

        // Add title
        svg.append('text')
            .attr('x', width / 2)
            .attr('y', -15)
            .attr('text-anchor', 'middle')
            .attr('fill', '#f5f5f5')
            .attr('font-size', '18px')
            .attr('font-weight', '700')
            .text('Matriz de Eisenhower Financiera');

    }, [data]);

    return (
        <div className="relative w-full flex justify-center items-center p-8">
            <svg ref={svgRef} className="max-w-full"></svg>
            <div
                ref={tooltipRef}
                className="tooltip"
                style={{ opacity: 0 }}
            ></div>
        </div>
    );
};

export default EisenhowerMatrix;
