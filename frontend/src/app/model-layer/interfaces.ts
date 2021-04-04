import { Field } from './task/task';


export interface Task extends unexposedTask {
   // todo: change argument type
    validateChange(change: any): boolean;
    clone(): Task;
    accept(visitor: TaskVisitor): any;
    completeTask(): void;
    update(): void;
    addField(fieldName: string, fieldValue: any, fieldType?: string): void;
    deleteField(fieldName: string): void;
    addError(error: string): void;
}

export interface unexposedTask {
    validateChange(change: any): boolean;

    readonly status: string;
    readonly errorList: readonly string[]; 
    readonly statusList: string[];
    readonly id: number;
    readonly description: string;
    readonly extraData: readonly Field[];
    clone(): unexposedTask;
    accept(visitor: TaskVisitor): any;
}

export interface TaskVisitor {

}

export interface Codec<T, K> {
    decode(data: T): K;
    encode(data: K): T;
}