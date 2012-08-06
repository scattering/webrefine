
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
        ['Ag1', 'Ag', '2a' , 0.5, 0.25, 0.25, 4, 6], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ],
    ];
    
    var store = Ext.create('Ext.data.Store', { model:'deviceModel', data: myData});



    var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    });

    var resultColumns = [];
    
    resultColumns.push({header: 'h', width:50, sortable:true, dataIndex:'h'});
    resultColumns.push({header: 'k', width:50, sortable:true, dataIndex:'k'});
    resultColumns.push({header: 'l', width:50, sortable:true, dataIndex:'l'});
    resultColumns.push({header: '|F|', width:70, sortable:true, dataIndex:'|F|'});
    resultColumns.push({header: '2Ѳ', width:70, sortable:true, dataIndex:'2Ѳ'});


    var myResults= [1, 2, 3, 4, 5,6,7,8]
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
		hideTrigger: true,
		decimalPrecision: 4,
                allowBlank: false,
            }});
    gridColumns.push({header:'Y', width:120, hidden:false, sortable:true, dataIndex:'Y', editor: {
                xtype: 'numberfield',
                allowBlank: false,
		hideTrigger: true,
		decimalPrecision: 4,
                //minValue: 0,
                maxValue: 100000
            }});
    gridColumns.push({header:'Z', width:120, hidden:false, sortable:true, dataIndex:'Z', editor: {
                xtype: 'numberfield',
                allowBlank: false,
		hideTrigger: true,
		decimalPrecision: 4,
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
		hideTrigger: true,
		decimalPrecision: 4,
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
        }
        ]
    };




    var spaceGroups = Ext.create('Ext.data.Store', {
        fields: ['number', 'name'],
        data : [
		    {	"abbr"	:		"1"	,	"name"	:	"1 P 1"	},
		    {	"abbr"	:		"2"	,	"name"	:	"2 P -1	"},
		    {	"abbr"	:		"3"	,	"name"	:	"3 P 2	"},
		    {	"abbr"	:		"4"	,	"name"	:	"4 P 21	"},
		    {	"abbr"	:		"5"	,	"name"	:	"5 C 2	"},
		    {	"abbr"	:		"6"	,	"name"	:	"6 P m	"},
		    {	"abbr"	:		"7"	,	"name"	:	"7 P c	"},
		    {	"abbr"	:		"8"	,	"name"	:	"8 C m	"},
		    {	"abbr"	:		"9"	,	"name"	:	"9 C c	"},
		    {	"abbr"	:		"10"	,	"name"	:	"10 P 2/m	"},
		    {	"abbr"	:		"11"	,	"name"	:	"11 P 21/m	"},
		    {	"abbr"	:		"12"	,	"name"	:	"12 C 2/m	"},
		    {	"abbr"	:		"13"	,	"name"	:	"13 P 2/c	"},
		    {	"abbr"	:		"14"	,	"name"	:	"14 P 21/c	"},
		    {	"abbr"	:		"15"	,	"name"	:	"15 C 2/c	"},
		    {	"abbr"	:		"16"	,	"name"	:	"16 P 2 2 2"	},
		    {	"abbr"	:		"17"	,	"name"	:	"17 P 2 2 21	"},
		    {	"abbr"	:		"18"	,	"name"	:	"18 P 21 21 2	"},
		    {	"abbr"	:		"19"	,	"name"	:	"19 P 21 21 21	"},
		    {	"abbr"	:		"20"	,	"name"	:	"20 C 2 2 21	"},
		    {	"abbr"	:		"21"	,	"name"	:	"21 C 2 2 2	"},
		    {	"abbr"	:		"22"	,	"name"	:	"22 F 2 2 2	"},
		    {	"abbr"	:		"23"	,	"name"	:	"23 I 2 2 2	"},
		    {	"abbr"	:		"24"	,	"name"	:	"24 I 21 21 21	"},
		    {	"abbr"	:		"25"	,	"name"	:	"25 P m m 2	"},
		    {	"abbr"	:		"26"	,	"name"	:	"26 P m c 21	"},
		    {	"abbr"	:		"27"	,	"name"	:	"27 P c c 2	"},
		    {	"abbr"	:		"28"	,	"name"	:	"28 P m a 2	"},
		    {	"abbr"	:		"29"	,	"name"	:	"29 P c a 21	"},
		    {	"abbr"	:		"30"	,	"name"	:	"30 P n c 2	"},
		    {	"abbr"	:		"31"	,	"name"	:	"31 P m n 21	"},
		    {	"abbr"	:		"32"	,	"name"	:	"32 P b a 2	"},
		    {	"abbr"	:		"33"	,	"name"	:	"33 P n a 21	"},
		    {	"abbr"	:		"34"	,	"name"	:	"34 P n n 2	"},
		    {	"abbr"	:		"35"	,	"name"	:	"35 C m m 2	"},
		    {	"abbr"	:		"36"	,	"name"	:	"36 C m c 21	"},
		    {	"abbr"	:		"37"	,	"name"	:	"37 C c c 2	"},
		    {	"abbr"	:		"38"	,	"name"	:	"38 A m m 2	"},
		    {	"abbr"	:		"39"	,	"name"	:	"39 A b m 2	"},
		    {	"abbr"	:		"40"	,	"name"	:	"40 A m a 2	"},
		    {	"abbr"	:		"41"	,	"name"	:	"41 A b a 2	"},
		    {	"abbr"	:		"42"	,	"name"	:	"42 F m m 2	"},
		    {	"abbr"	:		"43"	,	"name"	:	"43 F d d 2	"},
		    {	"abbr"	:		"44"	,	"name"	:	"44 I m m 2	"},
		    {	"abbr"	:		"45"	,	"name"	:	"45 I b a 2	"},
		    {	"abbr"	:		"46"	,	"name"	:	"46 I m a 2	"},
		    {	"abbr"	:		"47"	,	"name"	:	"47 P m m m	"},
		    {	"abbr"	:		"48"	,	"name"	:	"48 P n n n	"},
		    {	"abbr"	:		"49"	,	"name"	:	"49 P c c m	"},
		    {	"abbr"	:		"50"	,	"name"	:	"50 P b a n	"},
		    {	"abbr"	:		"51"	,	"name"	:	"51 P m m a	"},
		    {	"abbr"	:		"52"	,	"name"	:	"52 P n n a	"},
		    {	"abbr"	:		"53"	,	"name"	:	"53 P m n a	"},
		    {	"abbr"	:		"54"	,	"name"	:	"54 P c c a	"},
		    {	"abbr"	:		"55"	,	"name"	:	"55 P b a m	"},
		    {	"abbr"	:		"56"	,	"name"	:	"56 P c c n	"},
		    {	"abbr"	:		"57"	,	"name"	:	"57 P b c m	"},
		    {	"abbr"	:		"58"	,	"name"	:	"58 P n n m	"},
		    {	"abbr"	:		"59"	,	"name"	:	"59 P m m n	"},
		    {	"abbr"	:		"60"	,	"name"	:	"60 P b c n	"},
		    {	"abbr"	:		"61"	,	"name"	:	"61 P b c a	"},
		    {	"abbr"	:		"62"	,	"name"	:	"62 P n m a	"},
		    {	"abbr"	:		"63"	,	"name"	:	"63 C m c m	"},
		    {	"abbr"	:		"64"	,	"name"	:	"64 C m c a	"},
		    {	"abbr"	:		"65"	,	"name"	:	"65 C m m m	"},
		    {	"abbr"	:		"66"	,	"name"	:	"66 C c c m	"},
		    {	"abbr"	:		"67"	,	"name"	:	"67 C m m a	"},
		    {	"abbr"	:		"68"	,	"name"	:	"68 C c c a	"},
		    {	"abbr"	:		"69"	,	"name"	:	"69 F m m m	"},
		    {	"abbr"	:		"70"	,	"name"	:	"70 F d d d	"},
		    {	"abbr"	:		"71"	,	"name"	:	"71 I m m m	"},
		    {	"abbr"	:		"72"	,	"name"	:	"72 I b a m	"},
		    {	"abbr"	:		"73"	,	"name"	:	"73 I b c a	"},
		    {	"abbr"	:		"74"	,	"name"	:	"74 I m m a	"},
		    {	"abbr"	:		"75"	,	"name"	:	"75 P 4	"},
		    {	"abbr"	:		"76"	,	"name"	:	"76 P 41	"},
		    {	"abbr"	:		"77"	,	"name"	:	"77 P 42	"},
		    {	"abbr"	:		"78"	,	"name"	:	"78 P 43	"},
		    {	"abbr"	:		"79"	,	"name"	:	"79 I 4	"},
		    {	"abbr"	:		"80"	,	"name"	:	"80 I 41	"},
		    {	"abbr"	:		"81"	,	"name"	:	"81 P -4	"},
		    {	"abbr"	:		"82"	,	"name"	:	"82 I -4	"},
		    {	"abbr"	:		"83"	,	"name"	:	"83 P 4/m	"},
		    {	"abbr"	:		"84"	,	"name"	:	"84 P 42/m	"},
		    {	"abbr"	:		"85"	,	"name"	:	"85 P 4/n	"},
		    {	"abbr"	:		"86"	,	"name"	:	"86 P 42/n	"},
		    {	"abbr"	:		"87"	,	"name"	:	"87 I 4/m	"},
		    {	"abbr"	:		"88"	,	"name"	:	"88 I 41/a	"},
		    {	"abbr"	:		"89"	,	"name"	:	"89 P 4 2 2"	},
		    {	"abbr"	:		"90"	,	"name"	:	"90 P 4 21 2	"},
		    {	"abbr"	:		"91"	,	"name"	:	"91 P 41 2 2	"},
		    {	"abbr"	:		"92"	,	"name"	:	"92 P 41 21 2	"},
		    {	"abbr"	:		"93"	,	"name"	:	"93 P 42 2 2	"},
		    {	"abbr"	:		"94"	,	"name"	:	"94 P 42 21 2	"},
		    {	"abbr"	:		"95"	,	"name"	:	"95 P 43 2 2	"},
		    {	"abbr"	:		"96"	,	"name"	:	"96 P 43 21 2	"},
		    {	"abbr"	:		"97"	,	"name"	:	"97 I 4 2 2	"},
		    {	"abbr"	:		"98"	,	"name"	:	"98 I 41 2 2	"},
		    {	"abbr"	:		"99"	,	"name"	:	"99 P 4 m m	"},
		    {	"abbr"	:		"100"	,	"name"	:	"100 P 4 b m	"},
		    {	"abbr"	:		"101"	,	"name"	:	"101 P 42 c m	"},
		    {	"abbr"	:		"102"	,	"name"	:	"102 P 42 n m	"},
		    {	"abbr"	:		"103"	,	"name"	:	"103 P 4 c c	"},
		    {	"abbr"	:		"104"	,	"name"	:	"104 P 4 n c	"},
		    {	"abbr"	:		"105"	,	"name"	:	"105 P 42 m c	"},
		    {	"abbr"	:		"106"	,	"name"	:	"106 P 42 b c	"},
		    {	"abbr"	:		"107"	,	"name"	:	"107 I 4 m m	"},
		    {	"abbr"	:		"108"	,	"name"	:	"108 I 4 c m	"},
		    {	"abbr"	:		"109"	,	"name"	:	"109 I 41 m d	"},
		    {	"abbr"	:		"110"	,	"name"	:	"110 I 41 c d	"},
		    {	"abbr"	:		"111"   ,	"name"	:	"111 P -4 2 m	"},
		    {	"abbr"	:		"112"	,	"name"	:	"112 P -4 2 c	"},
		    {	"abbr"	:		"113"	,	"name"	:	"113 P -4 21 m	"},
		    {	"abbr"	:		"114"	,	"name"	:	"114 P -4 21 c	"},
		    {	"abbr"	:		"115"	,	"name"	:	"115 P -4 m 2	"},
		    {	"abbr"	:		"116"	,	"name"	:	"116 P -4 c 2	"},
		    {	"abbr"	:		"117"	,	"name"	:	"117 P -4 b 2	"},
		    {	"abbr"	:		"118"	,	"name"	:	"118 P -4 n 2	"},
		    {	"abbr"	:		"119"	,	"name"	:	"119 I -4 m 2	"},
		    {	"abbr"	:		"120"	,	"name"	:	"120 I -4 c 2	"},
		    {	"abbr"	:		"121"	,	"name"	:	"121 I -4 2 m	"},
		    {	"abbr"	:		"122"	,	"name"	:	"122 I -4 2 d	"},
		    {	"abbr"	:		"123"	,	"name"	:	"123 P 4/m m m	"},
		    {	"abbr"	:		"124"	,	"name"	:	"124 P 4/m c c	"},
		    {	"abbr"	:		"125"	,	"name"	:	"125 P 4/n b m	"},
		    {	"abbr"	:		"126"	,	"name"	:	"126 P 4/n n c	"},
		    {	"abbr"	:		"127"	,	"name"	:	"127 P 4/m b m	"},
		    {	"abbr"	:		"128"	,	"name"	:	"128 P 4/m n c	"},
		    {	"abbr"	:		"129"	,	"name"	:	"129 P 4/n m m	"},
		    {	"abbr"	:		"130"	,	"name"	:	"130 P 4/n c c	"},
		    {	"abbr"	:		"131"	,	"name"	:	"131 P 42/m m c	"},
		    {	"abbr"	:		"132"	,	"name"	:	"132 P 42/m c m	"},
		    {	"abbr"	:		"133"	,	"name"	:	"133 P 42/n b c	"},
		    {	"abbr"	:		"134"	,	"name"	:	"134 P 42/n n m	"},
		    {	"abbr"	:		"135"	,	"name"	:	"135 P 42/m b c	"},
		    {	"abbr"	:		"136"	,	"name"	:	"136 P 42/m n m	"},
		    {	"abbr"	:		"137"	,	"name"	:	"137 P 42/n m c	"},
		    {	"abbr"	:		"138"	,	"name"	:	"138 P 42/n c m	"},
		    {	"abbr"	:		"139"	,	"name"	:	"139 I 4/m m m	"},
		    {	"abbr"	:		"140"	,	"name"	:	"140 I 4/m c m	"},
		    {	"abbr"	:		"141"	,	"name"	:	"141 I 41/a m d	"},
		    {	"abbr"	:		"142"	,	"name"	:	"142 I 41/a c d	"},
		    {	"abbr"	:		"143"	,	"name"	:	"143 P 3	"},
		    {	"abbr"	:		"144"	,	"name"	:	"144 P 31	"},
		    {	"abbr"	:		"145"	,	"name"	:	"145 P 32	"},
		    {	"abbr"	:		"146"	,	"name"	:	"146 R 3	"},
		    {	"abbr"	:		"147"	,	"name"	:	"147 P -3	"},
		    {	"abbr"	:		"148"	,	"name"	:	"148 R -3	"},
		    {	"abbr"	:		"149"	,	"name"	:	"149 P 3 1 2"	},
		    {	"abbr"	:		"150"	,	"name"	:	"150 P 3 2 1"	},
		    {	"abbr"	:		"151"	,	"name"	:	"151 P 31 1 2	"},
		    {	"abbr"	:		"152"	,	"name"	:	"152 P 31 2 1	"},
		    {	"abbr"	:		"153"	,	"name"	:	"153 P 32 1 2	"},
		    {	"abbr"	:		"154"	,	"name"	:	"154 P 32 2 1	"},
		    {	"abbr"	:		"155"	,	"name"	:	"155 R 3 2	"},
		    {	"abbr"	:		"156"	,	"name"	:	"156 P 3 m 1"	},
		    {	"abbr"	:		"157"	,	"name"	:	"157 P 3 1 m"	},
		    {	"abbr"	:		"158"	,	"name"	:	"158 P 3 c 1"	},
		    {	"abbr"	:		"159"	,	"name"	:	"159 P 3 1 c"	},
		    {	"abbr"	:		"160"	,	"name"	:	"160 R 3 m	"},
		    {	"abbr"	:		"161"	,	"name"	:	"161 R 3 c	"},
		    {	"abbr"	:		"162"	,	"name"	:	"162 P -3 1 m	"},
		    {	"abbr"	:		"163"	,	"name"	:	"163 P -3 1 c	"},
		    {	"abbr"	:		"164"	,	"name"	:	"164 P -3 m 1	"},
		    {	"abbr"	:		"165"	,	"name"	:	"165 P -3 c 1	"},
		    {	"abbr"	:		"166"	,	"name"	:	"166 R -3 m	"},
		    {	"abbr"	:		"167"	,	"name"	:	"167 R -3 c	"},
		    {	"abbr"	:		"168"	,	"name"	:	"168 P 6	"},
		    {	"abbr"	:		"169"	,	"name"	:	"169 P 61	"},
		    {	"abbr"	:		"170"	,	"name"	:	"170 P 65	"},
		    {	"abbr"	:		"171"	,	"name"	:	"171 P 62	"},
		    {	"abbr"	:		"172"	,	"name"	:	"172 P 64	"},
		    {	"abbr"	:		"173"	,	"name"	:	"173 P 63	"},
		    {	"abbr"	:		"174"	,	"name"	:	"174 P -6	"},
		    {	"abbr"	:		"175"	,	"name"	:	"175 P 6/m	"},
		    {	"abbr"	:		"176"	,	"name"	:	"176 P 63/m	"},
		    {	"abbr"	:		"177"	,	"name"	:	"177 P 6 2 2	"},
		    {	"abbr"	:		"178"	,	"name"	:	"178 P 61 2 2	"},
		    {	"abbr"	:		"179"	,	"name"	:	"179 P 65 2 2	"},
		    {	"abbr"	:		"180"	,	"name"	:	"180 P 62 2 2	"},
		    {	"abbr"	:		"181"	,	"name"	:	"181 P 64 2 2	"},
		    {	"abbr"	:		"182"	,	"name"	:	"182 P 63 2 2	"},
		    {	"abbr"	:		"183"	,	"name"	:	"183 P 6 m m	"},
		    {	"abbr"	:		"184"	,	"name"	:	"184 P 6 c c	"},
		    {	"abbr"	:		"185"	,	"name"	:	"185 P 63 c m	"},
		    {	"abbr"	:		"186"	,	"name"	:	"186 P 63 m c	"},
		    {	"abbr"	:		"187"	,	"name"	:	"187 P -6 m 2	"},
		    {	"abbr"	:		"188"	,	"name"	:	"188 P -6 c 2	"},
		    {	"abbr"	:		"189"	,	"name"	:	"189 P -6 2 m	"},
		    {	"abbr"	:		"190"	,	"name"	:	"190 P -6 2 c	"},
		    {	"abbr"	:		"191"	,	"name"	:	"191 P 6/m m m	"},
		    {	"abbr"	:		"192"	,	"name"	:	"192 P 6/m c c	"},
		    {	"abbr"	:		"193"	,	"name"	:	"193 P 63/m c m	"},
		    {	"abbr"	:		"194"	,	"name"	:	"194 P 63/m m c	"},
		    {	"abbr"	:		"195"	,	"name"	:	"195 P 2 3	"},
		    {	"abbr"	:		"196"	,	"name"	:	"196 F 2 3	"},
		    {	"abbr"	:		"197"	,	"name"	:	"197 I 2 3	"},
		    {	"abbr"	:		"198"	,	"name"	:	"198 P 21 3	"},
		    {	"abbr"	:		"199"	,	"name"	:	"199 I 21 3	"},
		    {	"abbr"	:		"200"	,	"name"	:	"200 P m -3	"},
		    {	"abbr"	:		"201"	,	"name"	:	"201 P n -3	"},
		    {	"abbr"	:		"202"	,	"name"	:	"202 F m -3	"},
		    {	"abbr"	:		"203"	,	"name"	:	"203 F d -3	"},
		    {	"abbr"	:		"204"	,	"name"	:	"204 I m -3	"},
		    {	"abbr"	:		"205"	,	"name"	:	"205 P a -3	"},
		    {	"abbr"	:		"206"	,	"name"	:	"206 I a -3	"},
		    {	"abbr"	:		"207"	,	"name"	:	"207 P 4 3 2"	},
		    {	"abbr"	:		"208"	,	"name"	:	"208 P 42 3 2	"},
		    {	"abbr"	:		"209"	,	"name"	:	"209 200 F 4 3 2	"},
		    {	"abbr"	:		"210"	,	"name"	:	"210 F 41 3 2	"},
		    {	"abbr"	:		"211"	,	"name"	:	"211 I 4 3 2	"},
		    {	"abbr"	:		"212"	,	"name"	:	"212 P 43 3 2	"},
		    {	"abbr"	:		"213"	,	"name"	:	"213 P 41 3 2	"},
		    {	"abbr"	:		"214"	,	"name"	:	"214 I 41 3 2	"},
		    {	"abbr"	:		"215"	,	"name"	:	"215 P -4 3 m	"},
		    {	"abbr"	:		"216"	,	"name"	:	"216 F -4 3 m	"},
		    {	"abbr"	:		"217"	,	"name"	:	"217 I -4 3 m	"},
		    {	"abbr"	:		"218"	,	"name"	:	"218 P -4 3 n	"},
		    {	"abbr"	:		"219"	,	"name"	:	"219 F -4 3 c	"},
		    {	"abbr"	:		"220"	,	"name"	:	"220 I -4 3 d	"},
		    {	"abbr"	:		"221"	,	"name"	:	"221 P m -3 m	"},
		    {	"abbr"	:		"222"	,	"name"	:	"222 P n -3 n	"},
		    {	"abbr"	:		"223"	,	"name"  :	"223 P m -3 n	"},
		    {	"abbr"	:		"224"	,	"name"	:	"224 P n -3 m	"},
		    {	"abbr"	:		"225"	,	"name"	:	"225 F m -3 m	"},
		    {	"abbr"	:		"226"	,	"name"	:	"226 F m -3 c	"},
		    {	"abbr"	:		"227"	,	"name"	:	"227 F d -3 m	"},
		    {	"abbr"	:		"228"	,	"name"	:	"228 F d -3 c	"},
		    {	"abbr"	:		"229"	,	"name"	:	"229 I m -3 m	"},
		    {	"abbr"	:		"230"	,	"name"	:	"230 I a -3 d	"},



        ]
    });

    structureFactors.spaceGroupCombo= Ext.create('Ext.form.ComboBox', {
        fieldLabel: 'Space Group by Number',
        itemId:'spaceGroupCombo',
        store: spaceGroups,
        queryMode: 'local',
        displayField: 'abbr',
        valueField: 'abbr'
    });

    structureFactors.spaceGroupSettingCombo= Ext.create('Ext.form.ComboBox', {
        fieldLabel: 'Space Group Setting',
        store: spaceGroups,
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
        items: [latticeFieldSetBottom,latticeFieldSetTop,latticeFieldSetMiddle,structureFactors.spaceGroupSettingCombo,]
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
        var idealdata = Ext.decode(response);
	for(var j=0;j<8;j++){
	var h = idealdata[0][0+j*4];
	var k = idealdata[0][1+j*4];
	var l = idealdata[0][2+j*4];
	var f = idealdata[0][3+j*4];
	var twoTheta = idealdata[1][j];
	structureFactors.resultPanel.store.data.items[j].data["h"] = h;
	structureFactors.resultPanel.store.data.items[j].data["k"] = k;
	structureFactors.resultPanel.store.data.items[j].data["l"] = l;
	structureFactors.resultPanel.store.data.items[j].data["|F|"] = f;
	structureFactors.resultPanel.store.data.items[j].data['2Ѳ'] = twoTheta
	structureFactors.resultPanel.getView().refresh();
	}
    }

    //function getVals(){
    //    console.log('hi');
    //    console.log(Ext.ComponentQuery.query('panel #latticeParameters')[0].items.items[0].items.items[0].name);
    //    console.log(Ext.ComponentQuery.query('panel #latticeParameters')[0].items.items[0].items.items[0].value);
    //    //keys gives a map of componentId to number
    //}

    function calculateHandler(button, event) {

        //var results=getVals();
	
         
        params = {'observations': [] };
        params.lattice=[];
	params.element=[];
	params.num=[];
	
	var a = Ext.ComponentQuery.query('panel #latticeParameters')[0].getComponent('latticeFieldSetTop').query('textfield[name="a"]')[0].value;
        var b = Ext.ComponentQuery.query('panel #latticeParameters')[0].getComponent('latticeFieldSetTop').query('textfield[name="b"]')[0].value;
        var c = Ext.ComponentQuery.query('panel #latticeParameters')[0].getComponent('latticeFieldSetTop').query('textfield[name="c"]')[0].value;
        var alpha = Ext.ComponentQuery.query('panel #latticeParameters')[0].getComponent('latticeFieldSetMiddle').query('textfield[name="alpha"]')[0].value;
        var beta = Ext.ComponentQuery.query('panel #latticeParameters')[0].getComponent('latticeFieldSetMiddle').query('textfield[name="beta"]')[0].value;
        var gamma = Ext.ComponentQuery.query('panel #latticeParameters')[0].getComponent('latticeFieldSetMiddle').query('textfield[name="gamma"]')[0].value;
	var spaceGroup = Ext.ComponentQuery.query('panel #latticeParameters')[0].items.items[3].rawValue;
        params.lattice.push({
            a:a,
            b:b,
            c:c,
            alpha:alpha,
            beta:beta,
            gamma:gamma,
	    spaceGroup: spaceGroup
        });
	var num = Ext.ComponentQuery.query('panel #latticeParameters')[0].getComponent('latticeFieldSetBottom').query('textfield[name="num"]')[0].value;
	
	var count=0;
	for (var i=0; i< structureFactors.grid.store.data.items.length; i++) {
        
		    var symbol = structureFactors.grid.store.data.items[i].data.Symbol;
		    var element = structureFactors.grid.store.data.items[i].data.Element;
		    //var wyckoff = structureFactors.grid.store.data.items[i].data.wycoffPosition;
		    var x = structureFactors.grid.store.data.items[i].data.X;
		    var y = structureFactors.grid.store.data.items[i].data.Y;
		    var z = structureFactors.grid.store.data.items[i].data.Z;
		    var occupancy = structureFactors.grid.store.data.items[i].data.Occupancy;
		    var B = structureFactors.grid.store.data.items[i].data.B;
		    if  (symbol !== ""){
		    count++;
		    params.element.push({
			symbol:symbol,
			element:element,
			//wyckoff:wyckoff,
			x:x,
			y:y,
			z:z,
			occupancy:occupancy,
			B:B
		    })};    
	}
	
		  
		    params.num.push({
			num: num
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
            success: function(response) {
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
    var twoThetaPanel = {
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
        items: [button,{fieldLabel: '2Ѳ Min',
            name: 'twoThetaMin'
        },{fieldLabel: '2Ѳ Max',
            name: 'twoThetaMax'
        },]
    };
    
    structureFactors.BottomPanel = new Ext.Panel({
	layout: 'table',
	width: 1200,
	layoutConfig: {
	    columns: 2
	},
	items: [structureFactors.grid,button]
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
        width: 1200,
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