import { ValidationService } from '../../../services/validation.service';
import { TeachersService } from '../../../services/teachers.service';
import { Component, OnInit } from '@angular/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { format, addYears } from 'date-fns';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'webui-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'uk-UK'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class TeacherCreateComponent implements OnInit {
  private avatarImg = '../../../assets/images/no-user-image.png';
  private maxAge = addYears(new Date(), -18);
  addTeacher: FormGroup;

  constructor(private teachServise: TeachersService,
              private validServ: ValidationService,
              private formBuilder: FormBuilder) {}

// method submit form, edit data for request
submitAdd(event: Event): void {
    event.preventDefault();
    const data = this.addTeacher.value;
    data.avatar = '';
    data.dateOfBirth = format(new Date(data.dateOfBirth), 'YYYY-MM-DD');
    this.teachServise.addTeacher(data);
    this.addTeacher.reset();
  }

  // create form with regex validators
  ngOnInit(): void {
    this.addTeacher = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern(this.validServ.ukrNameRegExp)]],
      lastname: ['', [Validators.required, Validators.pattern(this.validServ.ukrNameRegExp)]],
      patronymic: ['', [Validators.required, Validators.pattern(this.validServ.ukrNameRegExp)]],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.pattern(this.validServ.emailRegExp)]],
      phone: ['', [Validators.pattern(this.validServ.phoneRegExp)]],
      login: ['', [Validators.required, Validators.pattern(this.validServ.loginRegExp)]]
    });
  }
}
