import { Counter, Histogram } from "@opentelemetry/api";

export interface IMetricsRepository {
    getOrCreateCounter ( name: string): Counter ;
    getOrCreateHistogram ( name: string): Histogram;
    incrementCounter(name: string, value: number, labels: Record<string, string>): void 
    observeHistogram(name: string, value: number, labels: Record<string, string>): void 
}