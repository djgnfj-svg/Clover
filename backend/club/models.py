from django.db import models
from accounts.models import User

# Create your models here.
class Hashtag(models.Model):
	name = models.CharField(max_length=15)

class Club(models.Model):
	CATEGORYS = (
		('게임', 'Game'),
		('프로그래밍', 'Programing'),
		('스터디', 'study'),
		('기타', 'etc')
	)
	title = models.CharField(max_length=20)
	categoty = models.CharField(max_length=30,choices=CATEGORYS, default=CATEGORYS[0][0])
	description = models.TextField(blank=True)
	thumbnail = models.ImageField(upload_to="images", null=True, blank=True)
	club_admin = models.ForeignKey(User, on_delete=models.CASCADE, related_name="club_master")
	club_managerlist = models.ManyToManyField(User, related_name="club_managerlist")
	user_list = models.ManyToManyField(User, related_name="user_list")
	creator = models.ForeignKey(User, on_delete=models.CASCADE,null=False, related_name="creator")
	club_starttiem = models.TimeField()
	club_endtiem = models.TimeField()
	tag = models.ManyToManyField(Hashtag)
