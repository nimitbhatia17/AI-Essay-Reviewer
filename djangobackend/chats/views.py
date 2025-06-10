from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from conversations.models import Conversation
from .utils import get_ai_response
from .models import Chat
import json
from django.core.serializers import serialize
from django.utils.encoding import uri_to_iri


class GetChatsByConversation(APIView):
    def get(self, request, *args, **kwargs):
        conversation_uuid = uri_to_iri(
            request.GET.get("conversation_id", None)).strip()

        conversation_object = Conversation.objects.filter(id=conversation_uuid)[
            0]

        filtered_chats = Chat.objects.filter(conversation=conversation_object)
        filtered_chats_dict = json.loads(serialize("json", filtered_chats))

        return Response(filtered_chats_dict, status=status.HTTP_200_OK)


class InsertChatToConversation(APIView):
    def post(self, request, *args, **kwargs):
        conversation_uuid = request.data.get("conversation_id", None).strip()
        chat_prompt = request.data.get("prompt", None).strip()

        conversation_object = Conversation.objects.filter(id=conversation_uuid)[
            0]

        user_chat_object = Chat(
            text=chat_prompt, conversation=conversation_object, is_ai=False, previous_output_id="")
        user_chat_object.save()

        ai_response = get_ai_response(chat_prompt)
        ai_chat_object = Chat(
            text=ai_response, conversation=conversation_object, is_ai=True, previous_output_id="")
        ai_chat_object.save()

        return Response(status=status.HTTP_204_NO_CONTENT)
