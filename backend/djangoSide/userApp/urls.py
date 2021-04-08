
from django.contrib import admin
from django.urls import path
from userApp import views
from django.urls import path, re_path
from .views import *
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/userAccount/$',views.create_and_show_acount),
    re_path(r'^rest-auth/google/$',views.googleLogin),
    re_path(r'^rest-auth/userdetail/(?P<id>\w+)$',views.userData),
    re_path(r'^rest-auth/updateUser/(?P<id>\w+)$',views.updateData),
    re_path(r'^rest-auth/bookInfo/(?P<id>\w+)$',views.bookInformationSave),


]+ static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

