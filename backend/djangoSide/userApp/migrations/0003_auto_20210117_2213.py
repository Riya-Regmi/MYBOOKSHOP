# Generated by Django 3.0.6 on 2021-01-17 16:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userApp', '0002_usertoken'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usertoken',
            name='tokenNumber',
            field=models.TextField(max_length=50000, verbose_name='Token Number'),
        ),
    ]