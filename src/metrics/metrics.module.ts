import { Module, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { MetricsService } from "./metrics.service";


@Module({
    imports: [],
    controllers: [],
    providers: [
        MetricsService,
        {
            provide: 'IMetricsRepository',
            // useFactory: () => new MetricsService(),
            useClass: MetricsService,
        }
    ],
    exports: ['IMetricsRepository', MetricsService]
    // providers: [{
    //     useClass: MetricsService,
    //     provide: IMetricsRepository
    // }],
    // exports: [{
    //     useClass: MetricsService,
    //     provide: IMetricsRepository
    // }],
})
export class MetricsModule implements OnModuleInit {
    constructor(
        private moduleRef: ModuleRef,

    ) {

    }

    async onModuleInit(
    ) {
    }
}