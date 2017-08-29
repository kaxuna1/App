Ext.define('CurrencyApp.view.currency.ChannelsCategoriesList', {
    extend: 'Ext.Panel',
    alias: 'widget.channelsCategoriesList',
    title: 'მთავარი',
    layout: { type: 'vbox', align: 'stretch' },
    manipulation: Enums.Manipulation.Add,
    initComponent: function () {
        var me = this;

        var grdStore = Ext.create('CurrencyApp.store.ChannelCategoryStore', {
            pageSize: 25
        });

        me.bodyPadding = 5;

        me.items = [
            {
                
            }
        ];

        this.callParent();
    },
    getStore: function () {
        return Helpers.getComponent("grdChannelsCategoriesList", this).store;
    }
})