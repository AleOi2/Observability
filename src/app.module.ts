import { Module } from '@nestjs/common';
import { makeCounterProvider, PrometheusModule } from '@willsoto/nestjs-prometheus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [
    PrometheusModule.register({
      path: '/metrics',
    }),
    MetricsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    makeCounterProvider({
      name: 'get_hello_calls_total',
      help: 'Total number of calls to getHello()',
    })
  ],
})
export class AppModule { }
