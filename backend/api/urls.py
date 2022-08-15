from rest_framework import routers

from api.Views.ClubView import ClubViewSet, ClubManagerView, ClubMasterView
from api.Views.UserView import UserProfileViewSet
from api.Views.SearchView import SearchViewSet
from api.Views.HomeView import HomeViewSet

router = routers.DefaultRouter()
router.register(r'club', ClubViewSet, basename="Club")
router.register(r'club/(?P<club_id>\d+)/manager', ClubManagerView, basename="ClubManager")
router.register(r'club/(?P<club_id>\d+)/master', ClubMasterView, basename="ClubMaster")
router.register(r'profile', UserProfileViewSet, basename="profile")
router.register(r'search', SearchViewSet, basename="search")
router.register(r'home', HomeViewSet, basename="Home")