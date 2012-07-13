//my file
Ext.Loader.setConfig({
    enabled: true
});

Ext.Loader.setPath('Ext.ux', '/static/lib/ext/examples/ux');
Ext.Loader.setPath('Ext.selection', '/static/lib/ext/src/selection');
Ext.Loader.setPath('Ext.grid', '/static/lib/ext/src/grid');

Ext.require([
    'Ext.layout.container.*',
    'Ext.tab.*',
    'Ext.grid.*',
    'Ext.form.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.form.*',
    'Ext.ux.RowExpander',
    'Ext.selection.CellModel'
]);

Ext.onReady(function () {
    /* 

     */

    //The following line is evil and worse, it is impolite.    We should try to replace it!!
      
    var aField = Ext.create('Ext.form.field.Number',{
        fieldLabel: 'a',
        labelPad:'2',
        labelWidth:'19',
        labelAlign:'left',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 80
    });

    var bField = Ext.create('Ext.form.field.Number',{
        fieldLabel: '__b',
        labelPad:'2',
        labelWidth:'30',
        labelAlign:'left',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 90
    });

    var cField = Ext.create('Ext.form.field.Number',{
        fieldLabel: '__c',
        labelPad:'2',
        labelWidth:'19',
        labelAlign:'left',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 80
    });

    var alphaField = Ext.create('Ext.form.field.Number',{
        fieldLabel: 'α',
        labelPad:'2',
        labelWidth:'19',
        labelAlign:'left',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 80
    });

    var betaField = Ext.create('Ext.form.field.Number',{
        fieldLabel: '__β',
        labelPad:'2',
        labelWidth:'19',
        labelAlign:'left',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '1',
        hideTrigger: true,
	maxWidth: 90
    });

    var gammaField = Ext.create('Ext.form.field.Number',{
        fieldLabel: '__γ',
        labelPad:'2',
        labelWidth:'19',
        labelAlign:'left',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 80
    });

    var spaceGroupField = Ext.create('Ext.form.field.Number',{
        fieldLabel: 'Space Group',
        labelPad:'2',
        labelWidth:'2',
        labelAlign:'top',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 80
    });




    // ********* START - Setting up lattice constants GUI  *********


    var latticeFieldSetTop = {
        xtype       : 'fieldset',
        border      : false,
        defaultType : 'textfield',
        layout: { type: 'hbox',
                  pack: 'start'
        },
        //defaultMargin : {top: 0, right: 5, bottom: 0, left: 5},
        //padding: '0 5 0 5',
        defaults    : {allowBlank : false,
                       decimalPrecision: 10,
                       labelPad:'2',
                       labelWidth:'2',
                       labelAlign:'left',
                       anchor: '100%',
                       hideTrigger: true,
                       style: {'margin': '0px 5px 5px 0px',
                               'border':0,
                               'paddingRight':15
                       },
                       flex:1
                      },
        items: [{fieldLabel: 'a',
                 name: 'a'
                 },
                {fieldLabel: 'b',
                 name: 'b'
                },
                {fieldLabel: 'c',
                 name: 'c'
                }
               ]
        };

    var latticeFieldSetBottom = {
        xtype       : 'fieldset',
        border      : false,
        defaultType : 'textfield',
        layout: { type: 'hbox',
            pack: 'start'
        },
        //defaultMargin : {top: 0, right: 5, bottom: 0, left: 5},
        //padding: '0 5 0 5',
        defaults    : {allowBlank : false,
            decimalPrecision: 10,
            labelPad:'2',
            labelWidth:'2',
            labelAlign:'left',
            anchor: '100%',
            hideTrigger: true,
            style: {'margin': '0px 5px 5px 0px',
                    'border':0,
                    'paddingRight':15
            },
            flex:1
        },
        items: [{fieldLabel: 'α',
            name: 'alpha'
        },
            {fieldLabel: 'β',
                name: 'beta'
            },
            {fieldLabel: 'γ',
                name: 'gamma'
            }
        ]
    };






    var innerRightTopPanel = {
        xtype       : 'form',
        border      : false,
        title: 'LatticeParameters',
        labelWidth: '2',
        labelAlign: 'left',
        labelPad: '5',
        frame: true,
        defaultMargin : {top: 0, right: 5, bottom: 0, left: 5},
        padding: '0 5 0 5',
        //columnWidth: 0.5,
        //anchor: '85%',
        layout: {
                type:'anchor'
                },
        items: [latticeFieldSetTop,latticeFieldSetBottom]
    }


      
        var TopPanel = new Ext.Panel({
        layout: 'table',
        width: 900,
        layoutConfig: {
            columns: 2
        },
        items: [innerRightTopPanel]
    });


    var myTabs = new Ext.TabPanel({
        resizeTabs: true, // turn on tab resizing
        minTabWidth: 115,
        tabWidth: 135,
        enableTabScroll: true,
        width: 793,
        height: 524,
        activeItem: 'webrefinetab', //Making the calculator tab selected first
        defaults: {autoScroll:true},
        items: [
            {
                title: 'WebRefine',
                id: 'webrefinetab',
                iconCls: '/static/img/silk/calculator.png',
                items: [TopPanel]
            }, {
                title: 'Help Manual',
                id: 'helpmanualtab',
                padding: 5,
                iconCls: '/static/img/silk/help.png',
		        html: '<h1>Hi</h1>'
                    
            }
        ]
    });

// ************************** END - Setting up the tabs  **************************
    myTabs.render('tabs');
});
