from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

from api.Utils.Error_msg import error_msg
from api.Utils.Permission import IsManager, IsMaster

from api.Serializers.ClubSerializer import ClubSerializer, HashtagSerializer

from club.models import Club, Hashtag

class ClubMasterView(viewsets.ModelViewSet):
	serializer_class = ClubSerializer
	# queryset = Club.objects.all()
	# authentication_classes = [BasicAuthentication, SessionAuthentication]
	permission_classes = [IsMaster]

	def list(self, request, club_id):
		return Response()
	
	# 매니져 임명
	# 매니져 삭제
	# 클럽 삭제
	# 클럽 수정
	# 신청 승인
	# 신청 수락