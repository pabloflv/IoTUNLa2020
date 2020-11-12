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
        button.setAttribute("onclick", "loadMdlUpdateValues(" + topics[i]._Edificio__id + ");$('#mdlUpdate').modal('show');");
        button.setAttribute("class", "btn btn-secondary ml-4 mr-4");
        button.textContent = "Modificar";
        td.appendChild(button);
        
        button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("href", "#");
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
    
    document.getElementById('txtNombreEdificio').value = edificio._Edificio__nombre;
    document.getElementById('txtTopicEdificio').value = edificio._Edificio__topic;
}
