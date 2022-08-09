from email.policy import default
from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)

class UserManager(BaseUserManager):
	def create_user(self, email, password=None):
		if not email:
			raise ValueError('Users must have an email address')

		user = self.model(
			email=self.normalize_email(email),
		)

		user.set_password(password)
		user.save(using=self._db)
		return user

	def create_superuser(self, email, password):
		user = self.create_user(
			email,
			password=password,
		)
		user.is_admin = True
		user.save(using=self._db)
		return user


class User(AbstractBaseUser):
	username = models.CharField(max_length=20, null=False)
	email = models.EmailField(verbose_name='email', max_length=255,	unique=True,)
	date_of_birth = models.DateField(auto_now_add=True)
	verified = models.BooleanField(default=False, null=False)
	is_active = models.BooleanField(default=True)
	is_admin = models.BooleanField(default=False)
	
	objects = UserManager()

	USERNAME_FIELD = 'email'

	def __str__(self):
		return self.email

	def has_perm(self, perm, obj=None):
		return True

	def has_module_perms(self, app_label):
		return True

	@property
	def is_staff(self):
		return self.is_admin

class UserVerification(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	key = models.CharField(null=False, max_length=200, unique=True)
	verified = models.BooleanField(default=False)
	expired_at = models.DateTimeField(null=False)
	verified_at = models.DateTimeField(null=True)
	created_at = models.DateTimeField(auto_now_add=True, null=False)

class UserProfile(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	image = models.ImageField(blank=True, upload_to='images', null=True,)
	description = models.TextField(null=False, default="본인어필하세요")
	club_list = models.JSONField(null=True)

	# 최대 가입 클럽 관리 
	# def clean(self, *args, **kwargs):
	# 	if self.club_list.count() > 3:
	# 		raise ValidationError("가입할 수 있는 클럽은 최대 3개입니다.")
	# 	return super(Club,self).clean(*args, *kwargs)