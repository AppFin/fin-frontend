export function generateRandomDataArray(maxItems = 10) {
  const names = [
    'James Butt',
    'Josephine Darakjy',
    'Art Venere',
    'Lenna Paprocki',
    'Ioni Bowcher',
  ];
  const countries = [
    { name: 'Algeria', code: 'dz' },
    { name: 'Brazil', code: 'br' },
    { name: 'Canada', code: 'ca' },
    { name: 'Denmark', code: 'dk' },
    { name: 'Ecuador', code: 'ec' },
  ];
  const companies = [
    'Benton, John B Jr',
    'Chanay, Jeffrey A Esq',
    'Chemel, James L Cpa',
    'Feltz Printing Service',
  ];
  const statuses = [
    'unqualified',
    'qualified',
    'new',
    'negotiation',
    'renewal',
  ];
  const representatives = [
    { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    { name: 'Amy Elsner', image: 'amyelsner.png' },
    { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    { name: 'Xuxue Feng', image: 'xuxuefeng.png' },
  ];

  const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
  const getRandomDate = () => {
    const date = new Date(2010, 0, 1);
    const date1 = new Date(2023, 11, 31);
    const date2 = new Date(2010, 0, 1);
    return new Date(+date + Math.random() * (+date1 - +date2));
  };

  const quantity = Math.floor(Math.random() * maxItems) + 1;
  const result = [];

  for (let i = 0; i < quantity; i++) {
    result.push({
      id: 1000 + i,
      name: getRandom(names),
      country: getRandom(countries),
      company: getRandom(companies),
      date: getRandomDate(),
      status: getRandom(statuses),
      verified: Math.random() > 0.5,
      activity: Math.floor(Math.random() * 100),
      representative: getRandom(representatives),
      balance: parseFloat((Math.random() * 100000).toFixed(2)),
    } as FakeData);
  }

  return result;
}

export class FakeData {
  id: number;
  name: string;
  country: {  name: string; code: string; };
  company: string;
  date: Date;
  status: string;
  verified: boolean;
  activity: number;
  representative: { name: string; image: string; };
  balance: number;
}