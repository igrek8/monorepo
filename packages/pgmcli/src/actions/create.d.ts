export declare const templates: Record<string, string>;
export interface CreateOptions {
    name: string;
    dir: string;
    plan?: boolean;
    tag: string;
}
export declare function create(options: CreateOptions, console?: Console): Promise<void>;
//# sourceMappingURL=create.d.ts.map