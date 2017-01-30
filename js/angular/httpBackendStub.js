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
            
            var areas = [{id: 0, name: "Rio de Janeiro", type : "city"},
                         {id: 1, name: "Área Programática 5", type : "region", parentId : 0},
                         {id: 2, name: "Zona Sul", type : "zone", parentId : 1},
                         {id: 10, name: "Catete", type : "nbh", parentId : 2}, 
                         {id: 20, name: "Flamengo", type : "nbh", parentId : 2}];
            
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
                    id: 0,
                    name: "Rio de Janeiro",
                    population: 6308000,
                    infRate: 0.119,
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
                
                },
                {
                    id: 1,
                    name: "Área Programática 5",
                    population: 840542,
                    infRate: 0.31,
                    dng: {
                        total: 117260,
                        casesPerWeek: generateRandomCasesPerWeekArray(),
                        infRate: 0.16
                    },
                    chk: {
                        total: 99255,
                        casesPerWeek: generateRandomCasesPerWeekArray(),
                        infRate: 0.14
                    },
                    zik: {
                        total: 19233,
                        casesPerWeek: generateRandomCasesPerWeekArray(),
                        infRate: 0.11
                    }
                
                },
                {
                    id: 2,
                    name: "Zona Sul",
                    population: 450542,
                    infRate: 0.31,
                    dng: {
                        total: 52232,
                        casesPerWeek: generateRandomCasesPerWeekArray(),
                        infRate: 0.26
                    },
                    chk: {
                        total: 27928,
                        casesPerWeek: generateRandomCasesPerWeekArray(),
                        infRate: 0.21
                    },
                    zik: {
                        total: 9502,
                        casesPerWeek: generateRandomCasesPerWeekArray(),
                        infRate: 0.17
                    }
                
                },
                {
                    id: 10,
                    name: "Catete",
                    population: 170000,
                    infRate: 0.036,
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
                    id: 20,
                    name: "Flamengo",
                    population: 200000,
                    infRate: 0.291,
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
                
                var filter = angular.fromJson(data);
                
                if(!filter.area) {
                    return [500, "Invalid filter", {/*headers*/}];
                }
                
                var returnedStats = stats.filter(function(stat) {
                    
                    if(stat.id === filter.area.id)
                        return stat;
                });
                
                if(returnedStats.length === 0) {
                    return [500, "Invalid argument", {/*headers*/}];
                }
                
                return [200, returnedStats[0], {/*headers*/}];
            });
        
                        
            $httpBackend.whenGET('/rest/globalstats').respond(function(method, url, data, headers) {
                
                return [200, globalStats, {/*headers*/}];
            });
            
            function generateRandomCasesPerWeekArray() {
                
                const weeksPerYear = 52;
                
                var casesPerWeek = [];
                
                for(var i = 0; i < weeksPerYear; i ++) {
                    casesPerWeek[i] = Math.floor(Math.random() * 1100);
                }
                
                return casesPerWeek;
            }
        }
    }
})(angular, document);