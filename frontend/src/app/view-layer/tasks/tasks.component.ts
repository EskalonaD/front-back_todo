import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { unexposedTask } from 'src/app/model-layer';
import { TasksView } from '../tasks.view';

enum EditorType {
  create = 'create',
  update = 'update',
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent extends TasksView implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.tasks = this.controller.getTasks();
    console.log(this.route);
  }

  goToEditor(editorType: 'update', taskID: number): void;
  goToEditor(editorType: 'create'): void;
  goToEditor(editorType: any, taskID?: any): void {
    if(taskID) {
      this.router.navigate([taskID, editorType], {relativeTo: this.route});
      return;
    }
    this.router.navigate([editorType], {relativeTo: this.route}); 
  }

}

