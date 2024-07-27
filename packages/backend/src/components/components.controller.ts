import { Controller, Get, UseGuards } from '@nestjs/common';
import { ComponentsService } from './components.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller({path:'components',version:'1'})
export class ComponentsController {
    constructor(private readonly componentsService:ComponentsService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllComponents(){
        return this.componentsService.getAllComponents()
    }
}
