import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { IPostAPIResponse, ISubtopicDetailAPIResponse, ITopicsAPIResponse } from '../../interfaces/IForumResponse';
import { ForumTopicsComponent } from '../../components/forum-topics/forum-topics.component';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import { ActivatedRoute } from '@angular/router';
import { ForumSubtopicComponent } from "../../components/forum-subtopic/forum-subtopic.component";
import { ForumPostComponent } from "../../components/forum-post/forum-post.component";
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';
import { ErrorWarningOxComponent } from '../../components/error-warning-ox/error-warning-ox.component';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [ForumTopicsComponent, BackgroundVideoComponent, InfoBoxComponent, ForumSubtopicComponent, ForumPostComponent, ErrorWarningOxComponent ],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent implements OnInit {

  public errorLoadingTopics: boolean = false;

  public topicData: ITopicsAPIResponse[] | null = null; 
  public isThereSpecificTopic: boolean = false;
  public topicId: number = -1;


  public subtopicData: ISubtopicDetailAPIResponse | null = null;
  public isThereSpecificSubtopic: boolean = false;
  public subtopicId: number = -1;

  public postData: IPostAPIResponse | null = null;
  public isThereSpecificPost: boolean = false;
  public postId: number = -1;

  public breadcrumbs: {text: string, link: string}[] = [
    {text: "Forum", link: "/forum"},
  ];

  constructor(private readonly forumService: ForumService, private readonly route: ActivatedRoute, public readonly intermitentLoadingService: IntermitentLoadingService) {}

  ngOnInit(){

    this.route.params.subscribe(params => {

      const subtopicId = params['subtopicId'];
      const subtopicSlug = params['subtopicSlug'];

      const topicId = params['topicId'];
      const topicSlug = params['topicSlug'];

      const postId = params['postId'];

      if (subtopicId && subtopicSlug){
        this.isThereSpecificSubtopic = true;
        this.subtopicId = subtopicId;

        this.topicId = topicId;
        return;
      }

      if (topicId && topicSlug){
        this.isThereSpecificTopic = true;
        this.topicId = topicId;
        return;
      }

      if (postId){
        this.isThereSpecificPost = true;
        this.postId = postId;
        return;
      }

    });

    //fetching breadcrumbs

    if(this.isThereSpecificTopic){
      this.forumService.getSingleTopic(this.topicId)
      .subscribe({
        next: (value: ITopicsAPIResponse) =>{
          this.breadcrumbs.push({text: value.title, link: 'forum/'+value.id+'/'+value.slug});
        },
        error: (error) =>{
          console.log(error);
        }
      })
    }
    
    if(this.isThereSpecificSubtopic){

      let breadcrumbTempTopic: {text: string, link: string} = {text: "", link: ""};
      let breadcrumbTempSubtopic: {text: string, link: string} = {text: "", link: ""};

      this.forumService.getSingleTopic(this.topicId)
      .subscribe({
        next: (value: ITopicsAPIResponse) =>{
          breadcrumbTempTopic = {text: value.title, link: 'forum/'+value.id+'/'+value.slug};

          this.forumService.getSingleSubtopic(this.subtopicId)
          .subscribe({
            next: (value: ISubtopicDetailAPIResponse) =>{
              breadcrumbTempSubtopic = {text: value.title, link: breadcrumbTempTopic.link+'/'+value.id+'/'+value.slug};
              this.breadcrumbs.push(breadcrumbTempTopic);
              this.breadcrumbs.push(breadcrumbTempSubtopic);
            },
            error: (error) =>{
              console.log(error);
            }
          })
        },
        error: (error) =>{
          console.log(error);
        }
      })


    }

    if(this.isThereSpecificPost){
      let parentTopicId: number  = -1;
      let parentSubtopicId: number = -1;

      let breadcrumbTempTopic: {text: string, link: string} = {text: "", link: ""};
      let breadcrumbTempSubtopic: {text: string, link: string} = {text: "", link: ""};
      let breadcrumbTempPost: {text: string, link: string} = {text: "", link: ""};

      this.forumService.getPostAndComments(this.postId)
      .subscribe({
        next: (value: IPostAPIResponse) =>{
          breadcrumbTempPost = {text: value.title, link: 'forum/posts/'+value.id};

          if(value.topic){
            parentTopicId = value.topic;
          }
          if(value.subtopic){
            parentSubtopicId = value.subtopic;

            if(parentSubtopicId !== -1){
              this.forumService.getSingleSubtopic(parentSubtopicId)
              .subscribe({
                next: (value: ISubtopicDetailAPIResponse) =>{
                  parentTopicId = value.parent_topic;
                  breadcrumbTempSubtopic = {text: value.title, link: '/'+value.id+'/'+value.slug}; 

                  if(parentTopicId !== -1){                    
                      this.forumService.getSingleTopic(parentTopicId)
                      .subscribe({
                        next: (value: ITopicsAPIResponse) =>{
                          breadcrumbTempTopic = {text: value.title, link: 'forum/'+value.id+'/'+value.slug};
                          breadcrumbTempSubtopic = {text: breadcrumbTempSubtopic.text, link: 'forum/'+value.id+'/'+value.slug + breadcrumbTempSubtopic.link};

                          this.breadcrumbs.push(breadcrumbTempTopic);
                          this.breadcrumbs.push(breadcrumbTempSubtopic);
                          this.breadcrumbs.push(breadcrumbTempPost);
                        },
                        error: (error) =>{
                          console.log(error);
                        }
                      })                    
                  }
                },
                error: (error) =>{
                  console.log(error);
                }
              })      
            }
          }
        },
        error: (error) =>{
          console.log(error);
        }
      })
    }



    

    //fetching data to display
    if(this.isThereSpecificTopic){
      this.forumService.getSingleTopic(this.topicId)
      .subscribe({
        next: (value: ITopicsAPIResponse) =>{
          this.topicData = [value];
        },
        error: (error) =>{
          console.log(error);
          this.errorLoadingTopics = true;
        }
      })
      return;
    }

    if(this.isThereSpecificSubtopic){
      this.forumService.getSingleSubtopic(this.subtopicId)
      .subscribe({
        next: (value: ISubtopicDetailAPIResponse) =>{
          this.subtopicData = value;
        },
        error: (error) =>{
          console.log(error);
          this.errorLoadingTopics = true;
        }
      })
      return;
    }

    if(this.isThereSpecificPost){
      this.forumService.getPostAndComments(this.postId)
      .subscribe({
        next: (value: IPostAPIResponse) =>{
          this.postData = value;
        },
        error: (error) =>{  
          console.log(error);
          this.errorLoadingTopics = true;
        }
      })
    }

    //default: get all topics
    this.forumService.getTopicsAndSubtopics()
    .subscribe({
      next: (value: ITopicsAPIResponse[]) =>{
        this.topicData = value;
      },
      error: (error) =>{
        console.log(error);
        this.errorLoadingTopics = true;
      }
    })
  }

  
}
