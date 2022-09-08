from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny

from api.Serializers.ClubSerializer import ClubViewSerializer

from club.models import Club

class HomePagination(PageNumberPagination):
	page_size = 4

class HomeViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = Club.objects.all().order_by("-created_at")
	serializer_class = ClubViewSerializer
	pagination_class = HomePagination
	permission_classes = [AllowAny]