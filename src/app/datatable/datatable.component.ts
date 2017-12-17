import { Component } from '@angular/core';
import { RankedPlayer} from '../ranked-player';
import { OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'data-table',
  templateUrl: './datatable.component.html',
  styleUrls: ['../css/bootstrap.css','../css/custom.css']
})
export class DatatableComponent implements OnInit{
    objectKeys = Object.keys;
    //items = { keyOne: 'value 1', keyTwo: 'value 2', keyThree: 'value 3' };
    @Input( 'dataList' ) dataList: any[];
    @Input( 'header' ) headerList: String[];
    @Output() rowClick = new EventEmitter<any>();
    
    constructor() {}
    
    ngOnInit(): void {}
    
    setSelectedRow( rowIndex: any ): void {
        this.rowClick.emit( {
            index: rowIndex
        } );
    }
    
    testingStuff(rowIndex: any) :void{
        console.log("Show some url");
    }
}
