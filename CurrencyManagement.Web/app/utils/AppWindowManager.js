Ext.define('CurrencyApp.utils.AppWindowManager', {
    alternateClassName: ['WinManager'],
    singleton: true,
    config: {
        containerId: 'mainContainer',
        taskbar: 'taskbar',
        winHeight: 600,
        winWidth: 800,
        state: {
            normal: 1,
            minimized: 2,
            maximize: 3,
            focused: 4
        }
    },
    constructor: function (cfg) {
        this.initConfig(cfg);
    },
    createWindow: function (item, mainWindow) {
        var win;

        if (mainWindow) {
           
            win = Ext.getCmp(Ext.String.format('win_{0}', item.id));
            if (!win) {
              
                win = this.addWindow(item, mainWindow);
                Ext.getCmp(this.getContainerId()).add(win);

                this.addItemToTaskbar({
                    winId: win.id,
                    text: win.title,
                    iconCls: win.iconCls
                });
            } else {
                win.focus();
            }
        } else {
            win = this.addWindow(item, mainWindow);
            this.addChild(item.parent.id, win.id);
        }

        this.showWin(win);
        return win;


    },
    //windows
    showWin: function (w) {
        var x = 30;
        var y = 40;
        var windows = [];

        if (w.parentId) {
            var pW = this.getWindowById(w.parentId);
            if (pW) {
                var pos = pW.getPosition();
                var mWidth = pW.width / 2;
                var mHeight = pW.height / 2;

                var winWidth = w.items.items[0].width;
                var winHeight = w.items.items[0].height;

                x = pos[0] + mWidth - winWidth / 2;
                y = pos[1] + mHeight - winHeight / 2;

                w.showAt(x, y);
            }
        } else {
            windows = this.getAppWindows();
            if (windows) {

                Ext.Array.forEach(windows, function () {
                    x += 20;
                    y += 20;
                });

                w.showAt(x, y);
                if (w.operationType != null && w.operationType != undefined && w.loadData != undefined) {
                    w.loadData(w.operationId);
                }
            }
        }

    },
    addWindow: function (item, isMain) {
        var win;

        if (isMain) {
            win = Ext.widget('window', {
                id: Ext.String.format('win_{0}', item.id),
                header: {
                    xtype: 'header',
                    titlePosition: 0,
                    items: item.item.headerMenu
                },
                childs: [],
                width: this.getWinWidth(),
                height: this.getWinHeight(),
                title: item.title,
                iconCls: item.iconCls,
                state: this.getState().normal,
                minimizable: true,
                maximizable: true,
                constrain: true,
                layout: 'fit',
                items: [item.item]
            });
            this.addMainListeners(win);
        } else {
            item.constrain = true;
            win = item;
        }

        return win;
    },
    getChilds: function (w) {
        return w.childs;
    },
    addChild: function (winId, childId) {
        var win = this.getWindowById(winId);
        var child = this.getWindowById(childId);
        win.add(child);
        win.childs.push(childId);
    },
    getWindowById: function (id) {
        return Ext.getCmp(id);
    },
    getAppWindows: function () {
        var windows = [];
        for (var i = 0; i < 10; i++) {
            var win = Ext.getCmp(Ext.String.format('win_{0}', i));
            if (win) {
                windows.push(Ext.String.format('win_{0}', i));
            }
        }
        return windows;
    },
    winHideShow: function () {
        var me = this;
        var windows = this.getAppWindows();
        var taskbar = Ext.getCmp(this.getTaskbar());

        var show = taskbar.items.items.length > 0;

        Ext.Array.forEach(windows, function (winId) {
            var win = Ext.getCmp(winId);
            if (show) {
                me.restoreItemFromTaskbar(winId);
            } else if (win.state !== me.getState().minimized) {
                win.minimize();
            }
        });
    },
    closeAllWindows: function () {
        var me = this;
        Ext.Array.forEach(this.getAppWindows(), function (winId) {
            me.closeWindow(winId);
        });
    },
    closeWindow: function (winId) {
        this.restoreItemFromTaskbar(winId);
        this.removeItemFromTaskbar(winId);
        this.getWindowById(winId).close();
    },

    //taskbar
    addItemToTaskbar: function (record) {
        var me = this;
        var taskbar = Ext.getCmp(this.getTaskbar());

        var length = taskbar.items.length;

        var item = Ext.widget('button', {
            text: record.text,
            tooltip: record.text,
            iconCls: record.iconCls,
            windowId: record.winId,
            handler: function () {
                var win = me.getWindowById(this.windowId);
                if (win.state === me.getState().minimized)
                    me.restoreItemFromTaskbar(this.windowId);
                else
                    win.minimize();
            }
        });


        taskbar.insert(length, item);

        var contextMenu = Ext.widget('menu', {
            items: [{
                text: 'დახურვა',
                border: false,
                iconCls: 'x-fa fa-close',
                handler: function (el) {
                    me.closeWindow(record.winId);
                }
            }]
        });

        item.getEl().on('contextmenu', function (e) {
            e.preventDefault();
            var xy = Ext.EventObject.getXY();
            contextMenu.showAt(xy[0], xy[1] - 30);
        });
    },
    restoreWin: function (w) {
        w.state = w.oldState;
        w.setWidth(w.oldWidth);
        w.setHeight(w.oldHeight);
        w.show();
    },
    restoreItemFromTaskbar: function (winId) {
        var me = this;
        var taskbar = Ext.getCmp(this.getTaskbar());
        Ext.Array.forEach(taskbar.items.items, function (item) {
            if (item.windowId === winId) {
                me.restoreWin(me.getWindowById(winId));
            }
        });
    },
    removeItemFromTaskbar: function (winId) {
        var taskbar = Ext.getCmp(this.getTaskbar());
        Ext.Array.forEach(taskbar.items.items, function (item) {
            if (item.windowId === winId) {
                taskbar.remove(item);
            }
        });
    },
    //listeners
    addMainListeners: function (w) {
        w.addListener('minimize', this.onMinimizeMain, this);
        w.addListener('close', this.onCloseMainWindow, this);
        w.addListener('maximize', this.onMaximizeMain, this);
        w.addListener('afterrender', this.onAfterrenderMain, this);
    },
    onMaximizeMain: function (w) {
        w.oldState = w.state;
        w.state = this.getState().maximize;
    },
    onMinimizeMain: function (w) {
        w.oldWidth = w.width;
        w.oldHeight = w.height;
        w.oldState = w.state;
        w.state = this.getState().minimized;

        w.hide();
    },
    onCloseMainWindow: function (w) {
        var me = this;
        this.restoreItemFromTaskbar(w.id);
        this.removeItemFromTaskbar(w.id);
        Ext.Array.forEach(w.childs, function (winId) {
            var win = me.getWindowById(winId);
            if (win)
                win.close();
        });
    },
    onAfterrenderMain: function (w) {
        var me = this;
    }    
})
