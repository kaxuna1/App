

Ext.define('CurrencyApp.controller.BaseController', {
    extend: 'Ext.app.Controller',
    stores: [
       'BaseStore'
    ],
    models: [
        'BaseModel'
    ],
    
    init: function () {
        this.control({

        });
    }
});