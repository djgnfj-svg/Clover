from django.shortcuts import get_object_or_404

from rest_framework import viewsets, status, mixins
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import action

from rest_framework_simplejwt.authentication import JWTAuthentication

from api.Utils.Error_msg import error_msg, success_msg
from api.Utils.Permission import IsMaster
from api.Serializers.ClubSerializer import JoinClubRoughSerializder

from club.models import Club

from accounts.models import User

class ClubMasterView(viewsets.GenericViewSet, mixins.ListModelMixin):
	serializer_class = JoinClubRoughSerializder
	queryset = Club.objects.all()
	authentication_classes = [JWTAuthentication, SessionAuthentication]
	permission_classes = [IsMaster]

	def list(self, request, club_id, *args, **kwargs):
		instance = get_object_or_404(Club, id=club_id)
		serializer = self.get_serializer(instance)
		return Response(serializer.data)

	# 매니져 임명 post
	@action(detail=False, methods=['post'],	name="appointmanager")
	def appointManager(self, request, club_id):
		user_id = request.GET.get("manager_id", None)
		club = Club.objects.get(club_id = club_id)
		club.managerlist.get(user_id)
		club.user_lsit.remove(user_id)
		return Response()

	# 매니져 삭제 delete
	@appointManager.mapping.delete
	def expulsionManager(self, request, club_id):
		manager_id = request.GET.get("manager_id",None)
		club=Club.objects.get(id=club_id)
		if club.master != User.objects.get(id=request.user.id):
			Response(error_msg(403), status=status.HTTP_403_FORBIDDEN)
		club.manager_list.remove(manager_id)
		return Response(success_msg(200))