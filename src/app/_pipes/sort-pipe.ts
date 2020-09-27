import {Component , Pipe, PipeTransform} from '@angular/core';

@Pipe({name: "sortBy"})
export class SortPipe implements PipeTransform{
    transform(items:[],direction:string,column:string,type:Date){
        let sortedItems=[];
        // direction = true ? 1 : -1 ;
        // sortedItems =  this.sortAscending(items,column ,direction)
         sortedItems = direction==="asc" ?  this.sortAscending(items,column,type):  this.sortDescending(items,column,type)
        return sortedItems;
        }
        sortAscending(items,column,type){
        return [...items.sort(function(a:any,b:any){
       
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
      })]
    }
        sortDescending(items,column,type){
        return [...items.sort(function(a:any,b:any){
        if (a[column].toUpperCase() > b[column].toUpperCase()) 
        {
            return -1
        }

        else if(a[column].toUpperCase() < b[column].toUpperCase()){
            return 1
        }
        else{
            return 0;
        }
        })]
        }
        }
    // transform(array : Array<string>,args:string ,) : Array<string>{
        
    //     array.sort((a:any , b:any) =>{
    //         if(a[args] < b[args]){
    //             return -1;
    //         }else if(a[args] > b[args]){
    //             return 1;
    //         }else{
    //             return 0;
    //         }
    //     });
    //     return array;
    // }
