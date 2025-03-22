from django.db import models
from django.utils.text import slugify

class Kategori(models.Model):
    name = models.CharField(max_length=100)
    slug=models.SlugField(null=False,blank=True,db_index=True)
    
    def save(self, *args,**kwargs):
        self.slug=slugify(self.name)
        super().save(*args,**kwargs)

    def __str__(self):
        return self.name

class Tarifler(models.Model):
    ad = models.CharField(max_length=100)
    aciklama = models.TextField()  
    resim = models.ImageField(upload_to="resimler")
    slug=models.SlugField(null=False,blank=True,db_index=True) 
    kategori=models.ManyToManyField(Kategori)

    def save(self, *args,**kwargs):
        self.slug=slugify(self.ad)
        super().save(*args,**kwargs)

    def __str__(self):
        return self.ad
    
class WeatherData(models.Model):
    city = models.CharField(max_length=100)
    temperature = models.FloatField()
    description = models.CharField(max_length=255)
    icon = models.CharField(max_length=50)
    wind_speed = models.FloatField()
    humidity = models.IntegerField()
    pressure = models.IntegerField()
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.city
    
class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name