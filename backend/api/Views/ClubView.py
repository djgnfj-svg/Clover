from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

from api.Utils.Error_msg import error_msg
from api.Utils.Permission import IsMeneger, IsMaster

from api.Serializers.ClubSerializer import ClubSerializer, HashtagSerializer

from club.models import Club, Hashtag

class HashtagViewSet(viewsets.ModelViewSet):
	serializer_class = HashtagSerializer
	queryset = Hashtag.objects.all()

	def list(self, request):
		tag = request.GET.get('tag', None)
		
		return Response()

class ClubViewSet(viewsets.ModelViewSet):
	serializer_class = ClubSerializer
	queryset = Club.objects.all()
	# todo : Session이 아니라 jwt로 바꿀꺼임
	authentication_classes = [BasicAuthentication, SessionAuthentication]
	permission_classes = [IsAuthenticatedOrReadOnly]

	def list(self, request):
		queryset = self.get_queryset()
		serializer = ClubSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)
	
	def create(self, request, *args, **kwargs):
		serializer = ClubSerializer(data=request.data, context={'request' : request})
		if serializer.is_valid():
			rtn = serializer.create(request, serializer.data)
			if rtn :
				return Response(ClubSerializer(rtn).data, status=status.HTTP_200_OK)
		else:
			return Response(error_msg(serializer=serializer),status=status.HTTP_400_BAD_REQUEST)
			
	
class ClubManagerView(viewsets.ModelViewSet):
	serializer_class = ClubSerializer
	# queryset = Club.objects.all()
	# authentication_classes = [BasicAuthentication, SessionAuthentication]
	permission_classes = [IsMeneger, IsMaster]


	# 신청 승인
	# 신청 거절
	# 유저 관리?
	def list(self, request, club_id):
		print("meneger")
		return Response()

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