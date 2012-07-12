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
        labelWidth:'2',
        labelAlign:'left',
        //padding: '0 5 0 5',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 100
    });

    var bField = Ext.create('Ext.form.field.Number',{
        fieldLabel: 'b',
        labelPad:'2',
        labelWidth:'2',
        labelAlign:'left',
        //padding: '0 5 0 5',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 100
    });

    var cField = Ext.create('Ext.form.field.Number',{
        fieldLabel: 'c',
        labelPad:'2',
        labelWidth:'2',
        labelAlign:'left',
        //padding: '0 5 0 5',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 100
    });

    var alphaField = Ext.create('Ext.form.field.Number',{
        fieldLabel: 'α',
        labelPad:'2',
        labelWidth:'2',
        labelAlign:'left',
        //padding: '0 5 0 5',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 100
    });

    var betaField = Ext.create('Ext.form.field.Number',{
        fieldLabel: 'β',
        labelPad:'2',
        labelWidth:'2',
        labelAlign:'left',
        //padding: '0 5 0 5',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '1',
        hideTrigger: true,
	maxWidth: 100
    });

    var gammaField = Ext.create('Ext.form.field.Number',{
        fieldLabel: 'γ',
        labelPad:'2',
        labelWidth:'2',
        labelAlign:'left',
        //padding: '0 5 0 5',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true
    });

    var spaceGroupField = Ext.create('Ext.form.field.Number',{
        fieldLabel: 'Space Group',
        labelPad:'2',
        labelWidth:'2',
        labelAlign:'left',
        //padding: '0 5 0 5',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 100
    });

    var radiationField = Ext.create('Ext.form.field.Number',{
        fieldLabel: 'Radiation Type',
        labelPad:'2',
        labelWidth:'15',
        labelAlign:'left',
        //padding: '0 5 0 5',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 100
    });

    var wavelengthField = Ext.create('Ext.form.field.Number',{
        fieldLabel: 'Wavelength',
        labelPad:'2',
        labelWidth:'15',
        labelAlign:'left',
        //padding: '0 5 0 5',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 100
    });


    // ********* START - Setting up lattice constants GUI  *********


    var latticeFieldSetTop = {
        xtype       : 'fieldset',
        border      : false,
        defaultType : 'numberfield',
        defaultMargin : {top: 0, right: 5, bottom: 0, left: 5},
        padding: '0 5 0 5',
        defaults    : {
                        allowBlank : false,
                        decimalPrecision: 10
                      },
        items: [
                {
                xtype       : 'container',
                border      : false,
                width: 350,
                height: 250,
                layout: {
                    type: 'hbox',
                    //align: 'stretch'
                        },
                anchor      : '85%',
                items       : [
                                {
                                    xtype       : 'panel',
                                    //layout      : 'column',
                                    //width       : 50,
                                    //labelWidth  : 5,
                                    items   : [aField],
                                    flex:1, 
				    border: false,
                                } ,
				
                                {
                                    xtype       : 'panel',
                                    //layout      : 'column',
                                    //width       : 50,
                                    //labelWidth  : 5,
                                    flex:1,
                                    items   : [bField], 
				    border: false,
                                },
                                {
                                    xtype       : 'panel',
                                    //layout      : 'column',
                                    //width       : 50,
                                    //labelWidth  : 5,
                                    flex:1,
                                    items   : [cField], 
				    border: false,
                                }
                                ]
                  },
		          
            ]
    }

    var latticeFieldSetMiddle = {
        xtype       : 'fieldset',
        border      : false,
        defaultType : 'numberfield',
        defaultMargin : {top: 0, right: 5, bottom: 0, left: 5},
        padding: '0 5 0 5',
        defaults    : {
                        allowBlank : false,
                        decimalPrecision: 10
                      },
        items: [
                {
                xtype       : 'container',
                border      : false,
                width: 350,
                height: 250,
                layout: {
                    type: 'hbox',
                    //align: 'stretch'
                        },
                anchor      : '85%',
                items       : [
                                {
                                    xtype       : 'panel',
                                    //layout      : 'column',
                                    //width       : 50,
                                    //labelWidth  : 5,
                                    items   : [alphaField],
                                    flex:1, 
				    border: false,
                                } ,
                                {
                                    xtype       : 'panel',
                                    //layout      : 'column',
                                    //width       : 50,
                                    //labelWidth  : 5,
                                    flex:1,
                                    items   : [betaField], 
				    border: false,
                                },
                                {
                                    xtype       : 'panel',
                                    //layout      : 'column',
                                    //width       : 50,
                                    //labelWidth  : 5,
                                    flex:1,
                                    items   : [gammaField], 
				    border: false,
                                }
                                ]
                  },
		          
            ]
    }

     var latticeFieldSetBottom = {
        xtype       : 'fieldset',
        border      : false,
        defaultType : 'numberfield',
        defaultMargin : {top: 0, right: 5, bottom: 0, left: 5},
        padding: '0 5 0 5',
        defaults    : {
                        allowBlank : false,
                        decimalPrecision: 10
                      },
        items: [
                {
                xtype       : 'container',
                border      : false,
                width: 350,
                height: 350,
                layout: {
                    type: 'hbox',
                    //align: 'stretch'
                        },
                anchor      : '85%',
                items       : [
                                {
                                    xtype       : 'panel',
                                    //layout      : 'column',
                                    //width       : 50,
                                    //labelWidth  : 5,
                                    items   : [spaceGroupField],
                                    flex:1, 
				    border: false,
                                }
                                ]
                  },
		          
            ]
    }
       var latticeFieldSetTotal = {
        xtype       : 'fieldset',
        border      : false,
        defaultType : 'numberfield',
        defaultMargin : {top: 0, right: 5, bottom: 0, left: 5},
        padding: '0 5 0 5',
        defaults    : {
                        allowBlank : false,
                        decimalPrecision: 10
                      },
        items: [
                {
                xtype       : 'container',
                border      : true,
                width: 350,
                height: 120,
                layout: {
                    type: 'vbox',
                    //align: 'stretch'
                        },
                anchor      : '85%',
                items       : [
                                {
                                    xtype       : 'panel',
                                    //layout      : 'column',
                                    //width       : 50,
                                    //labelWidth  : 5,
                                    items   : [latticeFieldSetTop],
                                    flex:1, 
				    border: false,
                                } ,
                                {
                                    xtype       : 'panel',
                                    //layout      : 'column',
                                    //width       : 50,
                                    //labelWidth  : 5,
                                    flex:1,
                                    items   : [latticeFieldSetMiddle], 
				    border: false,
                                },
				{
                                    xtype       : 'panel',
                                    //layout      : 'column',
                                    //width       : 50,
                                    //labelWidth  : 5,
                                    flex:1,
                                    items   : [latticeFieldSetBottom], 
				    border: false,
                                }
                                ]
                  },
		          
            ]
    }

    var spectrometerFieldSetTotal = {
        xtype       : 'fieldset',
        border      : false,
        defaultType : 'numberfield',
        defaultMargin : {top: 0, right: 5, bottom: 0, left: 5},
        padding: '0 5 0 5',
        defaults    : {
                        allowBlank : false,
                        decimalPrecision: 10
                      },
        items: [
                {
                xtype       : 'container',
                border      : false,
                width: 350,
                height: 120,
                layout: {
                    type: 'vbox',
                    //align: 'stretch'
                        },
                anchor      : '85%',
                items       : [
                                {
                                    xtype       : 'panel',
                                    //layout      : 'column',
                                    //width       : 50,
                                    //labelWidth  : 5,
                                    items   : [radiationField],
                                    flex:1
                                } ,
                                {
                                    xtype       : 'panel',
                                    //layout      : 'column',
                                    //width       : 50,
                                    //labelWidth  : 5,
                                    flex:1,
                                    items   : [wavelengthField]
                                }
                                ]
                  },
		          
            ]
    }

    var innerRightTopPanel = new Ext.Panel({
        layout: 'border',
        width: 500,
        height: 200,
        border: true,
        items: [{
                title   : 'Lattice Parameters',
                region  : 'center',
                id      : 'center-component',
                layout  : 'fit',
                margins : '0 5 0 0', //small margins to the east of box
                split : true,
                items   : [latticeFieldSetTotal]
                }
                ]
    });  

    var TopPanel = new Ext.Panel({
        layout: 'table',
        width: 790,
        layoutConfig: {
            columns: 1
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
