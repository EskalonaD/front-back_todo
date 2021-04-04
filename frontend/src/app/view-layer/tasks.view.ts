import { Observable } from 'rxjs';
import { TasksController } from '../controller/tasks.controller';
import { unexposedTask } from '../model-layer';
import { TasksModel, updatedTaskData } from '../model-layer/tasks.model';

export class TasksView {
    // composition due to possibility of incorrect work of aggregation using angular
    constructor() {
        this.controller = TasksController.getController(TasksModel);
    }

    tasks!: Observable<unexposedTask[]>;

    protected controller: TasksController;

    completeTask(id:number) { 
        this.controller.completeTask(id);
    }

    updateTask(id: number, changes:updatedTaskData): void {
        this.controller.updateTask(id, changes);
    }

    deleteTask(id: number): void {
        this.controller.deleteTask(id);
    }
}
