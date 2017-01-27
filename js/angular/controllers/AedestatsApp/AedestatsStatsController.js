(function(angular) {
    
    angular.module("AedestatsApp")
           .controller("AedestatsStatsController", AedestatsStatsController);
           
           
    AedestatsStatsController.$inject = ["$scope",
                                              "AedestatsService",
                                              "EventsService",
                                              "$aedestatsLocale"];
    
    function AedestatsStatsController($scope, AedestatsService, EventsService, $aedestatsLocale) {
        
        var vm = this;
     
        vm.stats     = undefined;
        
        
        EventsService.onDataLoaded($scope, initializeStats);
        
        
        function initializeStats(event, data) {
    
            vm.stats = data;
            vm.stats.totalCases = vm.stats.dng.total + vm.stats.chk.total + vm.stats.zik.total; //TODO: Extract to method, make it safe for undefined values.

            
        }
        
    }
    
})(angular);