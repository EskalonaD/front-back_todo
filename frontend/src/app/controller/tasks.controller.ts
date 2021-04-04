import { Observable } from 'rxjs';
import { unexposedTask, Task } from '../model-layer';
import { Field } from '../model-layer/task/task';
import { TasksModel, updatedTaskData } from '../model-layer/tasks.model';


type ModelSingleton = { getModel(): TasksModel}
export interface TaskChanges {
    status: string;
    description: string;
    extra: {
        [fieldName: string]: any
    }
}

export class TasksController {
    private constructor (private tasksModel: TasksModel) {}

    private static instance: TasksController;
    static getController(model: ModelSingleton): TasksController {
        if(TasksController.instance) return TasksController.instance;
        return new TasksController(model.getModel());
    }
    
    addTask(task: Partial<TaskChanges>):void {
        this.tasksModel.addTask(task);
    }
    updateTask(id: number, taskData: Partial<TaskChanges>)  {
        this.tasksModel.updateTask(id, taskData)
    }
    deleteTask(id: number) {
        this.tasksModel.deleteTask(id);

    }
    addField(id: number, taskData: Field) {

    }
    deleteField(id: number, fieldName: string) {

    }
    completeTask(id: number): void {
        this.tasksModel.completeTask(id);
    }
    changeDescription(id: number, description: string) {}
    getTasks(): Observable<unexposedTask[]> {
        return this.tasksModel.getTasks();
    }
    getTask(id: number): Observable<unexposedTask> {
        return this.tasksModel.getTask(id);
    } 

}
