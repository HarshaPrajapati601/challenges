import {Component , Pipe, PipeTransform} from '@angular/core';
import { type } from 'os';

@Pipe({name: "sortBy"})
export class SortPipe implements PipeTransform{
    // loopVariable: any = this;
    transform = (items:[],direction:string,column:string,type:Date) => {
        let sortedItems=[];
       
         sortedItems = direction==="asc" ?  this.sortAscending(items,column,type):  this.sortDescending(items,column,type)
        return sortedItems;
    }
    dateConverterObject = (date1 :any) => {
        let first;
        let second;
        if(typeof(date1) == 'object'){
            first = {...date1};
            second = new Date(first.seconds * 1000).toISOString() ;
            return second;
        }
        return date1;
    }

        sortAscending = (items,column,type) => {
        return [...items.sort(function(a:any,b:any){
        if(column == 'creationDate'){
            const date1 = this.dateConverterObject(a[column]);
            const date2 =  this.dateConverterObject(b[column]);    
                if (date1 < date2)
                {
                    return -1 ;
                }
                else if(date1 > date2){
                    return 1 ;
                }
                else{
                    return 0;
                }

        }
       else if(typeof(a[column]) == 'string'){
            if (a[column].toUpperCase() < b[column].toUpperCase())
            {
                return -1 ;
            }
        else if(a[column].toUpperCase() > b[column].toUpperCase()){
            return 1 ;
        }
        else{
            return 0;
        }
        }
    else if(typeof (a[column]) == 'number'){
        if (a[column] < b[column])
        {
            return -1 ;
           }
       else if(a[column] > b[column]){
           return 1 ;
       }
       else{
           return 0;
       }
    }
      }.bind(this))]
        }
        sortDescending = (items,column,type) => {
        return [...items.sort(function(a:any,b:any){
            if(column == 'creationDate'){
                const date1 = this.dateConverterObject(a[column]);
                const date2 =  this.dateConverterObject(b[column]); 
                    if (date1 > date2)
                    {
                        return -1 ;
                    }
                else if(date1 < date2){
                    return 1 ;
                }
                else{
                    return 0;
                }
    
            }
          else if(typeof (a[column]) == 'string'){
                if (a[column].toUpperCase() > b[column].toUpperCase()) 
                {
                    return -1;
                }

            else if(a[column].toUpperCase() < b[column].toUpperCase()){
                return 1;
                }
                else{
                    return 0;
                }
            }else if(typeof (a[column]) == 'number'){
                if (a[column] > b[column]) 
                {
                    return -1
                }

            else if(a[column] < b[column]){
                return 1
                }
                else{
                    return 0;
                }
            }
            }.bind(this))]
            }

         
        }
