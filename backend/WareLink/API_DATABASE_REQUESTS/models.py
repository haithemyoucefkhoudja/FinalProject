from django.contrib.auth.models import User
from django.db import models

##################################################Company_app
class Company(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    num_warehouses = models.IntegerField(default=0)
    num_employees = models.IntegerField(default=0)
    revenue_growth_rate = models.IntegerField(default=0)

class Warehouse(models.Model):
    id = models.AutoField(primary_key=True)
    company_id = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True)
    type = models.CharField(max_length=15 , null=True)
    name = models.CharField(max_length=50)
    longitude = models.CharField(max_length=8 , null=True)
    latitude = models.CharField(max_length=8 , null=True)
    num_products = models.IntegerField(default=0)

class Car(models.Model):
    id = models.AutoField(primary_key=True)
    company_id = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=50)
    registration_number = models.CharField(max_length=50)
    walked = models.IntegerField(default=0)
##################################################Company_app
###########################################################Account_app
class Permission(models.Model):
    id = models.AutoField(primary_key=True)
    permission = models.CharField(max_length=100)

class Role(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    permissions = models.ManyToManyField('Permission', related_name='roles_where_permission_belong')


class Account(models.Model):
    # id,username,email,password fields are all in djangoes user model
        #user.username or user.password ......
    user = models.OneToOneField(User, on_delete=models.CASCADE)
        # user.username or user.password ......
    # id,username,email,password fields are all in djangoes user model

    warehouse_id = models.ForeignKey(Warehouse, on_delete=models.SET_NULL, null=True, blank=True)
    role_id = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True)
###########################################################Account_app
#################################################################Product_app
class Product_type(models.Model):
    '''
    note: Product_type object can't be deleted cause it's needed in sales and archieve
    use the bool : is_deleted instead
    '''
    id  = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    average_revenue_per_product  = models.IntegerField(default=0)
    company_id = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True)
    is_deleted = models.BooleanField(default=False)

class Product(models.Model):
    id = models.AutoField(primary_key=True)
    product_type_id = models.ForeignKey(Product_type, on_delete=models.SET_NULL, null=True, blank=True)
    warehouse_id = models.ForeignKey(Warehouse, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.IntegerField(default=0)
    price_per_unit = models.IntegerField(default=0, null=True)
    quantity_warning_limit = models.IntegerField(default=100, null=True)
    intelligant_repelnishement = models.IntegerField(null=True)
    forcast_demand = models.IntegerField(null=True)
    is_shipment = models.BooleanField(default=False)
#################################################################Product_app
##########################################################################Notification_app
class Notification_type(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

class Notification_detail(models.Model):
    id = models.AutoField(primary_key=True)
    notification_type_id = models.ForeignKey(Notification_type, on_delete=models.SET_NULL, null=True, blank=True)
    date = models.DateTimeField()
    warehouse_id = models.ForeignKey(Warehouse, on_delete=models.SET_NULL, null=True, blank=True)
    shippment_id  = models.ForeignKey('Shippment', on_delete=models.SET_NULL, null=True, blank=True)

class Notification(models.Model):
    id = models.AutoField(primary_key=True)
    notification_detail_id = models.ForeignKey(Notification_detail, on_delete=models.SET_NULL, null=True, blank=True)
    account_id = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True, blank=True)
    is_read = models.BooleanField(default=False)
##########################################################################Notification_app
#################################################################################Shipment
class Shippment(models.Model):
    id = models.AutoField(primary_key=True)
    company_id = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True)
    car_id =  models.ForeignKey(Car, on_delete=models.SET_NULL, null=True, blank=True)
    driver_id =  models.ForeignKey(Account, on_delete=models.SET_NULL, null=True, blank=True)
    departing_warehouse_id = models.ForeignKey(Warehouse, on_delete=models.CASCADE, related_name='gone_shippments')
    arriving_warehouse_id = models.ForeignKey(Warehouse, on_delete=models.CASCADE, related_name='coming_shippments')
    scheduled_departing_time = models.DateTimeField()
    scheduled_arriving_time = models.DateTimeField()
    is_departed = models.BooleanField(default=False)
    is_arrived = models.BooleanField(default=False)
    is_canceled =  models.BooleanField(default=False)

class Shippment_Product_OnetoMany(models.Model):
    id = models.AutoField(primary_key=True)
    shippment_id = models.ForeignKey(Shippment, on_delete=models.SET_NULL, null=True, blank=True)
    product_id = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
#################################################################################Shipment
##########################################################################################Report&Analysis
class Sales(models.Model):
    id = models.AutoField(primary_key=True)
    entity_type = models.CharField(max_length=100)
    company_id = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True)
    warehouse_id = models.ForeignKey(Warehouse, on_delete=models.SET_NULL, null=True, blank=True)
    sales_type = models.CharField(max_length=100)
    year = models.IntegerField()
    month = models.IntegerField()
    date = models.DateField()
    revenue = models.IntegerField()

class Product_archieve(models.Model):
    id = models.AutoField(primary_key=True)
    product_type_id = models.ForeignKey(Product_type, on_delete=models.SET_NULL, null=True, blank=True)
    company_id = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True)
    quantity_sold = models.IntegerField()
    product_archieve_type = models.CharField(max_length=100)
    year = models.IntegerField()
    month = models.IntegerField()
    date = models.DateTimeField()
    entity_type = models.CharField(max_length=100)
    warehouse_id = models.ForeignKey(Warehouse, on_delete=models.SET_NULL, null=True, blank=True)

##########################################################################################Report&Analysis

