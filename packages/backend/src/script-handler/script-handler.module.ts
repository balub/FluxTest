import { Module } from '@nestjs/common';
import { ScriptHandlerController } from './script-handler.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TemplatesModule } from 'src/templates/templates.module';
import { ClickhouseModule } from 'src/clickhouse/clickhouse.module';
import { ScriptHandlerService } from './script-handler.service';

@Module({
  imports: [PrismaModule, TemplatesModule, ClickhouseModule],
  controllers: [ScriptHandlerController],
  providers: [ScriptHandlerService],
})
export class ScriptHandlerModule {}
