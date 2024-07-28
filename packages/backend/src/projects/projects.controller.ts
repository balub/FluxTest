import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import CreateProjectDTO from './dtos/create-project.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { AuthUser } from 'src/types/AuthUser';
import { ClickhouseService } from 'src/clickhouse/clickhouse.service';
import * as E from 'fp-ts/Either';
@Controller({ path: 'projects', version: '1' })
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly clickhouseService: ClickhouseService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUserProjects(@Param('id') id: string, @User() user: AuthUser) {
    return this.projectsService.getUserProjects(user.uid);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProjects(@Body() body: CreateProjectDTO, @User() user: AuthUser) {
    return this.projectsService.createProject(body, user.uid);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getProject(@Param('id') id: string) {
    return this.projectsService.getProject(id);
  }

  //   http://localhost:3170/v1/projects/:projectID/insights?componentId=script-handler
  @Get(':projectID/insights')
  @UseGuards(JwtAuthGuard)
  async getProjectInsights(
    @Param('projectID') projectID: string,
    @Query('componentId') componentId: string,
  ) {
    console.log(projectID, componentId);
    const res = await this.clickhouseService.fetchData(projectID, componentId);
    if (E.isLeft(res)) throw new Error(res.left);
    return res.right;
  }
}
