import environ
env = environ.Env()
environ.Env.read_env('.env.test')
print("SECRET_KEY:", env('SECRET_KEY', default=''))
print("DEBUG:", env('DEBUG', default=''))
print("ALLOWED_HOSTS:", env.list('ALLOWED_HOSTS', default=[]))
print("CORS_ALLOWED_ORIGINS:", env.list('CORS_ALLOWED_ORIGINS', default=[]))
