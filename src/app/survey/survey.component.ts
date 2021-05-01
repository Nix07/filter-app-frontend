import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  @Input() userId: number;

  surveyFormSubmitted = false;
  surveyDataForm: any;
  loadSpinner = false;
  filters = ['normal', 'clarendon', 'gingham', 'moon', 'lark', 'reyes', 'juno', 'slumber', 'crema', 'ludwig', 'aden', 
    'perpetua', 'amaro', 'mayfair', 'rise', 'hudson', 'hefe', 'valencia', 'xpro-ii', 'sierra', 'willow', 
    'lofi', 'inkwell', 'nashville'];

  constructor(private fb: FormBuilder, private backendService: BackendService) { }

  ngOnInit(): void {
    this.surveyDataForm = this.fb.group({
      firstFilterFlag: ['N'],
      firstFilter: [''],
      secondFilterFlag: ['N'],
      secondFilter: [''],
      usefulness: ['', Validators.required],
      firstQuestion: ['N'],
      secondQuestion: ['N'],
      comment: ['', [Validators.maxLength(280), Validators.minLength(20)]]
    });
    this.setCommentValidators();
  }

  onSubmit() {
    this.loadSpinner = true;
    this.backendService.surveyData(this.surveyDataForm.value, this.userId).subscribe(response => {
      if (response['success']) {
        console.log(response);
        this.loadSpinner = false;
        this.surveyFormSubmitted = true;
      } else {
        alert('Something went terribly wrong!\n Please contact the author using link in the footer.');
      }
    }, error => {
      alert('Something went terribly wrong!\n Please contact the author using link in the footer.');
    });
  }

  setCommentValidators() {
    const commentControl = this.surveyDataForm.get('comment');
    
    this.surveyDataForm.get('usefulness').valueChanges.subscribe(rating => {
      if (rating > 2) {
        commentControl.setValidators([Validators.maxLength(280), Validators.required, Validators.minLength(20)]);
      } else {
        commentControl.setValidators([Validators.maxLength(280), Validators.minLength(20)]);
      }
      commentControl.updateValueAndValidity();
    });
  }

  get firstFilterFlag() {
    return this.surveyDataForm.get('firstFilterFlag');
  }

  get secondFilterFlag() {
    return this.surveyDataForm.get('secondFilterFlag');
  }

  get usefulness() {
    return this.surveyDataForm.get('usefulness');
  }

  get firstQuestion() {
    return this.surveyDataForm.get('firstQuestion');
  }

  get secondQuestion() {
    return this.surveyDataForm.get('secondQuestion');
  }

  get comment() {
    return this.surveyDataForm.get('comment');
  }
}
