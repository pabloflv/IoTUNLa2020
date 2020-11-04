class Dato:
    def __init__(self, id: int, dato: int, aula: int):
        self.__id = id
        self.__dato = dato
        self.__aula = aula

    def getId(self):
        return self.__id

    def setId(self, id):
        self.__id = id

    def getDato(self):
        return self.__dato

    def setDato(self, dato):
        self.__dato = dato

    def getAula(self):
        return self.__aula

    def setAula(self, aula):
        self.__aula = aula