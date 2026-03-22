require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const District = require("../models/district");

// ✅ STEP 1: DATA FIRST
const districtData = [


   {
district:"Ahmednagar",
crops:[
{name:"Wheat",prices:{2022:2200,2023:2350,2024:2550,2025:2750}},
{name:"Soybean",prices:{2022:4600,2023:4850,2024:5150,2025:5500}},
{name:"Bajra",prices:{2022:1900,2023:2050,2024:2250,2025:2450}}
],
vegetables:[
{name:"Onion",prices:{2022:3500,2023:3900,2024:4300,2025:4800}},
{name:"Tomato",prices:{2022:4200,2023:4600,2024:5000,2025:5600}},
{name:"Cabbage",prices:{2022:3000,2023:3300,2024:3600,2025:4000}}
],
fruits:[
{name:"Pomegranate",prices:{2022:8800,2023:9400,2024:10000,2025:10800}},
{name:"Banana",prices:{2022:6300,2023:6700,2024:7100,2025:7600}},
{name:"Mango",prices:{2022:9000,2023:9600,2024:10300,2025:11200}}
]
},

{
district:"Akola",
crops:[
{name:"Cotton",prices:{2022:4800,2023:5100,2024:5400,2025:5800}},
{name:"Tur",prices:{2022:6200,2023:6600,2024:7000,2025:7500}},
{name:"Soybean",prices:{2022:4500,2023:4800,2024:5100,2025:5400}}
],
vegetables:[
{name:"Onion",prices:{2022:3400,2023:3800,2024:4200,2025:4700}},
{name:"Brinjal",prices:{2022:3700,2023:4000,2024:4400,2025:4800}},
{name:"Tomato",prices:{2022:4100,2023:4500,2024:4900,2025:5500}}
],
fruits:[
{name:"Mango",prices:{2022:8800,2023:9400,2024:10000,2025:10800}},
{name:"Banana",prices:{2022:6200,2023:6600,2024:7000,2025:7500}},
{name:"Guava",prices:{2022:5000,2023:5400,2024:5800,2025:6300}}
]
},

{
district:"Amravati",
crops:[
{name:"Cotton",prices:{2022:4700,2023:5000,2024:5300,2025:5700}},
{name:"Soybean",prices:{2022:4600,2023:4900,2024:5200,2025:5600}},
{name:"Tur",prices:{2022:6100,2023:6500,2024:6900,2025:7400}}
],
vegetables:[
{name:"Onion",prices:{2022:3500,2023:3900,2024:4300,2025:4800}},
{name:"Tomato",prices:{2022:4200,2023:4600,2024:5000,2025:5600}},
{name:"Spinach",prices:{2022:2800,2023:3100,2024:3400,2025:3800}}
],
fruits:[
{name:"Orange",prices:{2022:7000,2023:7600,2024:8200,2025:9000}},
{name:"Banana",prices:{2022:6300,2023:6700,2024:7100,2025:7600}},
{name:"Mango",prices:{2022:8900,2023:9500,2024:10100,2025:11000}}
]
},

{
district:"Aurangabad",
crops:[
{name:"Wheat",prices:{2022:2200,2023:2400,2024:2600,2025:2800}},
{name:"Soybean",prices:{2022:4500,2023:4800,2024:5100,2025:5500}},
{name:"Cotton",prices:{2022:4700,2023:5000,2024:5300,2025:5700}}
],
vegetables:[
{name:"Onion",prices:{2022:3400,2023:3800,2024:4200,2025:4700}},
{name:"Tomato",prices:{2022:4100,2023:4500,2024:4900,2025:5400}},
{name:"Brinjal",prices:{2022:3600,2023:3900,2024:4200,2025:4600}}
],
fruits:[
{name:"Mango",prices:{2022:8800,2023:9400,2024:10000,2025:10800}},
{name:"Pomegranate",prices:{2022:8700,2023:9300,2024:9900,2025:10600}},
{name:"Banana",prices:{2022:6200,2023:6600,2024:7000,2025:7500}}
]
},

{
district:"Beed",
crops:[
{name:"Bajra",prices:{2022:1800,2023:2000,2024:2200,2025:2400}},
{name:"Soybean",prices:{2022:4400,2023:4700,2024:5000,2025:5400}},
{name:"Tur",prices:{2022:6000,2023:6400,2024:6800,2025:7300}}
],
vegetables:[
{name:"Onion",prices:{2022:3300,2023:3700,2024:4100,2025:4600}},
{name:"Tomato",prices:{2022:4000,2023:4400,2024:4800,2025:5300}},
{name:"Cabbage",prices:{2022:2900,2023:3200,2024:3500,2025:3900}}
],
fruits:[
{name:"Pomegranate",prices:{2022:8600,2023:9200,2024:9800,2025:10500}},
{name:"Mango",prices:{2022:8800,2023:9400,2024:10000,2025:10800}},
{name:"Banana",prices:{2022:6100,2023:6500,2024:6900,2025:7400}}
]
},

{
district:"Bhandara",
crops:[
{name:"Rice",prices:{2022:2100,2023:2250,2024:2450,2025:2650}},
{name:"Soybean",prices:{2022:4600,2023:4850,2024:5150,2025:5500}},
{name:"Tur",prices:{2022:6200,2023:6600,2024:7000,2025:7500}}
],
vegetables:[
{name:"Onion",prices:{2022:3400,2023:3800,2024:4200,2025:4700}},
{name:"Tomato",prices:{2022:4200,2023:4600,2024:5000,2025:5600}},
{name:"Brinjal",prices:{2022:3700,2023:4000,2024:4400,2025:4800}}
],
fruits:[
{name:"Banana",prices:{2022:6300,2023:6700,2024:7100,2025:7600}},
{name:"Mango",prices:{2022:9000,2023:9600,2024:10300,2025:11200}},
{name:"Papaya",prices:{2022:7200,2023:7600,2024:8000,2025:8600}}
]
},

{
district:"Buldhana",
crops:[
{name:"Cotton",prices:{2022:4800,2023:5100,2024:5400,2025:5800}},
{name:"Jowar",prices:{2022:2050,2023:2200,2024:2400,2025:2600}},
{name:"Wheat",prices:{2022:2200,2023:2400,2024:2600,2025:2800}}
],
vegetables:[
{name:"Potato",prices:{2022:2300,2023:2600,2024:2900,2025:3300}},
{name:"Tomato",prices:{2022:4000,2023:4400,2024:4800,2025:5300}},
{name:"Spinach",prices:{2022:3000,2023:3300,2024:3600,2025:4000}}
],
fruits:[
{name:"Mango",prices:{2022:9100,2023:9700,2024:10400,2025:11300}},
{name:"Banana",prices:{2022:6200,2023:6600,2024:7000,2025:7500}},
{name:"Pomegranate",prices:{2022:8800,2023:9400,2024:10000,2025:10800}}
]
}
,
{
district:"Chandrapur",
crops:[
{name:"Rice",prices:{2022:2200,2023:2400,2024:2600,2025:2800}},
{name:"Soybean",prices:{2022:4600,2023:4900,2024:5200,2025:5600}},
{name:"Tur",prices:{2022:6250,2023:6600,2024:7000,2025:7500}}
],
vegetables:[
{name:"Onion",prices:{2022:3500,2023:3900,2024:4300,2025:4800}},
{name:"Brinjal",prices:{2022:3800,2023:4100,2024:4500,2025:4900}},
{name:"Tomato",prices:{2022:4200,2023:4600,2024:5000,2025:5600}}
],
fruits:[
{name:"Banana",prices:{2022:6400,2023:6800,2024:7200,2025:7700}},
{name:"Papaya",prices:{2022:7300,2023:7700,2024:8100,2025:8700}},
{name:"Mango",prices:{2022:9200,2023:9800,2024:10500,2025:11400}}
]
},

{
district:"Dhule",
crops:[
{name:"Wheat",prices:{2022:2150,2023:2300,2024:2500,2025:2700}},
{name:"Bajra",prices:{2022:1850,2023:2000,2024:2200,2025:2400}},
{name:"Jowar",prices:{2022:2050,2023:2200,2024:2400,2025:2600}}
],
vegetables:[
{name:"Tomato",prices:{2022:4100,2023:4500,2024:4900,2025:5400}},
{name:"Onion",prices:{2022:3400,2023:3800,2024:4200,2025:4700}},
{name:"Brinjal",prices:{2022:3700,2023:4000,2024:4400,2025:4800}}
],
fruits:[
{name:"Mango",prices:{2022:9100,2023:9700,2024:10400,2025:11300}},
{name:"Banana",prices:{2022:6200,2023:6600,2024:7000,2025:7500}},
{name:"Papaya",prices:{2022:7200,2023:7600,2024:8000,2025:8600}}
]
},

{
district:"Gadchiroli",
crops:[
{name:"Rice",prices:{2022:2100,2023:2300,2024:2500,2025:2700}},
{name:"Maize",prices:{2022:1800,2023:2000,2024:2200,2025:2400}},
{name:"Tur",prices:{2022:6000,2023:6400,2024:6800,2025:7200}}
],
vegetables:[
{name:"Onion",prices:{2022:3300,2023:3700,2024:4100,2025:4600}},
{name:"Tomato",prices:{2022:4000,2023:4400,2024:4800,2025:5300}},
{name:"Spinach",prices:{2022:2800,2023:3100,2024:3400,2025:3800}}
],
fruits:[
{name:"Banana",prices:{2022:6100,2023:6500,2024:6900,2025:7400}},
{name:"Papaya",prices:{2022:7000,2023:7400,2024:7800,2025:8400}},
{name:"Mango",prices:{2022:8900,2023:9500,2024:10100,2025:11000}}
]
},

{
district:"Gondia",
crops:[
{name:"Rice",prices:{2022:2200,2023:2400,2024:2600,2025:2800}},
{name:"Soybean",prices:{2022:4500,2023:4800,2024:5100,2025:5500}},
{name:"Tur",prices:{2022:6100,2023:6500,2024:6900,2025:7400}}
],
vegetables:[
{name:"Onion",prices:{2022:3400,2023:3800,2024:4200,2025:4700}},
{name:"Tomato",prices:{2022:4100,2023:4500,2024:4900,2025:5400}},
{name:"Brinjal",prices:{2022:3600,2023:3900,2024:4200,2025:4600}}
],
fruits:[
{name:"Banana",prices:{2022:6200,2023:6600,2024:7000,2025:7500}},
{name:"Mango",prices:{2022:9000,2023:9600,2024:10300,2025:11200}},
{name:"Orange",prices:{2022:7100,2023:7700,2024:8300,2025:9100}}
]
},

{
district:"Hingoli",
crops:[
{name:"Soybean",prices:{2022:4400,2023:4700,2024:5000,2025:5400}},
{name:"Tur",prices:{2022:6000,2023:6400,2024:6800,2025:7300}},
{name:"Cotton",prices:{2022:4700,2023:5000,2024:5300,2025:5700}}
],
vegetables:[
{name:"Onion",prices:{2022:3300,2023:3700,2024:4100,2025:4600}},
{name:"Tomato",prices:{2022:4000,2023:4400,2024:4800,2025:5300}},
{name:"Cabbage",prices:{2022:2900,2023:3200,2024:3500,2025:3900}}
],
fruits:[
{name:"Banana",prices:{2022:6100,2023:6500,2024:6900,2025:7400}},
{name:"Mango",prices:{2022:8800,2023:9400,2024:10000,2025:10800}},
{name:"Guava",prices:{2022:5000,2023:5400,2024:5800,2025:6300}}
]
},

{
district:"Jalgaon",
crops:[
{name:"Cotton",prices:{2022:4800,2023:5100,2024:5400,2025:5800}},
{name:"Banana",prices:{2022:6000,2023:6400,2024:6800,2025:7300}},
{name:"Wheat",prices:{2022:2200,2023:2400,2024:2600,2025:2800}}
],
vegetables:[
{name:"Onion",prices:{2022:3400,2023:3800,2024:4200,2025:4700}},
{name:"Tomato",prices:{2022:4100,2023:4500,2024:4900,2025:5400}},
{name:"Brinjal",prices:{2022:3600,2023:3900,2024:4200,2025:4600}}
],
fruits:[
{name:"Banana",prices:{2022:6300,2023:6700,2024:7100,2025:7600}},
{name:"Mango",prices:{2022:9000,2023:9600,2024:10300,2025:11200}},
{name:"Papaya",prices:{2022:7200,2023:7600,2024:8000,2025:8600}}
]
}

];
mongoose.connect(process.env.MONGO_URI)
.then(async () => {
  console.log("✅ MongoDB Connected");

  await District.deleteMany(); // optional
  await District.insertMany(districtData);

  console.log("🚀 District data inserted successfully");

  mongoose.connection.close();
})
.catch(err => {
  console.log("❌ Error:", err);
});