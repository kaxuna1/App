//რეგიონი

Ext.define('CurrencyApp.store.RegionStore', {
    extend: 'CurrencyApp.store.BaseStore',
    model: 'CurrencyApp.model.RegionModel',
    proxy: {
        url: Helpers.serviceUrl + 'Core/RegionList'
    }
});