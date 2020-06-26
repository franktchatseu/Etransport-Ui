import { Injectable } from '@angular/core';
import { config } from '../../../../config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CathechumenService {

    constructor(private http: HttpClient) { }

    public getCathechumen(limit) {
        return this.http.get<any>(`${config.apiUrl}/persons/user-utypes/CATECHUMEN/to-chat?page=1&&limit=${limit}`)
            .pipe(map(data => data));
    }

    public get(url) {
        return this.http.get<any>(`${url}`)
            .pipe(map(data => data));
    }


}
