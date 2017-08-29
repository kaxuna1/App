Ext.define('CurrencyApp.store.BaseStore', {
    extend: 'Ext.data.Store',
    model: 'CurrencyApp.model.BaseModel',
    request: null,
    remoteFilter: false,
    autoLoad: false,
    pageSize: 25,
    proxy: {
        startParam: 'Start',
        limitParam: 'Limit',
        timeout: 90000,
        type: 'ajax',
        actionMethods: { read: 'POST' },
        reader: {
            rootProperty: 'Result.ResultList',
            totalProperty: 'Result.TotalCount',
            type: 'json'
        },
        listeners: {
            exception: function (proxy, response) {
                try {
                    var resp = JSON.parse(response.responseText);
                    if (response.status === 401) {
                        Ext.Msg.show({
                            title: 'შეცდომა',
                            msg: resp.Description,
                            width: 300,
                            closable: false,
                            buttons: Ext.Msg.OK,
                            buttonText: {
                                ok: 'ავტორიზაცია'
                            },
                            multiline: false,
                            fn: function(buttonValue) {
                                if (buttonValue === 'ok') {
                                    window.location.href = '/#login';
                                }
                            },
                            scope: this,
                            icon: Ext.Msg.QUESTION
                        });
                    } else {
                        if (!Ext.isEmpty(resp.Description))
                            Helpers.showMessage(resp.Description, Enums.MessageBoxType.Error);
                    }
                } catch (e) {
                    var action = proxy.url.split('/');
                    Helpers.showMessage("შეცდომა: " + action[action.length - 2] + "/" + action[action.length - 1], Enums.MessageBoxType.Error);
                }
            }
        }
    },
    listeners: {
        beforeload: function (store) {
            store.getProxy().headers = { "Authorization": localStorage.getItem('token') }
        }
    }
});