(function(angular) {
    
    angular.module("ServicesApp")
           .factory("AedestatsService", AedestatsService);
           
    AedestatsService.$inject = ["$http"];
    
    function AedestatsService($http) {
        
        var module = {
            getAreas : getAreas,
            getStats : getStats
        };
        
        var appRoot = "/rest"
        
        function getAreas() {
            
            return $http.get(appRoot + "/areas");
        }
        
        function getStats(area) {
            
            return $http.post(appRoot + "/stats", area);
        }
        
        return module;
    }
    
})(angular);