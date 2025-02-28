let filtredRegion = 'all'; // Глобальная переменная для хранения текущего выбранного региона

const regionsData = [
  { value: 'lenoblast', name: 'Санкт-Петербург и Ленинградская область', shortName: 'Спб и Ленобласть', coordinates: [59.93863, 30.31413] },
  { value: 'krasnodarsky-krai', name: 'Краснодарский край', shortName: 'Краснодарский край', coordinates: [45.04059, 38.97693] },
  { value: 'nizhegorodskaya-oblast', name: 'Нижегородская область', shortName: 'Нижегородская область', coordinates: [56.32867, 44.00205] },
  { value: 'yaroslavskaya-oblast', name: 'Ярославская область', shortName: 'Ярославская область', coordinates: [57.62608, 39.88447] },
  { value: 'moskva', name: 'Москва и Московская область', shortName: 'Мск и Мособласть', coordinates: [55.751244, 37.618423] },
  { value: 'krym', name: 'Республика Крым', shortName: 'Крым', coordinates: [44.95212, 34.10242] },
  { value: 'stavropolsky-krai', name: 'Ставропольский край', shortName: 'Ставрополье', coordinates: [45.04331, 41.9691] },
  { value: 'kabardino-balkariya', name: 'Кабардино-Балкария', shortName: 'Кабардино-Балкария', coordinates: [43.4846, 43.6072] },  
  { value: 'tambovskaya-oblast', name: 'Тамбовская область', shortName: 'Тамбовская область', coordinates: [52.7314, 41.4366] },
  { value: 'kaliningradskaya-oblast', name: 'Калининградская область', shortName: 'Калининградская область', coordinates: [54.710000, 20.500000] },
];

  