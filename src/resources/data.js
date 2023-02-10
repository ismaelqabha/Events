import { ScreenNames } from '../../route/ScreenNames';

export const Users = [
    {
        USER_ID: 1,
        User_name: 'Ali',
        Password: '123',
        Email:'',
        UserAdress: '',
        UserPhone:'',
        UserType: 'Client',
    },
    {
        USER_ID: 2,
        User_name: 'Ahmed',
        Password: '000',
        Email:'',
        UserAdress: '',
        UserPhone:'',
        UserType: 'Provider',
    },
];
export const servicesData = [
    {
        service_id: 1,
        UserId: 1,
        servType: 'قاعات',
        title: 'قاعات الامير',
        subTitle: 'قاعة الامير لاحياء جميع مناسباتكم السعيدة اهلا وسهلا بكم',
        desc: '',
        region: 'المثلث الشمالي',
        address: 'برطعة',
        workingRegion: [],
        servicePice: '',
        serviceStutes: '',
        
        img: (require('../../src/assets/ameer.png')),
        linkPage: ScreenNames.ServiceDescr,
        image: [
            (require('../../src/assets/ameer.png')),
            (require('../../src/assets/ameer.png')),
            (require('../../src/assets/ameer.png')),
        ],
    },
    {
        UserId: 0,
        service_id: 2,
        img: (require('../../src/assets/MaisAlrem.png')),
        title: 'قاعات ميس الريم',
        linkPage: ScreenNames.ServiceDescr,
        subTitle: 'قاعة ميس الريم لاحياء جميع مناسباتكم السعيدة اهلا وسهلا بكم',
        region: 'المثلث الشمالي',
        servType: 'قاعات',
        address: 'عرعرة',
        desc: '',
        image: [
            (require('../../src/assets/MaisAlrem.png')),
            (require('../../src/assets/MaisAlrem.png')),
            (require('../../src/assets/MaisAlrem.png')),
            (require('../../src/assets/MaisAlrem.png')),
        ],
    },
    {
        UserId: 0,
        service_id: 3,
        img: (require('../../src/assets/talmarah.png')),
        title: 'قاعات تل المرح',
        linkPage: ScreenNames.ServiceDescr,
        subTitle: 'قاعة تل المرح لاحياء جميع مناسباتكم السعيدة اهلا وسهلا بكم',
        region: 'المثلث الشمالي',
        address: 'عارة',
        servType: 'قاعات',
        desc: '',
        image: [
            (require('../../src/assets/talmarah.png')),
            (require('../../src/assets/talmarah.png')),
        ],

    },
    {
        UserId: 0,
        service_id: 4,
        img: (require('../../src/assets/sedawi.png')),
        title: 'استديو الصيداوي',
        linkPage: ScreenNames.ServiceDescr,
        subTitle: 'احدث تصوير اتش دي لاحياء جميع مناسباتكم ',
        region: 'المثلث الشمالي',
        address: 'عرعرة',
        servType: 'تصوير',
        desc: '',
        image: [
            (require('../../src/assets/sedawi.png')),
            (require('../../src/assets/sedawi.png')),
        ],
    },
    {
        UserId: 0,
        service_id: 5,
        img: (require('../../src/assets/ahtha.png')),
        title: 'لحظة عمر',
        linkPage: ScreenNames.ServiceDescr,
        subTitle: 'استديو لحظة عمر لتصوير جميع مناسباتكم السعيدة ',
        region: 'المثلث الشمالي',
        address: 'عرعرة',
        servType: 'تصوير',
        desc: '',
        image: [
            (require('../../src/assets/ahtha.png')),
            (require('../../src/assets/ahtha.png')),
        ],
    },
    {
        UserId: 0,
        service_id: 6,
        img: (require('../../src/assets/kafa.png')),
        title: 'كفى دراوشة',
        linkPage: ScreenNames.ServiceDescr,
        subTitle: 'استديو كفى دراوشة لتصوير جميع مناسباتكم السعيدة',
        region: 'المثلث الجنوبي',
        address: 'قلنسوة',
        servType: 'تصوير',
        desc: '',
        image: [
            (require('../../src/assets/kafa.png')),
            (require('../../src/assets/kafa.png')),
        ],
    },
    {
        UserId: 0,
        service_id: 7,
        img: (require('../../src/assets/djWaseem.png')),
        title: 'دي جي وسيم',
        linkPage: ScreenNames.ServiceDescr,
        subTitle: 'دي جي وسيم لاحياء جميع مناسباتكم ',
        region: 'المثلث الشمالي',
        address: 'كفر قرع',
        servType: 'DJ',
        desc: '',
        image: [
            (require('../../src/assets/djWaseem.png')),
            (require('../../src/assets/djWaseem.png')),
        ],
    },
    {
        UserId: 0,
        service_id: 8,
        img: (require('../../src/assets/djSamer.png')),
        title: 'دي جي سامر',
        linkPage: ScreenNames.ServiceDescr,
        subTitle: '[دي جي سامر لاحياء جميع مناسباتكم السعيدة ',
        region: 'المثلث الجنوبي',
        address: 'الطيبة',
        servType: 'DJ',
        desc: '',
        image: [
            (require('../../src/assets/djSamer.png')),
            (require('../../src/assets/djSamer.png')),
        ],
    },
    {
        UserId: 0,
        service_id: 9,
        img: (require('../../src/assets/kafa.png')),
        title: 'دي جي أمل',
        linkPage: ScreenNames.ServiceDescr,
        subTitle: 'دي جي أمل لاحياء جميع مناسباتكم السعيدة اهلا وسهلا بكم',
        region: 'الجليل',
        address: 'سخنين',
        servType: 'DJ',
        desc: '',
        image: [
            (require('../../src/assets/kafa.png')),
            (require('../../src/assets/kafa.png')),
        ],
    },
    {
        UserId: 0,
        service_id: 10,
        img: (require('../../src/assets/raaed.png')),
        title: 'الفنان رائد كبها',
        linkPage: ScreenNames.ServiceDescr,
        subTitle: 'فرقة رائد كبها لاحياء جميع مناسباتكم ',
        region: 'المثلث الشمالي',
        address: 'عين السهلة',
        servType: 'مطربين',
        desc: '',
        image: [
            (require('../../src/assets/raaed.png')),
            (require('../../src/assets/raaed.png')),
        ],
    },
    {
        UserId: 0,
        service_id: 11,
        img: (require('../../src/assets/mohmed.png')),
        title: 'الفنان محمد',
        linkPage: ScreenNames.ServiceDescr,
        subTitle: 'فرقة الفنان محمد لاحياء جميع مناسباتكم السعيدة ',
        region: 'النقب',
        address: 'تل السبع',
        servType: 'مطربين',
        desc: '',
        favorites: false,
        image: [
            (require('../../src/assets/mohmed.png')),
            (require('../../src/assets/mohmed.png')),
        ],
    },
    {
        UserId: 0,
        service_id: 12,
        img: (require('../../src/assets/majd.png')),
        title: 'قاعات المجد',
        linkPage: ScreenNames.ServiceDescr,
        subTitle: 'قاعة المجد لاحياء جميع مناسباتكم السعيدة اهلا وسهلا بكم',
        region: 'الضفة الغربية',
        address: 'جنين',
        servType: 'قاعات',
        desc: '',
        favorites: false,
        image: [
            (require('../../src/assets/majd.png')),
            (require('../../src/assets/majd.png')),
        ],

    },
    {
        UserId: 0,
        service_id: 13,
        img: (require('../../src/assets/almasa.png')),
        title: 'قاعات الماسة',
        linkPage: ScreenNames.ServiceDescr,
        subTitle: 'قاعة الماسة لاحياء جميع مناسباتكم السعيدة اهلا وسهلا بكم',
        region: 'الساحل',
        address: 'برطعة',
        servType: 'قاعات',
        desc: '',
        favorites: false,
        image: [
            (require('../../src/assets/almasa.png')),
            (require('../../src/assets/almasa.png')),
        ],
    },
    {
        UserId: 0,
        service_id: 14,
        img: (require('../../src/assets/watatd.png')),
        title: 'تصوير مجدي وتد',
        linkPage: ScreenNames.ServiceDescr,
        subTitle: 'احدث تصوير اتش دي لاحياء جميع مناسباتكم ',
        region: 'الساحل',
        address: 'يافا',
        servType: 'تصوير',
        desc: '',
        favorites: false,
        image: [
            (require('../../src/assets/watatd.png')),
            (require('../../src/assets/watatd.png')),
        ],
    },
    {
        UserId: 0,
        service_id: 15,
        img: (require('../../src/assets/maqeldh.png')),
        title: 'استديو مقالدة',
        linkPage: ScreenNames.ServiceDescr,
        subTitle: 'استديو مقالدة لتصوير جميع مناسباتكم السعيدة ',
        region: 'الجليل',
        address: 'دير الاسد',
        servType: 'تصوير',
        desc: '',
        favorites: false,
        image: [
            (require('../../src/assets/maqeldh.png')),
            (require('../../src/assets/maqeldh.png')),
        ],
    },
    {
        UserId: 0,
        service_id: 16,
        img: (require('../../src/assets/djfarah.png')),
        title: 'دي جي فرح',
        linkPage: ScreenNames.ServiceDescr,
        subTitle: 'دي جي فرح لاحياء جميع مناسباتكم ',
        region: 'المثلث الشمالي',
        address: 'عارة',
        servType: 'DJ',
        desc: '',
        image: [
            (require('../../src/assets/djfarah.png')),
            (require('../../src/assets/djfarah.png')),
        ],
    },
    {
        UserId: 1,
        service_id: 17,
        img: (require('../../src/assets/abofaneh.png')),
        title: 'دي جي ابو فنة',
        linkPage: ScreenNames.ServiceDescr,
        subTitle: 'دي جي ابو فنة لتصوير جميع مناسباتكم السعيدة ',
        region: 'النقب',
        address: 'تل السبع',
        servType: 'DJ',
        desc: '',
        image: [
            (require('../../src/assets/abofaneh.png')),
            (require('../../src/assets/abofaneh.png')),
        ],

    },
];
export const regionData = [
    { key: '2', value: 'الجليل' },
    { key: '3', value: 'النقب ' },
    { key: '5', value: 'الساحل' },
    { key: '0', value: 'المثلث الشمالي' },
    { key: '1', value: 'المثلث الجنوبي' },
    { key: '4', value: 'الضفة الغربية' },
];
export const ServiceImages = [
    {
        imgId: 1,
        serviceID: 1,
        image: (require('../../src/assets/ameer.png')),
        coverPhoto: true,
    },
    {
        imgId: 2,
        serviceID: 1,
        image: (require('../../src/assets/ameer.png')),
        coverPhoto: false,
    },
    {
        imgId: 3,
        serviceID: 1,
        image: (require('../../src/assets/ameer.png')),
        coverPhoto: false,
    },
];
export const subDetailData = [
    {
        orderItems: [
            {
                detial_id: 1, // 3sha 
                orderProducts: []
            },
            {
                detial_id: 2, // firewoks 
                orderProducts: []
            },
        ],
        request_Id: 1,
        UserID: 1,
    },
];
export const subDetail = [
    {
        subDetail_Id: 1,
        id:1,
        detailSubtitle: 'لحمة',
        detailSubtitleCost: 50,
        imgSrc: (require('../../src/assets/meat.png')),
    },
    {
        subDetail_Id: 1,
        id:2,
        detailSubtitle: 'دجاج',
        detailSubtitleCost: 50,
        imgSrc: (require('../../src/assets/cheken.png')),
    },
    {
        subDetail_Id: 1,
        detailSubtitle: 'خضار',
        id:3 ,
        detailSubtitleCost: 50,
        imgSrc: (require('../../src/assets/cheken.png')),
    },
    {
        subDetail_Id: 3,
        detailSubtitle: 'نوف',
        detailSubtitleCost: '100',
        imgSrc: (require('../../src/assets/nof.png')),
    },
    {
        subDetail_Id: 3,
        detailSubtitle: 'ألبوم ديجيتال',
        detailSubtitleCost: '100',
        imgSrc: (require('../../src/assets/alboum.png')),
    },
];
export const serviceDetail = [
    {
        detail_Id: 1,
        detailTitle: 'وجبة عشاء',
        SDserviceID: 1,
        serviceType: 'قاعات',
    },
    {
        detail_Id: 2,
        detailTitle: 'ألعاب نارية',
        serviceType: 'قاعات',
        SDserviceID: 1,
    },
    {
        detail_Id: 3,
        detailTitle: 'تفاصيل التصوير',
        SDserviceID: 4,
        serviceType: 'تصوير',
    },
];
export const servicesCategory = [
    {
        cat_id: 1,
        titleCategory: 'قاعات',
        img: (require('../../src/assets/hole.png')),
    },
    {
        cat_id: 2,
        titleCategory: 'تصوير',
        img: (require('../../src/assets/cam.png')),
    },
    {
        cat_id: 3,
        titleCategory: 'مطربين',
        img: (require('../../src/assets/micro.png')),
    },
    {
        cat_id: 4,
        titleCategory: 'DJ',
        img: (require('../../src/assets/d-j.png')),
    },
    {
        cat_id: 5,
        titleCategory: 'شيف',
        img: (require('../../src/assets/chef.png')),
    },
    {
        cat_id: 6,
        titleCategory: 'تصفيف شعر',
        img: (require('../../src/assets/hair.png')),
    },
    {
        cat_id: 7,
        titleCategory: 'مركز تجميل',
        img: (require('../../src/assets/care.png')),
    },
    {
        cat_id: 8,
        titleCategory: 'Makeup',
        img: (require('../../src/assets/Makeup.png')),
    },
    {
        cat_id: 9,
        titleCategory: 'خدمات افراح',
        img: (require('../../src/assets/orgnaize.png')),
    },
    {
        cat_id: 10,
        titleCategory: 'بطاقات دعوة',
        img: (require('../../src/assets/card.png')),
    },
    {
        cat_id: 11,
        titleCategory: 'تصميم ازهار',
        img: (require('../../src/assets/flower.png')),
    },
    {
        cat_id: 12,
        titleCategory: ' فساتين',
        img: (require('../../src/assets/dress.png')),
    },
    {
        cat_id: 13,
        titleCategory: 'بدلات عرسان',
        img: (require('../../src/assets/suit.png')),
    },
    {
        cat_id: 14,
        titleCategory: 'مجوهرات',
        img: (require('../../src/assets/jewelry.png')),
    },
    {
        cat_id: 15,
        titleCategory: 'اكسسوارات',
        img: (require('../../src/assets/accessories.png')),
    },
    {
        cat_id: 16,
        titleCategory: 'حلويات',
        img: (require('../../src/assets/cake.png')),
    },
    {
        cat_id: 17,
        titleCategory: 'ألعاب نارية',
        img: (require('../../src/assets/fireworks.png')),
    },
    {
        cat_id: 18,
        titleCategory: 'سيارة زفاف',
        img: (require('../../src/assets/car.png')),
    },
    {
        cat_id: 19,
        titleCategory: 'أطفال',
        img: (require('../../src/assets/kids.png')),
    },
    {
        cat_id: 20,
        titleCategory: 'اخرى',
        img: (require('../../src/assets/other.png')),
    },


];
export const Events = [
    {
        EventId: 1,
        userId: 1,
        eventName: 'حفل زفاف',
        eventDate: '2/5/2023',
        eventCost: '1000',
    },
    {
        EventId: 2,
        userId: 1,
        eventName: 'عيد ميلاد',
        eventDate: '2/8/2023',
        eventCost: '500',
    },
];
export const Request = [
    {
        RequestId: 1,
        ReqEventId: 1,
        ReqServId: 1,
        ReqUserId: 1,
        ReqStatus: true,
        ReqDate: '10/1/2023',
        reservationDate: '12/1/2023',
        reservationTime: '14:30',
        Cost: 5000,
    },
    {
        RequestId: 2,
        ReqEventId: 1,
        ReqServId: 10,
        ReqUserId: 1,
        ReqStatus: true,
        ReqDate: '',
        reservationDate: '20/1/2023',
        reservationTime: '20:30',
        Cost: 10000,
    },
    {
        RequestId: 3,
        ReqEventId: 2,
        ReqServId: 5,
        ReqUserId: 1,
        ReqStatus: false,
        ReqDate: '',
        reservationDate: '30/1/2023',
        reservationTime: '18:30',
        Cost: 0,
    },

];
export const Payment = [
    {
        PayId: 1,
        ReqId: 1,
        PaymentAmount: 1000,
        PaymentDate: '',
    },

];

export const fileFavorites = [
    {
        fileId: 1,
        fileName: 'اقتراحاتي للحجز',
        fileImg: (require('../../src/assets/sedawi.png')),
        fileFavoUserId: 1,
    },
    {
        fileId: 2,
        fileName: 'اقتراحاتي',
        fileImg: (require('../../src/assets/abofaneh.png')),
        fileFavoUserId: 1,
    },
];

export const favoritesList = [
    {
        favoListFileId: 1,
        favoListUserId: 1,
        favoListServiceId: 1,
    },
    {
        favoListFileId: 1,
        favoListUserId: 1,
        favoListServiceId: 7,
    },
    {
        favoListFileId: 2,
        favoListUserId: 1,
        favoListServiceId: 9,
    },
    {
        favoListFileId: 2,
        favoListUserId: 1,
        favoListServiceId: 15,
    },
];


