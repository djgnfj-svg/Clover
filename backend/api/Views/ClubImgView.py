from django.shortcuts import get_object_or_404

from rest_framework import viewsets, status
from rest_framework.response import Response
from api.Utils.Error_msg import error_msg, success_msg
from api.Utils.Permission import IsManager
from api.Serializers.ClubImgSerializer import ClubDetailImgSerializer
from api.Utils.Permission import IsMaster
from club.models import ClubDetailImg

class ClubDetailImgView(viewsets.ModelViewSet):
    queryset = ClubDetailImg.objects.all()
    serializer_class = ClubDetailImgSerializer
    permission_classes = [IsMaster,]

    def create(self, request, club_id, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request' : request})
        if serializer.is_valid():
            rtn = serializer.create(club_id, serializer.data)
            if rtn :
                return Response(self.get_serializer(rtn).data)
        else:
            return Response(error_msg(serializer=serializer), status=status.HTTP_400_BAD_REQUEST)

