import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnInit {
  @Input() id!: number;
  @Input() description!: string;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onDetails = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<number>();

  @Input() isCompleted!: boolean;



  constructor() { }
  ngOnInit(): void {
  }

  completeTask(): void {
    // todo test if it should emit smth??
    this.onComplete.emit(this.id);
  }

  deleteTask(): void {
    this.onDelete.emit(this.id);
  }

  openDetails(): void {
    this.onDetails.emit(this.id);
  }
}
