import { Injectable } from '@angular/core';
import { User } from 'src/_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
  ) { }

  private url(path: string): string {
    return `http://${environment.apiHost}${path}`;
  }

  getUser(username: string): User {
    let name = username.split('.')[0];
    let surname = username.split('.')[1];

    name = name.charAt(0).toUpperCase() + name.slice(1);
    surname = surname.charAt(0).toUpperCase() + surname.slice(1);
    
    return {
      name,
      surname,
      username,
      level: 3,
      levelChall1: 43,
      levelChall2: 87,
      levelChall3: 100,
      boostTimeRemaining: 23,
      boostTimeRemainingHuman: '45m',
      experience: 7000
    };
  }
  
}
