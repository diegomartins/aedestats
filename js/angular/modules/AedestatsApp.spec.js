"use strict";

describe("Module: AedestatsApp", function() {
   
    var $aedestatsLocaleProvider;
    var $rootScope;
    
    var messages = {"A" : "a", "B" : "b"};
    
    beforeEach(function() {
      
        module("LocaleApp", function(_$aedestatsLocaleProvider_) {
        
            $aedestatsLocaleProvider = _$aedestatsLocaleProvider_;
            spyOn($aedestatsLocaleProvider, "setLocale");
            spyOn($aedestatsLocaleProvider, "$get").and.returnValue(messages);
            
        });
        
        module("AedestatsApp");
        
        inject(function(_$rootScope_) {
        
            $rootScope = _$rootScope_;
        });
      
    });
   

    
    
    it('should configure the provider', function() {
        expect($aedestatsLocaleProvider.setLocale).toHaveBeenCalled();
    });
   
    it('should set the messages', function() {
        expect($rootScope.messages).toBeDefined();
        expect($rootScope.messages).toEqual(messages);
    });
   
});