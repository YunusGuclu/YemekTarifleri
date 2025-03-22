import requests
from django.conf import settings
from django_apscheduler.jobstores import DjangoJobStore, register_events, register_job
from apscheduler.schedulers.background import BackgroundScheduler
from .models import WeatherData

# OpenWeatherMap API ayarları
API_KEY = 'c45966f73686cf713980007192a3b8aa'
CITY = 'Elazig'
URL = f'http://api.openweathermap.org/data/2.5/weather?q={CITY}&appid={API_KEY}&units=metric&lang=tr'

def fetch_weather_data():
    response = requests.get(URL)
    if response.status_code == 200:
        weather_data = response.json()
        weather, created = WeatherData.objects.update_or_create(
            city=weather_data['name'],
            defaults={
                'temperature': weather_data['main']['temp'],
                'description': weather_data['weather'][0]['description'],
                'icon': weather_data['weather'][0]['icon'],
                'wind_speed': weather_data['wind']['speed'],
                'humidity': weather_data['main']['humidity'],
                'pressure': weather_data['main']['pressure'],
            }
        )
        if created:
            print("Weather data created")
        else:
            print("Weather data updated")
    else:
        print(f"Failed to fetch weather data: {response.status_code}")

scheduler = BackgroundScheduler()
scheduler.add_jobstore(DjangoJobStore(), "default")

register_job(scheduler, "interval", minutes=1, replace_existing=True)(fetch_weather_data)
register_events(scheduler)
scheduler.start()

print("Scheduler started!")
