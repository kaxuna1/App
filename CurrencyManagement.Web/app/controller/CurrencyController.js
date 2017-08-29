

Ext.define('CurrencyApp.controller.CurrencyController', {
    extend: 'Ext.app.Controller',
    stores: [
       'ChannelCategoryStore',
       'CoursesTableStore',
       'RegionStore',
       'CurrencyPairStore',
       'ChannelStore'
    ],
    models: [
      'ChannelCategoryModel',
      'CoursesTableModel',
      'RegionModel',
      'CurrencyPairModel',
      'ChannelModel'
    ],
    views: [
      'currency.ChannelsCategoriesList',
      'currency.CoursesTableList'
    ],
    init: function () {
        this.control({
            //==================== ChannelsCategoriesList ============================
            /*'channelsCategoriesList': {
                afterrender: this.onChannelsCategoriesListAfterrender
            },*/
            'channelsCategoriesList [itemId="cmbChannelType"]': {
                select: this.onCmbChannelTypeSelet
            },
            'channelsCategoriesList [itemId="btnSearchChannelsCategoriesList"]': {
                click: this.onBtnSearchChannelsCategoriesListClick
            },
            'channelsCategoriesList [itemId="btnClearSearchChannelsCategoriesList"]': {
                click: this.onBtnClearSearchChannelsCategoriesListClick
            },
            'channelsCategoriesList [itemId="grdChannelsCategoriesList"]': {
                rowdblclick: this.onBtnChannelsCategoriesListRowdblclick
            },
            '[name="channelsCategoriesListManipulation"]': {
                click: this.fnChannelsCategoriesListManipulation
            },
            //==================== CoursesTableList ==================================
            'coursesTableList': {
                afterrender: this.onCoursesTableListAfterrender
            },
            'coursesTableList [itemId="btnSearchCoursesTableList"]': {
                click: this.onBtnSearchCoursesTableListClick
            },
            'coursesTableList [itemId="btnClearSearchCoursesTableList"]': {
                click: this.onBtnClearSearchCoursesTableListClick
            },
            '[name="coursesTableListManipulation"]': {
                click: this.fnCoursesTableListManipulation
            },
        });
    },
    //============================ ChannelsCategoriesList ============================
    onChannelsCategoriesListAfterrender: function (me) {
        if (Ext.isEmpty(localStorage.getItem('token'))) return;
        var btnSearch = Helpers.getComponent("btnSearchChannelsCategoriesList", me);
        btnSearch.fireEvent("click", btnSearch);
    },
    onBtnSearchChannelsCategoriesListClick: function (cmp) {
        var cont = this;
        var me = cmp.up("channelsCategoriesList");
        var frm = Helpers.getComponent("frmSearchChannelsCategoriesList", me).getForm();
        if (!frm.isValid()) return;
        var filterValues = frm.getValues();
        
        var grdChannelsCategoriesListStore = Helpers.getComponent("grdChannelsCategoriesList", me).store;
        filterValues.ChannelRegionId = Helpers.getComponent("cmbRegion", me).disabled ? null : filterValues.ChannelRegionId;
        Helpers.setBaseParams(grdChannelsCategoriesListStore, filterValues, false);
         grdChannelsCategoriesListStore.loadPage(1);

    },
    onBtnClearSearchChannelsCategoriesListClick: function (cmp) {
        var cont = this;
        var me = cmp.up("channelsCategoriesList");
        Helpers.getComponent("frmSearchChannelsCategoriesList", me).getForm().reset();
        Helpers.getComponent("cmbRegion", me).setDisabled(true);
    },
    onCmbChannelTypeSelet: function (cmp) {
        var cont = this;
        var me = cmp.up("channelsCategoriesList");
        var cmbChannelType = Helpers.getComponent("cmbChannelType", me);
        var cmbRegion = Helpers.getComponent("cmbRegion", me);
        var cmbChannel = Helpers.getComponent("cmbChannel", me);
        Helpers.setBaseParam(cmbChannel.store, "ChannelTypeId", cmbChannelType.getValue(), true);
        if (cmbChannelType.getValue() == 1 || cmbChannelType.getValue() == 2) {
            cmbRegion.setDisabled(false);
        } else {
            cmbRegion.setValue();
            cmbRegion.setDisabled(true);
        }
    },
    onBtnChannelsCategoriesListRowdblclick: function (cmp) {
        var cont = this;
        var me = cmp.up("channelsCategoriesList");
        var btnEdit = Helpers.getComponent("btnChannelsCategoriesListManipulationEdit", me);
        btnEdit.fireEvent("click", btnEdit);
    },
    fnGetSelectedRequairdChannelsCategoriesList: function (me) {
        var grdList = Helpers.getComponent("grdChannelsCategoriesList", me).getSelected();
        if (Ext.isEmpty(grdList)) {
            Helpers.showMessage("მონიშნეთ ჩანაწერი", Enums.MessageBoxType.Warning);
            return null;
        }
        return grdList;
    },
    fnChannelsCategoriesListManipulation: function (cmp) {
        var cont = this;
        var me = cmp.up("channelsCategoriesList");
        var selected = null;
        if (cmp.manupulation == "Edit") {
            selected = cont.fnGetSelectedRequairdChannelsCategoriesList(me);
            if (Ext.isEmpty(selected)) return;
        }
        if (cmp.manupulation == "Add") {
            Ext.widget("mainCurrencyConfig", {
                callbackFunc: function () {
                    me.getStore().load();
                }
            }).show();
        }
        if (cmp.manupulation == "Edit") {
            Ext.widget("mainCurrencyConfig", {
                callbackFunc: function () {
                    me.getStore().load();
                },
                manipulation: Enums.Manipulation.Edit,
                channelCategoryId: selected.get("ChannelCategoryId"),
            }).show();
        }
        if (cmp.manupulation == "GroupEdit") {
            Ext.widget("mainCurrencyGoupEdit", {
                callbackFunc: function () {
                    me.getStore().load();
                },
                mainList: me
            }).show();
        }
        if (cmp.manupulation == "Export") {
            var grdList = Helpers.getComponent("grdChannelsCategoriesList", me);
            Helpers.ajaxRequest('Core/ChannelCategoryListExport', grdList.store.proxy.extraParams, Enums.ActionMethod.POST, Enums.RequestType.Default, me, function (result) {
                Helpers.downloadFile(result, "არხების კატეგორიები", "xlsx");
            });
        }
    },
    //============================ CoursesTableList ==================================
    onCoursesTableListAfterrender: function (me) {
        var btnSearch = Helpers.getComponent("btnSearchCoursesTableList", me);
        btnSearch.fireEvent("click", btnSearch);
    },
    onBtnSearchCoursesTableListClick: function (cmp) {
        var cont = this;
        var me = cmp.up("coursesTableList");
        var frm = Helpers.getComponent("frmCoursesTableList", me).getForm();
        var grdCoursesTableList = Helpers.getComponent("grdCoursesTableList", me);
        if (!frm.isValid()) return;
        var filterValues = frm.getValues();

        grdCoursesTableList.headerCt.removeAll();

        var getHederName = function (dataIndex) {
            if (dataIndex == "StartDate") return "ამოქმედების თარიღი";
            if (dataIndex == "CurrencyPair") return "კურსთა წყვილი";
            return dataIndex;
        }

        Helpers.setBaseParams(Helpers.getComponent("grdCoursesTableList", me).store, filterValues, true, function (data) {
            if (data.length == 0) return;
            for (var prop in data[0].data) {
                if (!Ext.isEmpty(data[0].data[prop]) && prop != "id" && prop != "FXRateId" && prop != "FirstCurrencyCode" && prop != "SecondCurrencyCode" && prop != "CreateUserId") {
                    grdCoursesTableList.headerCt.insert(grdCoursesTableList.columns.length - 1, Ext.create('Ext.grid.column.Column', {
                        header: getHederName(prop),
                        flex: 1,
                        text: data[0].data[prop],
                        dataIndex: prop,
                        renderer: function (val, r, t) {
                            if (r.column.dataIndex == "StartDate") {
                                return Ext.util.Format.date(val, 'Y-m-d H:i');
                            }
                            return val;
                        }
                    }));
                }
            }
            grdCoursesTableList.getView().refresh(true)
        });
    },
    onBtnClearSearchCoursesTableListClick: function (cmp) {
        var cont = this;
        var me = cmp.up("coursesTableList");
        Helpers.getComponent("frmCoursesTableList", me).getForm().reset();
    },
    fnGetSelectedRequairdCoursesTableList: function (me) {
        var grdList = Helpers.getComponent("grdCoursesTableList", me).getSelected();
        if (Ext.isEmpty(grdList)) {
            Helpers.showMessage("მონიშნეთ ჩანაწერი", Enums.MessageBoxType.Warning);
            return null;
        }
        return grdList;
    },
    fnCoursesTableListManipulation: function (cmp) {
        var cont = this;
        var me = cmp.up("coursesTableList");
        var grdList = Helpers.getComponent("grdCoursesTableList", me);
        if (cmp.manupulation == "Export") {
            Helpers.ajaxRequest('Core/FXRateListExport', grdList.store.proxy.extraParams, Enums.ActionMethod.POST, Enums.RequestType.Default, me, function (result) {
                Helpers.downloadFile(result, "კურსების ტაბლო", "xlsx");
            });
        }
        if (cmp.manupulation == "Import") {
            Ext.widget("uploadFile", {
                maxUploadFiles: 1,
                onSave: function () {
                    grdList.store.load();
                }
            }).show();
        }
    }
});