import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  //bootstrap: [AppComponent],
  entryComponents:[AppComponent]
})
export class AppModule { 
  constructor(private injector:Injector) {
     
  }
  ngDoBootstrap() {
    const element = createCustomElement(AppComponent, {injector:this.injector})
    if(!customElements.get('app-mfe-1'))
      customElements.define('app-mfe-1', element);  
  } 
}
