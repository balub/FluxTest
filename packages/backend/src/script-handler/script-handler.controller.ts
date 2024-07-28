import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TemplatesService } from 'src/templates/templates.service';
import { CreateEventDTO } from './dto/create-event.dto';
import { ClickhouseService } from 'src/clickhouse/clickhouse.service';
import * as E from 'fp-ts/Either';

@Controller({ path: 'script-handler', version: '1' })
export class ScriptHandlerController {
  constructor(
    private readonly templateService: TemplatesService,
    private readonly clickhouseService: ClickhouseService,
  ) {}

  @Get(':projectId')
  async getProjectTemplate(@Param('projectId') projectId: string) {
    return this.templateService.getTemplateForScript(projectId);
  }

  @Post('events')
  async getResponseEvents(@Body() data: CreateEventDTO) {
    const res = await this.clickhouseService.saveEvent({
      projectId: data.projectId,
      componentId: data.componentId.toUpperCase(),
      data: data.data,
    });
    if (E.isLeft(res)) throw new Error(res.left);
    return res.right;
  }
}
