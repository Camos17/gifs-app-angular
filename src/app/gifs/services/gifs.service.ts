import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Gif, SearchResponse } from "../interfaces/gifs.interface";

@Injectable({
    providedIn: 'root'
})
export class GifsService {

    public gifsList: Gif[] = [];

    private _tagsHistory: string[] = [];
    private apiKey: string = 'eRhRVe6qziYZCsaH15XcTgHnXtc4oadL';
    private baseUrl: string = 'http://api.giphy.com/v1/gifs';

    constructor(private http: HttpClient) { 
        this.getLocalStorage();
    }

    get tagsHistory() {
        return [...this._tagsHistory];
    }

    private organizeHistory(tag: string): void {
        tag = tag.toLowerCase();

        if (this._tagsHistory.includes(tag)) {
            this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag );
        }

        this._tagsHistory.unshift(tag);
        this._tagsHistory = this.tagsHistory.splice(0, 10);
        this.saveLocalStorage();
    }

    private saveLocalStorage(): void {
        localStorage.setItem('history', JSON.stringify(this.tagsHistory));
    }

    private getLocalStorage(): void {
        if (!localStorage.getItem('history')) {
            return;
        }
        this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
        
        if(this._tagsHistory.length === 0 ) return;
        this.searchTag(this._tagsHistory[0]);
    }

    searchTag(tag: string): void {
        if (tag.length === 0) return;
        this.organizeHistory(tag);

        // Example using Fetch API to create request
        // fetch('http://api.giphy.com/v1/gifs/search?api_key=eRhRVe6qziYZCsaH15XcTgHnXtc4oadL&q=god of war&limit=10')
        //     .then( res => res.json() )
        //     .then( data => console.log(data) )

        let params = new HttpParams();
        params = params.set('api_key', this.apiKey).set('q', tag).set('limit', 10);

        const result = this.http.get<SearchResponse>(`${this.baseUrl}/search`, { params });

        result.subscribe( (data: SearchResponse) => {
            this.gifsList = data.data;
        });

    }

}