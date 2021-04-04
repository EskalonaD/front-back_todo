import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input() title!: string;
  @Input() data!: string;
  @Input() type: string = 'string';
  @Output() changed = new EventEmitter(); 

  constructor() { }

  ngOnInit(): void {
  }

  onChange(value: any) {
    this.changed.emit([this.title, value])
  }

}
