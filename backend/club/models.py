from django.db import models
from accounts.models import User

# Create your models here.
class Hashtag(models.Model):
	name = models.CharField(max_length=15)

class Club(models.Model):
	#러프 입력
	title = models.CharField(max_length=20, null=True)
	topic = models.CharField(max_length=20, null=True)
	brief_introduction = models.CharField(max_length=20, null=True)
	thumbnail = models.ImageField(upload_to="images", null=True, blank=True)

	# 상세정보
	description = models.TextField(blank=True)
	master = models.ForeignKey(User, on_delete=models.CASCADE, related_name="club_master")
	managerlist = models.ManyToManyField(User, related_name="club_managerlist", null=True)
	user_list = models.ManyToManyField(User, related_name="user_list", null=False)
	creator = models.ForeignKey(User, on_delete=models.CASCADE,null=False, related_name="creator")

	appli_list = models.ManyToManyField(User,related_name="appli_list", null=True)

	days = models.CharField(max_length=30, null=True)

	AGE_CHOICES  = (
		('Over10','10세 이상'),
		('Over20','20세 이상'),
		('Over30','30세 이상'),
		('Over40','40세 이상'),
		('Over50','50세 이상'),
	)
	range_age = models.CharField(choices=AGE_CHOICES, max_length=30, null=True)

	TIME_CHOICES = (
		('1','00~06시'),
		('2','06~12시'),
		('3','12~18시'),
		('4','18~24시'),
	) 
	time_zone = models.CharField(choices=TIME_CHOICES, max_length=30, null=True)
	GENDER_CHOICES = (
		('M','남자'),
		('W','여자'),
		('A','전부'),
	)	
	gender = models.CharField(choices=GENDER_CHOICES, max_length=30, null=True)

	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)

	def Joinclub(self, user:User):
		self.user_list.add(user)