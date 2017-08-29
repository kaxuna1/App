//კურსთა წყვილი

Ext.define('CurrencyApp.store.CurrencyPairStore', {
    extend: 'CurrencyApp.store.BaseStore',
    model: 'CurrencyApp.model.CurrencyPairModel',
    proxy: {
        // url: Helpers.serviceUrl + 'Cash/CashOperationList'
    }
});