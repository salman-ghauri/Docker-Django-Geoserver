# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('maps', '0002_choice'),
    ]

    operations = [
        migrations.CreateModel(
            name='FloodPolys',
            fields=[
                ('gid', models.AutoField(serialize=False, primary_key=True)),
                ('id', models.IntegerField(null=True, blank=True)),
                ('name', models.CharField(max_length=254, null=True, blank=True)),
                ('end_date', models.DateField(null=True, blank=True)),
                ('flood_reco', models.IntegerField(null=True, blank=True)),
                ('geom', models.TextField(null=True, blank=True)),
            ],
            options={
                'db_table': 'flood_polys',
                'managed': False,
            },
        ),
    ]
