import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';

// Exportador direto para Jaeger (teste primeiro)
export const jaegerExporter = new JaegerExporter({
  endpoint: 'http://localhost:14268/api/traces',
});

// Exportador OTLP para o collector (comentado temporariamente)  
export const traceExporter = new OTLPTraceExporter({
  url: 'http://localhost:4317', // Matches Docker service name + port
});

export const prometheusExporter = new PrometheusExporter({
  preventServerStart: true,
})

const sdk = new NodeSDK({
  serviceName: 'observability-app',
  traceExporter, // Usar Jaeger direto primeiro
  // traceExporter: jaegerExporter, // Usar Jaeger direto primeiro
  metricReader: prometheusExporter,
  instrumentations: [
    getNodeAutoInstrumentations(
      // {
      //   '@opentelemetry/instrumentation-http': {
      //     enabled: true,
      //     requestHook: (span, request) => {
      //       const url = (request as any).url || 'unknown';
      //       console.log(`🔍 HTTP Request: ${request.method} ${url}`);
      //       span.setAttributes({
      //         'http.request.method': request.method || 'unknown',
      //         'http.url': url,
      //         'service.name': 'observability-app',
      //       });
      //     },
      //     responseHook: (span, response) => {
      //       console.log(`📤 HTTP Response: ${response.statusCode}`);
      //       span.setAttributes({
      //         'http.response.status_code': response.statusCode || 0,
      //       });
      //     }
      //   },
      //   '@opentelemetry/instrumentation-express': {
      //     enabled: true,
      //   },
      // }
    ),
  ],
});

sdk.start();

console.log('🚀 OpenTelemetry SDK started successfully');
console.log('📊 Jaeger UI: http://localhost:16686');
console.log('📈 Prometheus: http://localhost:9090');