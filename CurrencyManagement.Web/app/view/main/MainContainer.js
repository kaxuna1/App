Ext.define('CurrencyApp.view.main.MainContainer', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mainContainer',
    layout: { type: 'vbox', align: 'stretch' },
    border: false,
    dockedItems: [{
        xtype: 'mainMenu',
        dock: 'top',
        border: false
    }],
    items: [{
        xtype: 'tabpanel',
        id: 'MainTabPanel',
        border: false,
        //activeTab: 1,
        flex: 1,
        items: [{
            xtype: 'channelsCategoriesList'
        }]
    }]
})