import { type ThemeName} from './types/ThemeName';
import { type PresTheme } from "./types/PresTheme";
import { generateThemeColors } from "@/api/AI/chatGPT/customPrompts";

export const themes : Required<PresTheme>[] = [
    {
        name : 'theme1',
        options : {
            background_color : [25,62,78],
            objects_color : [140, 159, 167],
            font_info : {
                titles : {
                    color : [255,255,255],
                    bold : true,
                    italic : null, 
                },
                main_texts : {
                    color : [221,221,213],
                    bold : null,
                    italic : null,
                }
            }
        }
    },
    {
        name : 'theme2',
        options : {
            background_color : [119, 104, 134],
            objects_color : [178, 152, 205],
            font_info : {
                titles : {
                    color : [255, 255, 255],
                    bold : true,
                    italic : null, 
                },
                main_texts : {
                    color : [234, 228, 236],
                    bold : null,
                    italic : null,
                }
            }
        }
    },
    {
        name : 'theme3',
        options : {
            background_color : [238, 242, 219],
            objects_color : [11, 150, 91],
            font_info : {
                titles : {
                    color : [11, 150, 91],
                    bold : true,
                    italic : null, 
                },
                main_texts : {
                    color : [91, 91, 91],
                    bold : null,
                    italic : null,
                }
            }
        }
    },
    // ---------------------------------------
    {
        name : 'theme4',
        options : {
            background_color : [255, 255, 255],
            objects_color : [219, 219, 219],
            font_info : {
                titles : {
                    color : [0, 0, 0],
                    bold : true,
                    italic : null, 
                },
                main_texts : {
                    color : [80, 80, 80],
                    bold : null,
                    italic : null,
                }
            }
        }
    },
    {
        name : 'theme5',
        options : {
            background_color : [66, 104, 180],
            objects_color : [98, 142, 230],
            font_info : {
                titles : {
                    color : [255, 255, 255],
                    bold : true,
                    italic : null, 
                },
                main_texts : {
                    color : [255, 255, 255],
                    bold : null,
                    italic : null,
                }
            }
        }
    },
    {
        name : 'theme6',
        options : {
            background_color : [46, 54, 64],
            objects_color : [60, 71, 85],
            font_info : {
                titles : {
                    color : [193, 224, 84],
                    bold : true,
                    italic : null, 
                },
                main_texts : {
                    color : [235, 235, 235],
                    bold : null,
                    italic : null,
                },
                lists_markers : {
                    color : [190, 135, 244],
                    bold : null,
                    italic : null,
                }
            }
        }
    },
    {
        name : 'theme7',
        options : {
            background_color : [38, 38, 37],
            objects_color : [224, 74, 35],
            font_info : {
                titles : {
                    color : [224, 74, 35],
                    bold : true,
                    italic : null, 
                },
                main_texts : {
                    color : [190, 190, 190],
                    bold : null,
                    italic : null,
                },
                lists_markers : {
                    color : [255, 255, 255],
                    bold : null,
                    italic : null,
                }
            }
        }
    },
    {
        name : 'theme8',
        options : {
            background_color : [221, 221, 218],
            objects_color : [203, 53, 103],
            font_info : {
                titles : {
                    color : [203, 53, 103],
                    bold : true,
                    italic : null, 
                },
                main_texts : {
                    color : [71, 70, 75],
                    bold : null,
                    italic : null,
                }
            }
        }
    },
    {
        name : 'theme9',
        options : {
            background_color : [238, 242, 219],
            objects_color : [11, 150, 91],
            font_info : {
                titles : {
                    color : [11, 150, 91],
                    bold : true,
                    italic : null, 
                },
                main_texts : {
                    color : [91, 91, 91],
                    bold : null,
                    italic : null,
                }
            }
        }
    },
    {
        name : 'theme10',
        options : {
            background_color : [91, 91, 91],
            objects_color : [11, 150, 91],
            font_info : {
                titles : {
                    color : [11, 150, 91],
                    bold : true,
                    italic : null, 
                },
                main_texts : {
                    color : [238, 242, 219] ,
                    bold : null,
                    italic : null,
                },
                lists_markers :
                {
                    color : [255, 255, 255],
                    bold : null,
                    italic : null,
                }
            }
        }
    },
    {
        name : 'theme11',
        options : {
            background_color : [232, 231, 227],
            objects_color : [58, 72, 150],
            font_info : {
                titles : {
                    color : [58, 72, 150],
                    bold : true,
                    italic : null, 
                },
                main_texts : {
                    color : [83, 57, 36],
                    bold : null,
                    italic : null,
                }
            }
        }
    },
]

export const getThemeByName = (name : ThemeName) => themes.find(el => el.name == name)?.options

export const getRandomTheme = () => themes[ Math.floor(Math.random() * themes.length) ].name

export const generateTheme = async (theme : string) => {

    const colors = await generateThemeColors(theme)

    if (!colors) return false

    const newTheme : PresTheme = {
        options : {
            background_color : colors.background_color,
            objects_color : colors.objects_color,
            font_info : {
                titles : {
                    color : colors.titles,
                    bold : true,
                    italic : null, 
                },
                main_texts : {
                    color : colors.main_texts,
                    bold : null,
                    italic : null,
                }
            }
        }
    }
    return newTheme
}