//კურსების ტაბლო

Ext.define('CurrencyApp.store.CoursesTableStore', {
    extend: 'CurrencyApp.store.BaseStore',
    model: 'CurrencyApp.model.CoursesTableModel',
    proxy: {
        url: Helpers.serviceUrl + 'Core/FXRateList'
    }
});