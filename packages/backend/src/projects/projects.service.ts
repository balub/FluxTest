import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateProjectDTO from './dtos/create-project.dto';

@Injectable()
export class ProjectsService {
    constructor(private readonly prisma: PrismaService) { }

    async createProject(userData: CreateProjectDTO, userId: string) {
        return this.prisma.project.create({
            data: {
                name: userData.name,
                createdBy: userId
            }
        })
    }

    async getUserProjects(userId: string) {
        return this.prisma.project.findMany({
            where: {
                createdBy: userId
            }
        })
    }

    async getProject(projectId: string) {
        return this.prisma.project.findMany({
            where: {
                id: projectId
            }
        })
    }
}
