from django.contrib import admin
from .models import UserTokens,Account,bookInformation

# Register your models here.

admin.site.register(UserTokens)
admin.site.register(Account)
admin.site.register(bookInformation)


