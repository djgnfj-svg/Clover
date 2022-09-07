from django.shortcuts import get_object_or_404

from rest_framework import viewsets, status, mixins, exceptions
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import action
from rest_framework.throttling import UserRateThrottle

from rest_framework_simplejwt.authentication import JWTAuthentication

from api.Utils.Error_msg import error_msg, success_msg
from api.Utils.Permission import IsMaster
from api.Serializers.ClubSerializer import UseridSz
from api.Serializers.StaffSerializer import UserlistSz

from club.models import Club

from accounts.models import User

class ClubMasterView(viewsets.GenericViewSet, mixins.ListModelMixin):
	serializer_class = UserlistSz
	authentication_classes = [JWTAuthentication, SessionAuthentication]
	permission_classes = [IsMaster]
	# throttle_classes = [UserRateThrottle]

	def list(self, request, club_id, *args, **kwargs):
		instance = get_object_or_404(Club, id=club_id)
		serializer = self.get_serializer(instance)
		return Response(serializer.data)

	#유저강퇴
	@action(detail=False, methods=['delete'], name="user_expulsion")
	def expulsion_user(self, request, club_id):
		user_id = request.GET.get("user_id", None)
		user = get_object_or_404(User,id=user_id)
		club = get_object_or_404(Club,id=club_id)
		if user in club.user_list.all():
			club.user_list.remove(user.id)
			club.MinusUsernum()
			return Response(success_msg(200))
		if user in club.manager_list.all():
			club.manager_list.remove(user.id)
			club.MinusUsernum()
			return Response(success_msg(200))
		return Response(error_msg(2401),status=status.HTTP_404_NOT_FOUND)
	# 매니져 임명 post
	@action(detail=False, methods=['post'],	serializer_class=UseridSz,\
			 name="appoint-manager",url_path="appoint-manager")
	def appoint_manager(self, request, club_id):
		user_id = request.data["user_id"]
		user = User.objects.get(id=user_id)
		club = Club.objects.get(id = club_id)
		if user not in club.user_list.all():
			raise exceptions.PermissionDenied(error_msg(2401))
		club.manager_list.add(user.id)
		club.user_list.remove(user.id)
		return Response(success_msg(200))

	# 매니져 삭제 delete
	@appoint_manager.mapping.delete
	def expulsionManager(self, request, club_id):
		manager_id = request.GET.get("manager_id",None)
		user = User.objects.get(id=manager_id)
		club = Club.objects.get(id=club_id)
		if club.master != User.objects.get(id=request.user.id):
			Response(error_msg(403), status=status.HTTP_403_FORBIDDEN)
		
		if user not in club.manager_list.all():
			raise exceptions.NotFound(error_msg(2401))

		club.manager_list.remove(user.id)
		club.user_list.add(user.id)
		return Response(success_msg(200))