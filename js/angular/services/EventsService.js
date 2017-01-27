(function(angular) {
    
    angular.module("ServicesApp")
           .factory("EventsService", EventsService);
           
    function EventsService() {
        
        var module = {
            fireDataLoaded : fireDataLoaded,
            onDataLoaded   : onDataLoaded
        };
        
        const DATA_LOADED = "DATA_LOADED";
      
        
        function fireDataLoaded(broadcasterScope, data) {
            broadcasterScope.$broadcast(DATA_LOADED, data);
        }
        
        function onDataLoaded(subscriberScope, callback) {
            subscriberScope.$on(DATA_LOADED, callback);
        }
        
        return module;
    }
    
})(angular);