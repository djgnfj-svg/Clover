from django.db import models
from accounts.models import User

class Club(models.Model):
	#러프 입력
	title = models.CharField(max_length=20, null=False, unique=True)
	topic = models.CharField(max_length=20, null=True)
	brief_introduction = models.CharField(max_length=20, null=True, default="간단한 소개를 입력해주세요")
	description = models.TextField(null=True, default="자세한 정보를 입력해주세요", blank=True)
	thumbnail = models.ImageField(upload_to="images", null=False, default='defaultimg.jpg')
	# 상세정보

	days = models.JSONField(null=False, blank=True, default=[],)

	AGE_CHOICES  = (
		('', 'NUll'),
		('Over10','10세 이상'),
		('Over20','20세 이상'),
		('Over30','30세 이상'),
		('Over40','40세 이상'),
		('Over50','50세 이상'),
	)
	range_age = models.CharField(choices=AGE_CHOICES,default=AGE_CHOICES[0][0], max_length=30, null=False)

	TIME_CHOICES = (
		('', None),
		('1','00~06시'),
		('2','06~12시'),
		('3','12~18시'),
		('4','18~24시'),
	) 
	time_zone = models.CharField(choices=TIME_CHOICES,default=TIME_CHOICES[0][0], max_length=30, null=False)

	GENDER_CHOICES = (
		('', 'NUll'),
		('M','남자'),
		('W','여자'),
		('A','성별무관'),
	)	
	gender = models.CharField(choices=GENDER_CHOICES,default=GENDER_CHOICES[0][0], max_length=30, null=False)

	master = models.ForeignKey(User, on_delete=models.CASCADE, related_name="master")
	manager_list = models.ManyToManyField(User, related_name="manager_list", null=True)
	user_list = models.ManyToManyField(User, related_name="user_list", null=False)
	appli_list = models.ManyToManyField(User,related_name="appli_list", null=True)

	usernum = models.IntegerField(default=1,null=False)
	creator = models.ForeignKey(User, on_delete=models.CASCADE,null=False, related_name="creator")
	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)

	def PlusUsernum(self):
		self.usernum += 1
		self.save()

	def MinusUsernum(self):
		self.usernum -= 1
		self.save()

class ClubDetailImg(models.Model):
	image = models.ImageField(upload_to="images/detail_image", null=False)

	club = models.ForeignKey(Club, on_delete=models.CASCADE)
	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)
