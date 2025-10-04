import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Config:
    """Base configuration - shared across all environments"""
    
    # Security
    SECRET_KEY = os.getenv('SECRET_KEY', '0000')
    
    # CORS
    FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:5173')
    
    # Keep json responses in order defined
    JSON_SORT_KEYS = False


class DevelopmentConfig(Config):
    """Development-specific configuration"""
    
    DEBUG = True
    TESTING = False


class ProductionConfig(Config):
    """Production-specific configuration"""
    
    DEBUG = False
    TESTING = False


class TestingConfig(Config):
    """Testing-specific configuration"""
    
    DEBUG = True
    TESTING = True


# Dictionary to easily select config
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}