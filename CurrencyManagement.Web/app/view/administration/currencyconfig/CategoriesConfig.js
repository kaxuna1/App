Ext.define('CurrencyApp.view.administration.currencyconfig.CategoriesConfig', {
    extend: 'Ext.form.Panel',
    alias: 'widget.categoriesConfig',
    layout: { type: 'vbox' },
    initComponent: function () {
        var me = this;

        me.bodyPadding = 5;

        me.items = [{
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            items: [{
                xtype: 'textfield',
                itemId: 'txtCategory',
                allowBlank: false,
                width: 410,
                emptyText: 'კატეგორია'
            }, {
                xtype: 'addbutton',
                itemId: 'btnAddCategory',
                margin: '0 0 0 5'
            }]
        }, {
            xtype: 'appGrid',
            itemId: 'grdCategory',
            margin: '5 0 0 0',
            store: Ext.create('CurrencyApp.store.CategoryStore'),
            width: 500,
            height: 200,
            columns: [
                { header: "კატეგორია", dataIndex: "Category", flex: 1 },
                {
                    xtype: 'actioncolumn',
                    width: 24,
                    icon: '/resources/icons/16x16/delete.png',
                    tooltip: 'წაშლა',
                    scope: this,
                    handler: function (grid, rowIndex) {
                        var record = grid.getStore().getAt(rowIndex);
                        this.fireEvent('deleteCategory', me, record, rowIndex);
                    }
                }
            ]
        }];

        me.callParent();

    }
});