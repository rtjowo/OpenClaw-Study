import { DiagramSpec } from '../types.js';
export declare class MermaidGenerator {
    generate(spec: DiagramSpec, outputPath: string): Promise<void>;
    private generateCode;
    private inferDiagramType;
    private generateFlowchart;
    private assignStyleClasses;
    private getUniqueStyles;
    private collectUniqueStyles;
    private generateStyleKey;
    private generateStyleDefinitions;
    private generateContainer;
    private generateSequenceDiagram;
    private formatNode;
    private formatEdge;
    private formatId;
    private formatLabel;
}
//# sourceMappingURL=mermaid.d.ts.map