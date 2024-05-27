import { getServerSession } from "@/app/utils/getServerSession";
import { WrapperComponent } from "@/components/Management/WrapperComponent";
import { Data, WarehouseType } from "@/types/Data";

const WareData: Data = {
    "company": {
      "name": "CEVITAL",
      "longitude": "",
      "latitude": "",
      "products": [
        {
          "id": 1,
          "name": "ELIO 5L",
          "quantity": 6907,
          "mid_price": 612.5,
          "description": "Vegetable cooking oil , stays in dry non-humid areas in recommended temprature 15-25° , last for 7 months  , without cholesterol , HALAL",
          "safety_level": 1000,
          "color": "green"
        },
        {
          "id": 5,
          "name": "SKOR 1KG",
          "quantity": 47900,
          "mid_price": 90,
          "description": "White refined sugar , stays in dry non-humid areas in recommended temprature 15-25° , last for 2 years  , HALAL , state supported",
          "safety_level": 5000,
          "color": "green"
        }
      ]
    },
    "factories": [
      {
        "id": 1,
        "name": "Bejaia",
        "longitude":  5.0754,
        "latitude": 36.7416,
        "products": [
          {
            "id": 1,
            "name": "ELIO 5L",
            "quantity": 6907,
            "price": 612.5,
            "description": "Vegetable cooking oil , stays in dry non-humid areas in recommended temprature 15-25° , last for 7 months  , without cholesterol , HALAL",
            "safety_level": 1000,
            "color": "green"
          },
          {
            "id": 5,
            "name": "SKOR 1KG",
            "quantity": 47900,
            "price": 90,
            "description": "White refined sugar , stays in dry non-humid areas in recommended temprature 15-25° , last for 2 years  , HALAL , state supported",
            "safety_level": 5000,
            "color": "green"
          }
        ]
      }
    ],
    "warehouses": [
      {
        "id": 2,
        "name": "Oum El Bouaghi",
        "longitude":  7.1505,
        "latitude":  35.8819,
        "shipments":[],
        "products": [
          {
            "id": 2,
            "name": "ELIO 5L",
            "quantity": 1000,
            "price": 600,
            "description": "Vegetable cooking oil , stays in dry non-humid areas in recommended temprature 15-25° , last for 7 months  , without cholesterol , HALAL",
            "safety_level": 200,
            "color": "green"
          },
          {
            "id": 6,
            "name": "SKOR 1KG",
            "quantity": 9000,
            "price": 90,
            "description": "White refined sugar , stays in dry non-humid areas in recommended temprature 15-25° , last for 2 years  , HALAL , state supported",
            "safety_level": 1000,
            "color": "green"
          }
        ]
      },
      {
        "id": 3,
        "name": "Mostaganem",
        "longitude": 0.1467,
        "latitude": 35.9158,
        "shipments":[],
        "products": [
          {
            "id": 3,
            "name": "ELIO 5L",
            "quantity": 1500,
            "price": 600,
            "description": "Vegetable cooking oil , stays in dry non-humid areas in recommended temprature 15-25° , last for 7 months  , without cholesterol , HALAL",
            "safety_level": 300,
            "color": "green"
          },
          {
            "id": 7,
            "name": "SKOR 1KG",
            "quantity": 11000,
            "price": 90,
            "description": "White refined sugar , stays in dry non-humid areas in recommended temprature 15-25° , last for 2 years  , HALAL , state supported",
            "safety_level": 1000,
            "color": "green"
          }
        ]
      },
      {
        "id": 4,
        "name": "Ouargla",
        "longitude": 5.3345,
        "latitude":  31.9526,
        "shipments":[],
        "products": [
          {
            "id": 4,
            "name": "ELIO 5L",
            "quantity": 1000,
            "price": 600,
            "description": "Vegetable cooking oil , stays in dry non-humid areas in recommended temprature 15-25° , last for 7 months  , without cholesterol , HALAL",
            "safety_level": 150,
            "color": "green"
          },
          {
            "id": 8,
            "name": "SKOR 1KG",
            "quantity": 8000,
            "price": 90,
            "description": "White refined sugar , stays in dry non-humid areas in recommended temprature 15-25° , last for 2 years  , HALAL , state supported",
            "safety_level": 900,
            "color": "green"
          }
        ]
      }
      
    ]
  }
export default async function Page() {
    const session =await getServerSession()
    if(!session)
        return <></>
    const factoriesWithType = WareData.factories.map(factory => ({
        ...factory,
        type: 'Factory' as WarehouseType,
      }));
      
      const warehousesWithType = WareData.warehouses.map(warehouse => ({
        ...warehouse,
        type: 'Warehouse' as WarehouseType,
      }));
      
      const MixedData = [...factoriesWithType, ...warehousesWithType];
	return(
		<div className="flex flex-col  items-center rounded-lg border border-gray-500 bg-white text-gray-950 shadow-sm ">
	      	<WrapperComponent WareList={MixedData} session={session}/>
		</div>
	)
}