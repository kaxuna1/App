//კატეგორიბი

Ext.define('CurrencyApp.store.CategoryStore', {
    extend: 'CurrencyApp.store.BaseStore',
    model: 'CurrencyApp.model.CategoryModel',
    proxy: {
        url: Helpers.serviceUrl + 'Config/CategoryList'
    }
});