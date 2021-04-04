import { BehaviorSubject, combineLatest, from, Observable, of, Subject, Subscription } from 'rxjs';
import { tap, switchMap, map, take, repeat } from 'rxjs/operators'
import { TaskChanges } from '../controller/tasks.controller';
import { DAO, Status } from '../data-access-layer';
import { TaskAPI } from '../data-access-layer/dto/task.dto';
import { TaskCodec } from './codec/task-codec';
import { unexposedTask, Task } from './interfaces';
import { BaseStatusList, Field } from './task/task';

export interface updatedTaskData {
    description?: string;
    status?: string;
    extra?: Array<Field>
}


export interface TasksModelForView {
    getTasks: () => Observable<unexposedTask[]>;
}

export class TasksModel implements TasksModelForView {

    // seems like aggregation, but actually its composition
    private constructor(private codec: TaskCodec, private dao: DAO) { }
    isLoading!: boolean;
    tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);


    // singleton realization
    static getModel(): TasksModel {
        if (TasksModel.instance) return TasksModel.instance;
        return new TasksModel(new TaskCodec, new DAO);
    }

    private static instance: TasksModel;

    getTasks(): Observable<Task[]> {
        this.dao.getAll().pipe(
            take(1),
            map(tasks => {
                return tasks.map((task: TaskAPI) => this.codec.decode(task));
            }),
        ).subscribe(tasks => {
            this.tasks.next(tasks)
        
            console.log('getTasks, getValue', this.tasks.value)
        });

        return this.tasks.asObservable();
    }

    getTask(id: number): Observable<Task> {
        return this.dao.getOne(id).pipe(
            take(1),
            tap(x=> console.log('get one', x)),
            map(response => this.codec.decode(response.data))
        )
    }

    updateTask(taskID: number, data: Partial<TaskChanges>): void {
        this.isLoading = true;
        const task = this.tasks.getValue().find(el => el.id === taskID);

        if (task?.validateChange(data)) return task.addError('Incorrect changes');



        const subscpription = this.dao.update(taskID, data).subscribe(response => {

            const tasks = this.tasks.getValue();
            console.log('getValue', tasks)
            const updatedTaskIndex = tasks.findIndex(taskEl => taskEl.id === taskID);
            if (response.status === Status.ok) {
                tasks[updatedTaskIndex] = this.codec.decode(response.data);
                console.log('tasks', tasks)
                this.tasks.next(tasks);
            }
            if (response.status === Status.fail) {
                tasks[updatedTaskIndex]?.addError(response.errorMessage as string);
            }
        });


        subscpription.add(() => this.isLoading = false);

        this.timeoutUnsubscribe(subscpription);
    }



    changeTaskDescription(id: number, description: string): void {
        const tasks = this.tasks.getValue();
        // const task = this.codec.encode(tasks.find(el => el.id === id))
        this.dao.update(id, { description }).pipe(
            take(1),
        ).subscribe(
            response => {
                console.log('response', response)

                const tasks = this.tasks.getValue();
                const updatedTaskIndex = tasks.findIndex(taskEl => taskEl.id === id);
                if (response.status === Status.ok) {
                    tasks[updatedTaskIndex]?.completeTask();
                }
                if (response.status === Status.fail) {
                    tasks[updatedTaskIndex]?.addError(response.errorMessage as string);
                }
            })
    }

    completeTask(id: number): void {

        // todo: loading decorator



        const tasks = this.tasks.getValue();
        // const task = this.codec.encode(tasks.find(el => el.id === id))
        this.dao.update(id, { status: 'completed' }).pipe(
            take(1),
        ).subscribe(
            response => {
                console.log('response', response)

                const tasks = this.tasks.getValue();
                const updatedTaskIndex = tasks.findIndex(taskEl => taskEl.id === id);
                if (response.status === Status.ok) {
                    tasks[updatedTaskIndex]?.completeTask();
                }
                if (response.status === Status.fail) {
                    tasks[updatedTaskIndex]?.addError(response.errorMessage as string);
                }
            })
    }


    addTask(data: Partial<TaskChanges>) {

    }

    deleteTask(taskId: number) {
        // todo: loading decorator


        this.dao.delete(taskId).pipe(
            take(1),
        ).subscribe(response => {
            let tasks = this.tasks.getValue();

            if (response.status === Status.ok) {

                tasks = tasks.filter(task => task.id !== taskId);
                this.tasks.next(tasks);
            }
            else {
                const task = tasks.find(task => task.id === taskId);

                task?.addError(response.errorMessage);
            }
        })

    }

    setTaskStatus(taskId: number, status: string): void {

    }



    private timeoutUnsubscribe(sub: Subscription): void {
        const timeConstrain = 7000;

        setTimeout(() => {
            if (!sub.closed) {
                sub.unsubscribe();
                this.isLoading = false;
                console.log('Request was aborted. Reason: time exceeded');
            }
        }, timeConstrain);
    }
}