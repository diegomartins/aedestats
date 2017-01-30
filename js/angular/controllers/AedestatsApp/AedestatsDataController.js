(function(angular) {
    
    angular.module("AedestatsApp")
           .controller("AedestatsDataController", AedestatsDataController);
           
           
    AedestatsDataController.$inject = ["$scope",
                                       "AedestatsService", 
                                       "EventsService"];
    
    function AedestatsDataController($scope, AedestatsService, EventsService) {
        
        var vm = this;

        vm.areas         = [];
        
        vm.stats         = undefined;
        
        vm.filter = {
          
            area         : undefined,
            year         : undefined
            
        };
        
        vm.updateStats = updateStats;
        
        
        initializeAreas();

        
        function updateStats() {
        
            var promise = AedestatsService.getStats(vm.filter);
        
            promise.then(function(response) {
                vm.stats = response.data;
                vm.stats.totalCases = vm.stats.dng.total + vm.stats.chk.total + vm.stats.zik.total; //TODO: Extract to method, make it safe for undefined values.
                EventsService.fireDataLoaded($scope.$parent, vm.stats);
            }, function(response) {
                //TODO: Handle error.
                console.error("Error getting stats.");
            });    
        }
        
        function initializeAreas() {
        
            var promise = AedestatsService.getAreas();
        
            promise.then(function(response) {
                
                var areas = response.data;
                
                for(var i = 0; i < areas.length; i ++) {
                    
                    vm.areas.push(areas[i]);

                }
                
                vm.filter.area = vm.areas[0];
                vm.updateStats();
                
            }, function(response) {
                //TODO: Handle error.
                console.error("Error getting areas.");
            });    
        }
        
     
        
        
    }
    
})(angular);