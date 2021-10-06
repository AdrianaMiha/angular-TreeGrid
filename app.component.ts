import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { SortService, ResizeService, PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService } from '@syncfusion/ej2-angular-treegrid';
import {  EditSettingsModel } from '@syncfusion/ej2-treegrid';
import { TreeGridComponent} from '@syncfusion/ej2-angular-treegrid';
import { getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    providers: [SortService, ResizeService, PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService]
    
})
export class AppComponent {
    public data: Object[] = [];
    // public contextMenuItems: string[] = [];
    public contextMenuItems: Object[];
    public editing: EditSettingsModel;
    public toolbar: string[];
    public editparams: Object;
    public treeGridObj: TreeGridComponent;

    ngOnInit(): void {
        this.data = sampleData;
        // this.contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending',
        //  'Edit', 'Delete', 'Save', 'Cancel',
        // 'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage',
        // 'LastPage', 'NextPage',];
        this.contextMenuItems= [
            {text: 'Collapse the Row', target: '.e-content', id: 'collapserow'},
            {text: 'Expand the Row', target: '.e-content', id: 'expandrow'},
            { text: 'Style', target: '.e-headercontent', id: 'collapseall' },
            { text: 'Choose', target: '.e-headercontent', id: 'expandall' },
            { text: 'Freeze', target: '.e-headercontent', id: 'expandall' },
            { text: 'Filter', target: '.e-headercontent', id: 'expandall' },
            { text: 'Multisort', target: '.e-headercontent', id: 'expandall' },
         ]
    this.editing = { allowDeleting: true, allowEditing: true, mode: 'Row' };
    this.editparams = {params: { format: 'n' }};
    }

    contextMenuClick(args?: MenuEventArgs): void {
        this.treeGridObj.getColumnByField('taskID');
        if (args.item.id === 'collapserow') {
            this.treeGridObj.collapseRow(<HTMLTableRowElement>(this.treeGridObj.getSelectedRows()[0]));
        } else {
            this.treeGridObj.expandRow(<HTMLTableRowElement>(this.treeGridObj.getSelectedRows()[0]));
            }
    }

    contextMenuOpen(arg?: BeforeOpenCloseEventArgs) : void {
        let elem: Element = arg.event.target as Element;
        let uid: string = elem.closest('.e-row').getAttribute('data-uid');
        if (isNullOrUndefined(getValue('hasChildRecords', this.treeGridObj.grid.getRowObjectFromUID(uid).data))) {
            arg.cancel = true;
        } else {
            let flag: boolean = getValue('expanded', this.treeGridObj.grid.getRowObjectFromUID(uid).data);
            let val: string = flag ? 'none' : 'block';
            document.querySelectorAll('li#expandrow')[0].setAttribute('style', 'display: ' + val + ';');
            val = !flag ? 'none' : 'block';
            document.querySelectorAll('li#collapserow')[0].setAttribute('style', 'display: ' + val + ';');
        }
    }
}