import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IReleaseDetailAPIResponse, ParsedElement } from '../../interfaces/IReleaseResponse';
import { ReleasesService } from '../../services/releases.service';
import { ActivatedRoute } from '@angular/router';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { UtilsService } from '../../services/utils.service';
import { MarkdownComponent, MarkdownModule } from 'ngx-markdown';
import { SimpleImageComponent } from '../../components/simple-image/simple-image.component';
import { ErrorWarningOxComponent } from '../../components/error-warning-ox/error-warning-ox.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import removeMd from 'remove-markdown';
import { SimpleBoxComponent } from '../../components/simple-box/simple-box.component';

@Component({
  selector: 'app-release-detail',
  standalone: true,
  imports: [BackgroundVideoComponent, MarkdownComponent, MarkdownModule, SimpleImageComponent, ErrorWarningOxComponent, InfoBoxComponent, SimpleBoxComponent],
  templateUrl: './release-detail.component.html',
  styleUrl: './release-detail.component.css'
})
export class ReleaseDetailComponent implements OnChanges, OnInit{

  public release: IReleaseDetailAPIResponse = {} as IReleaseDetailAPIResponse;

  public releaseFormattedStuff: ParsedElement[] = []

  constructor(private readonly title: Title, 
    private readonly releasesService: ReleasesService, 
    private readonly route: ActivatedRoute,
    public readonly utilsService: UtilsService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.title.setTitle(`RuneFX | ${this.release.title}`);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];  
      this.releasesService.getSingleRelease(id).subscribe({
      next: (release: IReleaseDetailAPIResponse) => {
        this.release = release;
        this.releaseFormattedStuff = this.parseText(release.content)
      },
      error: (error: any) => {
        console.error('Error fetching release:', error);
        }
      });
    });
  }

  parseText(text:string): ParsedElement[]{
    if (!text) return [];

    const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
    let buffer: string = ''
    let result: ParsedElement[] =[]

    const flushBuffer = () =>{
      if (buffer && buffer !== ''){
        result.push({type:'text', content: buffer.trim()})
        buffer = ''
      }
    }

    const REGEX = /!\[.*?\]\((https?:\/\/[^)]+)\)/


    function getImageUrl(line:string):RegExpExecArray | null{
      return REGEX.exec(line)
    }
    
    for (let index = 0; index < lines.length; index++) {

      const line = lines[index];

      if (index == 0 && line.length>1){
        flushBuffer()

        const titleText = removeMd(line)
        const descText = removeMd(lines[index+1])
        result.push({
          type: "title", 
          content:titleText, 
          extras: {desc: descText}}
        )
        index +=1;
        continue;
      }

      let imageUrl = getImageUrl(line)
      if (imageUrl !== null) {  
        flushBuffer()
        
        result.push({
          type: "image", 
          content: imageUrl[1],
          extras: {text: lines[index+1]}
        })

        index +=1;
        continue;      
      }

      if (line.startsWith("## ")) {
        flushBuffer()
      }
      
      buffer += line + '\n'

    }
    flushBuffer()


    return result
  }



}
