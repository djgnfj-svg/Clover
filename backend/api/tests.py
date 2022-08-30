from django.test import TestCase


from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
# Create your tests here.

class TempTestCase(APITestCase):
    def test_home(self):
        response = self.client.get("/api/home/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    


    # 여러 개의  데이터를 만드는 셋업과 진행해야될듯
    # def test_search(self):
    #     # search data = query
    #     # time_zone, range_arg, gender, days, query
    #     response = self.client.get("/api/search/")
    #     temp = self.assertEqual(response.status_code, status.HTTP_200_OK)
