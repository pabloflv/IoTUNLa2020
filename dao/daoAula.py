from model.aula import Aula
from dao import dao

def getAula(idAula: int):
    dbDict = dao.openDBConnection()

    query = "SELECT Aula.idAula, Aula.nombre, Aula.topic FROM Aula " \
            "WHERE Aula.idAula = %s " \
            "ORDER BY Aula.idAula ASC"
    dbDict['cursor'].execute(query, (idAula, ))

    dictAula = {}
    for fila in dbDict['cursor']:
        aula = __getDictValue(dictAula, fila[0])
        if aula is None:
            aula = Aula(fila[0], fila[1], fila[2], list())
            dictAula[aula.getId()] = aula

    dao.closeDBConnection(dbDict)
    return dictAula


def getAulaByTopic(topicEdificio: str, topicAula: str):
    dbDict = dao.openDBConnection()

    query = "SELECT Aula.idAula, Aula.nombre FROM Edificio " \
            "INNER JOIN Aula ON Edificio.idEdificio = Aula.idEdificio " \
            "WHERE Edificio.topic = %s AND Aula.topic = %s " \
            "ORDER BY Edificio.idEdificio ASC, Aula.idAula ASC " \
            "LIMIT 1"
    dbDict['cursor'].execute(query, (topicEdificio, topicAula))

    aula = Aula(0, "", "", list())
    for fila in dbDict['cursor']:
        aula.setId(fila[0])
        aula.setNombre(fila[1])

    dao.closeDBConnection(dbDict)
    return aula

def getAulaByEdificio(idEdificio: int):
    dbDict = dao.openDBConnection()

    query = "SELECT Aula.idAula, Aula.nombre, Aula.topic FROM Aula " \
            "WHERE Aula.idEdificio = %s " \
            "ORDER BY Aula.idAula ASC"
    dbDict['cursor'].execute(query, (idEdificio, ))

    dictAula = {}
    for fila in dbDict['cursor']:
        aula = __getDictValue(dictAula, fila[0])
        if aula is None:
            aula = Aula(fila[0], fila[1], fila[2], list())
            dictAula[aula.getId()] = aula

    dao.closeDBConnection(dbDict)
    return dictAula

def addAula(nombre: str, topic: str, idEdificio: int):
    dbDict = dao.openDBConnection()

    query = "INSERT INTO Aula (nombre, topic, idEdificio) VALUES (%s, %s, %s);"
    dbDict['cursor'].execute(query, (nombre, topic, idEdificio))
    dbDict['db'].commit()

    aula = Aula(dbDict['cursor'].lastrowid, nombre, topic, list())
    dao.closeDBConnection(dbDict)

    return aula

def modAula(aula: Aula):
    dbDict = dao.openDBConnection()

    query = "UPDATE Aula SET Aula.nombre = %s, Aula.topic = %s WHERE Aula.idAula = %s;"
    dbDict['cursor'].execute(query, (aula.getNombre(), aula.getTopic(), aula.getId()))
    dbDict['db'].commit()

    dao.closeDBConnection(dbDict)
    return '0'

def delAula(idAula: int):
    dbDict = dao.openDBConnection()

    query = "DELETE FROM Dato WHERE Dato.idAula = %s;"
    dbDict['cursor'].execute(query, (idAula, ))
    dbDict['db'].commit()

    query = "DELETE FROM Aula WHERE Aula.idAula = %s;"
    dbDict['cursor'].execute(query, (idAula, ))
    dbDict['db'].commit()

    dao.closeDBConnection(dbDict)
    return '0'

def __getDictValue(dictionary: dict, index: int):
    try:
        return dictionary[index]
    except KeyError:
        return None