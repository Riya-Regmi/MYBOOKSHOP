# Generated by Django 3.1.1 on 2021-07-29 06:02

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userApp', '0021_auto_20210728_2334'),
    ]

    operations = [
        migrations.AddField(
            model_name='recommendation',
            name='dateOFRecommendation',
            field=models.DateField(default=datetime.date.today),
        ),
    ]
