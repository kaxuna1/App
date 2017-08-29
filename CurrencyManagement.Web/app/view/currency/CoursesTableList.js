Ext.define('CurrencyApp.view.currency.CoursesTableList', {
    extend: 'Ext.Panel',
    alias: 'widget.coursesTableList',
    title: 'კურსების ტაბლო',
    layout: { type: 'vbox', align: 'stretch' },
    initComponent: function () {
        var me = this;

        var grdStore = Ext.create('CurrencyApp.store.CoursesTableStore', {
            pageSize: 25
        });

        me.bodyPadding = 5;


        me.items = [{
            xtype: 'fieldset',
            title: 'ფილტრი',
            collapsible: true,
            collapsed: true,
            items: [{
                xtype: 'form',
                itemId: 'frmCoursesTableList',
                margin: '0 0 5 0',
                border: false,
                layout: { type: 'hbox', align: 'stretch' },
                items: [{
                    xtype: 'container',
                    layout: { type: 'hbox', align: 'stretch' },
                    items: [{
                        xtype: 'datefield',
                        itemId: 'dtmSearchStartDate',
                        name: 'StartDate',
                        flex: 1,
                        value: new Date(),
                        allowBlank: false,
                        submitFormat: 'Y-m-d H:i',
                        format: 'Y-m-d H:i',
                        emptyText: 'თარიღი',
                        listeners: {
                            select: function (field, value, eOpts) {
                                Helpers.setDateOnToDay(field, value);
                            }
                        }
                    }, {
                        xtype: 'searchbutton',
                        itemId: 'btnSearchCoursesTableList',
                        margin: '0 0 0 5',
                        text: 'გაფილტვრა'
                    }, {
                        xtype: 'clearButton',
                        hidden: true,
                        itemId: 'btnClearSearchCoursesTableList',
                        margin: '0 0 0 5'
                    }]
                }]
            }]
        }, {
            xtype: 'appGrid',
            itemId: 'grdCoursesTableList',
            store: grdStore,
            flex: 1,
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                border: false,
                items: [{
                    xtype: 'button',
                    name: 'coursesTableListManipulation',
                    manupulation: 'Export',
                    operationListPanel: me,
                    text: 'ექსპორტი',
                    tooltip: 'ექსპორტი',
                    iconCls: 'x-fa fa-download'
                }, {
                    xtype: 'button',
                    name: 'coursesTableListManipulation',
                    manupulation: 'Import',
                    operationListPanel: me,
                    text: 'იმპორტი',
                    tooltip: 'იმპორტი',
                    iconCls: 'x-fa fa-upload'
                }]
            }],
            columns: [],
            bbar: Helpers.createPagingToolbar(grdStore.pageSize, grdStore)
        }]

        this.callParent();
    }
})