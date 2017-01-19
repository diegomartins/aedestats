(function(angular) {
    
    angular.module("AedestatsApp")
           .controller("AedestatsDetailController", AedestatsDetailController);
           
           
    AedestatsDetailController.$inject = ["AedestatsService"];
    
    function AedestatsDetailController(AedestatsService) {
        
        var vm = this;
        
        vm.neighborhoods        = [];
        vm.selectedNeighborhood = undefined;
        vm.selectedStats        = undefined;
        
        vm.getStats = getStats;
        
        
        initializeNeighborhoods();
        
        
        function getStats() {
            
            if(!vm.selectedNeighborhood) {
                vm.selectedStats = undefined;
                return;
            }
            
            var promise = AedestatsService.getStats(vm.selectedNeighborhood);
            
            promise.then(function(response) {
               
               vm.selectedStats = response.data; 
            });
        }
        
        function initializeNeighborhoods() {
        
            var promise = AedestatsService.getAreas();
        
            promise.then(function(response) {
                vm.neighborhoods = response.data;
            }, function(response) {
                //TODO: Handle error.
                console.error("Error getting areas.");
            });    
        }
        
        
    }
    
})(angular);