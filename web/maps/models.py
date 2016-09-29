from django.db import models

# Create your models here.
class Question(models.Model):
	def __unicode__(self):
		return self.question_text

	question_text = models.CharField(max_length=200)
	question_type = models.CharField(max_length=50)
	pud_date = models.DateTimeField('date published')

class Choice(models.Model):
	def __unicode__(self):
		return self.choice_text

	question = models.ForeignKey(Question)
	choice_text = models.CharField(max_length = 200)
	votes = models.IntegerField(default = 0)

class FloodPolys(models.Model):
	# def __unicode__(self):
	# 	return self.name, self.id, self.end_date, self.flood_reco

	gid = models.AutoField(primary_key=True)
	id = models.IntegerField(blank=True, null=True)
	name = models.CharField(max_length=254, blank=True, null=True)
	end_date = models.DateField(blank=True, null=True)
	flood_reco = models.IntegerField(blank=True, null=True)
	geom = models.TextField(blank=True, null=True)  # This field type is a guess.

class Fluvial01(models.Model):
    gid = models.AutoField(primary_key=True)
    id = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    percent = models.FloatField(blank=True, null=True)
    geom = models.TextField(blank=True, null=True)  # This field type is a guess.


class Fluvial1(models.Model):
    gid = models.AutoField(primary_key=True)
    id = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    percent = models.FloatField(blank=True, null=True)
    geom = models.TextField(blank=True, null=True)  # This field type is a guess.

class Fluvial10(models.Model):
    gid = models.AutoField(primary_key=True)
    id = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    percent = models.FloatField(blank=True, null=True)
    geom = models.TextField(blank=True, null=True)  # This field type is a guess.
