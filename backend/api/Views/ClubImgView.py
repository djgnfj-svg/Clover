from rest_framework import viewsets, status
from rest_framework.response import Response

from api.Utils.Error_msg import error_msg
from api.Serializers.ClubImgSerializer import ClubDetailImgSerializer
from api.Utils.Permission import IsMaster

from club.models import ClubDetailImg

class ClubDetailImgView(viewsets.ModelViewSet):
    queryset = ClubDetailImg.objects.all()
    serializer_class = ClubDetailImgSerializer
    permission_classes = [IsMaster,]

    def create(self, request, club_id):
        serializer = self.get_serializer(data=request.data, context={'request' : request})
        if serializer.is_valid():
            rtn = serializer.create(club_id, serializer.data)
            return Response(self.get_serializer(rtn).data)
        else:
            return Response(error_msg(serializer=serializer), status=status.HTTP_400_BAD_REQUEST)

