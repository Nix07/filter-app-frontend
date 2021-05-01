import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit, AfterViewInit {

  instructionsCompleted = false;
  accptedPrivacyPolicy = false;
  startTime : Date;
  endTime: Date;
  instructionReadingTime = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.startTime = new Date();
  }

  onSubmit() {
    this.endTime = new Date();
    this.instructionReadingTime = (this.endTime.getTime() - this.startTime.getTime()) / 1000;
    this.instructionsCompleted = true;
  }

}
