Ext.define('CurrencyApp.view.login.LoginView', {
    extend: 'Ext.window.Window',
    xtype: 'loginView',
    requires: [
        'Ext.layout.container.VBox',
        'CurrencyApp.view.login.LoginController'
    ],
    controller: 'loginController',
    cls: 'auth-locked-window',
    closable: false,
    resizable: false,
    autoShow: true,
    titleAlign: 'center',
    maximized: true,
    modal: true,
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    items: [
       {
           xtype: 'form',
           border: false,
           defaultButton: 'loginButton',
           bodyPadding: '20 20',
           cls: 'loginForm',
           header: false,
           width: 415,
           layout: {
               type: 'vbox',
               align: 'stretch'
           },

           defaults: {
               margin: '5 0'
           },

           items: [
               {
                   xtype: 'textfield',
                   cls: 'logininput',
                   name: 'UserName',
                   height: 55,
                   hideLabel: true,
                   allowBlank: false,
                   blankText: 'შეიყვანეთ მომხმარებლის სახელი!',
                   emptyText: 'მომხმარებელი',
                   triggers: {
                       glyphed: {
                           cls: 'username'
                       }
                   }
               },
               {
                   xtype: 'textfield',
                   cls: 'logininput',
                   height: 55,
                   hideLabel: true,
                   emptyText: 'პაროლი',
                   inputType: 'password',
                   name: 'Password',
                   blankText: 'შეიყვანეთ პაროლი!',
                   allowBlank: false,
                   triggers: {
                       glyphed: {
                           cls: 'password'
                       }
                   }
               },
                {
                    xtype: 'displayfield',
                    margin: '15 0 0 0',
                    value: '',
                    fieldStyle: 'color: red;font-family:BGP;align: right',
                    name: 'loginErrorDisplay'
                },
               {
                   xtype: 'button',
                   reference: 'loginButton',
                   scale: 'large',
                   cls: 'loginbtn',
                   iconAlign: 'right',
                   iconCls: 'x-fa fa-angle-right',
                   text: 'შესვლა',
                   formBind: true,
                   listeners: {
                       click: 'onLoginButton'
                   }
               }]
       }
    ],
    initComponent: function () {
        this.addCls('auth-dialog');
        //this.addCls('user-login-register-container');
        this.callParent(arguments);
    }
});
