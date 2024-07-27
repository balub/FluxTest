import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ComponentsService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllComponents() {
        return this.prisma.components.findMany({ where: { status: "ACTIVATE" } })
    }
}
