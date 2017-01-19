(function(angular, AedestatsLocales) {
    
    angular.module("LocaleApp")
           .provider("$aedestatsLocale", localeProvider);
    
    function localeProvider() {
        
        var availableLocales = getAvailableLocales();
        var selectedLocale = Object.keys(availableLocales)[0];
        
        
        this.setLocale = setLocale;
        this.$get = $get;
        
      
      
      
        function setLocale(localeId) {
            this.selectedLocale = localeId;
        }
        
        function $get() {
            
            return availableLocales[selectedLocale];
        }
        
        
        function getAvailableLocales() {
            
            var availableLocales = {};
            
            Object.values(AedestatsLocales).map(function(locale) {
                availableLocales[locale.getLocale()] = locale;
            });
            
            return availableLocales;
            
        }
    }
    
})(angular, AedestatsLocales);