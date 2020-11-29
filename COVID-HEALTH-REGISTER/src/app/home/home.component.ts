import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { Patient } from '@app/_models';
import { PatientService, UserService } from '@app/_services';
import { Observable } from "rxjs";
import { FormGroup, Validators, FormControl } from '@angular/forms';
declare var $ : any;
@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    patientsList: Observable<Patient[]>;

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
            firstName : new FormControl("", [Validators.required]),
            lastName : new FormControl("", [Validators.required]),
            hospitalName : new FormControl("", [Validators.required]),
            contact : new FormControl("", [Validators.required]),
result : new FormControl("", [Validators.required])
          });
      
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }
reloadData() {
        this.patientsList = this.patientService.getPatientList();
      }

    addPatient(addForm){
        console.log(addForm)
        this.patientService.addPatient(addForm).subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );
        $('#myModal').modal('toggle');
    }

}