import { DiagramSpec } from '../types.js';
export declare class ExcalidrawGenerator {
    private idMap;
    private positionMap;
    private nextId;
    generate(spec: DiagramSpec, outputPath: string): Promise<void>;
    private resetState;
    private generateData;
    private generateContainer;
    private generateNode;
    private generateEdge;
    private resolveContainerGeometry;
    private resolveNodeGeometry;
}
//# sourceMappingURL=excalidraw.d.ts.map