import os
from flask import Flask, jsonify
from flask_cors import CORS
from app.config import config


def create_app(config_name=None):
    """
    Application factory pattern
    Creates and configures the Flask application
    """
    
    # Create Flask app
    app = Flask(__name__)
    
    # Load configuration
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'development')
    
    app.config.from_object(config[config_name])
    
    # Initialize CORS
    CORS(app, origins=[app.config['FRONTEND_URL']])
    
    # Register blueprints
    from app.routes import main_bp
    app.register_blueprint(main_bp)
    
    # Global error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            'success': False,
            'error': 'Resource not found',
            'message': 'The requested URL was not found on the server.'
        }), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({
            'success': False,
            'error': 'Internal server error',
            'message': 'An unexpected error occurred. Please try again later.'
        }), 500
    
    # Health check endpoint
    @app.route('/health')
    def health_check():
        return jsonify({
            'success': True,
            'message': 'Server is running',
            'environment': config_name
        }), 200
    
    return app