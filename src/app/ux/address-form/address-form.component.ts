import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Controls, Validation, ValidationError } from './address-form.model';
import { validator } from './address-form.validations';
import { Observable, Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { randomControls } from './create-address.demo.data';

export interface AddressFormComponentConfig {
  controls: Controls;
  onSubmit(controls: Controls): Observable<Controls>
}

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [ ReactiveFormsModule, RouterModule, CommonModule ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent implements OnInit, OnDestroy {
  @Input() config!: AddressFormComponentConfig;

  randomControls = randomControls;
  validator = validator;
  form!: FormGroup;
  formValidator: any;
  formValidations!: Validation;
  formValidationSubscription!: Subscription;

  get canSubmit(): boolean {
    return this.formValidations.isValid;
  }

  get isDisabled(): boolean {
    return !this.canSubmit;
  }

  get hasErrors(): boolean {
    return !!this.formValidations.errors.length;
  }

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.formValidations = {
      isValid: false,
      errors: []
    };
    this.form = this.formBuilder.group(this.config.controls);
    this.formValidationSubscription = this.form.valueChanges.subscribe(this.validate.bind(this));
  }

  viewAddress(address: Controls): void {
    const id = address.addressId;
    this.buildForm();
    this.router.navigate([`/mf/${id}`]);
  }

  validate(): void {
    const formControls = this.form.value;
    this.formValidations.isValid = this.validator(formControls).valid;
    this.formValidations.errors = this.validator(formControls).errors as ValidationError[];
  }

  onSubmit(): void {
    this.validate();
    if(this.canSubmit) {
      this.config.onSubmit(this.form.value).subscribe((address)=> { 
        this.viewAddress(address)
      });
    }
  }

  ngOnDestroy(): void {
    this.formValidationSubscription?.unsubscribe();
  }

  /* Demo Method for non prod */
  fillRandom(): void {
    /* @ts-ignore */
    this.addressFormConfig = null;
    const numBerOfControls = this.randomControls.length;
    const randomPick = Math.floor(Math.random() * numBerOfControls);
    this.config.controls = this.randomControls[randomPick];
    setTimeout(()=> {
      this.buildForm();
      this.validate();
    }, 300)
  }
}

