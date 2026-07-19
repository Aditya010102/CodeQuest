class Config:

    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:112@localhost/codequest_db'

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = 'codequestsecretkey'