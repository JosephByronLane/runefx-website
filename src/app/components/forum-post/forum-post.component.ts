import { Component, Input } from '@angular/core';
import { IPostAPIResponse } from '../../interfaces/IForumResponse';

@Component({
  selector: 'app-forum-post',
  standalone: true,
  imports: [],
  templateUrl: './forum-post.component.html',
  styleUrl: './forum-post.component.css'
})
export class ForumPostComponent {
  @Input() post: IPostAPIResponse = {} as IPostAPIResponse;
}
