
Ext.define('CurrencyApp.controller.NavigationController', {
    extend: 'Ext.app.Controller',


    init: function () {

        this.control({
            '#adminPnlBtn': {
                click: this.onAdminPnlBtnClick
            },
            '#logoutBnt': {
                click: this.onLogoutBtnClick
            }
        });
    },
    onLogoutBtnClick: function (el) {
        var me = this;
        Ext.Ajax.request({
            url: Helpers.serviceUrl + 'Security/LogOut',
            method: 'POST',
            async: false,
            headers: {
                "Authorization": localStorage.getItem('token')
            },
            success: function (result) {
                localStorage.removeItem('token');
                me.redirectTo('login');
            },
            failure: function (result) {
                localStorage.removeItem('token');
                me.redirectTo('login');
            }
        });
    },
    onAdminPnlBtnClick: function (el) {
        var administrationView = Ext.widget('administrationView', {
            closable: true,
            name: 'administrativePanel'
        });

        Helpers.addMainTabPanelItem(administrationView, true);
    }
});