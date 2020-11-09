import datetime
from model.dato import Dato
from dao import dao

def getAllDatoFromAula(idEdificio: int, idAula: int):
    dbDict = dao.openDBConnection()

    query = "SELECT Dato.idDato, Dato.fecha, Dato.tipo, Dato.dato FROM Edificio " \
            "INNER JOIN Aula ON Edificio.idEdificio = Aula.idEdificio " \
            "INNER JOIN Dato ON Aula.idAula = Dato.idAula " \
            "WHERE Edificio.idEdificio = %s AND Aula.idAula = %s " \
            "ORDER BY Dato.idDato ASC"
    dbDict['cursor'].execute(query, (idEdificio, idAula))

    dictDato = {}
    for fila in dbDict['cursor']:
        dato = __getDictValue(dictDato, fila[0])
        if dato is None:
            dato = Dato(fila[0], fila[3], fila[2], fila[1])
            dictDato[dato.getId()] = dato

    dao.closeDBConnection(dbDict)
    return dictDato

def addDato(tipo: str, dato: str, idAula:int):
    dbDict = dao.openDBConnection()

    fecha = datetime.datetime.now()
    query = "INSERT INTO Dato (fecha, tipo, dato, idAula) VALUES (%s, %s, %s, %s);"
    dbDict['cursor'].execute(query, (fecha, tipo, dato, idAula))
    dbDict['db'].commit()

    dato = Dato(dbDict['cursor'].lastrowid, dato, tipo, fecha)
    dao.closeDBConnection(dbDict)

    return dato

def __getDictValue(dictionary: dict, index: int):
    try:
        return dictionary[index]
    except KeyError:
        return None