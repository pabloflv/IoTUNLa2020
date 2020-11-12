function loadEdificioAndAulas(unorderedList, edificio)
{
    var pEdificio = document.getElementById("edificioName");
    var nameEdificio = document.createTextNode(edificio._Edificio__nombre);
    var hAula = document.getElementById("aulaName");
    var hAulaTxtNode = document.createTextNode(edificio._Edificio__lstAula[0]._Aula__nombre);
    
    pEdificio.appendChild(nameEdificio);
    hAula.appendChild(hAulaTxtNode);
    
    currentAulaTopic = edificio._Edificio__topic + '/' + edificio._Edificio__lstAula[0]._Aula__topic
    currentAula = dictAula[edificio._Edificio__lstAula[0]._Aula__id];
    for (var i = 0; i < edificio._Edificio__lstAula.length; i++) {
        var newUnorderedListItem = document.createElement("li");
        var aAula = document.createElement("a");
        var dotAula = document.createElement("i");
        var pAula = document.createElement("p");
        var nameAula = document.createTextNode(edificio._Edificio__lstAula[i]._Aula__nombre);
        
        pAula.appendChild(nameAula);
        aAula.appendChild(dotAula);
        aAula.appendChild(pAula);
        
        dotAula.setAttribute("class", "far fa-dot-circle nav-icon");
        aAula.setAttribute("href", "#");
        aAula.setAttribute("class", "nav-link");
        aAula.setAttribute("onclick", "currentAula = dictAula[" + edificio._Edificio__lstAula[i]._Aula__id + "];currentAulaTopic = '" + edificio._Edificio__topic + "/" + edificio._Edificio__lstAula[i]._Aula__topic + "';document.getElementById('aulaName').firstChild.textContent = '" + edificio._Edificio__lstAula[i]._Aula__nombre + "';actualizarDatos();");
        
        //"currentAula = " + dictAula[edificio._Edificio__lstAula[i]._Aula__id] + ";"
        
        /*aAula.setAttribute("onclick", "currentAula = " + dictAula[edificio._Edificio__lstAula[i]._Aula__id] + ";$('#aulaName')[0].firstChild.textContent = '" + edificio._Edificio__lstAula[i]._Aula__nombre + "';currentAulaTopic = '" + edificio._Edificio__topic + "/" + edificio._Edificio__lstAula[i]._Aula__topic + "';actualizarDatos();");*/
       
        newUnorderedListItem.setAttribute("class", "nav-item");
        
        newUnorderedListItem.appendChild(aAula);
        unorderedList.appendChild(newUnorderedListItem);
    }
}

function abrir(){
   var el = document.getElementById("menuToggle");
   console.log("Hola");


if (el.classList.contains("menu-open")) {
        el.classList.remove("menu-open");
    } else {
        el.classList.add("menu-open");
    }
}

function loadMdlUpdateValues() {
    $('#mdlFormTitulo')[0].firstChild.textContent = "Modificar Aula";
    $('#mdlBtnConfirmar')[0].value = "Modificar";
    $('#mdlBtnConfirmar')[0].setAttribute("onclick","modAula(" + currentAula._Aula__id + ");");
    $('#txtNombreAula')[0].disabled = false;
    $('#txtTopicAula')[0].disabled = false;
    $('#txtNombreAula')[0].value = currentAula._Aula__nombre;
    $('#txtTopicAula')[0].value = currentAula._Aula__topic;
}

function loadMdlDeleteValues() {
    $('#mdlFormTitulo')[0].firstChild.textContent = "Eliminar Aula";
    $('#mdlBtnConfirmar')[0].value = "Eliminar";
    $('#mdlBtnConfirmar')[0].setAttribute("onclick","delAula(" + currentAula._Aula__id + ");");
    $('#txtNombreAula')[0].disabled = true;
    $('#txtTopicAula')[0].disabled = true;
    $('#txtNombreAula')[0].value = currentAula._Aula__nombre;
    $('#txtTopicAula')[0].value = currentAula._Aula__topic;
}

function modAula(idAula) {
    var aula = dictAula[idAula];
    var newAula = {'_Aula__id': idAula, '_Aula__lstDato': [], '_Aula__nombre': $('#txtNombreAula')[0].value, '_Aula__topic': $('#txtTopicAula')[0].value};
    
    if (aula._Aula__nombre.normalize() !== newAula._Aula__nombre.normalize() || aula._Aula__topic.normalize() !== newAula._Aula__topic.normalize()) {
        $.ajax({
            type: "POST",
            url: "/api_rest/modAula",
            data: JSON.stringify(newAula),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) { location.reload(true); },
            error: function(errMsg) { alert(errMsg); }
        });
    }
}

function delAula(idAula) {
    var aula = dictAula[idAula];
    
    $.ajax({
        type: "POST",
        url: "/api_rest/delAula",
        data: JSON.stringify(aula),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) { location.reload(true); },
        error: function(errMsg) { alert(errMsg); }
    });
}
