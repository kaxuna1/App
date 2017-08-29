//არხების მართვა

Ext.define('CurrencyApp.store.ChannelStore', {
    extend: 'CurrencyApp.store.BaseStore',
    model: 'CurrencyApp.model.ChannelModel',
    proxy: {
        url: Helpers.serviceUrl + 'Core/ChannelList'
    }
});