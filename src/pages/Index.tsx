import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type Section = 'home' | 'test' | 'results' | 'about';

interface Question {
  id: number;
  question: string;
  options: { text: string; scores: Record<string, number> }[];
}

interface Career {
  name: string;
  description: string;
  exams: string[];
  universities: string[];
  salary: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Что тебе больше нравится делать?',
    options: [
      { text: 'Работать с людьми и помогать им', scores: { medical: 3, education: 3, social: 2 } },
      { text: 'Создавать что-то новое', scores: { tech: 3, creative: 3, engineering: 2 } },
      { text: 'Анализировать данные и цифры', scores: { analytics: 3, finance: 2, tech: 2 } },
      { text: 'Работать на природе', scores: { ecology: 3, geology: 2 } }
    ]
  },
  {
    id: 2,
    question: 'Какие предметы тебе легче даются?',
    options: [
      { text: 'Математика и физика', scores: { tech: 3, engineering: 3, analytics: 2 } },
      { text: 'Биология и химия', scores: { medical: 3, ecology: 2, geology: 2 } },
      { text: 'Литература и история', scores: { education: 2, social: 2, creative: 2 } },
      { text: 'Информатика', scores: { tech: 3, analytics: 2 } }
    ]
  },
  {
    id: 3,
    question: 'Каким ты видишь свой рабочий день?',
    options: [
      { text: 'В офисе за компьютером', scores: { tech: 3, analytics: 2, finance: 2 } },
      { text: 'В движении, общаясь с людьми', scores: { social: 3, education: 2 } },
      { text: 'В лаборатории или на производстве', scores: { engineering: 3, medical: 2 } },
      { text: 'В поле или экспедиции', scores: { geology: 3, ecology: 2 } }
    ]
  },
  {
    id: 4,
    question: 'Что тебя мотивирует?',
    options: [
      { text: 'Высокая зарплата', scores: { tech: 2, finance: 3, engineering: 2 } },
      { text: 'Помощь людям', scores: { medical: 3, social: 3, education: 2 } },
      { text: 'Творческая свобода', scores: { creative: 3, tech: 1 } },
      { text: 'Престиж профессии', scores: { finance: 2, medical: 2 } }
    ]
  },
  {
    id: 5,
    question: 'Твой подход к решению задач:',
    options: [
      { text: 'Логика и системность', scores: { tech: 3, analytics: 3, engineering: 2 } },
      { text: 'Интуиция и творчество', scores: { creative: 3, social: 2 } },
      { text: 'Эксперимент и практика', scores: { engineering: 3, ecology: 2 } },
      { text: 'Общение и сотрудничество', scores: { social: 3, education: 2 } }
    ]
  },
  {
    id: 6,
    question: 'Как ты относишься к технологиям?',
    options: [
      { text: 'Обожаю, слежу за новинками', scores: { tech: 3, engineering: 2 } },
      { text: 'Использую для работы', scores: { analytics: 2, finance: 2, education: 1 } },
      { text: 'Предпочитаю живое общение', scores: { social: 2, medical: 2 } },
      { text: 'Интересуюсь, но не зацикливаюсь', scores: { creative: 1, ecology: 1 } }
    ]
  },
  {
    id: 7,
    question: 'Что важнее для тебя?',
    options: [
      { text: 'Стабильность и безопасность', scores: { medical: 2, education: 2, finance: 2 } },
      { text: 'Возможность роста', scores: { tech: 3, finance: 2 } },
      { text: 'Смысл работы', scores: { social: 3, ecology: 2, medical: 2 } },
      { text: 'Интересные задачи', scores: { tech: 2, creative: 2, engineering: 2 } }
    ]
  },
  {
    id: 8,
    question: 'Какая работа тебя пугает меньше?',
    options: [
      { text: 'Рутинная, но понятная', scores: { analytics: 2, finance: 2 } },
      { text: 'Непредсказуемая, но интересная', scores: { creative: 3, social: 2 } },
      { text: 'Физически сложная', scores: { engineering: 2, geology: 2, ecology: 2 } },
      { text: 'С большой ответственностью', scores: { medical: 3, finance: 2 } }
    ]
  },
  {
    id: 9,
    question: 'Где ты хочешь работать?',
    options: [
      { text: 'В крупной компании', scores: { tech: 2, finance: 2, engineering: 2 } },
      { text: 'В госструктуре или НКО', scores: { social: 3, education: 2, ecology: 2 } },
      { text: 'Фриланс или свой бизнес', scores: { creative: 3, tech: 2 } },
      { text: 'В научной или медицинской сфере', scores: { medical: 3, geology: 2 } }
    ]
  },
  {
    id: 10,
    question: 'Что тебе нравится на Урале?',
    options: [
      { text: 'Промышленность и заводы', scores: { engineering: 3, tech: 2 } },
      { text: 'Природа и горы', scores: { ecology: 3, geology: 3 } },
      { text: 'Города и люди', scores: { social: 2, education: 2, creative: 2 } },
      { text: 'Развитие технологий', scores: { tech: 3, analytics: 2 } }
    ]
  }
];

const careers: Record<string, Career> = {
  tech: {
    name: 'IT-специалист',
    description: 'Разработка программ, веб-сайтов, мобильных приложений. Урал активно развивает IT-кластеры.',
    exams: ['Математика', 'Информатика', 'Русский язык'],
    universities: ['УрФУ (Уральский федеральный университет)', 'УрГЭУ', 'УрГУПС', 'УРГУПС'],
    salary: '80 000 - 250 000 ₽'
  },
  medical: {
    name: 'Врач',
    description: 'Лечение людей, диагностика, профилактика. Уральская медицина — одна из сильнейших в России.',
    exams: ['Биология', 'Химия', 'Русский язык'],
    universities: ['УГМУ (Уральский государственный медицинский университет)', 'ЮУрГМУ'],
    salary: '60 000 - 200 000 ₽'
  },
  engineering: {
    name: 'Инженер',
    description: 'Проектирование машин, оборудования, строительство. Урал — промышленное сердце России.',
    exams: ['Математика', 'Физика', 'Русский язык'],
    universities: ['УрФУ', 'УГТУ-УПИ', 'ЮУрГУ', 'ПНИПУ (Пермь)'],
    salary: '70 000 - 180 000 ₽'
  },
  ecology: {
    name: 'Эколог',
    description: 'Охрана природы, мониторинг окружающей среды. Урал нуждается в защите своих лесов и гор.',
    exams: ['Биология', 'География', 'Русский язык'],
    universities: ['УрФУ', 'УГЛТУ (Уральский государственный лесотехнический университет)'],
    salary: '50 000 - 120 000 ₽'
  },
  geology: {
    name: 'Геолог',
    description: 'Изучение недр, поиск полезных ископаемых. Уральские горы — кладезь минералов.',
    exams: ['Математика', 'География', 'Русский язык'],
    universities: ['УрФУ (геологический факультет)', 'УГГУ (Уральский горный университет)'],
    salary: '70 000 - 200 000 ₽'
  },
  analytics: {
    name: 'Аналитик данных',
    description: 'Работа с большими данными, прогнозирование, бизнес-аналитика.',
    exams: ['Математика', 'Информатика', 'Русский язык'],
    universities: ['УрФУ', 'УрГЭУ', 'ВШЭ (филиал в Перми)'],
    salary: '80 000 - 220 000 ₽'
  },
  finance: {
    name: 'Финансист',
    description: 'Управление деньгами, инвестиции, бухгалтерия.',
    exams: ['Математика', 'Обществознание', 'Русский язык'],
    universities: ['УрГЭУ', 'УрФУ (экономический институт)', 'ПГНИУ'],
    salary: '60 000 - 200 000 ₽'
  },
  education: {
    name: 'Педагог',
    description: 'Обучение детей и взрослых, передача знаний.',
    exams: ['Русский язык', 'Обществознание', 'Профильный предмет'],
    universities: ['УрГПУ (Уральский государственный педагогический университет)', 'ПГГПУ'],
    salary: '40 000 - 100 000 ₽'
  },
  social: {
    name: 'Социальный работник',
    description: 'Помощь людям в трудных ситуациях, волонтёрство, HR.',
    exams: ['Обществознание', 'Русский язык', 'История'],
    universities: ['УрГПУ', 'УрФУ (институт социальных наук)'],
    salary: '40 000 - 90 000 ₽'
  },
  creative: {
    name: 'Креативный специалист',
    description: 'Дизайн, реклама, контент, SMM.',
    exams: ['Русский язык', 'Литература', 'Творческий конкурс'],
    universities: ['УрГАХУ (архитектура и искусство)', 'УрФУ (журналистика)'],
    salary: '50 000 - 180 000 ₽'
  }
};

export default function Index() {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [resultCareer, setResultCareer] = useState<Career | null>(null);

  const handleStartTest = () => {
    setCurrentSection('test');
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
      setCurrentSection('results');
    }
  };

  const calculateResult = (finalAnswers: number[]) => {
    const scores: Record<string, number> = {};
    
    finalAnswers.forEach((answerIndex, questionIndex) => {
      const question = questions[questionIndex];
      const selectedOption = question.options[answerIndex];
      
      Object.entries(selectedOption.scores).forEach(([career, score]) => {
        scores[career] = (scores[career] || 0) + score;
      });
    });

    const topCareer = Object.entries(scores).sort(([, a], [, b]) => b - a)[0][0];
    setResultCareer(careers[topCareer]);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-orange-50">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">ПрофНавигатор Урала</h1>
          <div className="flex gap-6">
            <button onClick={() => setCurrentSection('home')} className="hover:text-primary transition-colors">Главная</button>
            <button onClick={() => setCurrentSection('about')} className="hover:text-primary transition-colors">О проекте</button>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {currentSection === 'home' && (
          <section className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="mb-8 animate-float">
                <span className="text-8xl">🎯</span>
              </div>
              <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Найди свою профессию будущего
              </h2>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                Пройди тест из 10 вопросов и узнай, какая профессия подходит тебе на Урале. Получи список экзаменов и вузов!
              </p>
              <Button 
                onClick={handleStartTest}
                size="lg"
                className="text-lg px-12 py-6 rounded-2xl bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all"
              >
                Начать тест
                <Icon name="ArrowRight" className="ml-2" />
              </Button>

              <div className="grid md:grid-cols-3 gap-8 mt-20">
                <Card className="p-8 border-2 hover:border-primary transition-all transform hover:-translate-y-2 rounded-3xl bg-white/60 backdrop-blur">
                  <div className="text-5xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold mb-2">Быстро</h3>
                  <p className="text-gray-600">Всего 10 вопросов — 3 минуты твоего времени</p>
                </Card>
                <Card className="p-8 border-2 hover:border-secondary transition-all transform hover:-translate-y-2 rounded-3xl bg-white/60 backdrop-blur">
                  <div className="text-5xl mb-4">🎓</div>
                  <h3 className="text-xl font-bold mb-2">Точно</h3>
                  <p className="text-gray-600">Актуальная информация о вузах Урала</p>
                </Card>
                <Card className="p-8 border-2 hover:border-accent transition-all transform hover:-translate-y-2 rounded-3xl bg-white/60 backdrop-blur">
                  <div className="text-5xl mb-4">💼</div>
                  <h3 className="text-xl font-bold mb-2">Практично</h3>
                  <p className="text-gray-600">Зарплаты и перспективы профессий</p>
                </Card>
              </div>
            </div>
          </section>
        )}

        {currentSection === 'test' && (
          <section className="container mx-auto px-4 py-20">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span>Вопрос {currentQuestion + 1} из {questions.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>

              <Card className="p-12 rounded-3xl shadow-2xl bg-white/80 backdrop-blur animate-fade-in border-2 border-primary/20">
                <h3 className="text-3xl font-bold mb-8 text-center">
                  {questions[currentQuestion].question}
                </h3>
                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      className="w-full p-6 text-left rounded-2xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all transform hover:scale-105 hover:-translate-x-2 bg-white"
                    >
                      <span className="text-lg">{option.text}</span>
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </section>
        )}

        {currentSection === 'results' && resultCareer && (
          <section className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <div className="text-center mb-12">
                <div className="text-8xl mb-6 animate-float">🎉</div>
                <h2 className="text-5xl font-bold mb-4">Твоя профессия:</h2>
                <h3 className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {resultCareer.name}
                </h3>
              </div>

              <Card className="p-10 rounded-3xl shadow-2xl mb-8 bg-white/80 backdrop-blur border-2 border-primary/20">
                <p className="text-xl text-gray-700 mb-8">{resultCareer.description}</p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-2xl font-bold mb-4 flex items-center">
                      <Icon name="BookOpen" className="mr-2 text-primary" />
                      Что сдавать (ЕГЭ)
                    </h4>
                    <ul className="space-y-2">
                      {resultCareer.exams.map((exam, i) => (
                        <li key={i} className="flex items-center text-lg">
                          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-primary font-bold">
                            {i + 1}
                          </span>
                          {exam}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold mb-4 flex items-center">
                      <Icon name="GraduationCap" className="mr-2 text-secondary" />
                      Куда поступать
                    </h4>
                    <ul className="space-y-3">
                      {resultCareer.universities.map((uni, i) => (
                        <li key={i} className="text-lg bg-secondary/10 p-3 rounded-xl">
                          {uni}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl">
                  <h4 className="text-2xl font-bold mb-2 flex items-center">
                    <Icon name="Wallet" className="mr-2 text-accent" />
                    Зарплата на Урале
                  </h4>
                  <p className="text-3xl font-bold text-accent">{resultCareer.salary}</p>
                </div>
              </Card>

              <div className="flex gap-4 justify-center">
                <Button onClick={handleStartTest} size="lg" className="rounded-2xl">
                  <Icon name="RotateCcw" className="mr-2" />
                  Пройти ещё раз
                </Button>
                <Button onClick={() => setCurrentSection('home')} variant="outline" size="lg" className="rounded-2xl">
                  На главную
                </Button>
              </div>
            </div>
          </section>
        )}

        {currentSection === 'about' && (
          <section className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h2 className="text-5xl font-bold mb-12 text-center">Профессии Урала: вчера и завтра</h2>
              
              <Card className="p-10 rounded-3xl shadow-xl mb-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20">
                <h3 className="text-3xl font-bold mb-6 flex items-center">
                  <span className="text-5xl mr-4">⚙️</span>
                  Профессии прошлого
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Урал — это промышленное сердце России. Веками здесь работали <strong>металлурги</strong>, <strong>шахтёры</strong>, <strong>заводские рабочие</strong>. 
                  Демидовские заводы, Магнитогорский комбинат, Уралмаш — эти имена вошли в историю.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Уральская промышленность ковала победу в войнах, строила страну. Профессии были тяжёлыми, но уважаемыми. 
                  Сегодня многие из них автоматизированы, но инженерное наследие живёт.
                </p>
              </Card>

              <Card className="p-10 rounded-3xl shadow-xl bg-gradient-to-br from-secondary/5 to-accent/5 border-2 border-secondary/20">
                <h3 className="text-3xl font-bold mb-6 flex items-center">
                  <span className="text-5xl mr-4">🚀</span>
                  Профессии будущего
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Урал не стоит на месте. Сегодня здесь рождаются новые профессии:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl">
                    <h4 className="font-bold text-xl mb-2 text-primary">💻 IT и цифровизация</h4>
                    <p className="text-gray-700">Екатеринбург — IT-столица. Разработчики, дата-сайентисты, кибербезопасники.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl">
                    <h4 className="font-bold text-xl mb-2 text-secondary">🌱 Экология</h4>
                    <p className="text-gray-700">Уральская природа нуждается в защите. Экологи, урбанисты, специалисты по возобновляемой энергии.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl">
                    <h4 className="font-bold text-xl mb-2 text-accent">🏭 Умное производство</h4>
                    <p className="text-gray-700">Роботизация заводов, промышленный интернет вещей, инженеры нового поколения.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl">
                    <h4 className="font-bold text-xl mb-2 text-primary">🎨 Креатив</h4>
                    <p className="text-gray-700">Дизайнеры, маркетологи, создатели контента — цифровая экономика растёт.</p>
                  </div>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mt-6">
                  Будущее Урала — это синтез традиций и инноваций. Здесь всегда будут нужны умные руки и светлые головы. 
                  Пройди тест и найди свою профессию в этом будущем! 🌟
                </p>
              </Card>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-4">ПрофНавигатор Урала — твой компас в мире профессий</p>
          <p className="text-gray-400">Данные о зарплатах и вузах актуальны на 2026 год</p>
        </div>
      </footer>
    </div>
  );
}
