public with sharing class accDataTableController {
    @AuraEnabled (cacheable=true)
    public static List<Account> retrieveAccounts(){
        return [SELECT Id, Name, Type, BillingCountry FROM Account LIMIT 100];
    }
}