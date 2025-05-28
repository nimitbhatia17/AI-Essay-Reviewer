from django.urls import path
from .views import CreateANewConversation, FetchAllConversationsOfAUser

urlpatterns = [
    path('new-conversation/', CreateANewConversation.as_view()),
    path('get', FetchAllConversationsOfAUser.as_view())
]
