Ext.define('CurrencyApp.view.notfound.404', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.NotFound',
    initComponent: function () {
        Ext.apply(this, {
            border: false,
            cls: 'notfound',
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'center'
            },
            items: [
                 {
                     xtype: 'container',
                     //width: 400,
                     cls: 'error-page-inner-container',
                     layout: {
                         type: 'vbox',
                         align: 'center',
                         pack: 'center'
                     },
                     items: [
                         {
                             xtype: 'label',
                             cls: 'error-page-top-text',
                             text: '404'
                         },
                         {
                             xtype: 'label',
                             cls: 'error-page-desc',
                             html: '<div>გვერდი ვერ მოიძებნა!</div><div>დაბრუნება <a href="#cashdesk"> მთავარ გვერდზე </a></div>'
                         },
                         {
                             xtype: 'tbspacer',
                             flex: 1
                         }
                     ]
                 }
            ]
        });

        this.callParent();
    }
});