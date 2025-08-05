from django.contrib import admin
from .models import MachineEvent,MachineFault,Cell,Product,Event
class EventFilter(admin.ModelAdmin):
    list_filter = ["machine"]
    ordering =['-created_at']
    
admin.site.register(MachineEvent,EventFilter)
admin.site.register(MachineFault,EventFilter)
admin.site.register(Cell)
admin.site.register(Product)
admin.site.register(Event,EventFilter)
# Register your models here.
