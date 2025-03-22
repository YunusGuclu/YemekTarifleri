from django.apps import AppConfig


class YemekConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "yemek"

    def ready(self):
        import yemek.task  
