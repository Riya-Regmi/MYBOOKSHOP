# Generated by Django 3.0.6 on 2021-01-18 04:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userApp', '0003_auto_20210117_2213'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usertoken',
            name='tokenNumber',
            field=models.TextField(),
        ),
    ]
