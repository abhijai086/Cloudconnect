import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PatientService {

    constructor(private http: HttpClient) { }

    getPatientList(): Observable<any> {
        return this.http.get(`${environment.backendUrl}/getAllPatients`);
    }
 
    addPatient(patient: any): Observable<any> {
        return this.http.post<any>(`${environment.backendUrl}/addPatient`, patient)
    }

    updatePatient(patientId: number, updatedValues: any): Observable<Object> {
        return this.http.post(`${environment.backendUrl}/updatepatient/${patientId}`, updatedValues);
    }

    deletePatient(patientId: number){
        return this.http.delete(`${environment.backendUrl}/deletePatient/${patientId}`, { responseType: 'json' });
    }

    viewPatient(patientId: number): Observable<any> {
        return this.http.get(`${environment.backendUrl}/getPatient/${patientId}`);
    }
    
}