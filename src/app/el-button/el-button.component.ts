import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-el-button',
  templateUrl: './el-button.component.html',
  styleUrls: ['./el-button.component.scss']
})
export class ElButtonComponent implements OnInit {


  @Input()
  label = '';



  @Output()
  buttonClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

}
