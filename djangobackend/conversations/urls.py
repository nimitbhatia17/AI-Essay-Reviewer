from django.urls import path
from .views import CreateANewConversation, FetchAllConversationsOfAUser, DeleteConversation

urlpatterns = [
    path('new-conversation/', CreateANewConversation.as_view()),
    path('get-user-conversations', FetchAllConversationsOfAUser.as_view()),
    path('delete-conversation/', DeleteConversation.as_view())
]
