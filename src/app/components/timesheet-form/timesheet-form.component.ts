import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-timesheet-form',
  templateUrl: './timesheet-form.component.html',
  styleUrls: ['./timesheet-form.component.css']
})
export class TimesheetFormComponent implements OnInit {

  myForm: FormGroup;
  dates = ["01-01-2020", "01-02-2020", "01-03-2020", "01-04-2020", "01-05-2020", "01-06-2020", "01-07-2020"];

  constructor( private fb: FormBuilder ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      employee: '',
      projects: this.fb.array([])
    })
  }

  // OPTIONAL - but recommended; getter
  get projectForms(){
    return this.myForm.get('projects') as FormArray;
  }

  addProject() {
    const entryControlArray= this.getEntryControls(this.dates);

    const project = this.fb.group({
      projectId: [''],
      projectTitle: [''],
      // entries: this.fb.array([ this.fb.group({date: "whatever", hours: 0 }) ])
      entries: this.fb.array(entryControlArray)
    });
    
    this.projectForms.push(project)
  }

  deleteProject(i) {
    this.projectForms.removeAt(i);
  }
  
  getEntryControls(dates) {
    const controlArray = [];

    dates.forEach(date => { 
      const control = this.fb.group({ date, hours: 0 });
      controlArray.push(control); 
    });
    return controlArray;
  }


}

