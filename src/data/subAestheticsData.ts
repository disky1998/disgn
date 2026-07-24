export interface VinylRecordItem {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  sourceUrl?: string;
  discColor: string;
  description: string;
  year: string;
  tags: string[];
}

export interface SubAesthetic {
  id: string;
  decadeId: string;
  name: string;
  nameEn: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  records: VinylRecordItem[];
}

export const SUB_AESTHETICS: Record<string, SubAesthetic[]> = {
  '1970': [
    {
      id: '70-braun',
      decadeId: '1970',
      name: '博朗工业极简主义',
      nameEn: 'Braun Industrial Functionalism',
      description: '迪特·拉姆斯导向的现代工业美学典范，真正的功能主义与极简主义精髓。',
      primaryColor: '#d97706',
      accentColor: '#f59e0b',
      records: [
        {
          id: 'braun-sk4-ai',
          title: 'Braun SK4 唱机 "白雪公主之棺"',
          subtitle: 'AI Native High-End Render',
          coverImage: '/assets/aesthetics/braun_record_player_1784775414036.jpg',
          discColor: '#1e293b',
          description: '基于 Dieter Rams 原则的纯白亚克力极限功能主义重构图。',
          year: '1956',
          tags: ['AI定制', '功能主义', '极简白']
        },
        {
          id: 'braun-et66-ai',
          title: 'Braun ET66 计算器',
          subtitle: 'AI Native Macro Render',
          coverImage: '/assets/aesthetics/braun_calculator_1784775422078.jpg',
          discColor: '#1e293b',
          description: '经典圆柱按键与极致理性的色彩编码设计。',
          year: '1987',
          tags: ['AI定制', 'ET66', '理性设计']
        },
        {
          id: 'braun-clock-ai',
          title: 'Braun 极简模拟挂钟',
          subtitle: 'AI Native Studio Render',
          coverImage: '/assets/aesthetics/braun_wall_clock_1784775432486.jpg',
          discColor: '#1e293b',
          description: '绝对留白的表盘与无感情的极粗指针。',
          year: '1970s',
          tags: ['AI定制', '模拟钟表', '留白']
        }
      ]
    },
    {
      id: '70-spaceage',
      decadeId: '1970',
      name: '太空时代复古未来主义',
      nameEn: 'Space Age Retro-Futurism',
      description: '受人类登月启发，流行圆润塑料曲面、球体与圆顶居所的历史印记。',
      primaryColor: '#e11d48',
      accentColor: '#fb7185',
      records: [
        {
          id: 'spaceage-chair-ai',
          title: '潘顿时代红色球形椅',
          subtitle: 'AI Native Photorealism',
          coverImage: '/assets/aesthetics/spaceage_chair_1784775441286.jpg',
          discColor: '#e11d48',
          description: '复古未来的高光红塑料与流线型有机曲线。',
          year: '1970s',
          tags: ['AI定制', '太空球体', '波普塑料']
        },
        {
          id: 'spaceage-tv-ai',
          title: '球形罩复古未来电视',
          subtitle: 'AI Native Photorealism',
          coverImage: '/assets/aesthetics/spaceage_tv_1784775450739.jpg',
          discColor: '#e11d48',
          description: '70年代典型乌托邦设计，拥有如同太空头盔般的球形气泡屏幕。',
          year: '1970s',
          tags: ['AI定制', '太空泡泡', '乌托邦']
        },
        {
          id: 'spaceage-capsule-ai',
          title: '太空城胶囊座舱',
          subtitle: 'AI Native Architecture',
          coverImage: '/assets/aesthetics/spaceage_capsule_1784775460800.jpg',
          discColor: '#e11d48',
          description: '用玻璃纤维打造的飞碟状乌托邦胶囊生活舱内饰。',
          year: '1970s',
          tags: ['AI定制', '太空舱', '未来生活']
        }
      ]
    },
    {
      id: '70-groovy',
      decadeId: '1970',
      name: '70s 自由有机大地色波浪',
      nameEn: 'Groovy Organic Warm Wave',
      description: '嬉皮士文化下诞生的有机木作与温暖的大地色系真品。',
      primaryColor: '#ea580c',
      accentColor: '#f97316',
      records: [
        {
          id: 'groovy-desk-ai',
          title: '70s 有机流线实木案几',
          subtitle: 'AI Native Interior Render',
          coverImage: '/assets/aesthetics/groovy_desk_1784854875474.jpg',
          discColor: '#ea580c',
          description: '融合大地暖棕色调与波浪曲面实木的70年代中世纪现代经典家具。',
          year: '1974',
          tags: ['AI定制', '有机波浪', '大地色系']
        },
        {
          id: 'groovy-lamp-ai',
          title: '70s 弧形暖光台灯',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/groovy_lamp_custom.jpg',
          discColor: '#ea580c',
          description: '具有柔和暖橙色氛围与波浪形底座的中世纪台灯艺术。',
          year: '1976',
          tags: ['GPT2定制', '暖光台灯', '复古中世纪']
        },
        {
          id: 'groovy-room-ai',
          title: '70s 有机弧形沙发展厅',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/groovy_room_custom.jpg',
          discColor: '#ea580c',
          description: '充满天鹅绒质感与温暖大地色系的有轨流线型客厅布局。',
          year: '1978',
          tags: ['GPT2定制', '天鹅绒空间', '70s客厅']
        }
      ]
    }
  ],
  '1980': [
    {
      id: '80-memphis',
      decadeId: '1980',
      name: '孟菲斯后现代主义',
      nameEn: 'Memphis Group Postmodernism',
      description: '埃托雷·索特萨斯为首的米兰集团，极繁撞色与非对称几何的实物珍藏。',
      primaryColor: '#ec4899',
      accentColor: '#f472b6',
      records: [
        {
          id: 'memphis-bookshelf-ai',
          title: '孟菲斯撞色怪诞书架',
          subtitle: 'AI Native Studio Render',
          coverImage: '/assets/aesthetics/memphis_bookshelf_1784775468187.jpg',
          discColor: '#ec4899',
          description: 'Sottsass 风格的层压塑料，挑战包豪斯规则的绝对疯狂几何组合。',
          year: '1981',
          tags: ['AI定制', '后现代', '反叛色彩']
        },
        {
          id: 'memphis-lamp-ai',
          title: '疯狂异形台灯',
          subtitle: 'AI Native Studio Render',
          coverImage: '/assets/aesthetics/memphis_lamp_1784775478450.jpg',
          discColor: '#ec4899',
          description: '带有鸟类形体的抽象灯具拼贴，充满后现代的戏谑与乖张。',
          year: '1980s',
          tags: ['AI定制', '戏谑拼贴', '异形灯具']
        },
        {
          id: 'memphis-abstract-ai',
          title: '孟菲斯 3D 几何基底',
          subtitle: 'AI Native Abstract Art',
          coverImage: '/assets/aesthetics/memphis_abstract_1784775486606.jpg',
          discColor: '#ec4899',
          description: '由折线、波浪与马卡龙色彩球体共同构筑的 3D 孟菲斯狂欢。',
          year: '1980s',
          tags: ['AI定制', '抽象几何', '极繁主义']
        }
      ]
    },
    {
      id: '80-pixel',
      decadeId: '1980',
      name: '8-Bit 像素与街机艺术',
      nameEn: '8-Bit Pixel Arcade Art',
      description: '红白机 NES 与街机等真实数字娱乐硬件文物。',
      primaryColor: '#06b6d4',
      accentColor: '#22d3ee',
      records: [
        {
          id: 'pixel-arcade-ai',
          title: '8-Bit 霓虹街机框体',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/pixel_arcade_custom.jpg',
          discColor: '#06b6d4',
          description: '沉浸于暗色游戏厅中的发光像素屏幕与发光摇杆街机框体。',
          year: '1983',
          tags: ['GPT2定制', '街机框体', '像素霓虹']
        },
        {
          id: 'pixel-gameboy-ai',
          title: 'Game Boy 经典的灰黄像素屏',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/pixel_gameboy_custom.jpg',
          discColor: '#06b6d4',
          description: '改变便携娱乐历史的掌机与复古桌面写实。',
          year: '1989',
          tags: ['GPT2定制', 'GameBoy', '掌机怀旧']
        },
        {
          id: 'synthwave-car-ref',
          title: '80s 像素赛博跑车',
          subtitle: 'AI Native Retrowave Render',
          coverImage: '/assets/aesthetics/synthwave_car_1784854885999.jpg',
          discColor: '#06b6d4',
          description: '极具 80s 像素游戏氛围的夜色跑车与霓虹地平线。',
          year: '1987',
          tags: ['AI定制', '赛博跑车', '像素格调']
        }
      ]
    },
    {
      id: '80-synthwave',
      decadeId: '1980',
      name: '霓虹赛博浪潮 (Synthwave)',
      nameEn: 'Neon Synthwave & Retrowave',
      description: '合成器流行乐与80年代霓虹夜色与跑车网格。',
      primaryColor: '#8b5cf6',
      accentColor: '#a855f7',
      records: [
        {
          id: 'synthwave-car-ai',
          title: '网格公路与霓虹夕阳跑车',
          subtitle: 'AI Native Retrowave Render',
          coverImage: '/assets/aesthetics/synthwave_car_1784854885999.jpg',
          discColor: '#8b5cf6',
          description: '极具 80s 赛博浪潮意味的紫粉线框网格与复古跑车剪影。',
          year: '1984',
          tags: ['AI定制', '霓虹网格', '赛博浪潮']
        },
        {
          id: 'synthwave-walkman-ai',
          title: '80s 霓虹闪耀随身听',
          subtitle: 'AI Native Macro Render',
          coverImage: '/assets/aesthetics/synthwave_walkman_1784854894028.jpg',
          discColor: '#8b5cf6',
          description: '合成器音乐黄金时代的卡带机随身听与霓虹高光照耀。',
          year: '1983',
          tags: ['AI定制', '磁带随身听', '霓虹夜光']
        },
        {
          id: 'synthwave-grid-ai',
          title: '赛博发光线框地平线',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/synthwave_grid_custom.jpg',
          discColor: '#8b5cf6',
          description: '无限延展的紫粉线框地平线与巨大数字太阳，合成器浪潮经典意象。',
          year: '1986',
          tags: ['GPT2定制', '线框地平线', '数字太阳']
        }
      ]
    }
  ],
  '1990': [
    {
      id: '90-grunge',
      decadeId: '1990',
      name: 'Ray Gun 解构摇滚排版',
      nameEn: 'Ray Gun Grunge Typography',
      description: '大卫·卡森主导的破坏性、无序的摇滚排版实体。',
      primaryColor: '#ef4444',
      accentColor: '#f87171',
      records: [
        {
          id: 'grunge-poster-ai',
          title: 'Ray Gun 解构主义破损海报',
          subtitle: 'AI Native Typography Render',
          coverImage: '/assets/aesthetics/grunge_poster_1784854902493.jpg',
          discColor: '#ef4444',
          description: 'David Carson 风格的撕裂纸张、扭曲无序字体与暗红胶片质感。',
          year: '1992',
          tags: ['AI定制', '解构主义', 'Grunge排版']
        },
        {
          id: 'grunge-cd-ai',
          title: '90s 摇滚破损 CD 盒封套',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/grunge_cd_custom.jpg',
          discColor: '#ef4444',
          description: '带有划痕亚克力盒与撕裂纸张排版的 90s 解构摇滚唱片。',
          year: '1994',
          tags: ['GPT2定制', '摇滚唱片', '划痕质感']
        },
        {
          id: 'grunge-type-ai',
          title: '实验扭曲文字拼贴艺术',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/grunge_type_custom.jpg',
          discColor: '#ef4444',
          description: '破坏字体规范的暗色无序文字与脏旧胶片纹理。',
          year: '1995',
          tags: ['GPT2定制', '文字拼贴', '实验排版']
        }
      ]
    },
    {
      id: '90-y2k',
      decadeId: '1990',
      name: 'Y2K 科技与 iMac G3 果冻感',
      nameEn: 'Y2K Cyber Gel & Translucent Art',
      description: '千禧年到来之际的半透明水果色软胶与金属光泽。',
      primaryColor: '#0ea5e9',
      accentColor: '#38bdf8',
      records: [
        {
          id: 'y2k-monitor-ai',
          title: '果冻蓝半透明显示器',
          subtitle: 'AI Native Tech Render',
          coverImage: '/assets/aesthetics/y2k_monitor_1784775504600.jpg',
          discColor: '#0ea5e9',
          description: '极致光泽的邦迪蓝果冻塑料外壳，透视内部主板的千禧年赛博美学。',
          year: '1999',
          tags: ['AI定制', '半透明', 'Y2K果冻']
        },
        {
          id: 'y2k-chair-ai',
          title: '千禧年银紫充气椅',
          subtitle: 'AI Native Tech Render',
          coverImage: '/assets/aesthetics/y2k_chair_1784775512651.jpg',
          discColor: '#0ea5e9',
          description: '具有高反光金属与闪耀半透明紫色的赛博波普充气家具。',
          year: '2000',
          tags: ['AI定制', '充气塑料', '千禧狂潮']
        },
        {
          id: 'y2k-abstract-ai',
          title: '液态金属与青色软胶混沌',
          subtitle: 'AI Native 3D Abstract',
          coverImage: '/assets/aesthetics/y2k_abstract_1784775521359.jpg',
          discColor: '#0ea5e9',
          description: '反映当时数码洪流与科技乐观主义的高光液态铬金属。',
          year: '1999',
          tags: ['AI定制', '液态铬金属', '数码混沌']
        }
      ]
    },
    {
      id: '90-acid',
      decadeId: '1990',
      name: '酸性平面与数码混沌',
      nameEn: 'Acid Graphic Digital Chaos',
      description: '实验艺术的扭曲金属液态与 3D 错位。',
      primaryColor: '#84cc16',
      accentColor: '#a3e635',
      records: [
        {
          id: 'acid-liquid-ai',
          title: '液态铬金属雕塑',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/acid_liquid_custom.jpg',
          discColor: '#84cc16',
          description: '具有虹彩光泽的流体液态铬与三维扭曲金属形态。',
          year: '1997',
          tags: ['GPT2定制', '液态铬', '酸性视觉']
        },
        {
          id: 'acid-poster-ai',
          title: '电音派对 3D 酸性海报',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/acid_poster_custom.jpg',
          discColor: '#84cc16',
          description: '荧光绿与高对比黑调下的液态文字与 3D 错位错觉。',
          year: '1998',
          tags: ['GPT2定制', '酸性海报', '电音派对']
        },
        {
          id: 'acid-abstract-ref',
          title: '数码混沌与金属液态视觉',
          subtitle: 'AI Native 3D Abstract',
          coverImage: '/assets/aesthetics/y2k_abstract_1784775521359.jpg',
          discColor: '#84cc16',
          description: '90年代酸性电音视觉代表，高反光金属与流动液态。',
          year: '1996',
          tags: ['AI定制', '酸性混沌', '3D金属']
        }
      ]
    }
  ],
  '2000': [
    {
      id: '00-aqua',
      decadeId: '2000',
      name: 'Apple Aqua UI 水滴水晶玻璃',
      nameEn: 'Apple Aqua UI Glassmorphism',
      description: '极度细腻的高光玻璃、反光与凝胶感，降低系统距离感。',
      primaryColor: '#3b82f6',
      accentColor: '#60a5fa',
      records: [
        {
          id: 'aqua-cube-ai',
          title: 'Aqua UI 悬浮透明立方体',
          subtitle: 'AI Native Glass Render',
          coverImage: '/assets/aesthetics/aqua_cube_1784854914755.jpg',
          discColor: '#3b82f6',
          description: '高透明度亚克力与精致水滴凝胶光效，早期 macOS Aqua 时代的代表性硬件美学。',
          year: '2001',
          tags: ['AI定制', 'Aqua水滴', '透明水晶']
        },
        {
          id: 'aqua-mac-ai',
          title: '透明亚克力 Mac G4 Cube 晶体',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/aqua_mac_custom.jpg',
          discColor: '#3b82f6',
          description: '晶莹通透的水晶机身与悬浮感工作室写实。',
          year: '2000',
          tags: ['GPT2定制', 'G4Cube', '亚克力透明']
        },
        {
          id: 'aqua-ui-ai',
          title: 'Aqua 水凝胶按钮控件组',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/aqua_ui_custom.jpg',
          discColor: '#3b82f6',
          description: '极具高光反射与半透明啫喱感的水滴状系统控件。',
          year: '2001',
          tags: ['GPT2定制', '水凝胶按钮', '高光玻璃']
        }
      ]
    },
    {
      id: '00-skeuo',
      decadeId: '2000',
      name: '拟物化皮革与镀铬金属',
      nameEn: 'Skeuomorphic Leather & Metal',
      description: '物理世界的皮革缝线、指南针铜框与纸张真实还原设备。',
      primaryColor: '#b45309',
      accentColor: '#d97706',
      records: [
        {
          id: 'skeuo-leather-ai',
          title: '缝线皮革与拉丝铝合金微距',
          subtitle: 'AI Native Skeuomorphic Render',
          coverImage: '/assets/aesthetics/skeuomorphic_leather_1784854960760.jpg',
          discColor: '#b45309',
          description: '极富触感的棕色缝线皮革纹理与机械金属按钮，真实拟物化隐喻巅峰。',
          year: '2007',
          tags: ['AI定制', '缝线皮革', '拟物化']
        },
        {
          id: 'skeuo-compass-ai',
          title: '黄铜指南针物理控件',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/skeuo_compass_custom.jpg',
          discColor: '#b45309',
          description: '带有黄铜外框、触感玻璃反光与皮革底座的经典指南针拟物部件。',
          year: '2008',
          tags: ['GPT2定制', '黄铜指南针', '触感UI']
        },
        {
          id: 'skeuo-notepad-ai',
          title: '缝线皮套黄纸记事本',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/skeuo_notepad_custom.jpg',
          discColor: '#b45309',
          description: '还原真实物理信纸纹理、便签撕痕与皮革封皮的便签应用拟物隐喻。',
          year: '2009',
          tags: ['GPT2定制', '信纸便签', '物理隐喻']
        }
      ]
    },
    {
      id: '00-aero',
      decadeId: '2000',
      name: 'Frutiger Aero 自然光感',
      nameEn: 'Frutiger Aero Glass & Bio',
      description: '清澈蓝天、水滴气泡与光纤的优雅生态美学。',
      primaryColor: '#0284c7',
      accentColor: '#38bdf8',
      records: [
        {
          id: 'aero-sphere-ai',
          title: '水晶悬浮水滴球',
          subtitle: 'AI Native 3D Environment',
          coverImage: '/assets/aesthetics/aero_sphere_1784775529852.jpg',
          discColor: '#0284c7',
          description: '折射着蓝天、阳光与绿草的剔透高光玻璃球，完美诠释 Frutiger Aero 乌托邦。',
          year: '2006',
          tags: ['AI定制', '水滴', '清澈生态']
        },
        {
          id: 'aero-fish-ai',
          title: '蓝天水球与热带鱼生态',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/aero_fish_custom.jpg',
          discColor: '#0284c7',
          description: '在玻璃水球中游动的热带鱼与乐观主义蓝天白云的经典 Frutiger Aero 壁纸。',
          year: '2007',
          tags: ['GPT2定制', '玻璃水球', '生态壁纸']
        },
        {
          id: 'aero-aurora-ai',
          title: '高光极光波浪玻璃',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/aero_aurora_custom.jpg',
          discColor: '#0284c7',
          description: '具有柔和蓝绿极光折射与密集水滴微距的系统高光波浪。',
          year: '2008',
          tags: ['GPT2定制', '极光折射', '高光波浪']
        }
      ]
    }
  ],
  '2010': [
    {
      id: '10-swiss',
      decadeId: '2010',
      name: '瑞士新极简主义与大网格',
      nameEn: 'Swiss Neo-Minimalist Grid',
      description: '强调严谨的版式网格、无衬线字体与绝对留白。',
      primaryColor: '#6366f1',
      accentColor: '#818cf8',
      records: [
        {
          id: 'swiss-poster-ai',
          title: 'Helvetica 瑞士粗体网格海报',
          subtitle: 'AI Native Graphic Design',
          coverImage: '/assets/aesthetics/swiss_poster_1784854928261.jpg',
          discColor: '#6366f1',
          description: '黑红白经典对比、绝对网格排版与大字号 Helvetica 艺术展现。',
          year: '2012',
          tags: ['AI定制', '瑞士排版', 'Helvetica']
        },
        {
          id: 'swiss-grid-ai',
          title: '网格对齐红黑几何版面',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/swiss_grid_custom.jpg',
          discColor: '#6366f1',
          description: '严格遵循三等分网格系统与纯粹红黑几何块的印刷海报。',
          year: '2013',
          tags: ['GPT2定制', '网格系统', '红黑几何']
        },
        {
          id: 'swiss-book-ai',
          title: '极简瑞士设计书籍装帧',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/swiss_book_custom.jpg',
          discColor: '#6366f1',
          description: '在无纯白纸张纹理上通过线条与单字号排版呈现的典雅书籍封面。',
          year: '2014',
          tags: ['GPT2定制', '书籍装帧', '极简留白']
        }
      ]
    },
    {
      id: '10-material',
      decadeId: '2010',
      name: 'Google Material Design 纸层',
      nameEn: 'Google Material Design',
      description: '基于物理纸张叠放与触控动效的极简规范体系。',
      primaryColor: '#10b981',
      accentColor: '#34d399',
      records: [
        {
          id: 'material-card-ai',
          title: 'Material UI 动态悬浮卡片流',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/material_card_custom.jpg',
          discColor: '#10b981',
          description: '鲜艳主色与微润圆角的经典 Android Material 设计卡片 Dashboard。',
          year: '2016',
          tags: ['GPT2定制', '卡片流', 'MaterialUI']
        },
        {
          id: 'material-shadows-ai',
          title: '量子纸张悬浮阴影层级',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/material_shadows_custom.jpg',
          discColor: '#10b981',
          description: '多层具有真实物理海拔阴影（Elevation）的彩色纸张叠加构成。',
          year: '2014',
          tags: ['GPT2定制', '量子纸张', '阴影海拔']
        },
        {
          id: 'swiss-poster-ref',
          title: 'Material 扁平纸张色块海报',
          subtitle: 'AI Native Graphic Design',
          coverImage: '/assets/aesthetics/swiss_poster_1784854928261.jpg',
          discColor: '#10b981',
          description: 'Material 纸张物理隐喻与高对比色彩层级。',
          year: '2015',
          tags: ['AI定制', 'Material纸张', '扁平美学']
        }
      ]
    },
    {
      id: '10-corpmemphis',
      decadeId: '2010',
      name: 'Corporate Memphis 企业极简',
      nameEn: 'Corporate Memphis & Flat Art',
      description: '风靡 Tech 巨头的扁平插画风格，比例拉长的无面人物。',
      primaryColor: '#f59e0b',
      accentColor: '#fbbf24',
      records: [
        {
          id: 'corp-memphis-ai',
          title: 'Corporate Memphis 扁平科技插画',
          subtitle: 'AI Native Illustration',
          coverImage: '/assets/aesthetics/corp_memphis_1784854936318.jpg',
          discColor: '#f59e0b',
          description: '夸张肢体比例、纯色平涂与Tech巨头风靡一时的 Corporate Memphis 风格。',
          year: '2017',
          tags: ['AI定制', '企业极简', '扁平插画']
        },
        {
          id: 'corp-office-ai',
          title: 'Tech 协同办公矢量人物',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/corp_office_custom.jpg',
          discColor: '#f59e0b',
          description: '长肢体蓝黄撞色无面人物在极简科技办公室合作的扁平矢量画面。',
          year: '2018',
          tags: ['GPT2定制', '矢量插画', 'Tech风格']
        },
        {
          id: 'corp-character-ai',
          title: '巨型手机与扁平插画角色',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/corp_character_custom.jpg',
          discColor: '#f59e0b',
          description: '极简马卡龙配色的扁平人物与几何产品微缩交互插图。',
          year: '2019',
          tags: ['GPT2定制', '几何角色', '马卡龙配色']
        }
      ]
    }
  ],
  '2026': [
    {
      id: '26-visionos',
      decadeId: '2026',
      name: 'VisionOS 空间计算沉浮毛玻璃',
      nameEn: 'VisionOS Spatial Glassmorphism',
      description: '悬浮毛玻璃、自然环境光照与眼手微动效的三维真机。',
      primaryColor: '#8b5cf6',
      accentColor: '#c084fc',
      records: [
        {
          id: 'visionos-glass-ai',
          title: 'VisionOS 悬浮磨砂玻璃界面',
          subtitle: 'AI Native 3D Spatial Render',
          coverImage: '/assets/aesthetics/visionos_glass_1784854968761.jpg',
          discColor: '#8b5cf6',
          description: '半透明磨砂毛玻璃面板、立体折射光影与三维空间沉浸式交互视觉。',
          year: '2026',
          tags: ['AI定制', 'VisionOS', '空间玻璃']
        },
        {
          id: 'visionos-headset-ai',
          title: '曲面 3D 玻璃 Vision 头显',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/visionos_headset_custom.jpg',
          discColor: '#8b5cf6',
          description: '高质感铝合金与深邃曲面玻璃的空间计算硬件设备工业写真。',
          year: '2024',
          tags: ['GPT2定制', 'Vision头显', '空间计算']
        },
        {
          id: 'visionos-spatial-ai',
          title: '客厅三维空间悬浮多窗口',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/visionos_spatial_custom.jpg',
          discColor: '#8b5cf6',
          description: '与真实物理房间光照融合的多层毛玻璃透明应用卡片沉浸交互。',
          year: '2026',
          tags: ['GPT2定制', '空间多窗口', '环境光感']
        }
      ]
    },
    {
      id: '26-bento',
      decadeId: '2026',
      name: '模块化 Bento Grid 便当盒美学',
      nameEn: 'Modular Bento Grid Architecture',
      description: '日式便当盒分格、圆角卡片与渐变光。',
      primaryColor: '#06b6d4',
      accentColor: '#67e8f9',
      records: [
        {
          id: 'bento-grid-ai',
          title: '2026 模块化 Bento Grid 仪表盘',
          subtitle: 'AI Native UI Architecture',
          coverImage: '/assets/aesthetics/bento_grid_1784854945025.jpg',
          discColor: '#06b6d4',
          description: '极致大圆角卡片分格、柔和渐变与现代化便当盒模块架构。',
          year: '2026',
          tags: ['AI定制', 'BentoGrid', '便当盒']
        },
        {
          id: 'bento-mobile-ai',
          title: '移动端 Bento 便当盒卡片流',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/bento_mobile_custom.jpg',
          discColor: '#06b6d4',
          description: '暗色高光下的多规格圆角卡片堆叠与轻量化 Widget 组件。',
          year: '2025',
          tags: ['GPT2定制', '移动Bento', '圆角组件']
        },
        {
          id: 'bento-widget-ai',
          title: '桌面端微型 Bento 部件库',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/bento_widget_custom.jpg',
          discColor: '#06b6d4',
          description: '结合磨砂透明质感与极简微调光效的便当盒数据模块。',
          year: '2026',
          tags: ['GPT2定制', '桌面Widget', '数据模块']
        }
      ]
    },
    {
      id: '26-neobrutalism',
      decadeId: '2026',
      name: '新粗糙主义与 AI 意图流 UI',
      nameEn: 'Neo-Brutalism & Intent-Driven UI',
      description: '粗边框硬质阴影 (Neo-Brutalism) 与多模态 AI。',
      primaryColor: '#f43f5e',
      accentColor: '#fb7185',
      records: [
        {
          id: 'neo-brutalism-ai',
          title: 'Neo-Brutalism 粗黑边实阴影界面',
          subtitle: 'AI Native Raw UI Render',
          coverImage: '/assets/aesthetics/neo_brutalism_1784854952924.jpg',
          discColor: '#f43f5e',
          description: '极粗黑边框、硬核固体投影与高对比鲜艳潮牌 Web UI。',
          year: '2026',
          tags: ['AI定制', '新粗糙主义', '硬阴影']
        },
        {
          id: 'neo-button-ai',
          title: '粗线条明黄粗糙按钮部件',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/neo_button_custom.jpg',
          discColor: '#f43f5e',
          description: '充满反叛味道的明黄底色、纯黑实线与粗暴立体投影按钮。',
          year: '2025',
          tags: ['GPT2定制', '粗线条按钮', '固体阴影']
        },
        {
          id: 'neo-poster-ai',
          title: '新粗糙主义贴纸海报视觉',
          subtitle: 'OpenAI gpt-image-2 Native',
          coverImage: '/assets/aesthetics/neo_poster_custom.jpg',
          discColor: '#f43f5e',
          description: '结合高饱和度粉黄对比与黑体粗字号的物理贴纸波普风。',
          year: '2026',
          tags: ['GPT2定制', '贴纸海报', '潮牌视觉']
        }
      ]
    }
  ]
};
