import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProjectsModule } from './projects/projects.module';
import { ComponentsModule } from './components/components.module';
import { TemplatesModule } from './templates/templates.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule,ProjectsModule, ComponentsModule, TemplatesModule],
})
export class AppModule {}
