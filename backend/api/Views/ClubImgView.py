from rest_framework import viewsets, status
from rest_framework.response import Response
from api.Utils.Error_msg import error_msg, success_msg
from api.Serializers.ClubImgSerializer import ClubthumbnailSerializer
from api.Utils.Permission import IsManager
from api.Serializers.ClubImgSerializer import ClubDetailImgSerializer
from api.Utils.Permission import IsMaster
from club.models import ClubDetailImg
from club.models import Club, ClubThumbnail

class ClubThumbnailView(viewsets.ModelViewSet):
    queryset = ClubThumbnail.objects.all()
    serializer_class = ClubthumbnailSerializer
    permission_classes = [IsMaster,]

    def list(self, request, club_id, *args, **kwargs):
        club = Club.objects.get(id=club_id)
        queryset = self.queryset.get(club=club)
        return Response(self.get_serializer(queryset).data)
    
    def create(self, request, club_id, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request' : request})
        if serializer.is_valid():
            rtn = serializer.create(club_id, serializer.data)
            if rtn :
                return Response(self.get_serializer(rtn).data)
        else:
            return Response(error_msg(serializer=serializer), status=status.HTTP_400_BAD_REQUEST)

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

