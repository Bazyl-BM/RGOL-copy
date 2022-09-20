import BulgariaFlag from '../../assets/image/flag_bg.png';
import CzechFlag from '../../assets/image/flag_cs.png';
import DeutschImg from '../../assets/image/flag_de.png';
import GreeceFlag from '../../assets/image/flag_el.png';
import EnglishImg from '../../assets/image/flag_en.png';
import CroatiaFlag from '../../assets/image/flag_hr.png';
import MagyarImg from '../../assets/image/flag_hu.png';
import PolskaImg from '../../assets/image/flag_pl.png';
import HungaryFlag from '../../assets/image/flag_ro.png';
import RussiaFlag from '../../assets/image/flag_ru.png';
import SlovakiaFlag from '../../assets/image/flag_sk.png';
import SloveniaFlag from '../../assets/image/flag_sl.png';
import UkraineFlag from '../../assets/image/flag_uk.png';

export const accordianData: {
  title: string;
  links: string[];
}[] = [
  {
    title: 'Obłsuga Klienta',
    links: [
      'Dostawa i Płatność',
      'Wymiany i Zwroty',
      'Reklamacje',
      'Program Lojalnościowy R-TEAM',
      'SPERSONALIZUJ SWÓJ SPRZĘT',
      'Tabele rozmiarów',
      'Jak wybrać odpowiednie buty piłkarskie?',
      'Częste pytania (FAQ)',
    ],
  },
  {
    title: 'Informacje',
    links: [
      'Regulamin',
      'Regulamin R-TEAM',
      'Polityka Prywatności',
      'R-GOL.pro',
      'Obsługa Klubów B2B',
      'Karty podarunkowe',
    ],
  },
  {
    title: 'O firmie',
    links: [
      'Nasze Sklepy',
      'O Nas',
      'Nagrody i wyróżnienia',
      'Fundusze Europejskie',
    ],
  },
];

export const languageData: {
  title: string;
  image: string;
  key: string;
}[] = [
  {
    title: 'Polski',
    image: PolskaImg.src,
    key: 'pl',
  },
  {
    title: 'English',
    image: EnglishImg.src,
    key: 'en',
  },
  {
    title: 'Deutsch',
    image: DeutschImg.src,
    key: 'de',
  },
  {
    title: 'Română',
    image: HungaryFlag.src,
    key: 'ro',
  },
  {
    title: 'Magyar',
    image: MagyarImg.src,
    key: 'hu',
  },
  {
    title: 'Čeština',
    image: CzechFlag.src,
    key: 'cs',
  },
  {
    title: 'Slovenčina',
    image: SlovakiaFlag.src,
    key: 'sk',
  },
  {
    title: 'Українська',
    image: UkraineFlag.src,
    key: 'uk',
  },
  {
    title: 'Русский',
    image: RussiaFlag.src,
    key: 'ru',
  },
  {
    title: 'Български',
    image: BulgariaFlag.src,
    key: 'bg',
  },
  {
    title: 'Hrvatski',
    image: CroatiaFlag.src,
    key: 'hr',
  },
  {
    title: 'Slovenščina',
    image: SloveniaFlag.src,
    key: 'sl',
  },
  {
    title: 'Ελληνικά',
    image: GreeceFlag.src,
    key: 'el',
  },
];
