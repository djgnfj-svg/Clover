
from rest_framework import status
from rest_framework.test import APITestCase
# Create your tests here.

class HomeTestCase(APITestCase):
    def test_home(self):
        response = self.client.get("/api/home/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
