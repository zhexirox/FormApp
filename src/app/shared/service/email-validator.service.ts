import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator{

  constructor() { }

  /*
  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const email = control.value;
    console.log({email});

    return of({
      emailtaken: true
    }).pipe(
      delay( 2000 )
    )
  }
  */
  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const email = control.value;

    const httpCallObservable = new Observable<ValidationErrors | null>( (subscriber) => {
      console.log({ email });

      if( email === "zhexirox@hotmail.com") {
        subscriber.next({ emailTaken: true});
      }else{
        subscriber.next(null);
      }
      subscriber.complete();
    });

    return httpCallObservable
  }
}

/*
return this.http.get<any[]>("https://misservicio.com/user?q="+email)
  .pipe(
    //delay( 3000 )
    map( resp => {
      return (rep.length === 0) ? null : { emailTaken: true }
    })
  )
*/
