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
  
  /*
  private static measureStrength(pass: string) {  
      let score = 0;  
      // award every unique letter until 5 repetitions  
      let letters = {};  
      for (let i = 0; i< pass.length; i++) {  
      letters[pass[i]] = (letters[pass[i]] || 0) + 1;  
      score += 5.0 / letters[pass[i]];  
      }  
      // bonus points for mixing it up   
  
      let variationCount = 0;  
      for (let check in variations) {  
      variationCount += (variations[check]) ? 1 : 0;  
      }  
      score += (variationCount - 1) * 10;  
      return Math.trunc(score);  
  }  
  */
  
private getColor(pass: string) {  
  let idx = 0;  
  this.isNotStrongEnough = true;
  let passLength = pass.length;
  let variations = {  
    digits: /\d/.test(pass),  
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
    lower: /[a-z]/.test(pass),  
    upper: /[A-Z]/.test(pass)
  }; 
  if (variations.digits && variations.lower && variations.upper && variations.specialChar && (passLength >= 8)) {  
    idx = 2;
    this.isNotStrongEnough = false;
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
          //let c = this.getColor(PasswordStrengthBarComponent.measureStrength(password));  
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