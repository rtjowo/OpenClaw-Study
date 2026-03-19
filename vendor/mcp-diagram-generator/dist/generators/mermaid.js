import * as fs from 'fs/promises';
import * as path from 'path';
export class MermaidGenerator {
    async generate(spec, outputPath) {
        const mermaidCode = this.generateCode(spec);
        const dir = path.dirname(outputPath);
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(outputPath, mermaidCode, 'utf-8');
    }
    generateCode(spec) {
        const title = spec.title || 'Diagram';
        const diagramType = this.inferDiagramType(spec);
        const header = `# ${title}\n\n\`\`\`mermaid`;
        const footer = '```\n';
        let content = '';
        if (diagramType === 'flowchart') {
            content = this.generateFlowchart(spec);
        }
        else if (diagramType === 'sequence') {
            content = this.generateSequenceDiagram(spec);
        }
        else {
            content = this.generateFlowchart(spec);
        }
        return `${header}\n${content}\n${footer}`;
    }
    inferDiagramType(spec) {
        const nodes = spec.elements.filter(e => e.type === 'node');
        const hasDiamond = nodes.some(n => n.shape === 'diamond');
        if (hasDiamond || nodes.length > 0) {
            return 'flowchart';
        }
        return 'flowchart';
    }
    generateFlowchart(spec) {
        let content = 'flowchart TD\n\n';
        // 收集所有元素并按类型分组
        const containers = spec.elements.filter(e => e.type === 'container');
        const nodes = spec.elements.filter(e => e.type === 'node');
        const edges = spec.elements.filter(e => e.type === 'edge');
        // 收集所有唯一样式并生成 classDef
        const allElements = [...containers, ...nodes];
        this.assignStyleClasses(allElements);
        const uniqueStyles = this.getUniqueStyles(allElements);
        content += this.generateStyleDefinitions(uniqueStyles);
        // 生成容器（subgraph）
        for (const container of containers) {
            content += this.generateContainer(container, '  ');
        }
        // 生成顶层节点
        for (const node of nodes) {
            content += `  ${this.formatNode(node)}\n`;
        }
        content += '\n';
        // 生成边缘
        for (const edge of edges) {
            content += `  ${this.formatEdge(edge)}\n`;
        }
        return content;
    }
    assignStyleClasses(elements) {
        const styleToClass = new Map();
        let classIndex = 0;
        const processElement = (element) => {
            if (element.style && Object.keys(element.style).length > 0) {
                const styleKey = this.generateStyleKey(element.style);
                let className = styleToClass.get(styleKey);
                if (!className) {
                    className = `style${classIndex++}`;
                    styleToClass.set(styleKey, className);
                }
                // 存储 className 到 element 上
                if (!element.style) {
                    element.style = {};
                }
                element.style.__className = className;
            }
            // 递归处理容器内的子元素
            if (element.children && Array.isArray(element.children)) {
                for (const child of element.children) {
                    processElement(child);
                }
            }
        };
        for (const element of elements) {
            processElement(element);
        }
    }
    getUniqueStyles(elements) {
        const styles = new Map();
        const collectStyles = (element) => {
            if (element.style && element.style.__className && !styles.has(element.style.__className)) {
                styles.set(element.style.__className, element.style);
            }
            // 递归处理容器内的子元素
            if (element.children && Array.isArray(element.children)) {
                for (const child of element.children) {
                    collectStyles(child);
                }
            }
        };
        for (const element of elements) {
            collectStyles(element);
        }
        return styles;
    }
    collectUniqueStyles(elements) {
        // 这个方法已被 getUniqueStyles 替代
        return new Map();
    }
    generateStyleKey(style) {
        const parts = [];
        if (style.fillColor)
            parts.push(style.fillColor);
        if (style.strokeColor)
            parts.push(style.strokeColor);
        if (style.strokeWidth)
            parts.push(style.strokeWidth.toString());
        return parts.join('-');
    }
    generateStyleDefinitions(styles) {
        let content = '';
        for (const [className, style] of styles) {
            const parts = [];
            if (style.fillColor)
                parts.push(`fill:${style.fillColor}`);
            if (style.strokeColor)
                parts.push(`stroke:${style.strokeColor}`);
            if (style.strokeWidth)
                parts.push(`stroke-width:${style.strokeWidth}px`);
            if (style.fontColor)
                parts.push(`color:${style.fontColor}`);
            if (parts.length > 0) {
                content += `  classDef ${className} ${parts.join(',')}\n`;
            }
        }
        if (content) {
            content += '\n';
        }
        return content;
    }
    generateContainer(container, indent) {
        let content = '';
        const containerId = this.formatId(container.id);
        const containerName = this.formatLabel(container.name);
        content += `${indent}subgraph ${containerId}["${containerName}"]\n`;
        // 处理子元素
        if (container.children) {
            for (const child of container.children) {
                if (child.type === 'container') {
                    // 递归生成嵌套容器
                    content += this.generateContainer(child, indent + '  ');
                }
                else if (child.type === 'node') {
                    // 子节点使用自己的样式，不继承父容器的样式
                    if (child.style && Object.keys(child.style).length > 0) {
                        // 生成节点
                        content += `${indent}  ${this.formatNode(child)}\n`;
                    }
                    else {
                        // 如果没有样式，使用默认格式
                        content += `${indent}  ${this.formatId(child.id)}["${child.name}"]\n`;
                    }
                }
            }
        }
        content += `${indent}end\n`;
        return content;
    }
    generateSequenceDiagram(spec) {
        const nodes = spec.elements.filter(e => e.type === 'node');
        const edges = spec.elements.filter(e => e.type === 'edge');
        const participants = nodes.map(n => `  participant ${this.formatId(n.id)} as "${n.name}"`).join('\n');
        const messages = edges.map(e => `  ${this.formatId(e.source)}->>${this.formatId(e.target)}: ${e.label || ''}`).join('\n');
        return `sequenceDiagram\n${participants}\n${messages}`;
    }
    formatNode(node) {
        const id = this.formatId(node.id);
        const label = node.name;
        const shapeMap = {
            rect: ['[', ']'],
            ellipse: ['((', '))'],
            diamond: ['{', '}'],
            parallelogram: ['[/', '/]'],
            rounded: ['(', ')'],
            cylinder: ['[(', ')]'],
            cloud: ['(', ')'], // Mermaid doesn't have native cloud, using rounded
            other: ['[', ']']
        };
        const [start, end] = shapeMap[node.shape || 'other'] || ['[', ']'];
        // 使用 class 样式而不是内联样式
        let result = `${id}${start}"${label}"${end}`;
        if (node.style && node.style.__className) {
            result += `:::${node.style.__className}`;
        }
        return result;
    }
    formatEdge(edge) {
        const source = this.formatId(edge.source);
        const target = this.formatId(edge.target);
        const arrowStyle = edge.style?.endArrow === 'none' ? '---' : '-->';
        const label = edge.label ? `|${edge.label}|` : '';
        // 正确的 Mermaid 语法: source-->|label|target
        return `${source}${arrowStyle}${label}${target}`;
    }
    formatId(id) {
        return id.replace(/[^a-zA-Z0-9_]/g, '_');
    }
    formatLabel(label) {
        // 转义 Mermaid 特殊字符
        return label
            .replace(/"/g, '&quot;')
            .replace(/\n/g, '<br/>');
    }
}
//# sourceMappingURL=mermaid.js.map