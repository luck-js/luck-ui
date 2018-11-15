import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './containers/app/app.component';

import { HeadersInterceptor } from './interceptors/headers.interceptor';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';

import { AppStateService } from './app-state.service';

export const COMPONENTS = [
  AppComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [
    AppStateService
  ]
})

export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HeadersInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: BaseUrlInterceptor,
          multi: true
        }
      ]
    };
  }
}
