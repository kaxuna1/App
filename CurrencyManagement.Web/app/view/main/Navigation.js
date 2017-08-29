Ext.define('ReportModel1',
    {
        extend: 'Ext.data.Model',
        fields: [
            { name: 'Approved', type: 'string' },
            { name: 'BranchName', type: 'string' },
            { name: 'Canceled', type: 'string' },
            { name: 'ConsuleName', type: 'string' },
            { name: 'Issued', type: 'string' },
            { name: 'Pending', type: 'string' },
            { name: 'Refused', type: 'string' },
            { name: 'VillageName', type: 'string' },
            { name: 'Sum', type: 'string' }
        ]
    });
Ext.define('CurrencyApp.view.main.Navigation',
    {
        extend: 'Ext.panel.Panel',
        alias: 'widget.navigation',
        initComponent: function() {

            var vilageStore;
            var branchStore;
            var consuleStore;

            var vilageStoreC;
            var branchStoreC;
            var consuleStoreC;


            var vilageStoreS;
            var branchStoreS;
            var consuleStoreS;

            var vilageCombo;
            var branchCombo;
            var consuleCombo;
            var reportTypeCombo;
            var dateFrom;
            var dateTo;
            var storeReportTypes = new Ext.data.ArrayStore({
                fields: ['id', 'name'],
                data: [[1, 'კონსულის განაცხადების სტატუს რეპორტი'], [2, 'report2']]
            });

            Ext.apply(this,
                {
                    border: false,
                    layout: { type: 'vbox', align: 'stretch' },
                    items: [
                        {
                            xtype: 'component',
                            cls: 'credo-logo',
                            html: '<div class="main-logo"><img src="resources/images/company-logo.png"></div>',
                            width: 44,
                            margin: '0 0 6 0'
                        }, /*{
                xtype: 'treelist',
                margin: '4 0 6 0',
                onClick: function (e) {
                    this.fireEvent('click', e);
                },
                listeners: {
                    click: 'onItemClick'
                },
                expanderFirst: false,
                expanderOnly: false,
                reference: 'treelist',
                store: Ext.create('CurrencyApp.store.NavigationTree', { storeId: 'NavigationTree' })
            }*/
                        {
                            title: 'სოფლის კონსული',
                            width: 300,
                            flex: 1,
                            defaults: {
                                // applied to each contained panel
                                bodyStyle: 'padding:15px'
                            },
                            layout: {
                                // layout-specific configs go here
                                type: 'accordion',
                                titleCollapse: false,
                                animate: true,
                                activeOnTop: false

                            },
                            items: [
                                {
                                    title: 'პანელი სოფლის ჭრილში',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            title: 'ფილტრის პარამეტრები',

                                            defaultType: 'textfield',
                                            defaults: {
                                                anchor: '100%'
                                            },

                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'რეგიონი',
                                                    name: 'region',
                                                    store: Ext.create('Ext.data.Store',
                                                        {
                                                            fields: [{ name: 'Id' }, { name: 'Name' }],
                                                            autoLoad: true,
                                                            proxy: {
                                                                type: 'ajax',
                                                                url: Helpers.serviceUrl + "Core/SyncService",
                                                                method: "GET",
                                                                timeout: 90000,
                                                                headers: {
                                                                    "Authorization": localStorage.getItem('token')
                                                                },
                                                                reader: {
                                                                    type: 'json',
                                                                    rootProperty: 'Result.syncModel.Regions'
                                                                }
                                                            }
                                                        }),
                                                    valueField: 'Id',
                                                    displayField: 'Name',
                                                    typeAhead: true,
                                                    queryMode: 'local',
                                                    emptyText: '',
                                                    listeners: {
                                                        select: function(a, b, c) {
                                                            var id = b.data.Id;
                                                            branchStoreS.clearFilter();
                                                            branchStoreS.filterBy(function(row) {
                                                                return (row.get('Region') === id) ? true : false;
                                                            });


                                                        }
                                                    }
                                                },
                                                branchCombo = {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'ფილიალი',
                                                    name: 'branch',
                                                    autoLoad: true,
                                                    store: branchStoreS = Ext.create('Ext.data.Store',
                                                        {
                                                            fields: [
                                                                { name: 'Id' }, { name: 'Name' }, { name: 'Region' }
                                                            ],
                                                            autoLoad: true,
                                                            proxy: {
                                                                type: 'ajax',
                                                                url: Helpers.serviceUrl + "Core/SyncService",
                                                                method: "GET",
                                                                timeout: 90000,
                                                                headers: {
                                                                    "Authorization": localStorage.getItem('token')
                                                                },
                                                                reader: {
                                                                    type: 'json',
                                                                    rootProperty: 'Result.syncModel.Branches'
                                                                }
                                                            }
                                                        }),
                                                    valueField: 'Id',
                                                    displayField: 'Branch',
                                                    typeAhead: true,
                                                    id: "branchComboS",
                                                    queryMode: 'local',
                                                    emptyText: '',
                                                    listeners: {
                                                        select: function(a, b, c) {
                                                            var id = b.data.Id;
                                                            vilageStoreS.clearFilter();
                                                            vilageStoreS.filterBy(function(row) {
                                                                return (row.get('BranchId') === id) ? true : false;
                                                            });

                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'სოფელი',
                                                    name: 'village',
                                                    store: vilageStoreS = Ext.create('Ext.data.Store',
                                                        {
                                                            fields: [
                                                                { name: 'Id' }, { name: 'Village' },
                                                                { name: 'BranchId' }
                                                            ],
                                                            autoLoad: true,
                                                            proxy: {
                                                                type: 'ajax',
                                                                url: Helpers.serviceUrl + "Core/SyncService",
                                                                method: "GET",
                                                                timeout: 90000,
                                                                headers: {
                                                                    "Authorization": localStorage.getItem('token')
                                                                },
                                                                reader: {
                                                                    type: 'json',
                                                                    rootProperty: 'Result.syncModel.Villages'
                                                                }
                                                            }
                                                        }),
                                                    valueField: 'Id',
                                                    displayField: 'Village',
                                                    typeAhead: true,
                                                    queryMode: 'local',
                                                    emptyText: '',
                                                    listeners: {
                                                        select: function(a, b, c) {
                                                            var id = b.data.Id;
                                                            consuleStoreS.clearFilter();
                                                            consuleStoreS.filterBy(function(row) {
                                                                return (row.get('VillageId') === id) ? true : false;
                                                            });

                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    text: 'ძებნა',
                                                    scale: 'medium',
                                                    iconAlign: 'right',


                                                    handler: function() {


                                                        var sendData = {
                                                          
                                                         
                                                        }

                                                        var tabName = sendData.type === 1
                                                            ? "კონსულის განაცხადების სტატუს რეპორტი"
                                                            : "";


                                                        console.log(sendData);

                                                        Ext.Ajax.request({
                                                            url: Helpers.serviceUrl + "Core/report",
                                                            method: "POST",
                                                            timeout: 90000,
                                                            jsonData: JSON.stringify(sendData),
                                                            headers: {
                                                                "Authorization": localStorage.getItem('token')
                                                            },
                                                            success: function(result) {
                                                                var resultObj = Ext.decode(result.responseText);

                                                                var data = resultObj.Result.data;

                                                                console.log(data);
                                                                if (sendData.type === 1) {
                                                                    for (key in data) {
                                                                        data[key]["Sum"] =
                                                                            parseInt(data[key].Approved) +
                                                                            parseInt(data[key].Canceled) +
                                                                            parseInt(data[key].Issued) +
                                                                            parseInt(data[key].Pending) +
                                                                            parseInt(data[key].Refused);
                                                                    }
                                                                }

                                                                var gridStore = new Ext.data.Store({
                                                                    model: 'ReportModel1',
                                                                    data: data,
                                                                    reader: {
                                                                        type: 'json'
                                                                    },
                                                                    proxy: {
                                                                        type: 'ajax',
                                                                        url: 'objects.json',
                                                                        autoLoad: true,
                                                                        reader: {
                                                                            type: 'json',
                                                                            //root: 'Objects',
                                                                            rootProperty: 'Objects'
                                                                        }
                                                                    }
                                                                });


                                                                Helpers.addMainTabPanelItem(Ext.create("Ext.grid.Panel",
                                                                        {
                                                                            
                                                                        }),
                                                                    false);

                                                                console.log(resultObj);

                                                            },
                                                            failure: function(result) {
                                                                try {
                                                                    var resp = JSON.parse(result.responseText);
                                                                    console.log(resp);

                                                                } catch (e) {
                                                                    Ext.MessageBox.show({
                                                                        title: 'შეცდომა',
                                                                        msg: 'შეცდომა',
                                                                        icon: Ext.MessageBox.ERROR
                                                                    });
                                                                }
                                                            }
                                                            //,jsonData: params
                                                        });
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }, {
                                    title: 'პანელი კონსულის ჭრილში',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            title: 'ფილტრის პარამეტრები',

                                            defaultType: 'textfield',
                                            defaults: {
                                                anchor: '100%'
                                            },

                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'რეგიონი',
                                                    name: 'region',
                                                    store: Ext.create('Ext.data.Store',
                                                        {
                                                            fields: [{ name: 'Id' }, { name: 'Name' }],
                                                            autoLoad: true,
                                                            proxy: {
                                                                type: 'ajax',
                                                                url: Helpers.serviceUrl + "Core/SyncService",
                                                                method: "GET",
                                                                timeout: 90000,
                                                                headers: {
                                                                    "Authorization": localStorage.getItem('token')
                                                                },
                                                                reader: {
                                                                    type: 'json',
                                                                    rootProperty: 'Result.syncModel.Regions'
                                                                }
                                                            }
                                                        }),
                                                    valueField: 'Id',
                                                    displayField: 'Name',
                                                    typeAhead: true,
                                                    queryMode: 'local',
                                                    emptyText: '',
                                                    listeners: {
                                                        select: function (a, b, c) {
                                                            var id = b.data.Id;
                                                            branchStoreC.clearFilter();
                                                            branchStoreC.filterBy(function (row) {
                                                                return (row.get('Region') === id) ? true : false;
                                                            });


                                                        }
                                                    }
                                                },
                                                branchCombo = {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'ფილიალი',
                                                    name: 'branch',
                                                    autoLoad: true,
                                                    store: branchStoreC = Ext.create('Ext.data.Store',
                                                        {
                                                            fields: [
                                                                { name: 'Id' }, { name: 'Name' }, { name: 'Region' }
                                                            ],
                                                            autoLoad: true,
                                                            proxy: {
                                                                type: 'ajax',
                                                                url: Helpers.serviceUrl + "Core/SyncService",
                                                                method: "GET",
                                                                timeout: 90000,
                                                                headers: {
                                                                    "Authorization": localStorage.getItem('token')
                                                                },
                                                                reader: {
                                                                    type: 'json',
                                                                    rootProperty: 'Result.syncModel.Branches'
                                                                }
                                                            }
                                                        }),
                                                    valueField: 'Id',
                                                    displayField: 'Branch',
                                                    typeAhead: true,
                                                    id: "branchComboC",
                                                    queryMode: 'local',
                                                    emptyText: '',
                                                    listeners: {
                                                        select: function (a, b, c) {
                                                            var id = b.data.Id;
                                                            vilageStoreC.clearFilter();
                                                            vilageStoreC.filterBy(function (row) {
                                                                return (row.get('BranchId') === id) ? true : false;
                                                            });

                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'სოფელი',
                                                    name: 'village',
                                                    store: vilageStoreC = Ext.create('Ext.data.Store',
                                                        {
                                                            fields: [
                                                                { name: 'Id' }, { name: 'Village' },
                                                                { name: 'BranchId' }
                                                            ],
                                                            autoLoad: true,
                                                            proxy: {
                                                                type: 'ajax',
                                                                url: Helpers.serviceUrl + "Core/SyncService",
                                                                method: "GET",
                                                                timeout: 90000,
                                                                headers: {
                                                                    "Authorization": localStorage.getItem('token')
                                                                },
                                                                reader: {
                                                                    type: 'json',
                                                                    rootProperty: 'Result.syncModel.Villages'
                                                                }
                                                            }
                                                        }),
                                                    valueField: 'Id',
                                                    displayField: 'Village',
                                                    typeAhead: true,
                                                    queryMode: 'local',
                                                    emptyText: '',
                                                    listeners: {
                                                        select: function (a, b, c) {
                                                            var id = b.data.Id;
                                                            consuleStoreC.clearFilter();
                                                            consuleStoreC.filterBy(function (row) {
                                                                return (row.get('VillageId') === id) ? true : false;
                                                            });

                                                        }
                                                    }
                                                },

                                                consuleCombo = {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'კონსული',
                                                    id: "consuleComboC",
                                                    name: 'consul',
                                                    store: consuleStoreC = Ext.create('Ext.data.Store',
                                                        {
                                                            fields: [
                                                                { name: 'Id' }, { name: 'Consul' },
                                                                { name: 'VillageId' }
                                                            ],
                                                            autoLoad: true,
                                                            proxy: {
                                                                type: 'ajax',
                                                                url: Helpers.serviceUrl + "Core/SyncService",
                                                                method: "GET",
                                                                timeout: 90000,
                                                                headers: {
                                                                    "Authorization": localStorage.getItem('token')
                                                                },
                                                                reader: {
                                                                    type: 'json',
                                                                    rootProperty: 'Result.syncModel.Consuls'
                                                                }
                                                            }
                                                        }),
                                                    valueField: 'Id',
                                                    displayField: 'Consul',
                                                    typeAhead: true,
                                                    queryMode: 'local',
                                                    emptyText: ''
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'ვალუტა',
                                                    id: "currencyCombo",
                                                    name: 'consul',
                                                    store: consuleStoreC = Ext.create('Ext.data.Store',
                                                        {
                                                            fields: [
                                                                { name: 'Id' }, { name: 'Consul' },
                                                                { name: 'VillageId' }
                                                            ],
                                                            autoLoad: true,
                                                            proxy: {
                                                                type: 'ajax',
                                                                url: Helpers.serviceUrl + "Core/SyncService",
                                                                method: "GET",
                                                                timeout: 90000,
                                                                headers: {
                                                                    "Authorization": localStorage.getItem('token')
                                                                },
                                                                reader: {
                                                                    type: 'json',
                                                                    rootProperty: 'Result.syncModel.Consuls'
                                                                }
                                                            }
                                                        }),
                                                    valueField: 'Id',
                                                    displayField: 'Consul',
                                                    typeAhead: true,
                                                    queryMode: 'local',
                                                    emptyText: ''
                                                },
                                                {
                                                    xtype: 'button',
                                                    text: 'ძებნა',
                                                    scale: 'medium',
                                                    iconAlign: 'right',


                                                    handler: function () {


                                                        var sendData = {


                                                        }

                                                        var tabName = sendData.type === 1
                                                            ? "კონსულის განაცხადების სტატუს რეპორტი"
                                                            : "";


                                                        console.log(sendData);

                                                        Helpers.addMainTabPanelItem(Ext.create("Ext.form.Panel",
                                                                {
                                                                    xtype: 'form',
                                                                    title:'ინფო პანელი კონსულის ჭრილში',
                                                                    frame: true,

                                                                    fieldDefaults: {
                                                                        labelAlign: 'right',
                                                                        labelWidth: 90,
                                                                        msgTarget: Ext.supports.Touch ? 'side' : 'qtip'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'fieldset',
                                                                            title: 'ინფო პანელი კონსულის ჭრილში',
                                                                            defaultType: 'textfield',
                                                                            layout: 'anchor',
                                                                            defaults: {
                                                                                anchor: '100%'
                                                                            },
                                                                            items: [ {
                                                                                xtype: 'container',
                                                                                layout: 'hbox',
                                                                                defaultType: 'textfield',
                                                                                margin: '0 0 5 0',

                                                                                items: [{
                                                                                    fieldLabel: 'სოფლის კოდი',
                                                                                    name: 'vilageCode',
                                                                                    value:12331,
                                                                                    flex: 3,
                                                                                    allowBlank: false
                                                                                }, {
                                                                                    fieldLabel: 'მოსახლეობა',
                                                                                    name: 'population',
                                                                                    value:400,
                                                                                    flex: 3,
                                                                                    labelWidth: 100,
                                                                                  
                                                                                }]
                                                                            },{
                                                                                xtype: 'container',
                                                                                layout: 'hbox',
                                                                                defaultType: 'textfield',
                                                                                margin: '0 0 5 0',

                                                                                items: [{
                                                                                    fieldLabel: 'რეგიონი',
                                                                                    name: 'region',
                                                                                    value:'გურია',
                                                                                    flex: 3,
                                                                                    allowBlank: false
                                                                                }, {
                                                                                    fieldLabel: 'კოეფიციენტი',
                                                                                    name: 'coeficient',
                                                                                    value:14,
                                                                                    flex: 3,
                                                                                    labelWidth: 100,
                                                                                  
                                                                                }]
                                                                            },{
                                                                                xtype: 'container',
                                                                                layout: 'hbox',
                                                                                defaultType: 'textfield',
                                                                                margin: '0 0 5 0',

                                                                                items: [{
                                                                                    fieldLabel: 'ფილიალი',
                                                                                    name: 'filial',
                                                                                    value:'ოზურგეთი',
                                                                                    flex: 3,
                                                                                    allowBlank: false
                                                                                }, {
                                                                                    fieldLabel: 'კომლი',
                                                                                    name: 'comli',
                                                                                    value:700,
                                                                                    flex: 3,
                                                                                    labelWidth: 100,
                                                                                  
                                                                                }]
                                                                            }]
                                                                        }
                                                                        ,
                                                                        {
                                                                            xtype: "panel",
                                                                            title: "Panel",
                                                                            items: [{
                                                                                layout: "column",
                                                                                items: [{
                                                                                    title: "მომსახურე ოფიცრები",
                                                                                    columnWidth: 0.5,
                                                                                    items: []
                                                                                }, {
                                                                                    title: "ინფორმაცია",
                                                                                    columnWidth: 0.5,
                                                                                    items: [
                                                                                        {
                                                                                            xtype: 'fieldset',
                                                                                            title: 'ინფო ',
                                                                                            defaultType: 'textfield',
                                                                                            layout: 'anchor',
                                                                                            defaults: {
                                                                                                anchor: '100%'
                                                                                            },
                                                                                            items: [{
                                                                                                xtype: 'container',
                                                                                                layout: 'hbox',
                                                                                                defaultType: 'textfield',
                                                                                                margin: '0 0 5 0',

                                                                                                items: [{
                                                                                                    fieldLabel: 'სოფლის კოდი',
                                                                                                    name: 'vilageCode',
                                                                                                    value: 12331,
                                                                                                    flex: 3,
                                                                                                    allowBlank: false
                                                                                                }]
                                                                                            }, {
                                                                                                xtype: 'container',
                                                                                                layout: 'hbox',
                                                                                                defaultType: 'textfield',
                                                                                                margin: '0 0 5 0',

                                                                                                items: [{
                                                                                                    fieldLabel: 'რეგიონი',
                                                                                                    name: 'region',
                                                                                                    value: 'გურია',
                                                                                                    flex: 3,
                                                                                                    allowBlank: false
                                                                                                }]
                                                                                            }, {
                                                                                                xtype: 'container',
                                                                                                layout: 'hbox',
                                                                                                defaultType: 'textfield',
                                                                                                margin: '0 0 5 0',

                                                                                                items: [{
                                                                                                    fieldLabel: 'ფილიალი',
                                                                                                    name: 'filial',
                                                                                                    value: 'ოზურგეთი',
                                                                                                    flex: 3,
                                                                                                    allowBlank: false
                                                                                                }]
                                                                                            }]
                                                                                        }
                                                                                    ]
                                                                                }]
                                                                            }]
                                                                        }
                                                                    ]

                                                                }),
                                                            false);
                                                     /*   Ext.Ajax.request({
                                                            url: Helpers.serviceUrl + "Core/report",
                                                            method: "POST",
                                                            timeout: 90000,
                                                            jsonData: JSON.stringify(sendData),
                                                            headers: {
                                                                "Authorization": localStorage.getItem('token')
                                                            },
                                                            success: function (result) {
                                                                var resultObj = Ext.decode(result.responseText);

                                                                var data = resultObj.Result.data;



                                                                Helpers.addMainTabPanelItem(Ext.create("Ext.grid.Panel",
                                                                        {
                                                                            
                                                                        }),
                                                                    false);

                                                                console.log(resultObj);

                                                            },
                                                            failure: function (result) {
                                                                try {
                                                                    var resp = JSON.parse(result.responseText);
                                                                    console.log(resp);

                                                                } catch (e) {
                                                                    Ext.MessageBox.show({
                                                                        title: 'შეცდომა',
                                                                        msg: 'შეცდომა',
                                                                        icon: Ext.MessageBox.ERROR
                                                                    });
                                                                }
                                                            }
                                                            //,jsonData: params
                                                        });*/
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }, {
                                    title: 'რეპორტები',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            title: 'ფილტრის პარამეტრები',

                                            defaultType: 'textfield',
                                            defaults: {
                                                anchor: '100%'
                                            },

                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'რეგიონი',
                                                    name: 'region',
                                                    store: Ext.create('Ext.data.Store',
                                                        {
                                                            fields: [{ name: 'Id' }, { name: 'Name' }],
                                                            autoLoad: true,
                                                            proxy: {
                                                                type: 'ajax',
                                                                url: Helpers.serviceUrl + "Core/SyncService",
                                                                method: "GET",
                                                                timeout: 90000,
                                                                headers: {
                                                                    "Authorization": localStorage.getItem('token')
                                                                },
                                                                reader: {
                                                                    type: 'json',
                                                                    rootProperty: 'Result.syncModel.Regions'
                                                                }
                                                            }
                                                        }),
                                                    valueField: 'Id',
                                                    displayField: 'Name',
                                                    typeAhead: true,
                                                    queryMode: 'local',
                                                    emptyText: '',
                                                    listeners: {
                                                        select: function(a, b, c) {
                                                            var id = b.data.Id;
                                                            branchStore.clearFilter();
                                                            branchStore.filterBy(function(row) {
                                                                return (row.get('Region') === id) ? true : false;
                                                            });


                                                        }
                                                    }
                                                },
                                                branchCombo = {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'ფილიალი',
                                                    name: 'branch',
                                                    autoLoad: true,
                                                    store: branchStore = Ext.create('Ext.data.Store',
                                                        {
                                                            fields: [
                                                                { name: 'Id' }, { name: 'Name' }, { name: 'Region' }
                                                            ],
                                                            autoLoad: true,
                                                            proxy: {
                                                                type: 'ajax',
                                                                url: Helpers.serviceUrl + "Core/SyncService",
                                                                method: "GET",
                                                                timeout: 90000,
                                                                headers: {
                                                                    "Authorization": localStorage.getItem('token')
                                                                },
                                                                reader: {
                                                                    type: 'json',
                                                                    rootProperty: 'Result.syncModel.Branches'
                                                                }
                                                            }
                                                        }),
                                                    valueField: 'Id',
                                                    displayField: 'Branch',
                                                    typeAhead: true,
                                                    id: "branchCombo",
                                                    queryMode: 'local',
                                                    emptyText: '',
                                                    listeners: {
                                                        select: function(a, b, c) {
                                                            var id = b.data.Id;
                                                            vilageStore.clearFilter();
                                                            vilageStore.filterBy(function(row) {
                                                                return (row.get('BranchId') === id) ? true : false;
                                                            });

                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'სოფელი',
                                                    name: 'village',
                                                    store: vilageStore = Ext.create('Ext.data.Store',
                                                        {
                                                            fields: [
                                                                { name: 'Id' }, { name: 'Village' },
                                                                { name: 'BranchId' }
                                                            ],
                                                            autoLoad: true,
                                                            proxy: {
                                                                type: 'ajax',
                                                                url: Helpers.serviceUrl + "Core/SyncService",
                                                                method: "GET",
                                                                timeout: 90000,
                                                                headers: {
                                                                    "Authorization": localStorage.getItem('token')
                                                                },
                                                                reader: {
                                                                    type: 'json',
                                                                    rootProperty: 'Result.syncModel.Villages'
                                                                }
                                                            }
                                                        }),
                                                    valueField: 'Id',
                                                    displayField: 'Village',
                                                    typeAhead: true,
                                                    queryMode: 'local',
                                                    emptyText: '',
                                                    listeners: {
                                                        select: function(a, b, c) {
                                                            var id = b.data.Id;
                                                            consuleStore.clearFilter();
                                                            consuleStore.filterBy(function(row) {
                                                                return (row.get('VillageId') === id) ? true : false;
                                                            });

                                                        }
                                                    }
                                                },
                                                consuleCombo = {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'კონსული',
                                                    id: "consuleCombo",
                                                    name: 'consul',
                                                    store: consuleStore = Ext.create('Ext.data.Store',
                                                        {
                                                            fields: [
                                                                { name: 'Id' }, { name: 'Consul' },
                                                                { name: 'VillageId' }
                                                            ],
                                                            autoLoad: true,
                                                            proxy: {
                                                                type: 'ajax',
                                                                url: Helpers.serviceUrl + "Core/SyncService",
                                                                method: "GET",
                                                                timeout: 90000,
                                                                headers: {
                                                                    "Authorization": localStorage.getItem('token')
                                                                },
                                                                reader: {
                                                                    type: 'json',
                                                                    rootProperty: 'Result.syncModel.Consuls'
                                                                }
                                                            }
                                                        }),
                                                    valueField: 'Id',
                                                    displayField: 'Consul',
                                                    typeAhead: true,
                                                    queryMode: 'local',
                                                    emptyText: ''
                                                },
                                                reportTypeCombo = {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'რეპორტის ტიპი',
                                                    name: 'reportType',
                                                    id: "reportTypeCombo",
                                                    store: storeReportTypes,
                                                    valueField: 'id',
                                                    displayField: 'name',
                                                    typeAhead: true,
                                                    queryMode: 'local',
                                                    emptyText: ''
                                                },
                                                dateFrom = {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'დან',
                                                    id: 'fromDate',
                                                    name: 'fromDate',
                                                    allowBlank: false
                                                },
                                                dateTo = {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'მდე',
                                                    id: 'toDate',
                                                    name: 'toDate',
                                                    allowBlank: false
                                                },
                                                {
                                                    xtype: 'button',
                                                    text: 'ძებნა',
                                                    scale: 'medium',
                                                    iconAlign: 'right',


                                                    handler: function() {


                                                        var sendData = {
                                                            type: Ext.getCmp('reportTypeCombo').getValue(),
                                                            branch: Ext.getCmp('branchCombo').getValue(),
                                                            consul: Ext.getCmp('consuleCombo').getValue(),
                                                            from: Ext.getCmp('fromDate').getValue(),
                                                            to: Ext.getCmp('toDate').getValue()
                                                        }

                                                        var tabName = sendData.type === 1
                                                            ? "კონსულის განაცხადების სტატუს რეპორტი"
                                                            : "";


                                                        console.log(sendData);

                                                        Ext.Ajax.request({
                                                            url: Helpers.serviceUrl + "Core/report",
                                                            method: "POST",
                                                            timeout: 90000,
                                                            jsonData: JSON.stringify(sendData),
                                                            headers: {
                                                                "Authorization": localStorage.getItem('token')
                                                            },
                                                            success: function(result) {
                                                                var resultObj = Ext.decode(result.responseText);

                                                                var data = resultObj.Result.data;

                                                                console.log(data);
                                                                if (sendData.type === 1) {
                                                                    for (key in data) {
                                                                        data[key]["Sum"] =
                                                                            parseInt(data[key].Approved) +
                                                                            parseInt(data[key].Canceled) +
                                                                            parseInt(data[key].Issued) +
                                                                            parseInt(data[key].Pending) +
                                                                            parseInt(data[key].Refused);
                                                                    }
                                                                }

                                                                var gridStore = new Ext.data.Store({
                                                                    model: 'ReportModel1',
                                                                    data: data,
                                                                    reader: {
                                                                        type: 'json'
                                                                    },
                                                                    proxy: {
                                                                        type: 'ajax',
                                                                        url: 'objects.json',
                                                                        autoLoad: true,
                                                                        reader: {
                                                                            type: 'json',
                                                                            //root: 'Objects',
                                                                            rootProperty: 'Objects'
                                                                        }
                                                                    }
                                                                });


                                                                Helpers.addMainTabPanelItem(Ext.create("Ext.grid.Panel",
                                                                        {
                                                                            xtype: 'array-grid',
                                                                            title: tabName,
                                                                            name: tabName,
                                                                            store: gridStore,
                                                                            columns: [
                                                                                {
                                                                                    text: 'კონსული',
                                                                                    flex: 1,
                                                                                    sortable: false,
                                                                                    dataIndex: 'ConsuleName'
                                                                                },
                                                                                {
                                                                                    text: 'სოფელი',
                                                                                    flex: 1,
                                                                                    sortable: false,
                                                                                    dataIndex: 'VillageName'
                                                                                },
                                                                                {
                                                                                    text: 'ფილიალი',
                                                                                    flex: 1,
                                                                                    sortable: false,
                                                                                    dataIndex: 'BranchName'
                                                                                },
                                                                                {
                                                                                    text: 'დამტკიცებული',
                                                                                    flex: 1,
                                                                                    sortable: false,
                                                                                    dataIndex: 'Approved'
                                                                                },
                                                                                {
                                                                                    text: 'გაუქმებული',
                                                                                    flex: 1,
                                                                                    sortable: false,
                                                                                    dataIndex: 'Canceled'
                                                                                },
                                                                                {
                                                                                    text: 'გაცემული',
                                                                                    flex: 1,
                                                                                    sortable: false,
                                                                                    dataIndex: 'Issued'
                                                                                },
                                                                                {
                                                                                    text: 'მოლოდინში',
                                                                                    flex: 1,
                                                                                    sortable: false,
                                                                                    dataIndex: 'Pending'
                                                                                },
                                                                                {
                                                                                    text: 'დაუარებული',
                                                                                    flex: 1,
                                                                                    sortable: false,
                                                                                    dataIndex: 'Refused'
                                                                                },
                                                                                {
                                                                                    text: 'ჯამი',
                                                                                    flex: 1,
                                                                                    sortable: false,
                                                                                    dataIndex: 'Sum'
                                                                                }
                                                                            ]
                                                                        }),
                                                                    false);

                                                                console.log(resultObj);

                                                            },
                                                            failure: function(result) {
                                                                try {
                                                                    var resp = JSON.parse(result.responseText);
                                                                    console.log(resp);

                                                                } catch (e) {
                                                                    Ext.MessageBox.show({
                                                                        title: 'შეცდომა',
                                                                        msg: 'შეცდომა',
                                                                        icon: Ext.MessageBox.ERROR
                                                                    });
                                                                }
                                                            }
                                                            //,jsonData: params
                                                        });
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                            afterrender: function() {


                            }
                        }
                    ]
                });
            Ext.Ajax.request({
                url: Helpers.serviceUrl + "Core/SyncService",
                method: "GET",
                timeout: 90000,
                headers: {
                    "Authorization": localStorage.getItem('token')
                },
                success: function(result) {
                    var resultObj = Ext.decode(result.responseText);
                    console.log(resultObj)
                },
                failure: function(result) {
                    try {
                        var resp = JSON.parse(result.responseText);

                    } catch (e) {
                        Ext.MessageBox.show({
                            title: 'შეცდომა',
                            msg: 'შეცდომა',
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                }
                //,jsonData: params
            });
            this.callParent();
        }
    })