import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'share-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  _tags: string[] = [];

  constructor(private gifsService: GifsService) { }

  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  ngOnInit(): void {
    this.setTags();
  }

  private setTags(): void {
    this._tags = this.gifsService.tagsHistory;
  }

  searchGifs(tag: string):void {
    this.gifsService.searchTag(tag);
  }

}
