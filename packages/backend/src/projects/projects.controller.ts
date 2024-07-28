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
import { ResponseDataService } from 'src/response-data/response-data.service';
@Controller({ path: 'projects', version: '1' })
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly responseDataService: ResponseDataService,
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

  @Get(':projectID/insights')
  @UseGuards(JwtAuthGuard)
  async getProjectInsights(
    @Param('projectID') projectID: string,
    @Query('componentID') componentID: string,
  ) {
    console.log(projectID, componentID);
    return this.responseDataService.fetchData(projectID, componentID);
  }
}
