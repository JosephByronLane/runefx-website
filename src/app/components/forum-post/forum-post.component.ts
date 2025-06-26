import { Component, Input } from '@angular/core';
import { IPostAPIResponse } from '../../interfaces/IForumResponse';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { MarkdownComponent } from 'ngx-markdown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forum-post',
  standalone: true,
  imports: [MarkdownModule, MarkdownComponent, CommonModule],
  templateUrl: './forum-post.component.html',
  styleUrl: './forum-post.component.css'
})
export class ForumPostComponent {
  @Input() post: IPostAPIResponse = {} as IPostAPIResponse;

  constructor(private readonly markdownService: MarkdownService){

  }


}
