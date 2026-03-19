export interface DiagramConfig {
    defaultOutputPaths: {
        drawio: string;
        mermaid: string;
        excalidraw: string;
    };
    initialized: boolean;
}
export declare class ConfigManager {
    private config;
    private configPath;
    constructor(projectRoot: string);
    load(): Promise<DiagramConfig>;
    save(): Promise<void>;
    getOutputPath(format: keyof DiagramConfig['defaultOutputPaths']): string;
    setOutputPath(format: keyof DiagramConfig['defaultOutputPaths'], path: string): Promise<void>;
    isInitialized(): boolean;
    markInitialized(): Promise<void>;
    getConfig(): DiagramConfig;
    ensureDirectoriesExist(basePath: string): Promise<void>;
}
//# sourceMappingURL=config.d.ts.map