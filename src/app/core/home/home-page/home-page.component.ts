import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'lk-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent {
  @ViewChild('philosophy') public philosophy:ElementRef;
  @ViewChild('home') public home:ElementRef;

  public moveToStructure():void {
    this.philosophy.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
  }

  public moveToUp():void {
    this.home.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
  }

}
