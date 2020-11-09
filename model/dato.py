import datetime

class Dato:
    def __init__(self, id: int, dato: str, tipo: str, fecha: datetime.datetime):
        self.__id = id
        self.__dato = dato
        self.__tipo = tipo
        self.__fecha = fecha

    def getId(self):
        return self.__id

    def setId(self, id):
        self.__id = id

    def getDato(self):
        return self.__dato

    def setDato(self, dato):
        self.__dato = dato

    def getTipo(self):
        return self.__tipo

    def setTipo(self, tipo):
        self.__tipo = tipo

    def getFecha(self):
        return self.__fecha

    def setFecha(self, fecha):
        self.__fecha = fecha