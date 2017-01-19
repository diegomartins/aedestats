var AedestatsLocales = AedestatsLocales || {};

AedestatsLocales.locale_enus = (function() {
    
    var exports = {
        
        POPULATION: "Population",
        ZONE: "Zone",
        REGION: "Region",
        NEIGHBORHOOD: "Neighborhood",
        CHK: "CHK",
        DNG: "DNG",
        ZIK: "ZIK",
        CASES: "Cases",
        INF_RATE: "Infection rate",
        
        SELECT_ONE: "Select one option",
        
        getLocale: getLocale
        
    }
    
    function getLocale() {
        return "en_us";    
    }
    
    return exports;
    
})();