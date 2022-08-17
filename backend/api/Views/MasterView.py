from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import SessionAuthentication

from api.Utils.Permission import IsMaster
from api.Serializers.ClubSerializer import ClubSerializer


class ClubMasterView(viewsets.ModelViewSet):
	serializer_class = ClubSerializer
	# queryset = Club.objects.all()
	authentication_classes = [JWTAuthentication, SessionAuthentication]
	permission_classes = [IsMaster]

	def list(self, request, club_id):
		return Response()
	
	# 매니져 임명
	# 매니져 삭제
	# 클럽 삭제
	# 클럽 수정
	# 신청 승인
	# 신청 수락