import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { subscribeOn } from 'rxjs/operators';
import { TasksController } from 'src/app/controller/tasks.controller';
import { Field } from 'src/app/model-layer/task/task';
import { unexposedTask } from '../../model-layer/interfaces';
import { updatedTaskData } from '../../model-layer/tasks.model';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  isDataChanged!: boolean;


  constructor(
    private route: ActivatedRoute,
    private controller: TasksController,
    private router: Router,
  ) { }

  fields: Field[] = [];
  changes = {
    extra: {},
  }
  loading!: boolean;
  action!: 'create' | 'update';
  error: string;

  //@ts-ignore
  task: unexposedTask = {};

  ngOnInit(): void {
    this.action = 'create';
    this.isDataChanged = false;
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      console.log('here', this.route.snapshot.paramMap.get('id'));
      
      this.action = 'update';
      this.controller.getTask(+id).subscribe(data => {
        this.task = data;
        console.log(data)
        this.fields = [...this.task.extraData];
      });
    }
  }

  goToList(): void {
    this.router.navigateByUrl('/tasks');
  }

  addField(input: HTMLInputElement): void {
    const isInapropriateName = input.value === '';
    const isFieldAlreadyExist = this.fields.some(field => {
      return field.fieldName === input.value && ['status', 'description'].includes(input.value)
    });

    if (!isInapropriateName && !isFieldAlreadyExist) {
      this.fields.push({ fieldName: input.value, fieldValue: '' });
      input.value = '';
    }
    else this.error = isFieldAlreadyExist ? 'Such name is already reserved' : 'Field could not be named like that';
  }

  deleteField(fieldName: string): void {
    this.fields = this.fields.filter(field => field.fieldName !== fieldName);
    this.changes.extra[fieldName] = { operation: 'delete' }
  }

  submitTask() {
    if (this.validateData(this.changes)) {

      if (this.action === 'update') {
        this.controller.updateTask((this.task as unexposedTask).id, this.changes)
      }

      if (this.action === 'create') {
        this.controller.addTask(this.changes);
      }

      this.isDataChanged = false;
    }

    else {
      this.error = 'Data could not pass validation'
    }
  }


  changeData([fieldName, data]: string[]) {
    if (fieldName === 'description' || fieldName === 'status') {
      this.changes[fieldName] = data;
    }
    else {
      this.changes.extra[fieldName] = data;

    }
    this.isDataChanged = true;
  }


  private validateData(data: any): boolean {
    if (this.action === 'create') {
      //temporary
      return true;
    }
    if (this.action === 'update') {
      return this.task?.validateChange(data);
    }

    return false;
  }
}
