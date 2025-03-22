from rest_framework import serializers
from .models import Kategori, Tarifler, WeatherData, Item

class KategoriSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kategori
        fields = '__all__'

class TariflerSerializer(serializers.ModelSerializer):
    kategori = KategoriSerializer(many=True)  # Nested relationship
    class Meta:
        model = Tarifler
        fields = '__all__'

class WeatherDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeatherData
        fields = '__all__'

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'
