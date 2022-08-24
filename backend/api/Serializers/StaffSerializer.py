from rest_framework import serializers

from accounts.models import User
from club.models import Club

class AppliSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id','username')

class StaffSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['id','username']

class AddUserSerializer(serializers.Serializer):
	userid = serializers.IntegerField(default=0)