import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lk-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
  date = new Date();

  constructor() { }

  ngOnInit() {
  }

}
