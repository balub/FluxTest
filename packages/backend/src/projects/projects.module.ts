import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
    imports:[PrismaModule],
    providers:[ProjectsService],
    controllers:[ProjectsController],
    exports:[ProjectsService]
})
export class ProjectsModule {}
