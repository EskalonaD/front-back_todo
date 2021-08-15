import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Output() closed = new EventEmitter<null>();
  @Output() focused = new EventEmitter<null>();
  @HostListener('mouseenter')
  onFocus() {
    this.focused.emit(null);
  }

  errors = [];

  @Input() set errorMessage (error) {
    console.log('ERRORS', this.errors)
    this.errors.push(error);
  } 

  close() {
    this.closed.emit(null);
  }

}
