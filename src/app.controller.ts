import { Controller, Get, Inject, OnModuleInit, Req, Res } from '@nestjs/common';
import { prometheusExporter } from './otel/otel';
import { Request, Response } from 'express';
import { IMetricsRepository } from './metrics/metrics.repository';
import { context, trace } from '@opentelemetry/api';

@Controller()
export class AppController implements OnModuleInit {
  private MetricService: IMetricsRepository;

  constructor(
    @Inject('IMetricsRepository')
    private readonly metricService: IMetricsRepository
  ) {
    this.MetricService = metricService;
  }

  async onModuleInit() {
    this.MetricService.getOrCreateCounter('custom_metric');

  }


  @Get('/metrics')
  async getMetrics(@Req() req: Request, @Res() res: Response) {
    const tracer = trace.getTracer('my-tracer');
    const span = tracer.startSpan('metrics_handler');

    try {
      // Adicionar atributos ao span
      span.setAttributes({
        'http.method': req.method,
        'http.url': req.url,
        'http.route': '/metrics',
        'endpoint': '/metrics'
      });

      this.MetricService.incrementCounter('validation_metrics', 1, { endpoint: '/metrics' });

      // ✅ Usar req/res reais para manter o tracing
      prometheusExporter.getMetricsRequestHandler(req, res);

    } catch (error) {
      span.recordException(error);
      span.setStatus({ code: 2, message: error.message });
      throw error;
    } finally {
      span.end();
    }
  }

  @Get('/tracing')
  async getTracing(@Req() req: Request, @Res() res: Response) {
    const tracer = trace.getTracer('my-tracer');
    const span = tracer.startSpan('tracing_handler');

    try {
      // Adicionar atributos ao span
      span.setAttributes({
        'http.method': req.method,
        'http.url': req.url,
        'http.route': '/tracing',
        'endpoint': '/tracing'
      });

      res.status(200).send('Tracing endpoint hit successfully');
    } catch (error) {
      span.recordException(error);
      span.setStatus({ code: 2, message: error.message });
      throw error;
    } finally {
      span.end();
    }
  }
}