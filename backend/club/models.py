from django.db import models
from accounts.models import User

# Create your models here.
class Hashtag(models.Model):
	name = models.CharField(max_length=15)

class Club(models.Model):
	#러프 입력
	title = models.CharField(max_length=20)
	topic = models.CharField(max_length=20, null=True)
	brief_introduction = models.CharField(max_length=20, null=True)
	thumbnail = models.ImageField(upload_to="images", null=True, blank=True)

	# 상세정보
	description = models.TextField(blank=True)
	master = models.ForeignKey(User, on_delete=models.CASCADE, related_name="club_master")
	managerlist = models.ManyToManyField(User, related_name="club_managerlist", null=True)
	user_list = models.ManyToManyField(User, related_name="user_list", null=False)
	creator = models.ForeignKey(User, on_delete=models.CASCADE,null=False, related_name="creator")

	appli_list = models.JSONField(default = {}, null=True)
	def Joinclub(self, user:User):
		self.user_list.add(user)