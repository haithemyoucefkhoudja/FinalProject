import json
from channels.generic.websocket import AsyncWebsocketConsumer


class LocationConsumer(AsyncWebsocketConsumer):
    drivers = {}  # In-memory store for driver information

    async def connect(self):
        await self.accept()
        self.user_role = None
        self.company = None
        self.warehouse = None
        self.user_id = None
        self.group_name = None

    async def disconnect(self, close_code):
        if self.group_name:
            await self.channel_layer.group_discard(
                self.group_name,
                self.channel_name
            )

    async def receive(self, text_data):
        data = json.loads(text_data)

        if data.get('type') == 'identify':
            user = data.get('user')
            self.user_role = user.get('role')
            self.company = user.get('company')
            self.warehouse = user.get('warehouse')
            self.user_id = user.get('id')

            self.group_name = self.determine_group_name()

            # Add user to the appropriate group
            if self.group_name:
                await self.channel_layer.group_add(
                    self.group_name,
                    self.channel_name
                )

            # Send allowed information to the user
            await self.send_allowed_information()

        elif data.get('type') == 'update_location':
            driver_id = data.get('driver_id')
            location_update = {
                'latitude': data['latitude'],
                'longitude': data['longitude']
            }

            # Fetch existing driver data
            driver_data = LocationConsumer.drivers.get(driver_id, {})
            company = driver_data.get('company', data['company'])
            warehouse = driver_data.get('warehouse', data['warehouse'])

            # Update the location data
            driver_data['location'] = location_update
            driver_data['company'] = company
            driver_data['warehouse'] = warehouse

            # Update the products if provided
            if 'products' in data:
                driver_data['products'] = data['products']

            # Store the updated data back
            LocationConsumer.drivers[driver_id] = driver_data

            # Notify relevant groups about the location update
            await self.notify_groups(driver_id, location_update)

    async def notify_groups(self, driver_id, location_update):
        driver_info = LocationConsumer.drivers[driver_id]
        company_group = f"company_{driver_info['company']}_drivers"
        warehouse_group = f"warehouse_{driver_info['company']}_{driver_info['warehouse']}_drivers"

        # Notify company group
        await self.channel_layer.group_send(
            company_group,
            {
                "type": "location_update",
                "driver_id": driver_id,
                "location": location_update
            }
        )

        # Notify warehouse group
        await self.channel_layer.group_send(
            warehouse_group,
            {
                "type": "location_update",
                "driver_id": driver_id,
                "location": location_update
            }
        )

    async def location_update(self, event):
        # Send the location update to WebSocket
        await self.send(text_data=json.dumps({
            'type': 'location_update',
            'driver_id': event['driver_id'],
            'location': event['location'],
        }))

    def determine_group_name(self):
        if self.user_role == 'driver':
            return f"driver_{self.user_id}"
        elif self.user_role in ['admin', 'observer']:
            return f"company_{self.company}_drivers"
        elif self.user_role == 'worker':
            return f"warehouse_{self.company}_{self.warehouse}_drivers"
        else:
            return None

    async def send_allowed_information(self):
        allowed_information = self.get_allowed_information()

        # Send the allowed information to WebSocket
        await self.send(text_data=json.dumps({
            'type': 'allowed_information',
            'data': allowed_information,
        }))

    def get_allowed_information(self):
        # Define allowed information based on user role
        if self.user_role == 'driver':
            return self.fetch_driver_information()
        elif self.user_role in ['admin', 'observer']:
            return self.fetch_company_drivers_information()
        elif self.user_role == 'worker':
            return self.fetch_warehouse_drivers_information()
        else:
            return {}

    def fetch_driver_information(self):
        # Fetch the driver's location and products from the in-memory store
        if self.user_id in LocationConsumer.drivers:
            driver_info = LocationConsumer.drivers[self.user_id]
            return {
                'location': driver_info['location'],
                'products': driver_info.get('products', [])
            }
        return {'location': None, 'products': []}

    def fetch_company_drivers_information(self):
        # Fetch the locations and products of all drivers in the same company
        company_drivers = [
            {
                'driver_id': driver_id,
                'location': info['location'],
                'products': info.get('products', [])
            }
            for driver_id, info in LocationConsumer.drivers.items()
            if info['company'] == self.company
        ]
        return company_drivers

    def fetch_warehouse_drivers_information(self):
        # Fetch the locations and products of all drivers in the same warehouse
        warehouse_drivers = [
            {
                'driver_id': driver_id,
                'location': info['location'],
                'products': info.get('products', [])
            }
            for driver_id, info in LocationConsumer.drivers.items()
            if info['company'] == self.company and info['warehouse'] == self.warehouse
        ]
        return warehouse_drivers

import json
import aiohttp
from channels.generic.websocket import AsyncWebsocketConsumer

# consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
import aiohttp

from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
import json
import aiohttp

from channels.generic.websocket import AsyncWebsocketConsumer
import json
import aiohttp
from channels.layers import get_channel_layer

from channels.generic.websocket import AsyncWebsocketConsumer
import json
import aiohttp
from channels.layers import get_channel_layer

from channels.generic.websocket import AsyncWebsocketConsumer
import json
import aiohttp
from channels.layers import get_channel_layer

from channels.generic.websocket import AsyncWebsocketConsumer
import json
import aiohttp

class three_consumer(AsyncWebsocketConsumer):
    async def connect(self, recieved_data):
        await self.accept()
        data = json.loads(recieved_data)
        self.role = data.get('role')
        self.company = data.get('company')
        self.warehouse = data.get('warehouse')
        self.user_id = data.get('user_id')
        self.group_name = self.three_consumer_get_group_name()
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.get_innitial_data_to_connecting_consumer()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        pass

    async def get_innitial_data_to_connecting_consumer(self):
        data_to_send_to_view = {
            'company': self.company,
            'warehouse': self.warehouse,
            'role': self.role
            # Add more key-value pairs as needed
        }
        async with aiohttp.ClientSession() as session:
            async with session.get('http://localhost:8000/get_json_for_consumer', data_to_send_to_view) as response:
                data = await response.json()
                print("yoooooooo ",data)  # To check the data being fetched
                await self.channel_layer.group_send(
                    self.group_name,
                    {
                        'type': 'update_numbers',
                        'numbers': data,
                    }
                )

    async def updating_the_channel_when_api_is_called(self, channel_name):
        async with aiohttp.ClientSession() as session:
            async with session.get('http://localhost:8000/get_json_for_consumer') as response:
                data = await response.json()
                print("yoooooooo ", data)  # To check the data being fetched
                await self.channel_layer.group_send(
                    self.group_name,
                    {
                        'type': 'update_numbers',
                        'numbers': data,
                    }
                )

    async def update_numbers(self, event):
        numbers = event['numbers']
        await self.send(text_data=json.dumps({'numbers': numbers}))




    def three_consumer_get_group_name(self):
        can_see = ""
        can_see = "all" if self.role in  ['admin', 'observer'] else None
        can_see = "driver" if self.role == 'driver' else None
        can_see = "worker" if self.role == 'worker' else None
        return f"{self.company}_{self.warehouse}"