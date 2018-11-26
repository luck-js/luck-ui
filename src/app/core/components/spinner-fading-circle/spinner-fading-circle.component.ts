import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'lk-spinner-fading-circle',
  templateUrl: './spinner-fading-circle.component.html',
  styleUrls: ['./spinner-fading-circle.component.scss']
})
export class SpinnerFadingCircleComponent implements OnInit {
  @HostBinding('class.spinner__element') spinner: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
