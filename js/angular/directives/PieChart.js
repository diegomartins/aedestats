(function(angular, Chart) {
    
    angular.module("TaglibApp")
        .directive("pieChart", PieChart);
    
    PieChart.$inject = [];
    
    function PieChart() {
        
        var directive = {
            
            //TODO: Remove "style" attributes
            
            restrict: "E",
            replace: true,
            template: '<span class="pieChart">' +
                        '<canvas class="canvas" id="{{chartId}}"></canvas>' +
                        '<div class="details">' +
                            '<div class="detail" data-ng-repeat="slice in slices">' +
                                '<p style="border-bottom-color: {{slice.color}}; border-bottom-style: solid; border-bottom-width: 2px;" class="lbl">' +
                                     '{{slice.label}}' +
                                '</p>' +
                                '<span class="detailData">' +
                                    '<span class="lbl">{{::valueLabel}}</span>' +
                                    '<span class="val">{{slice.value}}</span>' +
                                    '<br/>' +
                                    '<span class="lbl">{{::percentageLabel}}</span>' +
                                    '<span class="val">{{slice.percentage}} %</span>' +
                                '</span>' +
                            '</div>' +
                        '</div>' +
                     '</span>',
            scope: {
                chartData : "<"
            },
            link: link
        }
        
        return directive;
        
        
        function link(scope, element, attributes) {
            
            var width  = attributes.width  || 1000;
            var height = attributes.height || 250;

            scope.chartId         = attributes.id;
            scope.valueLabel      = attributes.valueLabel || "Value";
            scope.percentageLabel = attributes.percentageLabel || "Percentage";
            
            
            var chartConfig = {
                type: 'pie',
                data: scope.chartData,
                options:  { 
                    maintainAspectRatio: false, 
                    responsive: false,
                    legend: {
                        display: false
                    }
                }
            };
            
            var cvs = element[0].children[0];
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
                
                var total = chartConfig.data.datasets[0].data.reduce(function(a, b) { return a + b; }, 0);
                var slices = [];
                
                for(var i = 0; i < chartConfig.data.labels.length; i ++) {
                    
                    slices[i] = {
                        color: chartConfig.data.datasets[0].backgroundColor[i],
                        label: chartConfig.data.labels[i],
                        value: chartConfig.data.datasets[0].data[i],
                        percentage: (100 * chartConfig.data.datasets[0].data[i]/total).toFixed(2)
                    };    
                    
                }
                
                scope.slices = slices;
                
                var chart = new Chart(ctx, chartConfig);
            });
            
            
            
        }
    }
    
})(angular, Chart);