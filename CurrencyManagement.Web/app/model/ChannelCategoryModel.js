Ext.define('CurrencyApp.model.ChannelCategoryModel', {
    extend: 'CurrencyApp.model.BaseModel',
    fields: [
        { name: 'ChannelCategoryId', defaultValue: null },
        { name: 'ChannelTypeId', defaultValue: null },
        { name: 'ChannelTypeName', defaultValue: null },
        { name: 'ChannelId', defaultValue: null },
        { name: 'ChannelName', defaultValue: null },
        { name: 'ChannelRegionId', defaultValue: null },
        { name: 'FirstCurrencyId', defaultValue: null },
        { name: 'FirstCurrencyName', defaultValue: null },
        { name: 'SecondCurrencyId', defaultValue: null },
        { name: 'SecondCurrencyName', defaultValue: null },
        { name: 'CurrencyPair', defaultValue: null },
        { name: 'CategoryId', defaultValue: null },
        { name: 'CategoryName', defaultValue: null },
        { name: 'StartDate', defaultValue: null },
        { name: 'LastUserId', defaultValue: null },
        { name: 'LastUserName', defaultValue: null }
    ]
});