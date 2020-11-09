class Aula:
    def __init__(self, id: int, nombre: str, lstDato: list):
        self.__id = id
        self.__nombre = nombre
        self.__lstDato = lstDato

    def getId(self):
        return self.__id

    def setId(self, id):
        self.__id = id

    def getNombre(self):
        return self.__nombre

    def setNombre(self, nombre):
        self.__nombre = nombre

    def getDato(self):
        return self.__lstDato

    def setDato(self, lstDato):
        self.__lstDato = lstDato