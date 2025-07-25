// src/app.service.ts
import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';

@Injectable()
export class AppService {
  constructor(
    @InjectMetric('get_hello_calls_total') public counter: Counter<string>,
  ) {}

  getHello(): string {
    this.counter.inc(); // Increment the counter
    return 'Hello World!';
  }
}