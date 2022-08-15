
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

from api.Utils.Error_msg import error_msg
from api.Utils.Permission import IsManager, IsMaster

from api.Serializers.ClubSerializer import ClubSerializer, HashtagSerializer

from club.models import Club, Hashtag
class ClubManagerView(viewsets.ModelViewSet):
	serializer_class = ClubSerializer
	# queryset = Club.objects.all()
	# authentication_classes = [BasicAuthentication, SessionAuthentication]
	permission_classes = [IsManager, IsMaster]


	# 신청 승인
	# 신청 거절
	# 유저 관리?
	def list(self, request, club_id):
		return Response()