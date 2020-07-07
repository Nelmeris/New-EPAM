import { Component } from '@angular/core';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss']
})
export class SolutionsComponent {

  news = [
    {
      imgSrc: 'https://www.epam-group.ru/content/dam/epam/case_studies/report-portal/report_portal_690x460.jpg',
      title: 'Report Portal: Единый инструмент для всей отчетности по тестированию',
      tags: 'БРОШЮРА'
    },
    {
      imgSrc: 'https://www.epam-group.ru/content/dam/epam/videos/Life-Sci-AR-VR-Video_576x384.jpg',
      title: 'VR/AR-приложения для визуализации структуры молекул',
      tags: 'ВИДЕО | МЕДИЦИНА И БИОТЕХНОЛОГИИ'
    },
    {
      imgSrc: 'https://www.epam-group.ru/content/dam/epam/Wiley_Webinar/WILEY-Web Images-576X384.jpg',
      title: 'Обеспечение по-настоящему многоканального взаимодействия с клиентами для Willey Efficient Learning',
      tags: 'ПРОЕКТ | ТЕЛЕКОММУНИКАЦИИ И МЕДИА'
    },
    {
      imgSrc: 'https://www.epam-group.ru/content/dam/epam/whitepapers/From_Legacy_to_Innovation_384x384.jpg',
      title: 'Цифровая трансформация: OpenWay',
      tags: 'ВИДЕО | ВЫСОКИЕ ТЕХНОЛОГИИ, БАНКИ И ФИНАНСЫ'
    },
    {
      imgSrc: 'https://www.epam-group.ru/content/dam/epam/case_studies/streamlining-sales/Streamlining_Door-to-Door_Sales_690x460.jpg',
      title: 'Оптимизация стратегии D2D-продаж с помощью аналитического приложения',
      tags: 'ПРОЕКТ | ТЕЛЕКОММУНИКАЦИИ И МЕДИА'
    },
    {
      imgSrc: 'https://www.epam-group.ru/content/dam/epam/case_studies/wechat-commerce/WeChat_Commerce_Accelerator_576x384.jpg',
      title: 'Акселератор EPAM для электронной B2C-коммерции для WeChat',
      tags: 'АКСЕЛЕРАТОР | ТОРГОВЛЯ И ДИСТРИБУЦИЯ'
    },
  ]

}
