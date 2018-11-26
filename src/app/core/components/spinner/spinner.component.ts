import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'lk-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @HostBinding('class.spinner__element') spinner: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
