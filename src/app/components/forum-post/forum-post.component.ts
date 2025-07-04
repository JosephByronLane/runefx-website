import { Component, Input, SimpleChanges } from '@angular/core';
import { IPostAPIResponse } from '../../interfaces/IForumResponse';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { MarkdownComponent } from 'ngx-markdown';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../../services/utils.service';
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';
import { ErrorWarningOxComponent } from '../error-warning-ox/error-warning-ox.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forum-post',
  standalone: true,
  imports: [MarkdownModule, MarkdownComponent, CommonModule, ErrorWarningOxComponent],
  templateUrl: './forum-post.component.html',
  styleUrl: './forum-post.component.css'
})
export class ForumPostComponent {
  @Input() post: IPostAPIResponse = {} as IPostAPIResponse;

  constructor(private readonly markdownService: MarkdownService, public readonly utilsService: UtilsService, public readonly loadingService: IntermitentLoadingService, private readonly title: Title){

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.title.setTitle(`RuneFX | ${this.post.title}`);
  }
}
