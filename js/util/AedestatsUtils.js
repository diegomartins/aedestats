var AedestatsUtils = (function() {
    
    var exports = {
        extendObject : extendObject
    };
    
    return exports;
    
    
    function extendObject(objectToExtend, data) {
            
        for(var key in data) {
            if(!Object.hasOwnProperty(key)) {
                objectToExtend[key] = data[key];    
            }
        }
    }
})();