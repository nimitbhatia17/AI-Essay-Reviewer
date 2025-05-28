from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('djoser.urls')),
    path('api/', include('users.urls')),
    path('api/', include('essays.urls')),
    path('api/conversation/', include('conversations.urls')),
    path('api/chat/', include('chats.urls'))
]
