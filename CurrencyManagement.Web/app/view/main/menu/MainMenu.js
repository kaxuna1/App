Ext.define('CurrencyApp.view.main.menu.MainMenu', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.mainMenu',
    menuItems: null,
    id: 'mainMenu',
    initComponent: function () {
        Ext.apply(this, {
            border: false,
            layout: { type: 'hbox', align: 'stretch' },
            items: ['->', {
                xtype: 'button',
                cls: 'main-menu-btn',
                text: localStorage.getItem('fullName'),
                reference: 'userFullnameBtn',
                iconCls: 'x-fa fa-user',
                menu: {
                    items: [{
                        text: 'გასვლა სისტემიდან',
                        itemId: 'logoutBnt',
                        iconCls: 'x-fa fa-power-off'
                    }]
                }
            }]
        });

        this.callParent();
    }
})