Ext.define('CurrencyApp.view.administration.currencyconfig.CurrencyConfigMainView', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.currencyConfigMainView',
    title: 'კურსების მართვა',
    closable: true,
    initComponent: function () {
        Ext.apply(this, {
            border: false,
            items: [{
                xtype: 'categoriesConfig',
                title: 'კატეგორიების მართვა'
            }]
        });

        this.callParent();
    }
})