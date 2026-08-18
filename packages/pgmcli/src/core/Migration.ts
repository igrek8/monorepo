export interface Migration {
  readonly id: string;
  readonly created_at: number;
  readonly meta?: Record<string, unknown>;
}
