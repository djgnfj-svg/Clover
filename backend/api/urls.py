from rest_framework import routers

from api.Views.clubViewsets import ClubViewSet

router = routers.DefaultRouter()
router.register(r'club', ClubViewSet, basename="Club")