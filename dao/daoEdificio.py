from model.edificio import Edificio
from dao import dao

def getEdificio(idEdificio: int):
    dbDict = dao.openDBConnection()

    query = "SELECT Edificio.idEdificio, Edificio.nombre FROM Edificio " \
            "WHERE Edificio.idEdificio = %s " \
            "ORDER BY Edificio.idEdificio ASC"
    dbDict['cursor'].execute(query, (idEdificio))

    dictEdificio = {}
    for fila in dbDict['cursor']:
        edificio = __getDictValue(dictEdificio, fila[0])
        if edificio is None:
            edificio = Edificio(fila[0], fila[1], list())
            dictEdificio[edificio.getId()] = edificio

    dao.closeDBConnection(dbDict)
    return dictEdificio

def getEdificioByNombre(nombre: str):
    dbDict = dao.openDBConnection()

    query = "SELECT Edificio.idEdificio, Edificio.nombre FROM Edificio " \
            "WHERE Edificio.nombre = %s " \
            "ORDER BY Edificio.idEdificio ASC " \
            "LIMIT 1"
    dbDict['cursor'].execute(query, (nombre, ))

    edificio = Edificio(0, "", list())
    for fila in dbDict['cursor']:
        edificio.setId(fila[0])
        edificio.setNombre(fila[1])

    dao.closeDBConnection(dbDict)
    return edificio

def __getDictValue(dictionary: dict, index: int):
    try:
        return dictionary[index]
    except KeyError:
        return None