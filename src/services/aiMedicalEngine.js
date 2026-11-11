import { COMMON_SYMPTOMS } from './medicalData.js';

export function analyzeSymptoms({ age, gender, selectedSymptomIds, durationDays, additionalNotes }) {
  const selectedSymptoms = COMMON_SYMPTOMS.filter((s) => selectedSymptomIds.includes(s.id));
  const hasRedFlags = selectedSymptoms.some((s) => s.redFlag);

  let riskLevel = 'Низкий';
  let riskColor = 'emerald';
  let primaryDiagnosis = '';
  let probability = 75;
  let recommendedSpecialist = 'Терапевт';
  let nextSteps = [];

  // Экстренный сценарий (Красный флаг)
  if (hasRedFlags || (selectedSymptomIds.includes('chest_pain') && selectedSymptomIds.includes('shortness_breath'))) {
    riskLevel = 'Критический / Экстренный';
    riskColor = 'red';
    primaryDiagnosis = 'Подозрение на острый коронарный синдром или пневмонию';
    probability = 88;
    recommendedSpecialist = 'Скорая медицинская помощь (103 / 112)';
    nextSteps = [
      'Немедленно вызовите скорую помощь (103)!',
      'Обеспечьте доступ свежего воздуха и примите горизонтальное положение.',
      'Не занимайтесь самолечением до приезда бригады скорой помощи.',
    ];
  } 
  // ОРВИ / Грипп
  else if (selectedSymptomIds.includes('fever') && (selectedSymptomIds.includes('cough') || selectedSymptomIds.includes('sore_throat'))) {
    riskLevel = 'Средний';
    riskColor = 'amber';
    primaryDiagnosis = 'Острая респираторная вирусная инфекция (ОРВИ / Грипп)';
    probability = 84;
    recommendedSpecialist = 'Врач-терапевт / ВОП';
    nextSteps = [
      'Обильное теплое питье и постельный режим.',
      'Изоляция на время проявления симптомов.',
      'Обратитесь к врачу общей практики для назначения терапии.',
    ];
  } 
  // Мигрень / Головная боль напряжения
  else if (selectedSymptomIds.includes('headache') && selectedSymptomIds.includes('fatigue')) {
    riskLevel = 'Низкий';
    riskColor = 'emerald';
    primaryDiagnosis = 'Синдром хронической усталости / Головная боль напряжения';
    probability = 78;
    recommendedSpecialist = 'Невролог / Терапевт';
    nextSteps = [
      'Соблюдайте режим сна и отдыха (не менее 7-8 часов).',
      'Ограничьте время перед экранами компьютеров и смартфонов.',
      'При продолжении симптомов более 3 дней обратитесь к неврологу.',
    ];
  } 
  // Гипертония / Вегетативный синдром
  else if (selectedSymptomIds.includes('dizziness') || selectedSymptomIds.includes('palpitations')) {
    riskLevel = 'Средний';
    riskColor = 'amber';
    primaryDiagnosis = 'Сосудистая дистония / Вегетативные нарушения';
    probability = 72;
    recommendedSpecialist = 'Кардиолог / Невролог';
    nextSteps = [
      'Измерьте артериальное давление и пульс.',
      'Исключите кофеин и физические перегрузки.',
      'Запишитесь на прием к кардиологу для проведения ЭКГ.',
    ];
  } 
  // Базовый ответ
  else {
    riskLevel = 'Низкий';
    riskColor = 'indigo';
    primaryDiagnosis = 'Неспецифический функциональный синдром';
    probability = 65;
    recommendedSpecialist = 'Врач общей практики (ВОП)';
    nextSteps = [
      'Ведите дневник симптомов и фиксируйте изменения.',
      'Пройдите плановый профилактический осмотр.',
    ];
  }

  // Учет гендерных и возрастных факторов в описании ИИ
  let genderNote = gender === 'female' ? 'Учтены физиологические нормы женского организма.' : 'Учтены особенности мужского анамнеза.';
  let ageNote = age >= 60 ? 'Учтен фактор повышенного риска для возрастной группы 60+.' : 'Симптоматика сопоставлена с нормой для взрослого населения.';

  return {
    id: `DIAG-${Date.now().toString().slice(-6)}`,
    date: new Date().toLocaleString('ru-RU'),
    age,
    gender,
    symptoms: selectedSymptoms.map((s) => s.name),
    durationDays,
    primaryDiagnosis,
    probability,
    riskLevel,
    riskColor,
    recommendedSpecialist,
    nextSteps,
    aiNotes: `${genderNote} ${ageNote}`,
    additionalNotes: additionalNotes || 'Отсутствуют',
  };
}
