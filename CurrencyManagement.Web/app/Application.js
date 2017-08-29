
//Ext.Ajax.on('requestexception',
//        function (conn, response, options, eOpts) {
//            try {
//                var resp = JSON.parse(response.responseText);
//                if (response.status === 401) {
//                    Ext.Msg.show({
//                        title: 'შეცდომა',
//                        msg: resp.Description,
//                        width: 300,
//                        closable: false,
//                        buttons: Ext.Msg.OK,
//                        buttonText: {
//                            ok: 'ავტორიზაცია'
//                        },
//                        multiline: false,
//                        fn: function (buttonValue) {
//                            if (buttonValue === 'ok') {
//                                window.location.href = '/#login';
//                            }
//                        },
//                        scope: this,
//                        icon: Ext.Msg.QUESTION
//                    });
//                }
//            } catch (e) {
//                Ext.MessageBox.show({
//                    title: 'შეცდომა',
//                    msg: 'შეცდომა',
//                    icon: Ext.MessageBox.ERROR
//                });
//            } 
            
//        });

Ext.define('CurrencyApp.Application', {
    extend: 'Ext.app.Application',
    name: 'CurrencyApp',

    requires: ['CurrencyApp.utils.Helpers',
        'CurrencyApp.utils.MD5',
        'CurrencyApp.utils.AppWindowManager',
        'CurrencyApp.utils.Enums',
        'CurrencyApp.view.login.LoginView',
        'CurrencyApp.view.main.Main',
        'Ext.*'
    ],

    controllers: [
        'router.RouteController',
        'NavigationController',
        'BaseController',
        'SharedController',
        'CurrencyController',
        'AdministrationController'
    ],

    stores: [
        'NavigationTree'
    ],

    defaultToken: 'currency',

    launch: function () {
        if (!Ext.supports.LocalStorage) {
            Ext.widget('window', {
                modal: true,
                closable: false,
                resizable: false,
                title: 'შეტყობინება',
                html: Ext.String.format('<h3>{0}</h3>', 'პროგრამის გამართული მუშაობისთვის განაახლეთ ბრაუზერის ვერსია!')
            }).show();
            return;
        }
        if (Ext.browser.is.IE) {
            Ext.widget('window', {
                draggable: false,
                modal: true,
                autoShow: true,
                closable: false,
                resizable: false,
                title: 'შეტყობინება',
                html: Ext.String.format('<h3>{0}</h3>', 'პროგრამის გამართული მუშაობისთვის გამოიყენეთ Google Chrome!')
            });

            return;
        }
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});






