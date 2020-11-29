import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { Patient } from '@app/_models';
import { PatientService, UserService } from '@app/_services';
import { Observable } from "rxjs";
import { FormGroup, Validators, FormControl } from '@angular/forms';
declare var $: any;
@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    patientsList: Observable<Patient[]>;
    restMsg = {};

    loading = false;
    addForm;
    openPopup() {
        $("#myModal").modal("show");
    }
    users: User[];
    constructor(private userService: UserService, private patientService: PatientService) { }

    ngOnInit() {
        this.loading = true;
        this.reloadData();
        this.addForm = new FormGroup({
            firstName: new FormControl("", [Validators.required]),
            lastName: new FormControl("", [Validators.required]),
            hospitalName: new FormControl("", [Validators.required]),
            contact: new FormControl("", [Validators.required]),
            result: new FormControl("", [Validators.required])
        });

        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }

    reloadData() {
        this.patientsList = this.patientService.getPatientList();
    }

    addPatient(addForm) {
        this.patientService.addPatient(addForm).subscribe(
            (res) => {
                this.restMsg = res;
                this.reloadData();
                setTimeout(() => {
                    this.restMsg = {};
                }, 2000);
            });
        $('#myModal').modal('toggle');
    }

    deletePatient(patientId) {
        this.patientService.deletePatient(patientId).subscribe(
            (res) => {
                this.restMsg = res;
                this.reloadData();
                setTimeout(() => {
                    this.restMsg = {};
                }, 2000);
            });
    }

    updatePatient(patient) {
        this.openPopup()
        this.patientService.updatePatient(patient.patientId, patient).subscribe(
            (res) => {
                this.restMsg = res;
                this.reloadData();
                setTimeout(() => {
                    this.restMsg = {};
                }, 2000);
            });
    }

    viewDetails(patient) {
        this.openPopup()  
      }
    
      setTimeout(){
    
      }

}