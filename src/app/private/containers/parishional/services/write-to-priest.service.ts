import { Injectable } from '@angular/core';
import { config } from 'src/app/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WriteToPriestService {

  constructor(private http: HttpClient) {}

  async post(formData) {

    return await this.http.post(`${config.apiUrl}/suggestions`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map(data => data));
  }

  public async put(id: number, formData): Promise<any> {
    return await this.http
        .put(`${config.apiUrl}/suggestions/${id}`, formData)
        .pipe(map(data => data));
  }

  public get() {
    return this.http.get<any>(`${config.apiUrl}/suggestions/page`)
      .pipe(map(data => data));
  }

  public async delete(id) {
    return await this.http
        .delete(`${config.apiUrl}/suggestions/${id}`)
        .pipe(map(data => data));
  }
  public Listpriest(limit) {
    return this.http.get<any>(`${config.apiUrl}/persons/user-utypes/4/to-chat?limit=${limit}`)
      .pipe(map(data => data));
  }

  public getDiscussion(discussion_id) {
    return this.http.get<any>(`${config.apiUrl}/messageries/chat-discussions/${discussion_id}/messages`)
      .pipe(map(data => data));
  }
  public getPriest(user_id){
    return this.http.get<any>(`${config.apiUrl}/persons/users/${user_id}`)
    .pipe(map(data => data));
  }
  public sendMessage(formdata: FormData){
    return this.http.post<any>(`${config.apiUrl}/messageries/chat-messages`, formdata)
    .pipe(map(data => data));
  }

  public openDiscussion(formdata: FormData) {
    return this.http.post<any>(`${config.apiUrl}/messageries/chat-discussions`, formdata)
      .pipe(map(data => data));
  }

}
