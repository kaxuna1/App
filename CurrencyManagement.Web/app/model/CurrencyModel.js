Ext.define('CurrencyApp.model.CurrencyModel', {
    extend: 'CurrencyApp.model.BaseModel',
    fields: [
        { name: 'CurrencyId', defaultValue: null },
        { name: 'Currency', defaultValue: null },
        { name: 'Code', defaultValue: null }
    ]
});