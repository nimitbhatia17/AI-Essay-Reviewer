from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from users.models import UserAccount
from .models import Conversation
import json
from django.core.serializers import serialize


class CreateANewConversation(APIView):
    def post(self, request, *args, **kwargs):
        user_email = request.data.get("userId").strip()
        user_object = UserAccount.objects.filter(email__exact=user_email)[0]

        conversation = Conversation(title="New Conversation", user=user_object)
        conversation.save()
        return Response({"conversation_id": conversation.id}, status=status.HTTP_200_OK)


class FetchAllConversationsOfAUser(APIView):
    def get(self, request, *args, **kwargs):
        user_email = request.GET.get("email", None).strip()
        user_object = UserAccount.objects.filter(email__exact=user_email)[0]

        filtered_conversations = Conversation.objects.filter(user=user_object)
        filtered_conversations_dict = json.loads(
            serialize("json", filtered_conversations))
        return Response(filtered_conversations_dict, status=status.HTTP_200_OK)
