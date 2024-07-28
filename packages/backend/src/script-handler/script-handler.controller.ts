import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TemplatesService } from 'src/templates/templates.service';
import { CreateEventDTO } from './dto/create-event.dto';
import { ResponseDataService } from 'src/response-data/response-data.service';

@Controller({ path: 'script-handler', version: '1' })
export class ScriptHandlerController {
  constructor(
    private readonly templateService: TemplatesService,
    private readonly responseDataService: ResponseDataService,
  ) {}

  @Get(':projectId')
  async getProjectTemplate(@Param('projectId') projectId: string) {
    return this.templateService.getTemplateForScript(projectId);
  }

  @Post('events')
  async getResponseEvents(@Body() data: CreateEventDTO) {
    return this.responseDataService.saveEvent({
      projectId: data.projectId,
      componentId: data.componentId,
      sessionId: data.sessionId,
      data: data.data,
    });
  }
}
