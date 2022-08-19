
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import action

from rest_framework_simplejwt.authentication import JWTAuthentication
from accounts.models import User

from api.Utils.Permission import IsManager
from api.Serializers.StaffSerializer import StaffSerializer, AppliSerializer
from api.Serializers.ClubSerializer import ClubSerializer

from club.models import Club

class ClubManagerView(viewsets.ModelViewSet):
	serializer_class = ClubSerializer
	queryset = Club.objects.all()
	authentication_classes = [SessionAuthentication, JWTAuthentication]
	permission_classes = [IsManager]

	# 유저 관리?
	def list(self, request, club_id):
		temp = Club.objects.get(id=club_id).user_list.all()
		return Response(StaffSerializer(temp,many=True).data, status=status.HTTP_200_OK)

	@action(detail=False, methods=['get'],name="appli_list", serializer_class=ClubSerializer)
	def appli_list(self, request, club_id):
		temp = Club.objects.get(id=club_id).appli_list.all()
		print(temp)
		return Response(AppliSerializer(temp, many=True).data, status=status.HTTP_200_OK)

	@appli_list.mapping.delete
	def appli_list_delete(self, request, club_id, pk=None):
		userid = int(request.GET.get('userid'))
		club = Club.objects.get(id = club_id)
		club.appli_list.remove(userid)

		temp = Club.objects.get(id=club_id).appli_list.all()
		return Response(StaffSerializer(temp,many=True).data, status=status.HTTP_200_OK)
