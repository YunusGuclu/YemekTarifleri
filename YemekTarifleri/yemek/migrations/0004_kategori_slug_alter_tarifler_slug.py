# Generated by Django 4.1 on 2024-08-02 15:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("yemek", "0003_tarifler_slug"),
    ]

    operations = [
        migrations.AddField(
            model_name="kategori",
            name="slug",
            field=models.SlugField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="tarifler",
            name="slug",
            field=models.SlugField(blank=True, null=True),
        ),
    ]
