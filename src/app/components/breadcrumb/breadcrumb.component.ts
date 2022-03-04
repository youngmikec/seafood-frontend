import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() any: any;
  urlPath: string = '';
  currentPage: string | undefined | null = '';

  constructor(
    private router: Router,
  ) {
  }
  
  ngOnInit(): void {
    this.urlPath = this.router.url;
    this.currentPage = this.getCurrentPage(this.urlPath);
  }

  getCurrentPage(url: string): string | undefined{
    return url.split('/').pop();
  }

}
