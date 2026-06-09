import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ApiService{
    private apiBaseUrl = environment.apiBaseUrl;
    constructor(private readonly httpClient: HttpClient){}

    get<T>(endpoint: string){
    return this.httpClient.get<T>(`${this.apiBaseUrl}/${endpoint}`);
    }

    
  post<T>(endpoint: string, requestBody: unknown) {
    return this.httpClient.post<T>(`${this.apiBaseUrl}/${endpoint}`, requestBody);
  }

  put<T>(endpoint: string, requestBody: unknown) {
    return this.httpClient.put<T>(`${this.apiBaseUrl}/${endpoint}`, requestBody);
  }

  delete<T>(endpoint: string) {
    return this.httpClient.delete<T>(`${this.apiBaseUrl}/${endpoint}`);
  }
}
