import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storage: any = {}

  constructor() { }

  getStorage(key: string): any {
    return JSON.parse(localStorage.getItem(key) as string) ?? null
  }

  setStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data))
  }
}
