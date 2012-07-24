
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
    'Ext.selection.CellModel',
    'Ext.button.*'
]);

Ext.onReady(function () {
    /* 

     */

    //The following line is evil and worse, it is impolite.    We should try to replace it!!

    Ext.namespace("structureFactors");


      
    var aField = Ext.create('Ext.form.field.Number',{
        fieldLabel: 'a',
        labelPad:'2',
        labelWidth:'19',
        labelAlign:'left',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 50
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
     Ext.regModel('deviceModel', {
        fields:[
            {name:'Symbol', type:'string'},
            'Element',
            {name:'Wyckoff Position', type:'string'},
	    {name:'X', type:'string'},
            'Y',
            {name:'Z', type:'string'},
	    {name:'Occupancy', type:'string'},
	    {name:'B', type: 'string'}
        ]
    });



    Ext.regModel('resultsModel', {
        fields:[
            {name:'2Ѳ', type:'number'},
            {name:'h', type:'number'},
            {name:'k', type:'number'},
            {name:'l', type:'number'},
            {name:'|F|', type:'number'}
        ]
    });
    
    
    var myData = [
        ['Ag1', 'Ag Silver', '2a' , 0.5, 0.25, 0.25, 4, 6], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ],
    ];
    
    var store = Ext.create('Ext.data.Store', { model:'deviceModel', data: myData});



    var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    });

    var resultColumns = [];
    resultColumns.push({header: '2Ѳ', width:70, sortable:true, dataIndex:'2Ѳ'});
    resultColumns.push({header: 'h', width:70, sortable:true, dataIndex:'h'});
    resultColumns.push({header: 'k', width:70, sortable:true, dataIndex:'k'});
    resultColumns.push({header: 'l', width:70, sortable:true, dataIndex:'l'});
    resultColumns.push({header: '|F|', width:70, sortable:true, dataIndex:'|F|'});


    var myResults= [1, 2, 3, 4, 5]
    structureFactors.resultsStore = Ext.create('Ext.data.Store', { model:'resultsModel', data: myResults});


    structureFactors.resultPanel = Ext.create('Ext.grid.GridPanel',{
      store:structureFactors.resultsStore,
      columns:resultColumns,
      stripeRows:true,
      height:350,
      width:350,
      plugins: [cellEditing],
      title:'Result Calculations',
      collapsible: true,
      animCollapse: false
    });

    //result.render('resulttest');

    var gridColumns = [];

    gridColumns.push({header:'Symbol', width:120, sortable:true, dataIndex:'Symbol', editor: {
                xtype: 'textfield',
                allowBlank: false}});
    gridColumns.push({header:'Element', width:120, hidden:false, sortable:true, dataIndex:'Element', editor: new Ext.form.field.ComboBox({
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                store: [
		    ['Ag','Ag'],

     		['Al','Al'],
		
		    ['Am','Am'],
		
		    ['Ar','Ar'],
		
		    ['As','As'],
		
		    ['At','At'],
		
		    ['Au','Au'],
		
		    ['B','B'],
		
		    ['Ba','Ba'],
		
		    ['Be','Be'],
		
		    ['Bh','Bh'],
		
		    ['Bi','Bi'],
		
		    ['Bk','Bk'],
		
		    ['Br','Br'],
		
		    ['C','C'],
		
		    ['Ca','Ca'],
		
		    ['Cd','Cd'],
		
		    ['Ce','Ce'],
		
		    ['Cf','Cf'],
		
		    ['Cl','Cl'],
		
		    ['Cm','Cm'],
		
		    ['Co','Co'],
		
		    ['Cn','Cn'],
		
		    ['Cr','Cr'],
		
		    ['Cs','Cs'],
		
		    ['Cu','Cu'],
		
		    ['Db','Db'],
		
		    ['Ds','Ds'],
		
		    ['Dy','Dy'],
		
		    ['Er','Er'],
		
		    ['Es','Es'],
		
		    ['Eu','Eu'],
		
		    ['F','F'],
		
		    ['Fe','Fe'],
		
		    ['Fm','Fm'],
		
		    ['Fr','Fr'],
		
		    ['Ga','Ga'],
		
		    ['Gd','Gd'],
		
		    ['Ge','Ge'],
		
		    ['H','H'],
		
		    ['He','He'],
		
		    ['Hf','Hf'],
		
		    ['Hg','Hg'],
		
		    ['Ho','Ho'],
		
		    ['Hs','Hs'],
		
		    ['I','I'],
		
		    ['In','In'],
		
		    ['Ir','Ir'],
		
		    ['K','K'],
		
		    ['Kr','Kr'],
		
		    ['La','La'],
		
		    ['Li','Li'],
		
		    ['Lr','Lr'],
		
		    ['Lu','Lu'],
		
		    ['Md','Md'],
		
		    ['Mg','Mg'],
		
		    ['Mn','Mn'],
		
		    ['Mo','Mo'],
		
		    ['Mt','Mt'],
		
		    ['N','N'],
		
		    ['Na','Na'],
		
		    ['Nb','Nb'],
		
		    ['Nd','Nd'],
		
		    ['Ne','Ne'],
		
		    ['Ni','Ni'],
		
		    ['No','No'],
		
		    ['Np','Np'],
		
		    ['O','O'],
		
		    ['Os','Os'],
		
		    ['P','P'],
		
		    ['Pa','Pa'],
		
		    ['Pb','Pb'],
		
		    ['Pd','Pd'],
		
		    ['Pm','Pm'],
		
		    ['Po','Po'],
		
		    ['Pr','Pr'],
		
		    ['Pt','Pt'],
		
		    ['Pu','Pu'],
		
		    ['Ra','Ra'],
		
		    ['Rb','Rb'],
		
		    ['Re','Re'],
		
		    ['Rf','Rf'],
		
		    ['Rg','Rg'],
		
		    ['Rh','Rh'],
		
		    ['Rn','Rn'],
		
		    ['Ru','Ru'],
		
		    ['S','S'],
		
		    ['Sb','Sb'],
		
		    ['Sc','Sc'],
		
		    ['Se','Se'],
		
		    ['Sg','Sg'],
		
		    ['Si','Si'],
		
		    ['Sm','Sm'],
		
		    ['Sn','Sn'],
		
		    ['Sr','Sr'],
		
		    ['Ta','Ta'],
		
		    ['Tb','Tb'],
		
		    ['Tc','Tc'],
		
		    ['Te','Te'],
		
		    ['Th','Th'],
		
		    ['Ti','Ti'],
		
		    ['Tl','Tl'],
		
		    ['Tm','Tm'],
		
		    ['U','U'],
		
		    ['Uuh','Uuh'],
		
		    ['Uun','Uun'],
		
		    ['Uuo','Uuo'],
		
		    ['Uup','Uup'],
		
		    ['Uuq','Uuq'],
		
		    ['Uus','Uus'],
		
		    ['Uut','Uut'],
		
		    ['Uuu','Uuu'],
		
		    ['V','V'],
		
		    ['W','W'],
		
		    ['Xe','Xe'],
		
		    ['Y','Y'],
		
		    ['Yb','Yb'],
		
		    ['Zn','Zn'],
		
		    ['Zr','Zr']
                ]
            })});
    gridColumns.push({header:'Wyckoff Position', width:120, hidden:false, sortable:true, dataIndex:'Wyckoff Position', editor: {
                xtype: 'textfield',
                allowBlank: false}})
    gridColumns.push({header:'X', width:120, sortable:true, dataIndex:'X', editor: {
                xtype: 'numberfield',
                allowBlank: false,
            }});
    gridColumns.push({header:'Y', width:120, hidden:false, sortable:true, dataIndex:'Y', editor: {
                xtype: 'numberfield',
                allowBlank: false,
                //minValue: 0,
                maxValue: 100000
            }});
    gridColumns.push({header:'Z', width:120, hidden:false, sortable:true, dataIndex:'Z', editor: {
                xtype: 'numberfield',
                allowBlank: false,
                //minValue: 0,
                maxValue: 100000
            }});
    gridColumns.push({header:'Occupancy', width:120, sortable:true, dataIndex:'Occupancy', editor: {
                xtype: 'numberfield',
                allowBlank: false,
                //minValue: 0,
                maxValue: 100000
            }});
    gridColumns.push({header:'B', width:120, hidden:false, sortable:true, dataIndex:'B', editor: {
                xtype: 'numberfield',
                allowBlank: false,
                //minValue: 0,
                maxValue: 100000
            }});
   
    /*GridPanel that displays the data*/
    structureFactors.grid = new Ext.grid.GridPanel({
        store:store,
        columns:gridColumns,
        stripeRows:true,
        height:350,
        width:950,
        plugins: [cellEditing],
        title:'Element Information',
        collapsible: true,
        animCollapse: false

    });

    //grid.render('gridtest');




    var latticeFieldSetTop = {
        itemId      : 'latticeFieldSetTop',
        xtype       : 'fieldset',
        border      : false,
        defaultType : 'textfield',
        layout: { type: 'hbox',
                  pack: 'start'
        },
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

    var latticeFieldSetMiddle = {
        xtype       : 'fieldset',
        border      : false,
        itemId      : 'latticeFieldSetMiddle',
        defaultType : 'textfield',
        layout: { type: 'hbox',
            pack: 'start'
        },
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

    var latticeFieldSetBottom = {
        xtype       : 'fieldset',
        border      : false,
        itemId      : 'latticeFieldSetBottom',
        defaultType : 'textfield',
        layout: { type: 'hbox',
            pack: 'start'
        },
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
        items: [{fieldLabel: '# of Elements',
            name: 'num'
        },
        ]
    };


    var spaceGroups = Ext.create('Ext.data.Store', {
        fields: ['number', 'name'],
        data : [
            {"abbr":"1", "name":"P 1"},
            {"abbr":"2", "name":"P -1"},
            {"abbr":"3", "name":"P 2"}
            //...
        ]
    });

    structureFactors.spaceGroupCombo= Ext.create('Ext.form.ComboBox', {
        fieldLabel: 'Choose Space Group',
        itemId:'spaceGroupCombo',
        store: spaceGroups,
        queryMode: 'local',
        displayField: 'name',
        valueField: 'abbr'
    });


    var spaceGroupSetting = Ext.create('Ext.data.Store', {
        fields: ['number', 'name'],
        data : [
            {"abbr":"1", "name":"1"},
            {"abbr":"2", "name":"2"},
            {"abbr":"3", "name":"3"}
            //...
        ]
    });


    structureFactors.spaceGroupSettingCombo= Ext.create('Ext.form.ComboBox', {
        fieldLabel: 'Space Group Setting',
        store: spaceGroupSetting,
        queryMode: 'local',
        itemId: 'SpaceGroupSettingCombo',
        displayField: 'name',
        valueField: 'abbr'
    });

    structureFactors.innerRightTopPanel = {
        xtype       : 'form',
        border      : false,
        title: 'LatticeParameters',
        itemId: 'latticeParameters',
        labelWidth: '2',
        labelAlign: 'left',
        labelPad: '5',
        frame: true,
	height: 350,
        defaultMargin : {top: 0, right: 5, bottom: 0, left: 5},
        padding: '0 5 0 5',
        //columnWidth: 0.5,
        //anchor: '85%',
        layout: {
                type:'anchor'
                },
        items: [latticeFieldSetBottom,latticeFieldSetTop,latticeFieldSetMiddle,structureFactors.spaceGroupCombo, structureFactors.spaceGroupSettingCombo,]
    }

    structureFactors.TopPanel = new Ext.Panel({
        layout: 'table',
         width: 1100,
        layoutConfig: {
            columns: 2
        },
        items: [structureFactors.innerRightTopPanel, structureFactors.resultPanel]
    });

    var button =  new Ext.Button({applyTo:'button-div',text:'CALCULATE!', minWidth: 130, handler: calculateHandler});
    var conn = new Ext.data.Connection();

    structureFactors.successFunction = function(response) {
        var idealdata = Ext.decode(response.responseText);

        //Updating desired data table
        var counter = 0;
        changes = ['twotheta', 'theta', 'omega', 'chi', 'phi'];
        for (var i = 0; i < structureFactors.resultsStore.getCount(); i++){
            var record = structureFactors.resultsStore.getAt(i);

            if (record.data['h'] != 0 || record.data['k'] != 0 || record.data['l'] != 0){
                //if it's not a (0,0,0) vector, update its calculated angles
                if (idealdata[counter] === 'Error') {
                    //setting up the error message
                    record.set('twotheta', 'Invalid');
                    record.set('theta', 'Vector!');
                    record.set('omega', 'Not in');
                    record.set('chi', 'Scattering');
                    record.set('phi', 'Plane.');
                }
                else{
                    for (var c in changes) {
                        var fieldName = changes[c];
                        record.set(fieldName, idealdata[counter][fieldName]);
                    }

                }
                counter = counter+1;
            }
        }

        //resultsStore.commitChanges();
    }

    //function getVals(){
    //    console.log('hi');
    //    console.log(Ext.ComponentQuery.query('panel #latticeParameters')[0].items.items[0].items.items[0].name);
    //    console.log(Ext.ComponentQuery.query('panel #latticeParameters')[0].items.items[0].items.items[0].value);
    //    //keys gives a map of componentId to number
    //}

    function calculateHandler(button, event) {

        //var results=getVals();

        var a = Ext.ComponentQuery.query('panel #latticeParameters')[0].getComponent('latticeFieldSetTop').query('textfield[name="a"]')[0].value;
        var b = Ext.ComponentQuery.query('panel #latticeParameters')[0].getComponent('latticeFieldSetTop').query('textfield[name="b"]')[0].value;
        var c = Ext.ComponentQuery.query('panel #latticeParameters')[0].getComponent('latticeFieldSetTop').query('textfield[name="c"]')[0].value;
        var alpha = Ext.ComponentQuery.query('panel #latticeParameters')[0].getComponent('latticeFieldSetMiddle').query('textfield[name="alpha"]')[0].value;
        var beta = Ext.ComponentQuery.query('panel #latticeParameters')[0].getComponent('latticeFieldSetMiddle').query('textfield[name="beta"]')[0].value;
        var gamma = Ext.ComponentQuery.query('panel #latticeParameters')[0].getComponent('latticeFieldSetMiddle').query('textfield[name="gamma"]')[0].value;
        var symbol = structureFactors.grid.store.data.items[0].data.Symbol;
	var element = structureFactors.grid.store.data.items[0].data.Element;
	//var wyckoff = structureFactors.grid.store.data.items[0].data.wycoffPosition;
	var x = structureFactors.grid.store.data.items[0].data.X;
	var y = structureFactors.grid.store.data.items[0].data.Y;
	var z = structureFactors.grid.store.data.items[0].data.Z;
	var occupancy = structureFactors.grid.store.data.items[0].data.Occupancy;
	var B = structureFactors.grid.store.data.items[0].data.B;

        params = {'observations': [] };
        params.lattice=[];
        params.lattice.push({
            a:a,
            b:b,
            c:c,
            alpha:alpha,
            beta:beta,
            gamma:gamma
        });
	
	params.element=[];
        params.element.push({
            symbol:symbol,
	    element:element,
	    //wyckoff:wyckoff,
	    x:x,
	    y:y,
	    z:z,
	    occupancy:occupancy,
	    b:b
        });
	

        //only sends the observations that aren't (0,0,0)
//        for (var i = 0; i < store.getCount(); i++) {
//            var record = store.getAt(i)
//            if (record.data['h'] != 0 || record.data['k'] != 0 || record.data['l'] != 0){
//                params['data'].push(record.data);
//            }
//        };
        var data=Ext.JSON.encode(params);
        $.ajax({
            url: '/nuclear_scattering',
            type: 'POST',
            data: {'data' : data},
            success: function(response, a, b, c) {
                //projectid is not in scope here; calling another function that has it.
                structureFactors.successFunction(response);
            }
        });


//        conn.request({
//            url: '/nuclear_scattering/',
//            method: 'POST',
//            params: Ext.encode(params),
//            success: successFunction,
//            failure: function () {
//                Ext.Msg.alert('Error: Failed calculation of nuclear structure factors');
//            }
//        });
    }

    structureFactors.BottomPanel = new Ext.Panel({
	layout: 'table',
	width: 1100,
	layoutConfig: {
	    columns: 2
	},
	items: [structureFactors.grid, button]
    });

    var TotalPanel = {
        xtype       : 'fieldset',
        border      : false,
        defaultType : 'textfield',
        layout: { type: 'vbox',
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
        items: [structureFactors.BottomPanel, structureFactors.TopPanel]
    };
    
    var myTabs = new Ext.TabPanel({
        resizeTabs: true, // turn on tab resizing
        minTabWidth: 115,
        tabWidth: 135,
        enableTabScroll: true,
        width: 1150,
        height: 765,
        activeItem: 'webrefinetab', //Making the calculator tab selected first
        defaults: {autoScroll:true},
        items: [
            {
                title: 'WebRefine',
                id: 'webrefinetab',
                iconCls: '/static/img/silk/calculator.png',
                items: [TotalPanel]
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
