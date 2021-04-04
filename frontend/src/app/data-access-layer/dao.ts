import { from, Observable, of } from 'rxjs';
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
        const response = fetch(
            `${URL}/${TASKS_PATH}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: task })
            }).then(x => x.json());
        return from(response);
    }


    delete(id: number): Observable<ServerResponse<null>> {
        const response = fetch(`${URL}/${TASKS_PATH}/${id}`, { method: 'DELETE' }).then(x => x.json());
        return from(response);
    }

    update(id: number, changes: any): Observable<ServerResponse<TaskAPI>> {
        const operationResult = fetch(
            `${URL}/${TASKS_PATH}/${id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: changes })
            }).then(x => x.json());
        return from(operationResult);
    }
}
