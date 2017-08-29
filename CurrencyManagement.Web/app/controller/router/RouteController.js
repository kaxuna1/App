Ext.define('CurrencyApp.controller.router.RouteController', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'viewport',
            selector: 'viewport'
        }
    ],
    routes: {
        'login': 'onLogin',
        'currency': 'onCurrency',
        '404': 'onRouteChange'
    },

    listen: {
        controller: {
            '#': {
                unmatchedroute: 'onUnmatchedRoute'
            }
        }
    },
    onUnmatchedRoute: function () {
        // this.onViewChange('NotFound', '404');
    },
    onCurrency: function () {
        this.checkToken();
    },
    onLogin: function () {
        localStorage.removeItem('token');
        this.checkToken();
    },

    init: function () {

        this.control({

        });
    },
    onViewChange: function (view, redirect) {
        var main = this.getViewport();
        main.removeAll();
        main.add(Ext.widget(view));

        this.redirectTo(redirect);
    },
    checkToken: function () {
        var me = this;
        me.onViewChange('mainView', 'currency');
        var me = this;
        var token = localStorage.getItem('token');
        if (token) {
            Ext.Ajax.request({
                url: Helpers.serviceUrl + 'Security/CheckToken',
                method: 'POST',
                async: false,
                headers: {
                    "Authorization": token
                },
                success: function (result) {
                    var resp = Ext.decode(result.responseText);
                    if (resp.success)
                        me.onViewChange('mainView', 'currency');
                    else
                        me.onViewChange('loginView', 'login');
                },
                failure: function () {
                    me.onViewChange('loginView', 'login');
                }
            });

        } else {
            me.onViewChange('loginView', 'login');
        }
    }
});