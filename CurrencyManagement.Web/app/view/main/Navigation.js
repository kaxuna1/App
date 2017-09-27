Ext.define('ReportModel1',
    {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'Approved', type: 'string'},
            {name: 'BranchName', type: 'string'},
            {name: 'Canceled', type: 'string'},
            {name: 'ConsuleName', type: 'string'},
            {name: 'Issued', type: 'string'},
            {name: 'Pending', type: 'string'},
            {name: 'Refused', type: 'string'},
            {name: 'VillageName', type: 'string'},
            {name: 'Sum', type: 'string'}
        ]
    });
Ext.define('ReportModel2',
    {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'ConsuleName', type: 'string'},
            {name: 'BranchName', type: 'string'},
            {name: 'LoanId', type: 'string'},
            {name: 'LoanPeriod', type: 'string'},
            {name: 'LoanSize', type: 'string'},
            {name: 'LoanCurrency', type: 'string'},
            {name: 'ProductCode', type: 'string'},
            {name: 'LoanCustomer', type: 'string'},
            {name: 'RelativeConn', type: 'string'},
            {name: 'PDDays', type: 'string'},
            {name: 'PDCount', type: 'string'},
            {name: 'LoanValueDate', type: 'string'},
            {name: 'LoanMaturityDate', type: 'string'}
        ]
    });
Ext.define('BranchesModel',
    {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'active', type: 'boolean'},
            {name: 'CityId', type: 'int'},
            {name: 'City', type: 'string'},
            {name: 'Id', type: 'int'},
            {name: 'Name', type: 'string'},
            {name: 'Region', type: 'string'},
            {name: 'RegionId', type: 'int'},
            {name: 'accepted', type: 'int'},
            {name: 'createdBy', type: 'string'},
            {name: 'lastModifyBy', type: 'string'},
            {name: 'statusName', type: 'string'},
            {name: 'statusCreateDate', type: 'string'},
            {name: 'statusModifyDate', type: 'string'}
        ]
    });

Ext.define('VilagesModel',
    {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'Village', type: 'string'},
            {name: 'komli', type: 'string'},
            {name: 'shegcevadobaSul', type: 'string'},
            {name: 'shegcevadobaSesxi', type: 'string'},
            {name: 'shegcevadobaSxva', type: 'string'},
            {name: 'mimartuleba', type: 'string'},
            {name: 'komliLeft', type: 'string'}
        ]
    });

Ext.define('VilageOfficerModel',
    {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'officerId', type: 'string'},
            {name: 'komli', type: 'string'},
            {name: 'validFrom', type: 'string'},
            {name: 'FullName', type: 'string'}
        ]
    });
Ext.define('CurrencyApp.view.main.Navigation',
    {
        extend: 'Ext.panel.Panel',
        alias: 'widget.navigation',
        initComponent: function () {

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
                data: [
                    [1, 'კონსულის განაცხადების სტატუს რეპორტი'],
                    [2, 'კონსულების კრედოში არსებული სესხების შესახებ რეპორტი'],
                    [3, 'კონსულის პორთფელის რეპორტი']
                ]
            });

            Ext.apply(this,
                {
                    border: false,
                    layout: {type: 'vbox', align: 'stretch'},
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
                                                            fields: [{name: 'Id'}, {name: 'Name'}],
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
                                                            branchStoreS.clearFilter();
                                                            branchStoreS.filterBy(function (row) {
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
                                                                {name: 'Id'}, {name: 'Name'}, {name: 'Region'}
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
                                                        select: function (a, b, c) {
                                                            var id = b.data.Id;
                                                            vilageStoreS.clearFilter();
                                                            vilageStoreS.filterBy(function (row) {
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
                                                                {name: 'Id'}, {name: 'Village'},
                                                                {name: 'BranchId'}
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
                                                            consuleStoreS.clearFilter();
                                                            consuleStoreS.filterBy(function (row) {
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


                                                    handler: function () {


                                                        var sendData = {}

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
                                                            success: function (result) {
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
                                                                    {}),
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
                                                        });
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
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
                                                            fields: [{name: 'Id'}, {name: 'Name'}],
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
                                                                {name: 'Id'}, {name: 'Name'}, {name: 'Region'}
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
                                                                {name: 'Id'}, {name: 'Village'},
                                                                {name: 'BranchId'}
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
                                                                {name: 'Id'}, {name: 'Consul'},
                                                                {name: 'VillageId'}
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
                                                                {name: 'Id'}, {name: 'Consul'},
                                                                {name: 'VillageId'}
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


                                                        var sendData = {}

                                                        var tabName = sendData.type === 1
                                                            ? "კონსულის განაცხადების სტატუს რეპორტი"
                                                            : "";


                                                        console.log(sendData);

                                                        Helpers.addMainTabPanelItem(Ext.create("Ext.form.Panel",
                                                            {
                                                                xtype: 'form',
                                                                title: 'ინფო პანელი კონსულის ჭრილში',
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
                                                                        items: [
                                                                            {
                                                                                xtype: 'container',
                                                                                layout: 'hbox',
                                                                                defaultType: 'textfield',
                                                                                margin: '0 0 5 0',

                                                                                items: [
                                                                                    {
                                                                                        fieldLabel: 'სოფლის კოდი',
                                                                                        name: 'vilageCode',
                                                                                        value: 12331,
                                                                                        flex: 3,
                                                                                        allowBlank: false
                                                                                    }, {
                                                                                        fieldLabel: 'მოსახლეობა',
                                                                                        name: 'population',
                                                                                        value: 400,
                                                                                        flex: 3,
                                                                                        labelWidth: 100,

                                                                                    }
                                                                                ]
                                                                            }, {
                                                                                xtype: 'container',
                                                                                layout: 'hbox',
                                                                                defaultType: 'textfield',
                                                                                margin: '0 0 5 0',

                                                                                items: [
                                                                                    {
                                                                                        fieldLabel: 'რეგიონი',
                                                                                        name: 'region',
                                                                                        value: 'გურია',
                                                                                        flex: 3,
                                                                                        allowBlank: false
                                                                                    }, {
                                                                                        fieldLabel: 'კოეფიციენტი',
                                                                                        name: 'coeficient',
                                                                                        value: 14,
                                                                                        flex: 3,
                                                                                        labelWidth: 100,

                                                                                    }
                                                                                ]
                                                                            }, {
                                                                                xtype: 'container',
                                                                                layout: 'hbox',
                                                                                defaultType: 'textfield',
                                                                                margin: '0 0 5 0',

                                                                                items: [
                                                                                    {
                                                                                        fieldLabel: 'ფილიალი',
                                                                                        name: 'filial',
                                                                                        value: 'ოზურგეთი',
                                                                                        flex: 3,
                                                                                        allowBlank: false
                                                                                    }, {
                                                                                        fieldLabel: 'კომლი',
                                                                                        name: 'comli',
                                                                                        value: 700,
                                                                                        flex: 3,
                                                                                        labelWidth: 100,

                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        xtype: "panel",
                                                                        title: "Panel",
                                                                        items: [
                                                                            {
                                                                                layout: "column",
                                                                                items: [
                                                                                    {
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
                                                                                                items: [
                                                                                                    {
                                                                                                        xtype: 'container',
                                                                                                        layout: 'hbox',
                                                                                                        defaultType: 'textfield',
                                                                                                        margin: '0 0 5 0',

                                                                                                        items: [
                                                                                                            {
                                                                                                                fieldLabel: 'სოფლის კოდი',
                                                                                                                name: 'vilageCode',
                                                                                                                value: 12331,
                                                                                                                flex: 3,
                                                                                                                allowBlank: false
                                                                                                            }
                                                                                                        ]
                                                                                                    }, {
                                                                                                        xtype: 'container',
                                                                                                        layout: 'hbox',
                                                                                                        defaultType: 'textfield',
                                                                                                        margin: '0 0 5 0',

                                                                                                        items: [
                                                                                                            {
                                                                                                                fieldLabel: 'რეგიონი',
                                                                                                                name: 'region',
                                                                                                                value: 'გურია',
                                                                                                                flex: 3,
                                                                                                                allowBlank: false
                                                                                                            }
                                                                                                        ]
                                                                                                    }, {
                                                                                                        xtype: 'container',
                                                                                                        layout: 'hbox',
                                                                                                        defaultType: 'textfield',
                                                                                                        margin: '0 0 5 0',

                                                                                                        items: [
                                                                                                            {
                                                                                                                fieldLabel: 'ფილიალი',
                                                                                                                name: 'filial',
                                                                                                                value: 'ოზურგეთი',
                                                                                                                flex: 3,
                                                                                                                allowBlank: false
                                                                                                            }
                                                                                                        ]
                                                                                                    }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
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
                                },
                                {
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
                                                            fields: [{name: 'Id'}, {name: 'Name'}],
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
                                                            branchStore.clearFilter();
                                                            branchStore.filterBy(function (row) {
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
                                                                {name: 'Id'}, {name: 'Name'}, {name: 'Region'}
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
                                                        select: function (a, b, c) {
                                                            var id = b.data.Id;
                                                            vilageStore.clearFilter();
                                                            vilageStore.filterBy(function (row) {
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
                                                                {name: 'Id'}, {name: 'Village'},
                                                                {name: 'BranchId'}
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
                                                            consuleStore.clearFilter();
                                                            consuleStore.filterBy(function (row) {
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
                                                                {name: 'Id'}, {name: 'Consul'},
                                                                {name: 'VillageId'}
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


                                                    handler: function () {


                                                        var sendData = {
                                                            type: Ext.getCmp('reportTypeCombo').getValue(),
                                                            branch: Ext.getCmp('branchCombo').getValue(),
                                                            consul: Ext.getCmp('consuleCombo').getValue(),
                                                            from: Ext.getCmp('fromDate').getValue(),
                                                            to: Ext.getCmp('toDate').getValue()
                                                        }

                                                        var tabName = sendData.type === 1
                                                            ? "კონსულის განაცხადების სტატუს რეპორტი"
                                                            : sendData.type === 2
                                                                ? "კონსულების კრედოში არსებული სესხების შესახებ რეპორტი"
                                                                : sendData.type === 3
                                                                    ? "კონსულის პორთფელის რეპორტი"
                                                                    : "";


                                                        console.log(sendData);


                                                        Ext.Ajax.request({
                                                            url: Helpers.serviceUrl + "Core/report" + sendData.type,
                                                            method: "POST",
                                                            timeout: 90000,
                                                            jsonData: JSON.stringify(sendData),
                                                            headers: {
                                                                "Authorization": localStorage.getItem('token')
                                                            },
                                                            success: function (result) {
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


                                                                    Helpers.addMainTabPanelItem(Ext.create(
                                                                        "Ext.grid.Panel",
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
                                                                }


                                                                if (sendData.type === 2) {

                                                                    var gridStore = new Ext.data.Store({
                                                                        model: 'ReportModel2',
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

                                                                    Helpers.addMainTabPanelItem(Ext.create(
                                                                        "Ext.grid.Panel",
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
                                                                                    text: 'ფილიალი',
                                                                                    flex: 1,
                                                                                    sortable: false,
                                                                                    dataIndex: 'BranchName'
                                                                                },
                                                                                {
                                                                                    text: 'ვალუტა',
                                                                                    flex: 1,
                                                                                    sortable: false,
                                                                                    dataIndex: 'LoanCurrency'
                                                                                },
                                                                                {
                                                                                    text: 'კლიენტი',
                                                                                    flex: 1,
                                                                                    sortable: false,
                                                                                    dataIndex: 'LoanCustomer'
                                                                                },
                                                                                {
                                                                                    text: 'LD',
                                                                                    flex: 1,
                                                                                    sortable: false,
                                                                                    dataIndex: 'LoanId'
                                                                                },
                                                                                {
                                                                                    text: 'დაფარვის თარიღი',
                                                                                    flex: 1,
                                                                                    sortable: false,
                                                                                    dataIndex: 'LoanMaturityDate'
                                                                                },
                                                                                {
                                                                                    text: 'ვადა',
                                                                                    flex: 1,
                                                                                    sortable: false,
                                                                                    dataIndex: 'LoanPeriod'
                                                                                },
                                                                                {
                                                                                    text: 'თანხა',
                                                                                    flex: 1,
                                                                                    sortable: false,
                                                                                    dataIndex: 'LoanSize'
                                                                                },
                                                                                {
                                                                                    text: 'გაცემის თარიღი',
                                                                                    flex: 1,
                                                                                    sortable: false,
                                                                                    dataIndex: 'LoanValueDate'
                                                                                },
                                                                                {
                                                                                    text: 'PDCount',
                                                                                    flex: 1,
                                                                                    sortable: false,
                                                                                    dataIndex: 'PDCount'
                                                                                },
                                                                                {
                                                                                    text: 'PDDays',
                                                                                    flex: 1,
                                                                                    sortable: false,
                                                                                    dataIndex: 'PDDays'
                                                                                },
                                                                                {
                                                                                    text: 'ProductCode',
                                                                                    flex: 1,
                                                                                    sortable: false,
                                                                                    dataIndex: 'ProductCode'
                                                                                },
                                                                                {
                                                                                    text: 'ნათესაური კავშირი',
                                                                                    flex: 1,
                                                                                    sortable: false,
                                                                                    dataIndex: 'RelativeConn'
                                                                                }
                                                                            ]
                                                                        }),
                                                                        false);


                                                                    console.log(result);
                                                                }


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
                                                        });
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    title: 'ინფორმაციის აღრიცხვა',
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
                                                    xtype: 'button',
                                                    text: 'სოფელში მომუშავე ოფიცრების აღრიცხვა',
                                                    scale: 'medium',
                                                    iconAlign: 'right',


                                                    handler: function () {


                                                        var sendData = {
                                                            type: Ext.getCmp('reportTypeCombo').getValue(),
                                                            branch: Ext.getCmp('branchCombo').getValue(),
                                                            consul: Ext.getCmp('consuleCombo').getValue(),
                                                            from: Ext.getCmp('fromDate').getValue(),
                                                            to: Ext.getCmp('toDate').getValue()
                                                        }

                                                        var tabName = "სოფელში მომუშავე ოფიცრების აღრიცხვა";


                                                        console.log(sendData);


                                                        Ext.Ajax.request({
                                                            url: Helpers.serviceUrl + "Core/branches",
                                                            method: "POST",
                                                            timeout: 90000,
                                                            jsonData: JSON.stringify(sendData),
                                                            headers: {
                                                                "Authorization": localStorage.getItem('token')
                                                            },
                                                            success: function (result) {
                                                                var resultObj = Ext.decode(result.responseText);

                                                                var data = resultObj.Result.data;

                                                                console.log(data);
                                                                var gridStore = new Ext.data.Store({
                                                                    model: 'BranchesModel',
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


                                                                var win = Ext.create('Ext.window.Window',
                                                                    {
                                                                        extend: 'Ext.window.Window',
                                                                        title: tabName,
                                                                        height: 500,
                                                                        width: 800,
                                                                        tbar: {
                                                                            overflowHandler: 'menu',
                                                                            items: [
                                                                                {
                                                                                    text: 'მოქმედებები',
                                                                                    iconCls: 'x-fa fa-users',
                                                                                    menu: {
                                                                                        xtype: 'menu',
                                                                                        plain: true,
                                                                                        items: {
                                                                                            xtype: 'buttongroup',
                                                                                            title: 'მოქმედებები',
                                                                                            columns: 2,
                                                                                            defaults: {
                                                                                                xtype: 'button',
                                                                                                scale: 'large',
                                                                                                iconAlign: 'left'
                                                                                            },
                                                                                            items: [
                                                                                                {
                                                                                                    colspan: 2,
                                                                                                    width: '100%',
                                                                                                    text: 'სტატუსის შეცვლა',
                                                                                                    scale: 'small',
                                                                                                    handler: function () {
                                                                                                        var grid =
                                                                                                            Ext
                                                                                                                .getCmp(
                                                                                                                    'branchesGrid');
                                                                                                        console.log(
                                                                                                            grid);
                                                                                                        if (grid
                                                                                                                .getSelectionModel()
                                                                                                                .hasSelection()
                                                                                                        ) {
                                                                                                            var
                                                                                                                row =
                                                                                                                    grid
                                                                                                                        .getSelectionModel()
                                                                                                                        .getSelection()
                                                                                                                        [0
                                                                                                                        ];
                                                                                                            var id =
                                                                                                                row
                                                                                                                    .get(
                                                                                                                        'Id');
                                                                                                            var branchId = id;
                                                                                                            var
                                                                                                                name =
                                                                                                                    row
                                                                                                                        .get(
                                                                                                                            "Name");


                                                                                                            /*Ext.Ajax.request({
                                                                                                             url: Helpers.serviceUrl + "Core/branches",
                                                                                                             method: "POST",
                                                                                                             timeout: 90000,
                                                                                                             jsonData: JSON.stringify(sendData),
                                                                                                             headers: {
                                                                                                             "Authorization": localStorage.getItem('token')
                                                                                                             },
                                                                                                             success: function (result){
                                                                                                             var resultObj = Ext.decode(result.responseText);

                                                                                                             var data = resultObj.Result.data;




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


                                                                                                            var
                                                                                                                win =
                                                                                                                    Ext
                                                                                                                        .create(
                                                                                                                            'Ext.window.Window',
                                                                                                                            {
                                                                                                                                extend: 'Ext.window.Window',
                                                                                                                                title: name,
                                                                                                                                height: 200,
                                                                                                                                width: 400,
                                                                                                                                layout: 'fit',
                                                                                                                                modal: true,
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
                                                                                                                                                fieldLabel: 'სტატუსი',
                                                                                                                                                id: "statusCombo",
                                                                                                                                                name: 'consul',
                                                                                                                                                store: consuleStore =
                                                                                                                                                    Ext
                                                                                                                                                        .create(
                                                                                                                                                            'Ext.data.Store',
                                                                                                                                                            {
                                                                                                                                                                fields: [
                                                                                                                                                                    {
                                                                                                                                                                        name: 'id'
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        name: 'name'
                                                                                                                                                                    }
                                                                                                                                                                ],
                                                                                                                                                                autoLoad: true,
                                                                                                                                                                proxy: {
                                                                                                                                                                    type: 'ajax',
                                                                                                                                                                    url: Helpers
                                                                                                                                                                        .serviceUrl +
                                                                                                                                                                    "Core/statusNames",
                                                                                                                                                                    method: "GET",
                                                                                                                                                                    timeout: 90000,
                                                                                                                                                                    headers: {
                                                                                                                                                                        "Authorization": localStorage
                                                                                                                                                                            .getItem(
                                                                                                                                                                                'token')
                                                                                                                                                                    },
                                                                                                                                                                    reader: {
                                                                                                                                                                        type: 'json',
                                                                                                                                                                        rootProperty: 'Result.data'
                                                                                                                                                                    }
                                                                                                                                                                }
                                                                                                                                                            }),
                                                                                                                                                valueField: 'id',
                                                                                                                                                displayField: 'name',
                                                                                                                                                typeAhead: true,
                                                                                                                                                queryMode: 'local',
                                                                                                                                                emptyText: ''
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                xtype: 'button',
                                                                                                                                                scale: 'large',
                                                                                                                                                iconAlign: 'left',
                                                                                                                                                colspan: 2,
                                                                                                                                                width: '100%',
                                                                                                                                                text: 'შენახვა',
                                                                                                                                                scale: 'small',
                                                                                                                                                handler: function () {
                                                                                                                                                    var
                                                                                                                                                        sendData =
                                                                                                                                                            {
                                                                                                                                                                status: Ext
                                                                                                                                                                    .getCmp(
                                                                                                                                                                        'statusCombo')
                                                                                                                                                                    .getValue(),
                                                                                                                                                                id: id
                                                                                                                                                            };


                                                                                                                                                    Ext
                                                                                                                                                        .Ajax
                                                                                                                                                        .request(
                                                                                                                                                            {
                                                                                                                                                                url: Helpers
                                                                                                                                                                    .serviceUrl +
                                                                                                                                                                "Core/statusChange",
                                                                                                                                                                method: "POST",
                                                                                                                                                                timeout: 90000,
                                                                                                                                                                jsonData: JSON
                                                                                                                                                                    .stringify(
                                                                                                                                                                        sendData),
                                                                                                                                                                headers: {
                                                                                                                                                                    "Authorization": localStorage
                                                                                                                                                                        .getItem(
                                                                                                                                                                            'token')
                                                                                                                                                                },
                                                                                                                                                                success: function (result) {
                                                                                                                                                                    var
                                                                                                                                                                        resultObj =
                                                                                                                                                                            Ext
                                                                                                                                                                                .decode(
                                                                                                                                                                                    result
                                                                                                                                                                                        .responseText);

                                                                                                                                                                    var
                                                                                                                                                                        data =
                                                                                                                                                                            resultObj
                                                                                                                                                                                .Result
                                                                                                                                                                                .data;


                                                                                                                                                                },
                                                                                                                                                                failure: function (result) {
                                                                                                                                                                    try {
                                                                                                                                                                        var
                                                                                                                                                                            resp =
                                                                                                                                                                                JSON
                                                                                                                                                                                    .parse(
                                                                                                                                                                                        result
                                                                                                                                                                                            .responseText);
                                                                                                                                                                        console
                                                                                                                                                                            .log(
                                                                                                                                                                                resp);

                                                                                                                                                                    } catch
                                                                                                                                                                        (e
                                                                                                                                                                        ) {
                                                                                                                                                                        Ext
                                                                                                                                                                            .MessageBox
                                                                                                                                                                            .show(
                                                                                                                                                                                {
                                                                                                                                                                                    title: 'შეცდომა',
                                                                                                                                                                                    msg: 'შეცდომა',
                                                                                                                                                                                    icon: Ext
                                                                                                                                                                                        .MessageBox
                                                                                                                                                                                        .ERROR
                                                                                                                                                                                });
                                                                                                                                                                    }
                                                                                                                                                                }
                                                                                                                                                                //,jsonData: params
                                                                                                                                                            });

                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        ]
                                                                                                                                    },
                                                                                                                                ]
                                                                                                                            }
                                                                                                                        );
                                                                                                            win
                                                                                                                .show();

                                                                                                        } else {
                                                                                                            alert(
                                                                                                                'გთხოვთ მონიშნეთ ფილიალი!')
                                                                                                        }
                                                                                                    }
                                                                                                }, {
                                                                                                    colspan: 2,
                                                                                                    width: '100%',
                                                                                                    text: 'დადასტურება',
                                                                                                    scale: 'small'
                                                                                                }, {
                                                                                                    colspan: 2,
                                                                                                    width: '100%',
                                                                                                    text: 'უარყოფა',
                                                                                                    scale: 'small'
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    }
                                                                                }
                                                                            ]
                                                                        },
                                                                        layout: 'fit',
                                                                        modal: true,
                                                                        items: [
                                                                            {
                                                                                xtype: 'grid',
                                                                                layout: 'fit',
                                                                                id: "branchesGrid",
                                                                                listeners: {
                                                                                    itemdblclick: function (dv,
                                                                                                            record,
                                                                                                            item,
                                                                                                            index,
                                                                                                            e) {


                                                                                        
                                                                                        
                                                                                        var id = record.data.Id;
                                                                                        var branchId = id;
                                                                                        var vilageFilterDate =
                                                                                            new Date();
                                                                                        var win2 = Ext.create(
                                                                                            'Ext.window.Window',
                                                                                            {
                                                                                                extend: 'Ext.window.Window',

                                                                                                title: tabName,

                                                                                                height: 700,

                                                                                                tbar: {
                                                                                                    overflowHandler: 'menu',
                                                                                                    items: [
                                                                                                        {
                                                                                                            xtype: 'button',
                                                                                                            colspan: 2,
                                                                                                            text: 'განახლება',
                                                                                                            scale: 'small',
                                                                                                            handler: function () {
                                                                                                                var
                                                                                                                    grid =
                                                                                                                        Ext
                                                                                                                            .getCmp(
                                                                                                                                'vilagesGrid');
                                                                                                                grid
                                                                                                                    .getStore()
                                                                                                                    .proxy
                                                                                                                    .extraParams =
                                                                                                                    {
                                                                                                                        id: id,
                                                                                                                        Date: Ext
                                                                                                                            .getCmp(
                                                                                                                                'villageFlterDate')
                                                                                                                            .getValue()
                                                                                                                    }
                                                                                                                grid
                                                                                                                    .getStore()
                                                                                                                    .load();
                                                                                                            }
                                                                                                        }, {
                                                                                                            xtype: 'datefield',
                                                                                                            colspan: 2,
                                                                                                            id: "villageFlterDate",
                                                                                                            scale: 'small',
                                                                                                            value: new
                                                                                                            Date()
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'button',
                                                                                                            colspan: 2,
                                                                                                            text: 'კომლის შეცვლა',
                                                                                                            scale: 'small',
                                                                                                            handler: function () {
                                                                                                                var
                                                                                                                    grid =
                                                                                                                        Ext
                                                                                                                            .getCmp(
                                                                                                                                'vilagesGrid');
                                                                                                                console
                                                                                                                    .log(
                                                                                                                        grid);
                                                                                                                if (
                                                                                                                    grid
                                                                                                                        .getSelectionModel()
                                                                                                                        .hasSelection()
                                                                                                                ) {
                                                                                                                    var
                                                                                                                        row =
                                                                                                                            grid
                                                                                                                                .getSelectionModel()
                                                                                                                                .getSelection()
                                                                                                                                [0
                                                                                                                                ];
                                                                                                                    var
                                                                                                                        id =
                                                                                                                            row
                                                                                                                                .get(
                                                                                                                                    'Id');
                                                                                                                    var
                                                                                                                        name =
                                                                                                                            row
                                                                                                                                .get(
                                                                                                                                    "Village");
                                                                                                                    var
                                                                                                                        win3 =
                                                                                                                            Ext
                                                                                                                                .create(
                                                                                                                                    'Ext.window.Window',
                                                                                                                                    {
                                                                                                                                        extend: 'Ext.window.Window',

                                                                                                                                        title: name,

                                                                                                                                        height: 200,
                                                                                                                                        width: 400,
                                                                                                                                        modal: true,
                                                                                                                                        items: [
                                                                                                                                            {
                                                                                                                                                xtype: 'fieldset',
                                                                                                                                                title: 'კომლების რაოდენობა',

                                                                                                                                                defaultType: 'textfield',
                                                                                                                                                defaults: {
                                                                                                                                                    anchor: '100%'
                                                                                                                                                },

                                                                                                                                                items: [
                                                                                                                                                    {
                                                                                                                                                        fieldLabel: 'კომლი',
                                                                                                                                                        name: 'komli',
                                                                                                                                                        id: 'komliCountField',
                                                                                                                                                        xtype: 'textfield'
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        xtype: 'datefield',
                                                                                                                                                        fieldLabel: 'ძალაში შესვლის თარიღი',
                                                                                                                                                        id: 'komliValidFromField',
                                                                                                                                                        allowBlank: false,
                                                                                                                                                        minValue: new
                                                                                                                                                        Date()
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        xtype: 'button',
                                                                                                                                                        scale: 'large',
                                                                                                                                                        iconAlign: 'left',
                                                                                                                                                        colspan: 2,
                                                                                                                                                        width: '100%',
                                                                                                                                                        text: 'შენახვა',
                                                                                                                                                        scale: 'small',
                                                                                                                                                        handler: function () {
                                                                                                                                                            var
                                                                                                                                                                sendData =
                                                                                                                                                                    {
                                                                                                                                                                        id: id,
                                                                                                                                                                        komli: Ext
                                                                                                                                                                            .getCmp(
                                                                                                                                                                                "komliCountField")
                                                                                                                                                                            .getValue(),
                                                                                                                                                                        validFrom: Ext
                                                                                                                                                                            .getCmp(
                                                                                                                                                                                "komliValidFromField")
                                                                                                                                                                            .getValue()
                                                                                                                                                                    };


                                                                                                                                                            Ext
                                                                                                                                                                .Ajax
                                                                                                                                                                .request(
                                                                                                                                                                    {
                                                                                                                                                                        url: Helpers
                                                                                                                                                                            .serviceUrl +
                                                                                                                                                                        "Core/komliChange",
                                                                                                                                                                        method: "POST",
                                                                                                                                                                        timeout: 90000,
                                                                                                                                                                        jsonData: JSON
                                                                                                                                                                            .stringify(
                                                                                                                                                                                sendData),
                                                                                                                                                                        headers: {
                                                                                                                                                                            "Authorization": localStorage
                                                                                                                                                                                .getItem(
                                                                                                                                                                                    'token')
                                                                                                                                                                        },
                                                                                                                                                                        success: function (result) {

                                                                                                                                                                            win3
                                                                                                                                                                                .close();
                                                                                                                                                                            grid
                                                                                                                                                                                .getStore()
                                                                                                                                                                                .load();

                                                                                                                                                                            var
                                                                                                                                                                                resultObj =
                                                                                                                                                                                    Ext
                                                                                                                                                                                        .decode(
                                                                                                                                                                                            result
                                                                                                                                                                                                .responseText);

                                                                                                                                                                            var
                                                                                                                                                                                data =
                                                                                                                                                                                    resultObj
                                                                                                                                                                                        .Result
                                                                                                                                                                                        .data;


                                                                                                                                                                        },
                                                                                                                                                                        failure: function (result) {
                                                                                                                                                                            Ext
                                                                                                                                                                                .MessageBox
                                                                                                                                                                                .show(
                                                                                                                                                                                    {
                                                                                                                                                                                        title: 'შეცდომა',
                                                                                                                                                                                        msg: 'შეცდომა',
                                                                                                                                                                                        icon: Ext
                                                                                                                                                                                            .MessageBox
                                                                                                                                                                                            .ERROR
                                                                                                                                                                                    });
                                                                                                                                                                            try {
                                                                                                                                                                                var
                                                                                                                                                                                    resp =
                                                                                                                                                                                        JSON
                                                                                                                                                                                            .parse(
                                                                                                                                                                                                result
                                                                                                                                                                                                    .responseText);
                                                                                                                                                                                console
                                                                                                                                                                                    .log(
                                                                                                                                                                                        resp);

                                                                                                                                                                            } catch
                                                                                                                                                                                (e
                                                                                                                                                                                ) {
                                                                                                                                                                                Ext
                                                                                                                                                                                    .MessageBox
                                                                                                                                                                                    .show(
                                                                                                                                                                                        {
                                                                                                                                                                                            title: 'შეცდომა',
                                                                                                                                                                                            msg: 'შეცდომა',
                                                                                                                                                                                            icon: Ext
                                                                                                                                                                                                .MessageBox
                                                                                                                                                                                                .ERROR
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
                                                                                                                                    });
                                                                                                                    win3
                                                                                                                        .show();

                                                                                                                } else {
                                                                                                                    alert(
                                                                                                                        "გთხოვთ მონიშნოთ სოფელი");
                                                                                                                }
                                                                                                            }
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'button',
                                                                                                            colspan: 2,
                                                                                                            text: 'ოფიცრის დამატება',
                                                                                                            scale: 'small',
                                                                                                            handler: function () {
                                                                                                                var
                                                                                                                    grid =
                                                                                                                        Ext
                                                                                                                            .getCmp(
                                                                                                                                'vilagesGrid');

                                                                                                                if (
                                                                                                                    grid
                                                                                                                        .getSelectionModel()
                                                                                                                        .hasSelection()
                                                                                                                ) {
                                                                                                                    var
                                                                                                                        row =
                                                                                                                            grid
                                                                                                                                .getSelectionModel()
                                                                                                                                .getSelection()
                                                                                                                                [0];
                                                                                                                    var
                                                                                                                        id =
                                                                                                                            row
                                                                                                                                .get(
                                                                                                                                    'Id');
                                                                                                                    var
                                                                                                                        name =
                                                                                                                            row
                                                                                                                                .get(
                                                                                                                                    "Village");
                                                                                                                    var
                                                                                                                        win4 =
                                                                                                                            Ext
                                                                                                                                .create(
                                                                                                                                    'Ext.window.Window',
                                                                                                                                    {
                                                                                                                                        extend: 'Ext.window.Window',

                                                                                                                                        title: name,

                                                                                                                                        height: 200,
                                                                                                                                        width: 400,
                                                                                                                                        modal: true,
                                                                                                                                        items: [
                                                                                                                                            {
                                                                                                                                                xtype: 'fieldset',
                                                                                                                                                title: 'კომლების რაოდენობა',

                                                                                                                                                defaultType: 'textfield',
                                                                                                                                                defaults: {
                                                                                                                                                    anchor: '100%'
                                                                                                                                                },

                                                                                                                                                items: [
                                                                                                                                                    {
                                                                                                                                                        xtype: 'combobox',
                                                                                                                                                        fieldLabel: 'ოფიცერი',
                                                                                                                                                        id: "officerForVilageCombo",
                                                                                                                                                        name: 'consul',
                                                                                                                                                        store: consuleStore =
                                                                                                                                                            Ext
                                                                                                                                                                .create(
                                                                                                                                                                    'Ext.data.Store',
                                                                                                                                                                    {
                                                                                                                                                                        fields: [
                                                                                                                                                                            {
                                                                                                                                                                                name: 'Id'
                                                                                                                                                                            },
                                                                                                                                                                            {
                                                                                                                                                                                name: 'FullName'
                                                                                                                                                                            }
                                                                                                                                                                        ],
                                                                                                                                                                        autoLoad: true,
                                                                                                                                                                        proxy: {
                                                                                                                                                                            type: 'ajax',
                                                                                                                                                                            url: Helpers
                                                                                                                                                                                .serviceUrl +
                                                                                                                                                                            "Core/getOfficers",
                                                                                                                                                                            method: "GET",
                                                                                                                                                                            timeout: 90000,
                                                                                                                                                                            extraParams:{
                                                                                                                                                                              branchId:  branchId
                                                                                                                                                                            },
                                                                                                                                                                            headers: {
                                                                                                                                                                                "Authorization": localStorage
                                                                                                                                                                                    .getItem(
                                                                                                                                                                                        'token')
                                                                                                                                                                            },
                                                                                                                                                                            reader: {
                                                                                                                                                                                type: 'json',
                                                                                                                                                                                rootProperty: 'Result.data'
                                                                                                                                                                            }
                                                                                                                                                                        }
                                                                                                                                                                    }),
                                                                                                                                                        valueField: 'Id',
                                                                                                                                                        displayField: 'FullName',
                                                                                                                                                        typeAhead: true,
                                                                                                                                                        queryMode: 'local',
                                                                                                                                                        emptyText: ''
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        fieldLabel: 'კომლი',
                                                                                                                                                        name: 'komli',
                                                                                                                                                        id: 'komliCountField',
                                                                                                                                                        xtype: 'textfield'
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        xtype: 'datefield',
                                                                                                                                                        fieldLabel: 'ძალაში შესვლის თარიღი',
                                                                                                                                                        id: 'komliValidFromField',
                                                                                                                                                        allowBlank: false,
                                                                                                                                                        minValue: new
                                                                                                                                                        Date()
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        xtype: 'button',
                                                                                                                                                        scale: 'large',
                                                                                                                                                        iconAlign: 'left',
                                                                                                                                                        colspan: 2,
                                                                                                                                                        width: '100%',
                                                                                                                                                        text: 'შენახვა',
                                                                                                                                                        scale: 'small',
                                                                                                                                                        handler: function () {
                                                                                                                                                            var
                                                                                                                                                                sendData =
                                                                                                                                                                    {
                                                                                                                                                                        id: id,
                                                                                                                                                                        komli: Ext
                                                                                                                                                                            .getCmp(
                                                                                                                                                                                "komliCountField")
                                                                                                                                                                            .getValue(),
                                                                                                                                                                        validFrom: Ext
                                                                                                                                                                            .getCmp(
                                                                                                                                                                                "komliValidFromField")
                                                                                                                                                                            .getValue()
                                                                                                                                                                    };


                                                                                                                                                            Ext
                                                                                                                                                                .Ajax
                                                                                                                                                                .request(
                                                                                                                                                                    {
                                                                                                                                                                        url: Helpers
                                                                                                                                                                            .serviceUrl +
                                                                                                                                                                        "Core/komliChange",
                                                                                                                                                                        method: "POST",
                                                                                                                                                                        timeout: 90000,
                                                                                                                                                                        jsonData: JSON
                                                                                                                                                                            .stringify(
                                                                                                                                                                                sendData),
                                                                                                                                                                        headers: {
                                                                                                                                                                            "Authorization": localStorage
                                                                                                                                                                                .getItem(
                                                                                                                                                                                    'token')
                                                                                                                                                                        },
                                                                                                                                                                        success: function (result) {

                                                                                                                                                                            win3
                                                                                                                                                                                .close();
                                                                                                                                                                            grid
                                                                                                                                                                                .getStore()
                                                                                                                                                                                .load();

                                                                                                                                                                            var
                                                                                                                                                                                resultObj =
                                                                                                                                                                                    Ext
                                                                                                                                                                                        .decode(
                                                                                                                                                                                            result
                                                                                                                                                                                                .responseText);

                                                                                                                                                                            var
                                                                                                                                                                                data =
                                                                                                                                                                                    resultObj
                                                                                                                                                                                        .Result
                                                                                                                                                                                        .data;


                                                                                                                                                                        },
                                                                                                                                                                        failure: function (result) {
                                                                                                                                                                            Ext
                                                                                                                                                                                .MessageBox
                                                                                                                                                                                .show(
                                                                                                                                                                                    {
                                                                                                                                                                                        title: 'შეცდომა',
                                                                                                                                                                                        msg: 'შეცდომა',
                                                                                                                                                                                        icon: Ext
                                                                                                                                                                                            .MessageBox
                                                                                                                                                                                            .ERROR
                                                                                                                                                                                    });
                                                                                                                                                                            try {
                                                                                                                                                                                var
                                                                                                                                                                                    resp =
                                                                                                                                                                                        JSON
                                                                                                                                                                                            .parse(
                                                                                                                                                                                                result
                                                                                                                                                                                                    .responseText);
                                                                                                                                                                                console
                                                                                                                                                                                    .log(
                                                                                                                                                                                        resp);

                                                                                                                                                                            } catch
                                                                                                                                                                                (e
                                                                                                                                                                                ) {
                                                                                                                                                                                Ext
                                                                                                                                                                                    .MessageBox
                                                                                                                                                                                    .show(
                                                                                                                                                                                        {
                                                                                                                                                                                            title: 'შეცდომა',
                                                                                                                                                                                            msg: 'შეცდომა',
                                                                                                                                                                                            icon: Ext
                                                                                                                                                                                                .MessageBox
                                                                                                                                                                                                .ERROR
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
                                                                                                                                    });
                                                                                                                    win4
                                                                                                                        .show();

                                                                                                                } else {
                                                                                                                    alert(
                                                                                                                        "გთხოვთ მონიშნოთ სოფელი");
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    ]
                                                                                                },

                                                                                                width: 900,


                                                                                                layout: {
                                                                                                    type: 'vbox',
                                                                                                    align: 'stretch'
                                                                                                },

                                                                                                modal: true,

                                                                                                items: [
                                                                                                    {
                                                                                                        xtype: 'grid',
                                                                                                        id: 'vilagesGrid',
                                                                                                        margin: '5 0 0 0',
                                                                                                        store: new Ext.data
                                                                                                            .Store({
                                                                                                                autoLoad: true,
                                                                                                                model: 'VilagesModel',

                                                                                                                reader: {
                                                                                                                    type: 'json'
                                                                                                                },
                                                                                                                proxy: {
                                                                                                                    type: 'ajax',
                                                                                                                    url: Helpers
                                                                                                                        .serviceUrl +
                                                                                                                    "Core/GetVilages",
                                                                                                                    actionMethods: {
                                                                                                                        create: 'GET',
                                                                                                                        read: 'GET',
                                                                                                                        update: 'GET',
                                                                                                                        destroy: 'GET'
                                                                                                                    },
                                                                                                                    extraParams: {
                                                                                                                        Id: id,
                                                                                                                        Date: vilageFilterDate

                                                                                                                    },
                                                                                                                    timeout: 90000,
                                                                                                                    headers: {
                                                                                                                        "Authorization": localStorage
                                                                                                                            .getItem(
                                                                                                                                'token')
                                                                                                                    },
                                                                                                                    reader: {
                                                                                                                        type: 'json',
                                                                                                                        rootProperty: 'Result.data'
                                                                                                                    }
                                                                                                                }
                                                                                                            }),
                                                                                                        listeners: {
                                                                                                            itemclick: function (dv,
                                                                                                                                 record,
                                                                                                                                 item,
                                                                                                                                 index,
                                                                                                                                 e) {
                                                                                                                var id = record.data.Id;
                                                                                                                //alert(id);


                                                                                                                var date = Ext
                                                                                                                    .getCmp('vilagesGrid')
                                                                                                                    .getStore()
                                                                                                                    .proxy
                                                                                                                    .extraParams.Date;

                                                                                                                var grid = Ext
                                                                                                                    .getCmp(
                                                                                                                        'villageOfficersGrid');
                                                                                                                grid.getStore()
                                                                                                                    .proxy
                                                                                                                    .extraParams = {
                                                                                                                    id: id,
                                                                                                                    Date: date
                                                                                                                }
                                                                                                                grid.getStore().load();


                                                                                                            }
                                                                                                        },
                                                                                                        columns: [
                                                                                                            {
                                                                                                                text: 'სოფელი',

                                                                                                                flex: 1,

                                                                                                                sortable: false,

                                                                                                                dataIndex: 'Village'

                                                                                                            }, {
                                                                                                                text: 'კომლი',

                                                                                                                flex: 1,

                                                                                                                sortable: false,

                                                                                                                dataIndex: 'komli'

                                                                                                            }, {
                                                                                                                text: 'შეღწ. სულ',

                                                                                                                flex: 1,

                                                                                                                sortable: false,

                                                                                                                dataIndex: 'shegcevadobaSul'

                                                                                                            }, {
                                                                                                                text: 'შეღწ. სესხი',

                                                                                                                flex: 1,

                                                                                                                sortable: false,

                                                                                                                dataIndex: 'shegcevadobaSesxi'

                                                                                                            }, {
                                                                                                                text: 'შეღწ. სხვა',

                                                                                                                flex: 1,

                                                                                                                sortable: false,

                                                                                                                dataIndex: 'shegcevadobaSxva'

                                                                                                            }, {
                                                                                                                text: 'მიმართულება',

                                                                                                                flex: 1,

                                                                                                                sortable: false,

                                                                                                                dataIndex: 'mimartuleba'

                                                                                                            }, {
                                                                                                                text: 'დარჩენილი კომლი',

                                                                                                                flex: 1,

                                                                                                                sortable: false,

                                                                                                                dataIndex: 'komliLeft'

                                                                                                            }
                                                                                                        ],
                                                                                                        flex: 1
                                                                                                    }, {
                                                                                                        xtype: 'container',
                                                                                                        margin: '5 0 0 0',
                                                                                                        layout: {
                                                                                                            type: 'hbox',
                                                                                                            align: 'stretch'
                                                                                                        },
                                                                                                        flex: 1,
                                                                                                        items: [
                                                                                                            {
                                                                                                                xtype: 'grid',
                                                                                                                flex: 1,
                                                                                                                id: "villageOfficersGrid",
                                                                                                                store: new Ext.data
                                                                                                                    .Store({
                                                                                                                        autoLoad: true,
                                                                                                                        model: 'VilageOfficerModel',

                                                                                                                        reader: {
                                                                                                                            type: 'json'
                                                                                                                        },
                                                                                                                        proxy: {
                                                                                                                            type: 'ajax',
                                                                                                                            url: Helpers
                                                                                                                                .serviceUrl +
                                                                                                                            "Core/GetVilageOfficers",
                                                                                                                            extraParams: {},
                                                                                                                            timeout: 90000,
                                                                                                                            headers: {
                                                                                                                                "Authorization": localStorage
                                                                                                                                    .getItem(
                                                                                                                                        'token')
                                                                                                                            },
                                                                                                                            reader: {
                                                                                                                                type: 'json',
                                                                                                                                rootProperty: 'Result.data'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }),
                                                                                                                columns: [
                                                                                                                    {
                                                                                                                        text: 'ოფიცერი',

                                                                                                                        flex: 1,

                                                                                                                        sortable: false,

                                                                                                                        dataIndex: 'FullName'

                                                                                                                    },
                                                                                                                    {
                                                                                                                        text: 'კომლი',

                                                                                                                        flex: 1,

                                                                                                                        sortable: false,

                                                                                                                        dataIndex: 'komli'

                                                                                                                    }
                                                                                                                ],
                                                                                                            }, {
                                                                                                                xtype: 'container',
                                                                                                                flex: 2
                                                                                                            }
                                                                                                        ]

                                                                                                    }, {
                                                                                                        xtype: 'grid',
                                                                                                        margin: '5 0 0 0',
                                                                                                        title: 'test3',
                                                                                                        flex: 1
                                                                                                    }
                                                                                                ]

                                                                                            });

                                                                                        win2.show();

                                                                                    }


                                                                                },
                                                                                store: gridStore,
                                                                                columns: [
                                                                                    {
                                                                                        text: 'ფილიალი',
                                                                                        flex: 1,
                                                                                        sortable: false,
                                                                                        dataIndex: 'Name'
                                                                                    },
                                                                                    {
                                                                                        text: 'სტატუსი',
                                                                                        flex: 1,
                                                                                        sortable: false,
                                                                                        dataIndex: 'statusName'
                                                                                    },
                                                                                    {
                                                                                        text: 'სტატუსის შეცვლის თარიღი',
                                                                                        flex: 1,
                                                                                        sortable: false,
                                                                                        dataIndex: 'statusCreateDate'
                                                                                    },
                                                                                    {
                                                                                        text: 'სტატუსის შეცვლის სისტემური თარიღი',
                                                                                        flex: 1,
                                                                                        sortable: false,
                                                                                        dataIndex: 'statusModifyDate'
                                                                                    },
                                                                                    {
                                                                                        text: 'სტატუსის შემცვლელი მომხმარებელი',
                                                                                        flex: 1,
                                                                                        sortable: false,
                                                                                        dataIndex: 'createdBy'
                                                                                    },
                                                                                    {
                                                                                        text: 'ბოლო დამადასტურებელი მომხმარებელი',
                                                                                        flex: 1,
                                                                                        sortable: false,
                                                                                        dataIndex: 'lastModifyBy'
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    });
                                                                win.show();


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
                                                        });
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                            afterrender: function () {


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
                success: function (result) {
                    var resultObj = Ext.decode(result.responseText);
                    console.log(resultObj)
                },
                failure: function (result) {
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