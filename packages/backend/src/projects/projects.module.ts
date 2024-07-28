import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ResponseDataModule } from 'src/response-data/response-data.module';

@Module({
  imports: [PrismaModule, ResponseDataModule],
  providers: [ProjectsService],
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule {}
