import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/service/validators.service';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  /*
  public myForm = new FormGroup({
    favoriteGames: new FormArray([])
  });
  */

  public myForm: FormGroup = this.fb.group({
    //name: ['', [], [] ], valor inicial, validaciones sincronas, validaciones asincronas
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required ],
      ['Escape From Tarkov', Validators.required ],
    ])
  });

  public newFavorite: FormControl = new FormControl('', [ Validators.required ])

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField( field: string ): boolean | null {
    return this.validatorsService.isValidField( this.myForm, field );
  }
  isValidFieldInArray( formArray: FormArray, index: number ) {
    return this.validatorsService.isValidFieldInArray( formArray, index );
  }
  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError( this.myForm, field )
  }

  onAddToFavorites():void {
    if( this.newFavorite.invalid ) return;

    const newGame = this.newFavorite.value;

    //Sin trabajar con From Builder
    //this.favoriteGames.push( new FormControl( newGame, Validators.required) );

    this.favoriteGames.push( this.fb.control( newGame, Validators.required ) );
    this.newFavorite.reset();
  }

  onDeleteFavorite ( index: number ): void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit():void {

    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();

  }

}
