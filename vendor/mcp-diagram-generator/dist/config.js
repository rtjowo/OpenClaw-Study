import * as fs from 'fs/promises';
import * as path from 'path';
const DEFAULT_CONFIG = {
    defaultOutputPaths: {
        drawio: 'diagrams/drawio',
        mermaid: 'diagrams/mermaid',
        excalidraw: 'diagrams/excalidraw'
    },
    initialized: false
};
const CONFIG_FILE = '.diagram-config.json';
export class ConfigManager {
    config;
    configPath;
    constructor(projectRoot) {
        this.configPath = path.join(projectRoot, CONFIG_FILE);
        this.config = { ...DEFAULT_CONFIG };
    }
    async load() {
        try {
            const content = await fs.readFile(this.configPath, 'utf-8');
            this.config = { ...DEFAULT_CONFIG, ...JSON.parse(content) };
            return this.config;
        }
        catch (error) {
            // Config file doesn't exist, return defaults
            return this.config;
        }
    }
    async save() {
        await fs.writeFile(this.configPath, JSON.stringify(this.config, null, 2), 'utf-8');
    }
    getOutputPath(format) {
        return this.config.defaultOutputPaths[format];
    }
    async setOutputPath(format, path) {
        this.config.defaultOutputPaths[format] = path;
        await this.save();
    }
    isInitialized() {
        return this.config.initialized;
    }
    async markInitialized() {
        this.config.initialized = true;
        await this.save();
    }
    getConfig() {
        return { ...this.config };
    }
    async ensureDirectoriesExist(basePath) {
        for (const format of Object.keys(this.config.defaultOutputPaths)) {
            const dir = path.join(basePath, this.config.defaultOutputPaths[format]);
            await fs.mkdir(dir, { recursive: true });
        }
    }
}
//# sourceMappingURL=config.js.map