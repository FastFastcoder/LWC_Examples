import { LightningElement,wire } from 'lwc';
import retrieveCases from '@salesforce/apex/empApi_UtilityBarController.retrieveCases';
//import serialJson from '@salesforce/apex/empApi_UtilityBarController.serialJson';
import Id from '@salesforce/user/Id';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {updateRecord} from 'lightning/uiRecordApi';
import CASE_ID from '@salesforce/schema/Case.Id';
import CASE_RESPONSE from '@salesforce/schema/Case.Response__c';
import {
    subscribe,
    unsubscribe,
    onError,
    setDebugFlag,
    isEmpEnabled,
} from 'lightning/empApi';
import TICK_LOGOS from '@salesforce/resourceUrl/tickJPG';



export default class EmpApi_UtilityBar extends LightningElement {
    userId = Id;
    error;
    data;
    tickUrl = TICK_LOGOS;
    channelName = "/event/Case_Event__e";
    


    @wire(retrieveCases, { userId: '$userId'})
    cases ({error, data}) {
        if (error) {
            this.error = error;
        } else if (data) {
            this.data = data;

        }
    }
    messageCallback = response => {
        fields = {};
        console.log('New message received: ', JSON.stringify(response));
        // Response contains the payload of the new message received
        console.log(JSON.parse(JSON.stringify(response)));
        let aa = JSON.parse(JSON.stringify(response));
        console.log(aa.data.payload.Case_Id__c);
        fields[CASE_ID.fieldApiName] = aa.data.payload.Case_Id__c;
        fields[CASE_RESPONSE.fieldApiName] = 'true';
        const inputRecord = {fields};
        updateRecord(inputRecord)
        .then(() => {
                console.log('updated!');
            })
            .catch((error) => {
                console.log(error.body.message);
            });
        this.showToast();
        
    };




    showToast() {
        const event = new ShowToastEvent({
            title: 'New case arrived!',
            message:
                'Please check the utility bar to open new case.}',
        });
        console.log('before dispatch');
        this.dispatchEvent(event);
    }

    
    connectedCallback() {

        subscribe(this.channelName, -1, this.messageCallback).then((response) => {
            console.log(
                'Subscription request sent to: ',
                JSON.stringify(response.channel)
            );

        });
    }    
}