
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
    re_path(r'^rest-auth/bookAdded/(?P<id>\w+)$',views.listOfAddedBook),
    re_path(r'^rest-auth/listOfAddedTextBook/(?P<id>\w+)$',views.listOfAddedTextBook),
    re_path(r'^rest-auth/notesInfo/(?P<id>\w+)$',views.notesInformationSave),
    re_path(r'^rest-auth/notesAdded/(?P<id>\w+)$',views.listOfAddedNotes),
    re_path(r'^rest-auth/specificBookInfo/(?P<id>\w+)/(?P<bookId>\w+)$',views.specificBookInfo),
    re_path(r'^rest-auth/editDataOfBook/(?P<id>\w+)/(?P<bookId>\w+)$',views.editDataOfBook),
    re_path(r'^rest-auth/deleteDataOfBook/(?P<id>\w+)/(?P<bookId>\w+)$',views.deleteDataOfBook),
    re_path(r'^rest-auth/specificNoteInfo/(?P<id>\w+)/(?P<noteId>\w+)$',views.specificNoteInfo),
    re_path(r'^rest-auth/editDataOfNote/(?P<id>\w+)/(?P<noteId>\w+)$',views.editDataOfNote),
    re_path(r'^rest-auth/deleteDataOfNote/(?P<id>\w+)/(?P<noteId>\w+)$',views.deleteDataOfNote),
    re_path(r'^rest-auth/listOfAllAddedBook/$',views.listOfAllAddedBook),
    re_path(r'^rest-auth/listOfSelectedBook/(?P<book>\w+)/$',views.listOfSelectedBook),
    re_path(r'^rest-auth/getBook/(?P<bookID>\w+)/$',views.getBook),
    re_path(r'^rest-auth/listOfAllAddedTextBook/$',views.listOfAllAddedTextBook),
    re_path(r'^rest-auth/listOfSelectedTextBook/(?P<book>\w+)/$',views.listOfSelectedTextBook),
    re_path(r'^rest-auth/listOfAllAddedNotes/$',views.listOfAllAddedNotes),
    re_path(r'^rest-auth/listOfAddedNotes/(?P<id>\w+)$',views.listOfAddedNotes),
    re_path(r'^rest-auth/listOfAllSelectedNotes/(?P<book>\w+)/$',views.listOfAllSelectedNotes),
    re_path(r'^rest-auth/getNote/(?P<bookID>\w+)/$',views.getNote),
    re_path(r'^rest-auth/recommendationOfBook/$',views.recommendationOfBook),
    re_path(r'^rest-auth/recommendationOfBookGET/$',views.recommendationOfBookGET),



















]+ static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

