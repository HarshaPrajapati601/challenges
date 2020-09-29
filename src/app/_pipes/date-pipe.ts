import {Component , Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: "datePipe"
})
export class datePipeDirective implements PipeTransform{
    transform(value: any, args?: any): any {
        if(typeof(value) == "object"){
          let dateNow = value.seconds * 1000 ;
        let dateConverted = new Date(dateNow) ;
        console.log("dateConverted");
        return dateConverted.toISOString().slice(0, 16);
        }
        return value;
      }
    }
  