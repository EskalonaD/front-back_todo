import { from, Observable, of } from 'rxjs';
import { taskMocks } from '../../mock/tasks';
import { Task, unexposedTask } from '../model-layer';
import { ServerResponse, Status } from './data-access.interface';
import { TaskAPI } from './dto/task.dto';

const URL = 'http://localhost:3000';
const TASKS_PATH = 'task/tasks';

export class DAO {


    getAll(): Observable<TaskAPI[]> {
        return from(fetch(`${URL}/${TASKS_PATH}`, { method: 'GET' }).then(x => x.json()));
    }

    getOne(id: number): Observable<ServerResponse<TaskAPI>> {
        return from(fetch(`${URL}/${TASKS_PATH}/${id}`, { method: 'GET' }).then(x => x.json()));

    }

    create(task: TaskAPI): Observable<ServerResponse<TaskAPI>> {
        const response = fetch(`${URL}/${TASKS_PATH}`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ data: task }) }).then(x => x.json());
        return from(response);
    }
 

    delete(id: number): Observable<ServerResponse<null>> {
        const response = fetch(`${URL}/${TASKS_PATH}/${id}`, {method: 'DELETE'}).then(x => x.json());
        return from(response);
    }

    update(id: number, changes: any): Observable<ServerResponse<TaskAPI>> {
        const operationResult = fetch(`${URL}/${TASKS_PATH}/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ data: changes }) }).then(x => x.json());
        return from(operationResult);
    }

    //  completeTask(task: TaskAPI): Observable<{status: Status, errorMessage: string}> {
    //     const operationResult = fetch('http://localhost:3000/task/tasks/' + task.metadata.id, {method: 'PUT', body: JSON.stringify({operation: 'completeTask'})});
    //     // return from(operationResult.then(x => x.json()));

    //     return of({status: Status.ok});
    // }


}
