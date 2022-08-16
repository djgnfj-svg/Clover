from rest_framework import serializers

from accounts.models import User
from club.models import Club

class AppliSerializer(serializers.ModelField):
	class Meta:
		model = Club
		fields = ['apply']

class StaffSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['username']
