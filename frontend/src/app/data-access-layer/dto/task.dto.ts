export interface TaskAPI {
    metadata: {
        statusList: string[];
        id: number;
    },
    data: {
        main: {
            status: string;
            description: string;
        },
        extra: {
            [key: string]: any
        };
    }
}

