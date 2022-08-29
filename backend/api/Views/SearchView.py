from django.db.models import Q

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny

from api.Serializers.ClubSerializer import ClubViewSerializer
from api.Utils.Error_msg import success_msg

from club.models import Club

class HomePagination(PageNumberPagination):
	page_size = 12

class SearchViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = Club.objects.all().order_by("-created_at")
	serializer_class = ClubViewSerializer
	pagination_class = HomePagination
	permission_classes = [AllowAny]

	def list(self, request):
		print(request.query_params)
		range_age = request.query_params.get('range_age',None)
		days = request.GET.getlist('days[]',None)
		time_zone = request.query_params.get('time_zone',None)
		gender = request.query_params.get('gender',None)
		query = request.query_params.get('query', None)

		q = Q()
		if days:
			for day in days:
				q |= Q(days__icontains=day)
		
		if range_age:
			q &= Q(range_age=range_age)
		if time_zone:
			q &= Q(time_zone=time_zone)
		if gender:
			q &= Q(gender=gender)
		if query:
			q &= Q(title__contains=query)
		rtn = Club.objects.filter(q)
		return Response(ClubViewSerializer(rtn,many=True,context = {'request' : request}).data)