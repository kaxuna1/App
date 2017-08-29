//არხის ტიპი

Ext.define('CurrencyApp.store.ChannelTypeStore', {
    extend: 'CurrencyApp.store.BaseStore',
    model: 'CurrencyApp.model.ChannelTypeModel',
    proxy: {
        url: Helpers.serviceUrl + 'Config/ChannelTypeList'
    }
});