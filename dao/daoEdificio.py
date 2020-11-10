from model.edificio import Edificio
from model.aula import Aula
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
            edificio = Edificio(fila[0], fila[1], "", list())
            dictEdificio[edificio.getId()] = edificio

    dao.closeDBConnection(dbDict)
    return dictEdificio

def getEdificioByTopic(topic: str):
    dbDict = dao.openDBConnection()

    query = "SELECT Edificio.idEdificio, Edificio.nombre FROM Edificio " \
            "WHERE Edificio.topic = %s " \
            "ORDER BY Edificio.idEdificio ASC " \
            "LIMIT 1"
    dbDict['cursor'].execute(query, (topic, ))

    edificio = Edificio(0, "", "", list())
    for fila in dbDict['cursor']:
        edificio.setId(fila[0])
        edificio.setNombre(fila[1])

    dao.closeDBConnection(dbDict)
    return edificio

def getEdificioWithAllAula(idEdificio: int):
    dbDict = dao.openDBConnection()

    query = "SELECT Edificio.idEdificio, Edificio.nombre, Aula.idAula, Aula.nombre FROM Edificio " \
            "INNER JOIN Aula ON Edificio.idEdificio = Aula.idEdificio " \
            "WHERE Edificio.idEdificio = %s " \
            "ORDER BY Edificio.idEdificio ASC"
    dbDict['cursor'].execute(query, (idEdificio, ))

    primeraFila = dbDict['cursor'].fetchone()
    edificio = Edificio(primeraFila[0], primeraFila[1], "", list())
    edificio.getLstAula().append(Aula(primeraFila[2], primeraFila[3], "", list()))

    for fila in dbDict['cursor']:
        aula = Aula(fila[2], fila[3], "", list())
        edificio.getLstAula().append(aula)

    dao.closeDBConnection(dbDict)
    return edificio

def getAllEdificio():
    dbDict = dao.openDBConnection()

    query = "SELECT Edificio.idEdificio, Edificio.nombre FROM Edificio " \
            "ORDER BY Edificio.idEdificio ASC"
    dbDict['cursor'].execute(query)

    dictEdificio = {}
    for fila in dbDict['cursor']:
        edificio = __getDictValue(dictEdificio, fila[0])
        if edificio is None:
            edificio = Edificio(fila[0], fila[1], "", list())
            dictEdificio[edificio.getId()] = edificio

    dao.closeDBConnection(dbDict)
    return dictEdificio

def __getDictValue(dictionary: dict, index: int):
    try:
        return dictionary[index]
    except KeyError:
        return None