from model.aula import Aula
from dao import dao

def getAula(idAula: int):
    dbDict = dao.openDBConnection()

    query = "SELECT Aula.idAula, Aula.nombre FROM Aula " \
            "WHERE Aula.idAula = %s " \
            "ORDER BY Aula.idAula ASC"
    dbDict['cursor'].execute(query, (idAula))

    dictAula = {}
    for fila in dbDict['cursor']:
        aula = __getDictValue(dictAula, fila[0])
        if aula is None:
            aula = Aula(fila[0], fila[1], "", list())
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

def __getDictValue(dictionary: dict, index: int):
    try:
        return dictionary[index]
    except KeyError:
        return None