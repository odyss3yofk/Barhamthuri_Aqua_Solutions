from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
    verbose_name = 'Barhamthuri Aqua Solutions API'

    def ready(self):
        import api.signals
