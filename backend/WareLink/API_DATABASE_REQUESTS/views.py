from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.apps import apps
from django.http import HttpResponse
from datetime import datetime
from django.utils import timezone
import json
from .models import *
from django.contrib.auth.hashers import check_password

PRIVATE_GUEST_STATUS = False
def log_view_access_attempt(request):
    if PRIVATE_GUEST_STATUS:
        current_datetime = datetime.now()

        # Log the date information to a text file
        with open('view_access_log.txt', 'a') as log_file:
            log_file.write(f"\n\nAccessed view at: {current_datetime}\n")

            # Optionally, log additional information about the request
            log_file.write(f"Request path: {request.path}\n")
            log_file.write(f"Request method: {request.method}\n")
            if request.user.is_authenticated:
                log_file.write(f"User: {request.user}\n")

        # Optionally, you can also print the log to console for debugging
        print(f"Accessed view at: {current_datetime}")

        # Return a response or redirect as needed
        # For example:
        # return HttpResponse("View accessed and logged successfully")
        return True
    else:
        return False


permissions_list = {
    1: "can access main homepage.",
    2: "can see map componant.",
    3: "can see all warehouses.",
    4: "can see own warehouse.",
    5: "can see all product tables.",
    6: "can see own product table.",
    7: "can see all shipments.",
    8: "can see own shipment.",
    9: "can see states.",
    10: "can see reports.",
    11: "can see company info.",
    12: "can see warehouse info.",
    13: "can see all accounts/trucks/warehouses.",
    14: "can register company.",
    15: "can add accounts/trucks/warehouses.",
    16: "edit company.",
    17: "edit accounts/trucks/warehouses.",
    18: "make new warehouse.",
    19: "edit warehouse.",
    20: "delete accounts/trucks.",
    21: "delete warehouse.",
    22: "make new shipment.",
    23: "cancel shipment.",
    24: "can confirm shipment departure.",
    25: "can confirm shipment arrival."
}


admin_permission_numbers = list(range(26))
observer_permission_numbers = list(range(13))
worker_permission_numbers = [1,2,4,6,8,24,25]
driver_permission_numbers = [1,2,8,24,25]



def check_account_exist(email, password):
    if User.objects.filter(email=email).exists():
        user = User.objects.filter(email=email).first()
        #if password exist
        #use this method cause password is encrypted
        if user and check_password(password, user.password):
            return True
    return False

def check_account_role(account_object, role_name):
    if account_object.role_id.name == role_name:
        return True
    else:
        return False

def check_if_account_has_permission(account_object, permission_text):
    if account_object.role_id.permissions.filter(permission=permission_text).exists():
        return True
    else:
        return False

def check_company_exist(company_name):
    if Company.objects.filter(name=company_name).exists():
        return True
    return False



@csrf_exempt
def populate_permissions(request):
    if log_view_access_attempt(request):
        return JsonResponse({"message": "Not authorised to access"})
    if request.method == 'POST':
        created_permissions = []

        # Add permissions for admin
        for key , permission_text in permissions_list.items():
            # Check if the permission already exists
            if not Permission.objects.filter(permission=permission_text).exists():
                permission_new_row = Permission(permission=permission_text)
                permission_new_row.save()
                created_permissions.append(permission_new_row)

        for permission_row in created_permissions:
            print(f"- Permission new row has been indeed created with id={permission_row.id} and permission being: {permission_row.permission}")

        # Return permissions_added.html as response
    else:
        return render(request, 'populate.html')





@csrf_exempt
def populate_roles(request):
    if log_view_access_attempt(request):
        return JsonResponse({"message": "Not authorised to access"})
    if request.method == 'POST':
        '''
        TOOOOOOOOOOOO DELETE BY ID------------------------------------------------
        
        roles_to_delete = Role.objects.filter(id__in=[12])
        for role in roles_to_delete:
            role.delete()
        
        TOOOOOOOOOOOO DELETE BY ID-------------------------------------------------
        '''
        permission_rows = Permission.objects.filter(id__in=driver_permission_numbers)
        print("DRIVER HAS PERMISSIONS:")
        for i in permission_rows:
            print(f"-id={i.id} and permission : {i.permission}")
        new_role_row = Role.objects.create(name="driver")
        # Link Model1 instance with Model2 instances
        for perm in permission_rows:
            new_role_row.permissions.add(perm)

        # Save changes to the Model1 instance
        new_role_row.save()
        messages = []
        roles_list = Role.objects.all()
        for role in roles_list:
            print(f"Role:  id={role.id} name={role.name}:")
            messages.append(f"Role: {role.name}:")
            permissions = role.permissions.all()
            for permission in permissions:
                print(f"----Permission id: {permission.id} permission: {permission.permission}")
                messages.append(f"----Permission id: {permission.id} permission: {permission.permission}")
        return HttpResponse("\n".join(messages))


    else:
        return render(request, 'populate.html')


@csrf_exempt
def populate_company(request):
    if log_view_access_attempt(request):
        return JsonResponse({"message": "Not authorised to access"})
    if request.method == 'POST':
        '''
        TOOOOOOOOOOOO DELETE BY ID------------------------------------------------

        companies_to_delete = Company.objects.filter(id__in=[12])
        for company in companies_to_delete:
            company.delete()

        TOOOOOOOOOOOO DELETE BY ID-------------------------------------------------
        '''
        message = []
        company_name = "PFIZER"
        if Company.objects.exists():
            company_list = Company.objects.all()
            print("ALREADY EXISTING COMPANIES :")
            for company in company_list:
                print(f"_company name:{company.name} id:{company.id} num_warehouses:{company.num_warehouses} num_employees:{company.num_employees}")
        if not Company.objects.filter(name=company_name).exists():
            new_company_row = Company.objects.create(name=company_name)
            # Save changes to the Model1 instance
            new_company_row.save()
            if Company.objects.filter(name=company_name).exists():
                company_confirm = Company.objects.get(name=company_name)
                message.append(f"_____indeed the companye maned:{company_confirm.name} and id:{company_confirm.id} has been added")
            else:
                message.append("couldn't find the company u tried to add")
            print(message)
        else:
            message.append("company name already exist ")
            print(message)
        return HttpResponse(message)


    else:
        return render(request, 'populate.html')






@csrf_exempt
def populate_warehouse(request):
    if log_view_access_attempt(request):
        return JsonResponse({"message": "Not authorised to access"})
    if request.method == 'POST':
        '''
        TOOOOOOOOOOOO DELETE BY ID------------------------------------------------
        
        warehouses_to_delete = Warehouse.objects.filter(id__in=[6])
        for warehouse in warehouses_to_delete:
            warehouse.delete()
            print(f"the warehouse id:'{warehouse.id}' has ideed been DELETED")
        
        TOOOOOOOOOOOO DELETE BY ID-------------------------------------------------
        '''
        message = []
        warehouse_name = "Bejaia"
        warehouse_type = "Factory"
        warehouse_longitude = "36.4811"
        warehouse_latitude = "4.5736"
        company_name = ("SOUMMAM") #CEVITAL or BELLAT or SOUMMAM or PFIZER
        if Company.objects.filter(name=company_name).exists():
            company_object = Company.objects.get(name=company_name)
            warehouse_list = Warehouse.objects.filter(company_id=company_object)
            if warehouse_list.exists():
                print("ALREADY EXISTING WAREHOUSES of '", company_name, "':")
                for warehouse in warehouse_list:
                    print(f"- Warehouse ID: {warehouse.id}  name:{warehouse.name}")
                    # Add more fields as needed
            else:
                print("No warehouses found for '", company_name)

            if not warehouse_list.filter(name=warehouse_name).exists():
                new_warehouse_row = Warehouse.objects.create(name=warehouse_name,type=warehouse_type,longitude=warehouse_longitude,latitude=warehouse_latitude,company_id=company_object)
                # Save changes to the Model1 instance
                new_warehouse_row.save()
                company_object.num_warehouses = company_object.num_warehouses + 1
                company_object.save()
                if Warehouse.objects.filter(name=warehouse_name,company_id=company_object).exists():
                    warehouse_confirm = Warehouse.objects.get(name=warehouse_name,company_id=company_object)
                    message.append(
                        f"_____indeed the warehouse maned:{warehouse_confirm.name} and id:{warehouse_confirm.id} for company:'{warehouse_confirm.company_id.name}' has been added")
                else:
                    message.append("couldn't find the warehouse u tried to add")
                print(message)

            else:
                message.append("warehouse name already exist in the company")
                print(message)
        else:
            print("The company '", company_name, "' does not exist")
        return HttpResponse(message)


    else:
        return render(request, 'populate.html')







@csrf_exempt
def populate_account(request):
    if log_view_access_attempt(request):
        return JsonResponse({"message": "Not authorised to access"})
    if request.method == 'POST':
        '''
        TOOOOOOOOOOOO DELETE BY ID------------------------------------------------

        accounts_to_delete = Account.objects.filter(id__in=[12])
        for account in accounts_to_delete:
            account.delete()

        TOOOOOOOOOOOO DELETE BY ID-------------------------------------------------
        '''
        message = []
        account_username = "cevital_admin_Bejaia_1" #name formula : company_role_warehouse_nbr
        account_email = "cevital_driver_Bejaia_1@gmail.com" #email_formula : company_role_warehouse_nbr@gmail.com
        account_password = "cevital_driver_Bejaia_1_password" #password_formula : company_role_warehouse_nbr_password
        account_role_name = "driver" #admin or observer or worker or driver
        company_name = ("CEVITAL")
        warehouse_name = "Bejaia"
        if Account.objects.exists():
            all_accounts = Account.objects.all()
            print("ALREADY EXISTING ACCOUNTS :")
            for account in all_accounts:
                print(f"- Account ID: '{account.user.id}'  username:'{account.user.username}'  role:'{account.role_id.name}'  warehouse:'{account.warehouse_id.name}'  company:{account.warehouse_id.company_id.name}")
            user_exists = User.objects.filter(username=account_username).exists()
            email_exists = User.objects.filter(email=account_email).exists()
            if user_exists :
                message.append(f"account username:{account_email} ALREADY exist")
            elif email_exists:
                message.append(f"account username:{user_exists} ALREADY exist")
            if user_exists or email_exists:
                print(message)
                return HttpResponse(message)

        if Role.objects.filter(name=account_role_name).exists():
            role_object = Role.objects.get(name=account_role_name)
            if Company.objects.filter(name=company_name).exists():
                company_object = Company.objects.get(name=company_name)
                warehouse_list = Warehouse.objects.filter(company_id=company_object)
                if warehouse_list.exists():
                    print("ALREADY EXISTING WAREHOUSES of '", company_name, "':")
                    for warehouse in warehouse_list:
                        print(f"- Warehouse ID: {warehouse.id}  name:{warehouse.name} -{warehouse.type}-")
                        # Add more fields as needed
                    if warehouse_list.filter(name=warehouse_name).exists():
                        warehouse_object = Warehouse.objects.get(name=warehouse_name,company_id=company_object)
                        user_object = User.objects.create_user(username=account_username, email=account_email, password=account_password)
                        new_account_row = Account.objects.create(user=user_object,warehouse_id=warehouse_object,role_id=role_object)
                        new_account_row.save()
                        confirm_user = User.objects.get(username=account_username, email=account_email)
                        confirm_account = Account.objects.get(user=confirm_user)
                        company_object.num_employees = company_object.num_employees + 1
                        message.append(f"indeed the account ID:'{confirm_account.user.id}'     named:'{confirm_account.user.username}     role:'{confirm_account.role_id.name}'     to warehouse:'{confirm_account.warehouse_id.name}'     HAS INDEED BEEN ADDED")
                        print(message)
                    else:
                        message.append(f"No warehouses with the name:  {warehouse_name}")
                        print(message)
                else:
                    message.append(f"No warehouses found for {company_name}")
                    print(message)

            else:
                message.append(f"The company '{company_name}' does not exist")
                print(message)
        else:
            message.append(f"there is no role called {account_role_name}")
            print(message)

        return HttpResponse(message)
    else:
        return render(request, 'populate.html')










@csrf_exempt
def populate_car(request):
    if log_view_access_attempt(request):
        return JsonResponse({"message": "Not authorised to access"})
    if request.method == 'POST':
        '''
        TOOOOOOOOOOOO DELETE BY ID------------------------------------------------

        cars_to_delete = Car.objects.filter(id__in=[12])
        for car in cars_to_delete:
            car.delete()

        TOOOOOOOOOOOO DELETE BY ID-------------------------------------------------
        '''
        message = []
        car_name = "cevital_truck_gris_3" #name formula : company_truck_color_nbr
        car_registration_number = "11111 111 15"
        company_name = ("CEVITAL")
        if Company.objects.filter(name=company_name).exists():
            company_object = Company.objects.get(name=company_name)
            if Car.objects.exists():
                all_cars = Car.objects.all()
                print("ALREADY EXISTING CARS :")
                for car in all_cars:
                    print(f"- Account ID: '{car.id}'  name:'{car.name}'  plate:'{car.registration_number}'  company:{car.company_id.name}")
                if Car.objects.filter(company_id=company_object).exists():
                    company_cars_list = Car.objects.filter(company_id=company_object)
                    name_exists = company_cars_list.filter(name=car_name).exists()
                    plate_exists = company_cars_list.filter(registration_number=car_registration_number).exists()
                    if name_exists:
                        message.append(f"car name:{car_name} ALREADY exist")
                    elif plate_exists:
                        message.append(f"car plate:{car_registration_number} ALREADY exist")
                    if name_exists or plate_exists:
                        print(message)
                        return HttpResponse(message)
            new_car_object = Car.objects.create(company_id=company_object, name=car_name, registration_number=car_registration_number)
            new_car_object.save()
            if Car.objects.filter(company_id=company_object, name=car_name, registration_number=car_registration_number).exists():
                confirm_car = Car.objects.get(company_id=company_object, name=car_name, registration_number=car_registration_number)
                message.append(f"indeed the truck ID:'{confirm_car.id}'     named:'{confirm_car.name}     registration_number:'{confirm_car.registration_number}'     to company:'{confirm_car.company_id.name}'     HAS INDEED BEEN ADDED")
            else:
                message.append(f"for some reason the car u just added wasn't found on DB ")
        else:
            message.append(f"The company '{company_name}' does not exist")
            print(message)

        return HttpResponse(message)
    else:
        return render(request, 'populate.html')










@csrf_exempt
def populate_product_type(request):
    if log_view_access_attempt(request):
        return JsonResponse({"message": "Not authorised to access"})
    if request.method == 'POST':
        '''
        TOOOOOOOOOOOO DELETE BY ID------------------------------------------------

        product_types_to_delete = Product_type.objects.filter(id__in=[12])
        for product_type in product_types_to_delete:
            product_type.delete()

        TOOOOOOOOOOOO DELETE BY ID-------------------------------------------------
        '''
        message = []
        product_type_name = "SKOR 1KG"
        product_type_description = "White refined sugar , stays in dry non-humid areas in recommended temprature 15-25° , last for 2 years  , HALAL , state supported"
        company_name = ("CEVITAL")
        if Company.objects.filter(name=company_name).exists():
            company_object = Company.objects.get(name=company_name)
            if Product_type.objects.exists():
                all_product_type = Product_type.objects.all()
                print("ALREADY EXISTING PRODUCT TYPES :")
                for product_type in all_product_type:
                    print(f"- Account ID: '{product_type.id}'  name:'{product_type.name}'  company:{product_type.company_id.name}  description:'{product_type.description}'")
                if Product_type.objects.filter(company_id=company_object).exists():
                    product_types_list = Product_type.objects.filter(company_id=company_object)
                    name_exists = product_types_list.filter(name=product_type_name).exists()
                    if name_exists:
                        print(message)
                        return HttpResponse(message)
            new_product_type_object = Product_type.objects.create(company_id=company_object, name=product_type_name, description=product_type_description)
            new_product_type_object.save()
            if Product_type.objects.filter(company_id=company_object, name=product_type_name, description=product_type_description).exists():
                confirm_product_type = Product_type.objects.get(company_id=company_object, name=product_type_name, description=product_type_description)
                message.append(f"indeed the Product_type ID:'{confirm_product_type.id}'     named:'{confirm_product_type.name}     to company:'{confirm_product_type.company_id.name}'     ///////////description:'{confirm_product_type.description}'//////////////     HAS INDEED BEEN ADDED")
            else:
                message.append(f"for some reason the Product_type u just added wasn't found on DB ")
        else:
            message.append(f"The company '{company_name}' does not exist")
            print(message)

        return HttpResponse(message)
    else:
        return render(request, 'populate.html')









@csrf_exempt
def populate_product(request):
    if log_view_access_attempt(request):
        return JsonResponse({"message": "Not authorised to access"})
    if request.method == 'POST':
        '''
        TOOOOOOOOOOOO DELETE BY ID------------------------------------------------
        products_to_delete = Product.objects.filter(id__in=[12])
        for product in products_to_delete:
            product.delete()

        TOOOOOOOOOOOO DELETE BY ID-------------------------------------------------
        '''
        message = []
        product_type_name = "SKOR 1KG"
        company_name = ("CEVITAL")
        warehouse_name = "Ouargla"
        product_quantity = 8000
        product_price_per_unite = 90
        product_quantity_warning_limit = 900
        if Company.objects.filter(name=company_name).exists():
            company_object = Company.objects.get(name=company_name)
            #printing allll products
            if Product.objects.exists():
                all_product = Product.objects.all()
                print("ALREADY EXISTING PRODUCT TYPES :")
                for product in all_product:
                    print(f"    - Account ID: '{product.id}'  name:'{product.product_type_id.name}'  warehouse:{product.warehouse_id.name}  company:{product.warehouse_id.company_id.name}  '")
            # printing allll products
            # if the warehouse exists and if it already got the product
            if Warehouse.objects.filter(company_id=company_object).exists():
                warehouse_list = Warehouse.objects.filter(company_id=company_object)
                if warehouse_list.filter(name=warehouse_name).exists():
                    warehouse_object = warehouse_list.get(name=warehouse_name)
                    if Product_type.objects.filter(company_id=company_object).exists():
                        product_type_list = Product_type.objects.filter(company_id=company_object)
                        if product_type_list.filter(name=product_type_name).exists():
                            product_type_object = Product_type.objects.get(name=product_type_name)
                            if Product.objects.filter(warehouse_id=warehouse_object).exists():
                                products_of_warehouse_list = Product.objects.filter(warehouse_id=warehouse_object)
                                if products_of_warehouse_list.filter(product_type_id=product_type_object).exists():
                                    already_product_object = Product.objects.get(warehouse_id=warehouse_object, product_type_id=product_type_object)
                                    message.append(f"warehouse:'{already_product_object.warehouse_id.name}' of company:'{already_product_object.warehouse_id.company_id.name}' already has the product :'{already_product_object.product_type_id.name}'")
                                    print(message)
                                    return HttpResponse(message)
                            new_product_object = Product.objects.create(product_type_id=product_type_object, warehouse_id=warehouse_object, quantity=product_quantity, price_per_unit=product_price_per_unite, quantity_warning_limit=product_quantity_warning_limit)
                            new_product_object.save()
                            if Product.objects.filter(product_type_id=product_type_object, warehouse_id=warehouse_object).exists():
                                confirm_product = Product.objects.get(product_type_id=product_type_object, warehouse_id=warehouse_object)
                                message.append(f"{confirm_product.warehouse_id.name}-{confirm_product.warehouse_id.company_id.name} added the product ided:'{confirm_product.id}'⏐name:'{confirm_product.product_type_id.name}'⏐quantity:'{confirm_product.quantity} unites'⏐price: {confirm_product.price_per_unit} DA")
                            else:
                                message.append("the product u added for some reason ain't here")
                        else:
                            message.append(f"product_type:'{product_type_name}' not found in company:{company_object.name}'s product_types ")
                    else:
                        message.append(f"{company_object.name} got 0 product-types")
                else:
                    message.append(f"the company:'{company_object.name}' has no warehouse named '{warehouse_name}'")
            else:
                message.append(f"the company:'{company_object.name}' has no warehouses at all'")
        else:
            message.append(f"there is no company named:'{company_name}'")
        return HttpResponse(message)
    else:
        return render(request, 'populate.html')









@csrf_exempt
def populate_shipment_json(request):
    if log_view_access_attempt(request):
        return JsonResponse({"message": "Not authorised to access"})
    if request.method == 'POST':
        ''' 
        TOOOOOOOOOOOO DELETE BY ID------------------------------------------------
        shipments_to_delete = Shippment.objects.filter(id__in=[10])
        for shipment_object in shipments_to_delete:
            shipment_product_mtm_to_delete_list = Shippment_Product_OnetoMany.objects.filter(shippment_id=shipment_object)
            for shipment_product in shipment_product_mtm_to_delete_list:
                shipment_product.delete()
            shipment.delete()
        TOOOOOOOOOOOO DELETE BY ID-------------------------------------------------
        '''
        message = []
        try:
            data = json.loads(request.body)
            # Extracting values from JSON and assigning them to variables
            company_name = data.get('company_name')
            car_name = data.get('car_name')
            driver_name = data.get('driver_name')
            departing_warehouse_name = data.get('departing_warehouse_name')
            arriving_warehouse_name = data.get('arriving_warehouse_name')
            departing_time = data.get('departing_time')
            arriving_time = data.get('arriving_time')
            product = data.get('product', [])

            # Process other data as needed
            print(f"Company Name: {company_name}")
            print(f"Car Name: {car_name}")
            print(f"Driver Name: {driver_name}")
            print(f"Departing Warehouse Name: {departing_warehouse_name}")
            print(f"Arriving Warehouse Name: {arriving_warehouse_name}")
            print(f"Departing Time: {departing_time}")
            print(f"Arriving Time: {arriving_time}")
            # Loop through product list if there are multiple products
            for item in product:
                product_name = item.get('name')
                product_quantity = item.get('quantity')
                # Process each product as needed, e.g., save to database
                print(f"Product Name: {product_name}, Quantity: {product_quantity}, variable type is: {type(product_name)} and {type(product_quantity)} ")
                product_quantity1 = int(product_quantity)
                print(f"ROUND TWO BABY Product Name: {product_name}, Quantity: {product_quantity1}, variable type is: {type(product_name)} and {type(product_quantity1)} ")

            if Company.objects.filter(name=company_name).exists():
                print("AAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
                company_object = Company.objects.get(name=company_name)
                print("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAbbbbbbbbbbbbbbbbbbbbbbbbbbb")
                if Shippment.objects.filter(company_id=company_object).exists():
                    print("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAccccccccccccccccccccccccccc")
                    shipments_list = Shippment.objects.filter(company_id=company_object)
                    print("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAdddddddddddddddddddddddddddddddddddddddd")
                    print("ALREADY EXISTANT SHIPMENTS ARE:")
                    for shipment in shipments_list :
                        print(f"-///////Shipment id:'{shipment.id}' , of company:'{shipment.company_id.name}' , from factory:'{shipment.departing_warehouse_id.name}' at:'{shipment.scheduled_departing_time}' , to warehouse:'{shipment.arriving_warehouse_id.name}' at:'{shipment.scheduled_arriving_time}' ,with driver:'{shipment.driver_id.user.username}' driving car:'{shipment.car_id.name}' , departed:'{shipment.is_departed}' / arrived:'{shipment.is_arrived}' / canceled:'{shipment.is_canceled}' //////")
                # Convert departing_time and arriving_time to datetime objects
                current_time=timezone.now().strftime("%Y-%m-%dT%H:%M")
                if arriving_time > departing_time:
                    if departing_time > current_time:
                        if arriving_time > current_time:
                            if Car.objects.filter(company_id=company_object, name=car_name).exists():
                                car_object = Car.objects.get(company_id=company_object, name=car_name)
                                if not Shippment.objects.filter(car_id=car_object, is_departed=True).exists():
                                    if Role.objects.filter(name="driver").exists():
                                        driver_role_object = Role.objects.get(name="driver")
                                        if User.objects.filter(username=driver_name).exists():
                                            user_object = User.objects.get(username=driver_name)
                                            if Account.objects.filter(warehouse_id__company_id=company_object, role_id=driver_role_object, user=user_object).exists():
                                                driver_object = Account.objects.get(warehouse_id__company_id=company_object, role_id=driver_role_object, user=user_object)
                                                if not Shippment.objects.filter(driver_id=driver_object, is_departed=True).exists():
                                                    product_types_not_in_company = []
                                                    all_product_types_present = True
                                                    for item in product:
                                                        product_name = item.get('name')
                                                        if not Product_type.objects.filter(company_id=company_object, name=product_name).exists():
                                                            product_types_not_in_company.append(product_name)
                                                            all_product_types_present = False
                                                    if all_product_types_present:
                                                        if Warehouse.objects.filter(company_id=company_object, name=departing_warehouse_name).exists():
                                                            departing_warehouse_object = Warehouse.objects.get(company_id=company_object, name=departing_warehouse_name)
                                                            if Warehouse.objects.filter(company_id=company_object, name=arriving_warehouse_name).exists():
                                                                arriving_warehouse_object = Warehouse.objects.get(company_id=company_object, name=arriving_warehouse_name)
                                                                if departing_warehouse_object.type == "Factory":
                                                                    print(f"11111111111111111111111111111111111111111111111111")
                                                                    if Product.objects.filter(warehouse_id=departing_warehouse_object).exists():
                                                                        print("222222222222222222222222222222222222222222222222222")
                                                                        filtered_products_of_departing_warehouse = Product.objects.filter(warehouse_id=departing_warehouse_object)
                                                                        list_of_factory_products = list(filtered_products_of_departing_warehouse)
                                                                        product_types_not_in_factory = []
                                                                        products_not_enough_quantity_in_factory = []
                                                                        all_product_types_present_in_factory = True
                                                                        all_product_have_enought_quantity_in_factory = True
                                                                        for item in product:
                                                                            this_item_is_present_in_factory = False
                                                                            this_item_quantity_enough_for_shipment_in_factory = False
                                                                            product_name = item.get('name')
                                                                            product_quantity = item.get('quantity')
                                                                            for factory_product in list_of_factory_products:
                                                                                if factory_product.product_type_id.name == product_name:
                                                                                    this_item_is_present_in_factory = True
                                                                                    if factory_product.quantity > int(product_quantity):
                                                                                        this_item_quantity_enough_for_shipment_in_factory = True
                                                                            if not this_item_is_present_in_factory:
                                                                                product_types_not_in_factory.append(product_name)
                                                                                all_product_types_present_in_factory = False
                                                                            if not this_item_quantity_enough_for_shipment_in_factory:
                                                                                products_not_enough_quantity_in_factory.append(product_name)
                                                                                all_product_have_enought_quantity_in_factory = False
                                                                        if all_product_types_present_in_factory:
                                                                            if all_product_have_enought_quantity_in_factory:
                                                                                # making the new shipment
                                                                                departing_time_input = timezone.make_aware(datetime.strptime(departing_time, "%Y-%m-%dT%H:%M"))
                                                                                arriving_time_input = timezone.make_aware(
                                                                                    datetime.strptime(arriving_time, "%Y-%m-%dT%H:%M"))
                                                                                print(f"------------------ andromeda   {departing_time_input} and {arriving_time_input}")
                                                                                new_shipment_object = Shippment.objects.create(company_id=company_object, car_id=car_object, driver_id=driver_object, departing_warehouse_id=departing_warehouse_object, arriving_warehouse_id=arriving_warehouse_object, scheduled_departing_time=departing_time_input, scheduled_arriving_time=arriving_time_input, is_departed=True)
                                                                                print("3333333333333333333333333333333333333333333333")
                                                                                new_shipment_object.save()
                                                                                print("4444444444444444444444444444444444444444444444")
                                                                                if Shippment.objects.filter(company_id=company_object, car_id=car_object, driver_id=driver_object, departing_warehouse_id=departing_warehouse_object, arriving_warehouse_id=arriving_warehouse_object, scheduled_departing_time=departing_time_input, scheduled_arriving_time=arriving_time_input, is_departed=True).exists():
                                                                                    print("55555555555555555555555555555555555555555555555555555555")
                                                                                    confirm_shipment = Shippment.objects.get(company_id=company_object, car_id=car_object, driver_id=driver_object, departing_warehouse_id=departing_warehouse_object, arriving_warehouse_id=arriving_warehouse_object, scheduled_departing_time=departing_time_input, scheduled_arriving_time=arriving_time_input, is_departed=True)
                                                                                    print("666666666666666666666666666666666666666666666666666666")
                                                                                    all_products_created = True
                                                                                    products_created_for_shipment = []
                                                                                    for item in product:
                                                                                        product_name = item.get('name')
                                                                                        product_quantity = item.get('quantity')
                                                                                        print("BBBBBB")
                                                                                        product_type_object = Product_type.objects.get(company_id=company_object, name=product_name)
                                                                                        new_product_object = Product.objects.create(product_type_id=product_type_object, quantity=int(product_quantity), is_shipment=True)
                                                                                        print("CCCCCCC")
                                                                                        new_product_object.save()
                                                                                        print("DDDDDDDD")
                                                                                        if Product.objects.filter(product_type_id=product_type_object, quantity=int(product_quantity), is_shipment=True).exists():
                                                                                            print("DDDDDDDD 1111111")
                                                                                            print("DDDDDDDD 22222222")
                                                                                            product_object = Product.objects.get(product_type_id=product_type_object, warehouse_id=departing_warehouse_object)
                                                                                            print("DDDDDDDD 333333333")
                                                                                            product_object.quantity = product_object.quantity - int(product_quantity)
                                                                                            print("DDDDDDDD 444444444")
                                                                                            product_object.save()
                                                                                            print("EEEEEEEEEEEEEEEE")
                                                                                            products_created_for_shipment.append(product_object)
                                                                                        else:
                                                                                            all_products_created = False
                                                                                    if all_products_created:
                                                                                        all_products_got_linked_to_shipment = True
                                                                                        product_shipment_linkes = []
                                                                                        print("FFFFFFFFFFFFFFFFFFFFFFFFF")
                                                                                        for prod in products_created_for_shipment:
                                                                                            print("GGGGGGGGGGGGGGGGGGGGGGGGGGG")
                                                                                            new_shipment_product_MtM = Shippment_Product_OnetoMany.objects.create(shippment_id=confirm_shipment, product_id=prod)
                                                                                            new_shipment_product_MtM.save()
                                                                                            print("HHHHHHHHHHHHH")
                                                                                            if Shippment_Product_OnetoMany.objects.filter(shippment_id=confirm_shipment, product_id=prod).exists():
                                                                                                confire_shipment_product = Shippment_Product_OnetoMany.objects.get(shippment_id=confirm_shipment, product_id=prod)
                                                                                                print("IIIIIIIIIIIIIIII")
                                                                                                product_shipment_linkes.append(confire_shipment_product)
                                                                                            else:
                                                                                                all_products_got_linked_to_shipment = False
                                                                                        if all_products_got_linked_to_shipment:
                                                                                            print("KKKKKKKKKKKKKKKKKKKKK")
                                                                                            message.append(f"indeed the company:'{company_object.name}' has new shipment from f:'{departing_warehouse_object.name}' to w:'{arriving_warehouse_object.name} holding these :")
                                                                                            print("LLLLLLLLLLLLLLLLLLLLLL")
                                                                                            for ship_prod in product_shipment_linkes:
                                                                                                print("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM")
                                                                                                message.append(f"{ship_prod.product_id.product_type_id.name} with {ship_prod.product_id.quantity}")
                                                                                                print("NNNNNNNNNNNNNNNNNNNNNNNNNNNNN")
                                                                                                # add isntructions to see if driver and car are in other shipments
                                                                                                # add to see if shipment already exist
                                                                                    else:
                                                                                        message.append(f"error : one of the prodcuts created for shipment ain't found")
                                                                                else:
                                                                                    message.append(f"error : for some reason we can't find the shipment u just made")
                                                                            else:
                                                                                message.append(f"error : factory:'{departing_warehouse_object.name}' doesn't have enough quantity for products {product_types_not_in_factory}")
                                                                        else:
                                                                            message.append(f"error : factory:'{departing_warehouse_object.name}' doesn't have these products {product_types_not_in_factory}")
                                                                    else:
                                                                        message.append(f"error : Factory:'{departing_warehouse_object.name}' doesn't have any products")
                                                                else:
                                                                    message.append(f"error : departing warehouse:'{departing_warehouse_object.name}' isn't a facroty")
                                                            else:
                                                                message.append(f"error : arriving warehouse:'{arriving_warehouse_name}' doesn't exist in company:'{company_object.name}'")
                                                        else:
                                                            message.append(f"error : departing warehouse:'{departing_warehouse_name}' doesn't exist in company:'{company_object.name}'")
                                                    else:
                                                        message.append(f"error the company:'{company_object.name}' doesn't have these products {product_types_not_in_company} (check for typos)")
                                                else:
                                                    message.append(f"this driver isn't available , it's already in shipment.")
                                            else:
                                                message.append(f"error : no driver named :'{user_object.username}' was found for company:'{company_object.name}'")
                                        else:
                                            message.append(f"error : this username:'{driver_name}' doesn't exist")
                                    else:
                                        message.append(f"error : for some reason the role driver ain't found")
                                else:
                                    message.append(f"this car isn't available , it's already in shipment.")
                            else:
                                message.append(f"error : the car:'{car_name}' doesn't exist in company:'{company_object.name}'")
                        else:
                            message.append("error : arriving time is in the past")
                    else:
                        message.append("error : departing time is in the past")
                else:
                    message.append("error : arriving time is before departing time (wrong order)")
            else:
                message.append(f"there is no company named:'{company_name}'")
            print(message)

            # Return response
            return JsonResponse({'message': 'JSON received successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=400)










@csrf_exempt
def get_company_info_card(request):
    if log_view_access_attempt(request):
        return JsonResponse({"message": "Not authorised to access"})
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            # Extracting values from JSON and assigning them to variables
            email = data.get('email')
            password = data.get('password')
            # Process other data as needed
            print(f"user:'{email}' has issues a POST request for company info card")
            print(f"info: email:'{email}'  password:'{password}'")
            returned_company_name = ""
            message = ""
            status_code = 0
            is_account_exist = check_account_exist(email, password)
            if is_account_exist:
                user_object = User.objects.get(email=email)
                account_object = Account.objects.get(user=user_object)
                is_account_correct_role = check_account_role(account_object , "admin")
                if is_account_correct_role:
                    company_of_account = account_object.warehouse_id.company_id
                    returned_company_name = company_of_account.name
                    status_code = 200
                else:
                    returned_company_name = "no permission to access"
                    message = "account isn't admin "
                    status_code = 403
            else:
                returned_company_name = "no permission to access"
                message = "account doesn't exist "
                status_code = 403

            response_data = {
                'company_name': returned_company_name,
                'message': message,
            }
            
            # Return response
            return JsonResponse(response_data, status=status_code)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=400)








@csrf_exempt
def receive_json(request):
    if log_view_access_attempt(request):
        return JsonResponse({"message": "Not authorised to access"})
    if request.method == 'POST':
        received_data = json.loads(request.body.decode('utf-8'))
        message = received_data.get('message', '')
        status = received_data.get('status', '')
        # Handle received data here, for example:
        for i in range(100):
            print(received_data)
            # Handle received data here, for example:
            print("Received message:", message)
            print("Received status:", status)
        return JsonResponse({'status': 'success'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed'})











@csrf_exempt
def get_all_model_fields(request):
    if log_view_access_attempt(request):
        return JsonResponse({"message": "Not authorised to access"})
    if request.method == 'POST':
        """
            Function to get information about all available models and their fields.
            Returns a dictionary where keys are model names and values are lists of field names.
            """
        models_fields = {}
        all_models = apps.get_models()
        for model in all_models:
            model_fields = [field.name for field in model._meta.get_fields()]
            models_fields[model.__name__] = model_fields
            for model_name, fields in models_fields.items():
                print("--------------------------------------------------------------")
                print(f"Model: {model_name}")
                print("Fields:")
                for field_name in fields:
                    print(f"- {field_name}")
                print("--------------------------------------------------------------")
        return JsonResponse(models_fields)

    else:
        return render(request, 'populate.html')


@csrf_exempt
def get_all_of_my_model_fields(request):
    if log_view_access_attempt(request):
        return JsonResponse({"message": "Not authorised to access"})
    if request.method == 'POST':
        """
            Function to get information about all available models and their fields.
            Returns a dictionary where keys are model names and values are lists of field names.
            """
        models_fields = {}
        all_models = apps.get_models()
        target_model_names = ["Company", "Permission", "Role", "Warehouse", "Account", "Car", "Product_type", "Product"]

        for model in all_models:
            if model.__name__ in target_model_names:
                model_fields = [field.name for field in model._meta.fields if not field.is_relation]
                models_fields[model.__name__] = model_fields
                objects = model.objects.all()
                # Exclude objects not from the current app
                objects = [obj for obj in objects if obj._meta.app_label == model._meta.app_label]
                for obj in objects:
                    print("--------------------------------------------------------------")
                    print(f"Model: {model.__name__}")
                    print("Object:")
                    for field_name in model_fields:
                        field_value = getattr(obj, field_name)
                        print(f"- {field_name}: {field_value}")
                    print("--------------------------------------------------------------")

        return JsonResponse(models_fields)

    else:
        return render(request, 'populate.html')



@csrf_exempt
def get_all_of_my_model_fields2(request):
    if log_view_access_attempt(request):
        return JsonResponse({"message": "Not authorised to access"})
    if request.method == 'POST':
        """
            Function to get information about all available models and their fields.
            Returns a dictionary where keys are model names and values are lists of field names.
            """
        models_fields = {}
        app_label = "API_DATABASE_REQUESTS"  # Replace "your_app_name" with the name of your Django app

        # Iterate over all models in the app
        for model in apps.get_app_config(app_label).get_models():
            model_name = model.__name__
            model_fields = [field.name for field in model._meta.fields if not field.is_relation]
            models_fields[model_name] = model_fields
            objects = model.objects.all()
            # Filter objects to belong only to the current app
            objects = [obj for obj in objects if obj._meta.app_label == app_label]
            for obj in objects:
                print("--------------------------------------------------------------")
                print(f"Model: {model_name}")
                print("Object:")
                for field_name in model_fields:
                    field_value = getattr(obj, field_name)
                    print(f"- {field_name}: {field_value}")
                print("--------------------------------------------------------------")
            print("\n\n\n\n\n\n\n")

        # Output a list of all models found in the app (for debugging)
        print("Models in the app:")
        for model_name in models_fields:
            print(f"-{model_name}(Model)")

        return JsonResponse(models_fields)

    else:
        return render(request, 'populate.html')







@csrf_exempt
def link(request):#ooooooooooooooy select foreign key inside the code
    if log_view_access_attempt(request):
        return JsonResponse({"message": "Not authorised to access"})
    if request.method == 'POST':
        # Hardcoded model names
        model1_name = "Permission"
        model2_name = "Account"

        # Call link_models function with model names
        result = link_models(model1_name, model2_name)

        # Return the result
        return HttpResponse(result)


def link_models(model1_name, model2_name):
    """
    Function to dynamically establish a one-to-many relationship between two models by manually selecting rows.
    Arguments:
    - model1_name: Name of the first model
    - model2_name: Name of the second model
    """
    # Get the models from the imported module
    model1 = globals()[model1_name]
    model2 = globals()[model2_name]

    # Check if both models exist
    if model1 is not None and model2 is not None:
        # Display available rows for model1
        available_rows1 = model1.objects.all()
        print(f"Available rows for {model1_name}:")
        for row in available_rows1:
            print(f"ID: {row.id} - {row}")

        # Prompt user to select a row from model1
        row_id1 = int(input(f"Choose the ID of the row from {model1_name}: "))

        # Check if the specified row exists in model1
        selected_row1 = model1.objects.filter(id=row_id1).first()
        if selected_row1 is not None:
            # Display available rows for model2
            available_rows2 = model2.objects.all()
            print(f"Available rows for {model2_name}:")
            for row in available_rows2:
                print(f"ID: {row.id} - {row}")

            # Prompt user to select a row from model2
            row_id2 = int(input(f"Choose the ID of the row from {model2_name}: "))

            # Check if the specified row exists in model2
            selected_row2 = model2.objects.filter(id=row_id2).first()
            if selected_row2 is not None:
                # Set the foreign key relationship
                selected_row1.foreign_key_selectuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu = selected_row2
                selected_row1.save()
                return "Models linked successfully!"
            else:
                return f"The specified row with ID {row_id2} does not exist in {model2_name}."
        else:
            return f"The specified row with ID {row_id1} does not exist in {model1_name}."
    else:
        return "One or both of the specified models do not exist."


@csrf_exempt
def login(request):
    if request.method == 'POST':
        success = False
        message = ""
        try:
            data = json.loads(request.body)
            # Extracting values from JSON and assigning them to variables
            email = data.get('email')
            password = data.get('password')
            # Process other data as needed
            print(f"user:'{email}' has issues a POST request for login")
            print(f"info: email:'{email}'  password:'{password}'")
            account_id = 0
            account_username = ""
            account_email = ""
            account_role = ""
            account_company = ""
            account_warehouse = ""
            is_account_exist = check_account_exist(email, password)
            if is_account_exist:
                user_object = User.objects.get(email=email)
                account_object = Account.objects.get(user=user_object)
                account_id = account_object.user.id
                account_username = account_object.user.username
                account_email = account_object.user.email
                account_role = account_object.role_id.name
                account_warehouse = account_object.warehouse_id.name
                account_company = account_object.warehouse_id.company_id.name
                message = "successful login"
                success = True
            else:
                message = "account doesn't exist "

            user = {
                'id' : account_id,
                'username' : account_username,
                'email' : account_email,
                'company' : account_company,
                'warehouse' : account_warehouse,
                'role' : account_role
            }
            data = {
                'user' : user
            }

            # Return response
            return JsonResponse({
                'success': success,
                'message': message,
                'data': data
            })
        except Exception as e:
            return JsonResponse({
                'success': success,
                'message' : str(e)
            })
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=400)



@csrf_exempt
def registeration(request):
    if request.method == 'POST':
        success = False
        message = ""
        try:

            data = json.loads(request.body)
            # Extracting values from JSON and assigning them to variables
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')
            company_name = data.get('company_name')
            # Process other data as needed
            print(f"user:'{email}' has issues a POST request for registration")
            print(f"info: username:'{username}'  email:'{email}'  password:'{password}'  company_name:'{company_name}'")
            account_id = 0
            account_username = ""
            account_email = ""
            account_role = ""
            account_company = ""
            account_warehouse = ""
            is_account_exist = check_account_exist(email, password)
            if is_account_exist:
                message = "account email already exists"
            else:
                is_company_exist = check_company_exist(company_name)
                if is_company_exist:
                    message = "company name already exists"
                else:
                    new_company_object = Company.objects.create(name=company_name)
                    new_company_object.save()
                    if Company.objects.filter(name=company_name).exists():
                        confirm_company = Company.objects.get(name=company_name)
                        main_warehouse = Warehouse.objects.create(company_id=confirm_company, type="factory", name="main warehouse")
                        main_warehouse.save()
                        if Warehouse.objects.filter(company_id=confirm_company, type="factory", name="main warehouse").exists():
                            confirm_warehouse = Warehouse.objects.get(company_id=confirm_company, type="factory", name="main warehouse")
                            if Role.objects.filter(name="admin").exists():
                                role_object = Role.objects.get(name="admin")
                                user_object = User.objects.create_user(username=username, email=email, password=password)
                                user_object.save()
                                new_account_row = Account.objects.create(user=user_object, warehouse_id=confirm_warehouse,role_id=role_object)
                                new_account_row.save()
                                confirm_user = User.objects.get(username=username, email=email)
                                confirm_account = Account.objects.get(user=confirm_user)
                                confirm_company.num_employees = confirm_company.num_employees + 1
                                account_id = confirm_account.user.id
                                account_username = confirm_account.user.username
                                account_email = confirm_account.user.email
                                account_role = confirm_account.role_id.name
                                account_warehouse = confirm_account.warehouse_id.name
                                account_company = confirm_account.warehouse_id.company_id.name
                                message = "successful registration of company and admin"
                                success = True
                            else:
                                message = "admin role not found"
                        else:
                            message = "something went wrong in factory creation"
                    else:
                        message = "something went wrong in company creation"




            user = {
                'id' : account_id,
                'username' : account_username,
                'email' : account_email,
                'company' : account_company,
                'warehouse' : account_warehouse,
                'role' : account_role
            }
            data = {
                'user' : user
            }

            # Return response
            return JsonResponse({
                'success': success,
                'message': message,
                'data': data
            })
        except Exception as e:
            return JsonResponse({
                'success': success,
                'message' : str(e)
            })
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=400)