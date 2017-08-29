Ext.define('CurrencyApp.view.main.taskbar.Taskbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.taskbar',
    menuItems: null,
    border: false,
    dock: 'bottom',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    flex: 1,   
    scrollable: {
        direction: 'horizontal',
        indicators: false
    }
})