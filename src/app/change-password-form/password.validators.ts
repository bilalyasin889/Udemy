import { AbstractControl, ValidationErrors } from "@angular/forms";

export class PaswordValidators{
    static checkOldPassword(control: AbstractControl) {
        return new Promise((resolve) => {
            setTimeout(() => {
                if(control.value !== '1234')
                    resolve({checkOldPassword: true});
                else
                    resolve(null);
            }, 200);
        });
    }

    static checkMatchPassword(control: AbstractControl) {
        let newPassword = control.get('newPassword');
        let cnfPassword = control.get('cnfPassword');

        if(newPassword?.value !== cnfPassword?.value)
            return{ checkMatchPassword: true };
        
            return null;
    }

}