from flask import Blueprint, jsonify, request

main_bp = Blueprint('main', __name__, url_prefix='/api')


@main_bp.route('/', methods=['GET'])
def index():
    """
    Test endpoint to verify API is working
    """
    return jsonify({
        'success': True,
        'message': 'Flask API is running!',
        'data': {
            'version': '1.0.0',
            'endpoints': ['/api/', '/api/test', '/health']
        }
    }), 200


@main_bp.route('/test', methods=['GET'])
def test():
    """
    Another test endpoint
    """
    return jsonify({
        'success': True,
        'message': 'Test endpoint working!',
        'data': {
            'method': request.method,
            'path': request.path
        }
    }), 200


@main_bp.route('/echo', methods=['POST'])
def echo():
    """
    Echo back POST data for quick testing
    """
    data = request.get_json()
    
    if not data:
        return jsonify({
            'success': False,
            'error': 'No JSON data provided',
            'message': 'Please send JSON data in the request body'
        }), 400
    
    return jsonify({
        'success': True,
        'message': 'Data received successfully',
        'data': {
            'received': data
        }
    }), 200