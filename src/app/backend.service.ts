import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  filters = ['normal', 'clarendon', 'gingham', 'moon', 'lark', 'reyes', 'juno', 'slumber', 'crema', 'ludwig', 'aden', 
  'perpetua', 'amaro', 'mayfair', 'rise', 'hudson', 'hefe', 'valencia', 'xpro-ii', 'sierra', 'willow', 
  'lofi', 'inkwell', 'nashville'];

  constructor(private http: HttpClient) { }

  sendExperimentData(data) {
    const URL = 'https://image-filter-experiment-app.herokuapp.com/experimentdata';
    return this.http.post(URL, data, {responseType: 'json'});
  }

  sendUserData(data, instructionReadingTime) {
    data['instructionReadingTime'] = instructionReadingTime;
    console.log(data);
    const URL = 'https://image-filter-experiment-app.herokuapp.com/userdata';
    return this.http.post(URL, data, {responseType: 'json'});
  }

  surveyData(data, userId) {
    data['userId'] = userId
    data['firstFilter'] = data['firstFilter'] !== '' ? this.filters.indexOf(data['firstFilter']) + 1: '';
    data['secondFilter'] = data['secondFilter'] !== '' ? this.filters.indexOf(data['secondFilter']) + 1: '';
    
    console.log(data);
    const URL = 'https://image-filter-experiment-app.herokuapp.com/surveydata';
    return this.http.post(URL, data, {responseType: 'json'});
  }
}
