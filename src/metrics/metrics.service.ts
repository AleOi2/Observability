import { Counter, Histogram, Meter, metrics } from "@opentelemetry/api";
import { IMetricsRepository } from "./metrics.repository";

export class MetricsService implements IMetricsRepository {
    private meter : Meter = metrics.getMeter('custom-metrics');
    private counter: Map<string, Counter> = new Map<string, Counter>();
    private historgram: Map<string, Histogram> = new Map<string, Histogram>();

    constructor() {
    }

    getOrCreateCounter ( name: string): Counter {
        if (!this.counter.has(name)) {
            const counter = this.meter.createCounter(name, { });
            this.counter.set(name, counter);
        }
        return this.counter.get(name) as Counter;
    }

    getOrCreateHistogram ( name: string, ): Histogram {
        if (!this.historgram.has(name)) {
            const histogram = this.meter.createHistogram(name, {
            });
            this.historgram.set(name, histogram);
        }
        return this.historgram.get(name) as Histogram;
    }

    incrementCounter(name: string, value: number = 1, labels: Record<string, string> = {}): void {
        const counter = this.getOrCreateCounter(name);
        counter.add(value, labels);
    }

    observeHistogram(name: string, value: number, labels: Record<string, string> = {}): void {
        const histogram = this.getOrCreateHistogram(name);
        histogram.record(value, labels);
    }
}