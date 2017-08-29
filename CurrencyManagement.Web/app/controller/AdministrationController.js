Ext.define('CurrencyApp.controller.AdministrationController', {
    extend: 'Ext.app.Controller',
    stores: [
         'CategoryStore',
         'SubCategoryStore',
         'ChannelTypeStore',
         'CurrencyStore'
    ],
    models: [
         'CategoryModel',
         'ChannelTypeModel',
         'CurrencyModel',
    ],
    views:
    [
      'administration.currencyconfig.CurrencyConfigMainView',
      'administration.currencyconfig.CategoriesConfig',
      'administration.currencyconfig.MainCurrencyConfig',
      'administration.currencyconfig.MainCurrencyGoupEdit'
    ],
    init: function () {
        this.control({
            //====================== CategoriesConfig ============================
            'categoriesConfig': {
                afterrender: this.onCategoriesConfigAfterrender,
                deleteCategory: this.onDeleteCategory
            },
            'categoriesConfig [itemId="btnAddCategory"]': {
                click: this.onBtnAddCategoryClick
            },
            //====================== MainCurrencyConfig ==========================
            'mainCurrencyConfig [itemId="cmdChannelType"]': {
                select: this.onCmdChannelTypeSelect
            },
            'mainCurrencyConfig [itemId="btnOperationSave"]': {
                click: this.fnMainCurrencyConfigOperationSave
            },
            'mainCurrencyConfig [itemId="btnOperationClose"]': {
                click: this.fnMainCurrencyConfigOperationClose
            },
            //====================== MainCurrencyGoupEdit ========================
            'mainCurrencyGoupEdit [itemId="btnOperationSave"]': {
                click: this.fnMainCurrencyGoupEditOperationSave
            },
            'mainCurrencyGoupEdit [itemId="btnOperationClose"]': {
                click: this.fnMainCurrencyGoupEditOperationClose
            }
        });
    },
    //====================== CategoriesConfig ====================================
    onCategoriesConfigAfterrender: function (me) {
        Helpers.getComponent("grdCategory", me).store.load();
    },
    onBtnAddCategoryClick: function (cmp) {
        var cont = this;
        var me = cmp.up("categoriesConfig");
        var txtCategory = Helpers.getComponent("txtCategory", me);
        var grdCategory = Helpers.getComponent("grdCategory", me);
        if (!txtCategory.isValid()) return;
        Helpers.ajaxRequest('Config/CategorySave', {
            Category: txtCategory.getValue()
        }, Enums.ActionMethod.POST, Enums.RequestType.Default, me, function (result) {
            txtCategory.reset();
            grdCategory.store.load();
        });
    },
    onDeleteCategory: function (me, record, rowIndex) {
        Helpers.showMessage("ნამდვილად გსურთ ჩანაწერის წაშლა ?", Enums.MessageBoxType.Question, function () {
            record.data.DateDeleted = new Date;
            var grdCategory = Helpers.getComponent("grdCategory", me);
            Helpers.ajaxRequest('Config/CategorySave', record.data, Enums.ActionMethod.POST, Enums.RequestType.Default, me, function (result) {
                grdCategory.store.removeAt(rowIndex);
            });
        });
    },
    //====================== MainCurrencyConfig ==================================
    onCmdChannelTypeSelect: function (cmp) {
        var cont = this;
        var me = cmp.up("mainCurrencyConfig");
        var cmdChannelType = Helpers.getComponent("cmdChannelType", me);
        var cmdChannelName = Helpers.getComponent("cmdChannelName", me);
        cmdChannelName.setValue();
        Helpers.setBaseParam(cmdChannelName.store, "ChannelTypeId", cmdChannelType.getValue(), true);
    },
    fnMainCurrencyConfigOperationSave: function (cmp) {
        var cont = this;
        var me = cmp.mainPanel;

        if (!me.validate()) return;
        var model = me.getData();
        var objectForSave = Helpers.transform(model);

        Helpers.ajaxRequest('Core/ChannelCategorySave', objectForSave, Enums.ActionMethod.POST, Enums.RequestType.Saving, cmp.operationPanel, function (result) {
            if (!Ext.isEmpty(me.callbackFunc)) {
                me.callbackFunc();
            }
            me.close();
        });

    },
    fnMainCurrencyConfigOperationClose: function (cmp) {
        cmp.mainPanel.close();
    },
    //====================== MainCurrencyGoupEdit ================================
    fnMainCurrencyGoupEditOperationSave: function (cmp) {
        var cont = this;
        var me = cmp.mainPanel;

        if (!me.validate()) return;
        var model = me.getData();
        var objectForSave = Helpers.transform(model);

        Helpers.ajaxRequest('Core/ChannelCategoryGoupEdit', {
            row: objectForSave,
            request: me.mainList.getStore().proxy.extraParams
        }, Enums.ActionMethod.POST, Enums.RequestType.Saving, cmp.operationPanel, function (result) {
            if (!Ext.isEmpty(me.callbackFunc)) {
                me.callbackFunc();
            }
            me.close();
        });

    },
    fnMainCurrencyGoupEditOperationClose: function (cmp) {
        cmp.mainPanel.close();
    }
});