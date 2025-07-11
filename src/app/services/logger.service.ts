import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


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
  private readonly logLevel: LogLevel = LogLevel.Debug 

  constructor() {
    if (environment.production){
      this.logLevel=LogLevel.None
    }
    else{
      this.logLevel = LogLevel.Debug
    }
   }


  public log(level:LogLevel, msg:string){
    if (level <= this.logLevel){
      this.logToConsole(level, msg)
    }
  }


  private logToConsole(level:LogLevel, msg: string){
    if (level === 1){
      console.error(`${LogLevel[level]}: ${msg}`)
    }
    else if (level ===2){
      console.warn(`${LogLevel[level]}: ${msg}`)
    }
    else{
      console.log(`${LogLevel[level]}: ${msg}`)
    }
  }

}
