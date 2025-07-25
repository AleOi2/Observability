import { Controller, Get } from '@nestjs/common';
import { Counter } from 'prom-client';

@Controller()
export class AppController {
  private readonly counter = new Counter({
    name: 'http_requests_total',
    help: 'Total HTTP Requests',
    labelNames: ['method', 'route'],
  });

  @Get()
  getHello(): string {
    this.counter.inc({ method: 'GET', route: '/' });
    return 'Hello OpenTelemetry + Prometheus!';
  }
}