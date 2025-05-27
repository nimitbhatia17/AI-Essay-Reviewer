from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Essay
from django.core.serializers import serialize
import json


class SearchBasedOnTags(APIView):
    def post(self, request, *args, **kwargs):
        query = request.data.get("query", "").strip()
        if not query:
            return Response({"error": "Query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)
        filtered_essays = Essay.objects.filter(title__exact=query)
        filtered_essays_dict = json.loads(serialize("json", filtered_essays))

        print(query)

        if not filtered_essays_dict:
            return Response({"message": "No essays found."}, status=status.HTTP_204_NO_CONTENT)
        return Response(filtered_essays_dict, status=status.HTTP_200_OK)
