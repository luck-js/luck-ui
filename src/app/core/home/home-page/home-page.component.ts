import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppStateService } from '../../app-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lk-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent {
  @ViewChild('philosophy', {static: false}) public philosophy: ElementRef;
  @ViewChild('home', {static: false}) public home: ElementRef;
  year = new Date().getFullYear()

  constructor(private router: Router,
              private appStateService: AppStateService) {

  }

  public moveToStructure(): void {
    this.philosophy.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
  }

  public moveToUp(): void {
    this.home.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
  }

  public moveToCreateHappeningPage(name: string) {
    this.updateNameHappening(name);
    this.router.navigate([`/happening`]);
  }

  private updateNameHappening(name: string) {
    this.appStateService.setNameHappening(name);
  }

}
