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
        if not conversation_uuid:
            return Response(status=status.HTTP_204_NO_CONTENT)

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
        response_id = conversation_object.context_response_id

        user_chat_object = Chat(
            text=chat_prompt, conversation=conversation_object, is_ai=False, previous_output_id="")
        user_chat_object.save()

        ai_response, response_id = get_ai_response(chat_prompt, response_id)
        ai_chat_object = Chat(
            text=ai_response, conversation=conversation_object, is_ai=True, previous_output_id="")
        ai_chat_object.save()
        conversation_object.context_response_id = response_id

        chat_counts = len(Chat.objects.filter(
            conversation=conversation_object))
        print(f"Chat counts: {chat_counts}")

        if chat_counts == 3:
            ai_response, response_id = get_ai_response(
                "Give a suitable title for the conversation", response_id)
            conversation_object.title = ai_response
            conversation_object.context_response_id = response_id

        conversation_object.save()

        return Response(status=status.HTTP_204_NO_CONTENT)
