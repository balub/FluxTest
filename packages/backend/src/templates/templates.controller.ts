import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import CreateTemplateDTO from './dtos/create-project.dto';
import { AuthUser } from 'src/types/AuthUser';
import { User } from 'src/decorators/user.decorator';

@Controller({ path: 'templates', version: '1' })
export class TemplatesController {
  constructor(private readonly templateService: TemplatesService) {}
  // @UseGuards(JwtAuthGuard) @User() authUser: AuthUser

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTemplate(
    @Body() body: CreateTemplateDTO,
    @User() authUser: AuthUser,
  ) {
    return this.templateService.createTemplate(body, authUser.uid);
  }

  @Get(':projectId')
  @UseGuards(JwtAuthGuard)
  async getProjectTemplate(@Param('projectId') projectId: string) {
    return this.templateService.getTemplateByProject(projectId);
  }
}
