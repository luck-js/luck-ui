import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'lk-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
  title = 'luck-ui';

  constructor() { }

  ngOnInit() {
  }

}