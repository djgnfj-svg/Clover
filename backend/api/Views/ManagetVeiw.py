
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import action

from api.Serializers.StaffSerializer import StaffSerializer
from api.Utils.Error_msg import error_msg
from api.Utils.Permission import IsManager, IsMaster

from api.Serializers.ClubSerializer import ClubSerializer, HashtagSerializer

from club.models import Club, Hashtag

class ClubManagerView(viewsets.ModelViewSet):
	serializer_class = ClubSerializer
	queryset = Club.objects.all()
	# authentication_classes = [BasicAuthentication, SessionAuthentication]
	permission_classes = [IsManager]

	# 유저 관리?
	def list(self, request, club_id):
		#가입 유저목록을 보여준다,
		# 신청 유저목록을 보여준다.
		# 그걸 받거나 거절하는?
		#가입유져
		# @전 4글자 블럭처리 하고 리스트형태로보내주기
		temp = Club.objects.get(id=club_id).user_list.all()
		return Response(StaffSerializer(temp,many=True).data, status=status.HTTP_200_OK)

	@action(detail=False, methods=['get'],name="appli_list")
	def appli_list(self, request, club_id):
		temp = Club.objects.get(id=club_id).appli_list.all()
		return Response(temp, status=status.HTTP_200_OK)

	@appli_list.mapping.delete
	def appli_list_delete(self, request, club_id, pk):
		print(pk)
		temp = Club.objects.get(id=club_id).appli_list.all()
		return Response(temp, status=status.HTTP_200_OK)
