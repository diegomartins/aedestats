(function(angular) {
    
    angular.module("AedestatsApp")
           .controller("AedestatsDataController", AedestatsDataController);
           
           
    AedestatsDataController.$inject = ["$scope",
                                       "AedestatsService", 
                                       "EventsService"];
    
    function AedestatsDataController($scope, AedestatsService, EventsService) {
        
        var vm = this;
        
        vm.cities        = [{name: "Rio de Janeiro"}];
        vm.zones         = [];
        vm.regions       = [];
        vm.neighborhoods = [];
        
        vm.stats         = undefined;
        
        vm.filter = {
          
            city         : vm.cities[0],
            zone         : undefined,
            region       : undefined,
            neighborhood : undefined,
            year         : undefined
            
        };
        
        initializeAreas();
        updateStats();
        
        
        function updateStats() {
        
            var promise = AedestatsService.getStats(vm.filter);
        
            promise.then(function(response) {
                vm.stats = response.data;
                vm.stats.totalCases = vm.stats.dng.total + vm.stats.chk.total + vm.stats.zik.total; //TODO: Extract to method, make it safe for undefined values.
                EventsService.fireDataLoaded($scope.$parent, vm.stats);
            }, function(response) {
                //TODO: Handle error.
                console.error("Error getting global stats.");
            });    
        }
        
        function initializeAreas() {
        
            var promise = AedestatsService.getAreas();
        
            promise.then(function(response) {
                
                var areas = response.data;
                
                for(var i = 0; i < areas.length; i ++) {
                    
                    if(areas[i].type === 'nbh')     vm.neighborhoods.push(areas[i]);
                    if(areas[i].type === 'region')  vm.regions.push(areas[i]);
                    if(areas[i].type === 'zone')    vm.zones.push(areas[i]);
                }
                
            }, function(response) {
                //TODO: Handle error.
                console.error("Error getting areas.");
            });    
        }
        
     
        
        
    }
    
})(angular);