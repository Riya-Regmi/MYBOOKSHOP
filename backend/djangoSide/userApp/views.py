from django.shortcuts import render
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Account,UserTokens,bookInformation
from .serializer import *
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
import json
from rest_framework.views import APIView

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
    serializer=bookInformationSerializer(user,data=request.data)
    account=accountSerializer(user,data=serializer)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    

    

    



    

    
    
