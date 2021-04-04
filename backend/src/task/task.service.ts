import { Injectable } from '@nestjs/common';
import { TaskDTO } from 'src/dto/task.dto';

@Injectable()
export class TaskService {
    tasks = [
        {
            metadata: {
                id: 1,
                statusList: ['completed', 'incomplete'],
            },
            data: {
                main: {
                    description: 'Create first task',
                    status: 'completed',
                },
                extra: {},
                
            }
        },
        {
            metadata: {
                id: 2,
                statusList: ['completed', 'incomplete'],
            },
            data: {
                main: {
                    description: 'Complete CRUD for tasks',
                    status: 'incomplete',
                },
                extra: {
                    until: 'End of March'
                }
                
            }
        }
    ]


    getTasks(): TaskDTO[] {
        return this.tasks;
    }
}
