// Central database of product categories and their model lines.
// This is designed to be easily editable. To add a new brand, just add a new top-level key.
// To add new categories or models, edit the array under the specific brand.

const PRODUCTS_DATABASE = {
    liugong: {
        "brandTitle": "LIUGONG",
        "showAllModels": true,
        "brandLogo": "../img/Products/liugong-logo.png",
        "products": [
                {
                        "id": "wheel-loader",
                        "title": "WHEEL LOADER",
                        "image": "img/liugong-final/wheel-loader.jpg",
                        "models": [
                                "816C",
                                "820C",
                                "835T",
                                "855T",
                                "856T",
                                "870T"
                        ]
                },
                {
                        "id": "excavator",
                        "title": "EXCAVATOR",
                        "image": "img/liugong-final/excavator.jpg",
                        "models": [
                                "906F",
                                "908F",
                                "922F",
                                "936F",
                                "952E"
                        ]
                },
                {
                        "id": "roller",
                        "title": "ROLLER",
                        "image": "img/liugong-final/roller-1.png",
                        "models": [
                                "CLG 6110E",
                                "CLG 6611E",
                                "CLG 6612E",
                                "CLG 6210E",
                                "CLG 6516E",
                                "CLG 6312E"
                        ],
                        "images": [
                                "img/liugong-final/roller-1.png",
                                "img/liugong-final/roller-2.png"
                        ]
                },
                {
                        "id": "motor-grader",
                        "title": "MOTOR GRADER",
                        "image": "img/liugong-final/motor-grader.jpg",
                        "models": [
                                "4140D",
                                "4165D"
                        ]
                },
                {
                        "id": "bulldozer",
                        "title": "BULLDOZER",
                        "image": "img/liugong-final/bulldozer.jpg",
                        "models": [
                                "LD 20D",
                                "LD 26D",
                                "B160C",
                                "B230"
                        ]
                },
                {
                        "id": "forklift",
                        "title": "FORKLIFT",
                        "image": "img/liugong-final/forklift-1.jpeg",
                        "models": [
                                "Engine Forklift (1.5–16 tons)",
                                "Electric Forklift (1.5–5 tons)"
                        ],
                        "images": [
                                "img/liugong-final/forklift-1.jpeg",
                                "img/liugong-final/forklift-2.png",
                                "img/liugong-final/forklift-3.jpeg",
                                "img/liugong-final/forklift-4.jpeg"
                        ]
                },
                {
                        "id": "mining-truck",
                        "title": "MINING TRUCK",
                        "image": "img/liugong-final/mining-truck.png",
                        "models": [
                                "DW90A"
                        ]
                },
                {
                        "id": "crane",
                        "title": "MOBILE CRANE",
                        "image": "img/liugong-final/mobile-crane.png",
                        "models": [
                                "LTC250V5",
                                "LTC550L5"
                        ]
                }
        ]
},
    jac: {
        "brandTitle": "JAC MOTORS",
        "brandLogo": "../img/Products/jac-motor-logo.png",
        "showAllModels": true,
        "products": [
                {
                        "id": "tractor-head",
                        "title": "TRACTOR HEAD",
                        "image": "img/jac-final/tractor-head.jpg",
                        "models": [
                                "A5",
                                "K3",
                                "Q7"
                        ]
                },
                {
                        "id": "dump-truck",
                        "title": "DUMP TRUCK",
                        "image": "img/jac-final/dump-truck.png",
                        "models": [
                                "4x2 (140HP, 200HP)",
                                "6x4 – 336HP",
                                "8x4 – 380HP"
                        ],
                        "optionLabel": "View Options"
                },
                {
                        "id": "cargo-truck",
                        "title": "CARGO TRUCK",
                        "image": "img/jac-final/cargo-truck-1.png",
                        "models": [
                                "Light Truck (10ft–14ft)",
                                "Box Truck (10ft–14ft)"
                        ],
                        "images": [
                                "img/jac-final/cargo-truck-1.png",
                                "img/jac-final/cargo-truck-2.png"
                        ],
                        "optionLabel": "View Options"
                },
                {
                        "id": "oil-browser",
                        "title": "OIL BOWSER",
                        "image": "img/jac-final/oil-browser-1.png",
                        "models": [
                                "4500–24000 Liters"
                        ],
                        "images": [
                                "img/jac-final/oil-browser-1.png",
                                "img/jac-final/oil-browser-2.png"
                        ],
                        "optionLabel": "View Options"
                },
                {
                        "id": "water-sprinkler-truck",
                        "title": "WATER BOWSER",
                        "image": "img/jac-final/water-sprinkler-truck.jpg",
                        "models": [
                                "4500–14000 Liters"
                        ],
                        "optionLabel": "View Options"
                },
                {
                        "id": "special-trucks",
                        "title": "SPECIAL TRUCKS",
                        "image": "img/jac-final/special-trucks.jpg",
                        "models": [
                                "Garbage Truck",
                                "Sewage Truck",
                                "Fire Fighting Truck",
                                "Truck Crane",
                                "Car Carrier Truck",
                                "Freezer Truck"
                        ],
                        "optionLabel": "View Options"
                },
                {
                        "id": "e30x",
                        "title": "EV · E30X",
                        "image": "img/jac-final/e30x.jpeg",
                        "models": [
                                "E30X"
                        ]
                },
                {
                        "id": "t9",
                        "title": "EV · T9",
                        "image": "img/jac-final/t9.png",
                        "models": [
                                "T9"
                        ]
                },
                {
                        "id": "m3",
                        "title": "EV · M3",
                        "image": "img/jac-final/m3.jpeg",
                        "models": [
                                "M3"
                        ]
                },
                {
                        "id": "x200",
                        "title": "EV · X200",
                        "image": "img/jac-final/x200.jpeg",
                        "models": [
                                "X200"
                        ]
                },
                {
                        "id": "ev-chargers",
                        "title": "EV CHARGERS",
                        "image": "img/jac-final/ev-chargers.png",
                        "models": []
                }
        ]
},
    powermax: {
        "brandTitle": "POWERMAX",
        "brandLogo": "../img/Products/powermax-logo.png",
        "showAllModels": true,
        "products": [
                {
                        "id": "container-type-genset",
                        "title": "CONTAINER TYPE",
                        "image": "img/powermax-final/container-type-genset.png",
                        "models": []
                },
                {
                        "id": "super-silent-set",
                        "title": "SILENT TYPE",
                        "image": "img/powermax-final/super-silent-set.jpg",
                        "models": []
                },
                {
                        "id": "industrial-open-set",
                        "title": "OPEN TYPE",
                        "image": "img/powermax-final/industrial-open-set.png",
                        "models": []
                },
                {
                        "id": "telecom-genset",
                        "title": "TELECOM GENSET",
                        "image": "img/powermax-final/telecom-genset.png",
                        "models": []
                },
                {
                        "id": "transformer",
                        "imageLogo": "img/powermax-final/source-logo.png",
                        "title": "POWERMAX TRANSFORMER",
                        "image": "img/powermax-final/transformer.jpg",
                        "models": []
                },
                {
                        "id": "lighting-tower",
                        "title": "LIGHTING TOWER",
                        "image": "img/powermax-final/lighting-tower.png",
                        "models": []
                },
                {
                        "id": "battery",
                        "title": "POWERMAX BATTERY",
                        "image": "img/powermax-final/battery.jpg",
                        "models": []
                }
        ]
},
    izumi: {
        "brandTitle": "IZUMI",
        "brandLogo": "../img/Products/izumi-logo.png",
        "showAllModels": true,
        "products": [
                {
                        "id": "aircon",
                        "title": "AIRCON",
                        "image": "img/izumi-final/aircon-1.jpg",
                        "models": [],
                        "images": [
                                "img/izumi-final/aircon-1.jpg",
                                "img/izumi-final/aircon-2.jpg"
                        ]
                },
                {
                        "id": "elevators-and-escalators",
                        "title": "LIFTS",
                        "image": "img/izumi-final/elevators-and-escalators.jpg",
                        "models": []
                },
                {
                        "id": "sanitary-ware",
                        "imageLogo": "img/izumi-final/source-logo.png",
                        "title": "SANITARY WARE",
                        "image": "img/izumi-final/sanitary-ware.jpeg",
                        "models": []
                },
                {
                        "id": "meters",
                        "title": "METERS",
                        "image": "img/izumi-final/meters.jpg",
                        "models": []
                },
                {
                        "id": "switch-and-sockets",
                        "title": "SWITCH AND SOCKETS",
                        "image": "img/izumi-final/switch-and-sockets.jpg",
                        "models": []
                }
        ]
},
    zega: {
        brandTitle: "ZEGA",
        brandLogo: "../img/Products/zega-logo.png",
        products: [
            {
                id: "dth-crawler-top-hammer-jumbo",
                title: "DTH, CRAWLER DTH, TOP HAMMER & JUMBO",
                image: "img/zega-dth-top-hammer-jumbo.jpg",
                models: ["Top Hammer & Jumbo"]
            },
            {
                id: "d440",
                title: "D440",
                image: "img/zega-d440.jpg",
                models: ["D440"]
            },
            {
                id: "d535",
                title: "D535",
                image: "img/zega-d535.jpg",
                models: ["D535"]
            },
            {
                id: "jumbo",
                title: "JUMBO",
                image: "img/zega-jumbo.jpg",
                models: ["Jumbo"]
            }
        ]
    },
    roadmax: {
        brandTitle: "ROADMAX",
        brandLogo: "../img/Products/roadmax-logo.png",
        products: [
            {
                id: "asphalt-batch-mixing-plant",
                title: "ASPHALT BATCH MIXING PLANT",
                image: "img/asphalt-batch-mixing-plant.jpg",
                models: ["Asphalt Batch Mixing Plant"]
            },
            {
                id: "asphalt-drum-mixing-plant",
                title: "ASPHALT DRUM MIXING PLANT",
                image: "img/asphalt-drum-mixing-plant.jpg",
                models: ["Asphalt Drum Mixing Plant"]
            },
            {
                id: "chip-sealer",
                title: "CHIP SEALER",
                image: "img/chip-sealer.jpg",
                models: ["Chip Sealer"]
            },
            {
                id: "self-loading-mixer",
                title: "SELF LOADING MIXER",
                image: "img/self-loading-mixer.jpg",
                models: ["Self Loading Mixer"]
            }
        ]
    },
    topmax: {
        brandTitle: "TOPMAX",
        brandLogo: "../img/Products/topmax-logo.png",
        products: [
            {
                id: "topkit-tower-crane",
                title: "TOPKIT TOWER CRANE",
                image: "img/topmax.jpg",
                models: ["Topkit Tower Crane"]
            },
            {
                id: "topless-tower-crane",
                title: "TOPLESS TOWER CRANE",
                image: "img/topmax-general.jpg",
                models: ["Topless Tower Crane"]
            },
            {
                id: "luffing-tower-crane",
                title: "LUFFING TOWER CRANE",
                image: "img/topmax.jpg",
                models: ["Luffing Tower Crane"]
            }
        ]
    },
    truston: {
        brandTitle: "TRUSTON",
        brandLogo: "../img/Products/truston-logo.png",
        products: [
            {
                id: "mobile-crushing-plant",
                title: "MOBILE CRUSHING PLANT",
                image: "img/mobile-crushing-plant.jpg",
                models: ["Mobile Crushing Plant"]
            },
            {
                id: "jaw-crusher",
                title: "JAW CRUSHER",
                image: "img/jaw-crusher.jpg",
                models: ["Jaw Crusher Plant"]
            },
            {
                id: "cgf-impact-crusher",
                title: "CGF IMPACT CRUSHER",
                image: "img/cgf-impact-crusher.jpg",
                models: ["CGF Impact Crusher"]
            },
            {
                id: "hydraulic-cone-crusher",
                title: "HYDRAULIC CONE CRUSHER",
                image: "img/hydraulic-cone-crusher.jpg",
                models: ["Hydraulic Cone Crusher"]
            },
            {
                id: "impact-crusher",
                title: "IMPACT CRUSHER",
                image: "img/impact-crusher.jpg",
                models: ["Impact Crusher"]
            }
        ]
    },
    sigma: {
    "brandTitle": "SIGMA",
    "brandLogo": "../img/Products/sigma_logo.png",
    "products": [
{
        "id": "sm43cbt",
        "title": "CONCRETE PUMP",
        "image": "img/sigma/sigma-sm43cbt.jpg",
        "models": [
                "SM43 CBT"
        ],
        "specs": [
                [
                        "Theoretical output",
                        "120 m³/h"
                ],
                [
                        "Max. concrete pressure",
                        "8.3 MPa"
                ],
                [
                        "Engine power",
                        "315 kW"
                ],
                [
                        "Vertical reach",
                        "43 m"
                ]
        ]
},
{
        "id": "sm300wl-1",
        "title": "WHEEL LOADER",
        "image": "img/sigma/sigma-sm300wl-1.jpg",
        "models": [
                "SM 300WL-1"
        ],
        "specs": [
                [
                        "Operating weight",
                        "11,200 kg"
                ],
                [
                        "Engine power",
                        "112 kW (150 hp)"
                ],
                [
                        "Bucket capacity",
                        "1.8–2.5 m³"
                ]
        ]
},
{
        "id": "sm225c",
        "title": "CRAWLER EXCAVATOR",
        "image": "img/sigma/sigma-sm225c.jpg",
        "models": [
                "SM 225C"
        ],
        "specs": []
},
        {
            "id": "sm800cmt-concrete-mixer-truck",
            "title": "CONCRETE MIXER TRUCK",
            "image": "img/sigma/sigma-sm800cmt-concrete-mixer-truck.jpg",
            "models": [
                "SM800CMT"
            ]
        },
        {
            "id": "sm30-fd-1-forklift-truck",
            "title": "FORKLIFT TRUCK",
            "image": "img/sigma/sigma-sm30-fd-1-forklift-truck.jpg",
            "models": [
                "SM30 FD-1"
            ]
        },
        {
            "id": "100-kva-diesel-generator",
            "title": "DIESEL GENERATOR",
            "image": "img/sigma/sigma-100-kva-diesel-generator.jpg",
            "models": [
                "100 kVA Diesel Generator"
            ]
        },
        {
            "id": "sm100-cmp-concrete-pump",
            "title": "CONCRETE PUMP",
            "image": "img/sigma/sigma-sm100-cmp-concrete-pump.jpg",
            "models": [
                "SM100 CMP"
            ]
        },
        {
            "id": "sm100-clp-closed-loop-concrete-pump",
            "title": "CONCRETE PUMP (CLOSED LOOP)",
            "image": "img/sigma/sigma-sm100-clp-closed-loop-concrete-pump.jpg",
            "models": [
                "SM100 CLP"
            ]
        },
        {
            "id": "sm655-c-concrete-pump",
            "title": "CONCRETE PUMP",
            "image": "img/sigma/sigma-sm655-c-concrete-pump.jpg",
            "models": [
                "SM655 C"
            ]
        },
        {
            "id": "sm4500cd-1-crawler-rock-drill",
            "title": "CRAWLER ROCK DRILL",
            "image": "img/sigma/sigma-sm4500cd-1-crawler-rock-drill.jpg",
            "models": [
                "SM4500CD-1"
            ]
        },
        {
            "id": "sm60-cbp-m-concrete-batching-plant",
            "title": "CONCRETE BATCHING PLANT",
            "image": "img/sigma/sigma-sm60-cbp-m-concrete-batching-plant.jpg",
            "models": [
                "SM60-CBP-M"
            ]
        },
        {
            "id": "sm3500-rt-1-rough-terrain-crane",
            "title": "ROUGH TERRAIN CRANE",
            "image": "img/sigma/sigma-sm3500-rt-1-rough-terrain-crane.jpg",
            "models": [
                "SM3500 RT-1"
            ]
        }
    ]
}
};
