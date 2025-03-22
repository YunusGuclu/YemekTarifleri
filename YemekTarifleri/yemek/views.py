from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Kategori, Tarifler, WeatherData, Item
from .serializers import KategoriSerializer, TariflerSerializer, WeatherDataSerializer, ItemSerializer


def home(request):
    query = request.GET.get('q')  
    if query:
        tarifler = Tarifler.objects.filter(ad__icontains=query)
    else:
        tarifler = Tarifler.objects.all()

    data = {
        "kategoriler": Kategori.objects.all(),
        "tarifler": tarifler,
        "weather": WeatherData.objects.first(),
    }
    return render(request, "index.html", data)

def tarif(request, slug):
    data = {
        "yemek": get_object_or_404(Tarifler, slug=slug)
    }
    return render(request, "tarif.html", data)

def kategoridetayı(request, slug):
    kategori = get_object_or_404(Kategori, slug=slug)
    data = {
        "kategoriler": Kategori.objects.all(),
        "tarifler": kategori.tarifler_set.all(),
        "weather": WeatherData.objects.first(),
    }
    return render(request, "index.html", data)

def hakkinda(request):
    return render(request, "bilgi.html")

class KategoriViewSet(viewsets.ModelViewSet):
    queryset = Kategori.objects.all()
    serializer_class = KategoriSerializer

class TariflerViewSet(viewsets.ModelViewSet):
    queryset = Tarifler.objects.all()
    serializer_class = TariflerSerializer

    def retrieve(self, request, *args, **kwargs):
        slug = kwargs.get('pk')
        instance = get_object_or_404(Tarifler, slug=slug)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class WeatherDataViewSet(viewsets.ModelViewSet):
    queryset = WeatherData.objects.all()
    serializer_class = WeatherDataSerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
