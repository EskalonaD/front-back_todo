export class TaskDTO {
    metadata: {
        id: number;
        statusList: string[];
    };
    data: {
        main: {
            description: string;
            status: string;
        },
        extra: {
            [key: string]: any;
        },
    }
}
