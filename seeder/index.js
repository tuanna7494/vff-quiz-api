const seeder = require('mongoose-seed');
require('dotenv').config();
const HOST_URL = `${process.env.APP_EXTERNAL_URL}/uploads`;

const users = [
    {
        'model': 'User',
        'documents': [
            {
                '_id': '603cabee4d06030968d62c43',
                'email': 'admin@gmail.com',
                'password': '$2a$10$llxhr.LEn3FCSyYJSJEAE.HcYkqFz9HGfBr9sxBSce7XkAYjEBC1W', // tranducy
                'first_name': 'DucY',
                'last_name': 'Tran',
                'role': 'admin'
            },
            {
                '_id': '603cabee4d06030968d62c45',
                'email': 'duong@gmail.com',
                'password': '$2a$10$UkqqEt7O7vwkmIeoyTIpqupZolhTpimWkmTwUtphmbLncOixWld7i', // duong123
                'first_name': 'Ho Van',
                'last_name': 'Duong',
                'role': 'user'
            },
            {
                '_id': '603cac45b283082cdc86b4da',
                'email': 'khai@gmail.com',
                'password': '$2a$10$VPeUgcbK9QwOA.vcXcblAu7Pcvu9uv.jWTtZ2qjWBoP4cPzLtSRWi', // khai1212
                'first_name': 'Hoang Qua',
                'last_name': 'Khai',
                'role': 'user'
            }
        ]
    }, 
]

const results = [
    {
        'model': 'Result',
        'documents': [
            {
                "_id": "620320ad91b3434ab8ac945d",
                "title": "Gemini",
                "description": "You are super honest. You aren't afraid to tell the truth even if it hurts. Everyone wants to be your friend, but you are introverted and only really need a small group of people to support you.",
                "thumbnail": `${HOST_URL}/thumbnail-1644759584992.jpeg`,
            },
            {
                "_id": "6203216c66c051864e5d14ba",
                "title": "Scorpio",
                "description": "You are so kind and warm! You are very strong and it takes a lot to hurt you. You bottle up your feelings and don't tell anyone what you're truly feeling, despite everyone caring for you.",
                "thumbnail": `${HOST_URL}/thumbnail-1644759537134.jpeg`,
            }
            
        ]
    }
]

const awnser = [
    {
        'model': 'Answer',
        'documents': [
            {
                "_id": "620321d371595f4f57820c26",
                "title": "Regular",
                "description": "",
                "result": "620320ad91b3434ab8ac945d"
            },
            {
                "_id": "620321d92eb2f9a137f80625",
                "title": "Thin",
                "description": "",
                "result": "6203216c66c051864e5d14ba"
            },
            {
                "_id": "62032268e8a5c8ba0a91fe74",
                "title": "Stuffed",
                "description": "",
                "result": "6203216c66c051864e5d14ba"
            },
            {
                "_id": "6203226ede4a87d536d07aa8",
                "title": "Deep dish",
                "description": "",
                "result": "620320ad91b3434ab8ac945d"
            },


            {
                "_id": "6209021704d6152224cc265e",
                "title": "Tomato sauce",
                "type": "image",
                "thumbnail": `${HOST_URL}/thumbnail-1644758028389.jpeg`,
                "result": "6203216c66c051864e5d14ba"
            },
            {
                "_id": "62090227e9451680cc22e039",
                "title": "Hot sauce",
                "type": "image",
                "thumbnail": `${HOST_URL}/thumbnail-1644758053069.jpeg`,
                "result": "620320ad91b3434ab8ac945d"
            },
            {
                "_id": "6209022c50911ad005bbfb91",
                "title": "BBQ sauce",
                "type": "image",
                "thumbnail": `${HOST_URL}/thumbnail-1644758067383.jpeg`,
                "result": "620320ad91b3434ab8ac945d"
            },
            {
                "_id": "6209023172dd0a03a856b3e7",
                "title": "Buffalo sauce",
                "type": "image",
                "thumbnail": `${HOST_URL}/thumbnail-1644758082822.webp`,
                "result": "6203216c66c051864e5d14ba"
            },


            {
                "_id": "6209084122e2e8ace8a2232b",
                "title": "Cheddar",
                "type": "image",
                "thumbnail": `${HOST_URL}/thumbnail-1644759281977.jpeg`,
                "result": "620320ad91b3434ab8ac945d"
            },
            {
                "_id": "6209084596f0f7a2647f679b",
                "title": "Mozzarella",
                "type": "image",
                "thumbnail": `${HOST_URL}/thumbnail-1644759299832.jpeg`,
                "result": "6203216c66c051864e5d14ba"
            },
            {
                "_id": "6209084a46cb5c05b629c46d",
                "title": "Gorgonzola",
                "type": "image",
                "thumbnail": `${HOST_URL}/thumbnail-1644759314807.jpeg`,
                "result": "620320ad91b3434ab8ac945d"
            },
            {
                "_id": "6209084f1221e214259bf40f",
                "title": "Um, all of the above!",
                "type": "text",
                "result": "6203216c66c051864e5d14ba"
            }
            
        ]
    }
]
const question = [
    {
        'model': 'Question',
        'documents': [
            {
                "_id": '6203233da6d4061afc1eeaf1',
                "title": "First off, choose a crust",
                "color_bg_hex": "#007c7c",
                "color_text_hex": "#ffffff",
                "answers": [
                    "620321d371595f4f57820c26",
                    "620321d92eb2f9a137f80625",
                    "62032268e8a5c8ba0a91fe74",
                    "6203226ede4a87d536d07aa8"
                ]
            },

            {
                "_id": '6209079d9edbd04768b0c054',
                "title": "Pick a sauce",
                "color_bg_hex": "#68af15",
                "color_text_hex": "#ffffff",
                "answers": [
                    "6209021704d6152224cc265e",
                    "62090227e9451680cc22e039",
                    "6209022c50911ad005bbfb91",
                    "6209023172dd0a03a856b3e7"
                ]
            },

            {
                "_id": '6209089c62c958be89769dea',
                "title": "Choose some cheese",
                "color_bg_hex": "#e32",
                "color_text_hex": "#ffffff",
                "answers": [
                    "6209084122e2e8ace8a2232b",
                    "6209084596f0f7a2647f679b",
                    "6209084a46cb5c05b629c46d",
                    "6209084f1221e214259bf40f"
                ]
            }
            
        ]
    }
]
const quizes = [
    {
        'model': 'Quizz',
        'documents': [
            {
                "id": '62032374e226202e1a54491e',
                "title": "Make A Tasty Pizza Pie And We'll Guess Your Exact Zodiac Sign",
                "slug": "make-a-tasty-pizza-pie-and-we-ll-guess-your-exact-zodiac-sign",
                "description": "Cheddar cheese is soooo Pisces",
                "thumbnail": `${HOST_URL}/thumbnail-1644759763566.webp`,
                "questions": [
                    "6203233da6d4061afc1eeaf1",
                    "6209079d9edbd04768b0c054",
                    "6209089c62c958be89769dea"
                ],
                "results": [
                    "620320ad91b3434ab8ac945d",
                    "6203216c66c051864e5d14ba"
                ],
                "user": "603cabee4d06030968d62c43"
            },
            
        ]
    }
]

const shareResults = [
    {
        'model': 'Share',
        'documents': [
            {
                "result": "620320ad91b3434ab8ac945d",
                "quizz": "62032374e226202e1a54491e"
            },
            {
                "result": "620320ad91b3434ab8ac945d",
                "quizz": "62032374e226202e1a54491e"
            },
            {
                "result": "6203216c66c051864e5d14ba",
                "quizz": "62032374e226202e1a54491e"
            }
        ]
    }
]

seeder.connect(process.env.DB_CONNECT_STRING, function() {
    seeder.loadModels([
        './models/user.js',
        './models/question.js',
        './models/answer.js',
        './models/quizz.js',
        './models/result.js',
        './models/share.js'
    ]);
    seeder.clearModels(['User', 'Question', 'Answer', 'Quizz', 'Result', 'Share'], function() {

        seeder.populateModels(users, () => {
            seeder.populateModels(results, () => {
                seeder.populateModels(awnser, () => {
                    seeder.populateModels(question, () => {
                        seeder.populateModels(quizes, () => {
                            seeder.populateModels(shareResults, () => {
                                seeder.disconnect();
                            })
                        })
                    })
                })
            })

        })

    })
})