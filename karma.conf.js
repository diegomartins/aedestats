module.exports = function(config) {
  config.set({
    hostname: process.env.IP,
    port: process.env.PORT,
    frameworks: ['jasmine'],
    files: [
        'node_modules/angular/angular.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'js/angular/**/**/*spec.js',
        
        'js/angular/modules/ServicesApp.js',
        'js/angular/httpBackendStub.js',
        
        'js/angular/locale/locale_pt-br.js',
        'js/angular/locale/locale_en-us.js',
        'js/angular/modules/LocaleApp.js',
        'js/angular/providers/LocaleProvider.js',
                
        
        'js/angular/modules/AedestatsApp.js',
        
        'js/angular/services/AedestatsService.js',
        'js/angular/controllers/AedestatsApp/AedestatsDetailController.js'
    ]


  });
};