Ext.define('CurrencyApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainController',
    onItemClick: function (e) {
        var item = e.getTarget('[data-recordId]');
        var id;

        if (item) {
            id = item.getAttribute('data-recordId');
            var nodes = Ext.StoreMgr.lookup('NavigationTree').root.childNodes;
            var node = null;

            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].internalId == id) {
                    node = nodes[i].data;
                    break;
                }
            }
            if (node) {
                Helpers.addMainTabPanelItem(Ext.widget(node.view), true);
            }
        }
    },
    onLoadMicro: function () {
     /*   var treelist = this.lookupReference('treelist'),
            ct = treelist.ownerCt;

        treelist.setMicro(false);
        treelist.expandedWidth = 260;
        treelist.setUi('nav');
        //treelist.setHighlightPath(true);
        ct['addCls']('treelist-with-nav');*/

        //this.oldWidth = ct.width;
        //ct.setWidth(44);
    }
});