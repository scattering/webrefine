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

    var radiationField = Ext.create('Ext.form.field.Number',{
        fieldLabel: 'Radiation Type',
        labelPad:'2',
        labelWidth:'80',
        labelAlign:'left',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 100
    });

    var wavelengthField = Ext.create('Ext.form.field.Number',{
        fieldLabel: 'Wavelength',
        labelPad:'2',
        labelWidth:'80',
        labelAlign:'left',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 100
    });
    
    var elementField = Ext.create('Ext.form.field.Number',{
        fieldLabel: 'Element',
        labelPad:'2',
        labelWidth:'2',
        labelAlign:'top',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 50
    });

    var element2Field = Ext.create('Ext.form.field.Number',{
        fieldLabel: '',
        labelPad:'2',
        labelWidth:'2',
        labelAlign:'left',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 50
    });

    var symbolField = Ext.create('Ext.form.field.Number',{
        fieldLabel: 'Symbol',
        labelPad:'2',
        labelWidth:'2',
        labelAlign:'top',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 50
    });

    var symbol2Field = Ext.create('Ext.form.field.Number',{
        fieldLabel: '',
        labelPad:'2',
        labelWidth:'2',
        labelAlign:'left'
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 50
    });

    var wyncoffField = Ext.create('Ext.form.field.Number',{
        fieldLabel: 'Wyncoff Position',
        labelPad:'2',
        labelWidth:'2',
        labelAlign:'top',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 50
    });

    var wyncoff2Field = Ext.create('Ext.form.field.Number',{
        fieldLabel: '',
        labelPad:'2',
        labelWidth:'2',
        labelAlign:'left'
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 50
    });

    var xField = Ext.create('Ext.form.field.Number',{
        fieldLabel: 'X',
        labelPad:'2',
        labelWidth:'2',
        labelAlign:'top',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 50
    });

    var x2Field = Ext.create('Ext.form.field.Number',{
        fieldLabel: '',
        labelPad:'2',
        labelWidth:'2',
        labelAlign:'left'
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 50
    });

    var yField = Ext.create('Ext.form.field.Number',{
        fieldLabel: 'Y',
        labelPad:'2',
        labelWidth:'2',
        labelAlign:'top',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 50
    });

    var y2Field = Ext.create('Ext.form.field.Number',{
        fieldLabel: '',
        labelPad:'2',
        labelWidth:'2',
        labelAlign:'left'
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 50
    });

    var zField = Ext.create('Ext.form.field.Number',{
        fieldLabel: 'Z',
        labelPad:'2',
        labelWidth:'2',
        labelAlign:'top',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 50
    });

    var z2Field = Ext.create('Ext.form.field.Number',{
        fieldLabel: '',
        labelPad:'2',
        labelWidth:'2',
        labelAlign:'left'
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 50
    });

    var occupancyField = Ext.create('Ext.form.field.Number',{
        fieldLabel: 'Occupancy',
        labelPad:'2',
        labelWidth:'2',
        labelAlign:'top',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 50
    });

    var occupancy2Field = Ext.create('Ext.form.field.Number',{
        fieldLabel: '',
        labelPad:'2',
        labelWidth:'2',
        labelAlign:'left'
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 50
    });

    var bField = Ext.create('Ext.form.field.Number',{
        fieldLabel: 'B',
        labelPad:'2',
        labelWidth:'2',
        labelAlign:'top',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 50
    });

    var b2Field = Ext.create('Ext.form.field.Number',{
        fieldLabel: '',
        labelPad:'2',
        labelWidth:'2',
        labelAlign:'left'
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 50
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
                                    //flex:1, 
				    border: false,
                                } ,
				
                                {
                                    xtype       : 'panel',
                                    //layout      : 'column',
                                    //width       : 50,
                                    //labelWidth  : 5,
                                   // flex:1,
                                    items   : [bField], 
				    border: false,
                                },
                                {
                                    xtype       : 'panel',
                                    //layout      : 'column',
                                    //width       : 50,
                                    //labelWidth  : 5,
                                   // flex:1,
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
                                   // flex:1, 
				    border: false,
                                } ,
                                {
                                    xtype       : 'panel',
                                    //layout      : 'column',
                                    //width       : 50,
                                    //labelWidth  : 5,
                                   // flex:1,
                                    items   : [betaField], 
				    border: false,
                                },
                                {
                                    xtype       : 'panel',
                                    //layout      : 'column',
                                    //width       : 50,
                                    //labelWidth  : 5,
                                   // flex:1,
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
                height: 250,
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
                width: 500,
                height: 250,
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
                                    //flex:1, 
				    border: false,
                                } ,
                                {
                                    xtype       : 'panel',
                                    //layout      : 'column',
                                    //width       : 50,
                                    //labelWidth  : 5,
                                   // flex:1,
                                    items   : [wavelengthField], 
				    border: false,
                                }
                                ]
                  },
		          
            ]
    }

    var innerRightTopPanel = {
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
                width: 790,
                height: 250,
                layout: {
                    type: 'hbox',
                    //align: 'stretch'
                        },
                anchor      : '85%',
                items       : [
                                {
                                    title   : 'Lattice Parameters', 
				    xtype       : 'panel',
                                    //layout      : 'column',
                                    //width       : 50,
                                    //labelWidth  : 5,
                                    items   : [latticeFieldSetTotal],
                                    flex:1
                                } ,
                                {
                                    title   : 'Spectrometer Parameters',
				    xtype       : 'panel',
                                    //layout      : 'column',
                                    //width       : 500,
                                    //labelWidth  : 5,
                                    flex:1,
                                    items   : [spectrometerFieldSetTotal]
                                }
                                ]
                  },
		          
            ]
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
