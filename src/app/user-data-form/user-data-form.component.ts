import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { Countries } from './Countries';

@Component({
  selector: 'app-user-data-form',
  templateUrl: './user-data-form.component.html',
  styleUrls: ['./user-data-form.component.css']
})
export class UserDataFormComponent implements OnInit {

  userDataForm: any;
  userDataFormSubmitted = false;
  userId: number;
  levelOrder: number;
  countries = Countries;
  loadSpinner = false;
  @Input() instructionReadingTime: number;

  constructor(private fb: FormBuilder, private backendService: BackendService) {}

  ngOnInit(): void {
    this.userDataForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      sex: [''],
      ageGroup: ['', Validators.required],
      country: ['', Validators.required],
      colorBlindness: ['N'],
      experience: ['N'],
      lastWeekUsage: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      email: ['', [Validators.email, Validators.maxLength(40), Validators.required]]
    });
  }

  onSubmit() {
    this.loadSpinner = true;
    this.backendService.sendUserData(this.userDataForm.value, this.instructionReadingTime).subscribe(response => {
    if (response['success']) {
        console.log(response);
        this.userId = response['USERID'];
        this.levelOrder = response['LEVEL_ORDER'];
        this.loadSpinner = false;
        this.userDataFormSubmitted = true;
      } else {
        alert('Something went terribly wrong!\n Please contact the author using link in the footer.');
      }
    }, error => {
      alert('Something went terribly wrong!\n Please contact the author using link in the footer.');
    });
  }

  get fullName() {
    return this.userDataForm.get('fullName');
  }

  get sex() {
    return this.userDataForm.get('sex');
  }

  get ageGroup() {
    return this.userDataForm.get('ageGroup');
  }

  get country() {
    return this.userDataForm.get('country');
  }

  get colorBlindness() {
    return this.userDataForm.get('country');
  }

  get experience() {
    return this.userDataForm.get('country');
  }

  get lastWeekUsage() {
    return this.userDataForm.get('lastWeekUsage');
  }

  get email() {
    return this.userDataForm.get('email');
  }

}