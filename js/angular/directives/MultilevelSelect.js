//TODO: Refactor this directive in order to allow usage with more than 3 levels, dynamically.
(function(angular) {
    
    angular.module("TaglibApp")
           .directive("multilevelSelect", MultilevelSelect);
    
    
    MultilevelSelect.$inject = ["$timeout"];
    
    function MultilevelSelect($timeout) {
    
        var directive = {
        
            restrict: "E",
            replace: true,
            scope: {
              items: "<",
              onChange: "&",
              ngModel: "="
            },
            template: '<select class="multilevelSelect" data-ng-change="onChange()()">' +
                        '<option data-ng-repeat="item in items" class="multilevelSelect_level{{getLevel(item)}}" data-ng-value="item">{{item[itemLabel]}}</option>' +
                      '</select>',
            link: link
        };
        
        return directive;
        
        function link(scope, element, attributes, ngModel) {
            
            var hierarchyArray     = (attributes.hierarchy || "").split(",").map(function(v) { return v.trim(); });
            var hierarchyAttribute = attributes.hierarchyAttribute || "level";
            
            scope.itemLabel = attributes.itemLabel          || "label";
            scope.getLevel  = getLevel;
            
            function getLevel(item) {
                
                if(!item) {
                    return 0;
                }
                
                for(var i = 0; i < hierarchyArray.length; i ++) {
                    
                    if(item[hierarchyAttribute] === hierarchyArray[i]) {
                        return i;
                    }
                }
                
                return hierarchyArray.length + 1;
            }
       
        }

    
    }
           
    
    
    
})(angular);