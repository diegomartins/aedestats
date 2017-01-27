(function(angular) {
    
    angular.module("AedestatsApp")
           .controller("AedestatsChartsController", AedestatsChartsController);
           
           
    AedestatsChartsController.$inject = ["$scope",
                                         "EventsService", 
                                         "$aedestatsLocale"];
    
    function AedestatsChartsController($scope, EventsService, $aedestatsLocale) {
        
        var vm = this;
     
        vm.charts = {};

        EventsService.onDataLoaded($scope, initializeCharts);
        
        
        function initializeCharts(event, data) {
        
            vm.charts.line = {
                data: loadLineChartData(data)
            };
            
            vm.charts.pie = {
                data : loadPieChartData(data)
            };
            
        }
   
        function loadLineChartData(stats) {
           
            var data = {
               
                labels: Array.apply(null, {length: stats.dng.casesPerWeek.length}).map(function(value, index){ return index + 1; }),
               
                datasets: [
                    
                    getDatasetForLineChart(stats.dng.casesPerWeek, $aedestatsLocale["DNG"], "#9F00D4"),
                    getDatasetForLineChart(stats.chk.casesPerWeek, $aedestatsLocale["CHK"], "#D43500"),
                    getDatasetForLineChart(stats.zik.casesPerWeek, $aedestatsLocale["ZIK"], "#009FD4")
                  
                ]
            };
            
            return data;
        
        }
      
        function loadPieChartData(stats) {
            
            var data = {
                labels: [ $aedestatsLocale["DNG"], $aedestatsLocale["CHK"], $aedestatsLocale["ZIK"] ],
                datasets: [
                    {
                        data: [stats.dng.total, stats.chk.total, stats.zik.total],
                        backgroundColor: [
                            "#9F00D4",
                            "#D43500",
                            "#009FD4"
                        ],
                        hoverBackgroundColor: [
                            "#3F0084",
                            "#841300",
                            "#003F84"
                        ]
                    }]
            };
            
            return data;
        }
        
        function getDatasetForLineChart(data, label, hexColor) {
            
            var dataset = {
               
                label: label,
                data: data,
                backgroundColor: hexColor,
                borderColor: hexColor
                
            };
            
            return dataset;
        }
        
    }
    
})(angular);