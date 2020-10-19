function loadTopics(section, topics, tableRows)
{
    var topicsTable = document.createElement("table");
    var tableHeader = document.createElement("thead");
    var tableBody = document.createElement("tbody");
    var tableRow, th, td, text;
    
    
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
        
        tableRows.push(tableRow);
        
        $(tableRow).mouseenter(function() {
            this.setAttribute("style", "background-color: rgba(255, 255, 255, .15);");
        });
        
        $(tableRow).mouseleave(function() {
            this.setAttribute("style", "");
        });
        
        a = function() {
            var id = topics[i]._Edificio__id;
            
            $(tableRow).click(function() {
                idCopy = id;
                window.location.href = '/devices?id=' + id;
            });
        }();
    }
}
