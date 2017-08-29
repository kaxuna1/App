Ext.define('CurrencyApp.controller.SharedController', {
    extend: 'Ext.app.Controller',
    stores: [

    ],
    models: [

    ],
    views: [
        'shared.buttons.AddButton',
        'shared.buttons.EditButton',
        'shared.buttons.DeleteButton',
        'shared.buttons.SearchButton',
        'shared.buttons.ClearButton',
        'shared.buttons.SaveButton',
        'shared.buttons.RegistrationButton',
        'shared.buttons.CancelButton',
        'shared.buttons.PrintButton',
        'shared.buttons.ViewButton',
        'shared.buttons.LoadButton',
        'shared.buttons.DeauthorizeButton',
        'shared.buttons.AuthorizeButton',
        'shared.buttons.ExportButton',
        'shared.buttons.CloseButton',
        'shared.windows.AppWindow',
        'shared.comboBox.AppComboBox',
        'shared.grid.AppGrid',
        'shared.uploadFile.UploadFile'
    ],
    init: function () {
        this.control({

        });
    },
});