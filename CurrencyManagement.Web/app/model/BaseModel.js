Ext.define('CurrencyApp.model.BaseModel', {
    extend: 'Ext.data.Model',
    //idProperty: 'ID',
    fields: [
        { name: 'DateCreated', defaultValue: null },
        { name: 'DateDeleted', defaultValue: null },
        { name: 'DateUpdated', defaultValue: null },
        { name: 'IsSelected', defaultValue: null }
    ]
});

