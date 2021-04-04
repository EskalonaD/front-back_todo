import { Body, Controller, Delete, Get, Param, Put, Req } from '@nestjs/common';
import { TaskDTO } from 'src/dto/task.dto';
import { TaskService } from './task.service';

interface TaskChanges {
    status: string;
    description: string;
    extra: {
        [fieldName: string]: any;
    }
}

export enum Status {
    fail,
    ok,
}

export interface ServerResponse<T = any> {
    status: Status;
    data: T;
    errorMessage: string;
}

@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService: TaskService,
    ) { }


    //todo change response to serverResponse interface
    @Get('tasks')
    getTasks(): TaskDTO[] {
        return this.taskService.getTasks();
    }

    @Get('tasks/:id')
    getTask(@Param('id') id: string): any {
        const task = this.taskService.getTasks().find(task => task.metadata.id === +id);
        return task 
            ? this.createResponse(Status.ok, task)
            : this.createResponse(Status.fail, null, 'Task is not found');

    }

    @Put('tasks/:id')
    updateTasks(@Body('data') changes: Partial<TaskChanges>, @Param('id') id: string): any {
        const task = this.taskService.getTasks().find(task => task.metadata.id === +id);

        if (!task) {
            return this.createResponse(Status.fail, null, 'Object is not existing');
        }

        if (changes.status) task.data.main.status = changes.status;
        if (changes.description) task.data.main.description = changes.description;
        Object.assign(task.data.extra, changes.extra);
        task.data.extra = task.data.extra.filter(field => field.operation !== 'delete');

        return this.createResponse(Status.ok, task); 
    }

    @Delete('tasks/:id')
    deleteTask(@Param('id') id: string): ServerResponse<null> {
        const isTaskExisting = this.taskService.tasks.some(task => task.metadata.id === +id);

        if (isTaskExisting) {
            this.taskService.tasks.filter(task => task.metadata.id !== +id);
            return this.createResponse(Status.ok); 
        }
        else {

            return this.createResponse(Status.fail, null, 'Object is not existing');
        }
    }

    private createResponse(status: Status, data: any = null, errorMessage: string = null): ServerResponse {
        return { status, data, errorMessage }
    }
}
