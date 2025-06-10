from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from users.models import UserAccount
from chats.models import Chat
from .models import Conversation
import json
from django.core.serializers import serialize
from django.utils.encoding import uri_to_iri


class CreateANewConversation(APIView):
    def post(self, request, *args, **kwargs):
        user_email = request.data.get(
            "user", "nimitbhatia17@gmail.com").strip()
        if user_email is None or len(user_email) <= 0:
            return Response({"error": "No User Email found in request please try again..."}, status=status.HTTP_404_NOT_FOUND)

        user_object = UserAccount.objects.filter(email__exact=user_email)[0]

        conversation = Conversation(title="New Conversation", user=user_object)
        conversation.save()

        first_chat = Chat(text="Hi I am your personal MBA Assistant to support you in your MBA Journey with Admissions Gateway",
                          conversation=conversation, is_ai=True, previous_output_id="")
        first_chat.save()

        filtered_conversations_dict = json.loads(
            serialize("json", [conversation]))
        return Response(filtered_conversations_dict[0], status=status.HTTP_200_OK)


class FetchAllConversationsOfAUser(APIView):
    def get(self, request, *args, **kwargs):
        user_email = uri_to_iri(request.GET.get(
            "user", "nimitbhatia17@gmail.com").strip())
        if user_email is None or len(user_email) <= 0:
            return Response({"error": "No User Email found in request please try again..."}, status=status.HTTP_404_NOT_FOUND)
        print(user_email)
        user_object = UserAccount.objects.filter(email__exact=user_email)[0]
        filtered_conversations_dict = {}

        filtered_conversations = Conversation.objects.filter(
            user=user_object).order_by('-updated_at')
        filtered_conversations_dict = json.loads(
            serialize("json", filtered_conversations))
        return Response(filtered_conversations_dict, status=status.HTTP_200_OK)


class DeleteConversation(APIView):
    def post(self, request, *args, **kwargs):
        conversation_uuid = request.data.get("conversation_id").strip()
        conversation_to_delete = Conversation.objects.filter(
            id=conversation_uuid)[0]
        conversation_to_delete.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
