(function(angular, Chart, AedestatsUtils) {
    
    angular.module("TaglibApp")
        .directive("lineChart", LineChart);
    
    LineChart.$inject = [];
    
    function LineChart() {
        
        var directive = {
            
            restrict: "E",
            replace: true,
            template: '<canvas id="{{chartId}}"></canvas>',
            scope: {
                chartData : "<"
            },
            link: link
        }
        
        const defaultDatasetConfiguration = {
            fill: false,
            lineTension: 0.1,
            pointBorderWidth: 1,
            pointRadius: 2,
            spanGaps: false
        };
        
        return directive;
        
        
        function link(scope, element, attributes) {
            
            var width  = attributes.width  || 1000;
            var height = attributes.height || 250;

            scope.chartId = attributes.id;
            
            var chartConfig = {
                type: 'line',
                data: scope.chartData,
                options:  { 
                    maintainAspectRatio: false, 
                    responsive: false
                }
            };
            
            var cvs = element[0];
            var ctx = cvs.getContext('2d');
            
            element.css({
                'width': width,
                'height': height
            });
        
            scope.$watch("chartData", function(newData, oldData) {

                if(!newData) {
                    return;
                }
                
                chartConfig.data = newData;
                
                addDefaultOptionsToDatasets(chartConfig.data.datasets);
               
                var chart = new Chart(ctx, chartConfig);
            });
            
            
            
        }
        
        function addDefaultOptionsToDatasets(datasets) {
            
            for(var i = 0; i < datasets.length; i ++) {
                AedestatsUtils.extendObject(datasets[i], defaultDatasetConfiguration);
            }    
        }
        
       
    }
    
})(angular, Chart, AedestatsUtils);