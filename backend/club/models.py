from django.db import models
from accounts.models import User

# Create your models here.
class Hashtag(models.Model):
	name = models.CharField(max_length=15)

class Club(models.Model):
	#러프 입력
	title = models.CharField(max_length=20, null=False, unique=True)
	topic = models.CharField(max_length=20, null=True)
	brief_introduction = models.CharField(max_length=20, null=True, default="간단한 소개를 입력해주세요")
	thumbnail = models.ImageField(upload_to="images", null=False, default='midea/defaultimg.jpg')
	description = models.TextField(null=True, default="자세한 정보를 입력해주세요", blank=True)

	# 상세정보

	# +를 통해서 요일을 받을 것이다
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
		('A','성별무관'),
	)	
	gender = models.CharField(choices=GENDER_CHOICES, max_length=30, null=True)

	master = models.ForeignKey(User, on_delete=models.CASCADE, related_name="club_master")
	managerlist = models.ManyToManyField(User, related_name="club_managerlist", null=True)
	user_list = models.ManyToManyField(User, related_name="user_list", null=False)
	appli_list = models.ManyToManyField(User,related_name="appli_list", null=True)

	usernum = models.IntegerField(default=1,null=False)
	creator = models.ForeignKey(User, on_delete=models.CASCADE,null=False, related_name="creator")
	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)

	def Joinclub(self, user:User):
		self.user_list.add(user)

	def PlusUsernum(self):
		self.usernum += 1
		self.save()

	def MinusUsernum(self):
		self.usernum -= 1
		self.save()