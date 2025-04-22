import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';


export enum LogLevel {
  None = 0,
  Error = 1,
  Warning = 2,
  Info =3,
  Debug =4
}

@Injectable({
  providedIn: 'root'
})

export class LoggerService {
  private logLevel: LogLevel = LogLevel.Debug 

  constructor() {
    if (environment.production){
      this.logLevel=LogLevel.None
    }
    else{
      this.logLevel = LogLevel.Debug
    }
   }


  public log(level:LogLevel, msg:string){
    switch(this.logLevel){
      case this.logLevel=LogLevel.None:
        //do nothing cause no loggin shall not happen
        break;
      case this.logLevel=LogLevel.Error: //only log errors
        if (level <= LogLevel.Error){
          this.logToConsole(level,msg)
        }
        break;
      case this.logLevel=LogLevel.Warning: //warnings and errors
        if (level <= LogLevel.Warning){
          this.logToConsole(level, msg)
        }
        break;
      case this.logLevel=LogLevel.Info: //error, warning and info
        if (level <= LogLevel.Info){
          this.logToConsole(level,msg)
        }
        break;
      case this.logLevel=LogLevel.Debug: //log all
        if (level<= LogLevel.Debug){
          this.logToConsole(level,msg)
        }
        break;
    }
  }

  private logToConsole(level:LogLevel, msg:String){
    console.log(`${LogLevel[level]}: ${msg}`)
  }

}
