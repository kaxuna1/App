Ext.define('CurrencyApp.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',
    fields: [{ name: 'text' }],
    root: {
        children: [/*{
            text: 'ადმინისტრირება',
            margin: '0 0 0 0',
            iconCls: 'x-fa fa-gear',
            view: 'currencyConfigMainView',
            id: 6,
            leaf: true
        }*/
            {
                title: 'Accordion Layout',
                width: 300,
                height: 300,
                defaults: {
                    // applied to each contained panel
                    bodyStyle: 'padding:15px'
                },
                layout: {
                    // layout-specific configs go here
                    type: 'accordion',
                    titleCollapse: false,
                    animate: true,
                    activeOnTop: true
                },
                items: [{
                    title: 'Panel 1',
                    html: 'Panel content!'
                }, {
                    title: 'Panel 2',
                    html: 'Panel content!'
                }, {
                    title: 'Panel 3',
                    html: 'Panel content!'
                }]
            }
        ]
    }
});


