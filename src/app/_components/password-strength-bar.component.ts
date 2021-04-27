import { Component, OnChanges, EventEmitter, Input, Output, SimpleChange } from '@angular/core';  
  
@Component({  
  selector: 'password-strength-bar',  
  templateUrl: 'password-strength-bar.component.html',  
  styleUrls: ['password-strength-bar.component.css']  
})  
export class PasswordStrengthBarComponent implements OnChanges {  
  
  @Input() passwordToCheck: string;  
  @Input() barLabel: string;
  @Output() passwordStrength = new EventEmitter<boolean>();
  
  public isNotStrongEnough: boolean = true;
  
  bar0: string;  
  bar1: string;  
  bar2: string;
  
  private colors = ['#F00', '#F90', '#0F0'];  

  
  private getColor(pass: string) {  
    let idx = 0;  
    this.isNotStrongEnough = true;
    let passLength = pass.length;
    // Different checks that need to pass on the password check
    let variations = {  
      digits: /\d/.test(pass),  
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
      lower: /[a-z]/.test(pass),  
      upper: /[A-Z]/.test(pass)
    }; 
    // If the password fulfills all variation and it is atleast 8 characters long we have a strong password
    if (variations.digits && variations.lower && variations.upper && variations.specialChar && (passLength >= 8)) {  
      idx = 2;
      this.isNotStrongEnough = false;
    // If the password fulfills some variations and is atleast 6 characters long we have a moderate password
    } else if (variations.digits && variations.lower && variations.upper && (passLength >= 6)) {  
      idx = 1;
    }
    return {  
      idx: idx + 1,  
      col: this.colors[idx]  
    };  
  }  
  
  ngOnChanges(changes: {[propName: string]: SimpleChange}): void {  
      var password = changes['passwordToCheck'].currentValue;  
      this.setBarColors(5, '#DDD');  
      if (password) {
          let c = this.getColor(password);  
          this.setBarColors(c.idx, c.col);  
      }  
      this.passwordStrength.emit(this.isNotStrongEnough);
  }  
  private setBarColors(count, col) {  
      for (let _n = 0; _n < count; _n++) {  
          this['bar' + _n] = col;  
      }  
  }  
  
} 