//my file
Ext.Loader.setConfig({
    enabled: true
});

Ext.Loader.setPath('Ext.ux', '/static/lib/ext/examples/ux');
Ext.Loader.setPath('Ext.selection', '/static/lib/ext/src/selection');
Ext.Loader.setPath('Ext.grid', '/static/lib/ext/src/grid');

Ext.require([
    'Ext.grid.*',
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
      
    var aField = new Ext.form.NumberField({
        fieldLabel: 'a',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-10'
    });
    var bField = new Ext.form.NumberField({
        fieldLabel: 'b',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-10'
    });
    var cField = new Ext.form.NumberField({
        fieldLabel: 'c',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-10'
    });
    var alphaField = new Ext.form.NumberField({
        fieldLabel: 'α',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-10'
    });
    var betaField = new Ext.form.NumberField({
        fieldLabel: 'β',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-10'
    });
    var gammaField = new Ext.form.NumberField({
        fieldLabel: 'γ',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-10'
    });
    var spaceGroupField = new Ext.form.NumberField({
        fieldLabel: 'Space Group',
        allowBlank: true,
        decimalPrecision: 7
    });
    /*var symbolField = new Ext.form.NumberField({
        fieldLabel: 'Symbol',
        allowBlank: true,
        decimalPrecision: 7,
        anchor: '-10'
    });
    var elementField = new Ext.form.NumberField({
        fieldLabel: 'Element',
        allowBlank: true,
        decimalPrecision: 7,
        anchor: '-10'
    });
    var wPosField = new Ext.form.NumberField({
        fieldLabel: 'Weincoff Position',
        allowBlank: true,
        decimalPrecision: 7,
        anchor: '-10'
    });
    var xField = new Ext.form.NumberField({
        fieldLabel: 'X',
        allowBlank: true,
        decimalPrecision: 7,
        anchor: '-10'
    });
    var yField = new Ext.form.NumberField({
        fieldLabel: 'Y',
        allowBlank: true,
        decimalPrecision: 7,
        anchor: '-10'
    });
    var zField = new Ext.form.NumberField({
        fieldLabel: 'Z',
        allowBlank: true,
        decimalPrecision: 7,
        anchor: '-10'
    });
    var occupancyField = new Ext.form.NumberField({
        fieldLabel: 'Occupancy',
        allowBlank: true,
        decimalPrecision: 7,
        anchor: '-10'
    });
    var bField = new Ext.form.NumberField({
        fieldLabel: 'B',
        allowBlank: true,
        decimalPrecision: 7,
        anchor: '-10' 
    
    
       });
*/

    var numberFieldEditor = new Ext.form.NumberField({
        allowBlank: false,
        allowDecimals: true,
        decimalPrecision: 7
    });
    var textFieldEditor = new Ext.form.TextField({
        maxLength: 11,
    });
    
    

//    var cm = new Ext.grid.ColumnModel({
//        // specify any defaults for each column
//        defaults: {
//            sortable: false,
//            align: 'right',
//            width: 60,
//            editor: new Ext.form.NumberField({
//                allowBlank: false,
//                allowDecimals: true,
//                decimalPrecision: 7
//            })
//        },
//        columns: [
//            {
//            header: 'Symbol',
//            dataIndex: 'Symbol'
//            },
//        {
//            header: 'Element',
//            dataIndex: 'Element'
//            },
//        {
//            header: 'Wycoff Position',
//            dataIndex: 'Wycoff Position'
//            },
//        {
//            header: 'X',
//            dataIndex: 'X'
//            },
//        {
//            header: 'Y',
//            dataIndex: 'Y'
//            },
//	{
//            header: 'Z',
//            dataIndex: 'Z'
//            },
//        ]
//    });
//
//    var cm2 = new Ext.grid.ColumnModel({
//        defaults: {
//            sortable: false,
//            align: 'right',
//            width: 65
//        },
//        columns: [
//        {
//            header: "",
//            dataIndex: 'mycheckbox',
//            width: 25,
//            renderer: renderCheckBox
//        }, {
//            header: 'Symbol',
//            dataIndex: 'Symbol',
//            width: 55,
//            editor: numberFieldEditor
//        }, {
//             header: 'Element',
//            dataIndex: 'Element',
//            width: 55,
//            editor: numberFieldEditor
//        }, {
//            header: 'Weincoff Position',
//            dataIndex: 'Weincoff Position',
//            width: 55,
//            editor: numberFieldEditor
//        }, {
//            header: 'X',
//            dataIndex: 'X',
//            editor: textFieldEditor
//        }, {
//            header: 'Y',
//            dataIndex: 'Y',
//            editor: textFieldEditor
//        }, {
//            header: 'Z',
//            dataIndex: 'Z',
//            editor: textFieldEditor
//        }
//        ]
//    });
//    //Setting the calculated angle values to uneditable
//    cm2.setEditable(4, false);
//    cm2.setEditable(5, false);
//    cm2.setEditable(6, false);
//    cm2.setEditable(7, false);
//    cm2.setEditable(8, false);
    // ********* END - Creating Column Models *********
    
    

    function displayLattice (responseObject){
        lattice = Ext.decode(responseObject.responseText);
        
        aField.setValue(lattice['a']);
        bField.setValue(lattice['b']);
        cField.setValue(lattice['c']);
        alphaField.setValue(lattice['alpha']);
        betaField.setValue(lattice['beta']);
        gammaField.setValue(lattice['gamma']);
    }
    
    // ****************** END - Defining grid button functions ****************** 
    // ********* START - Setting up lattice constants GUI  *********


    var tmpFieldset = {
        xtype       : 'fieldset',
        border      : false,
        defaultType : 'numberfield',
        defaults    : {
            allowBlank : false,
            decimalPrecision: 10
        },
        items: [
                {
                xtype       : 'container',
                border      : false,
                layout      : 'column',
                anchor      : '115%',
                items       : [
                                {
                            xtype       : 'container',
                            layout      : 'form',
                            width       : 100,
                            labelWidth  : 10,
                            items   : [aField]
                                }
                    ]
                }
            ]
    }





//    var topFieldset = {
//        xtype       : 'fieldset',
//        border      : false,
//        defaultType : 'numberfield',
//        defaults    : {
//                        allowBlank : false,
//                        decimalPrecision: 10
//                      },
//        items: [
//                 {
//                xtype       : 'container',
//                border      : false,
//                layout      : 'column',
//                anchor      : '115%',
//                items       : [
//                    {
//                        xtype       : 'container',
//                        layout      : 'form',
//                        width       : 100,
//                        labelWidth  : 10,
//                        items   : [
//                            aField
//                        ]
//                    },
//                    {
//                        xtype       : 'container',
//                        layout      : 'form',
//                        width       : 100,
//                        labelWidth  : 10,
//                        items       : [
//                            bField
//                        ]
//                    },
//                    {
//                        xtype       : 'container',
//                        layout      : 'form',
//                        width       : 100,
//                        labelWidth  : 10,
//                        items       : [
//                            cField
//                        ]
//                    }, {
//                        //Buffer blank space to even out the c inputbox
//                        xtype       : 'container',
//                        layout      : 'form',
//                        columnWidth : 1,
//                        labelWidth  : 1
//                    }
//                ]
//            },
//                 {
//                xtype       : 'container',
//                border      : false,
//                layout      : 'column',
//                anchor      : '100%',
//                items       : [
//                    {
//                        xtype       : 'container',
//                        layout      : 'form',
//                        width       : 100,
//                        labelWidth  : 10,
//                        items   : [alphaField]
//                    },
//                    {
//                        xtype       : 'container',
//                        layout      : 'form',
//                        width       : 100,
//                        labelWidth  : 10,
//                        items       : [betaField]
//                    },
//                    {
//                        xtype       : 'container',
//                        layout      : 'form',
//                        width       : 100,
//                        labelWidth  : 10,
//                        items       : [
//                            gammaField
//                        ]
//                    },
//                    {
//                        //Buffer blank space to even out the gamma inputbox
//                        xtype       : 'container',
//                        layout      : 'form',
//                        columnWidth : 1,
//                        labelWidth  : 1
//                    }
//                ]
//            },
//            spaceGroupField,
//        ]
//    };
   
    
    
   

    var innerRightTopPanel = new Ext.Panel({
        layout: 'border',
        width: 350,
        height: 290,
        border: true,
        items: [{
                title   : 'Lattice Parameters',
                region  : 'center',
                id      : 'center-component',
                layout  : 'fit',
                margins : '0 5 0 0', //small margins to the east of box
                items   : [tmpFieldset]
                }
                ]
    });  

//    var TopPanel = new Ext.Panel({
//        layout: 'table',
//        width: 790,
//        layoutConfig: {
//            columns: 1
//        },
//        items: [innerRightTopPanel]
//    });


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
                items: [innerRightTopPanel]
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