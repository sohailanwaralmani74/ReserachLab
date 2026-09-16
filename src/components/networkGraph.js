/**
 * Interactive SVG Node-Link Network Graph for Vanilla JS
 * Supports:
 * - Dynamic force-directed layout simulation
 * - Pan and zoom
 * - Node selection & inspection
 * - Link selection & evidence review
 * - Filter by type
 */

export class NetworkGraph {
  constructor(svgElement, { onNodeClick, onLinkClick }) {
    this.svg = svgElement;
    this.onNodeClick = onNodeClick;
    this.onLinkClick = onLinkClick;
    this.nodes = [];
    this.links = [];
    this.transform = { x: 0, y: 0, scale: 1 };
    this.isDragging = false;
    this.draggedNode = null;
    this.startPan = { x: 0, y: 0 };
    this.animFrame = null;

    this.initEvents();
  }

  setData(entities = [], relationships = [], filterType = 'all') {
    const width = this.svg.clientWidth || 800;
    const height = this.svg.clientHeight || 600;

    // Filter entities
    const filteredEntities = filterType === 'all'
      ? entities
      : entities.filter((e) => e.type === filterType);

    const entityIds = new Set(filteredEntities.map((e) => e.id));

    // Create nodes
    this.nodes = filteredEntities.map((e, idx) => {
      const angle = (idx / Math.max(1, filteredEntities.length)) * Math.PI * 2;
      const radius = Math.min(width, height) * 0.32;
      return {
        id: e.id,
        name: e.name,
        type: e.type,
        data: e,
        x: width / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * 50,
        y: height / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * 50,
        vx: 0,
        vy: 0,
      };
    });

    const nodeMap = new Map();
    this.nodes.forEach((n) => nodeMap.set(n.id, n));

    // Create links
    this.links = relationships
      .filter((r) => nodeMap.has(r.sourceId) && nodeMap.has(r.targetId))
      .map((r) => ({
        id: r.id,
        source: nodeMap.get(r.sourceId),
        target: nodeMap.get(r.targetId),
        relationshipType: r.relationshipType,
        evidenceIds: r.evidenceIds || [],
        date: r.date,
        data: r,
      }));

    this.render();
    this.simulate();
  }

  simulate() {
    let iterations = 60;
    const tick = () => {
      if (iterations <= 0) return;
      iterations--;

      // Simple repulsion
      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = i + 1; j < this.nodes.length; j++) {
          const a = this.nodes[i];
          const b = this.nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < 220) {
            const force = (220 - dist) / dist * 0.5;
            a.x -= dx * force * 0.1;
            a.y -= dy * force * 0.1;
            b.x += dx * force * 0.1;
            b.y += dy * force * 0.1;
          }
        }
      }

      // Simple spring attraction for links
      for (const link of this.links) {
        const dx = link.target.x - link.source.x;
        const dy = link.target.y - link.source.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const targetDist = 140;
        const force = (dist - targetDist) * 0.04;
        link.source.x += (dx / dist) * force;
        link.source.y += (dy / dist) * force;
        link.target.x -= (dx / dist) * force;
        link.target.y -= (dy / dist) * force;
      }

      this.updatePositions();
      this.animFrame = requestAnimationFrame(tick);
    };

    if (this.animFrame) cancelAnimationFrame(this.animFrame);
    this.animFrame = requestAnimationFrame(tick);
  }

  render() {
    this.svg.innerHTML = `
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--border-strong)" />
        </marker>
      </defs>
      <g id="viewport-group" transform="translate(${this.transform.x}, ${this.transform.y}) scale(${this.transform.scale})">
        <g id="links-group"></g>
        <g id="nodes-group"></g>
      </g>
    `;

    const linksGroup = this.svg.querySelector('#links-group');
    const nodesGroup = this.svg.querySelector('#nodes-group');

    // Render link elements
    this.links.forEach((l) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'link-item cursor-pointer');

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('stroke', 'var(--border-strong)');
      line.setAttribute('stroke-width', '1.5');
      line.setAttribute('marker-end', 'url(#arrow)');
      line.setAttribute('id', `line-${l.id}`);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('font-size', '10');
      text.setAttribute('fill', 'var(--text-4)');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-family', 'monospace');
      text.textContent = l.relationshipType;
      text.setAttribute('id', `link-text-${l.id}`);

      g.appendChild(line);
      g.appendChild(text);
      g.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.onLinkClick) this.onLinkClick(l);
      });

      linksGroup.appendChild(g);
    });

    // Render node elements
    this.nodes.forEach((n) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'node-item cursor-pointer');
      g.setAttribute('id', `node-${n.id}`);

      let color = 'var(--primary)';
      if (n.type === 'Person') color = '#2563eb';
      if (n.type === 'Company') color = '#059669';
      if (n.type === 'Organization') color = '#d97706';
      if (n.type === 'Contract') color = '#7c3aed';

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('r', '18');
      circle.setAttribute('fill', 'var(--surface)');
      circle.setAttribute('stroke', color);
      circle.setAttribute('stroke-width', '2.5');

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dy', '30');
      text.setAttribute('font-size', '11');
      text.setAttribute('font-weight', '600');
      text.setAttribute('fill', 'var(--text)');
      text.textContent = n.name.length > 20 ? n.name.slice(0, 18) + '...' : n.name;

      const badge = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      badge.setAttribute('text-anchor', 'middle');
      badge.setAttribute('dy', '4');
      badge.setAttribute('font-size', '9');
      badge.setAttribute('font-family', 'monospace');
      badge.setAttribute('fill', color);
      badge.textContent = n.type.slice(0, 3).toUpperCase();

      g.appendChild(circle);
      g.appendChild(badge);
      g.appendChild(text);

      g.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.onNodeClick) this.onNodeClick(n);
      });

      g.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        this.draggedNode = n;
      });

      nodesGroup.appendChild(g);
    });

    this.updatePositions();
  }

  updatePositions() {
    this.links.forEach((l) => {
      const line = this.svg.querySelector(`#line-${l.id}`);
      const text = this.svg.querySelector(`#link-text-${l.id}`);
      if (line) {
        line.setAttribute('x1', l.source.x);
        line.setAttribute('y1', l.source.y);
        line.setAttribute('x2', l.target.x);
        line.setAttribute('y2', l.target.y);
      }
      if (text) {
        text.setAttribute('x', (l.source.x + l.target.x) / 2);
        text.setAttribute('y', (l.source.y + l.target.y) / 2 - 4);
      }
    });

    this.nodes.forEach((n) => {
      const g = this.svg.querySelector(`#node-${n.id}`);
      if (g) {
        g.setAttribute('transform', `translate(${n.x}, ${n.y})`);
      }
    });
  }

  initEvents() {
    this.svg.addEventListener('mousedown', (e) => {
      if (this.draggedNode) return;
      this.isDragging = true;
      this.startPan = { x: e.clientX - this.transform.x, y: e.clientY - this.transform.y };
    });

    window.addEventListener('mousemove', (e) => {
      if (this.draggedNode) {
        const pt = this.screenToSVG(e.clientX, e.clientY);
        this.draggedNode.x = pt.x;
        this.draggedNode.y = pt.y;
        this.updatePositions();
      } else if (this.isDragging) {
        this.transform.x = e.clientX - this.startPan.x;
        this.transform.y = e.clientY - this.startPan.y;
        this.applyTransform();
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
      this.draggedNode = null;
    });

    this.svg.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
      this.zoom(zoomFactor, e.clientX, e.clientY);
    });
  }

  zoom(factor) {
    this.transform.scale = Math.max(0.3, Math.min(3, this.transform.scale * factor));
    this.applyTransform();
  }

  reset() {
    this.transform = { x: 0, y: 0, scale: 1 };
    this.applyTransform();
  }

  applyTransform() {
    const group = this.svg.querySelector('#viewport-group');
    if (group) {
      group.setAttribute('transform', `translate(${this.transform.x}, ${this.transform.y}) scale(${this.transform.scale})`);
    }
  }

  screenToSVG(screenX, screenY) {
    const rect = this.svg.getBoundingClientRect();
    return {
      x: (screenX - rect.left - this.transform.x) / this.transform.scale,
      y: (screenY - rect.top - this.transform.y) / this.transform.scale,
    };
  }
}
