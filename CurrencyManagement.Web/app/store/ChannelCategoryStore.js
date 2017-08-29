//არხების კატეგორიბი

Ext.define('CurrencyApp.store.ChannelCategoryStore', {
    extend: 'CurrencyApp.store.BaseStore',
    model: 'CurrencyApp.model.ChannelCategoryModel',
    proxy: {
        url: Helpers.serviceUrl + 'Core/ChannelCategoryList'
    }
});