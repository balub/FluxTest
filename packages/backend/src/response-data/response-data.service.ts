import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseEvent } from 'src/types/ResponseEvent';

@Injectable()
export class ResponseDataService {
  constructor(private readonly prisma: PrismaService) {}

  async saveEvent(event: ResponseEvent) {
    return this.prisma.events.create({
      data: {
        projectId: event.projectId,
        componentId: event.componentId,
        sessionId: event.sessionId,
        data: JSON.stringify(event.data),
      },
    });
  }

  async fetchData(projectID: string, componentID: string) {
    return this.prisma.events.findMany({
      where: {
        projectId: projectID,
        componentId: componentID,
      },
    });
  }
}
