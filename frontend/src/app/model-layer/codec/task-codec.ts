import { TaskAPI } from 'src/app/data-access-layer/dto/task.dto';
import { Codec, Task } from '../interfaces';
import { Field, StandardTask } from '../task/task';
import { EncodeVisitor } from '../visitor/encode-visitor';

export class TaskCodec implements Codec<TaskAPI, Task> {
    path = '';

    decode(data: TaskAPI): Task {
        if (this.validateEncodedData(data)) {
            const { data: { main: { status, description }, extra }, metadata: { id, statusList } } = data;
            console.log(data)
            const newExtra = Object.entries(extra).reduce((acc: Field[], el) => {
                const [ fieldName, fieldValue ] = el;
                acc.push({ fieldName, fieldValue});
                return acc;
            }, []);
            const optionalData = {
                id,
                statusList,
                extraData: newExtra,
            }

            return new StandardTask(description, status, optionalData);
        }

        throw new Error('Can not create task with this data');
    }

    //@ts-ignore
    encode(task: encodedTask): TaskAPI {
        // return task.accept(new EncodeVisitor());

        return { metadata: { id: task.id } } as TaskAPI
    }

    private validateEncodedData(data: TaskAPI): boolean {
        // stub
        return true;
    }
}