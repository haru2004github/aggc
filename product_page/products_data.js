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
    }
};
