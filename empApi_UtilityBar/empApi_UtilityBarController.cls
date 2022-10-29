public with sharing class empApi_UtilityBarController {
    @AuraEnabled(cacheable=true)
    public static List<Case> retrieveCases(String userId){
        try {
            List<Case> caseList = [SELECT CaseNumber, Subject, Status, Response__c,Response_Check__c FROM Case WHERE OwnerId = :userId AND Subject != null Limit 3];
            return caseList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }



}
