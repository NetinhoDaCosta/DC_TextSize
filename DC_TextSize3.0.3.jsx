

// mijnGlobal Variables
var widthIngevoerd = "";
var heightIngevoerd = "";
var mijnComp = "";
var mijnLayer = "";
var progress = 0;


function mijnUserInterface() {
    // Een functie die de interface elementen aanmaakt
    res = "group{orientation:'column', alignment:['fill','fill'], alignChildren:['fill','fill'],\
myImportPanel: Panel{text:'DC TextSize V1.0', orienttaion:'column',alignment:['fill','top'],alignChildren:['left','top'],\
myStaticText: StaticText{text:'Retrieve size data for text objects:'},\
myFilterText: StaticText{text:'Width slider name (to update)'},\
myEditText: EditText{text:'Info width' }alignChildren:['fill','fill'],\
myFilterText: StaticText{text:'Height slider name (to update)'},\
myEditText2: EditText{text:'Info height' },\
myFilterText: StaticText{text:'Mode:'},\
myRadioButton1: RadioButton{text:'Based on a selected composition item'},\
myRadioButton2: RadioButton{text:'Based on the selected layers'},\
myPanelButton1: Button{text:'Get the TextSize data'},\
myProgressBar: Progressbar{text:'Progressbar'},\
},\
}";
}


function mijnUserInterfaceFuncties(myPanel) {
    //een functie die defeault states aangeeft voor interface elementen en tevens de on.click functie van de button verwerkt
    myPanel.grp.myImportPanel.myPanelButton1.onClick = function () {

        widthIngevoerd = myPanel.grp.myImportPanel.myEditText.text;
        heightIngevoerd = myPanel.grp.myImportPanel.myEditText2.text;

        var layerMode = myPanel.grp.myImportPanel.myRadioButton2.value;
        if (layerMode == true) {

            DC_TextSizeUitvoeren();

        }
        var compMode = myPanel.grp.myImportPanel.myRadioButton1.value;

        if (compMode == true) {
            //alert("comp mode");
            DC_TextSizeUitvoerenComp();
        }

        if (layerMode == false && compMode == false) {
            alert("please select at least one of the modes!");
        }

    };
}
function myScript(thisObj){
    function myScript_buildUI(thisObj){
        // een functie om de interface elementen en states samen te voegen en uit te voeren
        var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette","DC_TextSize V1.0", undefined, {resizeable:true});
        mijnUserInterface();
        myPanel.grp = myPanel.add(res);
        myPanel.layout.layout(true);

        mijnUserInterfaceFuncties(myPanel);
        
        progress = myPanel.grp.myImportPanel.myProgressBar;
        progress.value = 0;

        // panel sizing
        myPanel.layout.layout(true);
        myPanel.grp.minimumSize = myPanel.grp.size;

        // maak de panel resizable

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




function DC_TextSizeUitvoeren() {

    mijnComp = app.project.activeItem;

    // detecteer of er ten minste 1 actieve geselecteerde compositie item bestaat
    if (mijnComp == null || (mijnComp instanceof CompItem) == false) {
        alert("Please select at leat one composition item." );
    }

    mijnLayer = mijnComp.selectedLayers;
    var arr =[];
    for (i=0;i<mijnComp.layers;i++){
    }
    mijnLayer = mijnComp.selectedLayers[0]; // De geselecteerde layer pakken
    var mijnLayerNaam = mijnLayer.name;
    var userSelection = mijnComp.selectedLayers;
    
    
app.beginUndoGroup("DC_TextSize");
    
    // Zorg ervoor dat de geselecteerde layer niet leeg is
    if (mijnLayer == null){ 
        alert("Please select at least one text layer");

    } else {
        // Loop door alle "geselecteerde layers" en bekijk of de textlayer daadwerkelijk een textelement is
        for (var i=0; i<userSelection.length; i++) {
            if( (mijnComp.selectedLayers[i] instanceof TextLayer) == true) {
                // voert per layer de DC_TextSize functie uit
                DC_TextSize(i);
                if (i == userSelection.length -1){
                    // de finish melding
                    alert("Done collecting textSize data!");

                                            // de progressbar updaten
                                            progress.minvalue = progress.value=0;
                                            progress.maxvalue = userSelection.length;
                                            for (n=0; n<userSelection.length; n++){
                                                // update
                                                progress.value +=1;
                                                };
                    } // Einde van de if statement

            } // Einde van de if statement "is textlaye true"
        } // Einde van de for loop
    } // Einde van de else statement
app.endUndoGroup();
}

function DC_TextSizeUitvoerenComp() {

    mijnComp = app.project.activeItem;

    // detecteer of er ten minste 1 actieve geselecteerde compositie item bestaat

    if (mijnComp == null || (mijnComp instanceof CompItem) == false) {
        alert("Please select at leat one composition item." );
    }

    var arr =[];
    for (i=0;i<mijnComp.layers;i++){
    }

    // Alle layers uit de geselecteerde compositie item vastpakken
    mijnLayer = mijnComp.layers; 
    //alert(mijnLayer[1]);

app.beginUndoGroup("DC_TextSize");


    // Zorg ervoor dat de geselecteerde "Compositie Layer" niet leeg is
    if (mijnLayer.length < 1){ 
        alert("Please select a composition item with at least one text layer");

    } else {
        for (var i=1; i<mijnLayer.length+1; i++) {
            if( (mijnLayer[i] instanceof TextLayer) == true) {
                
                //alert(mijnLayer[i].name);
                DC_TextSizeComp(i);
                if (i == mijnLayer.length){
                    alert("Done collecting textSize data!");
                                            progress.minvalue = progress.value=0;
                                            progress.maxvalue = mijnLayer.length;
                                            for (n=0; n<mijnLayer.length; n++){
                                                // do stuff
                                                progress.value +=1;
                                            };
                } // Einde van de if statement
            } // Einde van de if statement "is textlaye true"
        } // Einde van de for loop
    } // Einde van de else statement
app.endUndoGroup();

}


function DC_TextSize(layer) {

    mijnComp = app.project.activeItem;
    mijnLayer = mijnComp.selectedLayers;


    // De geselecteerde layer pakken -- LOCAL VARIABLE
    var mijnLayer2 = mijnComp.selectedLayers[layer]; 
    var mijnLayerNaam = mijnLayer2.name;

    // ** De hoogte en breedte van de geselecteerde text element vastgrijpen ** //

    var textBox = mijnLayer2.sourceRectAtTime(0, false);
    var textWidth = textBox.width;
    var textHeight = textBox.height;

    var breedteNaam = "Info width";
    var hoogteNaam = "Info height";


    mijnSliderA = mijnLayer2.property("Effects").property("ADBE Slider Control")
    if(mijnSliderA == null) { // Controleren or er al slider controls bestaan

        // ** De Slider Controls Aanmaken (Hoogte) ** //
        var mijnSlider2 = mijnLayer2.property("Effects").addProperty("ADBE Slider Control");
        mijnSlider2.name = breedteNaam;
        mijnSlider2.property("Slider").setValue(textWidth);

        // ** De Slider Controls Aanmaken (Breedte) ** //
        var mijnSlider1 = mijnLayer2.property("Effects").addProperty("ADBE Slider Control");
        mijnSlider1.name = hoogteNaam;
        mijnSlider1.property("Slider").setValue(textHeight);

        var layerGetal = mijnLayer2.index +1;

        var aantalLayers = mijnComp.layers.length;
        var test = "testen123";
        //alert(aantalLayers);
        mijnSolidIndex = aantalLayers +1;
        //alert (mijnSolidIndex);

        var mijnSolidSettings = [1920,1080,1,10,24]
        // var MijnSolid = mijnComp.layers.addSolid([0.1, 0.1, 0.3], "BGSolid", mijnSolidSettings[0], mijnSolidSettings[1], mijnSolidSettings[2]);


    } else {
        // De else statement die het vervangen van data uitvoert

        var mijnLayer2 = mijnComp.selectedLayers[layer]; // De geselecteerde layer pakken

        var mijnSlider = mijnLayer2.property("Effects");
        var aantalEffecten = mijnSlider.numProperties; //  Aantal gevonden effecten in deze layer

        for (i=1;i<=aantalEffecten;i++){ //De namen en indexes van de sliders effecten in een array plaatsen
            var namenArray = new Array();

            var sliderIndex =  i+1;
            namenArray[i] = mijnSlider(i).name;
            if (mijnSlider(i).name == widthIngevoerd){
                mijnSlider(i).property("Slider").setValue(textWidth);
            }
            if (mijnSlider(i).name == heightIngevoerd){
                mijnSlider(i).property("Slider").setValue(textHeight);
            }
        }
    } // einde van de else statement

}

function DC_TextSizeComp(layer) {

    mijnComp = app.project.activeItem;

    // De geselecteerde layer pakken -- LOCAL VARIABLE

    var mijnLayer2 = mijnComp.layer(layer);
    //alert(mijnLayer2);
    var mijnLayerNaam = mijnLayer2.name;

    // ** De hoogte en breedte van de geselecteerde text element vastgrijpen ** //

    var textBox = mijnLayer2.sourceRectAtTime(0, false);
    var textWidth = textBox.width;
    var textHeight = textBox.height;

    var breedteNaam = "Info width";
    var hoogteNaam = "Info height";


    mijnSliderA = mijnLayer2.property("Effects").property("ADBE Slider Control")
    if(mijnSliderA == null) { // Controleren or er al slider controls bestaan

        // ** De Slider Controls Aanmaken (Hoogte) ** //
        var mijnSlider2 = mijnLayer2.property("Effects").addProperty("ADBE Slider Control");
        mijnSlider2.name = breedteNaam;
        mijnSlider2.property("Slider").setValue(textWidth);

        // ** De Slider Controls Aanmaken (Breedte) ** //
        var mijnSlider1 = mijnLayer2.property("Effects").addProperty("ADBE Slider Control");
        mijnSlider1.name = hoogteNaam;
        mijnSlider1.property("Slider").setValue(textHeight);

        var layerGetal = mijnLayer2.index +1;

        var aantalLayers = mijnComp.layers.length;
        var test = "testen123";
        //alert(aantalLayers);
        mijnSolidIndex = aantalLayers +1;
        //alert (mijnSolidIndex);

        var mijnSolidSettings = [1920,1080,1,10,24]
        // var MijnSolid = mijnComp.layers.addSolid([0.1, 0.1, 0.3], "BGSolid", mijnSolidSettings[0], mijnSolidSettings[1], mijnSolidSettings[2]);
    } else {
        // De else statement die het vervangen van data uitvoert

        var mijnLayer2 = mijnComp.layer(layer); // De geselecteerde layer pakken -- LOCAL VARIABLE

        var mijnSlider = mijnLayer2.property("Effects");
        var aantalEffecten = mijnSlider.numProperties; //  Aantal gevonden effecten in deze layer

        for (i=1;i<=aantalEffecten;i++){ //De namen en indexes van de sliders effecten in een array plaatsen
            var namenArray = new Array();

            var sliderIndex =  i+1;
            namenArray[i] = mijnSlider(i).name;
            if (mijnSlider(i).name == widthIngevoerd){
                mijnSlider(i).property("Slider").setValue(textWidth);
            }
            if (mijnSlider(i).name == heightIngevoerd){
                mijnSlider(i).property("Slider").setValue(textHeight);
            }
        }
    } // einde van de else statement

}




function DC_getEffects(layer, matchName){
    // berekent het aantal effecten in een layer 
    var matchingEffects = [];

    var N,n;
    if (layer.effect)
    {
        N = layer.effect.numProperties;
        for (n=1; n<=N; n++) if (layer.effect(n).matchName===matchName) matchingEffects.push(layer.effect(n));
    };
    return matchingEffects;
}; // Einde DC_getEffects



// EINDE TESTEN of een object in een array bestaan


