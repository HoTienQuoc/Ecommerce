import { AbstractControl, ValidationErrors, ValidatorFn, FormControl } from '@angular/forms';

export class Luv2ShopValidators {
    //whitespace validation

    static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null {
        if (control.value != null && control.value.trim().length === 0) {
            return { "notOnlyWhiteSpace": true };
        }
        return null;
    }    
}
