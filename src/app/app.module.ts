import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BlogComponent } from './components/blog/blog.component';
import { LayoutComponent } from './components/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NotificationComponent } from './components/notification/notification.component';
import { EventEmitterService } from './services/event-emitter/event-emitter.service';
import { BlogService } from './services/blog/blog.service';
import { HttpHelperService } from './services/http-helper/http-helper.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InterceptorService } from './loader/interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    BlogComponent,
    LayoutComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  providers: [
    EventEmitterService,
    BlogService,
    HttpHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
