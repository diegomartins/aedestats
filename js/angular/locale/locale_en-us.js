var AedestatsLocales = AedestatsLocales || {};

AedestatsLocales.locale_enus = (function() {
    
    var exports = {
        
        AEDESTATS: "Aedestats",
        AEDESTATS_DESCRIPTION: "Statistics on diseases caused by Aedes aegypti",
        POPULATION: "Population",
        AREA: "Area",
        CITY: "City",
        ZONE: "Zone",
        REGION: "Region",
        NEIGHBORHOOD: "Neighborhood",
        CHK: "CHK",
        DNG: "DNG",
        ZIK: "ZIK",
        CASES: "Cases",
        INF_RATE: "Infection rate",
        WEEKS : "Weeks",
        VIRUS : "Virus",
        
        SELECT_ONE: "Select one option",
        PROPORTION: "Proportion",
        
        getLocale: getLocale
        
    };
    
    function getLocale() {
        return "en_us";    
    }
    
    return exports;
    
})();