from django.core import serializers

from rest_framework import viewsets, status
from rest_framework.response import Response
from ..Serializers.ClubSerializer import ClubSerializer

from api.Utils.Error_msg import error_msg

from club.models import Club

class HomeViewSet(viewsets.ViewSet):
	def list(self, request):
		queryset = Club.objects.all().order_by("-created_at")
		if not queryset:
			return Response(error_msg(404), status=status.HTTP_200_OK)
		rtn = ClubSerializer(queryset, many=True)
		return Response(rtn.data, status=status.HTTP_200_OK)
