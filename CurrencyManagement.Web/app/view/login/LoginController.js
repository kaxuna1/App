Ext.define('CurrencyApp.view.login.LoginController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.loginController',

    onLoginButton: function(el) {
        var me = this;
        var form = el.up('form');
       
        if (form.isValid()) {
            form.submit({
                url: Helpers.serviceUrl + 'Security/Authorization',
                success: function (a, r) {
                    var resp = JSON.parse(r.response.responseText);

                    localStorage.removeItem('token');
                    localStorage.setItem('token', resp.Result.Token);
                    localStorage.setItem('fullName', resp.Result.FullName);
                    localStorage.setItem('userName', resp.Result.UserName);

                    me.redirectTo('currency');
                    
                },
                failure: function (a, r) {
                    var resp = JSON.parse(r.response.responseText);
                    var error = form.getForm().findField('loginErrorDisplay');
                    error.setVisible(true);
                    error.setValue(resp.Description);
                }
            });
        }
    }

});