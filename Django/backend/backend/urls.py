"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from routedb.views import RoomAccessibleView, AllRoomView, AllBuildingView, RoomCreationView, RoomEditView, NodeRecreateView, OutdoorRouteView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/all-buildings', AllBuildingView.as_view(), name='all-buildings'),
    path('api/all-rooms', AllRoomView.as_view(), name='all-rooms'),
    path('api/rooms/<room_id>/', RoomAccessibleView.as_view(), name='room'),
    path('api/create-room/', RoomCreationView.as_view(), name='room-creation'),
    path('api/edit-room/', RoomEditView.as_view(), name='room-edit'),
    path('api/recreate/', NodeRecreateView.as_view(), name='node-recreate'),
    path('api/get-route/', OutdoorRouteView.as_view(), name='outdoor-route'),

]
