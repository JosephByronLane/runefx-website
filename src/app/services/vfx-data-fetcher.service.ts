import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IVFXItem } from '../interfaces/IVFXItem';
import {items as vfxItems} from '../data/vfxItem.json'


@Injectable({
  providedIn: 'root'
})
export class VfxDataFetcherService {
  private items: IVFXItem[] = vfxItems

  constructor() { }

  getItemBySlug(slug: string): IVFXItem | undefined { //indian youtube man said these were slugs
    return this.items.find(item => this.createSlug(item.title) === slug);
  }

  getAllItems(): IVFXItem[] {
    return this.items;
  }

  //we take the url (name-of-series) and replace the dashes with spaces, since they're (name of series) in the 'json'
  public createSlug(title: string): string {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, ''); //I didnt do this, ChatGPT did.
  }
}
