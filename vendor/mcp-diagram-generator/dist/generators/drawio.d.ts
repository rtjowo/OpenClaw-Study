import { DiagramSpec } from '../types.js';
export declare class DrawioGenerator {
    private nextCellId;
    private idMap;
    private flatNodes;
    private flatEdges;
    generate(spec: DiagramSpec, outputPath: string): Promise<void>;
    private generateXml;
    private resetState;
    private flattenElements;
    private flattenNode;
    private buildChildrenXml;
    private buildContainerXml;
    private buildNodeXml;
    private getRelativeCoordinates;
    private buildEdgesXml;
    private buildContainerStyle;
    private buildNodeStyle;
    private buildEdgeStyle;
    private getDefaultContainerStyle;
    private getDefaultNodeStyle;
    private styleToString;
    private escapeXml;
}
//# sourceMappingURL=drawio.d.ts.map