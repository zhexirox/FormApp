import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, FormGroup, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public cantBeStrider = ( control: FormControl ): ValidationErrors | null => {

    const value: string = control.value.trim().toLowerCase();

    if(value === 'strider') {
      return {
        noStrider: true
      }
    }

    return null;
  }

  isValidField( form: FormGroup, field: string ): boolean | null {
    return form.controls[field].errors &&
           form.controls[field].touched;
  }

  isValidFieldInArray( formArray: FormArray, index: number ) {
    return formArray.controls[index].errors &&
           formArray.controls[index].touched;
  }

  getFieldError( form: FormGroup, field: string): string | null {
    if( !form.controls[field] ) return null;

    const errors = form.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          //return 'Mínimo '+errors['minlength'].requiredLength+" letras";
          return `Mínimo ${ errors['minlength'].requiredLength } letras`;
      }
    }
    return null;
  }

  isFieldOneEqualFieldTwo( field1: string, field2: string) {

    return( formGroup: FormGroup ) : ValidationErrors | null => {
      const pass = formGroup.get(field1)?.value;
      const confirmPass = formGroup.get(field2)?.value;
      if( pass !== confirmPass ) {
        formGroup.get(field2)?.setErrors({ notEqual: true})
        return { notEqual: true }
      }
      formGroup.get(field2)?.setErrors(null);
      return null;
    }
  }

}
