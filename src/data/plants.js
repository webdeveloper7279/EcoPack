export const plants = [
  {
    id: 'tomato',
    name: 'Pomidor',
    latin: 'Solanum lycopersicum',
    family: 'Solanaceae',
    type: 'Sabzavot o‘simligi',
    image: 'https://www.samdu.uz/upload/cover-images/62c5844cc3f81-62c5844cc3f84-62c5844cc3f85-62c5844cc3f86.png',
    watering: 'Haftasiga 2–3 marta sug‘oring',
    sunlight: 'Kuniga 6–8 soat quyosh nuri',
    soil: 'Hosildor, nam saqlovchi tuproq',
    benefits: ['S vitamini manbai', 'Immunitetni mustahkamlaydi', 'Yurak salomatligi uchun foydali'],
    growth: 0.75
  },
  {
    id: 'cucumber',
    name: 'Bodring',
    latin: 'Cucumis sativus',
    family: 'Cucurbitaceae',
    type: 'Sabzavot o‘simligi',
    image: 'https://api.cabinet.smart-market.uz/uploads/images/ff808181dd082a93f7a0cfa3',
    watering: 'Tuproq qurimasligi uchun tez-tez sug‘oring',
    sunlight: 'Kuniga kamida 6 soat quyosh',
    soil: 'Yengil, nam tuproq',
    benefits: ['Organizmni namlaydi', 'Vitamin va minerallarga boy', 'Teri uchun foydali'],
    growth: 0.6
  },
  {
    id: 'basil',
    name: 'Rayhon',
    latin: 'Ocimum basilicum',
    family: 'Lamiaceae',
    type: 'Yaproqli o‘simlik',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9BGpBkrpO4vy6qrB9M1SR82IM6jOaXHws8g&s',
    watering: 'Haftasiga 2–3 marta, iliq suv bilan',
    sunlight: 'Yorug‘ joy, to‘g‘ridan-to‘g‘ri quyosh',
    soil: 'Yaxshi drenajli, ozroq nam tuproq',
    benefits: ['Ishtahani ochadi', 'Antibakterial xususiyatga ega', 'Taomlarga tabiiy hid va ta’m beradi'],
    growth: 0.9
  },
  {
    id: 'chili',
    name: 'Achchiq qalampir',
    latin: 'Capsicum annuum',
    family: 'Solanaceae',
    type: 'Sabzavot o‘simligi',
    image: 'https://storage.kun.uz/source/4/tQMM0g8gxdgn8yVnxy5pf-IYZOmvJMyS.jpg',
    watering: 'Me’yorida, tuproq usti quriganda',
    sunlight: 'Kuniga 6–8 soat kuchli yorug‘lik',
    soil: 'Yaxshi drenajli, ozroq qum aralash tuproq',
    benefits: ['Qon aylanishini yaxshilaydi', 'Metabolizmni faollashtiradi', 'Taomlarga achchiq ta’m beradi'],
    growth: 0.5
  }
];

export function findPlantBySlug(slug) {
  if (!slug) return undefined;
  const normalized = slug.toLowerCase();
  return plants.find(
    (p) =>
      p.id.toLowerCase() === normalized ||
      p.name.toLowerCase() === normalized ||
      p.name.toLowerCase().replace(/\s+/g, '-') === normalized
  );
}

