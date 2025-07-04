import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IReleaseDetailAPIResponse } from '../../interfaces/IReleaseResponse';
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

  public releaseFormattedStuff: {type: string, content: string, extras?: Record<string, string>}[] = []

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
        this.parseText(release.content)
      },
      error: (error: any) => {
        console.error('Error fetching release:', error);
        }
      });
    });
  }

  parseText(text:string){
    let lines:  string[] = text.split(/\r?\n/)
    let tempTxtHolder: string = ""

    if (lines == null){
      return;
    }
    lines = lines.filter((ele, _) => ele !== '')
 
    for (let index = 0; index < lines.length; index++) {

      const line = lines[index];

      if (index == 0 && line.length>1){
        const titleText = removeMd(line)
        const descText = removeMd(lines[index+1])
        this.releaseFormattedStuff.push({type: "title", content:titleText, extras: {desc: descText}})
        index +=1;
        continue;
      }


      if (line.includes("![")) {  
        if (tempTxtHolder !== '') {
          this.releaseFormattedStuff.push({type: "text", content: tempTxtHolder})
          tempTxtHolder = ""
        }


        let imageUrl = RegExp(regex).exec(line)
        if (imageUrl != null) {
          let imageTemp = {type: "image", content: imageUrl[1], extras: {text: lines[index+1]}}
          this.releaseFormattedStuff.push(imageTemp)

          index +=1;
          continue;
        }
        continue;
      }    
      if (line.startsWith("## ")) {
        const isEmpty:boolean = tempTxtHolder == ''
        
        if (isEmpty) {
          tempTxtHolder = line + '\n'
          continue;
        }
        this.releaseFormattedStuff.push({type: "text", content: tempTxtHolder})
        tempTxtHolder = line + '\n'
        continue;
      }
    tempTxtHolder = tempTxtHolder + line + '\n'
    }

    if (tempTxtHolder !== '') {
        this.releaseFormattedStuff.push({type: "text", content: tempTxtHolder})
    }
  
    console.log(this.releaseFormattedStuff)
  }

  isImage(line:string): boolean{
    if(line.startsWith("!["))
    return /!\[.*?\]\((https?:\/\/[^)]+)\)/.test(line);
  }

}
