from rest_framework import routers

from api.Views.ClubView import ClubViewSet
from api.Views.ClubManagerVeiw import ClubManagerView
from api.Views.ClubMasterView import ClubMasterView
from api.Views.UserView import UserProfileViewSet
from api.Views.SearchView import SearchViewSet
from api.Views.HomeView import HomeViewSet
from api.Views.ClubImgView import ClubDetailImgView

router = routers.DefaultRouter()
router.register(r'clubs', ClubViewSet, basename="Club")
router.register(r'clubs/(?P<club_id>\d+)/img', ClubDetailImgView, basename="ClubDetailImg")
router.register(r'clubs/(?P<club_id>\d+)/managers', ClubManagerView, basename="ClubManager")
router.register(r'clubs/(?P<club_id>\d+)/master', ClubMasterView, basename="ClubMaster")
router.register(r'profile', UserProfileViewSet, basename="profile")
router.register(r'search', SearchViewSet, basename="search")
router.register(r'home', HomeViewSet, basename="Home")