from django.core import serializers

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from ..Serializers.ClubSerializer import ClubSerializer

from api.Utils.Error_msg import error_msg

from club.models import Club

class HomePagination(PageNumberPagination):
	page_size = 5

class HomeViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = Club.objects.all().order_by("-created_at")
	serializer_class = ClubSerializer
	pagination_class = HomePagination
	permission_classes = [AllowAny]
