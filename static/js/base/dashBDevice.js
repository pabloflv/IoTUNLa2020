function loadEdificioAndAulas(unorderedList, edificio)
{
    var pEdificio = document.getElementById("edificioName");
    var nameEdificio = document.createTextNode(edificio._Edificio__nombre);
    
    pEdificio.appendChild(nameEdificio);
    
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
