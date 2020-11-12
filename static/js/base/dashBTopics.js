function loadTopics(section, topics)
{
    var topicsTable = document.createElement("table");
    var tableHeader = document.createElement("thead");
    var tableBody = document.createElement("tbody");
    var tableRow, th, td, text, button;
    
    
    topicsTable.setAttribute("id", "topicsTable");
    topicsTable.setAttribute("class", "table table-dark table-bordered table-striped");
    topicsTable.setAttribute("style", "margin-left: 250px; width: calc(100% - 250px)");
    section.appendChild(topicsTable);
    
    tableHeader.setAttribute("class", "thead-dark")
    topicsTable.appendChild(tableHeader);
    
    topicsTable.appendChild(tableBody);
    
    
    tableRow = document.createElement("tr");
    tableHeader.appendChild(tableRow);
    
    th = document.createElement("th");
    th.setAttribute("scope", "col");
    tableRow.appendChild(th);
    text = document.createTextNode("ID");
    th.appendChild(text);
    
    th = document.createElement("th");
    th.setAttribute("scope", "col");
    tableRow.appendChild(th);
    text = document.createTextNode("Nombre");
    th.appendChild(text);
    
    th = document.createElement("th");
    th.setAttribute("scope", "col");
    tableRow.appendChild(th);
    text = document.createTextNode("Tópico");
    th.appendChild(text);
    
    th = document.createElement("th");
    th.setAttribute("scope", "col");
    th.setAttribute("style", "width: 30%;");
    tableRow.appendChild(th);
    text = document.createTextNode("Operaciones");
    th.appendChild(text);
    
    for (var i = 0; i < topics.length; i++) {
        tableRow = document.createElement("tr");
        tableBody.appendChild(tableRow);
        
        th = document.createElement("th");
        th.setAttribute("scope", "row");
        tableRow.appendChild(th);
        text = document.createTextNode(topics[i]._Edificio__id);
        th.appendChild(text);
        
        td = document.createElement("td");
        tableRow.appendChild(td);
        text = document.createTextNode(topics[i]._Edificio__nombre);
        td.appendChild(text);
        
        td = document.createElement("td");
        tableRow.appendChild(td);
        text = document.createTextNode(topics[i]._Edificio__topic);
        td.appendChild(text);
        
        td = document.createElement("td");
        td.setAttribute("style","text-align: center;");
        tableRow.appendChild(td);
        
        button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("href", "#");
        button.setAttribute("onclick", "window.location.href = '/devices?id=" + topics[i]._Edificio__id + "';");
        button.setAttribute("class", "btn btn-secondary mr-4");
        button.textContent = "Ir al Dashboard";
        td.appendChild(button);
        
        button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("href", "#");
        button.setAttribute("onclick", "loadMdlUpdateValues(" + topics[i]._Edificio__id + ");$('#mdlForm').modal('show');");
        button.setAttribute("class", "btn btn-secondary ml-4 mr-4");
        button.textContent = "Modificar";
        td.appendChild(button);
        
        button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("href", "#");
        button.setAttribute("onclick", "loadMdlDeleteValues(" + topics[i]._Edificio__id + ");$('#mdlForm').modal('show');");
        button.setAttribute("class", "btn btn-secondary ml-4");
        button.textContent = "Eliminar";
        td.appendChild(button);
        
        $(tableRow).mouseenter(function() {
            this.setAttribute("style", "background-color: rgba(255, 255, 255, .15);");
        });
        
        $(tableRow).mouseleave(function() {
            this.setAttribute("style", "");
        });
    }
}

function loadMdlUpdateValues(idEdificio) {
    var edificio = dictEdificio[idEdificio];
    
    $('#mdlFormTitulo')[0].firstChild.textContent = "Modificar Edificio";
    $('#mdlBtnConfirmar')[0].value = "Modificar";
    $('#mdlBtnConfirmar')[0].setAttribute("onclick","modEdificio(" + idEdificio + ");");
    $('#txtNombreEdificio')[0].disabled = false;
    $('#txtTopicEdificio')[0].disabled = false;
    $('#txtNombreEdificio')[0].value = edificio._Edificio__nombre;
    $('#txtTopicEdificio')[0].value = edificio._Edificio__topic;
}

function loadMdlDeleteValues(idEdificio) {
    var edificio = dictEdificio[idEdificio];
    
    $('#mdlFormTitulo')[0].firstChild.textContent = "Eliminar Edificio";
    $('#mdlBtnConfirmar')[0].value = "Eliminar";
    $('#mdlBtnConfirmar')[0].setAttribute("onclick","delEdificio(" + idEdificio + ");");
    $('#txtNombreEdificio')[0].disabled = true;
    $('#txtTopicEdificio')[0].disabled = true;
    $('#txtNombreEdificio')[0].value = edificio._Edificio__nombre;
    $('#txtTopicEdificio')[0].value = edificio._Edificio__topic;
}

function modEdificio(idEdificio) {
    var edificio = dictEdificio[idEdificio];
    var newEdificio = {'_Edificio__id': idEdificio, '_Edificio__lstAula': [], '_Edificio__nombre': $('#txtNombreEdificio')[0].value, '_Edificio__topic': $('#txtTopicEdificio')[0].value};
    
    if (edificio._Edificio__nombre.normalize() !== newEdificio._Edificio__nombre.normalize() || edificio._Edificio__topic.normalize() !== newEdificio._Edificio__topic.normalize()) {
        $.ajax({
            type: "POST",
            url: "/api_rest/modEdificio",
            data: JSON.stringify(newEdificio),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) { location.reload(true); },
            error: function(errMsg) { alert(errMsg); }
        });
    }
}

function delEdificio(idEdificio) {
    var edificio = dictEdificio[idEdificio];
    
    $.ajax({
        type: "POST",
        url: "/api_rest/delEdificio",
        data: JSON.stringify(edificio),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) { location.reload(true); },
        error: function(errMsg) { alert(errMsg); }
    });
}
