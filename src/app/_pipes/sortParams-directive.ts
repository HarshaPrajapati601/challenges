import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({selector: '[appSortParams]'})
    export class SortParamsDirective {
    @Output() param:EventEmitter<any>=new EventEmitter();
    constructor(private element:ElementRef) { }
    @HostListener('click') onClickIcon(){
    this.selectSort(this.element.nativeElement.id)
    }
    selectSort(id){
        switch(id){
        case "DateAsc":
        this.param.emit({dir:"asc",col:"creationDate",type:"Date"})
        break;
        case "DateDesc":
        this.param.emit({dir:"desc",col:"creationDate",type:"Date"})
        break;

        case "CountAsc":
        this.param.emit({dir:"asc",col:"voteCount",type:"number"})
        break;
        case "CountDesc":
        this.param.emit({dir:"desc",col:"voteCount",type:"number"})
        break;

}}}