type Meta = {
    componentId: string;
    data: any
}
export default class CreateTemplateDTO {
    meta: Meta[];
    projectId: string
}