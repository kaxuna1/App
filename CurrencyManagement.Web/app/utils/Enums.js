Ext.define('CurrencyApp.utils.Enums', {
    alternateClassName: ['Enums'],
    singleton: true,
    ActionMethod: {
        POST: "POST",
        GET: "GET"
    },
    AppType: {
        controller: 1,
        model: 2,
        store: 3,
        view: 4
    },
    RequestType: {
        Default: 1,
        Saving: 2,
        Deleting: 3,
        DefaultNoMessaging: 4
    },
    Manipulation: {
        Add: 1,
        Edit: 2,
        Delete: 3
    },
    MessageBoxType: {
        Info: 1,
        Success: 2,
        Error: 3,
        Warning: 4,
        Question: 5,
        Wait: 6
    }
});

