import { Controller, Get, Param } from '@nestjs/common';
import { TemplatesService } from 'src/templates/templates.service';

@Controller({ path: 'script-handler', version: '1' })
export class ScriptHandlerController {
    constructor(private readonly templateService: TemplatesService) { }

    @Get(":projectId")
    async getProjectTemplate(@Param('projectId') projectId: string) {
        return this.templateService.getTemplateForScript(projectId)
    }
}

