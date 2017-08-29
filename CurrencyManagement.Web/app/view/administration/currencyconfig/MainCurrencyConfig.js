

Ext.define('CurrencyApp.view.administration.currencyconfig.MainCurrencyConfig', {
    extend: 'Ext.window.Window',
    alias: 'widget.mainCurrencyConfig',
    border: false,
    model: null,
    readOnly: false,
    manipulation: Enums.Manipulation.Add,
    resizable: false,
    bodyPadding: 5,
    mainList: null,
    channelCategoryId: null,
    callbackFunc: null,
    bodyStyle: 'background: white',
    initComponent: function () {
        var me = this;

        if (Ext.isEmpty(me.model))
            me.model = Ext.create("CurrencyApp.model.ChannelCategoryModel");


        if (me.manipulation == Enums.Manipulation.Add)
            me.title = "დამატება";
        if (me.manipulation == Enums.Manipulation.Edit)
            me.title = "რედაქტირება";

        me.items = [{
            xtype: 'form',
            itemId: 'frmMainCurrencyConfig',
            border: false,
            width: 500,
            layout: { type: 'vbox', align: 'stretch' },
            fieldDefaults: { labelAlign: 'right', labelWidth: 120 },
            items: [{
                xtype: 'appComboBox',
                itemId: 'cmdChannelType',
                fieldLabel: 'არხის ტიპი',
                store: Ext.create('CurrencyApp.store.ChannelTypeStore'),
                allowBlank: false,
                displayField: 'Name',
                valueField: 'ChannelTypeId',
                queryMode: "remote",
                minChars: 1
            }, {
                xtype: 'appComboBox',
                itemId: 'cmdChannelName',
                fieldLabel: 'არხის დასახელება',
                store: Ext.create('CurrencyApp.store.ChannelStore'),
                allowBlank: false,
                displayField: 'Name',
                valueField: 'Id',
                queryMode: "remote",
                minChars: 1
            }, {
                xtype: 'container',
                layout: { type: 'hbox', align: 'stretch' },
                items: [{
                    xtype: 'appComboBox',
                    itemId: 'cmdCurrency1',
                    fieldLabel: 'ვალუტის წყვილი',
                    store: Ext.create('CurrencyApp.store.CurrencyStore'),
                    displayField: 'Code',
                    width: 200,
                    allowBlank: false,
                    valueField: 'CurrencyId',
                    queryMode: "remote",
                    minChars: 1
                }, {
                    xtype: 'appComboBox',
                    itemId: 'cmdCurrency2',
                    store: Ext.create('CurrencyApp.store.CurrencyStore'),
                    displayField: 'Code',
                    width: 80,
                    allowBlank: false,
                    margin: '0 0 0 5',
                    valueField: 'CurrencyId',
                    queryMode: "remote",
                    minChars: 1
                }]
            }, {
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

        if (me.readOnly)
            me.setReadOnly(me.readOnly);
        if (me.channelCategoryId != null)
            me.loadData(me.channelCategoryId);

    },
    loadData: function (operationId) {
        var me = this;
        Helpers.ajaxRequest('Core/ChannelCategoryGet', { ChannelCategoryId: me.channelCategoryId }, Enums.ActionMethod.POST, Enums.RequestType.Default, me, function (data) {
            var model = Helpers.transform("CurrencyApp.model.ChannelCategoryModel", data);
            me.setData(model);
        });
    },
    getData: function () {
        var me = this;

        me.model.set("ChannelTypeId", Helpers.getComponent("cmdChannelType", me).getValue()); //არხის ტიპი

        var cmdChannelName = Helpers.getComponent("cmdChannelName", me); //არხის დასახელება
        var cmdChannelNameSelected = cmdChannelName.getSelectedModel();
        me.model.set("ChannelId", cmdChannelNameSelected.get("Id"));
        me.model.set("ChannelName", cmdChannelNameSelected.get("Name"));
        me.model.set("ChannelRegionId", cmdChannelNameSelected.get("RegionId"));

        me.model.set("FirstCurrencyId", Helpers.getComponent("cmdCurrency1", me).getValue()); //ვალუტის წყვილი 1
        me.model.set("SecondCurrencyId", Helpers.getComponent("cmdCurrency2", me).getValue()); //ვალუტის წყვილი 2
        me.model.set("CategoryId", Helpers.getComponent("cmdCategory", me).getValue()); //კატეგორია
        me.model.set("StartDate", Helpers.getComponent("dtmStartDate", me).getValue()); //კურსის ამოქმედების თარიღი და დრო

        return me.model;
    },
    setData: function (model) {
        var me = this;
        me.model = model;
        var cmdChannelType = Helpers.getComponent("cmdChannelType", me); //არხის ტიპი
        Helpers.setStoreRecord(cmdChannelType, Ext.create("CurrencyApp.model.ChannelTypeModel", {
            ChannelTypeId: me.model.get("ChannelTypeId"),
            Name: me.model.get("ChannelTypeName")
        }), true);
        cmdChannelType.fireEvent("select", cmdChannelType);

        var cmdChannelName = Helpers.getComponent("cmdChannelName", me); //არხის დასახელება
        Helpers.setStoreRecord(cmdChannelName, Ext.create("CurrencyApp.model.ChannelModel", {
            Id: me.model.get("ChannelId"),
            Name: me.model.get("ChannelName"),
            RegionId: me.model.get("ChannelRegionId")
        }), true);

        var cmdCurrency1 = Helpers.getComponent("cmdCurrency1", me); //ვალუტის წყვილი 1
        Helpers.setStoreRecord(cmdCurrency1, Ext.create("CurrencyApp.model.CurrencyModel", {
            CurrencyId: me.model.get("FirstCurrencyId"),
            Code: me.model.get("FirstCurrencyName"),
        }), true);

        var cmdCurrency2 = Helpers.getComponent("cmdCurrency2", me); //ვალუტის წყვილი 2
        Helpers.setStoreRecord(cmdCurrency2, Ext.create("CurrencyApp.model.CurrencyModel", {
            CurrencyId: me.model.get("SecondCurrencyId"),
            Code: me.model.get("SecondCurrencyName"),
        }), true);

        var cmdCategory = Helpers.getComponent("cmdCategory", me); //კატეგორია
        Helpers.setStoreRecord(cmdCategory, Ext.create("CurrencyApp.model.CategoryModel", {
            CategoryId: me.model.get("CategoryId"),
            Category: me.model.get("CategoryName"),
        }), true);

        Helpers.getComponent("dtmStartDate", me).setValue(Ext.util.Format.date(me.model.get("StartDate"), 'Y-m-d H:i')); //კურსის ამოქმედების თარიღი და დრო

    },
    validate: function () {
        var me = this;
        return Helpers.getComponent("frmMainCurrencyConfig", me).getForm().isValid();
    },
    setReadOnly: function (isReadOnly) {
        Helpers.setReadOnlyForAll(this, isReadOnly);
    }
});