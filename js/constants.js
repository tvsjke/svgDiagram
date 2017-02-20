const data = [
	{
		bottomText: ['Начало работы'],
		backgroundColor: '#6bb6fe',
		circles: [
			{
				size: 80,
				offset: {
					x: 10,
					y: 380
				},	
				middleText: 2,
				topLineHeightRate: 0.8,
				performers: [0, 3],
				topText: ['Брифинг']
			},
			{
				size: 90,
				offset: {
					x: 60,
					y: 360
				},
				middleText: 3,
				topLineHeightRate: 1,
				performers: [1],
				performersNames: [
					['Программист']
				],
				lineWidth: 230,
				bottomTooltip: [
					{
						performer: 1,
						text: ['Разработка сценариев показа рекламы']
					}
				],
				topText: ['Разработка', 'рекламной', 'стратегии']
			},
		]
	},
	{
		bottomText: ['Подготовка проекта к', 'рекламной компании'],	
		backgroundColor: '#1e90ff',	
		circles: [
			{
				size: 110,
				offset: {
					x: 200,
					y: 316
				},
				middleText: 5,
				topLineHeightRate: 0.5,
				performers: [0, 3],
				topText: ['Техническая', 'подготовка', 'сайта']
			},
			{
				size: 80,
				offset: {
					x: 266,
					y: 318
				},
				middleText: 2,
				topLineHeightRate: 1.5,
				performers: [0, 3],
				topText: ['Настройка систем', 'веб-аналитики']
			},
			{
				size: 100,
				offset: {
					x: 318,
					y: 300
				},
				middleText: 4,
				topLineHeightRate: 0.3,
				performers: [0, 3],
				topText: ['Настройка', 'отслеживания', 'целевых действий']
			}  
		]
	},
	{
		bottomText: ['Создание и настройка', 'рекламных компаний'],			
		backgroundColor: '#04509a',	
		circles: [
			{
				size: 100,
				offset: {
					x: 466,
					y: 285
				},
				middleText: 4,
				topLineHeightRate: 0.5,
				performers: [0, 3],
				topText: ['Техническая', 'подготовка', 'сайта']
			},
			{
				size: 80,
				offset: {
					x: 528,
					y: 292
				},
				middleText: 2,
				topLineHeightRate: 1.6,
				performers: [0, 3],
				topText: ['Настройка систем', 'веб-аналитики']
			},
			{
				size: 90,
				offset: {
					x: 580,
					y: 282
				},
				middleText: 3,
				topLineHeightRate: 0.3,
				performers: [0, 3],
				topText: ['Настройка', 'отслеживания', 'целевых действий']
			},
			{
				size: 100,
				offset: {
					x: 638,
					y: 278
				},
				middleText: 4,
				topLineHeightRate: 0.9,
				performers: [0, 3],
				topText: ['Техническая', 'подготовка', 'сайта']
			},
			{
				size: 110,
				offset: {
					x: 700,
					y: 274
				},
				middleText: 5,
				topLineHeightRate: 0.4,
				bottomTooltip: [
					{
						performer: 0,
						text: ['Разработка сценариев показа рекламы']
					},
					{
						performer: 3,
						text: ['Составление ТЗ на создание баннеров', 'lol']
					},
					{
						performer: 0,
						text: ['Размещение баннеров, текстовых', 'кек тест']
					},
					{
						performer: 1,
						text: ['Размещение баннеров, текстовых', 'кек тест']
					}
				],
				lineWidth: 230,
				performers: [0, 3, 1],				
				topText: ['Техническая', 'подготовка', 'сайта']
			}
		]		
	},
	{		
		backgroundColor: '#7878f4',
		circles: [
			{
				size: 72,
				offset: {
					x: 890,
					y: 305
				},
				middleText: 'i',
				topLineHeightRate: 1.5,
				bottomTooltip: [
					{
						performer: 0,
						text: ['Разработка сценариев показа рекламы']
					},
					{
						performer: 3,
						text: ['Составление ТЗ на создание баннеров', 'lol']
					},
					{
						performer: 0,
						text: ['Размещение баннеров, текстовых', 'кек тест']
					},
					{
						performer: 0,
						text: ['Размещение баннеров, текстовых', 'кек тест']
					}
				],
				lineWidth: 230,
				performers: [0, 3],
				performersNames: [
					['Специалист по', 'контекстной рекламе'],
					['Дизайнер'],
				],
				topText: ['Поисковый ремаркетинг'],
				explosive: {
					count: 4,
					initialOpacity: 0.3,
					opacityStep: 0.1,
					radiusStep: 20
				}
			}
		]		
	},
	{		
		backgroundColor: '#a1c572',
		circles: [
			{
				size: 72,
				offset: {
					x: 1040,
					y: 325
				},
				middleText: 'i',
				topLineHeightRate: 1.2,
				bottomTooltip: [
					{
						performer: 0,
						text: ['Разработка сценариев показа рекламы']
					},
					{
						performer: 3,
						text: ['Составление ТЗ на создание баннеров', 'lol']
					},
					{
						performer: 0,
						text: ['Размещение баннеров, текстовых', 'кек тест']
					},
					{
						performer: 0,
						text: ['Размещение баннеров, текстовых', 'кек тест']
					}
				],
				reversedText: true,
				lineWidth: 230,
				performers: [0, 3],
				performersNames: [
					['Специалист по', 'контекстной рекламе'],
					['Дизайнер'],
				],
				topText: ['Ведение проекта'],
				explosive: {
					count: 7,
					initialOpacity: 0.3,
					opacityStep: 0.01,
					radiusStep: 10
				}
			}
		]		
	}
]

const performers = [
	{
		name: 'специалист по контекстной рекламе',
		color: '#00a79d'
	},
	{
		name: 'программист',
		color: '#1d75bd'
	},
	{
		name: 'project manager',
		color: '#2b3991'
	},
	{
		name: 'дизайнер',
		color: '#272264'
	}

];