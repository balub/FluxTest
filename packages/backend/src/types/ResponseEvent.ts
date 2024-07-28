export interface ResponseEvent {
  projectId: string;
  componentId: string;
  sessionId: string;
  data: Record<any, any>;
}
