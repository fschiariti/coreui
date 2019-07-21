import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { DefaultLayoutService } from './default-layout.service';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  private _layoutService;

  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  usuario: any;
  errorMessage: any;



  constructor(@Inject(DOCUMENT) _document?: any, layoutService?: DefaultLayoutService) {
    this._layoutService = layoutService;

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnInit(): void {
    this.getData();
  }



 getData() 
 {
  this.usuario = this._layoutService.GetData()

/*
  this._layoutService.GetData().subscribe(
       data => {
           this.usuario = data
         },
       error => this.errorMessage = <any>error
   );
*/
 }


  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
