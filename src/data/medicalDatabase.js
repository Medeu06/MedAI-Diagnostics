export const SYMPTOMS_LIST = [
  { id: 'fever', name: 'Высокая температура / Жар', category: 'Общие' },
  { id: 'cough', name: 'Кашель (сухой или с мокротой)', category: 'Дыхание' },
  { id: 'fatigue', name: 'Быстрая утомляемость / слабость', category: 'Общие' },
  { id: 'headache', name: 'Головная боль / Мигрень', category: 'Нервная система' },
  { id: 'chest_pain', name: 'Боль или тяжесть в груди', category: 'Сердце и грудь' },
  { id: 'sore_throat', name: 'Боль в горле / першение', category: 'Дыхание' },
  { id: 'shortness_throat', name: 'Одышка / Нехватка воздуха', category: 'Дыхание' },
  { id: 'abdominal_pain', name: 'Боль в животе / Спазмы', category: 'ЖКТ' },
  { id: 'nausea', name: 'Тошнота / Потеря аппетита', category: 'ЖКТ' },
  { id: 'joint_pain', name: 'Боль в суставах или мышцах', category: 'Опорно-двигательная' },
  { id: 'dizziness', name: 'Головокружение / Темнеет в глазах', category: 'Нервная система' },
  { id: 'pelvic_pain', name: 'Дискомфорт в области малого таза', category: 'Специфические' },
];

export const DISEASES_DATABASE = [
  {
    id: 'flu_arvi',
    name: 'ОРВИ / Грипп (Вирусная инфекция)',
    targetGender: 'all',
    minAge: 18,
    requiredSymptoms: ['fever', 'cough', 'fatigue', 'sore_throat'],
    matchThreshold: 2,
    confidence: 88,
    urgency: 'Низкая (Амбулаторное наблюдение)',
    doctor: 'Терапевт / Врач общей практики',
    description: 'Острая респираторная вирусная инфекция верхних дыхательных путей.',
    recommendations: ['Обильное теплое питье', 'Постельный режим', 'Жаропонижающие при t > 38.5°C']
  },
  {
    id: 'covid_pneumonia',
    name: 'Острая пневмония / Коронавирусная инфекция',
    targetGender: 'all',
    minAge: 18,
    requiredSymptoms: ['fever', 'shortness_throat', 'chest_pain', 'cough'],
    matchThreshold: 2,
    confidence: 92,
    urgency: 'Высокая (Требуется осмотр врачом)',
    doctor: 'Пульмонолог / Инфекционист',
    description: 'Воспалительный процесс в легочной ткани с возможным поражением альвеол.',
    recommendations: ['Консультация врача', 'Пульсоксиметрия (проверка сатурации)', 'КТ легких по назначению']
  },
  {
    id: 'migraine_hypertension',
    name: 'Гипертонический криз / Мигрень',
    targetGender: 'all',
    minAge: 18,
    requiredSymptoms: ['headache', 'dizziness', 'fatigue'],
    matchThreshold: 2,
    confidence: 84,
    urgency: 'Средняя (Мониторинг АД)',
    doctor: 'Невролог / Кардиолог',
    description: 'Сосудистые нарушения головного мозга или повышение артериального давления.',
    recommendations: ['Измерение артериального давления', 'Исключить яркий свет и шум', 'Прием назначенного гипотензивного препарата']
  },
  {
    id: 'gastritis_ulcer',
    name: 'Острый гастрит / Синдром раздраженного кишечника',
    targetGender: 'all',
    minAge: 18,
    requiredSymptoms: ['abdominal_pain', 'nausea', 'fatigue'],
    matchThreshold: 2,
    confidence: 81,
    urgency: 'Средняя (Диета и запись на приём)',
    doctor: 'Гастроэнтеролог',
    description: 'Воспаление слизистой оболочки желудка или нарушения работы ЖКТ.',
    recommendations: ['Щадящая диета (стол №1)', 'Исключить острую и жирную пищу', 'Прием антацидов при изжоге']
  },
  {
    id: 'prostatitis_male',
    name: 'Воспаление мочеполовой системы (Мужской профиль)',
    targetGender: 'male',
    minAge: 18,
    requiredSymptoms: ['pelvic_pain', 'fatigue', 'fever'],
    matchThreshold: 1,
    confidence: 86,
    urgency: 'Средняя',
    doctor: 'Уролог',
    description: 'Заболевание органов мужской репродуктивной системы.',
    recommendations: ['Консультация уролога', 'УЗИ органов малого таза', 'Анализ крови и мочи']
  },
  {
    id: 'adnexitis_female',
    name: 'Воспаление органов малого таза (Женский профиль)',
    targetGender: 'female',
    minAge: 18,
    requiredSymptoms: ['pelvic_pain', 'abdominal_pain', 'fever'],
    matchThreshold: 1,
    confidence: 89,
    urgency: 'Средняя (Осмотр гинеколога)',
    doctor: 'Гинеколог',
    description: 'Воспалительный процесс придатков матки или органов малого таза.',
    recommendations: ['Прием гинеколога', 'УЗИ малого таза', 'Покой и тепло']
  }
];

export function analyzeSymptoms({ age, gender, selectedSymptoms }) {
  if (age < 18) {
    return { error: 'Система ИИ-диагностики предназначена только для лиц старше 18 лет.' };
  }

  const results = DISEASES_DATABASE.filter((disease) => {
    if (disease.targetGender !== 'all' && disease.targetGender !== gender) {
      return false;
    }

    const matchedCount = disease.requiredSymptoms.filter((symId) =>
      selectedSymptoms.includes(symId)
    ).length;

    return matchedCount >= disease.matchThreshold;
  });

  return { results };
}
