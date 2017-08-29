Ext.define('CurrencyApp.view.shared.comboBox.AppComboBox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.appComboBox',
    valueField: 'ID',
    displayField: 'Name',
    getSelectedModel: function () {
        var v = this.getValue();
        if (!Ext.isEmpty(v)) {
            var r = this.findRecord(this.valueField || this.displayField, v);
            var index = this.store.indexOf(r);
            return (this.store.getAt(index));
        }
    },
    fullClear: function(isResetbaseParams) {
        var cmd = this;
        if (cmd == undefined || cmd == null) return;
        cmd.clearValue();
        cmd.store.removeAll();
        cmd.lastQuery = null;
        if (isResetbaseParams)
            cmd.store.baseParams = {};

    },
    setValueAfterLoad: function (params, value, callbackFunction) {
        var combo = this;
        combo.store.load({
            params: params,
            callback: function (data) {
                if (!Ext.isEmpty(value)) combo.setValue(value);
                if (!Ext.isEmpty(callbackFunction)) callbackFunction(data);
            }
        });
    },
    setBaseParam: function (param, value, isReset) {
        var cmd = this;
        var reset = ValueIsEmpty(isReset) ? true : isReset;
        if (reset) cmd.fullClear();
        cmd.store.setBaseParam(param, value);
    }
});