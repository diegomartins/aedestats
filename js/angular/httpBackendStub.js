(function(angular, document) {
    
    if(!document.URL.match(/\?nobackend$/)) {
        return;
    }
    
    console.log("[WARNING] Working with mocked backend.");
    initializeMockedBackend();
    
    function initializeMockedBackend() {
        
        angular.module("ServicesApp")
               .config(mockBackend)
               .run(defineMockedReturns);
               
        mockBackend.$inject = ["$provide"];
        
        function mockBackend($provide) {
            $provide.decorator("$httpBackend", angular.mock.e2e.$httpBackendDecorator);
        }
        
       
        defineMockedReturns.$inject = ["$httpBackend"];
        
        function defineMockedReturns($httpBackend) {
            
            var areas = [{id: 1, name: "Catete"}, {id: 2, name: "Flamengo"}];
            
            var globalStats = {
                town: "Rio de Janeiro",
                population: 6308000,
                 dng: {
                    total: 19203,
                    casesPerWeek: generateRandomCasesPerWeekArray(),
                    infRate: 0.06
                },
                chk: {
                    total: 14762,
                    casesPerWeek: generateRandomCasesPerWeekArray(),
                    infRate: 0.04
                },
                zik: {
                    total: 7285,
                    casesPerWeek: generateRandomCasesPerWeekArray(),
                    infRate: 0.019
                }
                
            };
            
            var stats = [
               
                {
                    id: 1,
                    name: "Catete",
                    population: 170000,
                    zone: {
                        name: "Zona 1"
                    },
                    region: {
                        name : "Região 1"
                    },
                    dng: {
                        total: 10,
                        casesPerWeek: generateRandomCasesPerWeekArray(),
                        infRate: 0.02
                    },
                    chk: {
                        total: 2,
                        casesPerWeek: generateRandomCasesPerWeekArray(),
                        infRate: 0.002
                    },
                    zik: {
                        total: 7,
                        casesPerWeek: generateRandomCasesPerWeekArray(),
                        infRate: 0.014
                    }
                },
                
                 {
                    id: 2,
                    name: "Flamengo",
                    population: 200000,
                    zone: {
                        name: "Zona 2"
                    },
                    region: {
                        name : "Região 2"
                    },
                    dng: {
                        total: 9,
                        casesPerWeek: generateRandomCasesPerWeekArray(),
                        infRate: 0.017
                    },
                    chk: {
                        total: 1,
                        casesPerWeek: generateRandomCasesPerWeekArray(),
                        infRate: 0.001
                    },
                    zik: {
                        total: 5,
                        casesPerWeek: generateRandomCasesPerWeekArray(),
                        infRate: 0.011
                    }
                }
                
            ];
            
            
            $httpBackend.whenGET('/rest/areas').respond(function(method, url, data, headers) {
                return [200, areas, {/*headers*/}];
            });
            
            $httpBackend.whenPOST('/rest/stats').respond(function(method, url, data, headers) {
                
                var dataObject = angular.fromJson(data);
                
                var returnedStats = stats.filter(function(stat) {
                    
                    if(stat.id === dataObject.id) {
                        return stat;
                    }    
                });
                
                return [200, returnedStats[0], {/*headers*/}];
            });
        
                        
            $httpBackend.whenGET('/rest/globalstats').respond(function(method, url, data, headers) {
                
                return [200, globalStats, {/*headers*/}];
            });
            
            function generateRandomCasesPerWeekArray() {
                
                const weeksPerYear = 52;
                
                var casesPerWeek = [];
                
                for(var i = 0; i < weeksPerYear; i ++) {
                    casesPerWeek[i] = Math.floor(Math.random() * 100);
                }
                
                return casesPerWeek;
            }
        }
    }
})(angular, document);