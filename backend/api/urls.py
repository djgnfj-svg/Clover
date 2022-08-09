from rest_framework import routers

from api.Views.clubViewsets import ClubViewSet

router = routers.DefaultRouter()
router.register(r'club', ClubViewSet, basename="Club")
# router.register(r'search', SearchViewSet, basename="Club")