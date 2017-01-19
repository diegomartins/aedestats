(function(angular) {
    
    var moduleDependencies = ["LocaleApp", 
                              "ServicesApp"];
    
    var app = angular.module("AedestatsApp", moduleDependencies);
  
    app.config(configureAppLocaleSettings);  

    app.run(runApp);
    
    
    configureAppLocaleSettings.$inject = ["$aedestatsLocaleProvider", "$localeProvider"];
    
    function configureAppLocaleSettings($aedestatsLocaleProvider, $localeProvider) {
        
        //$localeProvider.$get().id;
        $aedestatsLocaleProvider.setLocale("pt_br");
    }
    
    
    runApp.$inject = ["$rootScope", "$aedestatsLocale"];
    
    function runApp($rootScope, $aedestatsLocale) {
        
        $rootScope.messages = $aedestatsLocale;
    }
    
})(angular);