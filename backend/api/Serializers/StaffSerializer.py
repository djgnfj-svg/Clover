from pyexpat import model
from rest_framework import serializers

from accounts.models import User, UserProfile
from club.models import Club

class AppliSerializer(serializers.ModelSerializer):
	user_instroduction = serializers.SerializerMethodField('get_user_instroduction')
	class Meta:
		model = User
		fields = ('id','username', 'user_instroduction')

	def get_user_instroduction(self, obj):
		user_instroduction = UserProfile.objects.get(user_id = obj.id)
		return user_instroduction.description

class StaffSerializer(serializers.ModelSerializer):
	right = serializers.SerializerMethodField("get_right")
	class Meta:
		model = User
		fields = ['id','username']


class AddUserSerializer(serializers.Serializer):
	userid = serializers.IntegerField(default=0)

class UserlistSz(serializers.ModelSerializer):
	master = AppliSerializer()
	user_list = AppliSerializer(many=True)
	managerlist = AppliSerializer(many=True)
	class Meta:
		model = Club
		fields = ['id', 'master', 'managerlist', 'user_list']