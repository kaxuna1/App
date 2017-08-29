
Ext.define('CurrencyApp.view.shared.uploadFile.UploadFile', {
    extend: 'Ext.window.Window',
    alias: 'widget.uploadFile',
    width: 400,
    onSave: null,
    maxUploadFiles: 5,
    bodyPadding: 5,
    title: 'ფაილის ატვირთვა',
    layout: { type: 'vbox', align: 'stretch' },
    initComponent: function () {
        var me = this;

        me.items = [{
            xtype: 'form',
            itemId: 'frmFiles',
            border: false,
            items: [{
                xtype: 'datefield',
                itemId: 'dtmStartDate',
                margin: '0 0 5 0',
                submitFormat: 'Y-m-d H:i',
                format: 'Y-m-d H:i',
                allowBlank: false,
                blankText: 'სავალდებულო ველი',
                emptyText: 'ამოქმედების თარიღი',
                flex: 1,
                listeners: {
                    select: function (field, value, eOpts) {
                        Helpers.setDateOnToDay(field, value);
                    }
                }
            }, {
                xtype: 'filefield',
                itemId: 'flfFile',
                flex: 1,
                emptyText: 'ფაილი',
                anchor: '100%',
                buttonText: 'არჩევა...'
            }]
        }]

        me.buttons = [{
            text: 'ატვირთვა',
            handler: function () {
                var form = Helpers.getComponent("frmFiles", me);
                if (!me.validate()) return;

                var file = Helpers.getComponent('flfFile', me).fileInputEl.dom.files[0];

                var data = form.getValues();

                var formData = new FormData();
                for (var key in data) {
                    formData.append(key, data[key]);
                }
                formData.append("files", file);

                var wait = Helpers.createAjaxAwait({ targetMsg: me, msg: "ატვირთვა..." });

                wait.StartAjax();
                Ext.Ajax.request({
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": localStorage.getItem('token')
                    },
                    url: Helpers.serviceUrl + "Core/CurrencyExcelUpload",
                    rawData: formData,
                    success: function (r) {
                        var resp = JSON.parse(r.responseText);
                        me.onSave();
                        wait.EndAjax();
                        me.close();
                    },
                    failure: function (form, action) {
                        Helpers.showMessage("შეცდომა ფაილის ატვირთვის დროს", Enums.MessageBoxType.Error);
                        wait.EndAjax();
                    }
                });


                //var onSave = function (resp) {
                //    if (resp != null) {
                //        if (resp.response.status != 400) {
                //            Ext.Msg.alert('შეტყობინება', resp.response.statusText);
                //            return;
                //        }
                //    }
                //    me.onSave();
                //    me.close();
                //}

                //form.submit({
                //    url: Helpers.serviceUrl + "Core/CurrencyExcelUpload",
                //    waitMsg: 'ატვირთვა...',
                //    success: function (fp, o) {
                //        onSave(null);
                //    },
                //    failure: function (form, response) {
                //        debugger
                //        onSave(response)
                //    }
                //});
            }
        }]

        me.callParent();
        me.show();
    },
    validate: function () {
        var me = this;
        if (!Helpers.getComponent("frmFiles", me).getForm().isValid()) return false;
        if (Ext.isEmpty(Helpers.getComponent('flfFile', me).getValue())) {
            Helpers.showMessage("აირჩიეთ ფაილი", Enums.MessageBoxType.Info);
            return false;
        }
        return true;
    }
});