from django.core.management.base import BaseCommand
import os
from django.utils import timezone
from openpyxl import load_workbook
import datetime
import time
from db.models import Organization,Asset,UserProfile
from state.models import Product,MachineFault,Cell,Event
from django.contrib.auth.models import User
import random

class Command(BaseCommand):
    """
    Create a superuser if none exist
    Example:
        manage.py createsuperuser_if_none_exists --user=admin --password=changeme
    """


    def handle(self, *args, **options):

        organization = Organization.objects.all()[0]

        user = UserProfile.objects.filter(organization=organization)[0].user

        date_time_obj = timezone.now()
        product_1 = Product.objects.create(organization=organization,product_id='Product_300',product_name='Product_300',ideal_cycle = 1)
        product_2 = Product.objects.create(organization=organization,product_id='Product_310',product_name='Product_310',ideal_cycle = 0.5)
        wb = load_workbook(filename = 'state/oee_demo_data.xlsx')
        ws=wb['oee_data']
        list_cells = ['Extruder head','Cooling-1','Cooling-2','Accumulator','Winder']
        list_fault = ['Setup','Change over','Maintenance','Technical','Materials short','Uncategorized']
        
        events = list(ws.columns)[0]
        products = list(ws.columns)[6]
        quantity = list(ws.columns)[7]
        scrap = list(ws.columns)[8]


        for i in range(4):
            starting_time = date_time_obj - timezone.timedelta(hours = 89)
            line_name= 'CNC Machine ' + str(i)
            line = Asset.objects.create(name=line_name,organization=organization,running_hour_consumption_kw=100,on_hour_consumption_kw=75,running_hour_cost=200,on_hour_cost=150)
            
            for cell in list_cells:
                Cell.objects.create(machine=line,name=cell)
            for fault in list_fault:
                MachineFault.objects.create(machine=line,name=fault)
            
            
            
            idx = 0
            cells = [cell for cell in Cell.objects.filter(machine=line)]
            faults = [fault for fault in MachineFault.objects.filter(machine=line)]
            for i in range(1):

                for row in events:
                    
                    if idx < 4 :
                        pass
                    elif idx > 90:
                        pass
                    else :    
                        if row.value == 'report':
                            if products[idx].value == 'product 1':
                                product = product_1
                            else :
                                product = product_2
                            #adding reports uniformly
                            qty_per_min = quantity[idx].value / 60
                            scrap_per_min = scrap[idx].value / 60
                            r_time = starting_time - timezone.timedelta(hours = 1)
                            for i in range(60):
                                Event.objects.create(machine=line,state='report',quantity = qty_per_min,scrap=scrap_per_min,product=product,created_at=r_time)

                                r_time = r_time + timezone.timedelta(minutes= 1)
                        elif row.value in ('fault' , 'failure'):
                            
                            Event.objects.create(machine=line,state=row.value,fault=random.choice(faults),cell=random.choice(cells),created_at=starting_time)

                        else :
                            Event.objects.create(machine=line,state=row.value,created_at=starting_time)
                        starting_time += timezone.timedelta(hours = 1)
                    idx += 1
                idx= 0
 