Ext.define('CurrencyApp.utils.Helpers', {
    alternateClassName: ['Helpers'],
    singleton: true,
    serviceUrl: 'http://localhost:7733/api/',
    //serviceUrl: 'http://ratesapi.credo.ge/api/',
    getComponent: function (itemId, parentContainet) {
        var result = parentContainet.query('*[itemId="' + itemId.toString() + '"]');
        if (result.length > 1) alert('(' + itemId + ') დუბლირდება სისტემაში');
        return result[0];
    },
    setStoreRecord: function (storeContainer, model, isSelect) {
        if (!Ext.isEmpty(storeContainer.storse)) {
            storeContainer.store.insert(
                storeContainer.store.data.items.length,
                model
            );

            if (isSelect == true)
                storeContainer.setValue(model.get(storeContainer.valueField));
        }
    },
    showMessage: function (msg, enumMessageBoxType, acceptHandler, refuseHandler) {
        var icon = "";
        if (enumMessageBoxType == Enums.MessageBoxType.Success) icon = 'MsIcon_SUCCESS';
        if (enumMessageBoxType == Enums.MessageBoxType.Info) icon = 'MsIcon_INFO';
        if (enumMessageBoxType == Enums.MessageBoxType.Error) icon = 'MsIcon_ERROR';
        if (enumMessageBoxType == Enums.MessageBoxType.Question) icon = 'MsIcon_QUESTION';
        if (enumMessageBoxType == Enums.MessageBoxType.Warning) icon = 'MsIcon_WARNING';

        var buttons = Ext.Msg.OK;
        if (enumMessageBoxType == Enums.MessageBoxType.Question)
            buttons = Ext.MessageBox.YESNO;

        return Ext.MessageBox.show({
            msg: '<div align="center">' + msg + '</div>',
            icon: icon,
            buttons: buttons,
            cls: 'custumMsg',
            border: false,
            waitConfig: { animate: true },
            closable: false,
            width: 333,
            fn: function (btn, text) {
                if (btn == 'yes' || btn == 'ok' && !Ext.isEmpty(acceptHandler))
                    acceptHandler(btn, text);
                if (btn == 'no' && !Ext.isEmpty(refuseHandler))
                    refuseHandler(btn);
            }
        });
    },
    ajaxRequest: function (path, params, enumActionMethod, enumRequestType, waitCnts, succAction, failAction, msgCfg) {
        var waitMsg = '';
        if (!Ext.isEmpty(msgCfg)) waitMsg = msgCfg.wait;
        else {
            if (enumRequestType == Enums.RequestType.Default) waitMsg = 'დაელოდეთ...';
            if (enumRequestType == Enums.RequestType.Saving) waitMsg = 'მიმდენარეობს შენახვა...';
            if (enumRequestType == Enums.RequestType.Deleting) waitMsg = 'მიმდენარეობს წაშლა...';
        }

        var succMsg = '';
        if (!Ext.isEmpty(msgCfg)) succMsg = msgCfg.succ;
        else {
            if (enumRequestType == Enums.RequestType.Default) succMsg = '';
            if (enumRequestType == Enums.RequestType.Saving) succMsg = 'შენახვა წარმატებით დასრულდა';
            if (enumRequestType == Enums.RequestType.Deleting) succMsg = 'წაშლა წარმატებით დასრულდა';
        }

        var failMsg = '';
        if (!Ext.isEmpty(msgCfg)) failMsg = msgCfg.fail;

        if (!Ext.isEmpty(waitCnts) && Ext.isEmpty(waitCnts.getEl())) {
            waitCnts = Ext.getCmp("MainViewport");
        }

        var maskIsactive = false;
        if (!Ext.isEmpty(waitMsg) && !Ext.isEmpty(waitCnts)) {
            waitCnts.getEl().mask(waitMsg);
            maskIsactive = true;
        }

        Ext.Ajax.request({
            url: Helpers.serviceUrl + path,
            method: enumActionMethod,
            timeout: 90000,
            headers: {
                "Authorization": localStorage.getItem('token')
            },
            success: function (result) {
                var resultObj = Ext.decode(result.responseText);
                if (result.status == 202) {
                    Ext.widget('adminPassConfirmWindow', {
                        model: resultObj,
                        callBackFunc: function (data) {
                            params.AdminConfirmUserName = data.UserName
                            params.AdminConfirmPassword = MD5.generate(data.Password);
                            Helpers.ajaxRequest(path, params, enumActionMethod, enumRequestType, waitCnts, succAction, failAction, msgCfg);
                        }
                    }).show();

                    if (maskIsactive) waitCnts.getEl().unmask();

                    return;
                }
                if (resultObj.success) {
                    if (maskIsactive) waitCnts.getEl().unmask();
                    if (!Ext.isEmpty(succMsg)) Helpers.showMessage(succMsg, Enums.MessageBoxType.Success);
                    if (!Ext.isEmpty(succAction)) succAction(resultObj.Result);
                } else {
                    if (maskIsactive) waitCnts.getEl().unmask();
                    if (!Ext.isEmpty(resultObj.Description)) Helpers.showMessage(
                        Ext.isEmpty(failMsg) ? resultObj.Description : failMsg, Enums.MessageBoxType.Warning
                    );
                    if (!Ext.isEmpty(failAction)) failAction();
                }
            },
            failure: function (result) {
                try {
                    var resp = JSON.parse(result.responseText);
                    if (result.status === 401) {
                        Ext.Msg.show({
                            title: 'შეცდომა',
                            msg: resp.Description,
                            width: 300,
                            closable: false,
                            buttons: Ext.Msg.OK,
                            buttonText: {
                                ok: 'ავტორიზაცია'
                            },
                            multiline: false,
                            fn: function (buttonValue) {
                                if (buttonValue === 'ok') {
                                    window.location.href = '/#login';
                                }
                            },
                            scope: this,
                            icon: Ext.Msg.QUESTION
                        });
                    } else {
                        var resultObj = Ext.decode(result.responseText);
                        if (maskIsactive) waitCnts.getEl().unmask();
                        Helpers.showMessage(resultObj.Description, Enums.MessageBoxType.Error);
                        if (!Ext.isEmpty(failAction)) failAction();
                    }
                } catch (e) {
                    Ext.MessageBox.show({
                        title: 'შეცდომა',
                        msg: 'შეცდომა',
                        icon: Ext.MessageBox.ERROR
                    });
                }
            },
            jsonData: params
        });


    },
    createToolbar: function (items) {
        return Ext.create('Ext.toolbar.Toolbar', { border: false, items: items });
    },
    createPagingToolbar: function (pageSize, store) {
        return Ext.create("Ext.toolbar.Paging", {
            pageSize: pageSize,
            store: store,
            displayInfo: true
        });
    },
    createAjaxAwait: function (paramObj) {
        //onStart
        //onEnd  
        //targetMsg
        //msg
        if (Ext.isEmpty(paramObj)) paramObj = {};
        var msg = "დაელოდეთ...";
        if (!Ext.isEmpty(paramObj.msg)) msg = paramObj.msg;

        var ajaxCounter = 0;
        this.StartAjax = function () {
            ajaxCounter++;
            if (ajaxCounter == 1 || paramObj.targetMsg.getEl().isMasked() === false) {
                if (!Ext.isEmpty(paramObj.targetMsg)) paramObj.targetMsg.getEl().mask(msg);
                if (!Ext.isEmpty(paramObj.onStart)) paramObj.onStart();
            }
        }
        this.EndAjax = function () {
            ajaxCounter--;
            if (ajaxCounter == 0) {
                if (!Ext.isEmpty(paramObj.targetMsg)) paramObj.targetMsg.getEl().unmask();
                if (!Ext.isEmpty(paramObj.onEnd)) paramObj.onEnd();
            } else {
                if (!Ext.isEmpty(paramObj.targetMsg) && paramObj.targetMsg.getEl().isMasked() === false) paramObj.targetMsg.getEl().mask(msg);
            }
        }
        return this;
    },
    composeModel: function (keyModelNamespace, objectData) {
        var keyObject = null;
        try {
            keyObject = Ext.create(keyModelNamespace);
        } catch (e) {
            return null;
        }
        if (Ext.isEmpty(objectData) || Object.keys(objectData).length == 0)
            return null;
        function Compose(ownerModel, ownerModelData) {
            if (
                Ext.isEmpty(ownerModel) ||
                    Ext.isEmpty(ownerModelData) ||
                        Object.keys(ownerModelData).length == 0
               )
                return ownerModel;

            var dataProperties = [];
            for (var prop in ownerModelData) {
                dataProperties.push(prop);
            }

            var cotDataProp = function (pName) {
                for (var i = 0; i < dataProperties.length; i++) {
                    if (dataProperties[i] == pName) {
                        return true;
                    }
                }
                return false;
            }

            var modelAssociations = [];
            for (var prop in ownerModel.associations) {
                if (!Ext.isEmpty(prop) && cotDataProp(prop)) {
                    modelAssociations.push(ownerModel.associations[prop]);
                }
            }

            var fields = ownerModel.fields;
            if (!Ext.isEmpty(fields))
                fields = fields.items;
            if (Ext.isEmpty(fields))
                fields = [];

            for (var i = 0; i < dataProperties.length; i++) {
                var propertyName = dataProperties[i].toString();
                if (Ext.isEmpty(ownerModelData[propertyName])) continue;
                for (var j = 0; j < modelAssociations.length; j++) {
                    var association = modelAssociations[j];//.inverse;
                    var associationModel = association.type;
                    var associationName = association.role;
                    if (Ext.isEmpty(associationModel)) continue;
                    if (associationName == propertyName) {
                        try {
                            if (association.association.isManyToOne) {

                                for (var p = 0; p < ownerModelData[propertyName].length; p++) {
                                    var composedChild = Compose(Ext.create(association.type), ownerModelData[propertyName][p]);
                                    if (!Ext.isEmpty(composedChild))
                                        ownerModel[associationName]().data.items.push(composedChild);
                                }
                            } else if (association.association.isOneToOne) {

                                if (!Ext.isEmpty(association.setterName)) {
                                    var composedParent = Compose(Ext.create(association.type), ownerModelData[propertyName]);
                                    if (!Ext.isEmpty(composedParent))
                                        ownerModel[association.setterName](composedParent);
                                }
                            }
                        } catch (e) {
                        }

                        break;
                    }

                }

                for (var k = 0; k < fields.length; k++) {
                    var fieldName = fields[k].name.toString();
                    if (propertyName == fieldName) {
                        try {
                            ownerModel.set(fieldName, ownerModelData[propertyName]);
                        } catch (e) {
                        }
                        break;
                    }
                }
            }
            return ownerModel;
        }
        return Compose(keyObject, objectData);

    },
    transform: function (modelNameOrModel, objectData) {
        if (Ext.isEmpty(modelNameOrModel)) return null;
        if (modelNameOrModel.isModel == true && Ext.isEmpty(objectData))
            return modelNameOrModel.getData({ associated: true });
        if (!Ext.isEmpty(objectData))
            return Helpers.composeModel(modelNameOrModel, objectData);
    },
    setBaseParam: function (store, paramName, value, reload, callBackFunc) {
        store.getProxy().setExtraParam(paramName, value);
        if (reload) store.load({
            callback: function (data) {
                if (!Ext.isEmpty(callBackFunc)) {
                    callBackFunc(data);
                }
            }
        });
    },
    setBaseParams: function (store, object, reload, callBackFunc) {
        for (var prop in object) {
            Helpers.setBaseParam(store, prop, object[prop]);
        }
        if (reload) store.load({
            callback: function (data) {
                if (!Ext.isEmpty(callBackFunc)) {
                    callBackFunc(data);
                }
            }
        });
    },
    downloadFile: function (guid, name, extension) {
        document.location = Helpers.serviceUrl + 'Core/GetFile/' + guid + '/' + name + '/' + extension;
    },
    print: function (innerHtml) {
        var myWindow = window.open('', '_blank', '');
        myWindow.document.write(innerHtml);
        myWindow.focus();
        myWindow.print();
        myWindow.close();
    },
    setReadOnlyForAll: function (parentContainet, readOnly) {
        Ext.each(parentContainet.query('field'), function (cmp) {
            cmp.setReadOnly(readOnly);
        });
        Ext.each(parentContainet.query('button'), function (cmp) {
            if (cmp.readOnlyMode == undefined || cmp.readOnlyMode == true)
                cmp.setVisible(!readOnly);
        });
        Ext.each(parentContainet.query('actioncolumn'), function (cmp) {
            if (cmp.readOnlyMode == undefined || cmp.readOnlyMode == true)
                cmp.setVisible(!readOnly);
        });
        Ext.each(parentContainet.query('grid'), function (cmp) {
            Ext.each(cmp.plugins, function (plugin) {
                if (Ext.getClassName(plugin) == 'Ext.grid.plugin.CellEditing') {
                    if (readOnly) plugin.disable();
                    else plugin.enable();
                }
            });
            Ext.each(cmp.columns, function (column) {
                if (column.xtype == "checkcolumn") {
                    if (readOnly) column.disable();
                    else column.enable();
                }
            });
        });
    },
    addMainTabPanelItem: function (component, isOnlyOne) {
        if (Ext.isEmpty(component)) return;
        var mainTabPanel = Ext.getCmp("MainTabPanel");

        var isCont = null;
        if (isOnlyOne) {
            var cmpUnic = !Ext.isEmpty(component.name) ? component.name :
                !Ext.isEmpty(component.itemId) ? component.itemId :
                !Ext.isEmpty(component.id) ? component.id : null;

            isCont = mainTabPanel.down("[name=" + cmpUnic + "]");
            if (Ext.isEmpty(isCont)) isCont = mainTabPanel.down("[itemId=" + cmpUnic + "]");
            if (Ext.isEmpty(isCont)) isCont = mainTabPanel.down("[id=" + cmpUnic + "]");
            if (!Ext.isEmpty(isCont)) component = isCont;
        }

        if (!isOnlyOne || (isOnlyOne && Ext.isEmpty(isCont))) {
            mainTabPanel.add(component);
        }

        mainTabPanel.setActiveTab(component);
    },
    setDateOnToDay: function (field, value) {
        var today = new Date();
        if (today.getUTCDate() == value.getDate() && today.getUTCMonth() == value.getMonth() && today.getUTCFullYear() == value.getFullYear()) {
            field.setValue(today);
        }
    }
});

