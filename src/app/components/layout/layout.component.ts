import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { LoaderService } from 'src/app/loader/loader.service';
import { EventEmitterService } from 'src/app/services/event-emitter/event-emitter.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  showButton: boolean;
  searchTerm: string;

  constructor(private observer: BreakpointObserver, public loaderService: LoaderService, private eventEmitterService: EventEmitterService) {
    this.showButton = false;
  }

  ngOnInit(): void {
    this.observeBreakpoin();
  }

  private observeBreakpoin() {
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

  emitSeachTerm(searchTerm: string) {
    this.eventEmitterService.searchEvent.emit(searchTerm);
  }

  ngAfterViewInit(): void {

  }

}
