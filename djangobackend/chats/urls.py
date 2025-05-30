from django.urls import path
from .views import GetChatsByConversation, InsertChatToConversation

urlpatterns = [
    path("get-chats/", GetChatsByConversation.as_view()),
    path("insert-chat/", InsertChatToConversation.as_view())
]
