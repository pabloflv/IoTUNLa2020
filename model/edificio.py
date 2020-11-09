class Edificio:
    def __init__(self, id: int, nombre: str, lstAula: list):
        self.__id = id
        self.__nombre = nombre
        self.__lstAula = lstAula

    def getId(self):
        return self.__id

    def setId(self, id):
        self.__id = id

    def getNombre(self):
        return self.__nombre

    def setNombre(self, nombre):
        self.__nombre = nombre

    def getLstAula(self):
        return self.__lstAula

    def setLstAula(self, lstAula):
        self.__lstAula = lstAula