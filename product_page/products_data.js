// Central database of product categories and their model lines.
// This is designed to be easily editable. To add a new brand, just add a new top-level key.
// To add new categories or models, edit the array under the specific brand.

const PRODUCTS_DATABASE = {
    liugong: {
        brandTitle: "LIUGONG",
        brandLogo: "../img/Products/liugong-logo.png",
        products: [
            {
                id: "wheel-loader",
                title: "WHEEL LOADER",
                image: "img/wheel-loader (1).jpg",
                models: ["816C", "820C", "835H", "836", "855H", "856H"]
            },
            {
                id: "excavator",
                title: "EXCAVATOR",
                image: "img/excavator.jpg",
                models: ["915E", "920E", "925E", "930E"]
            },
            {
                id: "roller",
                title: "ROLLER",
                image: "img/roller.jpg",
                models: ["509A", "6114E", "6212E", "6312", "6516E"]
            },
            {
                id: "motor-grader",
                title: "MOTOR GRADER",
                image: "img/motor-grader.jpg",
                models: ["4140", "4165", "4180"]
            },
            {
                id: "bulldozer",
                title: "BULLDOZER",
                image: "img/bulldozer.jpg",
                models: ["B160C", "B230C", "B320C"]
            },
            {
                id: "forklift",
                title: "FORKLIFT",
                image: "img/forklift.jpg",
                models: ["CLG2030H-35H"]
            },
            {
                id: "backhoe-loader",
                title: "BACKHOE LOADER",
                image: "img/backhoe-loader.jpg",
                models: ["766A"]
            },
            {
                id: "skid-steer-loader",
                title: "SKID STEER LOADER",
                image: "img/skid-steer-loader.jpg",
                models: ["365A"]
            },
            {
                id: "crane",
                title: "CRANE",
                image: "img/crane.jpg",
                models: ["LC50", "LC120", "TC100A", "TC250A4", "TC250A5", "TC500A"]
            },
            {
                id: "concrete",
                title: "CONCRETE",
                image: "img/concrete.jpg",
                models: ["CLGTM204E", "CLGTM307E", "HBC6013132E", "HBT6013132E", "HZS60", "HZS50/75", "HZS90"]
            }
        ]
    },
    jac: {
        brandTitle: "JAC MOTORS",
        brandLogo: "../img/Products/jac-motor-logo.png",
        products: [
            {
                id: "tractor-head",
                title: "TRACTOR HEAD",
                image: "img/tractor-head.jpg",
                models: ["Tractor Head"]
            },
            {
                id: "dump-truck",
                title: "DUMP TRUCK",
                image: "img/dump-truck.jpg",
                models: ["130Hp", "160Hp"]
            },
            {
                id: "sunray",
                title: "SUNRAY, SUNRAY SCHOOL BUS",
                image: "img/sunray.jpg",
                models: ["Sunray", "Sunray School Bus"]
            },
            {
                id: "light-truck",
                title: "LIGHT TRUCK",
                image: "img/light-truck.jpg",
                models: ["Light Truck"]
            },
            {
                id: "oil-browser",
                title: "OIL BROWSER",
                image: "img/oil-browser.jpg",
                models: ["Oil Browser"]
            },
            {
                id: "water-sprinkler-truck",
                title: "WATER SPRINKLER TRUCK",
                image: "img/water-sprinkler-truck.jpg",
                models: ["Water Sprinkler Truck"]
            }
        ]
    },
    powermax: {
        brandTitle: "POWERMAX",
        brandLogo: "../img/Products/powermax-logo.png",
        products: [
            {
                id: "super-silent-set",
                title: "SUPER SILENT SET",
                image: "img/super-silent-set.jpg",
                models: ["Super Silent Set"]
            },
            {
                id: "industrial-open-set",
                title: "INDUSTRIAL OPEN SET",
                image: "img/industrial-open-set.jpg",
                models: ["Industrial Open Set"]
            },
            {
                id: "lighting-tower",
                title: "LIGHTING TOWER",
                image: "img/lighting-tower.jpg",
                models: ["Lighting Tower"]
            },
            {
                id: "container-type-genset",
                title: "CONTAINER TYPE GENSET",
                image: "img/container-type-genset.jpg",
                models: ["Container Type Genset"]
            }
        ]
    },
    izumi: {
        brandTitle: "IZUMI",
        brandLogo: "../img/Products/izumi-logo.png",
        products: [
            {
                id: "aircon",
                title: "AIRCON",
                image: "img/aircon.jpg",
                models: ["Aircon"]
            },
            {
                id: "elevators-and-escalators",
                title: "ELEVATORS & ESCALATORS",
                image: "img/elevators-and-escalators.jpg",
                models: ["Elevators & Escalators"]
            },
            {
                id: "sanitary-ware",
                title: "SANITARY WARE",
                image: "img/sanitary-ware.jpg",
                models: ["Sanitary Ware"]
            },
            {
                id: "izumi-batteries",
                title: "IZUMI BATTERIES",
                image: "img/9fc38ab976e8560640497ade8bf7670.jpg",
                models: ["Izumi Batteries"]
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
                image: "img/topmax-topkit-tower-crane.jpg",
                models: ["Topkit Tower Crane"]
            },
            {
                id: "topless-tower-crane",
                title: "TOPLESS TOWER CRANE",
                image: "img/topmax-topless-tower-crane.jpg",
                models: ["Topless Tower Crane"]
            },
            {
                id: "luffing-tower-crane",
                title: "LUFFING TOWER CRANE",
                image: "img/topmax-luffing-tower-crane.jpg",
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
    }
};
