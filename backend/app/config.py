import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Config:
    """Base configuration - shared across all environments"""
    
    # Security
    SECRET_KEY = os.getenv('SECRET_KEY')

    if not SECRET_KEY:
      raise RuntimeError(
        "SECRET_KEY environment variable is required. \n"
        "Generate one with: python -c 'import secrets; print(secrets.token_hex(32))'\n"
        "Copy paste the result to backend/.env"
      )
    
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