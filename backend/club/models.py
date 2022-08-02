from django.db import models
from django.core.exceptions import ValidationError
from accounts.models import User

# Create your models here.

class Club(models.Model):
	title = models.CharField(max_length=20)
	description = models.TextField()
	club_admin = models.ForeignKey(User, on_delete=models.CASCADE, related_name="club_master")
	club_managerlist = models.ManyToManyField(User, related_name="club_managerlist")
	user_list = models.ManyToManyField(User, related_name="user_list")
	creator = models.ForeignKey(User, on_delete=models.CASCADE,null=False, related_name="creator")
	club_starttiem = models.TimeField()
	club_endtiem = models.TimeField()
