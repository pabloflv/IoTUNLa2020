class Aula:
    def __init__(self, id: int, nombre: str, topic: str, lstDato: list):
        self.__id = id
        self.__nombre = nombre
        self.__topic = topic
        self.__lstDato = lstDato

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

    def getDato(self):
        return self.__lstDato

    def setDato(self, lstDato):
        self.__lstDato = lstDato