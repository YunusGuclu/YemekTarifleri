from django.urls import path,include
from.import views
from rest_framework.routers import DefaultRouter
from .views import KategoriViewSet, TariflerViewSet, WeatherDataViewSet, ItemViewSet

    #http://127.0.0.1:8000/
    #http://127.0.0.1:8000/yemeklist
    #http://127.0.0.1:8000/yemekdetay

router = DefaultRouter()
router.register(r'categories', KategoriViewSet)
router.register(r'tarifler', TariflerViewSet)
router.register(r'weather', WeatherDataViewSet)
router.register(r'items', ItemViewSet)

urlpatterns = [ 
    path("", views.home, name="home"),
    path("tarif/<slug:slug>/", views.tarif, name="detay"),
    path("kategori/<slug:slug>/", views.kategoridetayı, name="kategoridetay"),
    path("hakkinda/", views.hakkinda, name="hakkinda"),
    path('api/', include(router.urls)),
    
]