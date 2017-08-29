//ვალუტა

Ext.define('CurrencyApp.store.CurrencyStore', {
    extend: 'CurrencyApp.store.BaseStore',
    model: 'CurrencyApp.model.CurrencyModel',
    proxy: {
        url: Helpers.serviceUrl + 'Core/CurrencyList'
    }
});