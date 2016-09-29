# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('maps', '0005_auto_20160921_0816'),
    ]

    operations = [
        migrations.CreateModel(
            name='Fluvial01',
            fields=[
                ('gid', models.AutoField(serialize=False, primary_key=True)),
                ('id', models.DecimalField(null=True, max_digits=10, decimal_places=0, blank=True)),
                ('percent', models.FloatField(null=True, blank=True)),
                ('geom', models.TextField(null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Fluvial1',
            fields=[
                ('gid', models.AutoField(serialize=False, primary_key=True)),
                ('id', models.DecimalField(null=True, max_digits=10, decimal_places=0, blank=True)),
                ('percent', models.FloatField(null=True, blank=True)),
                ('geom', models.TextField(null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Fluvial10',
            fields=[
                ('gid', models.AutoField(serialize=False, primary_key=True)),
                ('id', models.DecimalField(null=True, max_digits=10, decimal_places=0, blank=True)),
                ('percent', models.FloatField(null=True, blank=True)),
                ('geom', models.TextField(null=True, blank=True)),
            ],
        ),
    ]
