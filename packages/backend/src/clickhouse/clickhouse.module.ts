import { Module } from '@nestjs/common';
import { ClickhouseService } from './clickhouse.service';
import { ClickhouseController } from './clickhouse.controller';

@Module({
  providers: [ClickhouseService],
  controllers: [ClickhouseController],
})
export class ClickhouseModule {}
