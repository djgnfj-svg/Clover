from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import action
from accounts.models import User
from api.Utils.Error_msg import error_msg, success_msg

from api.Utils.Permission import IsMaster
from api.Serializers.ClubSerializer import ClubSerializer
from club.models import Club


class ClubMasterView(viewsets.ModelViewSet):
	serializer_class = ClubSerializer
	queryset = Club.objects.all()
	authentication_classes = [JWTAuthentication, SessionAuthentication]
	permission_classes = [IsMaster]

	def list(self, request, club_id):
		return Response()
	
	# 매니져 임명 post
	@action(detail=False, methods=['post'],	name="appointmanager")
	def appointManager(self, request, club_id):
		# 
		return Response()
	
	# 매니져 삭제 delete
	@appointManager.mapping.delete
	def expulsionManager(self, request, club_id):
		# request.user.id
		manager_id = request.GET.get("manager_id",None)
		club=Club.objects.get(id=club_id)
		if club.master != User.objects.get(id=request.user.id):
			Response(error_msg(403), status=status.HTTP_403_FORBIDDEN)
		club.manager_list.remove(manager_id)
		# 제명하고자 하는 사람이 클럽마스터인지 확인
		# 제명
		return Response(success_msg(200), status=status.HTTP_200_OK)