Ext.define('CurrencyApp.view.main.Main', {
    extend: 'Ext.panel.Panel',
    requires: [
        'CurrencyApp.view.main.MainController',
        'CurrencyApp.view.main.menu.MainMenu',
        'CurrencyApp.view.main.Navigation',
        'CurrencyApp.view.main.MainContainer',
        'CurrencyApp.view.main.taskbar.Taskbar'
    ],
    xtype: 'mainView',
    flex: 1,
    controller: 'mainController',
    listeners: { afterrender: 'onLoadMicro' },
    initComponent: function () {
        Ext.apply(this, {
            border: false,
            layout: 'border',
            items: [{
                region: 'west',
                reference: 'treelistContainer',
                layout: { type: 'vbox', align: 'stretch' },
                border: false,
                items: [{
                    xtype: 'navigation',
                    flex: 1
                }]
            }, {
                region: 'center',
                border: false,
                layout: { type: 'vbox', align: 'stretch' },
                items: [{
                    xtype: 'mainContainer',
                    id: 'mainContainer',
                    flex: 1
                }]
            }]
        });

        this.callParent();
    }
});
