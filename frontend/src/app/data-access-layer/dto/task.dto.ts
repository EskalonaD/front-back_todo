import { DAOContext } from '../data-access.interface';
import { Task } from '../../model-layer';

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

