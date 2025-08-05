from django.contrib import admin
from .models import Organization, UserProfile, Asset,MaintenancePlan

admin.site.register(Organization)
admin.site.register(UserProfile)
admin.site.register(Asset)
admin.site.register(MaintenancePlan)

# Register your models here.
