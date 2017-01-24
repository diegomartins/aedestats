(function(angular) {
    
    angular.module("AedestatsApp")
           .controller("AedestatsGlobalStatsController", AedestatsGlobalStatsController);
           
           
    AedestatsGlobalStatsController.$inject = ["AedestatsService", 
                                              "$aedestatsLocale"];
    
    function AedestatsGlobalStatsController(AedestatsService, $aedestatsLocale) {
        
        var vm = this;
     
        vm.stats     = undefined;
        vm.chartData = undefined;
        
        initializeStats();
        
        
        function initializeStats() {
        
            var promise = AedestatsService.getGlobalStats();
        
            promise.then(function(response) {
                vm.stats = response.data;
                vm.stats.totalCases = vm.stats.dng.total + vm.stats.chk.total + vm.stats.zik.total; //TODO: Extract to method, make it safe for undefined values.
                vm.chartData = loadChartData(vm.stats);
            }, function(response) {
                //TODO: Handle error.
                console.error("Error getting global stats.");
            });    
        }
   
        function loadChartData(stats) {
           
            var data = {
                labels: Array.apply(null, {length: vm.stats.dng.casesPerWeek.length}).map(function(value, index){ return index + 1; }),
                datasets: [
                    {
                        label: $aedestatsLocale["DNG"],
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(159,0,212,0.4)",
                        borderColor: "rgba(159,0,212,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(220,12,20,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(220,12,20,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: vm.stats.dng.casesPerWeek,
                        spanGaps: false,
                    },
                     {
                        label: $aedestatsLocale["CHK"],
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(212, 53, 0,0.4)",
                        borderColor: "rgba(212, 53, 0,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: vm.stats.chk.casesPerWeek,
                        spanGaps: false,
                    },
                     {
                        label: $aedestatsLocale["ZIK"],
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(0, 159, 212,0.4)",
                        borderColor: "rgba(0, 159, 212,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: vm.stats.zik.casesPerWeek,
                        spanGaps: false,
                    }
                ]
            };
            
            return data;
            
            
        
        }
      
        
        
    }
    
})(angular);