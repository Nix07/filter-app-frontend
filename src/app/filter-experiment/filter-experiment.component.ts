import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-filter-experiment',
  templateUrl: './filter-experiment.component.html',
  styleUrls: ['./filter-experiment.component.css']
})
export class FilterExperimentComponent implements OnInit, AfterViewInit {

  @Input() userId: number;
  @Input() levelOrder: number;

  imageLoader1 = true;
  imageLoader2 = true;
  secondFilterSubmitted = false;
  firstImageFlag = true;
  basePath = '../assets/images/';
  firstImage = this.basePath + 'first.jpg';
  secondImage = this.basePath + 'second.jpg';
  loadingImage = this.basePath + 'loading.gif';
  showFilters: boolean;
  displayImageClass = 'img-fluid';
  selectedFilter = 'filter-normal';
  filters = ['normal', 'clarendon', 'gingham', 'moon', 'lark', 'reyes', 'juno', 'slumber', 'crema', 'ludwig', 'aden', 
    'perpetua', 'amaro', 'mayfair', 'rise', 'hudson', 'hefe', 'valencia', 'xpro-ii', 'sierra', 'willow', 
    'lofi', 'inkwell', 'nashville'];

  firstTaskStartingTime: Date;
  secondTaskStartingTime: Date;
  endTime: Date;
  loadSpinner = false;
  experimentData = {
    userId: 0,
    firstTaskTime: 0,
    firstTaskFilters: [],
    secondTaskTime: 0,
    secondTaskFilters: []
  }

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    for (let i = 0; i < this.filters.length; i++) {
      this.filters[i] = 'filter-' + this.filters[i];
    }
    this.experimentData.userId = this.userId;
    this.showFilters = this.levelOrder == 0 ? false : true;
  }

  ngAfterViewInit() {
    this.firstTaskStartingTime = new Date();
  }

  selectFilter(filter) {
    const filterIndex = this.filters.indexOf(filter) + 1;
    if (this.firstImageFlag) {
      this.experimentData.firstTaskFilters.push(filterIndex);
    } else {
      this.experimentData.secondTaskFilters.push(filterIndex);
    }
    this.displayImageClass = filter + ' img-fluid';
    this.selectedFilter = filter;
  }

  submit() {
    if (this.firstImageFlag) {
      // Calculate completion time for first task 
      this.secondTaskStartingTime = new Date();
      this.experimentData.firstTaskTime = (this.secondTaskStartingTime.getTime() - this.firstTaskStartingTime.getTime()) / 1000;

      this.firstImageFlag = false;
      this.displayImageClass = 'img-fluid'
      this.selectedFilter = 'filter-filterless';
    } else {
      // Calculate completion time for second task
      this.endTime = new Date();
      this.experimentData.secondTaskTime = (this.endTime.getTime() - this.secondTaskStartingTime.getTime()) / 1000;

      // Send the task statistic to server
      console.log(this.experimentData);
      this.loadSpinner = true;
      this.backendService.sendExperimentData(this.experimentData).subscribe(response => {
        if (response['success']) {
          console.log(response);
          this.loadSpinner = false;
          this.secondFilterSubmitted = true;
        } else {
          alert('Something went terribly wrong!\n Please contact the author using link in the footer.');
        }
      }, error => {
        alert('Something went terribly wrong!\n Please contact the author using link in the footer.');
      });
    }
  }

}
