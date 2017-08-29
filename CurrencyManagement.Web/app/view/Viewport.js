Ext.define('CurrencyApp.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        xtype: 'mainView'
    }]
});
