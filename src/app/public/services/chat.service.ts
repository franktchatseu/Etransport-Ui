import { Injectable } from '@angular/core';
import { config } from 'src/app/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) {}

  public async getDiscussions(teacherId, studentId) {
    return await this.http.get<any>(`${config.apiUrl}/chats/students?student_id=${studentId}&teacher_id=${teacherId}`)
      .pipe(map(data => data));
  }

}
