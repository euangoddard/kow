import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlsComponent } from './controls/controls.component';
import { LinksComponent } from './controls/links/links.component';
import { HandComponent } from './hand/hand.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, ControlsComponent, LinksComponent, HandComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ClipboardModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
