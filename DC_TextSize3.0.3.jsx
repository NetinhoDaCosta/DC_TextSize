

var widthIngevoerd = "";
var heightIngevoerd = "";
var mijnComp = "";
var mijnLayer = "";
/*
var widthMargin ="";
var heightmargin = "";
var BGsolid = false;
*/

///var mijnBreedte = app.project.item(1).layer(1).width;
//alert (mijnBreedte123);
app.beginUndoGroup("DC_TextSize");

function myScript(thisObj){
    function myScript_buildUI(thisObj){
        var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette","My window name", undefined, {resizeable:true});
     
// er is ook een parameter genamd :  preferredSize[-1,20]     

res =  "group{orientation:'column', alignment:['fill','fill'], alignChildren:['fill','fill'],\
myImportPanel: Panel{text:'DC TextSize 2.0', orienttaion:'column',alignment:['fill','top'],alignChildren:['left','top'],\
myStaticText: StaticText{text:'Fetch the width and height data for the following objects:'},\
myFilterText: StaticText{text:'Width slider name'},\
myEditText: EditText{text:'Info width' }alignChildren:['fill','fill'],\
myFilterText: StaticText{text:'Height slider name'},\
myEditText2: EditText{text:'Info height' },\
myFilterText: StaticText{text:'Mode:'},\
myRadioButton1: RadioButton{text:'Based on a selected composition item'},\
myRadioButton2: RadioButton{text:'Based on the selected layers'},\
myPanelButton1: Button{text:'Get the TextSize data'},\
myStaticText: StaticText{text:'The data of existing control sliders named width and hight will be overwriten.'},\
},\
}";

/*
res =  "group{orientation:'column', alignment:['fill','fill'], alignChildren:['fill','fill'],\
myImportPanel: Panel{text:'DC TextSize 2.0', orienttaion:'column',alignment:['fill','top'],alignChildren:['left','top'],\
myStaticText: StaticText{text:'Fetch the width and height data for the following objects:'},\
myFilterText: StaticText{text:'Width slider name'},\
myEditText: EditText{text:'Info width' }alignChildren:['fill','fill'],\
myFilterText: StaticText{text:'Height slider name'},\
myEditText2: EditText{text:'Info height' },\
myCheckboxText: StaticText{text:'Solid Options:'},\
myCheckbox: Checkbox{text:'Create a rescaled solid below every text object'},\
myWidthMarginText: StaticText{text:'Define the width margin in pixels'},\
myWidthMarginEditText: EditText{text:'0 is the default width margin' },\
myHeightMarginText: StaticText{text:'Define the height margin in pixels'},\
myHeightMarginEditText: EditText{text:'0 is the default height margin' },\
myPanelButton1: Button{text:'Get the TextSize data'},\
myStaticText: StaticText{text:'The data of existing control sliders named width and hight will be overwriten.'},\
},\
}";
*/

                  
        myPanel.grp = myPanel.add(res);
        myPanel.layout.layout(true);

        // Defeaults
        //myPanel.grp.myImportPanel.myDropDownList.selection = 1;   

        myPanel.grp.myImportPanel.myPanelButton1.onClick = function(){ 
        	
        	/*widthIngevoerd = myPanel.grp.myImportPanel.myEditText.text;
        	heightIngevoerd = myPanel.grp.myImportPanel.myEditText2.text;

        	var checkboxValue = myPanel.grp.myImportPanel.myCheckbox.value;

        	if(checkboxValue == true) {
        		BGsolid = true;

		        	if(BGSolid == true) {
					alert("solid test");
					var mijnComp = app.project.activeItem;

			      	// create new solid named "my square"
			      	var manXsize=400;
			      	var manYsize=90;
			      	var mySolid = mijnComp.layers.addSolid([1.0,1.0,0], "BJObject", manXsize, manYsize, 1, compL);
			      	mySolid.threeDLayer = true;
				}
        	}*/
        	var layerMode = myPanel.grp.myImportPanel.myRadioButton2.value;
        	if (layerMode == true) {

        	DC_TextSizeUitvoeren();

        	}
        	var compMode = myPanel.grp.myImportPanel.myRadioButton1.value;

        	if (null) {

        	}

        };    

        // myScriptPal.grp.groupOne.myButton.onClick = function()

        // setup panel sizing
        myPanel.layout.layout(true);
        myPanel.grp.minimumSize = myPanel.grp.size;
         
         // make the panel resizable
         
        myPanel.layout.resize();
        myPanel.onResizing = myPanel.onResize = function() {this.layout.resize()};

        return myPanel;
    }
    var myScriptPal = myScript_buildUI(thisObj);
   
    if((myScriptPal != null) && (myScriptPal instanceof Window)){
        myScriptPal.center();
        myScriptPal.show();
    }
}

myScript(this); 

// TESTEN of een object in een array bestaat
// Omzetten in een functie zodat ik kan testen of in de array "selectedComp" minimaal 1 van de layers een textlayer is.
var mijnArray = ["appel", "boom", "auto"];


function in_array(naald, hooiberg){
    var found = 0;
    for (var i=0, len=hooiberg.length;i<len;i++) {
        if (hooiberg[i] == naald) return i;
            found++;
    }
    return -1;
}

var uitkomst = in_array("test","mijnArray");


if(in_array("test",mijnArray)!= -1){
//alert ("zit in array");
} else {
	//alert("zit niet in array");
}

// EINDE TESTEN of een object in een array bestaan

function DC_TextSizeUitvoeren() {


mijnComp = app.project.activeItem;

if (mijnComp == null || (mijnComp instanceof CompItem) == false) {
alert("Please select at leat one composition item." );    
}

mijnLayer = mijnComp.selectedLayers;
var arr =[];
for (i=0;i<mijnComp.layers;i++){
	//alert[i];

}
		mijnLayer = mijnComp.selectedLayers[0]; // De geselecteerde layer pakken
		var mijnLayerNaam = mijnLayer.name;
		var userSelection = mijnComp.selectedLayers;
			//alert(userSelection);

			// De for loop waarin alle geselecteerde TEXT elements apart worden behandeld
		if (mijnLayer == null || (mijnLayer instanceof TextLayer) == false){ // Zorg ervoor dat de geselecteerde layer niet leeg is
			alert("Please select at least one text layer");
//		if (mijnLayer == null || (mijnLayer instanceof TextLayer) == false){ // Zorg ervoor dat de geselecteerde layer niet leeg is

		} else {
				for (var i=0; i<userSelection.length; i++) {
					if( (mijnComp.selectedLayers[i] instanceof TextLayer) == true) {
						DC_TextSize(i);
						
					}
				}
		}
	
}


function DC_TextSize(layer) {

			mijnComp = app.project.activeItem;
			mijnLayer = mijnComp.selectedLayers;

			var mijnLayer2 = mijnComp.selectedLayers[layer]; // De geselecteerde layer pakken -- LOCAL VARIABLE
			var mijnLayerNaam = mijnLayer2.name;
			// alert("test");

			// ** De hoogte en breedte van de geselecteerde text element vastgrijpen ** //

			var textBox = mijnLayer2.sourceRectAtTime(0, false);
			var textWidth = textBox.width;
			var textHeight = textBox.height;

			//alert(textWidth);
			// alert(textHeight);

//			var breedteNaam = "The width for: " + mijnLayerNaam;
//			var hoogteNaam = "The height for: " + mijnLayerNaam;
		var breedteNaam = "Info width";
		var hoogteNaam = "Info height";


			mijnSliderA = mijnLayer2.property("Effects").property("ADBE Slider Control")
			// alert("mijnSliderA");
			if(mijnSliderA == null) { // Controleren or er al slider controls bestaan
				
				// ** De Slider Controls Aanmaken (Hoogte) ** //
				var mijnSlider1 = mijnLayer2.property("Effects").addProperty("ADBE Slider Control");
				mijnSlider1.name = breedteNaam;
				mijnSlider1.property("Slider").setValue(textWidth);

				// ** De Slider Controls Aanmaken (Breedte) ** //
				var mijnSlider2 = mijnLayer2.property("Effects").addProperty("ADBE Slider Control");
				mijnSlider2.name = hoogteNaam;
				mijnSlider2.property("Slider").setValue(textHeight);

				var layerGetal = mijnLayer2.index +1;

				var aantalLayers = mijnComp.layers.length;
				var test = "testen123";			 
				//alert(aantalLayers);
				mijnSolidIndex = aantalLayers +1;
				//alert (mijnSolidIndex);

				var mijnSolidSettings = [1920,1080,1,10,24]
				// var MijnSolid = mijnComp.layers.addSolid([0.1, 0.1, 0.3], "BGSolid", mijnSolidSettings[0], mijnSolidSettings[1], mijnSolidSettings[2]);	


			} else {

			var mijnLayer2 = mijnComp.selectedLayers[layer]; // De geselecteerde layer pakken -- LOCAL VARIABLE

				var mijnSlider1 = mijnLayer2.property("Effects").property("ADBE Slider Control");

				mijnSlider1.name = breedteNaam;
				mijnSlider1.property("Slider").setValue(textWidth);

				// ** De Slider Controls Aanmaken (Breedte) ** //
				var mijnSlider2 = mijnLayer2.property("Effects").property("ADBE Slider Control");

				mijnSlider2.name = hoogteNaam;

				mijnSlider2.property("Slider").setValue(textHeight);

				var mijnEersteSlider = mijnLayer2.property("Effects").property("ADBE Slider Control");
				var mijnTweedeSlider = mijnLayer2.property("Effects").property("ADBE Slider Control");

				var gevonden = DC_getEffects(mijnLayer2 ,"ADBE Slider Control");
				var aantalGevondenEffecten = gevonden.length;
				//alert(aantalGevondenEffecten);

				for (p=0; p<aantalGevondenEffecten; p++){
					var eersteGevondenSlider = gevonden[0];
					var tweedeGevondenSlider = gevonden[1];			

				}
					if (eersteGevondenSlider.name == widthIngevoerd) {
						// alert("auto");
						eersteGevondenSlider.property("Slider").setValue(textHeight);
					}
					if (tweedeGevondenSlider.name == heightIngevoerd) {

						tweedeGevondenSlider.property("Slider").setValue(textWidth);
						// alert("appel");
					}

			}

}



app.endUndoGroup();

function DC_Vervangen() {
}


function DC_getEffects(layer, matchName){

    var matchingEffects = [];

    var N,n;
    if (layer.effect)
    {
        N = layer.effect.numProperties;
        for (n=1; n<=N; n++) if (layer.effect(n).matchName===matchName) matchingEffects.push(layer.effect(n));
        };
    return matchingEffects;
    };

function DC_TextSizeUitvoereComp() {


		mijnComp = app.project.activeItem;

		if (mijnComp == null || (mijnComp instanceof CompItem) == false) {
		alert("Please select at leat one composition item." );    
		}

		mijnLayers = mijnComp.layers;
		var mijnLayerNaam = mijnLayer.name;
		var userSelection = mijnComp.selectedLayers;
			//alert(userSelection);

			// De for loop waarin alle geselecteerde TEXT elements apart worden behandeld
		if (mijnLayers == null){ // Zorg ervoor dat de geselecteerde layer niet leeg is
			alert("Please select a composition with at least one text layer");
//		if (mijnLayer == null || (mijnLayer instanceof TextLayer) == false){ // Zorg ervoor dat de geselecteerde layer niet leeg is

		} else {
				for (var i=0; i<mijnLayers.length; i++) {
					if( (mijnComp.selectedLayers[i] instanceof TextLayer) == true) {
						DC_TextSizeComp(i);
						
					}
				}
		}
	
}

function DC_TextSizeComp(layer) {

			mijnComp = app.project.activeItem;
			mijnLayer = mijnComp.selectedLayers;

			var mijnLayer2 = mijnComp.selectedLayers[layer]; // De geselecteerde layer pakken -- LOCAL VARIABLE
			var mijnLayerNaam = mijnLayer2.name;
			// alert("test");

			// ** De hoogte en breedte van de geselecteerde text element vastgrijpen ** //

			var textBox = mijnLayer2.sourceRectAtTime(0, false);
			var textWidth = textBox.width;
			var textHeight = textBox.height;

			//alert(textWidth);
			// alert(textHeight);

//			var breedteNaam = "The width for: " + mijnLayerNaam;
//			var hoogteNaam = "The height for: " + mijnLayerNaam;
		var breedteNaam = "Info width";
		var hoogteNaam = "Info height";


			mijnSliderA = mijnLayer2.property("Effects").property("ADBE Slider Control")
			// alert("mijnSliderA");
			if(mijnSliderA == null) { // Controleren or er al slider controls bestaan
				
				// ** De Slider Controls Aanmaken (Hoogte) ** //
				var mijnSlider1 = mijnLayer2.property("Effects").addProperty("ADBE Slider Control");
				mijnSlider1.name = breedteNaam;
				mijnSlider1.property("Slider").setValue(textWidth);

				// ** De Slider Controls Aanmaken (Breedte) ** //
				var mijnSlider2 = mijnLayer2.property("Effects").addProperty("ADBE Slider Control");
				mijnSlider2.name = hoogteNaam;
				mijnSlider2.property("Slider").setValue(textHeight);

				var layerGetal = mijnLayer2.index +1;

				var aantalLayers = mijnComp.layers.length;
				var test = "testen123";			 
				//alert(aantalLayers);
				mijnSolidIndex = aantalLayers +1;
				//alert (mijnSolidIndex);

				var mijnSolidSettings = [1920,1080,1,10,24]
				// var MijnSolid = mijnComp.layers.addSolid([0.1, 0.1, 0.3], "BGSolid", mijnSolidSettings[0], mijnSolidSettings[1], mijnSolidSettings[2]);	


			} else {

			var mijnLayer2 = mijnComp.selectedLayers[layer]; // De geselecteerde layer pakken -- LOCAL VARIABLE

				var mijnSlider1 = mijnLayer2.property("Effects").property("ADBE Slider Control");

				mijnSlider1.name = breedteNaam;
				mijnSlider1.property("Slider").setValue(textWidth);

				// ** De Slider Controls Aanmaken (Breedte) ** //
				var mijnSlider2 = mijnLayer2.property("Effects").property("ADBE Slider Control");

				mijnSlider2.name = hoogteNaam;

				mijnSlider2.property("Slider").setValue(textHeight);

				var mijnEersteSlider = mijnLayer2.property("Effects").property("ADBE Slider Control");
				var mijnTweedeSlider = mijnLayer2.property("Effects").property("ADBE Slider Control");

				var gevonden = DC_getEffects(mijnLayer2 ,"ADBE Slider Control");
				var aantalGevondenEffecten = gevonden.length;
				//alert(aantalGevondenEffecten);

				for (p=0; p<aantalGevondenEffecten; p++){
					var eersteGevondenSlider = gevonden[0];
					var tweedeGevondenSlider = gevonden[1];			

				}
					if (eersteGevondenSlider.name == widthIngevoerd) {
						// alert("auto");
						eersteGevondenSlider.property("Slider").setValue(textHeight);
					}
					if (tweedeGevondenSlider.name == heightIngevoerd) {

						tweedeGevondenSlider.property("Slider").setValue(textWidth);
						// alert("appel");
					}

			}

}



/*
function DC_BGSolid(BGSolid){

		if(BGSolid == true) {
			alert("solid test");
			var mijnComp = app.project.activeItem;

	      	// create new solid named "my square"
	      	var manXsize=400;
	      	var manYsize=90;
	      	var mySolid = mijnComp.layers.addSolid([1.0,1.0,0], "BJObject", manXsize, manYsize, 1, compL);
	      	mySolid.threeDLayer = true;
		}
}
*/

/*
 function DC_veranderInhoud(eersteGevondenSlider,tweedeGevondenSlider){
 
        var comp, layer, matchingEffects;
 
        comp = app.project.activeItem;
 
        if (comp instanceof CompItem && comp.selectedLayers.length>0)
        {
            layer = comp.selectedLayers[0];
            // plaatst alle Slider effects 'Slider" effects in een array
            matchingEffects = getEffects(layer, "ADBE Slider Control");
            if (matchingEffects.length>0)
            {

            	eersteGevondenSlider = widthIngevoerd;

				tweedeGevondenSlider = heightIngevoerd;



                // get the current color of the 1st occurence to iitialise the color picker (not necessary, $.colorPicker() works with no argument too):
                // color is [R,G,B] with each entry in [0,1] >>> convert to hex
                initColor = matchingEffects[0].property("ADBE Fill-0002").value;
                initColor = colorToHex(initColor);
 
                // launch the color picker with initial value initColor;
                do {color = $.colorPicker(initColor);} while (color<0 && confirm("Retry ?"));
 
                if (color>=0)

            else
            {
                //alert("The selected layer should have at least one \"Slider\" effect.", "Wrong script selection");
                };
            }
        else
        {
            // alert("Select a layer with a \"Slider\" effect.", "Wrong script selection");
            };
        return;
};


/*
function anchorPointOffset(myLayerInput){

	var myLayer = mijnComp.selectedLayers[0];     //text layer
	var myTextBox = myLayer.property("ADBE Text Properties").property("ADBE Text Document");     //The text box
	 
	var myTextBoxSizeX = myTextBox.value.boxTextSize[0];     //The text box X size
	var myTextBoxSizeY = myTextBox.value.boxTextSize[1];     //The text box Y size
	 
	var myLayerPX = myLayer.property("Position").value[0];     //Layer position X
	var myLayerPY = myLayer.property("Position").value[1];     //Layer position Y
	 
	var myLayerAPX = myLayer.property("Anchor Point").value[0];     //Layer anchor point X
	var myLayerAPY = myLayer.property("Anchor Point").value[1];     //Layer anchor point Y
	 
	var myTextBoxCompLocationX = myLayerPX - myLayerAPX;     //Should be the center X location of the text box within the comp space
	var myTextBoxCompLocationY = myLayerPY - myLayerAPY;     //Should be the center Y location of the text box within the comp space
	 
	/*
	     Should be able to subtract the anchor from the position to find center of box then offset by the box X or Y divided by 2 to get a boundry line of the box. I may be over thinking this too.
	
	 
	var myTextBoxCompLocationRightBoundryLineMaybe = (myTextBoxSizeY/2) - myTextBoxCompLocationY;
	 
	alert(myTextBoxCompLocationRightBoundryLineMaybe);


}
*/
/*

var userSelection = app.project.activeItem.selectedLayers;
var num3d = 0;
 
for (var j=0; j<userSelection.length; j++)
  if (userSelection[j].threeDLayer) num3d++;
 
if (num3d != userSelection.length){
  alert ("Not all selected layers are 3D");
}else{
  alert ("All selected layers are 3D");
}

// Een  wipe layer
var wipeLayer = currentComp.layers.addSolid([0.1, 0.1, 0.1], "Wipe", cs[0], cs[1], cs[2]);
wipeLayer.Effects.addProperty("Radial Wipe");
wipeLayer.property("Effects").property("Radial Wipe").property("Wipe").setValue(2); // Counterclockwise
wipeLayer.property("Opacity").setValue(50);
 
// wipe transition animeren
wipeLayer.property("Effects").property("Radial Wipe").property("Transition Completion").setValueAtTime(0, 100);
wipeLayer.property("Effects").property("Radial Wipe").property("Transition Completion").setValueAtTime(1, 0);
wipeLayer.property("Effects").property("Radial Wipe").property("Transition Completion").expression = "loopOut('Cycle')";



app.project.item(index).layers.addSolid(color, name, width, height, pixelAspect, duration)
*/
