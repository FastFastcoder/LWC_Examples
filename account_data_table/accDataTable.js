import { LightningElement, wire } from 'lwc';
import retrieveAccounts from '@salesforce/apex/accDataTableController.retrieveAccounts';
const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Type', fieldName: 'Type' },
    { label: 'BillingCountry', fieldName: 'BillingCountry'},       
];
 
export default class accDataTable extends LightningElement {
    data;
    columns = columns;
    error;
 
    

    @wire(retrieveAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.data = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }
 
    getSelectedRec() {
      var selectedRecords =  this.template.querySelector("lightning-datatable").getSelectedRows();
      if(selectedRecords.length > 0){
          console.log('selectedRecords are ', selectedRecords);
 
          let ids = '';
          selectedRecords.forEach(currentItem => {
              ids = ids + ',' + currentItem.Id;
          });
          this.selectedIds = ids.replace(/^,/, '');
          this.lstSelectedRecords = selectedRecords;
          alert(this.selectedIds);
      }   
    }
}