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
    patientId : number;
    restMsg = {};
    title = "";
    sShow: boolean = true;
    users: User[];
    loading = false;
    formData;
    action = "";

    openPopup(id) {
        $("#myModal").modal("show");
        switch (id) {
            case 1:
                this.formData = new FormGroup({
                    firstName: new FormControl("", [Validators.required]),
                    lastName: new FormControl("", [Validators.required]),
                    hospitalName: new FormControl("", [Validators.required]),
                    contact: new FormControl("", [Validators.required]),
                    result: new FormControl("", [Validators.required])
                });
                this.title = "Add Patient Details";
                this.sShow = true;
                this.action = "add";
                break;
            case 2:
                this.title = "Update Patient Details";
                this.sShow = true;
                this.action = "update";
                break;
            case 3:
                this.title = "View Patient Details";
                this.sShow = false;
                break;
            default: this.title = "Patient Details";

        }

    }

    constructor(private userService: UserService, private patientService: PatientService) { }

    ngOnInit() {
        this.loading = true;
        this.reloadData();
        this.formData = new FormGroup({
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
        console.log("add called")
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
        this.patientId = patient.patientId
        this.formData.patchValue(patient)
        this.openPopup(2)
        console.log("update called")
        console.log(patient)
    }

    update(patient){
        console.log(this.patientId)
        console.log("update 2")
        console.log(patient)
        this.patientService.updatePatient(this.patientId, patient).subscribe(
            (res) => {
                this.restMsg = res;
                this.reloadData();
                setTimeout(() => {
                    this.restMsg = {};
                }, 2000);
            });
        $('#myModal').modal('toggle');
    }

    viewDetails(patient) {
        this.formData.patchValue(patient)
        this.openPopup(3)
    }

    submitForm(data) {
        if (this.action == "add")
            this.addPatient(data)
        else if (this.action == "update")
            this.update(data)
    }

}