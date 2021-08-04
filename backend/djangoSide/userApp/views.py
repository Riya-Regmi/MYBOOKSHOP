from django.shortcuts import render
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Account,UserTokens,bookInformation,recommendation
from .serializer import *
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
import json
from rest_framework.views import APIView
from pathlib import Path

@api_view(['GET', 'POST'])
def create_and_show_acount(request):
    if request.method=="GET":
        data=Account.objects.all()
        serializer=accountSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = accountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','POST'])
def googleLogin(request):
    if request.method=="GET":
        data=UserTokens.objects.all()
        serializer=tokenSerializer(data,context={'request':request},many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = tokenSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)    
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def userData(request,id):
    #try:
    data=Account.objects.get(id=id)
    serializer=accountSerializer(data,context={'request': request})
    return Response(serializer.data)
    #except:
     #   googleData=UserTokens.objects.get(id=id)
      #  serializer=tokenSerializer(googleData,context={'request':request},many=True)       
       # return Response(serializer.data)

@api_view(['PUT'])
def updateData(request,id):
    datas=Account.objects.get(id=id)
    print(request.data)
    serializer=accountSerializer(datas,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
def bookInformationSave(request,id):
    user=Account.objects.get(id=id)        
    serializer=bookInformationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=user)
        return Response(status=status.HTTP_201_CREATED)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def listOfAddedBook(request,id):
    user=Account.objects.get(id=id)
    data=bookInformation.objects.filter(user=user,status='addedOnList',book="Book")
    serializers=bookInformationSerializer(data,context={'request':request},many=True)
    return Response(serializers.data)

@api_view(['GET'])
def listOfAddedTextBook(request,id):
    user=Account.objects.get(id=id)
    data=bookInformation.objects.filter(user=user,status='addedOnList',book="TextBook")
    serializers=bookInformationSerializer(data,context={'request':request},many=True)
    return Response(serializers.data)

@api_view(['POST'])
def notesInformationSave(request,id):
    user=Account.objects.get(id=id)
    serializer=notesInformationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=user)
        return Response(status=status.HTTP_201_CREATED)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def listOfAddedNotes(request,id):
    user=Account.objects.get(id=id)
    data=notesInformation.objects.filter(user=user,status='addedOnList')
    serializers=notesInformationSerializer(data,context={'request':request},many=True)
    return Response(serializers.data)

@api_view(['GET'])
def specificBookInfo(request,id,bookId):
    user=Account.objects.get(id=id)
    bookData=bookInformation.objects.get(user=user,id=bookId)
    serializers=bookInformationSerializer(bookData,context={'request':request})

    return Response(serializers.data)

@api_view(['PUT'])
def editDataOfBook(request,id,bookId):
    user=Account.objects.get(id=id)
    bookInfo=bookInformation.objects.get(user=user,id=bookId)
    serializers=bookInformationSerializer(bookInfo,data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        print(serializers.errors)
        return Response(serializers.errors)

@api_view(['DELETE'])
def deleteDataOfBook(request,id,bookId):
    user=Account.objects.get(id=id)
    bookInfo=bookInformation.objects.get(user=user,id=bookId)
    bookInfo.delete()  
    return Response(status=status.HTTP_204_NO_CONTENT)  

@api_view(['GET'])
def specificNoteInfo(request,id,noteId):
    user=Account.objects.get(id=id)
    noteData=notesInformation.objects.get(user=user,id=noteId)
    serializers=notesInformationSerializer(noteData,context={'request':request})
    return Response(serializers.data)

@api_view(['PUT'])
def editDataOfNote(request,id,noteId):
    user=Account.objects.get(id=id)
    noteInfo=notesInformation.objects.get(user=user,id=noteId)
    serializers=notesInformationSerializer(noteInfo,data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        print(serializers.errors)
        return Response(serializers.errors)

@api_view(['DELETE'])
def deleteDataOfNote(request,id,noteId):
    user=Account.objects.get(id=id)
    noteData=notesInformation.objects.get(user=user,id=noteId)
    noteData.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def listOfAllAddedBook(request):
    addedBooks=bookInformation.objects.filter(status='addedOnList',book="Book")
    serializers=bookInformationSerializer(addedBooks,context={'request':request},many=True)
    return Response(serializers.data)

@api_view(['GET'])
def listOfSelectedBook(request,book):
    addedBooks=bookInformation.objects.filter(status='addedOnList',book="Book",typeOfBook=book)
    serializers=bookInformationSerializer(addedBooks,context={'request':request},many=True)
    return Response(serializers.data)

@api_view(['GET'])
def getBook(request,bookID):
    bookInfo=bookInformation.objects.filter(id=bookID)
    serializers=bookInformationSerializer(bookInfo,context={'request':request},many=True)
    return Response(serializers.data)

@api_view(['GET'])
def listOfAllAddedTextBook(request):
    addedBooks=bookInformation.objects.filter(status='addedOnList',book="TextBook")
    serializers=bookInformationSerializer(addedBooks,context={'request':request},many=True)
    return Response(serializers.data)

@api_view(['GET'])
def listOfSelectedTextBook(request,book):
    addedBooks=bookInformation.objects.filter(status='addedOnList',book="TextBook",typeOfBook=book)
    serializers=bookInformationSerializer(addedBooks,context={'request':request},many=True)
    return Response(serializers.data)

@api_view(['GET'])
def listOfAllAddedNotes(request):
    addedBooks=notesInformation.objects.filter(status='addedOnList')
    serializers=notesInformationSerializer(addedBooks,context={'request':request},many=True)
    return Response(serializers.data)

@api_view(['GET'])
def listOfAddedNotes(request,id):
    user=Account.objects.get(id=id)
    data=notesInformation.objects.filter(user=user,status='addedOnList')
    serializers=notesInformationSerializer(data,context={'request':request},many=True)
    return Response(serializers.data)

@api_view(['GET'])
def getNote(request,bookID):
    bookInfo=notesInformation.objects.filter(id=bookID)
    serializers=notesInformationSerializer(bookInfo,context={'request':request},many=True)
    return Response(serializers.data)

@api_view(['GET'])
def listOfAllSelectedNotes(request,book):
    addedBooks=notesInformation.objects.filter(status='addedOnList',notesType=book)
    serializers=notesInformationSerializer(addedBooks,context={'request':request},many=True)
    return Response(serializers.data)

@api_view(['POST'])
def recommendationOfBook(request):
    serializers=recommendationSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response(status=status.HTTP_201_CREATED)    
    return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def recommendationOfBookGET(request):
    data=recommendation.objects.all()
    serializers=recommendationSerializer(data,context={'request':request},many=True)
    return Response(serializers.data)











        
    

    

    



    

    
    
