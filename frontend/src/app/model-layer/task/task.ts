import { Task } from '../interfaces';

export enum BaseStatusList {
    completed = 'completed',
    incomplete = 'incomplete',
}

enum TaskFields {
    description = 'description',
    status = 'status',
}

const fieldErrorBaseMessages = {
    wrongData: 'Data is incompatable to this field.',
    wrongFieldType: 'There could not be a field with such name.',
    existedField: 'Field with this name is already existed.',
}

export type Field = {
    fieldName: string;
    fieldValue: any;
    fieldType?: string;
}

// todo: think about inner state that will store errors 

export class StandardTask implements Task {
    constructor(
        private _description: string,
        private _status: string,
        extra?: {
            id?: number,
            statusList?: string[],
            extraData?: Array<{
                fieldName: string,
                fieldValue: any,
                fieldType?: string,
            }>,
        }
    ) {
        this.id = extra?.id ?? NaN;
        this.extraFields = extra?.extraData ?? [];
        this._statusList = extra?.statusList ?? Object.values(BaseStatusList);
    }
    readonly id: number;
    private extraFields: Field[] = [];
    private _statusList: string[];
    private _errorList: string[] = [];


    set status(newStatus: string) {
        if(this.validateStatus(newStatus)) {
            // this.removeError(TaskFields.status);
            this._status = newStatus;
        }

        // this._errorList.push({field: TaskFields.status, message: fieldErrorBaseMessages.wrongData})
    }
    get status() {
        return this._status;
    }

    // private removeErrors(errorField: string): void {
    //     this._errorList.filter(fieldError => fieldError.field = errorField);
    // }

addError(error: string): void {
    this._errorList.push(error);
}

    addField(fieldName: string, fieldValue: any, fieldType?: string): void {
        const field: Field = { fieldName, fieldValue, ...(fieldType && {fieldType}) };
        if (this.validateFieldAdding(field) ) {
            this.extraFields.push(field);
        }

        // this.removeError(fieldName);
        this.extraFields.push(field);
    }

    // Todo: implement
    validateFieldAdding(field: Field): boolean {
        //stub
        return true;
    }
    


    set description (newDescription: string) {
        if(this.validateDescription(newDescription)) {
            this._description = newDescription;
        }
    }

    get description() {
        return this._description;
    }

    get errorList(): readonly string[] {
        return this._errorList; 
    } 

    get statusList() {
        return this._statusList;
    }

    // todo: implement
    update(): void {

    }
    
    //todo: inplement
    deleteField(fieldName: string): void {

    }

    get extraData(): readonly Field[] {
        return this.extraFields;
    }

    // todo: implement
    //@ts-ignore
    validateChange(change): boolean {
        return true
     }


    private validateFieldValue(value: any, prop: string, type?: string): boolean {
        return value !== '';
    }


    private validateStatus(value: string): boolean {
        return this._statusList.includes(value) || value.toLowerCase() === BaseStatusList.completed;
    }



    private validateDescription(value: string): boolean {
        return value !== '';
    }

    completeTask() {
        this.status = BaseStatusList.completed;
    }



    //todo: implement patterns
    //@ts-ignore
    clone(): Task { }
    accept() { }



}
