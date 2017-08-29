Ext.define('CurrencyApp.view.shared.grid.AppGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.appGrid',
    scroll: false,
    columnLines: true,
    autoScroll: true,
    viewConfig: {
        markDirty: false
    },
    getThis: function () {
        var grd = Ext.getCmp(this.id);
        if (Ext.isEmpty(grd.deletedData)) grd.deletedData = [];
        return grd;
    },
    hasStore: function () {
        var thisGrd = this.getThis();
        return !Ext.isEmpty(thisGrd.store);
    },
    refresh: function () {
        var thisGrd = this.getThis();
        if (thisGrd.hasStore())
            thisGrd.setData(thisGrd.store.data.items, true);
    },
    clearData: function () {
        var thisGrd = this.getThis();
        thisGrd.deletedData = [];
        if (thisGrd.hasStore()) thisGrd.store.removeAll();
    },
    getSelection: function () {
        var thisGrd = this.getThis();
        var selectionModel = thisGrd.getSelectionModel();
        if (!Ext.isEmpty(selectionModel)) {
            var selection = selectionModel.getSelection();
            if (!Ext.isEmpty(selection) && selection.length > 0)
                return selection;
        }
        return null;
    },
    getSelected: function () {
        var thisGrd = this.getThis();
        var selection = thisGrd.getSelection();
        if (!Ext.isEmpty(selection) && selection.length > 0)
            return selection[0];
        return null;
    },
    deselectAll: function () {
        var thisGrd = this.getThis();
        var selectionModel = thisGrd.getSelectionModel();
        if (!Ext.isEmpty(selectionModel)) selectionModel.deselectAll();
    },
    setData: function (data, resetExistingData) {
        var thisGrd = this.getThis();
        if (resetExistingData) thisGrd.clearData();

        var validData = [];
        if (!Ext.isEmpty(data)) {
            if (data instanceof Array) validData = data;
            else validData = [data];
        }


        if (validData.length == 0 || !thisGrd.hasStore()) return;

        var dataForDeletion = [];
        if (validData.length != 0) {
            for (var i = 0; i < validData.length; i++) {
                var dItem = validData[i];
                if (!Ext.isEmpty(dItem.get('DateDeleted')) && dItem.get('DateDeleted'))
                    dataForDeletion.push(dItem);
                else thisGrd.store.add(dItem);
            }
        }
        thisGrd.removeData(dataForDeletion);
    },
    removeData: function (data) {
        var thisGrd = this.getThis();

        var validData = [];
        if (!Ext.isEmpty(data)) {
            if (data instanceof Array) validData = data;
            else validData = [data];
        }

        if (validData.length != 0) {
            for (var i = 0; i < validData.length; i++) {
                var dItem = validData[i];
                dItem.set('DateDeleted', new Date());
                if (!Ext.isEmpty(dItem.get('ID')) && dItem.get('ID') != 0)
                    thisGrd.deletedData.push(dItem);
            }
        }
        if (thisGrd.hasStore) thisGrd.store.remove(data);
    },
    getData: function (activeOnly) {
        var thisGrd = this.getThis();
        var result = [];

        var activeData = thisGrd.hasStore() ? thisGrd.store.data.items : [];
        for (var i = 0; i < activeData.length; i++) {
            result.push(activeData[i]);
        }

        var deletedData = activeOnly ? [] : thisGrd.deletedData;
        for (var i = 0; i < deletedData.length; i++) {
            result.push(deletedData[i]);
        }

        return result;
    },
    getDataByIndex: function (index) {
        if (index == null || index == undefined) return;
        var thisGrd = this.getThis();
        return thisGrd.store.getAt(index);
    },
    rememberSelection: function () {
        var thisGrd = this.getThis();
        thisGrd.selectedRecords = this.getSelectionModel().getSelection();
        thisGrd.getView().saveScrollState();
    }
})