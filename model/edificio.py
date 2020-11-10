class Edificio:
    def __init__(self, id: int, nombre: str, topic: str, lstAula: list):
        self.__id = id
        self.__nombre = nombre
        self.__topic = topic
        self.__lstAula = lstAula

    def getId(self):
        return self.__id

    def setId(self, id):
        self.__id = id

    def getNombre(self):
        return self.__nombre

    def setNombre(self, nombre):
        self.__nombre = nombre

    def getTopic(self):
        return self.__topic

    def setTopic(self, topic):
        self.__topic = topic

    def getLstAula(self):
        return self.__lstAula

    def setLstAula(self, lstAula):
        self.__lstAula = lstAula