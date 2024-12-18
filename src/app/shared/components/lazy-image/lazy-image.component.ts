import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.scss'
})
export class LazyImageComponent implements OnInit {
  
  @Input() url!: string;
  @Input() alt: string = '';

  public hasLoaded: boolean = false;

  // get isImageLoaded(): boolean {
  //   return this.hasLoaded;
  // }
  
  ngOnInit(): void {
    if (!this.url) {
      throw new Error('Url property is required');
    }
  }

  onLoad(): void {
    setTimeout(() => {
      this.hasLoaded =  true;  
    }, 1000);
  }
}
