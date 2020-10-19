class Aula:
    def __init__(self, id: int, nombre: str, edificio: int):
        self.__id = id
        self.__nombre = nombre
        self.__edificio = edificio

    def getId(self):
        return self.__id

    def setId(self, id):
        self.__id = id

    def getNombre(self):
        return self.__nombre

    def setNombre(self, nombre):
        self.__nombre = nombre

    def getEdificio(self):
        return self.__edificio

    def setEdificio(self, edificio):
        self.__edificio = edificio