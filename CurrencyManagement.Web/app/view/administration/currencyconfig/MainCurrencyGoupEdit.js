

Ext.define('CurrencyApp.view.administration.currencyconfig.MainCurrencyGoupEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.mainCurrencyGoupEdit',
    title: "ჯგუფური რედაქტირება",
    border: false,
    model: null,
    resizable: false,
    bodyPadding: 5,
    mainList: null,
    callbackFunc: null,
    bodyStyle: 'background: white',
    initComponent: function () {
        var me = this;

        if (Ext.isEmpty(me.model))
            me.model = Ext.create("CurrencyApp.model.ChannelCategoryModel");

        me.items = [{
            xtype: 'form',
            itemId: 'frmMainCurrencyGoupEdit',
            border: false,
            width: 500,
            layout: { type: 'vbox', align: 'stretch' },
            fieldDefaults: { labelAlign: 'right', labelWidth: 120 },
            items: [{
                xtype: 'appComboBox',
                itemId: 'cmdCategory',
                fieldLabel: 'კატეგორია',
                store: Ext.create('CurrencyApp.store.CategoryStore'),
                margin: '5 0 0 0',
                displayField: 'Category',
                valueField: 'CategoryId',
                allowBlank: false,
                queryMode: "remote",
                minChars: 1
            }, {
                xtype: 'datefield',
                itemId: 'dtmStartDate',
                allowBlank: false,
                fieldLabel: 'კურსის ამოქმედების თარიღი და დრო',
                labelWidth: 240,
                margin: '5 0 0 0',
                format: 'Y-m-d H:i',
                listeners: {
                    select: function (field, value, eOpts) {
                        Helpers.setDateOnToDay(field, value);
                    }
                }
            }]
        }];
        me.buttons = [{
            xtype: 'saveButton',
            itemId: 'btnOperationSave',
            mainPanel: me
        }, {
            xtype: 'closeButton',
            itemId: 'btnOperationClose',
            mainPanel: me,
            readOnlyMode: false
        }];
        me.callParent();

    },
    getData: function () {
        var me = this;

        me.model.set("CategoryId", Helpers.getComponent("cmdCategory", me).getValue()); //კატეგორია
        me.model.set("StartDate", Helpers.getComponent("dtmStartDate", me).getValue()); //კურსის ამოქმედების თარიღი და დრო

        return me.model;
    },
    validate: function () {
        var me = this;
        return Helpers.getComponent("frmMainCurrencyGoupEdit", me).getForm().isValid();
    }
});