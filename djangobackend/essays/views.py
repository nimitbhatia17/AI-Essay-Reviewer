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

        if not filtered_essays_dict:
            return Response({"error": "No essays found."}, status=status.HTTP_204_NO_CONTENT)
        return Response(filtered_essays_dict, status=status.HTTP_200_OK)


class GetEssayBasedOnId(APIView):
    def get(self, request, *args, **kwargs):
        id = request.GET.get("id", None).strip()
        print(id)
        if not id:
            return Response({"error": "Id parameter is required."}, status=status.HTTP_400_BAD_REQUEST)
        filtered_essay = Essay.objects.filter(pk__exact=id)
        filtered_essay_dict = json.loads(serialize("json", filtered_essay))

        if not filtered_essay_dict or len(filtered_essay_dict) < 1:
            return Response({"error": "No essays found."}, status=status.HTTP_204_NO_CONTENT)
        return Response(filtered_essay_dict[0], status=status.HTTP_200_OK)
