import mysql.connector

def openDBConnection():
    retDict = {}
    retDict['db'] = mysql.connector.connect(host="localhost", user="docker", password="password", database='IoTUNLa2020')
    retDict['cursor'] = retDict['db'].cursor()

    return retDict

def closeDBConnection(dbConnDict: dict):
    dbConnDict['cursor'].close()
    dbConnDict['db'].close()