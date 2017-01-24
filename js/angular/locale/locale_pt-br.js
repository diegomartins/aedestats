var AedestatsLocales = AedestatsLocales || {};

AedestatsLocales.locale_ptbr = (function() {
    
    var exports = {
        
        POPULATION: "População",
        ZONE: "Zona",
        REGION: "Região",
        NEIGHBORHOOD: "Bairro",
        CHK: "CHK",
        DNG: "DNG",
        ZIK: "ZIK",
        CASES: "Casos",
        INF_RATE: "Taxa de infecção",
        WEEKS : "Semanas",
        VIRUS : "Vírus",
        SELECT_ONE: "Selecione uma opção",
        
        getLocale: getLocale
    }
    
    function getLocale() {
        return "pt_br";    
    }
    
    return exports;
    
})();