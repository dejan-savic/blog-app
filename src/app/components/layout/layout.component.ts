import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  showButton: boolean;

  constructor(private observer: BreakpointObserver, public loaderService: LoaderService) {
    this.showButton = false;
  }

  ngOnInit(): void {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.showButton = true;
      } else {
        this.showButton = false;
        if (this.sidenav) {
          if (this.sidenav.opened === true) {
            this.sidenav.toggle();
          }
        }
      }
    });
  }

  ngAfterViewInit(): void {

  }

}
