import { Module } from '@nestjs/common';
import { ResponseDataService } from './response-data.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ResponseDataService],
  exports: [ResponseDataService],
})
export class ResponseDataModule {}
