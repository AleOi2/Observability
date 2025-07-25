import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';

// Configuração do Jaeger para traces
const jaegerExporter = new JaegerExporter({
  endpoint: process.env.JAEGER_ENDPOINT || 'http://localhost:14268/api/traces',
});

// Configuração do Prometheus para métricas
const prometheusExporter = new PrometheusExporter(
  {
    port: 9090,
    endpoint: '/metrics',
  },
  () => {
    console.log('Prometheus scrape endpoint: http://localhost:9090/metrics');
  }
);

// Configuração do SDK do OpenTelemetry
const sdk = new NodeSDK({
  serviceName: 'observability-nestjs-app',
  traceExporter: jaegerExporter,
  metricReader: prometheusExporter,
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-express': {
        enabled: true,
      },
      '@opentelemetry/instrumentation-http': {
        enabled: true,
      },
      '@opentelemetry/instrumentation-fs': {
        enabled: false, // Desabilita para reduzir ruído
      },
    }),
  ],
});

// Inicializa o SDK
sdk.start();

console.log('OpenTelemetry iniciado com sucesso');

export default sdk;
