import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { ITopicsAPIResponse } from '../../interfaces/IForumResponse';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent implements OnInit {

  public topics: ITopicsAPIResponse[] = []; 

  constructor(private readonly forumService: ForumService) {}

  ngOnInit(){
    this.forumService.getTopicsAndSubtopics()
    .subscribe((data: ITopicsAPIResponse[]) =>{
      this.topics = data;
    })
  }
}
