from flask import render_template, jsonify, Blueprint
import jsons

from dao import daoEdificio

ctrlEdificio = Blueprint('ctrlEdificio', __name__)


@ctrlEdificio.route('/edificio/alta', methods=['GET'])
def paginaAltaEdificio():
    return render_template('altaEdificio.html', pageTitle='UNLa IoT')


@ctrlEdificio.route('/api_rest/addEdificio', methods=['POST'])
def addEdificio():
    return 0;