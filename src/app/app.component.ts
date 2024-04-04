import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<router-outlet />`,
})
export class AppComponent implements OnInit {
  title = 'angular-novo';
  hideHeader: boolean = true;
  hideFooter: boolean = true;
  static isBrowser = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    AppComponent.isBrowser.next(isPlatformBrowser(this.platformId));
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(() => {
        let route = this.getChild(this.activatedRoute);
        let data = route.snapshot.data;
        this.hideHeader = data['hideHeader'];
        this.hideFooter = data['hideFooter'];
      });
  }
  getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
    if (activatedRoute.firstChild)
      return this.getChild(activatedRoute.firstChild);
    else return activatedRoute;
  }
}
