//ქვე კატეგორიბი

Ext.define('CurrencyApp.store.SubCategoryStore', {
    extend: 'CurrencyApp.store.BaseStore',
    model: 'CurrencyApp.model.CategoryModel',
    proxy: {
        // url: Helpers.serviceUrl + 'Cash/CashOperationList'
    }
});